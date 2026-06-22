# Local Edition

Bilingual (Thai/English) digital menu site for a cocktail bar in Hatyai, Thailand. Customers scan a QR code at their table to view the menu on their phone — no booking, no ordering, just browsing.

Built with Next.js + Sanity CMS so the bar owner can edit menu items/prices without a redeploy.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Sanity v5

## Getting started

```bash
npm install
npm run dev
```

- Public site: [http://localhost:3000](http://localhost:3000)
- Sanity Studio (content editing): [http://localhost:3000/studio](http://localhost:3000/studio)

Requires `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` in `.env.local`.

See [doc.md](doc.md) for full project architecture and current build status.
