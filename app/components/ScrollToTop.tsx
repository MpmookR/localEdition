"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Next.js only scrolls a new page to the top if its root element isn't
// already visible in the viewport — on our tall single-column pages that
// check often passes while scrolled down, so it silently keeps the old
// scroll offset. Force top-of-page on every route change instead.
export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
