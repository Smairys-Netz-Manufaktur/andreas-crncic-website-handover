import { type ComponentType } from 'react'
import {
  Layers,
  Building,
  Search,
  DraftingCompass,
  Hammer,
  Award,
  Shield,
} from 'lucide-react'
import imgBoden from '@/assets/images/Industriebodenbau/epoxidboden-3.jpg'
import imgBetonGeruest from '@/assets/images/Betoninstandsetzung/betonmauer-instandsetzung-auf-geruest.jpg'
import imgBetonDetail from '@/assets/images/Betoninstandsetzung/betoninstandsetzung-durch-2-mitarbeiter-betonwand.webp'

import { StaticImageData } from 'next/image'

export interface ServiceProcessStep {
  icon: ComponentType<{ className?: string }>
  title: string
  description: string
}
export interface Service {
  slug: string
  title: string
  icon: ComponentType<{ className?: string }>
  heroImage: StaticImageData | string
  detailImage: StaticImageData | string
  shortDescription: string
  longDescription: string
  challenge: string
  solution: string
  process: ServiceProcessStep[]
  subServices: string[]
}

// Leistungsdaten für Karten, Detailseiten und Sitemap.
export const servicesData: Service[] = [
  {
    slug: 'betoninstandsetzung',
    title: 'Betoninstandsetzung',
    icon: Layers,
    heroImage: imgBetonGeruest,
    detailImage: imgBetonDetail,
    shortDescription:
      'Instandsetzung nach DAfStb-Richtlinie & EN 1504 – Substanz sichern, Lebensdauer verlängern.',
    longDescription:
      'Wir setzen geschädigte Betonbauteile fachgerecht instand – von der Schadensanalyse über das Freilegen und Schützen korrodierter Bewehrung bis zur Reprofilierung und zu Oberflächenschutzsystemen. Ziel: dauerhafte Tragfähigkeit und Wirtschaftlichkeit.',
    challenge:
      'Ausbrüche, Schadstellen und Bewehrungskorrosion gefährden die Standsicherheit und führen ohne Maßnahmen zu kostenintensiven Folgeschäden.',
    solution:
      'Schadensklassifizierung, Freilegen/Entrosten der Bewehrung, PCC/SPCC-Reprofilierung, Rissverpressung (PU/EP) und Oberflächenschutzsysteme OS 4/5/8 – normgerecht dokumentiert.',
    process: [
      {
        icon: Search,
        title: 'Analyse',
        description:
          'Bauteilprüfung, Karbonatisierung/Chloride, Hohlstellen-Detektion.',
      },
      {
        icon: DraftingCompass,
        title: 'Konzept',
        description: 'Maßnahmenplan gem. DAfStb/EN 1504, Bauablaufplanung.',
      },
      {
        icon: Hammer,
        title: 'Instandsetzung',
        description:
          'Bewehrungsreinigung, Reprofilierung (PCC/SPCC), Rissverpressung.',
      },
      {
        icon: Shield,
        title: 'Schutz',
        description:
          'OS-Systeme, hydrophobe Imprägnierung, Dokumentation & Abnahme.',
      },
    ],
    subServices: [
      'Reprofilierung von Ausbruchstellen',
      'Bewehrungsfreilegung & Korrosionsschutz',
      'Rissverpressung & Oberflächenschutz',
    ],
  },
  {
    slug: 'bodenbeschichtung',
    title: 'Bodenbeschichtung',
    icon: Building,
    heroImage: imgBoden,
    detailImage: imgBoden,
    shortDescription:
      'Industrie- und Lagerhallenböden: belastbare Beschichtungssysteme für Gewerbe und öffentliche Objekte.',
    longDescription:
      'Böden für verschiedene Gewichts- und Leistungsanforderungen. Chemikalien-, stoß- und krafteinwirkungsbeständige Beschichtungssysteme für Produktions-, Lager- und Hallenflächen.',
    challenge:
      'Hohe mechanische Belastungen, Chemikalieneinwirkung und Hygieneanforderungen erfordern spezialisierte Bodenlösungen.',
    solution:
      'Wir bieten maßgeschneiderte Epoxidharz-Beschichtungen, die extrem widerstandsfähig, langlebig und pflegeleicht sind – ausgelegt auf Industrie, Gewerbe und öffentliche Objekte.',
    process: [
      {
        icon: Search,
        title: 'Untergrundprüfung',
        description:
          'Analyse der Bodenbeschaffenheit, Feuchtigkeitsmessung und Haftzugprüfung.',
      },
      {
        icon: Hammer,
        title: 'Vorbereitung',
        description:
          'Kugelstrahlen oder Schleifen zur optimalen Haftungsvorbereitung.',
      },
      {
        icon: Layers,
        title: 'Beschichtung',
        description:
          'Mehrschichtiger Auftrag von Grundierung, Verlaufschicht und Versiegelung.',
      },
      {
        icon: Award,
        title: 'Qualitätssicherung',
        description:
          'Kontrolle der Schichtdicken und Oberflächengüte vor der Übergabe.',
      },
    ],
    subServices: [
      'Industrie- & Lagerhallenböden',
      'Parkhausbeschichtungen',
      'Gewerbliche Beschichtungssysteme',
    ],
  },
]
