"use client";

import Image from "next/image";

import { useLanguage } from "@/app/i18n/language-context";
import { urlFor } from "@/sanity/lib/image";

type Item = {
  _id: string;
  section: {
    titleEn: string | null;
    titleTh: string | null;
  } | null;
  nameEn: string | null;
  nameTh: string | null;
  descriptionEn: string | null;
  descriptionTh: string | null;
  price: number | null;
  image: { asset?: unknown; alt?: string } | null;
};

export function SpecialOfMonth({ item }: { item: Item | null }) {
  const { language } = useLanguage();

  if (!item) return null;

  const sectionTitle =
    language === "en" ? item.section?.titleEn : item.section?.titleTh ?? item.section?.titleEn;
  const name = language === "en" ? item.nameEn : item.nameTh ?? item.nameEn;
  const description =
    language === "en" ? item.descriptionEn : item.descriptionTh ?? item.descriptionEn;
  // Request 2x the desktop display size so retina screens don't upscale a blurry thumbnail.
  const imageUrl = item.image
    ? urlFor(item.image).width(640).height(480).fit("crop").auto("format").url()
    : null;

  return (
    <section
      className="relative overflow-hidden border-b border-gold/15 bg-cover bg-center px-8 py-8 sm:px-16 sm:py-10 md:px-20 lg:px-24 lg:py-12"
      style={{ backgroundImage: "url('/img/PhotoStrip/vibe_3.png')" }}
    >
      <div className="absolute inset-0 bg-background/65" aria-hidden />

      <div className="relative flex items-center gap-4 sm:gap-5 lg:gap-6">
        <div className="relative h-28 w-24 shrink-0 overflow-hidden rounded-lg border border-gold/20 sm:h-40 sm:w-52 md:h-48 md:w-64 lg:h-60 lg:w-80">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={item.image?.alt ?? name ?? ""}
              fill
              sizes="(min-width: 1024px) 320px, (min-width: 768px) 256px, (min-width: 640px) 208px, 96px"
              className="object-cover"
            />
          )}
        </div>

        <div className="flex flex-1 flex-col gap-1">
          {sectionTitle && (
            <div className="flex w-full items-center gap-2 pb-2 text-gold sm:gap-4 sm:pb-6">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/50" />
              <span className="shrink-0 text-gold" aria-hidden>
                ◆
              </span>
              <p className="text-center text-lg font-bold uppercase tracking-wider text-gold">
                {sectionTitle}
              </p>
              <span className="shrink-0 text-gold" aria-hidden>
                ◆
              </span>
              <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/50" />
            </div>
          )}

          <div className="flex items-baseline justify-between gap-4">
            <p className="text-lg text-cream font-semibold">{name}</p>
            {item.price != null && (
              <span className="shrink-0 text-base text-gold font-semibold">฿{item.price}</span>
            )}
          </div>

          {description && (
            <p className="text-base italic text-muted font-semibold">{description}</p>
          )}
        </div>
      </div>
    </section>
  );
}
