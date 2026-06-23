"use client";

import { useLanguage } from "@/app/i18n/language-context";

export function IntroQuote({
  introEn,
  introTh,
}: {
  introEn: string | null;
  introTh: string | null;
}) {
  const { language } = useLanguage();
  const quote = language === "en" ? introEn : introTh ?? introEn;

  if (!quote) return null;

  return (
    <section className="flex flex-col items-center gap-6 px-8 py-14 text-center">
      <span className="text-gold" aria-hidden>
        ◆
      </span>

      <p className="text-lg italic leading-relaxed text-cream/90">“{quote}”</p>

      <p className="text-sm text-muted">— Yuu &amp; Sorn</p>

      <span className="text-gold" aria-hidden>
        ◆
      </span>
    </section>
  );
}
