"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { HARPER_URL, RETAILERS, ON_SALE } from "@/lib/content";

gsap.registerPlugin(useGSAP);

const BOOK = "/assets/promo%20hero/book-3d.png";
const HARPER = "/assets/promo%20hero/harper-logo.png";
const TILES = [
  "/assets/tiles/t1.jpg",
  "/assets/tiles/t2.jpg",
  "/assets/tiles/t3.jpg",
  "/assets/tiles/t4.jpg",
  "/assets/tiles/t5.jpg",
  "/assets/tiles/t6.jpg",
  "/assets/tiles/t7.jpg",
  "/assets/tiles/t8.jpg",
];

export default function Hero() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const [grid, setGrid] = useState({ template: "", cells: [], height: "100vh" });

  // Build the patterned clipping grid: solid rows that cover the viewport
  // (and the header), then a checkerboard band that dapples the reveal edge.
  useEffect(() => {
    const build = () => {
      const w = window.innerWidth;
      const vh = window.innerHeight;
      const isMobile = w < 600;
      const cols = isMobile ? 4 : 11;
      const tile = w / cols;
      const solidRows = Math.ceil(vh / tile) + 1; // fully cover viewport + header
      const checkerRows = isMobile ? 4 : 5;
      const rows = solidRows + checkerRows;

      const cells = [];
      let n = 0;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const empty = r >= solidRows && (r + c) % 2 === 0;
          if (empty) {
            cells.push({ empty: true, key: `${r}-${c}` });
          } else {
            cells.push({ empty: false, src: TILES[n % TILES.length], key: `${r}-${c}` });
            n++;
          }
        }
      }

      const gridH = rows * tile + (rows - 1) * 2;
      // Stage stays pinned for (sectionHeight - vh) of scroll. Need that >= gridH
      // so the grid fully clears while the hero is still pinned, then a short hold.
      setGrid({
        template: `repeat(${cols}, 1fr)`,
        cells,
        height: `${gridH + vh * 1.35}px`,
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
      const book = stageRef.current?.querySelector(".ph-cover");
      if (book) {
        gsap.to(book, { y: -10, duration: 3.6, ease: "sine.inOut", yoyo: true, repeat: -1 });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section className="intro-reveal" id="top" ref={sectionRef} style={{ height: grid.height }}>
      <div className="ph-stage" ref={stageRef}>
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
      </div>

      <div className="ir-grid" aria-hidden="true" style={{ gridTemplateColumns: grid.template }}>
        {grid.cells.map((cell) =>
          cell.empty ? (
            <div className="ir-tile is-empty" key={cell.key} />
          ) : (
            <div className="ir-tile" key={cell.key}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={cell.src} alt="" loading="eager" />
            </div>
          )
        )}
      </div>
    </section>
  );
}
