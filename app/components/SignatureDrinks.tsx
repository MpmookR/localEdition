"use client";

import Link from "next/link";

import { useLanguage } from "@/app/i18n/language-context";

type MenuItem = {
  _id: string;
  nameEn: string | null;
  nameTh: string | null;
  ingredientsEn: string | null;
  ingredientsTh: string | null;
  price: number | null;
};

const COPY = {
  en: { heading: "Signature Drinks", cta: "View Full Menu" },
  th: { heading: "ซิกเนเจอร์", cta: "ดูเมนูทั้งหมด" },
} as const;

export function SignatureDrinks({ items }: { items: MenuItem[] }) {
  const { language } = useLanguage();
  const copy = COPY[language];

  if (items.length === 0) return null;

  return (
    <section className="flex flex-col gap-4 px-8 py-2 sm:gap-6 sm:px-24 sm:py-8">
      <h2 className="text-center text-lg uppercase tracking-[0.3em] text-gold">
        {copy.heading}
      </h2>

      <ul className="flex flex-col">
        {items.map((item) => {
          const name = language === "en" ? item.nameEn : item.nameTh ?? item.nameEn;
          const ingredients =
            language === "en"
              ? item.ingredientsEn
              : item.ingredientsTh ?? item.ingredientsEn;

          return (
            <li
              key={item._id}
              className="flex items-baseline justify-between gap-4 border-b border-gold/15 py-4"
            >
              <div>
                <p className="text-lg text-cream">{name}</p>
                {ingredients && (
                  <p className="text-base italic text-muted">{ingredients}</p>
                )}
              </div>
              {item.price != null && (
                <span className="shrink-0 text-base text-gold">฿{item.price}</span>
              )}
            </li>
          );
        })}
      </ul>

      <div className="flex flex-col items-center gap-4 py-8 sm:gap-8">
        <Link
          href="/menu"
          className="w-full max-w-xs text-center rounded-lg bg-background px-8 py-3 text-base font-bold text-gold tracking-widest transition-colors duration-600 hover:bg-gold hover:text-background sm:max-w-sm"
        >
          {copy.cta} →
        </Link>

        <div className="flex w-full max-w-[220px] items-center gap-4" aria-hidden>
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/50" />
          <span className="text-gold">◆</span>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/50" />
        </div>
      </div>
    </section>
  );
}

          // className="text-base uppercase tracking-widest text-gold underline-offset-4 hover:underline"
