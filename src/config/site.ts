// Zentrale Website- und Kontaktdaten.

/** Produktive Hauptdomain (kanonisch, ohne abschließenden Slash). */
export const SITE_URL = 'https://bauunternehmen.saarland'

/** Telefonnummer in internationaler Schreibweise (sichtbar). */
export const PHONE_INTERNATIONAL = '+49 6806 77981'

/** Telefonnummer in nationaler Schreibweise (sichtbar). */
export const PHONE_DISPLAY = '06806 77981'

/** Wert für `tel:`-Links (E.164, ohne Leerzeichen). */
export const PHONE_TEL = '+49680677981'

/** Zentrale E-Mail-Adresse. */
export const EMAIL = 'info@crncic-bau.de'

export const SITE = {
  name: 'Andreas Crncic GmbH',
  shortName: 'Crncic Bau',
  url: SITE_URL,
  description:
    'Fachbetrieb für Betoninstandsetzung und Bodenbeschichtung im Saarland. Für öffentliche Auftraggeber, Generalunternehmer, Industrie und Gewerbe.',
  /** Unternehmenslogo für strukturierte Daten. */
  logoPath: '/logo.png',
  /** Social-Preview-Bild (OpenGraph/Twitter) – kein Logo im Sinne von schema.org. */
  ogImagePath: '/og-image.png',
  phone: {
    display: PHONE_DISPLAY,
    international: PHONE_INTERNATIONAL,
    tel: PHONE_TEL,
  },
  email: EMAIL,
  address: {
    street: 'Kirschhofer Straße 15b',
    postalCode: '66265',
    city: 'Heusweiler',
    country: 'DE',
  },
  areaServed: 'Saarland',
  openingHours: ['Mo-Fr 08:00-17:00'],
} as const

/** Baut aus einem Pfad eine absolute URL auf der produktiven Domain. */
export function absoluteUrl(path: string = '/'): string {
  if (path === '/' || path === '') return SITE_URL
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

/** Absolute URL des Unternehmenslogos (schema.org `logo`). */
export const LOGO_URL = absoluteUrl(SITE.logoPath)

/** Absolute URL des Social-Preview-Bilds. */
export const OG_IMAGE_URL = absoluteUrl(SITE.ogImagePath)
