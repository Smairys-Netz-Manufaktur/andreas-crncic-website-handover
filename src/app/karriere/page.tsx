import { Metadata } from 'next'
import { SITE, SITE_URL, absoluteUrl } from '@/config/site'
import KarriereContent from '@/components/pages/KarriereContent'
import { JsonLd, createBreadcrumbSchema } from '@/components/common/JsonLd'

export const metadata: Metadata = {
  title: 'Karriere – Werden Sie Teil unseres Teams',
  description:
    'Zurzeit keine offenen Stellen. Initiativbewerbung willkommen – kurze Wege, moderne Ausrüstung und faires Miteinander bei der Andreas Crncic GmbH.',
  openGraph: {
    title: 'Karriere – Werden Sie Teil unseres Teams | Andreas Crncic GmbH',
    description: 'Starten Sie Ihre Karriere bei Andreas Crncic GmbH.',
    url: absoluteUrl('/karriere'),
    type: 'website',
    // openGraph wird von Next NICHT tief gemergt – Bild muss pro Seite gesetzt werden.
    images: [SITE.ogImagePath],
  },
  alternates: {
    canonical: absoluteUrl('/karriere'),
  },
}

export default function KarrierePage() {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Karriere', url: absoluteUrl('/karriere') },
  ])

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <KarriereContent />
    </>
  )
}
