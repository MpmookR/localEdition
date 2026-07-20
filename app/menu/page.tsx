/**
 * Full menu page — reached via the "View Menu" links on the homepage
 * (Hero, SignatureDrinks). Fetches every visible menu section + the
 * featured item from Sanity and renders the bilingual browse UI.
 */
import { sanityFetch } from "@/sanity/lib/live";
import {
  menuSectionsQuery,
  specialOfMonthQuery,
  siteSettingsQuery,
} from "@/sanity/lib/queries";

import { MenuHeader } from "@/app/components/MenuHeader";
import { SpecialOfMonth } from "@/app/components/SpecialOfMonth";
import { MenuBrowser } from "@/app/components/MenuBrowser";
import { AskBartender } from "@/app/components/AskBartender";
import { FindUs } from "@/app/components/FindUs";
import { Footer } from "@/app/components/Footer";

// See app/page.tsx for why this is required — otherwise Next statically
// prerenders this page once at build and never refetches Sanity content.
export const dynamic = "force-dynamic";

export default async function MenuPage() {
  const [{ data: sections }, { data: featured }, { data: settings }] =
    await Promise.all([
      sanityFetch({ query: menuSectionsQuery }),
      sanityFetch({ query: specialOfMonthQuery }),
      sanityFetch({ query: siteSettingsQuery }),
    ]);

  return (
    <div className="relative flex flex-1 flex-col bg-background text-foreground">
      <MenuHeader />
      <SpecialOfMonth item={featured} />
      <MenuBrowser sections={sections} />
      <AskBartender />
      <FindUs settings={settings} />
      <Footer />
    </div>
  );
}
