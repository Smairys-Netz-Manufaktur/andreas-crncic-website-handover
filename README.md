# Andreas Crncic GmbH – Website

Next.js 16 (App Router), React 19, TypeScript und Tailwind CSS. Voraussetzungen: Node.js 22 und npm.

```sh
npm ci
# .env.example nach .env.local kopieren und Werte ergänzen
npm run dev
npm run typecheck
npm run lint
npm run build
npm start
```

`npm start` benötigt einen Produktions-Build. Ein separates Testskript existiert nicht. Die Einrichtung von Hosting, Kontaktformular und Analytics steht in [HANDOVER.md](HANDOVER.md); Details zum Formularschutz stehen in [docs/kontaktformular-schutz.md](docs/kontaktformular-schutz.md).
