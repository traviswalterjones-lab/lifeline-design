"use client";

import { useEffect, useState } from "react";
import { HARPER_URL } from "@/lib/content";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className={`site-nav nav${scrolled ? " scrolled" : ""}`}>
        <div className="wrap nav-inner">
          <div className="nav-side left">
            <button
              className="nav-burger"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen(true)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
              <span>Menu</span>
            </button>
          </div>

          <a className="brand" href="#top">
            <span className="name">LIFELINE</span>
          </a>

          <div className="nav-side right">
            <a
              className="btn btn-violet btn-sm"
              href={HARPER_URL}
              target="_blank"
              rel="noopener"
            >
              Pre-order
            </a>
          </div>
        </div>
      </header>

      <nav className={`mobile-menu${open ? " open" : ""}`} aria-hidden={!open}>
        <button className="mclose" aria-label="Close menu" onClick={() => setOpen(false)}>
          ×
        </button>
        <a href="#top" onClick={() => setOpen(false)}>Home</a>
        <a href="#reporting" onClick={() => setOpen(false)}>The reporting</a>
        <a href="#author" onClick={() => setOpen(false)}>The author</a>
        <a href="#praise" onClick={() => setOpen(false)}>Praise</a>
        <a
          href="#buy"
          onClick={() => setOpen(false)}
          style={{ color: "var(--lent-4)" }}
        >
          Pre-order →
        </a>
      </nav>
    </>
  );
}
