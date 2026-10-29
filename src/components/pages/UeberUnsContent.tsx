'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { TeamGallery } from '@/components/common/TeamGallery'
import { SectionDivider } from '@/components/common/SectionDivider'
import buerozentrale from '@/assets/images/general/buerozentrale.png'

export default function UeberUnsContent() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden text-center text-white bg-neutral-900">
        <Image
          src={buerozentrale}
          alt="Bürozentrale der Andreas Crncic GmbH in Heusweiler"
          className="absolute inset-0 object-cover w-full h-full opacity-20"
          fill
          priority
          sizes="100vw"
        />
        <div className="container relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold font-display md:text-6xl"
          >
            Ihr Fundament im Saarland.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl mx-auto mt-4 text-lg text-white/80"
          >
            Seit drei Jahrzehnten sind wir Ihr verlässlicher Partner für
            anspruchsvolle Bauprojekte. Verwurzelt in Heusweiler, tätig im
            gesamten Saarland.
          </motion.p>
        </div>
      </section>

      <SectionDivider variant={1} />

      <section className="py-20 md:py-32 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto mb-16 text-center">
            <h2 className="text-3xl font-bold font-display text-foreground md:text-5xl">
              Die Philosophie hinter unserer Arbeit
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Unser Erfolg basiert nicht auf Einzelpersonen, sondern auf dem
              Zusammenspiel von erfahrenen Fachkräften, die gemeinsame Werte
              teilen. Jedes Bild steht für eine Säule unserer
              Unternehmensphilosophie.
            </p>
          </div>
          <TeamGallery />
        </div>
      </section>
    </motion.div>
  )
}
