// Bilder ohne zugeordnete Leistung erscheinen nur in der Gesamtansicht.
import beton1 from '../assets/images/Betoninstandsetzung/beton(1).jpg'
import beton2 from '../assets/images/Betoninstandsetzung/beton(2).jpg'
import beton3 from '../assets/images/Betoninstandsetzung/beton(3).jpg'
import beton4 from '../assets/images/Betoninstandsetzung/beton(4).jpg'
import beton5 from '../assets/images/Betoninstandsetzung/beton(5).jpg'
import beton6 from '../assets/images/Betoninstandsetzung/beton(6).jpg'
import beton7 from '../assets/images/Betoninstandsetzung/beton(7).jpg'
import beton8 from '../assets/images/Betoninstandsetzung/beton(8).jpg'
import beton9 from '../assets/images/Betoninstandsetzung/beton(9).jpg'

// Bodenbeschichtung
import epoxid1 from '../assets/images/Industriebodenbau/epoxidboden-1.jpg'
import epoxid2 from '../assets/images/Industriebodenbau/epoxidboden-2.jpg'
import epoxid3 from '../assets/images/Industriebodenbau/epoxidboden-3.jpg'
import epoxid4 from '../assets/images/Industriebodenbau/epoxidboden-4.jpg'
import epoxid5 from '../assets/images/Industriebodenbau/epoxidboden-5.jpg'

// Historische Arbeitsaufnahmen ohne belastbare Zuordnung
import archiv1 from '../assets/images/Schwimmbadbau/schwimmbadbau-1.jpg'
import archiv2 from '../assets/images/Schwimmbadbau/schwimmbadbau-2.jpg'
import archiv3 from '../assets/images/Schwimmbadbau/schwimmbadbau-3.jpg'
import archiv4 from '../assets/images/Schwimmbadbau/schwimmbadbau-4.jpg'
import archiv5 from '../assets/images/Schwimmbadbau/schwimmbadbau-5.jpg'

import { StaticImageData } from 'next/image'

/** Aktive Leistungskategorien, die als Galerie-Filter angeboten werden. */
export type ProjectCategory = 'Betoninstandsetzung' | 'Bodenbeschichtung'

export interface ProjectImage {
  id: number
  src: StaticImageData | string
  /** `null` = keine belastbare Zuordnung; erscheint nur in der Ansicht "Alle". */
  category: ProjectCategory | null
  title: string
  /** Optional, falls Angaben zum Projekt vorliegen. */
  description?: string
}

export const projectImages: ProjectImage[] = [
  // Betoninstandsetzung
  {
    id: 1,
    src: beton1,
    category: 'Betoninstandsetzung',
    title: 'Präzise Fugensanierung',
    description:
      'Unter Beweis stellt sich unsere Expertise, indem wir Risse und Schäden im Beton mit modernen Sanierungstechniken beheben.',
  },
  {
    id: 2,
    src: beton2,
    category: 'Betoninstandsetzung',
    title: 'Wandverstärkung',
    description:
      'Instandsetzung tragender Betonbauteile – robuste Lösungen für gewerbliche und öffentliche Bauvorhaben.',
  },
  {
    id: 3,
    src: beton3,
    category: 'Betoninstandsetzung',
    title: 'Oberflächen-Finish',
    description:
      'Geschickte Hände sanieren beschädigten Beton, ein entscheidender Schritt für stabile Bauwerke.',
  },
  {
    id: 4,
    src: beton4,
    category: 'Betoninstandsetzung',
    title: 'Treppen-Reparatur',
    description:
      'Fachgerechte Instandsetzung für dauerhafte Stabilität und Sicherheit.',
  },
  {
    id: 5,
    src: beton5,
    category: 'Betoninstandsetzung',
    title: 'Decken-Instandsetzung',
    description:
      'Wir beheben Risse und Schäden mit modernen Sanierungstechniken.',
  },
  {
    id: 6,
    src: beton6,
    category: 'Betoninstandsetzung',
    title: 'Träger-Erneuerung',
    description:
      'Ein entscheidender Schritt für stabile Bauwerke in industriellen oder öffentlichen Projekten.',
  },
  {
    id: 7,
    src: beton7,
    category: 'Betoninstandsetzung',
    title: 'Säulen-Sanierung',
    description:
      'Robuste Lösungen für gewerbliche Bauprojekte und öffentliche Einrichtungen.',
  },
  {
    id: 8,
    src: beton8,
    category: 'Betoninstandsetzung',
    title: 'Detailansicht Material',
    description: 'Moderne Sanierungstechniken für ein perfektes Ergebnis.',
  },
  {
    id: 9,
    src: beton9,
    category: 'Betoninstandsetzung',
    title: 'Abschlussarbeiten',
    description: 'Qualität, die man sieht und fühlt – bis ins letzte Detail.',
  },

  // Bodenbeschichtung (Industrie- & Lagerhallenböden)
  {
    id: 10,
    src: epoxid1,
    category: 'Bodenbeschichtung',
    title: 'Spiegelglatte Epoxidbeschichtung',
    description:
      'Optimiert für anspruchsvolle industrielle Anwendungen wie Produktionshallen oder Lagerflächen.',
  },
  {
    id: 11,
    src: epoxid2,
    category: 'Bodenbeschichtung',
    title: 'Vorbereitung des Untergrunds',
    description: 'Die Basis für einen langlebigen und robusten Industrieboden.',
  },
  {
    id: 12,
    src: epoxid3,
    category: 'Bodenbeschichtung',
    title: 'Fugenlose Oberfläche',
    description:
      'Erfüllt die hohen Anforderungen von Produktionshallen und gewerblichen Flächen.',
  },
  {
    id: 13,
    src: epoxid4,
    category: 'Bodenbeschichtung',
    title: 'Detailversiegelung',
    description:
      'Präzision bis in die Ecken für maximale Widerstandsfähigkeit.',
  },
  {
    id: 14,
    src: epoxid5,
    category: 'Bodenbeschichtung',
    title: 'Fertige Lagerhalle',
    description:
      'Belastbare Hallenbodenbeschichtung für den täglichen Betrieb in Lager und Logistik.',
  },

  // Historische Arbeitsaufnahmen – ohne gesicherte Projektdaten, daher ohne
  // Kategorie und ohne Beschreibung. Nicht nachträglich zuordnen oder betexten.
  { id: 15, src: archiv1, category: null, title: 'Referenzaufnahme' },
  { id: 16, src: archiv2, category: null, title: 'Referenzaufnahme' },
  { id: 17, src: archiv3, category: null, title: 'Referenzaufnahme' },
  { id: 18, src: archiv4, category: null, title: 'Referenzaufnahme' },
  { id: 19, src: archiv5, category: null, title: 'Referenzaufnahme' },
]

/**
 * Filterleiste: "Alle" plus die tatsächlich vergebenen aktiven Kategorien.
 * Bilder ohne Zuordnung (`category: null`) erzeugen keinen Filter.
 */
export const projectCategories: string[] = [
  'Alle',
  ...Array.from(
    new Set(
      projectImages
        .map((p) => p.category)
        .filter((c): c is ProjectCategory => c !== null)
    )
  ),
]
