"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CLIPPINGS } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Clippings() {
  const ref = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(ref.current.querySelectorAll(".clip"), {
        opacity: 0,
        y: 40,
        duration: 0.9,
        stagger: { each: 0.08, from: "start" },
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current.querySelector(".clip-grid"), start: "top 84%", once: true },
      });

      // gentle parallax: alternating columns drift at slightly different rates
      gsap.utils.toArray(ref.current.querySelectorAll(".clip img")).forEach((img, i) => {
        gsap.fromTo(
          img,
          { yPercent: -4 },
          {
            yPercent: 4,
            ease: "none",
            scrollTrigger: {
              trigger: img.closest(".clip"),
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
    },
    { scope: ref }
  );

  return (
    <section className="section" id="reporting" ref={ref}>
      <div className="wrap">
        <div className="sec-head">
          <div>
            <div className="eyebrow">The reporting</div>
            <h2 className="h">Thirty years on the story, across four continents.</h2>
          </div>
          <p>
            For more than a decade John Donnelly reported on AIDS and America&rsquo;s
            response to the pandemic — the dispatches that became <em>Lifeline</em>.
          </p>
        </div>

        <div className="clip-grid">
          {CLIPPINGS.map((c) => (
            <figure className="clip" key={c.src}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.src} alt={c.title} loading="lazy" />
              <figcaption className="cap">
                {c.title} · {c.meta}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="clip-note">
          Selected dispatches · The Boston Globe · 2000–2005
        </div>
      </div>
    </section>
  );
}
