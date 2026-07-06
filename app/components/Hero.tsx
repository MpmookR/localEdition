"use client";

import Link from "next/link";
import Image from "next/image";

import heroImage from "../../public/img/Hero4.png";

import { useLanguage } from "@/app/i18n/language-context";

const COPY = {
  en: {
    tagline: "Hatyai · Cocktails · Beers",
    cta: "View Menu",
  },
  th: {
    tagline: "หาดใหญ่ · ค็อกเทล · เบียร์",
    cta: "เมนู",
  },
} as const;

export function Hero() {
  const { language } = useLanguage();
  const copy = COPY[language];

  return (
    <section className="relative flex min-h-[680px] overflow-hidden bg-background px-6 pb-4 pt-20 text-center sm:min-h-[778px] sm:pb-3">
      <Image
        src={heroImage}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_42%]"
        aria-hidden
      />

      <div className="relative z-10 mt-auto flex w-full flex-col items-center gap-4 sm:gap-8">
        <p className="text-base uppercase tracking-[0.3em] text-cream/90">
          {copy.tagline}
        </p>

        <Link
          href="/menu"
          className="w-full max-w-xs rounded-lg border border-gold bg-background px-8 py-3 text-base font-bold text-gold tracking-widest transition-colors duration-400 hover:bg-gold hover:text-background sm:max-w-sm"
        >
          {copy.cta} →
        </Link>
      </div>
    </section>
  );
}
