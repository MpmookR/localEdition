/**
 * Site home page — what a customer sees first after scanning the bar's QR
 * code. Still the default create-next-app starter content; this is where
 * the digital menu (sections, items, language switch) needs to be built.
 * See ../doc.md for the menu content model and architecture.
 *
 * TEMP: smoke-testing the Sanity data fetch below (menuSection[1] + its
 * menuItems) before building the real menu UI.
 */
import Image from "next/image";

import { client } from "@/sanity/lib/client";
import { menuSectionsQuery } from "@/sanity/lib/queries";

export default async function Home() {
  const sections = await client.fetch(menuSectionsQuery);
  const section = sections[1];

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">

        <div className="w-full rounded-lg border border-zinc-200 p-6 text-left dark:border-zinc-800">
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-zinc-500">
            Sanity fetch test — menuSection[1]
          </p>
          {section ? (
            <>
              <h2 className="text-xl font-semibold text-black dark:text-zinc-50">
                {section.titleEn} ({section.titleTh})
              </h2>
              <ul className="mt-3 space-y-1 text-zinc-700 dark:text-zinc-300">
                {section.items.map((item) => (
                  <li key={item._id}>
                    {item.nameEn} — {item.price} THB
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="text-zinc-500">No section found at index 1.</p>
          )}
        </div>

      </main>
    </div>
  );
}
