"use client";

import Reveal from "./Reveal";
import { MEDIA } from "@/lib/content";

export default function Media() {
  return (
    <section className="section media" id="media">
      <div className="wrap">
        <Reveal as="div" className="sec-head" y={16}>
          <h2>Media</h2>
        </Reveal>

        <Reveal className="media-rows" selector=".media-row" stagger={0.1} y={22}>
          {MEDIA.map((m) => (
            <div className="media-row" key={m.url}>
              <div className="media-kind">{m.kind}</div>
              <div>
                <div className="media-title">{m.title}</div>
                <div className="media-desc">{m.desc}</div>
              </div>
              <a
                className="btn btn-ghost btn-md media-cta"
                href={m.url}
                target="_blank"
                rel="noopener"
              >
                {m.cta} <span aria-hidden="true">→</span>
              </a>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
