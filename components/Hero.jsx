"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { HARPER_URL, RETAILERS, ON_SALE } from "@/lib/content";

gsap.registerPlugin(useGSAP);

// Transparent 3D cover render + HarperCollins mark, floating on deep violet,
// with the live pre-order CTA beneath.
const BOOK = "/assets/promo%20hero/book-3d.png";
const HARPER = "/assets/promo%20hero/harper-logo.png";

export default function Hero() {
  const ref = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const q = gsap.utils.selector(ref);
      gsap.from(q(".ph-cover"), {
        opacity: 0,
        y: 34,
        scale: 0.96,
        duration: 1.1,
        ease: "power3.out",
        delay: 0.1,
        clearProps: "opacity",
      });
      gsap.from(q(".ph-cta > *"), {
        opacity: 0,
        y: 16,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.75,
        clearProps: "opacity,transform",
      });
      // gentle continuous float once settled
      gsap.to(q(".ph-cover"), {
        y: -10,
        duration: 3.6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1.6,
      });
    },
    { scope: ref }
  );

  return (
    <section className="promo-hero" id="top" ref={ref}>
      <div className="wrap ph-inner">
        <div className="ph-cover">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="ph-book"
            src={BOOK}
            width="642"
            height="902"
            alt="LIFELINE by John Donnelly — The Story of PEPFAR, the Greatest Humanitarian Initiative of Our Time"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="ph-harper" src={HARPER} width="92" height="104" alt="HarperCollins" />
        </div>

        <div className="ph-cta">
          <a className="btn btn-onlight btn-lg" href={HARPER_URL} target="_blank" rel="noopener">
            Pre-order now
          </a>
          <div className="ph-retailers">
            {RETAILERS.map((r) => (
              <a key={r.name} href={r.url} target="_blank" rel="noopener">
                {r.name}
              </a>
            ))}
          </div>
          <div className="ph-date">{ON_SALE}</div>
        </div>
      </div>
    </section>
  );
}
