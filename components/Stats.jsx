"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { STATS } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Stats() {
  const ref = useRef(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const nums = gsap.utils.toArray(ref.current.querySelectorAll(".n"));

      nums.forEach((el) => {
        const to = Number(el.dataset.to);
        const suffix = el.dataset.suffix || "";
        const plain = el.dataset.plain === "1";
        const format = (v) =>
          (plain ? Math.round(v).toString() : Math.round(v).toLocaleString("en-US")) + suffix;

        if (reduce) {
          el.textContent = format(to);
          return;
        }

        const obj = { v: 0 };
        gsap.to(obj, {
          v: to,
          duration: 1.6,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = format(obj.v);
          },
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      if (!reduce) {
        gsap.from(ref.current.querySelectorAll(".stat"), {
          opacity: 0,
          y: 24,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 82%", once: true },
        });
      }
    },
    { scope: ref }
  );

  return (
    <section className="statband" ref={ref}>
      <div className="wrap">
        <div className="eyebrow">By the numbers</div>
        <div className="stats">
          {STATS.map((s, i) => (
            <div className="stat" key={i}>
              <div
                className="n"
                data-to={s.to}
                data-suffix={s.suffix || ""}
                data-plain={s.plain ? "1" : "0"}
              >
                0{s.suffix || ""}
              </div>
              <div className="l">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
