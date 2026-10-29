'use client'

import { motion } from 'framer-motion'
import { Link as ScrollLink } from 'react-scroll'
import { ArrowRight, Shield, Lock, Eye } from 'lucide-react'

export default function DatenschutzContent() {
  const sections = [
    { id: 'ueberblick', title: '1. Datenschutz auf einen Blick' },
    { id: 'hosting', title: '2. Hosting & CDN' },
    { id: 'allgemein', title: '3. Allgemeine Hinweise' },
    { id: 'datenerfassung', title: '4. Datenerfassung' },
  ]

  return (
    <div className="relative min-h-screen bg-background pt-24 pb-20">
      {/* Header Section */}
      <div className="container mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Shield className="w-4 h-4" />
            <span>Datenschutzerklärung</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display tracking-tight text-foreground mb-6">
            Ihre Daten sind <br />
            <span className="text-primary">bei uns sicher.</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Hier erfahren Sie transparent, was mit Ihren Daten passiert.
          </p>
        </motion.div>
      </div>

      <div className="container grid lg:grid-cols-[300px_1fr] gap-12 items-start">
        {/* Sticky Navigation (Desktop) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hidden lg:block sticky top-32 p-6 rounded-2xl bg-muted/30 border border-border/50 backdrop-blur-sm"
        >
          <h3 className="font-display font-bold text-lg mb-4 text-foreground">Inhalt</h3>
          <nav className="flex flex-col gap-2">
            {sections.map((section) => (
              <ScrollLink
                key={section.id}
                to={section.id}
                smooth={true}
                offset={-100}
                duration={500}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer py-1.5"
                activeClass="text-primary font-medium"
                spy={true}
              >
                <ArrowRight className="w-3 h-3 opacity-50" />
                {section.title}
              </ScrollLink>
            ))}
          </nav>
        </motion.div>

        {/* Content Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="prose prose-lg prose-neutral dark:prose-invert max-w-none"
        >
          {/* 1. Überblick */}
          <section id="ueberblick" className="scroll-mt-32 mb-16">
            <div className="flex items-center gap-3 mb-6 not-prose">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Eye className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold font-display m-0">1. Datenschutz auf einen Blick</h2>
            </div>
            
            <h3>Allgemeine Hinweise</h3>
            <p>
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
            </p>

            <h3>Datenerfassung auf dieser Website</h3>
            <h4>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</h4>
            <p>
              Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
            </p>

            <h4>Wie erfassen wir Ihre Daten?</h4>
            <p>
              Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben.
            </p>
            <p>
              Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website betreten.
            </p>
          </section>

          {/* 2. Hosting */}
          <section id="hosting" className="scroll-mt-32 mb-16">
            <div className="flex items-center gap-3 mb-6 not-prose">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Lock className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold font-display m-0">2. Hosting und Content Delivery Networks (CDN)</h2>
            </div>
            
            <h3>Externes Hosting</h3>
            <p>
              Diese Website wird bei einem externen Dienstleister gehostet (Vercel). Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert. Hierbei kann es sich v. a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen, Webseitenzugriffe und sonstige Daten, die über eine Website generiert werden, handeln.
            </p>
          </section>

          {/* 3. Allgemeine Hinweise */}
          <section id="allgemein" className="scroll-mt-32 mb-16">
            <h2 className="font-display">3. Allgemeine Hinweise und Pflichtinformationen</h2>
            <h3>Datenschutz</h3>
            <p>
              Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
            </p>
          </section>

          {/* 4. Datenerfassung */}
          <section id="datenerfassung" className="scroll-mt-32 mb-16">
            <h2 className="font-display">4. Datenerfassung auf dieser Website</h2>
            
            <h3>Kontaktformular (Formcarry)</h3>
            <p>
              Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
            </p>
            <p>
              Wir nutzen für den Versand und die Verwaltung der Kontaktanfragen den Dienstleister <strong>Formcarry</strong>. Anbieter ist die formcarry.com.
              Die Verarbeitung der in das Kontaktformular eingegebenen Daten erfolgt somit ausschließlich auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Sie können diese Einwilligung jederzeit widerrufen. Dazu reicht eine formlose Mitteilung per E-Mail an uns. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitungsvorgänge bleibt vom Widerruf unberührt.
            </p>

            <h3>Analyse-Tools und Werbung</h3>
            <h4>Plausible Analytics</h4>
            <p>
              Wir nutzen auf unserer Website den Open-Source-Webanalysedienst <strong>Plausible Analytics</strong>. Anbieter ist die Plausible Insights OÜ, Västriku tn 2, 50403, Tartu, Estland.
            </p>
            <p>
              Plausible Analytics ist ein datenschutzfreundliches Analyse-Tool, das <strong>keine Cookies</strong> verwendet und keine personenbezogenen Daten speichert. Es werden keine IP-Adressen gespeichert oder langfristig nachverfolgt. Die Analyse erfolgt auf Basis aggregierter Daten, die keine Rückschlüsse auf einzelne Personen zulassen.
            </p>
            <p>
              Die Nutzung von Plausible Analytics erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an der anonymisierten Analyse des Nutzerverhaltens, um sowohl sein Webangebot als auch seine Werbung zu optimieren.
            </p>
            <p>
              Weitere Informationen zum Datenschutz bei Plausible Analytics finden Sie unter: <a href="https://plausible.io/data-policy" target="_blank" rel="noopener noreferrer">https://plausible.io/data-policy</a>.
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  )
}
