'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { ProjectImage } from '@/data/projects'
import { X, ZoomIn, ChevronLeft, ChevronRight, GripHorizontal } from 'lucide-react'
import { StaticImageData } from 'next/image'

interface ProjectGalleryProps {
  images: ProjectImage[]
}

const getImgSrc = (src: string | StaticImageData) => {
  return typeof src === 'string' ? src : src.src
}

export const ProjectGallery = ({ images }: ProjectGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)
  const [showSwipeHint, setShowSwipeHint] = useState(true)
  const isOpen = activeIndex !== null

  const current = useMemo(
    () => (activeIndex !== null ? images[activeIndex] : null),
    [activeIndex, images]
  )

  const openAt = useCallback((i: number) => {
    setActiveIndex(i)
    setIsDescriptionExpanded(false)
  }, [])
  const close = useCallback(() => {
    setActiveIndex(null)
    // Swipe-Hinweis beim naechsten Oeffnen wieder anzeigen.
    setShowSwipeHint(true)
  }, [])
  const next = useCallback(() => {
    setActiveIndex((i) => {
      if (i === null) return 0
      return (i + 1) % images.length
    })
  }, [images.length])
  const prev = useCallback(() => {
    setActiveIndex((i) => {
      if (i === null) return 0
      return (i - 1 + images.length) % images.length
    })
  }, [images.length])

  // Scroll-Lock & Keyboard
  const closeBtnRef = useRef<HTMLButtonElement | null>(null)
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'Home') setActiveIndex(0)
      if (e.key === 'End') setActiveIndex(images.length - 1)
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    setTimeout(() => closeBtnRef.current?.focus(), 0)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow || ''
    }
  }, [isOpen, images.length, close, next, prev])

  // Touch swipe with visual feedback
  const startX = useRef<number | null>(null)
  const startY = useRef<number | null>(null)
  const deltaX = useRef(0)
  const [dragX, setDragX] = useState(0)
  const SWIPE_THRESHOLD = 60

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0]
    startX.current = t.clientX
    startY.current = t.clientY
    deltaX.current = 0
    setDragX(0)
    setShowSwipeHint(false)
  }
  const onTouchMove = (e: React.TouchEvent) => {
    if (startX.current == null || startY.current == null) return
    const t = e.touches[0]
    const dx = t.clientX - startX.current
    const dy = t.clientY - startY.current
    if (Math.abs(dx) > Math.abs(dy)) {
      e.preventDefault()
      deltaX.current = dx
      setDragX(dx * 0.6)
    }
  }
  const onTouchEnd = () => {
    if (Math.abs(deltaX.current) > SWIPE_THRESHOLD) {
      if (deltaX.current < 0) next()
      else prev()
    }
    setDragX(0)
    startX.current = null
    startY.current = null
    deltaX.current = 0
  }

  return (
    <>
      {/* Responsive Grid - scales from 1 column on mobile to 5 on 4K */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5 lg:gap-6"
      >
        <AnimatePresence>
          {images.map((image, idx) => (
            <motion.div
              layout
              key={image.id}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ type: 'spring', stiffness: 220, damping: 26 }}
              className="overflow-hidden rounded-lg sm:rounded-xl shadow-md hover:shadow-xl cursor-pointer group aspect-[4/3] relative"
              onClick={() => openAt(idx)}
              title="Zum Vergrößern tippen/klicken"
            >
              <img
                src={getImgSrc(image.src)}
                alt={image.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 bg-black/40 group-hover:opacity-100">
                <ZoomIn className="w-10 h-10 sm:w-12 sm:h-12 text-white drop-shadow-lg" />
              </div>
              {/* Category badge on hover */}
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white text-xs sm:text-sm font-medium">{image.title}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Enhanced Lightbox Modal */}
      <AnimatePresence>
        {isOpen && current && (
          <motion.div
            className="fixed inset-0 z-[9990] flex items-center justify-center bg-black/90 backdrop-blur-md"
            style={{
              paddingTop: 'max(12px, env(safe-area-inset-top, 0px))',
              paddingBottom: 'max(12px, env(safe-area-inset-bottom, 0px))',
              paddingLeft: 'max(8px, env(safe-area-inset-left, 0px))',
              paddingRight: 'max(8px, env(safe-area-inset-right, 0px))',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            aria-modal="true"
            role="dialog"
          >
            {/* Close Button - always visible */}
            <button
              ref={closeBtnRef}
              aria-label="Schließen"
              onClick={(e) => {
                e.stopPropagation()
                close()
              }}
              className="fixed z-[9999] grid h-11 w-11 sm:h-12 sm:w-12 place-items-center rounded-full bg-card text-foreground shadow-lg hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors"
              style={{
                top: 'calc(env(safe-area-inset-top, 0px) + 12px)',
                right: 'calc(env(safe-area-inset-right, 0px) + 12px)',
              }}
            >
              <X className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>

            {/* Counter Badge */}
            <div
              className="fixed z-[9998] rounded-full bg-card text-foreground px-3 py-1.5 text-xs sm:text-sm font-semibold shadow-lg"
              style={{ top: 'calc(env(safe-area-inset-top, 0px) + 12px)', left: 'calc(env(safe-area-inset-left, 0px) + 12px)' }}
              aria-live="polite"
            >
              {activeIndex! + 1} / {images.length}
            </div>

            {/* Desktop Navigation Arrows */}
            <button
              aria-label="Vorheriges Bild"
              onClick={(e) => {
                e.stopPropagation()
                prev()
              }}
              className="hidden md:flex items-center justify-center absolute left-4 lg:left-6 2xl:left-10 top-1/2 -translate-y-1/2 z-[9998] h-14 w-14 lg:h-16 lg:w-16 rounded-full bg-card/90 text-foreground shadow-xl hover:bg-card hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all"
            >
              <ChevronLeft className="w-8 h-8 lg:w-10 lg:h-10" />
            </button>
            <button
              aria-label="Nächstes Bild"
              onClick={(e) => {
                e.stopPropagation()
                next()
              }}
              className="hidden md:flex items-center justify-center absolute right-4 lg:right-6 2xl:right-10 top-1/2 -translate-y-1/2 z-[9998] h-14 w-14 lg:h-16 lg:w-16 rounded-full bg-card/90 text-foreground shadow-xl hover:bg-card hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all"
            >
              <ChevronRight className="w-8 h-8 lg:w-10 lg:h-10" />
            </button>

            {/* Main Modal Card - responsive sizing up to 4K */}
            <motion.div
              className="
                relative cursor-default
                w-full h-full sm:w-auto sm:h-auto
                max-w-full sm:max-w-[min(95vw,1400px)] lg:max-w-[min(92vw,1600px)] 2xl:max-w-[min(90vw,2000px)]
                max-h-full sm:max-h-[min(90vh,1200px)]
                bg-card text-card-foreground
                sm:rounded-2xl shadow-2xl
                flex flex-col
                overflow-hidden
              "
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {/* Image Area - takes most of the space on mobile */}
              <div
                className="
                  relative flex-1 bg-black grid place-items-center
                  min-h-[50vh] sm:min-h-[45vh] md:min-h-[55vh] lg:min-h-[60vh]
                "
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                <motion.img
                  key={current.id}
                  src={getImgSrc(current.src)}
                  alt={current.title}
                  className="object-contain w-full h-full max-w-full select-none"
                  style={{
                    transform: `translateX(${dragX}px)`,
                    maxHeight: 'min(80svh, 80vh)',
                  }}
                  initial={{ opacity: 0.6, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 24 }}
                  draggable={false}
                />

                {/* Mobile Swipe Hint */}
                {showSwipeHint && (
                  <motion.div
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white text-xs sm:hidden backdrop-blur-sm"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Wischen zum Navigieren</span>
                    <ChevronRight className="w-4 h-4" />
                  </motion.div>
                )}

                {/* Mobile Invisible Tap Zones */}
                <div className="absolute inset-y-0 left-0 right-0 flex md:hidden">
                  <button
                    aria-label="Zurück"
                    onClick={prev}
                    className="w-1/2 h-full"
                  />
                  <button
                    aria-label="Weiter"
                    onClick={next}
                    className="w-1/2 h-full"
                  />
                </div>
              </div>

              {/* Description Panel - collapsible on mobile */}
              <div
                className={`
                  w-full flex flex-col bg-card border-t border-border
                  transition-all duration-300 ease-out
                  ${isDescriptionExpanded ? 'max-h-[50vh]' : 'max-h-24 sm:max-h-none'}
                  sm:max-h-none overflow-hidden
                `}
              >
                {/* Mobile expand handle */}
                <button
                  className="sm:hidden flex items-center justify-center py-2 text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                  aria-label={isDescriptionExpanded ? 'Beschreibung einklappen' : 'Beschreibung ausklappen'}
                >
                  <GripHorizontal className={`w-5 h-5 transition-transform ${isDescriptionExpanded ? 'rotate-180' : ''}`} />
                </button>

                <div className="px-4 pb-4 sm:p-5 md:p-6 lg:p-8 overflow-y-auto">
                  <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-snug font-display text-foreground">
                    {current.title}
                  </h3>

                  {/* Badge nur bei gesicherter Kategorie – nicht nachträglich zuordnen. */}
                  {current.category && (
                    <span
                      className="
                        mt-2 inline-flex w-fit items-center
                        rounded-full px-2.5 py-1 text-[10px] sm:text-xs font-semibold
                        bg-primary/10 text-primary ring-1 ring-primary/30
                      "
                    >
                      {current.category}
                    </span>
                  )}

                  {current.description && (
                    <p className="mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
                      {current.description}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Mobile Bottom Navigation Toolbar */}
            <div
              className="fixed inset-x-0 bottom-0 z-[9998] md:hidden"
              style={{
                paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 8px)',
              }}
            >
              <div className="mx-auto max-w-lg px-3">
                <div className="flex justify-center gap-2 p-2 shadow-2xl rounded-2xl bg-card/95 backdrop-blur-md border border-border">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      prev()
                    }}
                    className="flex-1 flex items-center justify-center gap-1.5 font-semibold text-foreground rounded-xl h-12 bg-muted hover:bg-muted/80 transition-colors"
                    aria-label="Vorheriges Bild"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    <span className="hidden xs:inline">Zurück</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      close()
                    }}
                    className="flex-1 flex items-center justify-center font-semibold text-primary-foreground bg-primary rounded-xl h-12 hover:bg-primary/90 transition-colors"
                    aria-label="Schließen"
                  >
                    <X className="w-5 h-5 mr-1.5" />
                    Schließen
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      next()
                    }}
                    className="flex-1 flex items-center justify-center gap-1.5 font-semibold text-foreground rounded-xl h-12 bg-muted hover:bg-muted/80 transition-colors"
                    aria-label="Nächstes Bild"
                  >
                    <span className="hidden xs:inline">Weiter</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
