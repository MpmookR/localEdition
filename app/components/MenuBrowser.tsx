"use client";

import { useMemo, useState } from "react";

import { useLanguage } from "@/app/i18n/language-context";

type MenuItem = {
  _id: string;
  nameEn: string | null;
  nameTh: string | null;
  ingredientsEn: string | null;
  ingredientsTh: string | null;
  descriptionEn: string | null;
  descriptionTh: string | null;
  price: number | null;
  spirits: string[] | null;
};

type MenuSection = {
  _id: string;
  titleEn: string | null;
  titleTh: string | null;
  descriptionEn: string | null;
  descriptionTh: string | null;
  items: MenuItem[];
};

const SPIRIT_LABELS: Record<string, { en: string; th: string }> = {
  gin: { en: "Gin", th: "จิน" },
  vodka: { en: "Vodka", th: "วอดก้า" },
  rum: { en: "Rum", th: "รัม" },
  tequilaMezcal: { en: "Tequila", th: "เตกีล่า" },
  whiskeyBourbon: { en: "Whiskey", th: "วิสกี้" },
  brandyCognac: { en: "Brandy", th: "บรั่นดี" },
  liqueurAperitif: { en: "Liqueur", th: "ลิเคียว" },
  vermouthFortifiedWine: { en: "Vermouth", th: "เวอร์มุท" },
  wineSparkling: { en: "Wine", th: "ไวน์" },
  beer: { en: "Beer", th: "เบียร์" },
  sakeSoju: { en: "Sake / Soju", th: "สาเก / โซจู" },
  nonAlcoholic: { en: "Non-Alcoholic", th: "ไม่มีแอลกอฮอล์" },
};

// Fixed order the chips render in, when present in the fetched items.
const SPIRIT_ORDER = Object.keys(SPIRIT_LABELS);

const COPY = {
  en: { filterBy: "Filter By Spirit", all: "All" },
  th: { filterBy: "กรองตามประเภทเครื่องดื่ม", all: "ทั้งหมด" },
} as const;

export function MenuBrowser({ sections }: { sections: MenuSection[] }) {
  const { language } = useLanguage();
  const copy = COPY[language];
  const [selectedSpirit, setSelectedSpirit] = useState<string>("all");

  const availableSpirits = useMemo(() => {
    const present = new Set<string>();
    for (const section of sections) {
      for (const item of section.items) {
        item.spirits?.forEach((spirit) => present.add(spirit));
      }
    }
    return SPIRIT_ORDER.filter((spirit) => present.has(spirit));
  }, [sections]);

  return (
    <section className="flex flex-col gap-4 px-8 py-4 sm:gap-6 sm:px-24 sm:py-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between py-4 sm:py-6">
        <p className="text-xs uppercase tracking-wider text-muted">
          {copy.filterBy}
        </p>
        <div className="flex flex-wrap gap-2">
          <SpiritChip
            active={selectedSpirit === "all"}
            onClick={() => setSelectedSpirit("all")}
          >
            {copy.all}
          </SpiritChip>
          {availableSpirits.map((spirit) => (
            <SpiritChip
              key={spirit}
              active={selectedSpirit === spirit}
              onClick={() => setSelectedSpirit(spirit)}
            >
              {SPIRIT_LABELS[spirit][language]}
            </SpiritChip>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-8 py-4 sm:gap-16">
        {sections.map((section) => (
          <MenuSectionBlock
            key={section._id}
            section={section}
            selectedSpirit={selectedSpirit}
          />
        ))}
      </div>
    </section>
  );
}

function SpiritChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`cursor-pointer rounded-lg border px-3 py-1.5 text-xs uppercase tracking-wide transition-colors ${
        active
          ? "border-gold bg-gold text-background"
          : "border-gold/30 text-cream/80 hover:border-gold/60"
      }`}
    >
      {children}
    </button>
  );
}

function MenuSectionBlock({
  section,
  selectedSpirit,
}: {
  section: MenuSection;
  selectedSpirit: string;
}) {
  const { language } = useLanguage();

  const title = language === "en" ? section.titleEn : section.titleTh ?? section.titleEn;
  const description =
    language === "en" ? section.descriptionEn : section.descriptionTh ?? section.descriptionEn;

  const items =
    selectedSpirit === "all"
      ? section.items
      : section.items.filter((item) => item.spirits?.includes(selectedSpirit));

  if (items.length === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col items-center pb-2">
        {title && (
          <div className="flex w-full items-center gap-3 text-gold sm:gap-4">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/50" />
            <span className="shrink-0 text-gold" aria-hidden>
              ◆
            </span>
            <h2 className="max-w-[18rem] text-center text-lg font-bold uppercase tracking-wider text-gold sm:max-w-none">
              {title}
            </h2>
            <span className="shrink-0 text-gold" aria-hidden>
              ◆
            </span>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/50" />
          </div>
        )}
        {description && <p className="text-base italic text-muted font-medium">{description}</p>}
      </div>

      <ul className="flex flex-col">
        {items.map((item) => (
          <MenuItemRow key={item._id} item={item} />
        ))}
      </ul>
    </div>
  );
}

function MenuItemRow({ item }: { item: MenuItem }) {
  const { language } = useLanguage();

  const name = language === "en" ? item.nameEn : item.nameTh ?? item.nameEn;
  const ingredients =
    language === "en" ? item.ingredientsEn : item.ingredientsTh ?? item.ingredientsEn;
  const description =
    language === "en" ? item.descriptionEn : item.descriptionTh ?? item.descriptionEn;

  return (
    <li className="flex flex-col border-b border-gold/15 py-2">
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-lg text-cream font-bold">{name}</p>
        {item.price != null && (
          <span className="shrink-0 text-base text-gold">฿{item.price}</span>
        )}
      </div>
      {ingredients && <p className="text-base text-muted font-medium">{ingredients}</p>}
      {description && <p className="text-base text-muted font-medium tracking-wide">{description}</p>}
    </li>
  );
}
