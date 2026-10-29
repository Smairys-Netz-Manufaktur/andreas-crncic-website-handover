'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Mail, Phone, MapPin, Send, AlertCircle, Loader2 } from 'lucide-react'
import Button from '@/components/common/Button'
import { trackEvent, getFromPage } from '@/lib/plausible'
import { ANALYTICS_EVENTS } from '@/config/analytics'
import { submitContactForm } from '@/actions/contact'
import { SITE } from '@/config/site'
import {
  FIELD,
  HONEYPOT_FIELD,
  LIMITS,
  RECAPTCHA_ACTION,
  RECAPTCHA_FORWARD_ACTION,
} from '@/config/contact'

// reCAPTCHA v3 Site Key (öffentlich – die Prüfung erfolgt serverseitig)
const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void
      execute: (siteKey: string, options: { action: string }) => Promise<string>
    }
  }
}

type FormStatus = 'idle' | 'loading' | 'error'

interface FormData {
  name: string
  email: string
  phone: string
  message: string
}

/** Einheitliche Feldoptik – ein Ort für Rahmen, Höhe und Fokusring. */
const FIELD_CLASSES =
  'w-full rounded-md border border-input bg-background px-4 py-3 text-foreground ' +
  'placeholder:text-muted-foreground/60 transition-colors ' +
  'focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary ' +
  'disabled:cursor-not-allowed disabled:opacity-60'

const LABEL_CLASSES = 'block text-sm font-medium text-foreground'

