// Konstanten für Client und Server; keine Zugangsdaten.

// Action für die serverseitige Prüfung.
export const RECAPTCHA_ACTION = 'contact_submit'

// Formcarry benötigt ein eigenes, noch nicht eingelöstes Token.
export const RECAPTCHA_FORWARD_ACTION = 'contact_forward'

/** Namen der Formularfelder, die Client und Server austauschen. */
export const FIELD = {
  name: 'name',
  email: 'email',
  phone: 'phone',
  message: 'message',
  /** Token für unsere eigene Verifikation (RECAPTCHA_ACTION). */
  recaptchaToken: 'g-recaptcha-response',
  /** Token für Formcarry (RECAPTCHA_FORWARD_ACTION). */
  recaptchaForwardToken: 'g-recaptcha-forward',
  /** Millisekunden zwischen Seitenaufbau und Absenden (Zeitfalle). */
  elapsedMs: 'elapsed-ms',
} as const

// Kein Autofill-Standardfeld verwenden: Es könnte echte Anfragen verwerfen.
export const HONEYPOT_FIELD = 'subject'

/**
 * Zeitfalle: Ein Mensch braucht für Name, E-Mail und eine Nachricht mit
 * mindestens 10 Zeichen deutlich länger als 3 Sekunden. Skripte, die das
 * Formular automatisiert befüllen und sofort absenden, liegen darunter.
 */
export const MIN_FILL_TIME_MS = 3000

/**
 * Längengrenzen – auf dem Client als `maxLength`, auf dem Server als harte
 * Validierung. Der Server ist maßgeblich; der Client verhindert nur, dass
 * echte Nutzer erst nach dem Absenden von einer Grenze erfahren.
 */
export const LIMITS = {
  nameMin: 2,
  nameMax: 100,
  /** RFC 5321: maximale Länge einer Mailadresse. */
  emailMax: 254,
  phoneMax: 30,
  messageMin: 10,
  messageMax: 5000,
  /** Mehr Links als das ist in einer Projektanfrage untypisch und typisch für Spam. */
  messageMaxLinks: 3,
  /** reCAPTCHA-Tokens sind ca. 0,5–2 KB lang; alles darüber ist kein echtes Token. */
  tokenMax: 4096,
} as const
