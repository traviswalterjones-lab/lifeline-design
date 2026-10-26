"use client";

import Reveal from "./Reveal";
import { REVIEWS } from "@/lib/content";

// Featured review — the most recent published review as a pull-quote with a
// link to the full piece. Reads well on its own; more reviews can be added to
// REVIEWS later and surfaced below the feature.
const FEATURED = REVIEWS[0];

export default function Reviews() {
  if (!FEATURED) return null;

  return (
    <section className="section reviews" id="reviews">
      <div className="wrap">
        <Reveal as="div" className="eyebrow" y={16}>
          Reviews
        </Reveal>

        <Reveal className="review-feature" selector=".r" stagger={0.12} y={24}>
          <p className="review-quote r">{`“${FEATURED.quote}”`}</p>
          <div className="review-cite r">
            <span className="rc-name">{FEATURED.name}</span>
            <span className="rc-pub">{FEATURED.pub}</span>
          </div>
          <a
            className="review-link r"
            href={FEATURED.url}
            target="_blank"
            rel="noopener"
          >
            Read the full review <span aria-hidden="true">→</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
