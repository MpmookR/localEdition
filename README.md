# Local Edition

A bilingual (Thai/English) digital menu for a cocktail bar in Hatyai, Thailand — built end-to-end as a freelance client project, from schema design to production data pipeline.

**The brief:** the bar is dark and low-light, so a printed menu doesn't work well. Customers scan a QR code at their table and land straight on a mobile-first site, with the full menu one tap away. The owner needed to be able to update prices, add seasonal drinks, and edit contact info herself, without ever asking a developer to redeploy.

**The build:** a Next.js site backed by Sanity CMS, so content editing and code are fully decoupled — the owner works in a hosted Studio, the public site reads from Sanity's dataset and renders instantly.

## Live

- Content Studio (owner-facing CMS): [local-edition.sanity.studio](https://local-edition.sanity.studio/)
- Public site: not yet deployed (see [Status](#status))

## What it does

- **Homepage** — hero image, autoplaying photo carousel, the owner's bilingual welcome note, a preview of signature drinks, and a contact/map section.
- **Menu page** — sticky header, a "Special of the Month" feature banner, the full menu with spirit-filter chips (gin, rum, vodka, etc.), and an "Ask the Bartender" prompt.
- **Thai/English toggle** — a single tap swaps every page's copy instantly. No `/en` `/th` routes, no reload, no flash of the wrong language on refresh.
- **No booking, no ordering** — deliberately just a menu to browse, matching how the bar actually operates.
- **Owner-editable content** — menu sections, items, prices, photos, hours, and contact links are all managed in Sanity Studio, with zero code changes required for day-to-day updates.

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS v4 — dark-only palette, tuned for a low-light venue |
| CMS | Sanity v5, via `next-sanity`, with a hosted Studio |
| Data layer | Typed GROQ queries (`defineQuery`) + Sanity TypeGen — schema and query result types are generated, not hand-written |
| Carousel | Embla Carousel + autoplay plugin |

## Engineering highlights

A few problems that came up during the build and how they were solved — the kind of detail that doesn't show up just from browsing the file tree:

- **Custom i18n without a routing layer.** Rather than pull in an i18n framework for two languages and no SEO requirement for separate locale URLs, the toggle is a single React context (`LanguageProvider`) built on `useSyncExternalStore`, reading/writing `localStorage` directly. This avoids the classic hydration-mismatch bug (server has no `localStorage`, so `getServerSnapshot()` always returns `"en"` to match the client's first paint) and the "language resets when you navigate" bug that comes from mounting the provider per-page instead of once in the root layout.
- **Content model with a deliberate trade-off.** "Special of the Month" isn't a boolean flag — it's a reserved `sortOrder == 0` section that the homepage query treats specially. Documented as a known sharp edge (an editor could accidentally trigger it) rather than hidden, with a clear upgrade path to an explicit flag if it becomes a real problem.
- **Diagnosed and fixed a mobile image-blur bug** by tracing it to a mismatch between `object-cover`'s height-driven scaling on a portrait-cropped mobile hero and a `sizes` attribute that only accounted for viewport width — the browser was fetching an image sized for the wrong dimension and upscaling it.
- **Typed, generated data layer.** GROQ queries are colocated in one file and typed via `next-sanity`'s `defineQuery`, then run through `sanity typegen generate` to produce `sanity.types.ts` — query result shapes stay in sync with the actual Sanity schema instead of hand-maintained interfaces drifting out of date.

## Getting started

```bash
npm install
npm run dev
```

- Public site: [http://localhost:3000](http://localhost:3000)
- Sanity Studio (local, content editing): [http://localhost:3000/studio](http://localhost:3000/studio)

Requires `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` in `.env.local`.

After changing the Sanity schema or any GROQ query, regenerate types:

```bash
npm run typegen
```

## Status

Actively developed. The content model, homepage, and menu page are built and wired to live Sanity data with real content entered by the bar owner. The Sanity Studio is deployed and in use; the Next.js site itself is not yet deployed to production.
