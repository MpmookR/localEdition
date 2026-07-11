"use client";

import Image from "next/image";

import { useLanguage } from "@/app/i18n/language-context";
import { urlFor } from "@/sanity/lib/image";

type Item = {
  _id: string;
  section: {
    titleEn: string | null;
    titleTh: string | null;
    descriptionEn: string | null;
    descriptionTh: string | null;
  } | null;
  nameEn: string | null;
  nameTh: string | null;
  ingredientsEn: string | null;
  ingredientsTh: string | null;
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
  const sectionDescription =
    language === "en"
      ? item.section?.descriptionEn ?? item.section?.descriptionTh
      : item.section?.descriptionTh ?? item.section?.descriptionEn;
  const name = language === "en" ? item.nameEn : item.nameTh ?? item.nameEn;
  const ingredients =
    language === "en"
      ? item.ingredientsEn ?? item.ingredientsTh
      : item.ingredientsTh ?? item.ingredientsEn;
  const description =
    language === "en"
      ? item.descriptionEn ?? item.descriptionTh
      : item.descriptionTh ?? item.descriptionEn;
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

      <div className="relative flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:gap-5 lg:gap-6">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-gold/20 sm:h-40 sm:w-52 sm:shrink-0 md:h-48 md:w-64 lg:h-60 lg:w-80">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={item.image?.alt ?? name ?? ""}
              fill
              sizes="(min-width: 1024px) 320px, (min-width: 768px) 256px, (min-width: 640px) 208px, calc(100vw - 4rem)"
              className="object-cover"
            />
          )}
        </div>

        <div className="flex flex-1 flex-col gap-3 sm:gap-4">
          <div className="flex flex-col items-center gap-1 text-center">
            {sectionTitle && (
              <div className="flex w-full items-center gap-2 text-gold sm:gap-4">
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
            {sectionDescription && (
              <p className="text-base text-cream font-medium">{sectionDescription}</p>
            )}
          </div>

          <div className="flex flex-col">
            <div className="flex items-baseline justify-between">
              <p className="text-xl font-bold text-gold">{name}</p>
              {item.price != null && (
                <span className="shrink-0 text-lg text-gold font-bold">฿{item.price}</span>
              )}
            </div>

            {ingredients && (
              <p className="text-base font-medium tracking-wide text-cream">{ingredients}</p>
            )}

            {description && (
              <p className="text-base font-medium tracking-wide text-cream">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
