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
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-gold/15 bg-background/95 backdrop-blur px-8 py-4 sm:gap-6 sm:px-24 sm:py-8">
      <Link
        href="/"
        className="text-xs uppercase tracking-[0.3em] text-cream/70 transition-colors hover:text-gold"
      >
        ← {copy.back}
      </Link>

      <p className="text-sm uppercase tracking-[0.3em] text-gold">{copy.title}</p>

      <LanguageToggle />
    </header>
  );
}
