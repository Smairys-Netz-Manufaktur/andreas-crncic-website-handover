'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import Button from '@/components/common/Button'
import { ArrowRight, CheckCircle2, ShieldCheck, Trophy } from 'lucide-react'
import { trackEvent, getFromPage } from '@/lib/plausible'
import { ANALYTICS_EVENTS } from '@/config/analytics'

// Assets
import imgBeton from '@/assets/images/Betoninstandsetzung/betonmauer-instandsetzung-auf-geruest.jpg'
import imgBoden from '@/assets/images/Industriebodenbau/epoxidboden-3.jpg'

export function HeroSection() {
  const { scrollY } = useScroll()

  // Parallax effects
  const y1 = useTransform(scrollY, [0, 500], [0, 100])
  const y2 = useTransform(scrollY, [0, 500], [0, -50])

  return (
    <section className="relative w-full min-h-[850px] lg:h-screen flex items-center overflow-hidden bg-background pt-20 lg:pt-0">
      {/* Technical Grid Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Main Grid */}
        <div 
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
        {/* Secondary Fine Grid */}
        <div 
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
            backgroundSize: '10px 10px',
          }}
        />
        {/* Radial Fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>

      {/* Animated Technical Lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute top-3/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear', delay: 2 }}
        />
      </div>

      <div className="container relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left Column: Content */}
        <div className="flex flex-col items-start text-left pt-10 lg:pt-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 border border-primary/20"
          >
            <Trophy className="w-4 h-4" />
            <span>30 Jahre Erfahrung im Saarland</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold font-display tracking-tight text-foreground leading-[1.1]"
          >
            Qualität, die <br className="hidden lg:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
              Fundamente
            </span> schafft.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-xl leading-relaxed"
          >
            Fachbetrieb für Betoninstandsetzung und Bodenbeschichtung – für
            öffentliche Auftraggeber, Generalunternehmer, Industrie und Gewerbe.
            Präzision aus Heusweiler.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Button size="lg" variant="primary" asChild className="h-14 px-8 text-lg shadow-lg shadow-primary/20">
              <Link
                href="/kontakt"
                onClick={() =>
                  trackEvent(ANALYTICS_EVENTS.NAVIGATION.HERO_CTA, {
                    target: '/kontakt',
                    from_page: getFromPage(),
                  })
                }
                className="flex items-center gap-2"
              >
                Projekt anfragen
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="h-14 px-8 text-lg bg-background/50 backdrop-blur-sm">
              <Link href="/leistungen">
                Unsere Leistungen
              </Link>
            </Button>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 pt-8 border-t border-border/50 w-full flex flex-wrap gap-x-8 gap-y-4"
          >
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <ShieldCheck className="w-5 h-5 text-primary" />
              <span>Zertifizierter Fachbetrieb</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span>Meistergeführte Qualität</span>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Dynamic Image Collage */}
        <div className="relative hidden lg:block h-[700px] w-full perspective-1000">
          {/* Decorative Circle Background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-primary/10 bg-primary/5 blur-3xl" />

          {/* Main Image (Beton) */}
          <motion.div
            style={{ y: y1 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute top-6 right-0 w-[70%] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10 z-10"
          >
            <Image
              src={imgBeton}
              alt="Betoninstandsetzung am Gerüst"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent opacity-60" />
            {/* Label oben rechts: unten links wird es von der Bodenbeschichtungs-Kachel verdeckt. */}
            <div className="absolute top-4 right-4 text-white font-medium text-sm bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
              Betoninstandsetzung
            </div>
          </motion.div>

          {/* Secondary Image (Boden) */}
          <motion.div
            style={{ y: y2 }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="absolute bottom-6 left-0 w-[56%] aspect-square rounded-2xl overflow-hidden shadow-2xl border border-white/10 z-20"
          >
            <Image
              src={imgBoden}
              alt="Hochwertige Bodenbeschichtung"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
            <div className="absolute bottom-4 left-4 text-white font-medium text-sm bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
              Bodenbeschichtung
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
