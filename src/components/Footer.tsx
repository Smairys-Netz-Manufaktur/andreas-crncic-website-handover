'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

// Logos
import CrncicLogoBlack from '@/assets/logos/crncic-logo.png'
import CrncicLogoWhite from '@/assets/logos/crncic-logo-weiß.png'

import { Phone, Mail, MapPin, ArrowUp } from 'lucide-react'
import { trackEvent, getFromPage } from '@/lib/plausible'
import { ANALYTICS_EVENTS } from '@/config/analytics'
import { SITE } from '@/config/site'

// --- Footer-spezifische Daten; Firmendaten kommen aus @/config/site ---
const siteConfig = {
  contact: {
    phone: { href: SITE.phone.tel, display: SITE.phone.display },
    email: SITE.email,
    addressLine1: SITE.address.street,
    addressLine2: `${SITE.address.postalCode} ${SITE.address.city}`,
  },
  navLinks: [
    { to: '/leistungen/betoninstandsetzung', label: 'Betoninstandsetzung' },
    { to: '/leistungen/bodenbeschichtung', label: 'Bodenbeschichtung' },
    { to: '/referenzen', label: 'Referenzen' },
    { to: '/impressum', label: 'Impressum' },
    { to: '/datenschutz', label: 'Datenschutz' },
  ],
}

const footerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.2 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const BackToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300)
    }
    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <motion.button
      onClick={scrollToTop}
      aria-label="Nach oben scrollen"
      className="fixed z-50 flex items-center justify-center w-12 h-12 text-white rounded-full shadow-lg bottom-6 right-6 bg-brand-red"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: isVisible ? 1 : 0, opacity: isVisible ? 1 : 0 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <ArrowUp className="w-6 h-6" />
    </motion.button>
  )
}

const Footer: React.FC = () => {
  return (
    <>
      <motion.footer
        className="overflow-hidden border-t border-border bg-muted text-muted-foreground"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={footerVariants}
      >
        <div>
          <div className="container py-16 md:py-24">
            <motion.div
              variants={footerVariants}
              className="flex flex-col items-center gap-12 md:flex-row md:items-start md:gap-8"
            >
              <motion.div
                variants={itemVariants}
                className="flex flex-col items-center text-center md:w-1/3 md:items-start md:text-left"
              >
                {/*
                  Logo-Wechsel rein per CSS (`dark:`-Variante) statt ueber
                  `resolvedTheme` nach dem Mount: kein falsches Logo bis zur
                  Hydration und kein setState im Effect. Das jeweils
                  ausgeblendete Bild wird wegen `loading="lazy"` nicht geladen.
                */}
                <div className="relative w-auto h-32">
                  <img
                    src={CrncicLogoBlack.src}
                    alt="Andreas Crncic GmbH Logo"
                    className="block w-auto h-full dark:hidden"
                    loading="lazy"
                  />
                  <img
                    src={CrncicLogoWhite.src}
                    alt="Andreas Crncic GmbH Logo"
                    className="hidden w-auto h-full dark:block"
                    loading="lazy"
                  />
                </div>
                <p className="max-w-xs mx-auto mt-6 text-muted-foreground/80 md:mx-0">
                  Qualität, die Fundamente schafft. Fachbetrieb für
                  Betoninstandsetzung und Bodenbeschichtung im Saarland.
                </p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="hidden w-px h-auto bg-border md:block"
              />

              <motion.div
                variants={itemVariants}
                className="grid flex-grow w-full grid-cols-1 gap-12 text-center sm:grid-cols-2 sm:text-left"
              >
                <div>
                  <h3 className="text-lg font-semibold tracking-wider uppercase font-display text-foreground">
                    Navigation
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {siteConfig.navLinks.map((link) => (
                      <li key={link.to}>
                        <Link
                          href={link.to}
                          className="transition-colors hover:text-primary"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold tracking-wider uppercase font-display text-foreground">
                    Zentrale Heusweiler
                  </h3>
                  <address className="mt-4 space-y-3 not-italic">
                    <p className="flex items-center justify-center sm:justify-start">
                      <MapPin className="flex-shrink-0 w-4 h-4 mr-3 text-primary" />
                      {siteConfig.contact.addressLine1},{' '}
                      {siteConfig.contact.addressLine2}
                    </p>
                    <p>
                      <a
                        href={`tel:${siteConfig.contact.phone.href}`}
                        onClick={() =>
                          trackEvent(ANALYTICS_EVENTS.CONTACT.CLICK, {
                            type: 'telefon',
                            position: 'footer',
                            from_page: getFromPage(),
                          })
                        }
                        className="flex items-center justify-center transition-colors hover:text-primary sm:justify-start"
                      >
                        <Phone className="flex-shrink-0 w-4 h-4 mr-3 text-primary" />
                        {siteConfig.contact.phone.display}
                      </a>
                    </p>
                    <p></p>
                    <p>
                      <a
                        href={`mailto:${siteConfig.contact.email}`}
                        onClick={() =>
                          trackEvent(ANALYTICS_EVENTS.CONTACT.CLICK, {
                            type: 'email',
                            position: 'footer',
                            from_page: getFromPage(),
                          })
                        }
                        className="flex items-center justify-center transition-colors hover:text-primary sm:justify-start"
                      >
                        <Mail className="flex-shrink-0 w-4 h-4 mr-3 text-primary" />
                        {siteConfig.contact.email}
                      </a>
                    </p>
                  </address>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
        <div className="bg-[#0B0B0C] py-8 sm:py-10">
          <div className="container flex flex-col items-center gap-3 text-center sm:gap-4">
            <p className="text-xs tracking-wide text-white/40">
              © {new Date().getFullYear()}{' '}
              <a
                href="https://smairys.de"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white/70"
              >
                Smairys Netz-Manufaktur
              </a>
              . Alle Rechte vorbehalten.
            </p>
          </div>
        </div>
      </motion.footer>

      <BackToTopButton />
    </>
  )
}

export default Footer
