"use client";

import Reveal from "./Reveal";
import { PRAISE_HERO, PRAISE_MORE } from "@/lib/content";

export default function Praise() {
  return (
    <section className="section praise" id="praise">
      <div className="wrap">
        <Reveal as="div" className="eyebrow" y={16}>
          Praise for Lifeline
        </Reveal>

        <Reveal className="praise-hero" selector=".r" stagger={0.14} y={26}>
          <p className="pq r">{`“${PRAISE_HERO.quote}”`}</p>
          <div className="pcite r">
            <span className="pn">{PRAISE_HERO.name}</span>
            <span className="pt">{PRAISE_HERO.title}</span>
          </div>
        </Reveal>

        <Reveal className="praise-more" selector=".pm" stagger={0.1} y={28}>
          {PRAISE_MORE.map((p, i) => (
            <div className="pm" key={i}>
              <p
                className="pmq"
                dangerouslySetInnerHTML={{ __html: `“${p.quote}”` }}
              />
              <span className="pmn">{p.name}</span>
              <span className="pmt" dangerouslySetInnerHTML={{ __html: p.title }} />
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
