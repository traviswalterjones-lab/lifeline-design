"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function AuthorIntro() {
  const ref = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(ref.current.querySelectorAll(".ai-r"), {
        opacity: 0,
        y: 26,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
      });

      const img = ref.current.querySelector(".ai-photo img");
      gsap.fromTo(
        img,
        { yPercent: -6 },
        {
          yPercent: 6,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current.querySelector(".ai-photo"),
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    },
    { scope: ref }
  );

  return (
    <section className="section author-intro" id="author" ref={ref}>
      <div className="wrap ai-inner">
        <figure className="ai-photo ai-r">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/tiles/t5.jpg" alt="John Donnelly's reporting from the field" />
          <figcaption className="cap">From the field · The Boston Globe</figcaption>
        </figure>

        <div className="ai-body">
          <div className="eyebrow ai-r">The author</div>
          <h2 className="ai-r">
            John Donnelly spent thirty years as a journalist — much of it covering
            global health, AIDS, and America&rsquo;s response to the pandemic. That
            reporting led to <em>Lifeline.</em>
          </h2>
          <p className="ai-r">
            He has reported from Jerusalem, Cairo, Pretoria, Washington and beyond
            for the Boston Globe, the Miami Herald and the Associated Press. For
            more than a decade he chronicled the politics of AIDS and the people —
            American and African — who raced to turn the tide.
          </p>
          <div className="ai-tags ai-r">
            <span>Global health</span>
            <span>PEPFAR</span>
            <span>The Boston Globe</span>
            <span>Foreign correspondent</span>
          </div>
        </div>
      </div>
    </section>
  );
}
