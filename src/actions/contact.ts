'use server'

// Details zum Formularschutz: docs/kontaktformular-schutz.md.

import { headers } from 'next/headers'
import { z } from 'zod'
import { FIELD, HONEYPOT_FIELD, LIMITS, MIN_FILL_TIME_MS } from '@/config/contact'
import { SITE_URL } from '@/config/site'
import { verifyRecaptchaToken, type RecaptchaFailure } from '@/lib/recaptcha'

/** Timeout für den Formcarry-Request, damit die Server Action nicht hängt. */
const FORMCARRY_TIMEOUT_MS = 8000

interface ContactFormState {
  success: boolean
  message: string
}

/**
 * Technische Kategorien für blockierte Einsendungen.
 *
 * `rate_limited` wird von der Vercel Firewall erzeugt und erscheint in deren
 * Logs – die Action wird in dem Fall gar nicht erst aufgerufen.
 */
type BlockReason =
  | 'honeypot'
  | 'too_fast'
  | 'validation_failed'
  | 'rate_limited'
  | 'formcarry_not_configured'
  | 'formcarry_failed'
  | RecaptchaFailure

/**
 * Einheitliches Logging blockierter Einsendungen.
 *
 * Nur technische Kategorien – keine Tokens, keine Secrets, keine
 * Nachrichteninhalte und keine personenbezogenen Formulardaten.
 */
function logBlocked(reason: BlockReason, detail?: string): void {
  console.warn(`[contact] blocked reason=${reason}${detail ? ` detail=${detail}` : ''}`)
}

const SUCCESS: ContactFormState = { success: true, message: 'Nachricht erfolgreich gesendet.' }

/** Neutrale Meldung – interne Fehler und Provider-URLs bleiben serverseitig. */
const GENERIC_ERROR =
  'Ihre Nachricht konnte leider nicht gesendet werden. Bitte versuchen Sie es erneut oder rufen Sie uns an.'

/** Neutrale Meldung für alle sicherheitsbezogenen Abweisungen. */
const SECURITY_ERROR =
  'Die Sicherheitsprüfung war nicht erfolgreich. Bitte laden Sie die Seite neu und versuchen Sie es erneut – oder rufen Sie uns an.'

/**
 * Steuerzeichen und Unicode-Richtungsumschalter (Bidi-Overrides).
 *
 * Steuerzeichen haben in einzeiligen Feldern nichts zu suchen; CR/LF in Name
 * oder Telefon sind das klassische Muster für Header-Injection in
 * nachgelagerten Mailsystemen. Bidi-Overrides (U+202A–U+202E, U+2066–U+2069)
 * können Text in der Benachrichtigungsmail optisch verfälschen ("Trojan Source").
 */
const SINGLE_LINE_FORBIDDEN = /[\u0000-\u001F\u007F‪-‮⁦-⁩]/
/** Wie oben, aber Tab, Zeilenumbruch und Wagenrücklauf sind in der Nachricht erlaubt. */
const MULTI_LINE_FORBIDDEN = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F‪-‮⁦-⁩]/
const PHONE_PATTERN = /^[0-9+()/. -]*$/
const LINK_PATTERN = /(?:https?:\/\/|www\.)/gi

const singleLine = (field: string) =>
  z
    .string()
    .trim()
    .refine((value) => !SINGLE_LINE_FORBIDDEN.test(value), `${field} enthält unzulässige Zeichen.`)

const contactSchema = z.object({
  name: singleLine('Der Name')
    .pipe(
      z
        .string()
        .min(LIMITS.nameMin, 'Bitte geben Sie Ihren Namen an.')
        .max(LIMITS.nameMax, `Der Name ist zu lang (max. ${LIMITS.nameMax} Zeichen).`)
    ),
  email: singleLine('Die E-Mail-Adresse')
    .pipe(
      z
        .string()
        .min(1, 'Bitte geben Sie Ihre E-Mail-Adresse an.')
        .max(LIMITS.emailMax, 'Die E-Mail-Adresse ist zu lang.')
        .email('Bitte geben Sie eine gültige E-Mail-Adresse an.')
    ),
  phone: singleLine('Die Telefonnummer')
    .pipe(
      z
        .string()
        .max(LIMITS.phoneMax, `Die Telefonnummer ist zu lang (max. ${LIMITS.phoneMax} Zeichen).`)
        .regex(PHONE_PATTERN, 'Die Telefonnummer darf nur Ziffern, Leerzeichen und + ( ) / . - enthalten.')
    ),
  message: z
    .string()
    .trim()
    .min(LIMITS.messageMin, `Bitte beschreiben Sie Ihr Anliegen mit mindestens ${LIMITS.messageMin} Zeichen.`)
    .max(LIMITS.messageMax, `Ihre Nachricht ist zu lang (max. ${LIMITS.messageMax} Zeichen).`)
    .refine((value) => !MULTI_LINE_FORBIDDEN.test(value), 'Die Nachricht enthält unzulässige Zeichen.')
    .refine(
      (value) => (value.match(LINK_PATTERN)?.length ?? 0) <= LIMITS.messageMaxLinks,
      `Bitte fügen Sie höchstens ${LIMITS.messageMaxLinks} Links ein.`
    ),
})

