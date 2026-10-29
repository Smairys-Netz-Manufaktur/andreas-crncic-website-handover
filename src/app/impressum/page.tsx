import { Metadata } from 'next'
import { SITE_URL, absoluteUrl } from '@/config/site'
import ImpressumContent from '@/components/pages/ImpressumContent'
import { JsonLd, createBreadcrumbSchema } from '@/components/common/JsonLd'

export const metadata: Metadata = {
  title: 'Impressum',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: absoluteUrl('/impressum'),
  },
}

export default function ImpressumPage() {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Impressum', url: absoluteUrl('/impressum') },
  ])

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <ImpressumContent />
    </>
  )
}
