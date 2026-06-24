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
    <section className="flex flex-col items-center gap-8 px-8 py-14 text-center">
      <div className="flex w-full max-w-[220px] items-center gap-3" aria-hidden>
        <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/50" />
        <span className="text-gold">◆</span>
        <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/50" />
      </div>
      
      <div className="flex flex-col w-full max-w-[880px] items-center gap-8">
      <p className="text-lg italic leading-relaxed text-cream/90">“{quote}”</p>
      <p className="text-sm text-muted">— Yuu &amp; Sorn</p>
      </div>
      
      <div className="flex w-full max-w-[220px] items-center gap-3" aria-hidden>
        <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/50" />
        <span className="text-gold">◆</span>
        <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/50" />
      </div>
    </section>
  );
}
