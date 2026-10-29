export const ANALYTICS_EVENTS = {
  CONTACT: {
    FORM_SUBMIT: 'Kontaktformular gesendet',
    CLICK: 'Kontakt-Klick',
  },
  CONTENT: {
    SERVICE_VIEW: 'Leistung angesehen',
    REFERENCE_VIEW: 'Referenz geöffnet',
    DOWNLOAD: 'Dokument-Download',
  },
  NAVIGATION: {
    CLICK: 'Navigation-Klick',
    HERO_CTA: 'Hero-CTA geklickt',
  },
  ENGAGEMENT: {
    SLIDER_INTERACTION: 'Vorher/Nachher verglichen',
    SCROLL_DEPTH: 'Scroll-Tiefe erreicht',
  },
} as const

// Typ-Definitionen für die Properties der einzelnen Events
export type AnalyticsEventProps = {
  [ANALYTICS_EVENTS.CONTACT.FORM_SUBMIT]: {
    from_page: string
    service?: string
    lead_type?: 'privat' | 'gewerblich'
    urgency?: string
  }
  [ANALYTICS_EVENTS.CONTACT.CLICK]: {
    type: 'telefon' | 'email' | 'whatsapp' | 'adresse'
    position: 'header' | 'footer' | 'hero' | 'kontakt-seite' | 'mobile-menu'
    from_page: string
  }
  [ANALYTICS_EVENTS.CONTENT.SERVICE_VIEW]: {
    service: string
    position: 'leistungen-seite' | 'home-seite' | 'footer'
    from_page: string
  }
  [ANALYTICS_EVENTS.CONTENT.REFERENCE_VIEW]: {
    project: string
    from_page: string
  }
  [ANALYTICS_EVENTS.CONTENT.DOWNLOAD]: {
    document: string
    from_page: string
  }
  [ANALYTICS_EVENTS.NAVIGATION.CLICK]: {
    label: string
    target: string
    from_page: string
    position: 'header' | 'footer' | 'mobile-menu'
  }
  [ANALYTICS_EVENTS.NAVIGATION.HERO_CTA]: {
    target: string
    from_page: string
  }
  [ANALYTICS_EVENTS.ENGAGEMENT.SLIDER_INTERACTION]: {
    slider_id: string
    from_page: string
  }
  [ANALYTICS_EVENTS.ENGAGEMENT.SCROLL_DEPTH]: {
    depth: '25%' | '50%' | '75%' | '100%'
    from_page: string
  }
}

export type AnalyticsEventName = keyof AnalyticsEventProps

// Liste der erlaubten Produktions-Domains
export const ALLOWED_DOMAINS = [
  // Produktive Hauptdomain (siehe src/config/site.ts)
  'bauunternehmen.saarland',
  'www.bauunternehmen.saarland',
  // Alte Domain – bleibt vorerst erlaubt, solange sie noch auflöst/weiterleitet
  'crncic-bausanierung.de',
  'www.crncic-bausanierung.de',
  // Vercel-Domains können hier optional hinzugefügt werden, wenn gewünscht
  // 'crncic-web.vercel.app'
]
