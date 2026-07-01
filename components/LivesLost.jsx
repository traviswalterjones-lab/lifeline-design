"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const IMG = "/assets/none%20of%20them/IMG_4310.jpeg";

// Full-bleed editorial spread — John Donnelly's Boston Sunday Globe front page.
export default function LivesLost() {
  const ref = useRef(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      const bg = ref.current.querySelector(".ll-bg");
      if (bg) {
        gsap.fromTo(
          bg,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: ref.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }

      gsap.from(ref.current.querySelectorAll(".ll-r"), {
        opacity: 0,
        y: 26,
        duration: 0.95,
        stagger: 0.12,
        ease: "power3.out",
        clearProps: "opacity,transform",
        scrollTrigger: { trigger: ref.current, start: "top 68%", once: true },
      });
    },
    { scope: ref }
  );

  return (
    <section className="lives-lost" ref={ref}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="ll-bg"
        src={IMG}
        width="2016"
        height="1512"
        alt="The Boston Sunday Globe front page 'None of them had to die', from John Donnelly's reporting on the AIDS pandemic."
      />
      <div className="ll-inner">
        <div className="ll-masthead ll-r">Boston Sunday Globe</div>
        <div className="ll-rule ll-r" />
        <div className="ll-eyebrow ll-r">Lives Lost</div>
        <h2 className="ll-headline ll-r">None of them had to die</h2>
        <p className="ll-sub ll-r">
          Yesterday, 24,000 people worldwide could have been saved with basic care.
        </p>
      </div>
    </section>
  );
}
