import { motion } from 'framer-motion'
import { SectionDivider } from './SectionDivider'

// Animationsvarianten für eine saubere Steuerung
const FADE_UP = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}
const DRAW = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.5, ease: 'easeInOut' },
  },
}

export const MolecularFortress = () => {
  return (
    <>
      <SectionDivider variant={1} />
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
              Die Molekulare Festung
            </motion.h2>
            <motion.p
              variants={FADE_UP}
              className="mt-4 text-lg text-muted-foreground"
            >
              Eine Betoninstandsetzung ist ein gezielter Eingriff in die Chemie des
              Baustoffs, um ihn für Jahrzehnte zu schützen.
            </motion.p>
          </motion.div>

          <div className="grid items-start grid-cols-1 gap-8 md:grid-cols-3 md:gap-4">
            {/* Schritt 1: Intaktes System */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
              className="p-4 text-center"
            >
              <h3 className="mb-4 text-xl font-semibold font-display text-foreground">
                1. Intaktes System
              </h3>
              <svg
                viewBox="0 0 100 100"
                className="w-full h-auto aspect-square"
              >
                {/* Bewehrungsstahl mit Passivschicht */}
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
                  variants={DRAW}
                />
                {/* Alkalische Umgebung */}
                <motion.text
                  x="20"
                  y="30"
                  fontSize="8"
                  fill="#0e7490"
                  variants={FADE_UP}
                  transition={{ delay: 0.5 }}
                >
                  Ca(OH)₂
                </motion.text>
                <motion.text
                  x="70"
                  y="80"
                  fontSize="8"
                  fill="#0e7490"
                  variants={FADE_UP}
                  transition={{ delay: 0.6 }}
                >
                  Ca(OH)₂
                </motion.text>
              </svg>
              <motion.p
                variants={FADE_UP}
                className="mt-2 text-sm text-muted-foreground"
              >
                Der Stahl ist durch eine Passivschicht in einem hochalkalischen
                Milieu geschützt.
              </motion.p>
            </motion.div>

            {/* Schritt 2: Korrosion */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{
                visible: { transition: { staggerChildren: 0.2, delay: 0.5 } },
              }}
              className="p-4 text-center"
            >
              <h3 className="mb-4 text-xl font-semibold font-display text-foreground">
                2. Korrosion
              </h3>
              <svg
                viewBox="0 0 100 100"
                className="w-full h-auto aspect-square"
              >
                {/* Angegriffener Stahl */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="15"
                  fill="#fca5a5"
                  variants={FADE_UP}
                />
                {/* Gebrochene Passivschicht */}
                <motion.path
                  d="M 30 50 A 20 20, 0, 1, 1, 50 30"
                  fill="none"
                  stroke="#67e8f9"
                  strokeWidth="2"
                  variants={DRAW}
                />
                {/* Rost */}
                <motion.text
                  x="50"
                  y="55"
                  fontSize="8"
                  fill="#b91c1c"
                  variants={FADE_UP}
                  transition={{ delay: 1.2 }}
                >
                  Fe₂O₃
                </motion.text>
                {/* Angreifende Ionen */}
                <motion.text
                  x="10"
                  y="50"
                  fontSize="10"
                  fill="#ef4444"
                  variants={FADE_UP}
                  transition={{ delay: 0.8 }}
                >
                  Cl⁻
                </motion.text>
                <motion.text
                  x="80"
                  y="60"
                  fontSize="10"
                  fill="#ef4444"
                  variants={FADE_UP}
                  transition={{ delay: 1.0 }}
                >
                  CO₂
                </motion.text>
              </svg>
              <motion.p
                variants={FADE_UP}
                className="mt-2 text-sm text-muted-foreground"
              >
                Schadstoffe zerstören die Passivschicht und der Stahl beginnt zu
                rosten.
              </motion.p>
            </motion.div>

            {/* Schritt 3: Instandsetzung */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{
                visible: { transition: { staggerChildren: 0.2, delay: 1.0 } },
              }}
              className="p-4 text-center"
            >
              <h3 className="mb-4 text-xl font-semibold font-display text-foreground">
                3. Unsere Lösung
              </h3>
              <svg
                viewBox="0 0 100 100"
                className="w-full h-auto aspect-square"
              >
                {/* Gesunder Stahl */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="15"
                  fill="#a8a29e"
                  variants={FADE_UP}
                />
                {/* Neue, starke Schutzschicht */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="25"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="3"
                  variants={DRAW}
                  transition={{ delay: 0.5 }}
                />
                {/* Neues alkalisches Milieu */}
                <motion.text
                  x="15"
                  y="75"
                  fontSize="8"
                  fill="#059669"
                  variants={FADE_UP}
                  transition={{ delay: 1.0 }}
                >
                  Ca(OH)₂
                </motion.text>
                <motion.text
                  x="65"
                  y="25"
                  fontSize="8"
                  fill="#059669"
                  variants={FADE_UP}
                  transition={{ delay: 1.2 }}
                >
                  Ca(OH)₂
                </motion.text>
              </svg>
              <motion.p
                variants={FADE_UP}
                className="mt-2 text-sm text-muted-foreground"
              >
                Wir stellen das schützende Milieu wieder her und schaffen eine
                dauerhafte Barriere.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
