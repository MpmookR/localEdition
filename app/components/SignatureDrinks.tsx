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
    <section className="flex flex-col gap-6 px-6 py-10">
      <h2 className="text-center text-sm uppercase tracking-[0.3em] text-cream/80">
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
                  <p className="text-sm italic text-muted">{ingredients}</p>
                )}
              </div>
              {item.price != null && (
                <span className="shrink-0 text-sm text-gold">฿{item.price}</span>
              )}
            </li>
          );
        })}
      </ul>

      <Link
        href="/menu"
        className="self-center text-sm uppercase tracking-widest text-gold underline-offset-4 hover:underline"
      >
        {copy.cta} →
      </Link>
    </section>
  );
}
