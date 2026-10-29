# Kontaktformular und Schutz

`/kontakt` sendet über die Server Action in `src/actions/contact.ts`. Honeypot und Zeitfalle (unter drei Sekunden) liefern zum Schutz vor Bots einen vorgetäuschten Erfolg. Anschließend werden Felder serverseitig validiert und zwei reCAPTCHA-v3-Tokens erzeugt: `contact_submit` prüft der Server bei Google auf Action, Hostname und Score (Standard 0,5); `contact_forward` wird unverbraucht an Formcarry weitergegeben. Formcarry muss reCAPTCHA mit dem Secret derselben Property prüfen. Die Action übermittelt nur Name, E-Mail, Telefon, Nachricht und das zweite Token. Fehler werden ohne Formularinhalt und Tokens protokolliert.

Benötigt werden `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`, `RECAPTCHA_SECRET_KEY` und `FORMCARRY_ENDPOINT`. Ohne gültige Einrichtung scheitert die Übermittlung. Die reCAPTCHA-Property muss die verwendeten Domains erlauben; zusätzliche Hostnamen können über `RECAPTCHA_ALLOWED_HOSTNAMES` gesetzt werden. Einzelheiten zu optionalen Variablen stehen in `.env.example`. Der Entwicklungs-Fallback deaktiviert nur die serverseitige Prüfung des ersten Tokens und darf nicht produktiv eingesetzt werden.

Das frühere Hosting verwendete laut Projektdokumentation ein Rate-Limit von acht `POST /kontakt` pro Minute und IP, ohne globale IP-Sperrdauer. Diese externe Regel muss im neuen Hosting eingerichtet werden. Next.js begrenzt die Größe der Server-Action-Anfragen auf 64 KB; Sicherheitsheader und Content-Security-Policy stehen in `next.config.ts`.

Das reCAPTCHA-Badge wird per CSS ausgeblendet; ein Hinweis mit Links zu Google steht am Formular. Die Datenschutzerklärung enthält derzeit keinen eigenen reCAPTCHA-Abschnitt und muss geprüft werden. Formular und Dienstkonfiguration nach Einrichtung mit einem kontrollierten Empfänger testen.
