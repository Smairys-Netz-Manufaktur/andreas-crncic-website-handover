import { Metadata } from 'next'
import { SITE, SITE_URL, absoluteUrl } from '@/config/site'
import UeberUnsContent from '@/components/pages/UeberUnsContent'
import { JsonLd, createBreadcrumbSchema } from '@/components/common/JsonLd'

export const metadata: Metadata = {
  title: 'Über Uns – 30 Jahre Erfahrung',
  description:
    'Lernen Sie die Philosophie und die Werte kennen, die unser Team seit 30 Jahren antreiben. Ihr verlässlicher Baupartner aus Heusweiler für das Saarland.',
  openGraph: {
    title: 'Über Uns – 30 Jahre Erfahrung | Andreas Crncic GmbH',
    description: 'Lernen Sie unser Team und unsere Philosophie kennen.',
    url: absoluteUrl('/ueber-uns'),
    type: 'website',
    // openGraph wird von Next NICHT tief gemergt – Bild muss pro Seite gesetzt werden.
    images: [SITE.ogImagePath],
  },
  alternates: {
    canonical: absoluteUrl('/ueber-uns'),
  },
}

export default function UeberUnsPage() {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Über Uns', url: absoluteUrl('/ueber-uns') },
  ])

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <UeberUnsContent />
    </>
  )
}
