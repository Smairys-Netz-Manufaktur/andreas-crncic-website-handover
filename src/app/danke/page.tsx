'use client'

import { useEffect } from 'react'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { CheckCircle, ArrowLeft } from 'lucide-react'
import Button from '@/components/common/Button'

export default function DankePage() {
  useEffect(() => {
    // Clear contact form data from localStorage
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem('contact_form_crncic_v1')
      }
    } catch (e) {
      console.warn('Failed to clear localStorage', e)
    }
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center space-y-8 p-8 rounded-2xl bg-card border border-border shadow-lg"
      >
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
            <CheckCircle className="w-10 h-10" />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-bold font-display text-foreground">
            Vielen Dank!
          </h1>
          <p className="text-muted-foreground text-lg">
            Ihre Nachricht wurde erfolgreich gesendet. Wir haben Ihre Anfrage erhalten und werden uns schnellstmöglich bei Ihnen melden.
          </p>
        </div>

        <div className="pt-4">
          <Link href="/">
            <Button className="w-full sm:w-auto">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Zurück zur Startseite
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
