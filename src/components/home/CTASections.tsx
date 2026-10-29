'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Button from '@/components/common/Button'
import { ArrowRight } from 'lucide-react'
import { BeforeAfterSlider } from '@/components/features/BeforeAfterSlider'
import { trackEvent, getFromPage } from '@/lib/plausible'
import { ANALYTICS_EVENTS } from '@/config/analytics'

// Referenz-Bilder: Betoninstandsetzung an einem öffentlichen Gebäude.
import refBefore from '@/assets/images/ref-homburg-halle-before.webp'
import refAfter from '@/assets/images/ref-homburg-halle-after.webp'

export function ReferencesSection() {
  return (
    <section className="py-20 bg-background md:py-32">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold font-display md:text-5xl text-foreground">
            Arbeit, die für sich spricht.
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-lg text-muted-foreground">
            Ein Einblick in unsere Arbeit an gewerblichen, industriellen und
            öffentlichen Objekten.
          </p>
        </div>
        <div className="mt-10">
          <BeforeAfterSlider
            title="Betoninstandsetzung öffentliches Gebäude – Vorher/Nachher"
            before={refBefore.src}
            after={refAfter.src}
          />
        </div>
      </div>
    </section>
  )
}

export function CTASection() {
  return (
    <motion.section 
      className="border-t border-border bg-muted/50"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="container py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold font-display md:text-5xl text-foreground">
            Ihr Projekt mit der richtigen Sorgfalt.
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-lg text-muted-foreground">
            Wir planen und führen Ihr Vorhaben fachgerecht aus: transparent,
            normkonform und terminsicher – auch im Rahmen öffentlicher
            Ausschreibungen.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 mt-8 sm:flex-row">
            <Button asChild>
              <Link
                href="/kontakt"
                onClick={() =>
                  trackEvent(ANALYTICS_EVENTS.NAVIGATION.CLICK, {
                    label: 'Anfrage senden',
                    target: '/kontakt',
                    from_page: getFromPage(),
                    position: 'footer',
                  })
                }
                className="inline-flex items-center gap-2"
              >
                Anfrage senden <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
