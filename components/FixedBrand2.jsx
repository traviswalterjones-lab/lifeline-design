"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

// Fixed bottom-center wordmark. The inverted-knockout look is pure CSS
// (mix-blend-mode: difference — see .fixed-brand). This component only toggles
// state-class hooks:
//   - scrolled: retained hook (past the fold)
//   - hidden:   when the brand vertically overlaps any [data-hide-brand] section
//               (the purple promo + the shared footer), so the wordmark fades
//               out over content where blending looks messy.
export default function FixedBrand() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const brandRef = useRef(null);
  const hideEls = useRef([]);
  const curtainEls = useRef([]);
  const rafRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    // Cache the opt-out sections; re-query only on route change, never per frame.
    hideEls.current = Array.from(document.querySelectorAll("[data-hide-brand]"));
    // The checkerboard curtain is painted ON TOP of the pinned (sticky) promo
    // stage. The promo stage carries data-hide-brand and stays in the viewport
    // behind the curtain the whole time, so a plain rect check can't tell the
    // two apart. While the curtain covers the brand's position, keep the brand
    // visible (it inverts over the tiles); once the curtain scrolls off, the
    // promo behind it takes over and the brand hides.
    curtainEls.current = Array.from(document.querySelectorAll(".ir-grid"));

    const vOverlap = (a, b) => a.bottom > b.top && a.top < b.bottom;

    const run = () => {
      rafRef.current = null;
      const el = brandRef.current;
      if (!el) return;
      const br = el.getBoundingClientRect();

      for (const c of curtainEls.current) {
        if (vOverlap(br, c.getBoundingClientRect())) {
          setHidden(false);
          return;
        }
      }

      let over = false;
      for (const node of hideEls.current) {
        const r = node.getBoundingClientRect();
        if (vOverlap(br, r)) {
          over = true;
          break;
        }
      }
      setHidden(over);
    };

    const check = () => {
      setScrolled(window.scrollY > 24);
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(run);
    };

    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    check();

    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [pathname]);

  return (
    <div
      ref={brandRef}
      className={`fixed-brand xray${scrolled ? " scrolled" : " not-scrolled"}${
        hidden ? " hidden" : ""
      }`}
      aria-hidden="true"
    >
      <span className="name">LIFELINE</span>
    </div>
  );
}
