import { motion } from 'framer-motion'

// SVG-Pfade und Dimensionen für eine präzise Nachbildung des Logos
const trowelPath = 'M100 0 L0 60 L200 60 L100 0Z'
const brickWidth = 48
const brickHeight = 22
const gap = 2

const bricks = [
  // Untere Reihe
  { x: 0, y: brickHeight + gap },
  { x: brickWidth + gap, y: brickHeight + gap },
  { x: (brickWidth + gap) * 2, y: brickHeight + gap },
  { x: (brickWidth + gap) * 3, y: brickHeight + gap },
  // Obere Reihe
  { x: (brickWidth + gap) / 2, y: 0 },
  { x: (brickWidth + gap) / 2 + brickWidth + gap, y: 0 },
  { x: (brickWidth + gap) / 2 + (brickWidth + gap) * 2, y: 0 },
]

export const AnimatedLogo = () => {
  return (
    <div className="flex flex-col items-center">
      <motion.svg
        width="240"
        height="180"
        viewBox="-20 -20 240 200"
        initial="hidden"
        animate="visible"
        className="drop-shadow-lg"
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 1. Die Maurer-Kelle wird gezeichnet */}
        <motion.path
          d={trowelPath}
          fill="transparent"
          stroke="#1A1A1A"
          strokeWidth="3"
          variants={{
            hidden: { pathLength: 0, opacity: 0 },
            visible: { pathLength: 1, opacity: 1 },
          }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        />

        {/* 2. Die Ziegelsteine glühen auf */}
        <motion.g
          transform={`translate(${gap * 4}, 50)`}
          variants={{
            visible: { transition: { staggerChildren: 0.1, delayChildren: 1 } },
          }}
        >
          {bricks.map((brick, i) => (
            <motion.rect
              key={i}
              x={brick.x}
              y={brick.y}
              width={brickWidth}
              height={brickHeight}
              fill="#E63946"
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1 },
              }}
              transition={{ duration: 0.5 }}
            />
          ))}
        </motion.g>

        {/* 3. Der Schriftzug erscheint Buchstabe für Buchstabe */}
        <g>
          {'CRNCIC'.split('').map((char, i) => (
            <motion.text
              key={i}
              x={25 + i * 28}
              y={170}
              fontFamily="Montserrat"
              fontSize="42"
              fontWeight="bold"
              fill="#E63946"
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, delay: 1.5 + i * 0.1 }}
            >
              {char}
            </motion.text>
          ))}
        </g>
      </motion.svg>

      {/* 4. Der Slogan erscheint zum Schluss */}
      <motion.p
        className="mt-2 font-sans text-lg text-center text-ui-lightgrey"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.5 }}
      >
        Wir bauen auf Werte. Für die Zukunft.
      </motion.p>
    </div>
  )
}
