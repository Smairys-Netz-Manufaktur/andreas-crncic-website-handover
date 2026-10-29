import { Metadata } from 'next'
import { SITE, SITE_URL } from '@/config/site'
import { HeroSection } from '@/components/home/HeroSection'
import { ServicesSection } from '@/components/home/ServicesSection'
import { ReferencesSection, CTASection } from '@/components/home/CTASections'
import { SectionDivider } from '@/components/common/SectionDivider'
import { ConcreteChemistry } from '@/components/common/ConcreteChemistry'

// SEO: Server-side metadata for better crawlability
export const metadata: Metadata = {
  // `absolute` verhindert, dass das globale Title-Template die Marke doppelt anhängt.
  title: {
    absolute: 'Andreas Crncic GmbH | Betoninstandsetzung & Bodenbeschichtung im Saarland',
  },
  description:
    'Betoninstandsetzung nach DAfStb/EN 1504 und Bodenbeschichtung für Industrie- und Lagerhallen. 30+ Jahre Erfahrung – für öffentliche Auftraggeber, Generalunternehmer, Industrie und Gewerbe.',
  openGraph: {
    title: 'Andreas Crncic GmbH | Betoninstandsetzung & Bodenbeschichtung',
    description: SITE.description,
    url: SITE_URL,
    // openGraph wird von Next NICHT tief gemergt – Bild muss pro Seite gesetzt werden.
    images: [SITE.ogImagePath],
  },
  alternates: {
    canonical: SITE_URL,
  },
}

/**
 * Homepage - Server Component with Client Islands
 * 
 * This page is rendered as a Server Component for optimal SEO.
 * Interactive sections are imported as Client Components (islands).
 */
export default function Home() {
  return (
    <div>
      {/* Hero Section - Client Component (Theme Switch, Animations) */}
      <HeroSection />

      <SectionDivider variant={0} />

      {/* Services Section - Client Component (Animations, Analytics) */}
      <ServicesSection />

      {/* Concrete Chemistry - Static/Client Component */}
      <ConcreteChemistry />

      <SectionDivider variant={1} />

      {/* References Section - Client Component (BeforeAfterSlider) */}
      <ReferencesSection />

      <SectionDivider variant={2} />

      {/* CTA Section - Client Component (Analytics) */}
      <CTASection />
    </div>
  )
}
