# Project Specs — Lifeline (John Donnelly author site)

## What the app does & who uses it
A marketing/author website for the book **_Lifeline: The Story of PEPFAR_** by
John Donnelly (HarperCollins, Oct 2026). Visitors: readers, press, event
bookers, and booksellers. Goals: pre-orders, author credibility, event RSVPs,
and contact for press/speaking/rights. Content-only — no login, no database.

## Tech stack
- **Framework:** Next.js (App Router), JavaScript/JSX.
- **Styling:** Plain CSS with design tokens in `app/globals.css` (no Tailwind in this repo).
- **Animation:** GSAP + ScrollTrigger via the shared `components/Reveal.jsx`.
- **Hosting:** Vercel. Analytics: `@vercel/analytics`.
- **Backend/DB/Auth:** none. Contact form is client-side `mailto:` only.

## Pages & flows (all public)
- `/` — home: Hero, Story, LivesLost, VideoWall, AuthorIntro, Praise, **Events (teaser)**, FinalCTA.
- `/about` — author bio.
- `/events` — full book-tour listing, grouped by month, with RSVP / "Details soon".
- `/contact` — contact details + `mailto:` form.
- Shared: `Nav` (with `variant="light"` for subpages) + `Footer`.

## Data
- Centralized in `lib/content.js` (retailers, praise quotes, `EVENTS`, etc.).
- `EVENTS`: one flat array of tour dates; the homepage shows the first three,
  `/events` groups them by month. `rsvp` is an external ticket URL or `null`
  (renders a non-clickable "Details soon").
- No persistence; nothing is written anywhere.

## Third-party services
HarperCollins + retailer links (HarperCollins, Amazon, Apple Books, B&N,
Books-A-Million, Bookshop.org), Politics & Prose and Eventbrite (RSVPs),
Vercel Analytics.

## "Done" for the Events feature
- Events teaser on the home page between Praise and FinalCTA, matching the
  supplied design.
- `/events` page matching the supplied design, linked from the nav menu.
- Responsive on mobile / tablet / desktop; no other section restyled.
- `npm run build` passes and pages render without console errors.
