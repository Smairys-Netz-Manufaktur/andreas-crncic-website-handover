'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { teamMembers } from '@/data/team'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { StaticImageData } from 'next/image'

const getImgSrc = (src: string | StaticImageData) => {
  return typeof src === 'string' ? src : src.src
}

export const TeamGallery = () => {
  const len = teamMembers.length

  // 🔹 Hooks dürfen NICHT hinter einem early return stehen
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef<number | null>(null)

  const clampIndex = useCallback((i: number) => ((i % len) + len) % len, [len])

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => clampIndex(prev + 1))
  }, [clampIndex])

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => clampIndex(prev - 1))
  }, [clampIndex])

  // Keyboard: ← / →
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext()
      if (e.key === 'ArrowLeft') handlePrev()
    }
    el.addEventListener('keydown', onKeyDown)
    return () => el.removeEventListener('keydown', onKeyDown)
  }, [handleNext, handlePrev])

  // Touch/Swipe
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].clientX
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    const threshold = 50
    if (dx > threshold) handlePrev()
    else if (dx < -threshold) handleNext()
    touchStartX.current = null
  }

  const containerProps = {
    ref: containerRef,
    tabIndex: 0,
    className:
      'relative h-[400px] md:h-[600px] w-full max-w-7xl outline-none touch-pan-y select-none',
    onTouchStart,
    onTouchEnd,
  }

  return (
    <div
      className="relative flex flex-col items-center w-full overflow-hidden"
      aria-label="Team Galerie"
    >
      {/* Placeholder falls keine Daten */}
      {len === 0 ? (
        <div className="w-full py-12 text-center text-muted-foreground">
          <p>Keine Teamdaten vorhanden.</p>
        </div>
      ) : (
        <>
          {/* Bild-Container */}
          <div {...containerProps}>
            <AnimatePresence initial={false} mode="popLayout">
              {teamMembers.map((member, index) => {
                const offset = index - currentIndex
                // zyklische Offsets so berechnen, dass Nachbarn korrekt angezeigt werden
                let eff = offset
                if (offset > len / 2) eff = offset - len
                if (offset < -len / 2) eff = offset + len
                const isVisible = Math.abs(eff) <= 1

                return (
                  isVisible && (
                    <motion.div
                      key={member.id}
                      className="absolute w-4/5 h-full overflow-hidden rounded-lg shadow-2xl will-change-transform"
                      style={{ top: '50%', left: '50%' }}
                      initial={{
                        x: '-50%',
                        y: '-50%',
                        scale: 0.85,
                        opacity: 0,
                        zIndex: 0,
                      }}
                      animate={{
                        x: `calc(-50% + ${eff * 40}%)`,
                        y: '-50%',
                        scale: eff === 0 ? 1 : 0.72,
                        opacity: eff === 0 ? 1 : 0.45,
                        zIndex: len - Math.abs(eff),
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 220,
                        damping: 26,
                        mass: 0.8,
                      }}
                      onClick={() => setCurrentIndex(index)}
                    >
                      <img
                        src={getImgSrc(member.src)}
                        alt={member.title}
                        className="object-cover w-full h-full"
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                      />
                      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 to-transparent" />
                    </motion.div>
                  )
                )
              })}
            </AnimatePresence>
          </div>

          {/* Text */}
          <div className="max-w-2xl px-4 mt-8 text-center" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <h3 className="text-3xl font-bold font-display text-brand-red">
                  {teamMembers[currentIndex]?.title}
                </h3>
                <p className="mt-2 text-lg text-muted-foreground">
                  {teamMembers[currentIndex]?.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex gap-4 mt-8">
            <button
              type="button"
              onClick={handlePrev}
              className="p-3 transition-colors bg-card border border-border rounded-full shadow-md hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red"
              aria-label="Vorheriges Bild"
            >
              <ChevronLeft aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="p-3 transition-colors bg-card border border-border rounded-full shadow-md hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red"
              aria-label="Nächstes Bild"
            >
              <ChevronRight aria-hidden="true" />
            </button>
          </div>

          {/* Fortschritt */}
          <div
            className="flex gap-2 mt-6"
            role="tablist"
            aria-label="Galerie Fortschritt"
          >
            {teamMembers.map((_, i) => {
              const selected = i === currentIndex
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrentIndex(i)}
                  role="tab"
                  aria-selected={selected}
                  aria-current={selected}
                  className={`h-2 w-8 rounded-full transition-colors ${
                    selected ? 'bg-brand-red' : 'bg-muted hover:bg-muted-foreground/30'
                  }`}
                  aria-label={`Gehe zu Bild ${i + 1}`}
                />
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
