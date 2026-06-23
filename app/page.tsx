/**
 * Site home page — what a customer sees first after scanning the bar's QR
 * code. Fetches menu sections + site settings from Sanity and renders the
 * bilingual homepage (EN/TH toggle via LanguageProvider). The full menu page
 * (linked from here) hasn't been built yet. See ../doc.md for the content
 * model and architecture.
 */
import { client } from "@/sanity/lib/client";
import { menuSectionsQuery, siteSettingsQuery } from "@/sanity/lib/queries";

import { LanguageProvider } from "@/app/i18n/language-context";
import { LanguageToggle } from "@/app/components/LanguageToggle";
import { Hero } from "@/app/components/Hero";
import { PhotoStrip } from "@/app/components/PhotoStrip";
import { IntroQuote } from "@/app/components/IntroQuote";
import { SignatureDrinks } from "@/app/components/SignatureDrinks";
import { FindUs } from "@/app/components/FindUs";

export default async function Home() {
  const [sections, settings] = await Promise.all([
    client.fetch(menuSectionsQuery),
    client.fetch(siteSettingsQuery),
  ]);

  // No "featured" flag exists in the schema yet — assumes the first section
  // (lowest sortOrder) is the one to preview on the homepage.
  const signatureItems = sections[0]?.items.slice(0, 3) ?? [];

  return (
    <LanguageProvider>
      <div className="relative flex flex-1 flex-col bg-background text-foreground">
        <div className="absolute right-8 top-4 z-10">
          <LanguageToggle />
        </div>

        <Hero />
        <PhotoStrip />
        <IntroQuote
          introEn={settings?.introEn ?? null}
          introTh={settings?.introTh ?? null}
        />
        <SignatureDrinks items={signatureItems} />
        <FindUs settings={settings} />

        <footer className="px-6 py-8 text-center text-xs text-muted">
          © {new Date().getFullYear()} Local Edition. All rights reserved.
        </footer>
      </div>
    </LanguageProvider>
  );
}
