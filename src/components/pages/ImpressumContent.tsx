'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Check, Info, MapPin, Phone, Mail, FileText, Scale, type LucideIcon } from 'lucide-react'
import { SITE } from '@/config/site'

const CopyableInfo = ({ label, value, icon: Icon }: { label: string; value: string; icon: LucideIcon }) => {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(value)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <div className="group relative flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border/50 hover:border-primary/30 transition-colors">
      <div className="flex items-center gap-4">
        <div className="p-2 rounded-lg bg-background border border-border text-muted-foreground group-hover:text-primary transition-colors">
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</p>
          <p className="font-medium text-foreground">{value}</p>
        </div>
      </div>
      <button
        onClick={handleCopy}
        className="p-2 text-muted-foreground hover:text-foreground hover:bg-background rounded-lg transition-all"
        aria-label={`${label} kopieren`}
      >
        {isCopied ? (
          <Check className="w-4 h-4 text-green-500" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </button>
    </div>
  )
}

export default function ImpressumContent() {
  return (
    <div className="relative min-h-screen bg-background pt-24 pb-20">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Info className="w-4 h-4" />
            <span>Rechtliche Informationen</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display tracking-tight text-foreground mb-6">
            Impressum
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Transparenz schafft Vertrauen. Hier finden Sie alle rechtlich relevanten Informationen zu unserem Unternehmen.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main Info Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-12"
          >
            {/* § 5 DDG */}
            <section className="prose prose-lg prose-neutral dark:prose-invert max-w-none">
              <h2 className="flex items-center gap-3 text-2xl font-bold font-display m-0 mb-6">
                <FileText className="w-6 h-6 text-primary" />
                Angaben gemäß § 5 DDG
              </h2>
              <div className="p-6 rounded-2xl bg-muted/30 border border-border/50 not-prose">
                <p className="text-lg font-medium text-foreground">Andreas Crncic GmbH</p>
                <p className="text-muted-foreground">Kirschhofer Straße 15b</p>
                <p className="text-muted-foreground">66265 Heusweiler</p>
                <div className="mt-6 pt-6 border-t border-border/50">
                  <p className="text-sm text-muted-foreground mb-1">Vertreten durch:</p>
                  <p className="font-medium text-foreground">Andreas Crncic</p>
                </div>
              </div>
            </section>

            {/* Register & Tax */}
            <section className="grid sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-muted/30 border border-border/50">
                <h3 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
                  <Scale className="w-5 h-5 text-primary" />
                  Registereintrag
                </h3>
                <div className="space-y-2 text-muted-foreground">
                  <p>Eintragung im Handelsregister.</p>
                  <p>Registergericht: <span className="text-foreground">Amtsgericht Saarbrücken</span></p>
                  <p>Registernummer: <span className="text-foreground">HRB 11347</span></p>
                </div>
              </div>
              
              <div className="p-6 rounded-2xl bg-muted/30 border border-border/50">
                <h3 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Umsatzsteuer-ID
                </h3>
                <div className="space-y-2 text-muted-foreground">
                  <p>Gemäß §27 a Umsatzsteuergesetz:</p>
                  <p className="text-xl font-mono text-foreground">DE 193545121</p>
                </div>
              </div>
            </section>

            {/* Dispute Resolution */}
            <section className="prose prose-lg prose-neutral dark:prose-invert max-w-none">
              <h3>Verbraucherstreitbeilegung</h3>
              <p className="text-sm text-muted-foreground mt-4">
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </section>
          </motion.div>

          {/* Sidebar: Contact */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-32 space-y-6">
              <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10">
                <h3 className="font-display font-bold text-xl mb-6">Kontakt aufnehmen</h3>
                <div className="space-y-4">
                  <CopyableInfo label="Telefon" value={SITE.phone.display} icon={Phone} />
                  <CopyableInfo label="E-Mail" value={SITE.email} icon={Mail} />
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-background border border-border/50">
                    <div className="p-2 rounded-lg bg-muted text-muted-foreground">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Anschrift</p>
                      <p className="font-medium text-foreground">Kirschhofer Straße 15b</p>
                      <p className="text-muted-foreground">66265 Heusweiler</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
