import { MetadataRoute } from 'next'
import { absoluteUrl } from '@/config/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // /_next/ darf NICHT blockiert werden – Google muss CSS, JS und Bilder rendern können.
        disallow: ['/api/'],
      },
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
  }
}
