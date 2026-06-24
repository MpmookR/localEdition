"use client";

import Image, { type StaticImageData } from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

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
const DRAG_THRESHOLD = 40;

export function PhotoStrip() {
  const [activeIndex, setActiveIndex] = useState(0);
  const dragStartX = useRef<number | null>(null);

  const showPrevious = useCallback(() => {
    setActiveIndex((current) => (current === 0 ? PHOTOS.length - 1 : current - 1));
  }, []);

  const showNext = useCallback(() => {
    setActiveIndex((current) => (current === PHOTOS.length - 1 ? 0 : current + 1));
  }, []);

  useEffect(() => {
    const slideTimer = window.setInterval(showNext, AUTO_SLIDE_DELAY);

    return () => window.clearInterval(slideTimer);
  }, [showNext]);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    dragStartX.current = event.clientX;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartX.current === null) return;

    const dragDistance = event.clientX - dragStartX.current;
    dragStartX.current = null;

    if (Math.abs(dragDistance) < DRAG_THRESHOLD) return;

    if (dragDistance > 0) {
      showPrevious();
    } else {
      showNext();
    }
  };

  return (
    <section
      className="relative overflow-hidden border-y border-gold/20 bg-background"
      aria-label="Bar photo carousel"
    >
      <div
        className="relative h-96 w-full cursor-grab touch-pan-y select-none sm:h-120"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => {
          dragStartX.current = null;
        }}
      >
        {PHOTOS.map((photo, index) => (
          <Image
            key={photo.alt}
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="100vw"
            draggable={false}
            className={`object-cover transition-opacity duration-500 ${
              index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between px-4">
        <button
          type="button"
          onClick={showPrevious}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-[4px] border border-gold/40 bg-background/70 text-lg text-gold"
          aria-label="Show previous photo"
        >
          ←
        </button>
        <button
          type="button"
          onClick={showNext}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-[4px] border border-gold/40 bg-background/70 text-lg text-gold"
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
            onClick={() => setActiveIndex(index)}
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
