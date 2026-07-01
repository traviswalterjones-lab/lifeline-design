"use client";

import { useEffect, useRef, useState } from "react";

function luminance(r, g, b) {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export default function FixedBrand() {
  const [xray, setXray] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const rafRef = useRef(null);
  const canvasRef = useRef(null);
+  const brandRef = useRef(null);

  useEffect(() => {
    canvasRef.current = document.createElement("canvas");
    canvasRef.current.width = 1;
    canvasRef.current.height = 1;
    const ctx = canvasRef.current.getContext("2d");

    const rectsIntersect = (a, b) => {
      return !(b.left > a.right || b.right < a.left || b.top > a.bottom || b.bottom < a.top);
    };

    const checkPoint = () => {
      setScrolled(window.scrollY > 24);
      if (rafRef.current) return; // throttle
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        try {
+          const brandEl = brandRef.current;
+          if (!brandEl) return;
+          const brandRect = brandEl.getBoundingClientRect();
+
+          // find promo and curtain rects
+          const promoEls = Array.from(document.querySelectorAll('.ph-book, .intro-reveal, .ph-stage, .ph-cover'));
+          let isOverPromo = false;
+          for (const pe of promoEls) {
+            const pr = pe.getBoundingClientRect();
+            if (rectsIntersect(brandRect, pr)) { isOverPromo = true; break; }
+          }
+          const curtainEls = Array.from(document.querySelectorAll('.ir-grid'));
+          let isOverCurtain = false;
+          for (const ce of curtainEls) {
+            const cr = ce.getBoundingClientRect();
+            if (rectsIntersect(brandRect, cr)) { isOverCurtain = true; break; }
+          }
+
+          // hide only when overlapping promo and not overlapping curtain
+          if (isOverPromo && !isOverCurtain) {
+            setHidden(true);
+          } else {
+            setHidden(false);
+          }
+
+          // sample pixel at brand center for xray detection
+          const cx = Math.round(brandRect.left + brandRect.width / 2);
+          const cy = Math.round(brandRect.top + brandRect.height / 2);
+          const el = document.elementFromPoint(cx, cy);
+          if (!el) {
+            setXray(false);
+            return;
+          }

-          const x = Math.round(window.innerWidth / 2);
-          const y = Math.round(window.innerHeight - 28); // just above bottom padding
-          const el = document.elementFromPoint(x, y);
-          if (!el) {
-            setXray(false);
-            setHidden(false);
-            return;
-          }
-
-          if (el.tagName === "IMG") {
-            const img = el;
-            const r = img.getBoundingClientRect();
-            const sx = Math.floor(((x - r.left) / r.width) * img.naturalWidth);
-            const sy = Math.floor(((y - r.top) / r.height) * img.naturalHeight);
-            // clamp
-            const cx = Math.max(0, Math.min(img.naturalWidth - 1, sx));
-            const cy = Math.max(0, Math.min(img.naturalHeight - 1, sy));
-            try {
-              ctx.clearRect(0, 0, 1, 1);
-              ctx.drawImage(img, cx, cy, 1, 1, 0, 0, 1, 1);
-              const d = ctx.getImageData(0, 0, 1, 1).data;
-              const lum = luminance(d[0], d[1], d[2]);
-              setXray(lum < 140);
-              return;
-            } catch (err) {
-              // drawing might fail if image is cross-origin; fall back to computed style
-            }
-          }
-
-          // Determine if we're over the promo area or directly over the promo book image (.ph-book)
-          // Hide when over the hero background (.intro-reveal) or the book image, but not when over the curtain grid.
-          const isOverBookImage = !!el.closest(".ph-book") || el.classList.contains("ph-book");
-          const isOverPromoArea = !!el.closest(".intro-reveal") || !!el.closest(".ph-stage") || !!el.closest(".ph-cover");
-          const isOverCurtain = !!el.closest(".ir-grid, .ir-grid *");
-          // if over the promo area or the book image (and not over the curtain), hide the brand
-          if ((isOverBookImage || isOverPromoArea) && !isOverCurtain) {
-            setHidden(true);
-            // still compute xray fallback as false
-            setXray(false);
-            return;
-          }
-
-          // fallback — check computed background-color (and color) of the element
-          const cs = getComputedStyle(el);
-          const bg = cs.backgroundColor;
-          if (bg && bg.startsWith("rgb")) {
-            const parts = bg.match(/\d+/g) || [];
-            if (parts.length >= 3) {
-              const r = parseInt(parts[0], 10);
-              const g = parseInt(parts[1], 10);
-              const b = parseInt(parts[2], 10);
-              const lum = luminance(r, g, b);
-              setXray(lum < 140);
-              return;
-            }
-          }
-
-          // If we get here, try the element's parent chain until body
-          let p = el.parentElement;
-          while (p) {
-            const pcs = getComputedStyle(p);
-            const pbg = pcs.backgroundColor;
-            if (pbg && pbg.startsWith("rgb")) {
-              const parts = pbg.match(/\d+/g) || [];
-              if (parts.length >= 3) {
-                const r = parseInt(parts[0], 10);
-                const g = parseInt(parts[1], 10);
-                const b = parseInt(parts[2], 10);
-                const lum = luminance(r, g, b);
-                setXray(lum < 140);
-                return;
-              }
-            }
-            p = p.parentElement;
-          }
-
-          setXray(false);
+          if (el.tagName === "IMG") {
+            const img = el;
+            const r = img.getBoundingClientRect();
+            const sx = Math.floor(((cx - r.left) / r.width) * img.naturalWidth);
+            const sy = Math.floor(((cy - r.top) / r.height) * img.naturalHeight);
+            // clamp
+            const pcx = Math.max(0, Math.min(img.naturalWidth - 1, sx));
+            const pcy = Math.max(0, Math.min(img.naturalHeight - 1, sy));
+            try {
+              ctx.clearRect(0, 0, 1, 1);
+              ctx.drawImage(img, pcx, pcy, 1, 1, 0, 0, 1, 1);
+              const d = ctx.getImageData(0, 0, 1, 1).data;
+              const lum = luminance(d[0], d[1], d[2]);
+              setXray(lum < 140);
+            } catch (err) {
+              // drawing might fail if image is cross-origin; fall back to computed style
+            }
+          } else {
+            // fallback — check computed background-color (and color) of the element
+            const cs = getComputedStyle(el);
+            const bg = cs.backgroundColor;
+            if (bg && bg.startsWith("rgb")) {
+              const parts = bg.match(/\d+/g) || [];
+              if (parts.length >= 3) {
+                const r = parseInt(parts[0], 10);
+                const g = parseInt(parts[1], 10);
+                const b = parseInt(parts[2], 10);
+                const lum = luminance(r, g, b);
+                setXray(lum < 140);
+              }
+            } else {
+              // If we get here, try the element's parent chain until body
+              let p = el.parentElement;
+              let found = false;
+              while (p) {
+                const pcs = getComputedStyle(p);
+                const pbg = pcs.backgroundColor;
+                if (pbg && pbg.startsWith("rgb")) {
+                  const parts = pbg.match(/\d+/g) || [];
+                  if (parts.length >= 3) {
+                    const r = parseInt(parts[0], 10);
+                    const g = parseInt(parts[1], 10);
+                    const b = parseInt(parts[2], 10);
+                    const lum = luminance(r, g, b);
+                    setXray(lum < 140);
+                    found = true;
+                    break;
+                  }
+                }
+                p = p.parentElement;
+              }
+              if (!found) setXray(false);
+            }
+          }
         } catch (e) {
           setXray(false);
-          setHidden(false);
+          setHidden(false);
         }
       });
     };

*** End Patch