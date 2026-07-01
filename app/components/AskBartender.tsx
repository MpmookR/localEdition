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
    label: "เลือกไม่ถูกใช่ไหม?",
    body: "หาสิ่งที่ต้องการไม่เจอ? ลองถามบาร์เทนเดอร์ของเราให้ช่วยแนะนำได้เลย!",
  },
} as const;

export function AskBartender() {
  const { language } = useLanguage();
  const copy = COPY[language];

  return (
    <section className="flex items-center gap-4 border-y border-gold/15 bg-muted/5 px-6 py-6">
      <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-lg border border-gold/20">
        <Image
          src={bartenderImage}
          alt=""
          fill
          sizes="80px"
          className="object-cover"
          aria-hidden
        />
      </div>

      <div className="flex flex-1 flex-col gap-1 text-right">
        <p className="text-xs uppercase tracking-[0.3em] text-gold">◆ {copy.label}</p>
        <p className="text-sm italic text-muted">{copy.body}</p>
      </div>
    </section>
  );
}
