"use client";

import { useEffect, useState } from "react";
import { HARPER_URL } from "@/lib/content";

export default function Nav({ variant = "purple" }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const light = variant === "light";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    document.body.classList.toggle("menu-open", open);
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("menu-open");
    };
  }, [open]);

  return (
    <>
      <header
        className={`site-nav nav${light ? " nav--light" : ""}${scrolled ? " scrolled" : ""}`}
      >
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

          <a className="brand" href={light ? "/" : "#top"} aria-label="LIFELINE" />

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
        <a href="/" onClick={() => setOpen(false)}>Home</a>
        <a href="/about" onClick={() => setOpen(false)}>About</a>
        <a href="/contact" onClick={() => setOpen(false)}>Contact</a>
        <a
          href={HARPER_URL}
          target="_blank"
          rel="noopener"
          onClick={() => setOpen(false)}
          style={{ color: "var(--nav-violet)" }}
        >
          Pre-order →
        </a>
      </nav>
    </>
  );
}
