"use client";

import Link from "next/link";

import { useLanguage } from "@/app/i18n/language-context";
import { LanguageToggle } from "@/app/components/LanguageToggle";

const COPY = {
  en: { back: "Back", title: "Local Edition" },
  th: { back: "ย้อนกลับ", title: "Local Edition" },
} as const;

export function MenuHeader() {
  const { language } = useLanguage();
  const copy = COPY[language];

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-gold/15 bg-background/95 backdrop-blur px-8 py-8 sm:gap-2 sm:px-24 sm:py-8 ">
      <Link
        href="/"
        className="text-sm uppercase tracking-wider text-cream/70 transition-colors hover:text-gold sm:text-base"
      >
        ← {copy.back}
      </Link>

      <Link
        href="/"
        aria-label="Go to homepage"
        className="text-sm uppercase tracking-widest text-gold font-bold transition-colors hover:text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold sm:text-lg"
      >
        {copy.title}
      </Link>

      <LanguageToggle />
    </header>
  );
}
