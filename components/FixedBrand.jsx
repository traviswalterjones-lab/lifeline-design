"use client";

import { useEffect, useRef, useState } from "react";

function luminance(r, g, b) {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export default function FixedBrand() {
  const [xray, setXray] = useState(false);
  const rafRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    canvasRef.current = document.createElement("canvas");
    canvasRef.current.width = 1;
    canvasRef.current.height = 1;
    const ctx = canvasRef.current.getContext("2d");

    const checkPoint = () => {
      if (rafRef.current) return; // throttle
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        try {
          const x = Math.round(window.innerWidth / 2);
          const y = Math.round(window.innerHeight - 28); // just above bottom padding
          const el = document.elementFromPoint(x, y);
          if (!el) {
            setXray(false);
            return;
          }

          if (el.tagName === "IMG") {
            const img = el;
            const r = img.getBoundingClientRect();
            const sx = Math.floor(((x - r.left) / r.width) * img.naturalWidth);
            const sy = Math.floor(((y - r.top) / r.height) * img.naturalHeight);
            // clamp
            const cx = Math.max(0, Math.min(img.naturalWidth - 1, sx));
            const cy = Math.max(0, Math.min(img.naturalHeight - 1, sy));
            try {
              ctx.clearRect(0, 0, 1, 1);
              ctx.drawImage(img, cx, cy, 1, 1, 0, 0, 1, 1);
              const d = ctx.getImageData(0, 0, 1, 1).data;
              const lum = luminance(d[0], d[1], d[2]);
              setXray(lum < 140);
              return;
            } catch (err) {
              // drawing might fail if image is cross-origin; fall back to computed style
            }
          }

          // fallback — check computed background-color (and color) of the element
          const cs = getComputedStyle(el);
          const bg = cs.backgroundColor;
          if (bg && bg.startsWith("rgb")) {
            const parts = bg.match(/\d+/g) || [];
            if (parts.length >= 3) {
              const r = parseInt(parts[0], 10);
              const g = parseInt(parts[1], 10);
              const b = parseInt(parts[2], 10);
              const lum = luminance(r, g, b);
              setXray(lum < 140);
              return;
            }
          }

          // If we get here, try the element's parent chain until body
          let p = el.parentElement;
          while (p) {
            const pcs = getComputedStyle(p);
            const pbg = pcs.backgroundColor;
            if (pbg && pbg.startsWith("rgb")) {
              const parts = pbg.match(/\d+/g) || [];
              if (parts.length >= 3) {
                const r = parseInt(parts[0], 10);
                const g = parseInt(parts[1], 10);
                const b = parseInt(parts[2], 10);
                const lum = luminance(r, g, b);
                setXray(lum < 140);
                return;
              }
            }
            p = p.parentElement;
          }

          setXray(false);
        } catch (e) {
          setXray(false);
        }
      });
    };

    // listen to common events that change what's under the brand
    window.addEventListener("scroll", checkPoint, { passive: true });
    window.addEventListener("resize", checkPoint);
    window.addEventListener("load", checkPoint);

    // initial run
    checkPoint();

    return () => {
      window.removeEventListener("scroll", checkPoint);
      window.removeEventListener("resize", checkPoint);
      window.removeEventListener("load", checkPoint);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className={`fixed-brand${xray ? " xray" : ""}`} aria-hidden="true">
      <span className="name">LIFELINE</span>
    </div>
  );
}
