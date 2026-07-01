# John Donnelly — *Lifeline*

A professional, editorial author site for **John Donnelly's *Lifeline: The Story of
PEPFAR, the Greatest Humanitarian Initiative of Our Time*** (HarperCollins, October 2026).

Built with **Next.js (App Router)** and animated with **GSAP**. Ported from the
Claude Design project, keeping the design system's monochrome editorial frame,
deep royal-violet brand block, lenticular accent, and faint Benin-plaque imprint.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
# or
npm run build && npm run start
```

> This machine had no Node.js; a local copy was installed at `~/.local/node`
> and added to `PATH` via `~/.zshenv`. Open a new terminal (or
> `export PATH="$HOME/.local/node/bin:$PATH"`) so `node`/`npm` resolve.

## Structure

```
app/
  layout.jsx      Fonts (Inter + JetBrains Mono, variable axis), metadata, imprint
  page.jsx        Section composition
  globals.css     Design tokens + site styles + section styles
components/
  Nav.jsx         Centered-brand nav, mobile menu, scroll elevation
  Hero.jsx        Checkerboard reveal over a pinned editorial title page
  Story.jsx       The PEPFAR statement
  Stats.jsx       Count-up figures (26M+ lives, 2003, 30 yrs, 4)
  Clippings.jsx   Gallery of Donnelly's Boston Globe dispatches
  AuthorIntro.jsx Author bio + parallax archival clipping
  Praise.jsx      Endorsements (hero quote + grid)
  FinalCTA.jsx    Pre-order block
  Footer.jsx      Footer
lib/content.js    Retailer links, praise, clipping captions, stats
public/assets/    imprint.svg + tiles/t1–t8.jpg (the dispatches)
```

## GSAP animations (tasteful, reduced-motion aware)

- **Hero** — staggered title-page entrance; the lenticular rule wipes in.
- **Checkerboard reveal** — a grid of dispatches scrolls up over the pinned hero.
- **Scroll reveals** — sections fade + rise as they enter (`components/Reveal.jsx`).
- **Stat count-up** — figures tick to value on scroll.
- **Parallax** — gallery images and the author clipping drift gently on scroll.
- **Nav** — subtle elevation/colour shift once scrolled.

All motion is gated behind `prefers-reduced-motion: reduce`.

## A note on assets

The Claude Design project's large photographs (3D cover render, author photos,
full newspaper scans) exceed the design API's 256 KiB per-file read cap and could
not be imported. The eight **authentic John Donnelly Boston Globe dispatches**
(`tiles/t1–t8.jpg`) imported cleanly and now anchor the design; the book cover is
rendered as a typographic CSS treatment in the footer. Drop real artwork into
`public/assets/` and wire it up in the components to swap these in.