export default function KontaktContent() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()
  const honeypotRef = useRef<HTMLInputElement>(null)
  // Zeitpunkt, ab dem das Formular bedienbar ist – Basis der Zeitfalle.
  const formReadyAtRef = useRef(0)

  useEffect(() => {
    formReadyAtRef.current = Date.now()
  }, [])

  // Load reCAPTCHA script
  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY) {
      // Fehlkonfiguration: Die Server Action weist die Einsendung ohnehin ab.
      console.error('[contact] NEXT_PUBLIC_RECAPTCHA_SITE_KEY ist nicht gesetzt.')
      return
    }

    if (typeof window !== 'undefined' && !window.grecaptcha) {
      const script = document.createElement('script')
      script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`
      script.async = true
      script.defer = true
      document.head.appendChild(script)
    }
  }, [])

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target
      setFormData((prev) => ({ ...prev, [name]: value }))
    },
    []
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      // Get reCAPTCHA token
      if (!RECAPTCHA_SITE_KEY || !window.grecaptcha) {
        throw new Error(
          'Die Sicherheitsprüfung konnte nicht geladen werden. Bitte laden Sie die Seite neu ' +
            'oder kontaktieren Sie uns telefonisch.'
        )
      }

      // Zwei Tokens, erst unmittelbar beim Absenden erzeugt: eins prüft unsere
      // Server Action, das andere reicht sie unverbraucht an Formcarry weiter
      // (ein Token ist bei Google nur einmal einlösbar, siehe src/actions/contact.ts).
      // grecaptcha.ready() stellt sicher, dass die API initialisiert ist.
      const [verifyToken, forwardToken] = await new Promise<[string, string]>(
        (resolve, reject) => {
          window.grecaptcha.ready(() => {
            Promise.all([
              window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: RECAPTCHA_ACTION }),
              window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: RECAPTCHA_FORWARD_ACTION }),
            ]).then(resolve, reject)
          })
        }
      )

      // Submit form via Server Action
      const formDataObj = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        formDataObj.append(key, value)
      })
      // Honeypot: wird serverseitig ausgewertet (siehe src/actions/contact.ts)
      formDataObj.append(HONEYPOT_FIELD, honeypotRef.current?.value ?? '')
      formDataObj.append(FIELD.recaptchaToken, verifyToken)
      formDataObj.append(FIELD.recaptchaForwardToken, forwardToken)
      formDataObj.append(FIELD.elapsedMs, String(Date.now() - formReadyAtRef.current))

      const result = await submitContactForm({ success: false, message: '' }, formDataObj)

      if (result.success) {
        // Track successful form submission as conversion
        trackEvent(ANALYTICS_EVENTS.CONTACT.FORM_SUBMIT, {
          from_page: getFromPage(),
        })
        setFormData({ name: '', email: '', phone: '', message: '' })
        // Bestätigung erfolgt auf /danke – der Button bleibt bis dahin im Ladezustand.
        router.push('/danke')
      } else {
        throw new Error(result.message || 'Ein Fehler ist aufgetreten.')
      }
    } catch (err) {
      setStatus('error')
      setErrorMessage(
        err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten.'
      )
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero */}
      <section className="pt-32 pb-16 bg-muted">
        <div className="container text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold font-display md:text-6xl text-foreground"
          >
            Kontakt aufnehmen
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl mx-auto mt-4 text-lg text-muted-foreground"
          >
            Ausschreibung, Objektbegehung oder Angebotsanfrage – schildern Sie
            uns Ihr Vorhaben. Wir melden uns werktags innerhalb von 24 Stunden.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-background md:py-24">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-8"
            >
              <div>
                <h2 className="mb-6 text-2xl font-bold font-display text-foreground md:text-3xl">
                  Direkter Draht zu uns
                </h2>
                <p className="text-muted-foreground">
                  Für Rückfragen zu Leistungsverzeichnissen, Terminen oder einer
                  Begehung erreichen Sie uns telefonisch oder per E-Mail.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 text-primary">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Telefon</h3>
                    <a
                      href={`tel:${SITE.phone.tel}`}
                      onClick={() =>
                        trackEvent(ANALYTICS_EVENTS.CONTACT.CLICK, {
                          type: 'telefon',
                          position: 'kontakt-seite',
                          from_page: getFromPage(),
                        })
                      }
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {SITE.phone.international}
                    </a>
                    <p className="text-sm text-muted-foreground/70">
                      Mo–Fr: 08:00–17:00 Uhr
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 text-primary">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">E-Mail</h3>
                    <a
                      href={`mailto:${SITE.email}`}
                      onClick={() =>
                        trackEvent(ANALYTICS_EVENTS.CONTACT.CLICK, {
                          type: 'email',
                          position: 'kontakt-seite',
                          from_page: getFromPage(),
                        })
                      }
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {SITE.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 text-primary">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Adresse</h3>
                    <address className="not-italic text-muted-foreground">
                      {SITE.name}<br />
                      {SITE.address.street}<br />
                      {SITE.address.postalCode} {SITE.address.city}
                    </address>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="p-6 border rounded-lg bg-card border-border md:p-8">
                <h2 className="text-xl font-bold font-display text-foreground md:text-2xl">
                  Anfrage senden
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Felder mit * sind Pflichtfelder.
                </p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                  {/*
                    Honeypot – für Menschen unsichtbar, für Bots im DOM plausibel.
                    Inline-Styles statt Utility-Klassen, damit das Feld auch bei
                    CSS-Purging garantiert verborgen bleibt. Kein `display:none`,
                    weil viele Bots solche Felder überspringen.
                    tabIndex={-1} + aria-hidden halten es aus Tastatur- und
                    Screenreader-Fluss heraus.
                  */}
                  <div
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      left: '-9999px',
                      width: '1px',
                      height: '1px',
                      overflow: 'hidden',
                    }}
                  >
                    <label htmlFor={HONEYPOT_FIELD}>Betreff (bitte leer lassen)</label>
                    <input
                      ref={honeypotRef}
                      type="text"
                      id={HONEYPOT_FIELD}
                      name={HONEYPOT_FIELD}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="name" className={LABEL_CLASSES}>
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      maxLength={LIMITS.nameMax}
                      autoComplete="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={status === 'loading'}
                      className={FIELD_CLASSES}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className={LABEL_CLASSES}>
                      E-Mail *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      maxLength={LIMITS.emailMax}
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={status === 'loading'}
                      className={FIELD_CLASSES}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phone" className={LABEL_CLASSES}>
                      Telefon{' '}
                      <span className="font-normal text-muted-foreground">
                        (optional)
                      </span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      maxLength={LIMITS.phoneMax}
                      autoComplete="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={status === 'loading'}
                      className={FIELD_CLASSES}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className={LABEL_CLASSES}>
                      Ihr Anliegen *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      maxLength={LIMITS.messageMax}
                      rows={7}
                      value={formData.message}
                      onChange={handleChange}
                      disabled={status === 'loading'}
                      className={`${FIELD_CLASSES} resize-y`}
                    />
                  </div>

                  {status === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      role="alert"
                      className="flex items-start gap-2 p-3 rounded-md bg-destructive/10 text-destructive"
                    >
                      <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <p className="text-sm">{errorMessage}</p>
                    </motion.div>
                  )}

                  <div className="pt-2 space-y-4">
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={status === 'loading'}
                    >
                      {status === 'loading' ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Wird gesendet...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Anfrage senden
                        </>
                      )}
                    </Button>

                    {/*
                      reCAPTCHA-Offenlegung. Das schwebende Badge ist per CSS
                      ausgeblendet (src/app/globals.css) – Google verlangt dafür
                      diesen sichtbaren Hinweis direkt am Formular.
                    */}
                    <div className="pt-4 space-y-2 text-xs leading-relaxed border-t text-muted-foreground border-border">
                      <p>
                        Mit dem Absenden erklären Sie sich mit unserer{' '}
                        <Link
                          href="/datenschutz"
                          className="underline underline-offset-2 hover:text-primary"
                        >
                          Datenschutzerklärung
                        </Link>{' '}
                        einverstanden.
                      </p>
                      <p>
                        Diese Website ist durch reCAPTCHA geschützt. Es gelten die{' '}
                        <a
                          href="https://policies.google.com/privacy"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline underline-offset-2 hover:text-primary"
                        >
                          Datenschutzerklärung
                        </a>{' '}
                        und die{' '}
                        <a
                          href="https://policies.google.com/terms"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline underline-offset-2 hover:text-primary"
                        >
                          Nutzungsbedingungen
                        </a>{' '}
                        von Google.
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  )
}
