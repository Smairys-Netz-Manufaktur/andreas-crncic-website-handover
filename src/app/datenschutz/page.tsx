import { Metadata } from 'next'
import { SITE_URL, absoluteUrl } from '@/config/site'
import { JsonLd, createBreadcrumbSchema } from '@/components/common/JsonLd'
import DatenschutzContent from '@/components/pages/DatenschutzContent'

export const metadata: Metadata = {
  title: 'Datenschutz',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: absoluteUrl('/datenschutz'),
  },
}

export default function DatenschutzPage() {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Datenschutz', url: absoluteUrl('/datenschutz') },
  ])

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <DatenschutzContent />
    </>
  )
}
