"use client";

import { useEffect, useRef, useState } from "react";

function luminance(r, g, b) {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function isPurpleBackground(r, g, b) {
  return r > 70 && b > 95 && g < 150 && b > r && b > g;
}

function parseCssColor(value) {
  if (!value || value === "none") return null;
  const gradients = Array.from(value.matchAll(/rgba?\(([^)]+)\)/gi));
  if (gradients.length) {
    const parts = gradients[0][1].split(",").map((part) => part.trim());
    if (parts.length >= 3) {
      const r = parseInt(parts[0], 10);
      const g = parseInt(parts[1], 10);
      const b = parseInt(parts[2], 10);
      const a = parts.length === 4 ? parseFloat(parts[3]) : 1;
      if (a > 0) return [r, g, b];
    }
  }

  const hexMatch = value.match(/#([0-9a-f]{3,8})/i);
  if (hexMatch) {
    let hex = hexMatch[1];
    if (hex.length === 3) {
      hex = hex.split("").map((digit) => digit + digit).join("");
    }
    if (hex.length >= 6) {
      return [
        parseInt(hex.slice(0, 2), 16),
        parseInt(hex.slice(2, 4), 16),
        parseInt(hex.slice(4, 6), 16),
      ];
    }
  }

  return null;
}

function getSampleColor(el, x, y, ctx) {
  if (!el) return null;

  const elements = Array.from(document.elementsFromPoint(x, y));
  const filtered = elements.filter((node) => node.nodeType === 1);

  for (const node of filtered) {
    const nodeStyle = getComputedStyle(node);
    if (nodeStyle.display === "none" || nodeStyle.visibility === "hidden" || parseFloat(nodeStyle.opacity) === 0) {
      continue;
    }

    if (node.tagName === "IMG") {
      const img = node;
      const r = img.getBoundingClientRect();
      const sx = Math.floor(((x - r.left) / r.width) * img.naturalWidth);
      const sy = Math.floor(((y - r.top) / r.height) * img.naturalHeight);
      const pcx = Math.max(0, Math.min(img.naturalWidth - 1, sx));
      const pcy = Math.max(0, Math.min(img.naturalHeight - 1, sy));
      try {
        ctx.clearRect(0, 0, 1, 1);
        ctx.drawImage(img, pcx, pcy, 1, 1, 0, 0, 1, 1);
        const d = ctx.getImageData(0, 0, 1, 1).data;
        return [d[0], d[1], d[2]];
      } catch (err) {
        // fallback to computed style
      }
    }

    let current = node;
    while (current) {
      const cs = getComputedStyle(current);
      const colorFromBg = parseCssColor(cs.backgroundColor);
      if (colorFromBg) return colorFromBg;

      const colorFromImage = parseCssColor(cs.backgroundImage);
      if (colorFromImage) return colorFromImage;

      current = current.parentElement;
    }
  }

  const bodyBg = getComputedStyle(document.body).backgroundColor;
  const bodyColor = parseCssColor(bodyBg);
  if (bodyColor) return bodyColor;

  const htmlBg = getComputedStyle(document.documentElement).backgroundColor;
  const htmlColor = parseCssColor(htmlBg);
  if (htmlColor) return htmlColor;

  return null;
}

function getSampleType(color) {
  if (!color) return "unknown";
  const [r, g, b] = color;
  if (isPurpleBackground(r, g, b)) return "purple";
  const lum = luminance(r, g, b);
  if (lum > 220) return "light";
  if (lum < 120) return "dark";
  return "mid";
}

export default function FixedBrand() {
  const [xray, setXray] = useState(false);
  const [brandColor, setBrandColor] = useState("#000");
  const [clipPercent, setClipPercent] = useState(0);
  const [partial, setPartial] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const rafRef = useRef(null);
  const canvasRef = useRef(null);
  const brandRef = useRef(null);

  useEffect(() => {
    canvasRef.current = document.createElement("canvas");
    canvasRef.current.width = 1;
    canvasRef.current.height = 1;
    const ctx = canvasRef.current.getContext("2d");

    const rectsIntersect = (a, b) => {
      return !(b.left > a.right || b.right < a.left || b.top > a.bottom || b.bottom < a.top);
    };

    const checkPoint = () => {
      const isScrolled = window.scrollY > 24;
      setScrolled(isScrolled);
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        try {
          const brandEl = brandRef.current;
          if (!brandEl) return;
          const brandRect = brandEl.getBoundingClientRect();

          const promoEls = Array.from(document.querySelectorAll(".ph-book, .intro-reveal, .ph-stage, .ph-cover"));
          let isOverPromo = false;
          for (const pe of promoEls) {
            const pr = pe.getBoundingClientRect();
            if (rectsIntersect(brandRect, pr)) { isOverPromo = true; break; }
          }

          const curtainEls = Array.from(document.querySelectorAll(".ir-grid"));
          let isOverCurtain = false;
          for (const ce of curtainEls) {
            const cr = ce.getBoundingClientRect();
            if (rectsIntersect(brandRect, cr)) { isOverCurtain = true; break; }
          }

          if (isOverPromo && !isOverCurtain) {
            setHidden(true);
          } else {
            setHidden(false);
          }

          const cy = Math.round(brandRect.top + brandRect.height / 2);
          const samples = 7;
          const sampleResults = [];

          const isCurtainNode = (node) => {
            if (!node) return false;
            return Boolean(node.closest('.intro-reveal, .ir-grid, .ph-stage'));
          };

          for (let index = 0; index < samples; index += 1) {
            const px = Math.round(brandRect.left + (brandRect.width * (index + 0.5)) / samples);
            const el = document.elementFromPoint(px, cy);
            const color = getSampleColor(el, px, cy, ctx);
            const type = getSampleType(color);
            sampleResults.push(isCurtainNode(el) ? 'curtain' : type);
          }

          const curtainCount = sampleResults.filter((type) => type === 'curtain').length;
          const lightCount = sampleResults.filter((type) => type === 'light').length;
          const darkCount = sampleResults.filter((type) => type === 'dark').length;
          const midCount = sampleResults.filter((type) => type === 'mid').length;
          const purpleCount = sampleResults.filter((type) => type === 'purple').length;
          const darkMajority = darkCount >= 5 || (darkCount >= 4 && midCount <= 1 && lightCount === 0) || (darkCount >= 3 && purpleCount === 0 && midCount <= 1);

          if (curtainCount > 0) {
            setPartial(false);
            setClipPercent(0);
            setXray(false);
            setBrandColor('#000');
          } else if (darkMajority) {
            setPartial(false);
            setClipPercent(0);
            setXray(true);
            setBrandColor('var(--nav-violet)');
          } else {
            setPartial(false);
            setClipPercent(0);
            setXray(false);
            setBrandColor('#000');
          }
        } catch (e) {
          setXray(false);
          setPartial(false);
          setClipPercent(0);
          setHidden(false);
        }
      });
    };

    window.addEventListener("scroll", checkPoint, { passive: true });
    window.addEventListener("resize", checkPoint);
    window.addEventListener("load", checkPoint);

    checkPoint();

    return () => {
      window.removeEventListener("scroll", checkPoint);
      window.removeEventListener("resize", checkPoint);
      window.removeEventListener("load", checkPoint);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const style = {
    '--brand-color': brandColor,
    ...(partial ? { '--brand-clip': `${clipPercent}%` } : {}),
  };

  return (
    <div
      ref={brandRef}
      style={style}
      className={`fixed-brand${xray ? " xray" : ""}${partial ? " partial" : ""}${scrolled ? " scrolled" : " not-scrolled"}${hidden ? " hidden" : ""}`}
      aria-hidden="true"
    >
      <span className="name">LIFELINE</span>
    </div>
  );
}
