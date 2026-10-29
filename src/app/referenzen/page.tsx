import { Metadata } from 'next'
import { SITE, SITE_URL, absoluteUrl } from '@/config/site'
import ReferenzenContent from '@/components/pages/ReferenzenContent'
import { JsonLd, createBreadcrumbSchema } from '@/components/common/JsonLd'

export const metadata: Metadata = {
  title: 'Referenzen – Unsere Projekte im Saarland',
  description:
    'Ausgeführte Projekte aus den Bereichen Betoninstandsetzung und Bodenbeschichtung – für gewerbliche, industrielle und öffentliche Auftraggeber im Saarland.',
  openGraph: {
    title: 'Referenzen – Unsere Projekte im Saarland',
    description: 'Betoninstandsetzung und Bodenbeschichtung – ausgeführte Projekte im Überblick.',
    url: absoluteUrl('/referenzen'),
    type: 'website',
    // openGraph wird von Next NICHT tief gemergt – Bild muss pro Seite gesetzt werden.
    images: [SITE.ogImagePath],
  },
  alternates: {
    canonical: absoluteUrl('/referenzen'),
  },
}

export default function ReferenzenPage() {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Referenzen', url: absoluteUrl('/referenzen') },
  ])

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <ReferenzenContent />
    </>
  )
}
