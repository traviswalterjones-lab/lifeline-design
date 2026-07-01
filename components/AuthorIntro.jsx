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
        clearProps: "opacity,transform",
        scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
      });

      const img = ref.current.querySelector(".ai-photo img");
      gsap.fromTo(
        img,
        { yPercent: -3 },
        {
          yPercent: 3,
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
          <img
            src="/assets/author/author-field-crop.png"
            width="990"
            height="812"
            alt="John Donnelly"
          />
        </figure>

        <div className="ai-body">
          <div className="eyebrow ai-r">The author</div>
          <h2 className="ai-r">
            John Donnelly spent thirty years as a journalist—much of it covering
            stories of global health, AIDS, and America&rsquo;s response to the
            deadly pandemic. That reporting led to <em>Lifeline</em>.
          </h2>
          <div className="ai-cta ai-r">
            <a className="btn btn-ghost btn-md" href="/about">
              More about John
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
