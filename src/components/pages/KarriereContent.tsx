'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Button from '@/components/common/Button'
import { SectionDivider } from '@/components/common/SectionDivider'
import {
  Briefcase,
  MapPin,
  ShieldCheck,
  Users,
  Wrench,
  ArrowRight,
  HelpCircle,
} from 'lucide-react'
import { SITE } from '@/config/site'

const benefits = [
  {
    icon: ShieldCheck,
    title: 'Sicherer Arbeitsplatz',
    text: '30 Jahre Erfahrung und volle Auftragsbücher bilden ein solides Fundament.',
  },
  {
    icon: Users,
    title: 'Faires Miteinander',
    text: 'Team auf Augenhöhe – klare Abläufe, respektvoller Umgang.',
  },
  {
    icon: Wrench,
    title: 'Moderne Ausrüstung',
    text: 'Aktueller Maschinen- & Fuhrpark, sinnvolle Arbeitserleichterungen.',
  },
  {
    icon: MapPin,
    title: 'Regionale Einsätze',
    text: 'Projekte im Saarland – planbare Zeiten, kurze Wege.',
  },
]

// Minimalistische FAQ für mehr Tiefe ohne Stellenausschreibungen
const faqs = [
  {
    q: 'Kann ich mich initiativ bewerben?',
    a: 'Ja. Schicken Sie uns kurz Ihre Eckdaten (Erfahrung, Führerscheine, gewünschte Tätigkeit) über das Kontaktformular. Wir melden uns i.d.R. innerhalb von 14 Tagen.',
  },
  {
    q: 'Welche Profile passen zu uns?',
    a: 'Maurer/in, Betonbauer/in, Fliesenleger/in, Facharbeiter/in Hochbau – aber auch motivierte Quereinsteiger mit Handwerksverständnis.',
  },
  {
    q: 'Wie läuft der Bewerbungsprozess?',
    a: 'Kurze Sichtung → Telefonat zur Einordnung → ggf. Kennenlernen vor Ort → Probearbeitstag – transparent und zügig.',
  },
]

export default function KarriereContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden text-center bg-muted">
        <div className="container relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold font-display md:text-6xl text-foreground"
          >
            Bauen Sie Ihre Zukunft. Mit uns.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl mx-auto mt-4 text-lg text-muted-foreground"
          >
            Inhabergeführtes Bauunternehmen aus Heusweiler. Handwerk mit
            Anspruch – regional, zuverlässig, menschlich.
          </motion.p>
        </div>
      </section>

      {/* Warum wir */}
      <section className="py-20 bg-background md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: index * 0.08 }}
                className="px-4"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-red/10 text-brand-red">
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="mt-4 text-xl font-semibold font-display text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-muted-foreground">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider variant={2} />

      {/* Hinweis: aktuell keine Stellen */}
      <section className="py-20 bg-background md:py-24">
        <div className="container">
          <div className="max-w-3xl p-8 mx-auto text-center border rounded-2xl bg-muted/70 border-border">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-red/10 text-brand-red">
              <Briefcase className="w-8 h-8" />
            </div>
            <h2 className="mt-4 text-3xl font-bold font-display text-foreground md:text-4xl">
              Entschuldigung – zurzeit keine Stellen zu vergeben.
            </h2>
            <p className="max-w-2xl mx-auto mt-3 text-muted-foreground">
              Wir freuen uns dennoch über Ihr Interesse. Schicken Sie uns gern
              eine <strong>Initiativbewerbung</strong> – wir melden uns
              werktags innerhalb von 24&nbsp;Stunden.
            </p>

            <div className="flex flex-col items-center justify-center gap-3 mt-8 sm:flex-row">
              <Button asChild>
                <Link href="/kontakt" className="inline-flex items-center gap-2">
                  Initiativ bewerben
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <a
                  href={`mailto:${SITE.email}?subject=Initiativbewerbung%20(Andreas%20Crncic%20GmbH)`}
                  className="inline-flex items-center gap-2"
                >
                  Per E-Mail senden
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Prozess / so arbeiten wir mit Bewerbungen */}
      <section className="py-20 bg-muted md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h3 className="text-3xl font-bold font-display text-foreground md:text-4xl">
              Unser Bewerbungsprozess
            </h3>
            <p className="mt-3 text-muted-foreground">
              Klar, zügig, transparent – damit Sie wissen, woran Sie sind.
            </p>
          </div>

          <div className="grid max-w-5xl grid-cols-1 gap-6 mx-auto md:grid-cols-4">
            {[
              {
                step: '1',
                title: 'Ihre Kontaktaufnahme',
                text: 'Kurz vorstellen, Erfahrung nennen – gern mit Telefonnummer.',
              },
              {
                step: '2',
                title: 'Telefonisches Kennenlernen',
                text: '15 Minuten für Fragen, Aufgabenfeld und Rahmenbedingungen.',
              },
              {
                step: '3',
                title: 'Vor-Ort & Einblick',
                text: 'Kennenlernen im Betrieb, Einblick in Projekte & Ausrüstung.',
              },
              {
                step: '4',
                title: 'Probearbeitstag',
                text: 'Fairer Eindruck für beide Seiten – anschließend Entscheidung.',
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: i * 0.06 }}
                className="p-5 border rounded-xl bg-card border-border"
              >
                <div className="flex items-center justify-center w-10 h-10 text-sm font-bold rounded-full bg-brand-red/10 text-brand-red">
                  {item.step}
                </div>
                <h4 className="mt-3 text-lg font-semibold text-card-foreground">{item.title}</h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-background md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto mb-10 text-center">
            <h3 className="text-3xl font-bold font-display text-foreground md:text-4xl">
              FAQ für Bewerber
            </h3>
            <p className="mt-3 text-muted-foreground">
              Die wichtigsten Fragen kurz beantwortet.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {faqs.map((f, idx) => {
              const open = openFaq === idx
              return (
                <div
                  key={f.q}
                  className="mb-3 overflow-hidden border rounded-lg border-border"
                >
                  <button
                    onClick={() => setOpenFaq(open ? null : idx)}
                    className="flex items-center justify-between w-full p-4 text-left bg-muted/70"
                  >
                    <span className="flex items-center gap-2 font-medium text-foreground">
                      <HelpCircle className="w-5 h-5 text-brand-red" />
                      {f.q}
                    </span>
                    <motion.span
                      initial={false}
                      animate={{ rotate: open ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-muted-foreground"
                      aria-hidden
                    >
                      ▾
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="px-4 pt-2 pb-4"
                      >
                        <p className="text-muted-foreground">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>

          {/* Abschließender CTA */}
          <div className="max-w-3xl p-6 mx-auto mt-12 text-center border rounded-xl bg-muted/70 border-border">
            <p className="text-lg text-foreground">
              Passt? Dann freuen wir uns auf Ihre kurze Nachricht.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 mt-6 sm:flex-row">
              <Button asChild>
                <Link href="/kontakt" className="inline-flex items-center gap-2">
                  Kontakt aufnehmen <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <a
                  href={`mailto:${SITE.email}?subject=Initiativbewerbung%20(Andreas%20Crncic%20GmbH)`}
                  className="inline-flex items-center gap-2"
                >
                  E-Mail senden <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  )
}
