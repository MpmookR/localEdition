"use client";

import Image from "next/image";

import { useLanguage } from "@/app/i18n/language-context";
import { urlFor } from "@/sanity/lib/image";

type Item = {
  _id: string;
  nameEn: string | null;
  nameTh: string | null;
  descriptionEn: string | null;
  descriptionTh: string | null;
  price: number | null;
  image: { asset?: unknown; alt?: string } | null;
};

const COPY = {
  en: { label: "Special Of The Month" },
  th: { label: "เมนูพิเศษประจำเดือน" },
} as const;

export function SpecialOfMonth({ item }: { item: Item | null }) {
  const { language } = useLanguage();
  const copy = COPY[language];

  if (!item) return null;

  const name = language === "en" ? item.nameEn : item.nameTh ?? item.nameEn;
  const description =
    language === "en" ? item.descriptionEn : item.descriptionTh ?? item.descriptionEn;
  const imageUrl = item.image
    ? urlFor(item.image).width(200).height(200).fit("crop").url()
    : null;

  return (
    <section className="flex items-center gap-4 border-b border-gold/15 px-6 py-6">
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-gold/20">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={item.image?.alt ?? name ?? ""}
            fill
            sizes="80px"
            className="object-cover"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1">
        <p className="text-xs uppercase tracking-[0.3em] text-gold">◆ {copy.label}</p>

        <div className="flex items-baseline justify-between gap-4">
          <p className="text-lg text-cream">{name}</p>
          {item.price != null && (
            <span className="shrink-0 text-base text-gold">฿{item.price}</span>
          )}
        </div>

        {description && (
          <p className="text-sm italic text-muted">{description}</p>
        )}
      </div>
    </section>
  );
}
