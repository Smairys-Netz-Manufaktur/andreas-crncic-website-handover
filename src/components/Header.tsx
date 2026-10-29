// src/components/layout/Header.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import NoTextLogo from '@/assets/logos/no-text-logo.png'
import { Menu, X, Phone } from 'lucide-react'
import Button from '@/components/common/Button'
import { SITE } from '@/config/site'

const navLinks = [
  { name: 'Leistungen', path: '/leistungen' },
  { name: 'Referenzen', path: '/referenzen' },
  { name: 'Über Uns', path: '/ueber-uns' },
  { name: 'Karriere', path: '/karriere' },
]

import { ThemeToggle } from '@/components/ThemeToggle'
import { trackEvent, getFromPage } from '@/lib/plausible'
import { ANALYTICS_EVENTS } from '@/config/analytics'

// ... imports

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname() || ''

  // Scroll-Feedback (Logo schrumpfen, Header dichter)
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* fixed Header mit „Glass“-Hintergrund */}
      <header className="fixed top-0 left-0 right-0 z-50 h-24 transition-all duration-300">
        {/* Glas/Blur-Layer */}
        <div
          className={`absolute inset-0 border-b shadow-sm backdrop-blur-xl transition-colors duration-300 ${
            isScrolled
              ? 'bg-background/90 border-border'
              : 'bg-background/60 border-transparent'
          }`}
        />

        <div className="container relative z-10 flex items-center justify-between h-full">
          {/* Logo mit sanfter Größen-Animation */}
          <Link href="/" aria-label="Zur Startseite">
            <motion.img
              src={NoTextLogo.src}
              alt="Logo der Andreas Crncic GmbH"
              className="w-auto"
              animate={{ height: isScrolled ? '3.5rem' : '5rem' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="items-center hidden space-x-2 md:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.path || pathname.startsWith(link.path + '/')
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  onClick={() =>
                    trackEvent(ANALYTICS_EVENTS.NAVIGATION.CLICK, {
                      label: link.name,
                      target: link.path,
                      from_page: getFromPage(),
                      position: 'header',
                    })
                  }
                  className={`relative rounded-full px-4 py-2 font-display font-semibold transition-colors duration-300 ${
                    isActive
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 rounded-full bg-accent"
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </Link>
              )
            })}
            <div className="flex items-center gap-3 pl-4">
              {/* Priorität 1: Anrufen – direkt im Header erreichbar */}
              <a
                href={`tel:${SITE.phone.tel}`}
                onClick={() =>
                  trackEvent(ANALYTICS_EVENTS.CONTACT.CLICK, {
                    type: 'telefon',
                    position: 'header',
                    from_page: getFromPage(),
                  })
                }
                className="flex items-center gap-2 rounded-full border border-border px-4 py-2 font-display font-semibold text-foreground transition-colors duration-300 hover:border-primary hover:text-primary"
                aria-label={`Jetzt anrufen: ${SITE.phone.international}`}
              >
                <Phone className="w-4 h-4 text-primary" aria-hidden />
                <span>{SITE.phone.display}</span>
              </a>

              {/* Priorität 2: Kontakt/Anfrage */}
              <Button variant="primary" size="sm" asChild>
                <Link
                  href="/kontakt"
                  onClick={() =>
                    trackEvent(ANALYTICS_EVENTS.NAVIGATION.CLICK, {
                      label: 'Kontakt',
                      target: '/kontakt',
                      from_page: getFromPage(),
                      position: 'header',
                    })
                  }
                >
                  Kontakt
                </Link>
              </Button>
              <ThemeToggle />
            </div>
          </nav>

          {/* Mobile Controls */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Priorität 1 auf Mobile: Anrufen mit einem Tap */}
            <a
              href={`tel:${SITE.phone.tel}`}
              onClick={() =>
                trackEvent(ANALYTICS_EVENTS.CONTACT.CLICK, {
                  type: 'telefon',
                  position: 'header',
                  from_page: getFromPage(),
                })
              }
              className="flex items-center gap-2 rounded-full bg-brand-red px-4 py-2 font-display font-semibold text-ui-white shadow-lg"
              aria-label={`Jetzt anrufen: ${SITE.phone.international}`}
            >
              <Phone className="w-5 h-5" aria-hidden />
              <span className="text-sm">Anrufen</span>
            </a>
            <button
              onClick={() => setIsMenuOpen(true)}
              aria-label="Menü öffnen"
              className="p-2 text-foreground"
            >
              <Menu className="w-8 h-8" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay / Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          >
            <motion.div
              key="mobile-drawer"
              initial={{ x: '100%' }}
              animate={{ x: '0%' }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="absolute top-0 right-0 w-4/5 h-full max-w-sm p-6 shadow-xl bg-card border-l border-border"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-8">
                <ThemeToggle />
                <button
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Menü schließen"
                  className="p-2 text-foreground"
                >
                  <X className="h-7 w-7" />
                </button>
              </div>

              {/* Call-CTA prominent über der Navigation */}
              <a
                href={`tel:${SITE.phone.tel}`}
                onClick={() => {
                  setIsMenuOpen(false)
                  trackEvent(ANALYTICS_EVENTS.CONTACT.CLICK, {
                    type: 'telefon',
                    position: 'mobile-menu',
                    from_page: getFromPage(),
                  })
                }}
                className="flex items-center justify-center gap-3 w-full rounded-lg bg-brand-red px-4 py-4 font-display text-lg font-semibold text-ui-white shadow-lg mb-8"
              >
                <Phone className="w-5 h-5" aria-hidden />
                <span>{SITE.phone.display}</span>
              </a>

              <nav className="flex flex-col space-y-6">
                {[...navLinks, { name: 'Kontakt', path: '/kontakt' }].map(
                  (link) => {
                    const isActive = pathname === link.path
                    return (
                      <Link
                        key={`mobile-${link.name}`}
                        href={link.path}
                        onClick={() => {
                          setIsMenuOpen(false)
                          trackEvent(ANALYTICS_EVENTS.NAVIGATION.CLICK, {
                            label: link.name,
                            target: link.path,
                            from_page: getFromPage(),
                            position: 'mobile-menu',
                          })
                        }}
                        className={`font-display text-2xl font-semibold transition-colors hover:text-primary ${
                          isActive ? 'text-primary' : 'text-foreground'
                        }`}
                      >
                        {link.name}
                      </Link>
                    )
                  }
                )}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div aria-hidden className="h-24" />
    </>
  )
}
