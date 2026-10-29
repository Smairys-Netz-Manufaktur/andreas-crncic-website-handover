'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { MolecularFortress } from '@/components/common/MolecularFortress'
import { SectionDivider } from '@/components/common/SectionDivider'
import { servicesData } from '@/data/services'

interface ServiceDetailContentProps {
  slug: string
}

export default function ServiceDetailContent({ slug }: ServiceDetailContentProps) {
  const service = servicesData.find((s) => s.slug === slug)

  if (!service) {
    return null
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden text-center text-white bg-neutral-900">
        <Image
          src={service.heroImage}
          alt={service.title}
          className="absolute inset-0 object-cover w-full h-full opacity-20"
          fill
          priority
          sizes="100vw"
        />
        <div className="container relative z-10">
          <h1 className="text-4xl font-bold font-display md:text-6xl">
            {service.title}
          </h1>
          <p className="max-w-3xl mx-auto mt-4 text-lg text-white/80">
            {service.longDescription}
          </p>
        </div>
      </section>

      <SectionDivider variant={0} />

      {/* Value / Invest */}
      <section className="py-20 bg-background md:py-24">
        <div className="container grid items-center gap-12 md:grid-cols-2">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold font-display text-foreground md:text-4xl">
              Mehr als Reparatur: eine wirtschaftliche Investition
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Professionelle Ausführung verhindert Folgeschäden, reduziert
              Stillstandzeiten und senkt Lebenszykluskosten.{' '}
              <strong>Das rechnet sich – planbar und normgerecht.</strong>
            </p>
            <Link
              href="/referenzen"
              className="inline-flex items-center px-5 py-3 mt-8 text-primary-foreground transition rounded-md bg-primary hover:opacity-90"
            >
              Projekte ansehen <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>

          <div className="relative overflow-hidden rounded-lg shadow-lg h-96">
            <Image
              src={service.detailImage}
              alt={`Detailaufnahme ${service.title}`}
              className="object-cover w-full h-full"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      <SectionDivider variant={2} />

      {/* Prozess / Verfahrensmethoden */}
      <section className="py-20 bg-muted/30 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto mb-16 text-center">
            <h2 className="text-3xl font-bold font-display text-foreground md:text-5xl">
              Unsere Verfahrensmethoden
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Transparent, systematisch und nach höchsten Qualitätsstandards
              (DAfStb / EN&nbsp;1504).
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-2 lg:grid-cols-4">
            {service.process.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 text-primary">
                  <step.icon className="w-10 h-10" />
                </div>
                <h3 className="mt-6 text-2xl font-semibold font-display text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-muted-foreground/80">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {service.slug === 'betoninstandsetzung' && (
        <>
          <MolecularFortress />
        </>
      )}

      {/* Next Step */}
      <section className="py-16 bg-background">
        <div className="container text-center">
          <Link
            href="/kontakt"
            className="inline-flex items-center px-5 py-3 text-primary-foreground transition rounded-md bg-primary hover:opacity-90"
          >
            Projekt anfragen{' '}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </section>
    </motion.div>
  )
}
