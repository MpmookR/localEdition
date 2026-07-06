"use client";

import Image from "next/image";

import bartenderImage from "../../public/img/bartender.png";

import { useLanguage } from "@/app/i18n/language-context";

const COPY = {
  en: {
    label: "Not sure what to order?",
    body: "Can't find what you're looking for? Just ask our bartender for recommendations!",
  },
  th: {
    label: "ยังไม่เจอเครื่องดื่มที่ถูกใจ?",
    body: "ลองถามบาร์เทนเดอร์ของเราให้ช่วยแนะนำได้เลย",
  },
} as const;

export function AskBartender() {
  const { language } = useLanguage();
  const copy = COPY[language];

  return (
    <section
      className="relative overflow-hidden border-y border-gold/15 bg-cover bg-center px-8 py-8 sm:px-16 sm:py-10 md:px-20 lg:px-24 lg:py-12"
      style={{ backgroundImage: "url('/img/PhotoStrip/vibe_6.jpg')" }}
    >
      <div className="absolute inset-0 bg-background/80" aria-hidden />

      <div className="relative flex items-center gap-4 sm:gap-5 lg:gap-6">
        <div className="relative h-28 w-24 shrink-0 overflow-hidden rounded-lg border border-gold/20 sm:h-40 sm:w-52 md:h-48 md:w-64 lg:h-60 lg:w-80">
          <Image
            src={bartenderImage}
            alt=""
            fill
            sizes="(min-width: 1024px) 320px, (min-width: 768px) 256px, (min-width: 640px) 208px, 96px"
            className="object-cover"
            aria-hidden
          />
        </div>

        <div className="flex flex-1 flex-col gap-1">
          <div className="flex w-full items-center gap-2 pb-2 text-gold sm:gap-4 sm:pb-6">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/50" />
            <span className="shrink-0 text-gold" aria-hidden>
              ◆
            </span>
            <p className="text-center text-lg font-bold uppercase tracking-wider text-gold">
              {copy.label}
            </p>
            <span className="shrink-0 text-gold" aria-hidden>
              ◆
            </span>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/50" />
          </div>

          <p className="text-base text-center text-cream font-semibold">{copy.body}</p>
        </div>
      </div>
    </section>
  );
}
