import type { Metadata } from 'next'
import { Montserrat, Roboto } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { SITE, SITE_URL } from '@/config/site'

// Optimized font loading with next/font
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['600', '700'],
  display: 'swap',
  variable: '--font-display',
})

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-body',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Andreas Crncic GmbH | Betoninstandsetzung & Bodenbeschichtung',
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    'Betoninstandsetzung',
    'Bodenbeschichtung',
    'Industrieboden',
    'Hallenboden',
    'Reprofilierung',
    'Betoninstandsetzung Saarland',
    'Saarland',
    'Heusweiler',
    'Andreas Crncic GmbH',
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.name,
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: SITE_URL,
    siteName: SITE.name,
    title: 'Andreas Crncic GmbH | Betoninstandsetzung & Bodenbeschichtung',
    description: SITE.description,
    images: [
      {
        url: SITE.ogImagePath,
        width: 1200,
        height: 630,
        alt: 'Andreas Crncic GmbH – Betoninstandsetzung und Bodenbeschichtung im Saarland',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Andreas Crncic GmbH | Betoninstandsetzung & Bodenbeschichtung',
    description: SITE.description,
    images: [SITE.ogImagePath],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}



import { Providers } from '@/components/Providers'
import { JsonLd, organizationSchema } from '@/components/common/JsonLd'
import { ScrollDepthTracker } from '@/hooks/useScrollDepthTracking'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" suppressHydrationWarning className={`${montserrat.variable} ${roboto.variable}`}>
      <head>
        {/* Preconnect for third-party performance */}
        <link rel="dns-prefetch" href="https://www.google.com" />
      </head>
      {/* Plausible muss vom neuen Betreiber eingerichtet werden. */}
      <body>
        <JsonLd data={organizationSchema} />
        <ScrollDepthTracker />
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
