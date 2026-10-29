import { ALLOWED_DOMAINS, AnalyticsEventName, AnalyticsEventProps } from '@/config/analytics'

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string | number | boolean> }) => void
  }
}

/**
 * Hilfsfunktion, um den aktuellen Pfad ohne Query-Parameter oder Hash zu erhalten.
 * Verhindert, dass PII (z.B. aus UTM-Parametern) versehentlich getrackt werden.
 */
export function getFromPage(): string {
  if (typeof window === 'undefined') return ''
  const { pathname } = window.location
  return pathname || '/'
}

/**
 * Zentraler Tracking-Helper für Plausible Analytics.
 * Sicherheitsrichtlinien:
 * 1. Events werden nur auf freigegebenen Domains gesendet.
 * 2. Es dürfen keine personenbezogenen Daten (PII) in den Props enthalten sein.
 *    – dies wird durch die Struktur der Props und interne Guidelines unterstützt.
 */
export function trackEvent<E extends AnalyticsEventName>(
  eventName: E,
  props: AnalyticsEventProps[E]
) {
  // 1. SSR Check
  if (typeof window === 'undefined') return

  // 2. Domain Check
  const currentHostname = window.location.hostname
  const isAllowedDomain = ALLOWED_DOMAINS.includes(currentHostname)
  
  // Preview-Tracking nur wenn explizit erlaubt
  const isPreviewTrackingEnabled = process.env.NEXT_PUBLIC_ENABLE_PREVIEW_TRACKING === 'true'
  const isVercelPreview = currentHostname.endsWith('.vercel.app')
  
  const shouldTrack = isAllowedDomain || (isVercelPreview && isPreviewTrackingEnabled)

  if (!shouldTrack) {
    if (process.env.NODE_ENV === 'development') {
      console.debug(`[Analytics] Event suppressed (Host: ${currentHostname}):`, eventName, props)
    }
    return
  }

  // 3. Plausible Availability Check
  if (!window.plausible) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[Analytics] window.plausible not found. Is the script loaded?')
    }
    return
  }

  // 4. Send Event
  try {
    window.plausible(eventName, { props })
    if (process.env.NODE_ENV === 'development') {
      console.debug(`[Analytics] Event sent:`, eventName, props)
    }
  } catch (error) {
    // Fehler stillschweigend abfangen, um UI nicht zu blockieren
    if (process.env.NODE_ENV === 'development') {
      console.error('[Analytics] Failed to send event:', error)
    }
  }
}

