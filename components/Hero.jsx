"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { HARPER_URL, RETAILERS, ON_SALE, CLIPPINGS } from "@/lib/content";

const TILES = CLIPPINGS.map((c) => c.src);

/**
 * A patterned grid of John Donnelly's dispatches scrolls up over a pinned
 * editorial title page — a clean "wipe" reveal driven by native scroll.
 */
export default function Hero() {
  const sectionRef = useRef(null);
  const heroRef = useRef(null);
  const [grid, setGrid] = useState({ cols: 11, template: "", cells: [], height: "100vh" });

  useEffect(() => {
    const build = () => {
      const w = window.innerWidth;
      const isMobile = w < 600;
      const cols = isMobile ? 4 : 11;
      const solidRows = isMobile ? 11 : 11;
      const checkerRows = isMobile ? 6 : 6;
      const rows = solidRows + checkerRows;
      const tile = w / cols;

      const cells = [];
      let n = 0;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const empty = r >= solidRows && (r + c) % 2 === 0; // checkerboard band
          if (empty) {
            cells.push({ empty: true, key: `${r}-${c}` });
          } else {
            cells.push({ empty: false, src: TILES[n % TILES.length], key: `${r}-${c}` });
            n++;
          }
        }
      }

      const gridH = rows * tile + (rows - 1) * 2;
      setGrid({
        cols,
        template: `repeat(${cols}, 1fr)`,
        cells,
        height: `${gridH + window.innerHeight}px`,
      });
    };

    build();
    let t;
    const onResize = () => {
      clearTimeout(t);
      t = setTimeout(build, 180);
    };
    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const q = gsap.utils.selector(heroRef);
      gsap
        .timeline({ delay: 0.15 })
        .from(q(".ed-eyebrow"), { opacity: 0, y: 18, duration: 0.8, ease: "power3.out" })
        .from(q(".ed-headline"), { opacity: 0, y: 30, duration: 1.1, ease: "power3.out" }, "-=0.5")
        .from(q(".ed-rule"), { scaleX: 0, transformOrigin: "center", duration: 0.9, ease: "power2.out" }, "-=0.6")
        .from(q(".ed-sub"), { opacity: 0, y: 18, duration: 0.8, ease: "power3.out" }, "-=0.5")
        .from(q(".ed-author"), { opacity: 0, y: 14, duration: 0.7, ease: "power3.out" }, "-=0.45")
        .from(q(".ed-actions > *"), { opacity: 0, y: 14, duration: 0.7, stagger: 0.12, ease: "power3.out" }, "-=0.4");
    },
    { scope: heroRef }
  );

  return (
    <section className="reveal-hero" ref={sectionRef} style={{ height: grid.height }} id="top">
      <div className="rh-hero" ref={heroRef}>
        <div className="ed-hero">
          <div className="ed-masthead">
            <span>HarperCollins</span>
            <span className="mid">Nonfiction</span>
            <span>{ON_SALE.replace("On sale ", "")}</span>
          </div>

          <span className="ed-eyebrow">A new book by John Donnelly</span>
          <h1 className="ed-headline">LIFELINE</h1>
          <div className="ed-rule" />
          <p className="ed-sub">
            The Story of PEPFAR — the Greatest Humanitarian Initiative of Our Time
          </p>
          <div className="ed-author">John Donnelly</div>

          <div className="ed-actions">
            <a className="btn btn-onwhite btn-lg" href={HARPER_URL} target="_blank" rel="noopener">
              Pre-order now
            </a>
            <div className="ed-retailers">
              {RETAILERS.map((r) => (
                <a key={r.name} href={r.url} target="_blank" rel="noopener">
                  {r.name}
                </a>
              ))}
            </div>
            <div className="ed-date">{ON_SALE}</div>
          </div>
        </div>

        <div className="rh-hint">Scroll</div>
      </div>

      <div
        className="rh-grid"
        aria-hidden="true"
        style={{ gridTemplateColumns: grid.template }}
      >
        {grid.cells.map((cell) =>
          cell.empty ? (
            <div className="rh-tile is-empty" key={cell.key} />
          ) : (
            <div className="rh-tile" key={cell.key}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={cell.src} alt="" loading="eager" />
            </div>
          )
        )}
      </div>
    </section>
  );
}
