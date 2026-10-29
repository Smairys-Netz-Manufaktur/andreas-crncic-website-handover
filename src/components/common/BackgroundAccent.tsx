'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import React from 'react'

// Wir definieren verschiedene Formen, die wir verwenden können
const shapes = {
  circle: <circle cx="50" cy="50" r="50" />,
  lines: (
    <>
      <line x1="0" y1="20" x2="100" y2="0" />
      <line x1="0" y1="50" x2="100" y2="30" />
      <line x1="0" y1="80" x2="100" y2="60" />
    </>
  ),
}

interface BackgroundAccentProps {
  shape: keyof typeof shapes
  className?: string
}

export const BackgroundAccent = ({
  shape,
  className,
}: BackgroundAccentProps) => {
  const targetRef = React.useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['-25%', '25%'])

  return (
    <motion.div
      ref={targetRef}
      style={{ y }}
      // KORREKTUR: Deckkraft erhöht für bessere Sichtbarkeit
      className={`absolute z-0 opacity-10 pointer-events-none ${className}`}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        // KORREKTUR: Farbe abgedunkelt für besseren Kontrast
        className="text-gray-200 stroke-current"
        // KORREKTUR: Linienstärke erhöht für Klarheit
        strokeWidth={1}
        fill="none"
      >
        {shapes[shape]}
      </svg>
    </motion.div>
  )
}
