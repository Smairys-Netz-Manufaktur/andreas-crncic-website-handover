'use client'

import { motion } from 'framer-motion'

// --- Unser Repertoire an architektonischen Formen ---
// Jedes Objekt enthält den SVG-Pfad 'd' und eine passende Animationsdauer.
const pathVariations = [
  {
    // 1. Die sanfte S-Kurve (unsere bekannte Welle)
    d: 'M 0 50 Q 360 20, 720 50 T 1440 50',
    duration: 2.0,
  },
  {
    // 2. Ein weiter, flacher Bogen (elegant und ruhig)
    d: 'M 0 80 Q 720 20, 1440 80',
    duration: 1.8,
  },
  {
    // 3. Eine asymmetrische, kristalline Kante (modern und selbstbewusst)
    d: 'M 0 20 L 800 80 L 1440 40',
    duration: 2.2,
  },
]

interface SectionDividerProps {
  /** Explicit variant index (0, 1, or 2) for deterministic rendering */
  variant?: 0 | 1 | 2
}

export const SectionDivider = ({ variant = 0 }: SectionDividerProps) => {
  const selectedPath = pathVariations[variant % pathVariations.length]

  return (
    <div className="container py-16 md:py-24" aria-hidden="true">
      <motion.svg
        className="w-full h-24"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
      >
        <motion.path
          d={selectedPath.d}
          fill="none"
          className="stroke-brand-red/50"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            pathLength: { duration: selectedPath.duration, ease: [0.3, 0.1, 0.3, 1] },
            opacity: { duration: 0.5 },
          }}
        />
      </motion.svg>
    </div>
  )
}

