"use client";

import Reveal from "./Reveal";
import { HARPER_URL, RETAILERS, ON_SALE } from "@/lib/content";

export default function FinalCTA() {
  return (
    <section className="section finalcta" id="buy">
      <Reveal className="wrap" selector=".r" stagger={0.12} y={28}>
        <h2 className="r">{ON_SALE}</h2>
        <div className="row r">
          <a
            className="btn finalcta-btn btn-lg"
            href={HARPER_URL}
            target="_blank"
            rel="noopener"
          >
            Pre-order now
          </a>
        </div>
        <div className="retail-row r">
          {RETAILERS.map((r) => (
            <a key={r.name} href={r.url} target="_blank" rel="noopener">
              {r.name}
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