/**
 * Liest ein Textfeld aus den FormData.
 *
 * `FormData.get` kann auch eine Datei liefern; die wird wie ein fehlendes Feld
 * behandelt, damit niemand Datei-Uploads in die Kette schleust.
 */
function readText(formData: FormData, key: string): string | null {
  const value = formData.get(key)
  return typeof value === 'string' ? value : null
}

/** Ein Token ist nur plausibel, wenn es ein nicht-leerer String sinnvoller Länge ist. */
function readToken(formData: FormData, key: string): string | null {
  const value = readText(formData, key)?.trim()
  if (!value || value.length > LIMITS.tokenMax) return null
  return value
}

function getFormcarryEndpoint(): string | null {
  return process.env.FORMCARRY_ENDPOINT?.trim() || null
}

/** Formcarry antwortet mit JSON; `status: "success"` bestätigt die Annahme. */
interface FormcarryResponse {
  code?: number
  status?: string
  title?: string
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const honeypot = formData.get(HONEYPOT_FIELD)
  if (honeypot !== null && (typeof honeypot !== 'string' || honeypot.trim() !== '')) {
    logBlocked('honeypot')
    // Bots bekommen ein "Erfolg", damit sie das Muster nicht erkennen.
    return SUCCESS
  }
  // Fehlt der Wert, kam der Request nicht über unser Formular.
  const rawElapsed = readText(formData, FIELD.elapsedMs)
  const elapsedMs = rawElapsed === null ? NaN : Number(rawElapsed)
  if (!Number.isFinite(elapsedMs) || elapsedMs < MIN_FILL_TIME_MS) {
    const detail =
      rawElapsed === null ? 'missing' : Number.isFinite(elapsedMs) ? `elapsed_ms=${Math.round(elapsedMs)}` : 'invalid'
    logBlocked('too_fast', detail)
    return SUCCESS
  }
  const parsed = contactSchema.safeParse({
    name: readText(formData, FIELD.name) ?? '',
    email: readText(formData, FIELD.email) ?? '',
    phone: readText(formData, FIELD.phone) ?? '',
    message: readText(formData, FIELD.message) ?? '',
  })

  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0]
    // Nur der Feldpfad wird geloggt, nicht der eingegebene Wert.
    logBlocked('validation_failed', firstIssue?.path.join('.') || 'unknown_field')
    return {
      success: false,
      message: firstIssue?.message ?? 'Bitte prüfen Sie Ihre Eingaben.',
    }
  }
  // Beide vor dem ersten externen Request prüfen: Ohne Token 2 würde Formcarry
  // ohnehin ablehnen, dann sparen wir uns auch den Request zu Google.
  const verifyToken = readToken(formData, FIELD.recaptchaToken)
  const forwardToken = readToken(formData, FIELD.recaptchaForwardToken)
  if (!verifyToken || !forwardToken) {
    logBlocked('recaptcha_missing_token', !verifyToken ? 'verify' : 'forward')
    return { success: false, message: SECURITY_ERROR }
  }
  const recaptcha = await verifyRecaptchaToken(verifyToken)
  if (!recaptcha.ok) {
    logBlocked(recaptcha.reason, recaptcha.detail)
    return { success: false, message: SECURITY_ERROR }
  }
  const endpoint = getFormcarryEndpoint()
  if (!endpoint) {
    console.error('[contact] FORMCARRY_ENDPOINT ist nicht gesetzt – Einsendung kann nicht zugestellt werden.')
    logBlocked('formcarry_not_configured')
    return { success: false, message: GENERIC_ERROR }
  }

  const { name, email, phone, message } = parsed.data

  try {
    const headersList = await headers()
    const userAgent = headersList.get('user-agent') || 'Next.js Server Action'

    const formcarryResponse = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'User-Agent': userAgent,
        // Fester Wert statt des vom Client gesendeten Referers.
        Referer: `${SITE_URL}/kontakt`,
      },
      // Nur explizit freigegebene Felder – nichts aus dem Request wird blind durchgereicht.
      body: JSON.stringify({
        name,
        email,
        phone,
        message,
        'g-recaptcha-response': forwardToken,
      }),
      cache: 'no-store',
      signal: AbortSignal.timeout(FORMCARRY_TIMEOUT_MS),
    })

    const result = (await formcarryResponse.json().catch(() => null)) as FormcarryResponse | null

    // Formcarry meldet Fehler (z. B. abgelehntes reCAPTCHA) teils mit HTTP 200
    // und `status: "error"` im Body – deshalb beides prüfen.
    if (!formcarryResponse.ok || (result && result.status !== 'success')) {
      // Statuscode und Formcarry-Fehlertitel ins Log, nie zum Client.
      const title = result?.title ? ` title=${result.title.slice(0, 80).replace(/\s+/g, '_')}` : ''
      logBlocked('formcarry_failed', `http_${formcarryResponse.status} code=${result?.code ?? 'none'}${title}`)
      return { success: false, message: GENERIC_ERROR }
    }

    return SUCCESS
  } catch (error) {
    const detail = error instanceof Error ? error.name : 'unknown_error'
    logBlocked('formcarry_failed', `unreachable_${detail}`)
    return { success: false, message: GENERIC_ERROR }
  }
}
