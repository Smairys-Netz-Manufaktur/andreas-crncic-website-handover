import { Metadata } from 'next'
import { SITE, SITE_URL, absoluteUrl } from '@/config/site'
import KontaktContent from '@/components/pages/KontaktContent'
import { JsonLd, localBusinessSchema, createBreadcrumbSchema } from '@/components/common/JsonLd'

export const metadata: Metadata = {
  title: 'Kontakt – Anfrage & Ausschreibung',
  description:
    'Anfragen zu Betoninstandsetzung und Bodenbeschichtung – für öffentliche Auftraggeber, Generalunternehmer, Industrie und Gewerbe. Rückmeldung werktags innerhalb von 24 Stunden.',
  openGraph: {
    title: 'Kontakt – Anfrage & Ausschreibung | Andreas Crncic GmbH',
    description: 'Ihre Anfrage zu Betoninstandsetzung und Bodenbeschichtung im Saarland.',
    url: absoluteUrl('/kontakt'),
    type: 'website',
    // openGraph wird von Next NICHT tief gemergt – Bild muss pro Seite gesetzt werden.
    images: [SITE.ogImagePath],
  },
  alternates: {
    canonical: absoluteUrl('/kontakt'),
  },
}

export default function KontaktPage() {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Kontakt', url: absoluteUrl('/kontakt') },
  ])

  return (
    <>
      <JsonLd data={localBusinessSchema} />
      <JsonLd data={breadcrumbSchema} />
      <KontaktContent />
    </>
  )
}

