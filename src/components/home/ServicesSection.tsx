'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { servicesData } from '@/data/services'
import { trackEvent, getFromPage } from '@/lib/plausible'
import { ANALYTICS_EVENTS } from '@/config/analytics'
import styles from './ServicesSection.module.css'

// Derive services from central data source (src/data/services.ts)
const homeServices = servicesData.map((s) => ({
  icon: s.icon,
  title: s.title,
  description: s.shortDescription,
  image: s.heroImage,
  link: `/leistungen/${s.slug}`,
  subServices: s.subServices,
}))

export function ServicesSection() {
  return (
    <section className={`${styles.section} bg-background`}>
      <div className="container">
        <div className={`${styles.inner} mx-auto`}>
          <header className={`${styles.heading} mx-auto text-center`}>
            <h2 className={`${styles.title} font-bold font-display text-foreground`}>
              Unsere Kompetenzfelder
            </h2>
            <p className={`${styles.lead} text-muted-foreground`}>
              Zwei Kernleistungen für gewerbliche und öffentliche Auftraggeber –
              von der Analyse bis zur Ausführung nach Stand der Technik,
              dokumentiert und transparent.
            </p>
          </header>

          <div className={styles.grid}>
            {homeServices.map((service, i) => (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="min-w-0"
              >
                <Link
                  href={service.link}
                  onClick={() =>
                    trackEvent(ANALYTICS_EVENTS.CONTENT.SERVICE_VIEW, {
                      service: service.title,
                      position: 'home-seite',
                      from_page: getFromPage(),
                    })
                  }
                  className={`${styles.card} group block h-full overflow-hidden rounded-xl border border-border bg-card shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl`}
                >
                  <figure className="relative aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      fill
                      sizes="(max-width: 767px) 100vw, (max-width: 1023px) 90vw, 35rem"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className={styles.cardHeader}>
                      <div className={`${styles.iconBadge} text-white bg-primary/90`}>
                        <service.icon className="h-6 w-6" />
                      </div>
                      <h3 className={`${styles.cardTitle} font-bold font-display text-white`}>
                        {service.title}
                      </h3>
                    </div>
                  </figure>

                  <div className={styles.cardBody}>
                    <p className={`${styles.cardDescription} text-muted-foreground`}>
                      {service.description}
                    </p>
                    <ul className={`${styles.subServiceList} text-sm text-muted-foreground`}>
                      {service.subServices.map((item) => (
                        <li key={item} className="flex min-w-0 items-start gap-2">
                          <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                          <span className="min-w-0">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto flex items-center font-semibold text-primary transition-colors group-hover:text-foreground">
                      Mehr erfahren
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
