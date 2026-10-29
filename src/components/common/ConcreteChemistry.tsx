'use client'

import { motion } from 'framer-motion'
import { SectionDivider } from './SectionDivider'

// Animationsvarianten für sauberes Management
const FADE_UP = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export const ConcreteChemistry = () => {
  return (
    <>
      <SectionDivider variant={0} />
      <section className="py-20 overflow-hidden md:py-24 bg-muted">
        <div className="container">
          <motion.div
            className="max-w-3xl mx-auto mb-16 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.h2
              variants={FADE_UP}
              className="text-3xl font-bold font-display text-foreground md:text-5xl"
            >
              Wie schützen wir Ihren Beton?
            </motion.h2>
            <motion.p
              variants={FADE_UP}
              className="mt-4 text-lg text-muted-foreground"
            >
              Unsere Verfahren greifen gezielt in die chemischen Prozesse ein,
              um die Schutzwirkung für den Bewehrungsstahl wiederherzustellen
              und dauerhaft zu sichern.
            </motion.p>
          </motion.div>

          <div className="grid items-start grid-cols-1 md:grid-cols-3 gap-y-16 md:gap-x-8">
            {/* --- Akt 1: Passivierung --- */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              className="flex flex-col items-center text-center"
            >
              <motion.h3
                variants={FADE_UP}
                className="mb-4 text-xl font-semibold font-display text-foreground"
              >
                1. Passivierung (Schutzzustand)
              </motion.h3>
              <svg viewBox="0 0 100 100" className="w-48 h-48">
                <motion.circle
                  cx="50"
                  cy="50"
                  r="15"
                  fill="#a8a29e"
                  variants={FADE_UP}
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="20"
                  fill="none"
                  stroke="#67e8f9"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
                <motion.text
                  x="50"
                  y="54"
                  textAnchor="middle"
                  fontSize="8"
                  fill="white"
                  className="font-bold"
                >
                  Stahl
                </motion.text>
                <motion.text
                  x="50"
                  y="25"
                  textAnchor="middle"
                  fontSize="6"
                  fill="#0e7490"
                >
                  Ca(OH)₂
                </motion.text>
              </svg>
              <motion.p
                variants={FADE_UP}
                className="max-w-xs mt-2 text-sm text-muted-foreground"
              >
                Eine intakte Passivschicht schützt den Stahl im hochalkalischen
                Milieu.
              </motion.p>
            </motion.div>

            {/* --- Akt 2: Depassivierung --- */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              className="flex flex-col items-center text-center"
            >
              <motion.h3
                variants={FADE_UP}
                transition={{ delay: 0.2 }}
                className="mb-4 text-xl font-semibold font-display text-foreground"
              >
                2. Depassivierung (Korrosion)
              </motion.h3>
              <svg viewBox="0 0 100 100" className="w-48 h-48">
                <motion.circle
                  cx="50"
                  cy="50"
                  r="15"
                  fill="#fca5a5"
                  variants={FADE_UP}
                  transition={{ delay: 0.4 }}
                />
                <motion.path
                  d="M 30 50 A 20 20, 0, 0, 1, 50 70"
                  fill="none"
                  stroke="#67e8f9"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                />
                <motion.text
                  x="50"
                  y="54"
                  fontSize="8"
                  fill="#b91c1c"
                  className="font-bold"
                >
                  Fe₂O₃
                </motion.text>
                <motion.text
                  x="15"
                  y="40"
                  fontSize="10"
                  fill="#ef4444"
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 15, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                >
                  Cl⁻
                </motion.text>
                <motion.text
                  x="75"
                  y="70"
                  fontSize="10"
                  fill="#ef4444"
                  initial={{ x: 120, opacity: 0 }}
                  whileInView={{ x: 75, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.0 }}
                >
                  CO₂
                </motion.text>
              </svg>
              <motion.p
                variants={FADE_UP}
                transition={{ delay: 0.4 }}
                className="max-w-xs mt-2 text-sm text-muted-foreground"
              >
                Schadstoffe zerstören die Schutzschicht und der Stahl beginnt zu
                rosten.
              </motion.p>
            </motion.div>

            {/* --- Akt 3: Repassivierung --- */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              className="flex flex-col items-center text-center"
            >
              <motion.h3
                variants={FADE_UP}
                transition={{ delay: 0.4 }}
                className="mb-4 text-xl font-semibold font-display text-foreground"
              >
                3. Repassivierung (Unsere Lösung)
              </motion.h3>
              <svg viewBox="0 0 100 100" className="w-48 h-48">
                <motion.circle
                  cx="50"
                  cy="50"
                  r="15"
                  fill="#a8a29e"
                  variants={FADE_UP}
                  transition={{ delay: 0.6 }}
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="25"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="3"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.8 }}
                />
                <motion.text
                  x="50"
                  y="54"
                  textAnchor="middle"
                  fontSize="8"
                  fill="white"
                  className="font-bold"
                >
                  Stahl
                </motion.text>
                <motion.text
                  x="50"
                  y="18"
                  textAnchor="middle"
                  fontSize="6"
                  fill="#166534"
                >
                  Ca(OH)₂
                </motion.text>
              </svg>
              <motion.p
                variants={FADE_UP}
                transition={{ delay: 0.6 }}
                className="max-w-xs mt-2 text-sm text-muted-foreground"
              >
                Wir stellen das alkalische Milieu wieder her und schaffen eine
                neue, dauerhafte Schutzschicht.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
