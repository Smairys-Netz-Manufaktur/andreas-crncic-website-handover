import { Metadata } from 'next'
import { SITE, SITE_URL, absoluteUrl } from '@/config/site'
import LeistungenContent from '@/components/pages/LeistungenContent'
import { JsonLd, createBreadcrumbSchema } from '@/components/common/JsonLd'

export const metadata: Metadata = {
  title: 'Leistungen: Betoninstandsetzung & Bodenbeschichtung',
  description:
    'Betoninstandsetzung nach DAfStb/EN 1504 und Bodenbeschichtung für Industrie- und Lagerhallen. Fachbetrieb für gewerbliche und öffentliche Auftraggeber im Saarland.',
  openGraph: {
    title: 'Unsere Leistungen | Andreas Crncic GmbH',
    description: 'Betoninstandsetzung und Bodenbeschichtung für Gewerbe, Industrie und öffentliche Auftraggeber im Saarland.',
    url: absoluteUrl('/leistungen'),
    type: 'website',
    // openGraph wird von Next NICHT tief gemergt – Bild muss pro Seite gesetzt werden.
    images: [SITE.ogImagePath],
  },
  alternates: {
    canonical: absoluteUrl('/leistungen'),
  },
}

export default function LeistungenPage() {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Leistungen', url: absoluteUrl('/leistungen') },
  ])

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <LeistungenContent />
    </>
  )
}
