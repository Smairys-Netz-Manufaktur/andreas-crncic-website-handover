// Serverseitige Prüfung des reCAPTCHA-Tokens.

import { RECAPTCHA_ACTION } from '@/config/contact'
import { SITE_URL } from '@/config/site'

const VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify'

/** Timeout für den siteverify-Request, damit die Server Action nicht hängt. */
const VERIFY_TIMEOUT_MS = 5000

/** Von Google empfohlener Startwert; über `RECAPTCHA_MIN_SCORE` anpassbar. */
const DEFAULT_MIN_SCORE = 0.5

export type DeployEnv = 'production' | 'preview' | 'development'

/**
 * Ermittelt die Deployment-Umgebung.
 *
 * `VERCEL_ENV` ist das verlässliche Signal auf Vercel und unterscheidet
 * sauber zwischen Production und Preview – `NODE_ENV` ist bei Preview-Builds
 * ebenfalls "production" und taugt deshalb nicht allein als Kriterium.
 */
export function getDeployEnv(): DeployEnv {
  const vercelEnv = process.env.VERCEL_ENV
  if (vercelEnv === 'production' || vercelEnv === 'preview' || vercelEnv === 'development') {
    return vercelEnv
  }
  return process.env.NODE_ENV === 'production' ? 'production' : 'development'
}

/** Liest den Score-Threshold aus der Env; fällt bei Unsinn auf den Default zurück. */
export function getMinScore(): number {
  const raw = process.env.RECAPTCHA_MIN_SCORE
  if (!raw) return DEFAULT_MIN_SCORE

  const parsed = Number.parseFloat(raw)
  if (!Number.isFinite(parsed) || parsed < 0 || parsed > 1) {
    console.warn(
      `[contact] RECAPTCHA_MIN_SCORE ist ungültig ("${raw}"), erwartet wird 0..1 – nutze ${DEFAULT_MIN_SCORE}.`
    )
    return DEFAULT_MIN_SCORE
  }
  return parsed
}

/**
 * Für die aktuelle Umgebung erlaubte reCAPTCHA-Hostnames.
 *
 * In Production werden ausschließlich die Produktionsdomains akzeptiert –
 * Preview- und Entwicklungs-Hosts sind ausgeschlossen.
 */
export function getAllowedHostnames(env: DeployEnv = getDeployEnv()): string[] {
  const productionHost = new URL(SITE_URL).hostname
  const hosts = new Set<string>([productionHost, `www.${productionHost}`])

  // Optionale Ergänzung (z. B. eine zusätzliche Livedomain), kommaseparariert.
  for (const extra of (process.env.RECAPTCHA_ALLOWED_HOSTNAMES ?? '').split(',')) {
    const host = extra.trim()
    if (host) hosts.add(host)
  }

  if (env === 'preview') {
    // Nur die konkreten Hosts DIESES Preview-Deployments, kein pauschales *.vercel.app.
    for (const host of [process.env.VERCEL_URL, process.env.VERCEL_BRANCH_URL]) {
      if (host) hosts.add(host)
    }
  }

  if (env === 'development') {
    hosts.add('localhost')
    hosts.add('127.0.0.1')
  }

  return [...hosts]
}

export type RecaptchaFailure =
  | 'recaptcha_not_configured'
  | 'recaptcha_missing_token'
  | 'recaptcha_failed'
  | 'recaptcha_low_score'
  | 'recaptcha_action_mismatch'
  | 'recaptcha_hostname_mismatch'

export type RecaptchaResult =
  | { ok: true; score: number | null }
  | { ok: false; reason: RecaptchaFailure; detail?: string }

interface SiteVerifyResponse {
  success: boolean
  score?: number
  action?: string
  hostname?: string
  challenge_ts?: string
  'error-codes'?: string[]
}

/**
 * Verifiziert ein reCAPTCHA-v3-Token bei Google.
 *
 * Fail-closed: Fehlt das Secret, wird abgewiesen. Einzige Ausnahme ist ein
 * per `CONTACT_ALLOW_INSECURE_DEV=true` aktivierter Fallback, der
 * ausserhalb von Production greift.
 */
export async function verifyRecaptchaToken(token: unknown): Promise<RecaptchaResult> {
  const env = getDeployEnv()
  const secret = process.env.RECAPTCHA_SECRET_KEY?.trim()

  if (!secret) {
    if (env !== 'production' && process.env.CONTACT_ALLOW_INSECURE_DEV === 'true') {
      console.warn(
        '[contact] DEV-FALLBACK AKTIV: RECAPTCHA_SECRET_KEY fehlt und ' +
          'CONTACT_ALLOW_INSECURE_DEV=true – das Token wird NICHT verifiziert. ' +
          'Dieser Pfad ist in Production nicht erreichbar.'
      )
      return { ok: true, score: null }
    }
    console.error(
      `[contact] RECAPTCHA_SECRET_KEY fehlt (env=${env}). Einsendungen werden abgewiesen, ` +
        'bis die Variable gesetzt ist.'
    )
    return { ok: false, reason: 'recaptcha_not_configured' }
  }

  if (typeof token !== 'string' || token.trim() === '') {
    return { ok: false, reason: 'recaptcha_missing_token' }
  }

  let data: SiteVerifyResponse
  try {
    const response = await fetch(VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token }),
      cache: 'no-store',
      signal: AbortSignal.timeout(VERIFY_TIMEOUT_MS),
    })

    if (!response.ok) {
      return { ok: false, reason: 'recaptcha_failed', detail: `siteverify_http_${response.status}` }
    }

    data = (await response.json()) as SiteVerifyResponse
  } catch (error) {
    // Kein Token im Log – nur die Fehlerklasse.
    const detail = error instanceof Error ? error.name : 'unknown_error'
    return { ok: false, reason: 'recaptcha_failed', detail: `siteverify_unreachable_${detail}` }
  }

  if (!data.success) {
    // Enthält u. a. "timeout-or-duplicate" bei abgelaufenen/mehrfach genutzten Tokens.
    const codes = (data['error-codes'] ?? []).join(',') || 'no_error_code'
    return { ok: false, reason: 'recaptcha_failed', detail: codes }
  }

  // Ein fehlender Score bedeutet: kein v3-Key (z. B. versehentlich ein v2-Key).
  if (typeof data.score !== 'number') {
    return { ok: false, reason: 'recaptcha_failed', detail: 'missing_score_no_v3_key' }
  }

  if (data.action !== RECAPTCHA_ACTION) {
    return {
      ok: false,
      reason: 'recaptcha_action_mismatch',
      detail: `expected=${RECAPTCHA_ACTION} got=${data.action ?? 'none'}`,
    }
  }

  const allowedHostnames = getAllowedHostnames(env)
  if (!data.hostname || !allowedHostnames.includes(data.hostname)) {
    return {
      ok: false,
      reason: 'recaptcha_hostname_mismatch',
      detail: `env=${env} got=${data.hostname ?? 'none'}`,
    }
  }

  const minScore = getMinScore()
  if (data.score < minScore) {
    return {
      ok: false,
      reason: 'recaptcha_low_score',
      detail: `score=${data.score} min=${minScore}`,
    }
  }

  return { ok: true, score: data.score }
}
