import mitarbeiter1 from '../assets/images/Team/crncic-gmbh-team.webp'
import mitarbeiter2 from '../assets/images/Team/crncic-team-schulung.webp'
import mitarbeiterBeton3 from '../assets/images/Team/team-beton-spruehen.webp'
import mitarbeiter4 from '../assets/images/Team/mitarbeiter4.webp'
// Teamaufnahme (Dateiname historisch) – zeigt Arbeitsweise, keine Leistung.
import teamSorgfalt from '../assets/images/Team/balkonsanierung2.webp'

import { StaticImageData } from 'next/image'

export interface TeamMember {
  id: number
  src: StaticImageData | string
  title: string
  description: string
}

export const teamMembers: TeamMember[] = [
  {
    id: 1,
    src: mitarbeiter1,
    title: 'Erfahrung',
    description:
      'Seit 30 Jahren schaffen wir bleibende Werte. Jedes Mitglied unseres Teams trägt diese Erfahrung in sich.',
  },
  {
    id: 2,
    src: mitarbeiterBeton3,
    title: 'Präzision',
    description:
      'Wir überlassen nichts dem Zufall. Präzision ist für uns der Standard, besonders in der Betoninstandsetzung.',
  },
  {
    id: 3,
    src: mitarbeiter2,
    title: 'Teamgeist',
    description:
      'Großes wird nur gemeinsam geschaffen. Unser eingespieltes Team arbeitet Hand in Hand für Ihr Projekt.',
  },
  {
    id: 4,
    src: mitarbeiter4,
    title: 'Verlässlichkeit',
    description:
      'Ein Wort ist ein Wort. Wir stehen für Termintreue und transparente Kommunikation vom Anfang bis zum Ende.',
  },
  {
    id: 5,
    src: teamSorgfalt,
    title: 'Sorgfalt',
    description:
      'Wir arbeiten sauber und mit größter Sorgfalt, um beste Ergebnisse und Ihre Zufriedenheit zu garantieren.',
  },
]
