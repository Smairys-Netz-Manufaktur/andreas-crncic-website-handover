# Technische Übergabe – Andreas Crncic GmbH

## Umfang
Diese Kopie enthält die Website ohne bisherige Git-Historie, Zugangsdaten, lokale Abhängigkeiten und Build-Dateien. Dienstkonten werden nicht übergeben. Der Domain-Authentifizierungscode wird separat übermittelt; er dient dem Domaintransfer und ersetzt keine Hosting- oder DNS-Einrichtung.

## Technik und Start
Next.js 16 mit App Router, React 19, TypeScript und Tailwind CSS. Node.js 22 und npm verwenden (`.nvmrc`, `package-lock.json`, `.npmrc`).

```sh
npm ci
# .env.example nach .env.local kopieren und benötigte Werte eintragen
npm run dev
npm run typecheck
npm run lint
npm run build
npm start
```
`npm start` setzt einen erfolgreichen Build voraus. Ein separates Test-Skript ist nicht vorhanden. Für die Installation ohne Git-Hooks kann `HUSKY=0` gesetzt werden. `src/` enthält Anwendung und Inhalte, `public/` öffentliche Dateien, `docs/` enthält ergänzende Projektdokumentation.

## Hosting und Domain
Ein Next.js-Hosting mit Server Actions und serverseitigen ausgehenden HTTPS-Anfragen ist erforderlich; die bisherige Konfiguration ist auf Vercel ausgelegt. Domaintransfer, DNS, HTTPS, Umgebungsvariablen und Deployment im eigenen Hosting einrichten. Bei einem Domainwechsel `src/config/site.ts`, `src/config/analytics.ts` und die reCAPTCHA-Domains überprüfen. Sitemap und Metadaten verwenden die Domain aus `site.ts`. Google Fonts werden beim Build über `next/font/google` eingebunden und können Internetzugriff erfordern.

## Externe Dienste
| Dienst | Zweck | Einrichtung für den Weiterbetrieb |
| --- | --- | --- |
| Google reCAPTCHA v3 | Spam-Schutz des Kontaktformulars | Eigene v3-Property erstellen; Produktions-, Preview- und ggf. lokale Domains registrieren. Site Key und Secret derselben Property konfigurieren. |
| Formcarry | Nimmt Kontaktanfragen entgegen und leitet sie nach Dienstkonfiguration weiter | Eigenes Formular und Empfänger einrichten. In Formcarry reCAPTCHA mit dem Secret derselben Property aktivieren. Endpoint konfigurieren und Zustellung testen. |
| Plausible Analytics | Seitenaufrufe und Ereignisse, z. B. Kontakt, Navigation und Scrolltiefe | Eigene Website in Plausible einrichten und das eigene Skript in `src/app/layout.tsx` einbinden. Domainfreigaben in `src/config/analytics.ts` sowie benötigte Ereignisse und Ziele prüfen. |

Ohne passende reCAPTCHA- und Formcarry-Konfiguration weist das Formular Einsendungen ab. Plausible ist für die Darstellung und Formularübermittlung nicht erforderlich. Das bisherige Plausible-Skript wurde entfernt; ohne eigene Einbindung werden keine Analytics-Daten gesendet.

## Umgebungsvariablen
Die leere Vorlage `.env.example` nach `.env.local` kopieren. Für das Kontaktformular sind `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`, `RECAPTCHA_SECRET_KEY` und `FORMCARRY_ENDPOINT` erforderlich. Den öffentlichen Site Key bereits beim Build bereitstellen; das Secret ausschließlich serverseitig speichern. Optionale Einstellungen für Score, erlaubte Hosts, Preview-Tracking und den Entwicklungs-Fallback sind in `.env.example` erklärt. Den unsicheren Fallback nicht produktiv verwenden.

Das Formular erzeugt zwei reCAPTCHA-Tokens: Die Website prüft das erste, Formcarry das zweite. Ohne übereinstimmende Konfiguration schlägt die Übermittlung fehl. Weitere Details stehen in `docs/kontaktformular-schutz.md`.

## Schutz und Prüfung vor Inbetriebnahme
Die bisherige Vercel-Firewallregel begrenzt laut Projektdokumentation `POST /kontakt` auf acht Anfragen pro Minute und IP. Sie ist keine Projektdatei und muss im eigenen Hosting eingerichtet oder gleichwertig ersetzt werden. Sicherheitsheader und Weiterleitungen stehen in `next.config.ts`; bei neuen externen Diensten die Content-Security-Policy prüfen.

Nach Einrichtung Build, Seiten und Mobilansicht prüfen; eine Testanfrage an einen kontrollierten Empfänger senden und Eingang, Fehlerfall, `/danke` sowie Analytics-Ereignisse prüfen. Datenschutzerklärung und Nutzungsrechte der Bilder und Teamdaten vor Veröffentlichung prüfen. Die vorhandene Dokumentation weist auf einen fehlenden reCAPTCHA-Abschnitt in der Datenschutzerklärung hin.

Typecheck, Lint und Produktions-Build waren vor der Bereinigung mit Node.js 22.23.4 und nach der Bereinigung mit Node.js 24 erfolgreich; Lint meldet sechs Hinweise zur Bildoptimierung. Eine vollständige Formularübermittlung und die externen Dienste wurden nicht getestet.
