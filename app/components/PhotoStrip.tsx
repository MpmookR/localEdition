"use client";

import Image, { type StaticImageData } from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";

import vibe1 from "../../public/img/PhotoStrip/vibe_1.jpg";
import vibe2 from "../../public/img/PhotoStrip/vibe_2.png";
import vibe3 from "../../public/img/PhotoStrip/vibe_3.png";
import vibe5 from "../../public/img/PhotoStrip/vibe_5.jpg";
import vibe6 from "../../public/img/PhotoStrip/vibe_6.jpg";
import vibe7 from "../../public/img/PhotoStrip/vibe_7.jpg";

const PHOTOS: Array<{ src: StaticImageData; alt: string }> = [
  { src: vibe1, alt: "Local Edition cocktail and bar detail" },
  { src: vibe2, alt: "Local Edition seating and warm interior lighting" },
  { src: vibe3, alt: "Local Edition cocktail close-up" },
  { src: vibe5, alt: "Local Edition table setting" },
  { src: vibe6, alt: "Local Edition drinks and evening mood" },
  { src: vibe7, alt: "Local Edition interior detail" },
];

const AUTO_SLIDE_DELAY = 4500;

export function PhotoStrip() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: AUTO_SLIDE_DELAY, stopOnInteraction: false }),
  ]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    // emblaApi is null on first render and ready after mount, so re-run this
    // effect once it appears. Embla drives slide changes itself (drag, autoplay,
    // buttons all call its scroll methods) and fires "select" on every settle;
    // mirror that into React state here just to drive the active dot indicator.
    const onSelect = () => setActiveIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const showPrevious = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const showNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section
      className="relative overflow-hidden border-y border-gold/20 bg-background"
      aria-label="Bar photo carousel"
    >
      {/* emblaRef on the viewport; Embla finds the slide track as its first child (here) and drags by translating it */}
      <div className="h-96 w-full overflow-hidden sm:h-120" ref={emblaRef}>
        <div className="flex h-full">
          {PHOTOS.map((photo) => (
            <div key={photo.alt} className="relative h-full w-full shrink-0">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="100vw"
                draggable={false}
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Hidden below sm: — touch users swipe instead of tapping arrows */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 hidden -translate-y-1/2 justify-between px-4 sm:flex">
        <button
          type="button"
          onClick={showPrevious}
          className="pointer-events-auto flex h-10 w-10 cursor-pointer items-center justify-center rounded-[4px] border border-gold/40 bg-background/70 text-lg text-gold"
          aria-label="Show previous photo"
        >
          ←
        </button>
        <button
          type="button"
          onClick={showNext}
          className="pointer-events-auto flex h-10 w-10 cursor-pointer items-center justify-center rounded-[4px] border border-gold/40 bg-background/70 text-lg text-gold"
          aria-label="Show next photo"
        >
          →
        </button>
      </div>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {PHOTOS.map((photo, index) => (
          <button
            key={photo.alt}
            type="button"
            onClick={() => emblaApi?.scrollTo(index)}
            className={`h-1.5 rounded-full transition-all ${
              index === activeIndex ? "w-6 bg-gold" : "w-1.5 bg-cream/40"
            }`}
            aria-label={`Show photo ${index + 1}`}
            aria-current={index === activeIndex}
          />
        ))}
      </div>
    </section>
  );
}
