'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GripVertical } from 'lucide-react'
import { trackEvent, getFromPage } from '@/lib/plausible'
import { ANALYTICS_EVENTS } from '@/config/analytics'

interface BeforeAfterSliderProps {
  before: string
  after: string
  title: string
}

/**
 * A robust before/after image comparison slider with proper touch support.
 * 
 * Key features:
 * - Uses CSS resize-observer for responsive sizing
 * - Pointer Events API for unified mouse/touch handling
 * - Proper scroll prevention only during active dragging
 * - CSS transform-based clipping for GPU acceleration
 * - Large, accessible touch target for the handle
 */
export const BeforeAfterSlider = ({
  before,
  after,
  title,
}: BeforeAfterSliderProps) => {
  const [position, setPosition] = useState(50)
  const [isActive, setIsActive] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const handleRef = useRef<HTMLDivElement>(null)

  // Calculate position from pointer coordinates
  const calculatePosition = useCallback((clientX: number): number => {
    const container = containerRef.current
    if (!container) return position

    const rect = container.getBoundingClientRect()
    const x = clientX - rect.left
    const percentage = (x / rect.width) * 100
    
    // Clamp between 0 and 100
    return Math.min(100, Math.max(0, percentage))
  }, [position])

  // Unified pointer handling
  const handleInteractionStart = useCallback((clientX: number) => {
    setIsActive(true)
    // Track first interaction with slider
    if (!hasInteracted) {
      trackEvent(ANALYTICS_EVENTS.ENGAGEMENT.SLIDER_INTERACTION, {
        slider_id: title,
        from_page: getFromPage(),
      })
    }
    setHasInteracted(true)
    setPosition(calculatePosition(clientX))
  }, [calculatePosition, hasInteracted, title])

  const handleInteractionMove = useCallback((clientX: number) => {
    if (!isActive) return
    setPosition(calculatePosition(clientX))
  }, [isActive, calculatePosition])

  const handleInteractionEnd = useCallback(() => {
    setIsActive(false)
  }, [])

  // Pointer Events - works for both mouse and touch
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    // Capture pointer to receive events even outside the element
    e.currentTarget.setPointerCapture(e.pointerId)
    handleInteractionStart(e.clientX)
  }, [handleInteractionStart])

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isActive) return
    e.preventDefault()
    handleInteractionMove(e.clientX)
  }, [isActive, handleInteractionMove])

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    e.currentTarget.releasePointerCapture(e.pointerId)
    handleInteractionEnd()
  }, [handleInteractionEnd])

  // Prevent default touch behavior only on the slider container during drag
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Prevent scrolling while dragging
    const preventScroll = (e: TouchEvent) => {
      if (isActive) {
        e.preventDefault()
      }
    }

    container.addEventListener('touchmove', preventScroll, { passive: false })
    
    return () => {
      container.removeEventListener('touchmove', preventScroll)
    }
  }, [isActive])

  // Keyboard accessibility
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 2
    
    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
        e.preventDefault()
        setPosition(p => Math.max(0, p - step))
        setHasInteracted(true)
        break
      case 'ArrowRight':
      case 'ArrowUp':
        e.preventDefault()
        setPosition(p => Math.min(100, p + step))
        setHasInteracted(true)
        break
      case 'Home':
        e.preventDefault()
        setPosition(0)
        setHasInteracted(true)
        break
      case 'End':
        e.preventDefault()
        setPosition(100)
        setHasInteracted(true)
        break
    }
  }, [])

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Title */}
      <h3 className="mb-3 px-1 text-base sm:text-lg md:text-xl font-semibold font-display text-foreground">
        {title}
      </h3>

      {/* Main Slider Container */}
      <div
        ref={containerRef}
        className={`
          relative w-full overflow-hidden
          rounded-lg sm:rounded-xl
          shadow-lg
          aspect-[4/3] sm:aspect-[16/10] md:aspect-video
          select-none
          outline-none
          focus-visible:ring-4 focus-visible:ring-primary/50
          ${isActive ? 'cursor-grabbing' : 'cursor-ew-resize'}
        `}
        style={{
          // Only prevent horizontal touch gestures, allow vertical scroll
          touchAction: isActive ? 'none' : 'pan-y pinch-zoom',
        }}
        role="slider"
        tabIndex={0}
        aria-label={`${title} - Vorher-Nachher-Vergleich`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        aria-valuetext={`${Math.round(100 - position)}% Nachher sichtbar`}
        onKeyDown={handleKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={handleInteractionEnd}
      >
        {/* Before Image - Full width background */}
        <img
          src={before}
          alt="Vorher"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          draggable={false}
          loading="lazy"
        />

        {/* After Image - Clipped overlay */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{
            // Rechts vom Griff liegt "Nachher" – passend zu den Eckbeschriftungen
            // (links "Vorher", rechts "Nachher"). Die Maske schneidet deshalb
            // von LINKS bis zur Griffposition weg.
            clipPath: `inset(0 0 0 ${position}%)`,
            // Use will-change for GPU acceleration during drag
            willChange: isActive ? 'clip-path' : 'auto',
          }}
        >
          <img
            src={after}
            alt="Nachher"
            className="absolute inset-0 w-full h-full object-cover"
            draggable={false}
            loading="lazy"
          />
        </div>

        {/* Divider Line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white pointer-events-none"
          style={{
            left: `${position}%`,
            transform: 'translateX(-50%)',
            boxShadow: '0 0 8px rgba(0,0,0,0.4), 0 0 20px rgba(0,0,0,0.2)',
          }}
        />

        {/* Handle - Large touch target */}
        <div
          ref={handleRef}
          className={`
            absolute top-1/2 z-10
            transition-transform duration-150
            ${isActive ? 'scale-110' : 'scale-100'}
          `}
          style={{
            left: `${position}%`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          {/* Invisible expanded touch area */}
          <div 
            className="absolute -inset-6 sm:-inset-4"
            aria-hidden="true"
          />
          
          {/* Visible handle */}
          <motion.div
            className={`
              relative flex items-center justify-center
              w-12 h-12 sm:w-11 sm:h-11 md:w-10 md:h-10
              rounded-full
              bg-white
              shadow-[0_2px_10px_rgba(0,0,0,0.3),0_0_0_3px_rgba(255,255,255,0.9)]
              ${isActive ? 'bg-white' : 'hover:scale-105'}
              transition-all duration-150
            `}
            whileTap={{ scale: 1.1 }}
          >
            <GripVertical 
              className="w-5 h-5 sm:w-4.5 sm:h-4.5 text-neutral-600" 
              strokeWidth={2.5}
            />
          </motion.div>
        </div>

        {/* Labels */}
        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 px-2 py-1 rounded-md bg-black/60 backdrop-blur-sm text-white text-[10px] sm:text-xs font-medium pointer-events-none">
          Vorher
        </div>
        <div className="absolute top-2 sm:top-3 right-2 sm:right-3 px-2 py-1 rounded-md bg-black/60 backdrop-blur-sm text-white text-[10px] sm:text-xs font-medium pointer-events-none">
          Nachher
        </div>

        {/* Interactive hint - only shown before first interaction */}
        <AnimatePresence>
          {!hasInteracted && (
            <motion.div
              className="absolute bottom-3 sm:bottom-4 left-1/2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-black/70 backdrop-blur-sm text-white text-[11px] sm:text-xs font-medium pointer-events-none flex items-center gap-2"
              style={{ transform: 'translateX(-50%)' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ delay: 0.8, duration: 0.3 }}
            >
              <motion.span
                animate={{ x: [-3, 3, -3] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              >
                ←
              </motion.span>
              <span>Schieben zum Vergleichen</span>
              <motion.span
                animate={{ x: [3, -3, 3] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              >
                →
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Position indicator line at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20 pointer-events-none">
          <div 
            className="h-full bg-white/80 transition-[width] duration-75"
            style={{ width: `${position}%` }}
          />
        </div>
      </div>

      {/* Keyboard hint for desktop */}
      <p className="hidden sm:block mt-2 text-center text-xs text-muted-foreground">
        Pfeiltasten zum Verschieben • Shift+Pfeiltasten für größere Schritte
      </p>
    </div>
  )
}
