"use client";

import Link from "next/link";
import Image from "next/image";

import heroImage from "../../public/img/Hero3.png";

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

      <div className="relative z-10 mt-auto flex w-full flex-col items-center gap-4 sm:gap-2">
        <p className="text-base uppercase tracking-[0.3em] text-cream/90">
          {copy.tagline}
        </p>

        <Link
          href="/menu"
          className="w-full max-w-xs rounded-md border border-gold bg-gold px-8 py-3 text-base font-bold text-background transition-colors duration-300 hover:bg-background hover:text-gold sm:max-w-sm"
        >
          {copy.cta} →
        </Link>
      </div>
    </section>
  );
}
