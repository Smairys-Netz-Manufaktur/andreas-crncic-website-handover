import { SITE, absoluteUrl, LOGO_URL, OG_IMAGE_URL } from '@/config/site'

type OrganizationSchema = {
  '@context': 'https://schema.org'
  '@type': 'Organization'
  name: string
  url: string
  logo: string
  description: string
  address: {
    '@type': 'PostalAddress'
    streetAddress: string
    postalCode: string
    addressLocality: string
    addressCountry: string
  }
  contactPoint: {
    '@type': 'ContactPoint'
    telephone: string
    contactType: string
    email: string
    areaServed: string
    availableLanguage: string
  }
  sameAs?: string[]
}

type LocalBusinessSchema = {
  '@context': 'https://schema.org'
  '@type': 'LocalBusiness'
  name: string
  url: string
  image?: string
  description?: string
  address: {
    '@type': 'PostalAddress'
    streetAddress: string
    postalCode: string
    addressLocality: string
    addressCountry: string
  }
  telephone: string
  email: string
  areaServed: string
  openingHours?: string[]
  priceRange?: string
}

type ServiceSchema = {
  '@context': 'https://schema.org'
  '@type': 'Service'
  serviceType: string
  name: string
  description: string
  url: string
  provider: {
    '@type': 'Organization'
    name: string
    url: string
  }
  areaServed: {
    '@type': 'State'
    name: string
  }
  image?: string
}

type BreadcrumbItem = {
  '@type': 'ListItem'
  position: number
  name: string
  item: string
}

type BreadcrumbSchema = {
  '@context': 'https://schema.org'
  '@type': 'BreadcrumbList'
  itemListElement: BreadcrumbItem[]
}

type JsonLdSchema = OrganizationSchema | LocalBusinessSchema | ServiceSchema | BreadcrumbSchema

interface JsonLdProps {
  data: JsonLdSchema
}

/**
 * `<` als Unicode-Escape: Ein `</script>` in irgendeinem Textfeld würde sonst
 * das Script-Tag beenden und nachfolgendes HTML einschleusen (XSS). Für JSON
 * ist `<` gleichwertig, Suchmaschinen lesen denselben Inhalt.
 */
function serializeJsonLd(data: JsonLdSchema): string {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  )
}

// Helper to create Service Schema for service detail pages
export function createServiceSchema(
  serviceType: string,
  name: string,
  description: string,
  slug: string
): ServiceSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType,
    name,
    description,
    url: absoluteUrl(`/leistungen/${slug}`),
    provider: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
    },
    areaServed: {
      '@type': 'State',
      name: SITE.areaServed,
    },
    image: OG_IMAGE_URL,
  }
}

// Helper to create Breadcrumb Schema
export function createBreadcrumbSchema(
  items: { name: string; url: string }[]
): BreadcrumbSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

// Pre-configured Organization schema for global use
export const organizationSchema: OrganizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE.name,
  url: SITE.url,
  // Unternehmenslogo – NICHT das Social-Preview-Bild.
  logo: LOGO_URL,
  description: SITE.description,
  address: {
    '@type': 'PostalAddress',
    streetAddress: SITE.address.street,
    postalCode: SITE.address.postalCode,
    addressLocality: SITE.address.city,
    addressCountry: SITE.address.country,
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: SITE.phone.international,
    contactType: 'customer service',
    email: SITE.email,
    areaServed: SITE.areaServed,
    availableLanguage: 'German',
  },
}

// Pre-configured LocalBusiness schema for contact page
export const localBusinessSchema: LocalBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: SITE.name,
  url: absoluteUrl('/kontakt'),
  image: LOGO_URL,
  description:
    'Betoninstandsetzung und Bodenbeschichtung im Saarland – für öffentliche Auftraggeber, Generalunternehmer, Industrie und Gewerbe.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: SITE.address.street,
    postalCode: SITE.address.postalCode,
    addressLocality: SITE.address.city,
    addressCountry: SITE.address.country,
  },
  telephone: SITE.phone.international,
  email: SITE.email,
  areaServed: SITE.areaServed,
  openingHours: [...SITE.openingHours],
}

