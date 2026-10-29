import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === 'development'

/**
 * Content-Security-Policy.
 *
 * Erlaubt nur die Quellen, die die Seite tatsächlich nutzt: eigene Assets,
 * Plausible (Analytics) und Google reCAPTCHA (nur auf /kontakt geladen, Pfade
 * laut Google-Doku). Alles andere – fremde Skripte, Frames, Formularziele,
 * Plugins, <base>-Manipulation, Einbettung in fremde Seiten – ist gesperrt.
 *
 * `'unsafe-inline'` für Skripte ist nötig, weil alle Seiten statisch
 * vorgerendert werden: Next.js, next-themes und JSON-LD nutzen Inline-Skripte,
 * und Nonces würden dynamisches Rendern jeder Seite erzwingen. Der Schutz vor
 * nachgeladenem Fremdcode (Host-Whitelist) und vor Datenabfluss (connect-src)
 * bleibt trotzdem bestehen.
 *
 * Im Development braucht Next zusätzlich `'unsafe-eval'` (React-Debugging) und
 * WebSockets (Hot Reload).
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  [
    "script-src 'self' 'unsafe-inline'",
    isDev ? "'unsafe-eval'" : '',
    'https://plausible.io',
    'https://www.google.com/recaptcha/',
    'https://www.gstatic.com/recaptcha/',
  ]
    .filter(Boolean)
    .join(' '),
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  ['connect-src', "'self'", 'https://plausible.io', 'https://www.google.com/recaptcha/', isDev ? 'ws: wss:' : '']
    .filter(Boolean)
    .join(' '),
  'frame-src https://www.google.com/recaptcha/ https://recaptcha.google.com/recaptcha/',
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  isDev ? '' : 'upgrade-insecure-requests',
]
  .filter(Boolean)
  .join('; ')

const securityHeaders = [
  { key: 'Content-Security-Policy', value: contentSecurityPolicy },
  // Vercel setzt HSTS bereits; hier explizit inkl. Subdomains, damit es nicht
  // von der Plattform-Voreinstellung abhängt. Bewusst ohne `preload`.
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Ältere Browser ohne `frame-ancestors`-Unterstützung.
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()',
  },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
]

const nextConfig: NextConfig = {
  // Kein "X-Powered-By: Next.js" – verrät unnötig den Stack.
  poweredByHeader: false,
  images: {
    // Enable image optimization for better Core Web Vitals
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  experimental: {
    serverActions: {
      // Das Kontaktformular ist die einzige Server Action: max. 5000 Zeichen
      // Nachricht plus zwei reCAPTCHA-Tokens bleiben weit unter 64 KB. Der
      // Default (1 MB) wäre unnötige Angriffsfläche für große Payloads.
      bodySizeLimit: '64kb',
    },
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
  async redirects() {
    return [
      // Leistungs-Taxonomie bereinigt: nur noch `betoninstandsetzung` und
      // `bodenbeschichtung`. Die Altpfade sind indexiert und werden dauerhaft
      // umgeleitet, damit weder Nutzer noch Crawler auf 404 laufen.
      {
        source: '/leistungen/betonsanierung',
        destination: '/leistungen/betoninstandsetzung',
        permanent: true,
      },
      {
        // Balkonsanierung wird nicht mehr angeboten – es gibt keine
        // gleichwertige Nachfolgeseite, daher auf die Leistungsübersicht.
        source: '/leistungen/balkonsanierung',
        destination: '/leistungen',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
