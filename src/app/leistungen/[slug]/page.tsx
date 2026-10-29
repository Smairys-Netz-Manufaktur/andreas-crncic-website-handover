import { Metadata } from 'next'
import { SITE, SITE_URL, absoluteUrl } from '@/config/site'
import { notFound } from 'next/navigation'
import ServiceDetailContent from '@/components/pages/ServiceDetailContent'
import { servicesData } from '@/data/services'
import { JsonLd, createServiceSchema, createBreadcrumbSchema } from '@/components/common/JsonLd'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = servicesData.find((s) => s.slug === slug)

  if (!service) {
    return {
      title: 'Leistung nicht gefunden',
    }
  }

  const url = absoluteUrl(`/leistungen/${slug}`)

  return {
    title: `${service.title} im Saarland`,
    description: service.longDescription,
    openGraph: {
      title: `${service.title} | Andreas Crncic GmbH`,
      description: service.shortDescription,
      url,
      type: 'website',
      // openGraph wird von Next NICHT tief gemergt – Bild muss pro Seite gesetzt werden.
      images: [SITE.ogImagePath],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${service.title} im Saarland`,
      description: service.shortDescription,
      images: [SITE.ogImagePath],
    },
    alternates: {
      canonical: url,
    },
  }
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params
  const service = servicesData.find((s) => s.slug === slug)

  if (!service) {
    notFound()
  }

  // Create structured data for this service
  const serviceSchema = createServiceSchema(
    service.title,
    `${service.title} im Saarland`,
    service.longDescription,
    slug
  )

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Leistungen', url: absoluteUrl('/leistungen') },
    { name: service.title, url: absoluteUrl(`/leistungen/${slug}`) },
  ])

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbSchema} />
      <ServiceDetailContent slug={slug} />
    </>
  )
}

