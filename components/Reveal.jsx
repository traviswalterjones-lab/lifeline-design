"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Elegant scroll-triggered reveal. Children fade + rise into place once.
 * Pass `selector` + `stagger` to sequence child elements instead of the
 * whole block. Honors prefers-reduced-motion.
 */
export default function Reveal({
  children,
  as: Tag = "div",
  y = 26,
  duration = 0.95,
  delay = 0,
  stagger,
  selector,
  start = "top 86%",
  className,
  ...rest
}) {
  const ref = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const targets = selector
        ? ref.current.querySelectorAll(selector)
        : ref.current;

      gsap.from(targets, {
        opacity: 0,
        y,
        duration,
        delay,
        ease: "power3.out",
        stagger,
        scrollTrigger: { trigger: ref.current, start, once: true },
      });
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}
