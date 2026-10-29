'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import Button from '@/components/common/Button'
import { SectionDivider } from '@/components/common/SectionDivider'
import {
  ArrowRight,
  CheckCircle,
  Search,
  DraftingCompass,
  Hammer,
  Award,
} from 'lucide-react'
import { trackEvent, getFromPage } from '@/lib/plausible'
import { ANALYTICS_EVENTS } from '@/config/analytics'
import { servicesData } from '@/data/services'

// Karten aus der zentralen Leistungs-Taxonomie ableiten (src/data/services.ts),
// damit Titel, Bilder und Slugs nicht gegen die Detailseiten auseinanderlaufen.
const services = servicesData.map((service) => ({
  icon: service.icon,
  title: service.title,
  description: service.shortDescription,
  image: service.heroImage,
  subServices: service.subServices,
  link: `/leistungen/${service.slug}`,
}))

// Daten für den "Unser Ansatz"-Abschnitt
const processSteps = [
  {
    icon: Search,
    title: 'Analyse & Beratung',
    text: 'Jedes Projekt beginnt mit genauem Zuhören und einer präzisen Analyse vor Ort.',
  },
  {
    icon: DraftingCompass,
    title: 'Planung & Konzeption',
    text: 'Wir entwickeln eine maßgeschneiderte, nachhaltige Lösung für Ihr Anliegen.',
  },
  {
    icon: Hammer,
    title: 'Fachgerechte Umsetzung',
    text: 'Unsere geschulten Teams setzen die Planung mit höchster Sorgfalt und Qualität um.',
  },
  {
    icon: Award,
    title: 'Abnahme & Garantie',
    text: 'Wir stehen zu unserer Arbeit und übergeben Ihnen ein Ergebnis, das Bestand hat.',
  },
]

export default function LeistungenContent() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Sektion */}
      <section className="relative pt-32 pb-20 overflow-hidden text-center bg-muted/30">
        <div className="container relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold font-display md:text-6xl text-foreground"
          >
            Unsere Leistungen
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl mx-auto mt-4 text-lg text-muted-foreground"
          >
            Zwei Kernleistungen, konsequent auf gewerbliche und öffentliche
            Auftraggeber ausgerichtet: Betoninstandsetzung und Bodenbeschichtung
            – normgerecht ausgeführt und nachvollziehbar dokumentiert.
          </motion.p>
        </div>
      </section>

      {/* "Unser Ansatz" Sektion */}
      <section className="py-20 bg-background md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto mb-16 text-center">
            <h2 className="text-3xl font-bold font-display text-foreground md:text-5xl">
              Qualität in jeder Phase
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Unser systematisches Vorgehen garantiert Ihnen Transparenz und
              erstklassige Ergebnisse von Anfang bis Ende.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.title}
                className="p-4 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted text-primary">
                  <step.icon className="w-10 h-10" />
                </div>
                <h3 className="mt-5 text-2xl font-semibold font-display text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-muted-foreground/80">{step.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider variant={1} />

      {/* Kernkompetenzen als "Portal-Karten" */}
      <section className="py-20 bg-background md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto mb-16 text-center">
            <h2 className="text-3xl font-bold font-display text-foreground md:text-5xl">
              Unsere Kernkompetenzen
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Klicken Sie auf eine Leistung, um Verfahren, Normbezug und
              Ablauf im Detail zu sehen.
            </p>
          </div>
          <div className="grid max-w-5xl gap-8 mx-auto md:grid-cols-2">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={service.link}
                  onClick={() =>
                    trackEvent(ANALYTICS_EVENTS.CONTENT.SERVICE_VIEW, {
                      service: service.title,
                      position: 'leistungen-seite',
                      from_page: getFromPage(),
                    })
                  }
                  className="block overflow-hidden text-left transition-all duration-300 border rounded-lg shadow-sm border-border bg-card hover:shadow-2xl hover:-translate-y-2 group"
                >
                  <div className="relative w-full h-56 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                    />
                  </div>
                  <div className="p-8">
                    <div className="flex items-start justify-between">
                      <service.icon className="flex-shrink-0 w-12 h-12 text-primary" />
                      <ArrowRight className="w-6 h-6 transition-transform duration-300 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-1" />
                    </div>
                    <h3 className="mt-4 text-2xl font-semibold font-display text-foreground">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-muted-foreground">
                      {service.description}
                    </p>

                    {/* Hier wird das CheckCircle-Icon verwendet */}
                    <div className="pt-4 mt-6 border-t border-border">
                      <ul className="space-y-2 text-sm">
                        {service.subServices.map((sub) => (
                          <li
                            key={sub}
                            className="flex items-center gap-2 text-muted-foreground"
                          >
                            <CheckCircle className="flex-shrink-0 w-4 h-4 text-primary" />
                            <span>{sub}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Abschließender CTA */}
      <section className="border-t border-border bg-muted/50">
        <div className="container py-20 text-center md:py-24">
          <h2 className="text-3xl font-bold font-display text-foreground md:text-5xl">
            Ausschreibung oder Objektanfrage?
          </h2>
          <p className="max-w-2xl mx-auto mt-6 text-lg text-muted-foreground">
            Senden Sie uns Ihr Leistungsverzeichnis oder Ihre Anfrage – wir
            prüfen das Vorhaben und melden uns kurzfristig zurück.
          </p>
          <div className="mt-10">
            <Button size="lg" variant="primary" asChild>
              <Link href="/kontakt" className="inline-flex items-center">
                Gespräch vereinbaren
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </motion.div>
  )
}
