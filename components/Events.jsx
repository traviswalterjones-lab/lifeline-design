"use client";

import Reveal from "./Reveal";
import { EVENTS } from "@/lib/content";

// Homepage teaser — the first three tour dates, with a link to the full page.
const TEASER = EVENTS.slice(0, 3);

export default function Events() {
  return (
    <section className="section events-teaser" id="events">
      <div className="wrap">
        <Reveal as="div" className="sec-head" y={16}>
          <h2>On tour this fall</h2>
          <a className="btn btn-ghost btn-md" href="/events">
            All events
          </a>
        </Reveal>

        <Reveal className="ev-rows" selector=".evrow" stagger={0.1} y={22}>
          {TEASER.map((e) => (
            <div className="evrow" key={e.dateLabel + e.city}>
              <div className="date">{e.dateLabel}</div>
              <div>
                <div className="city">{e.city}</div>
                <div className="venue">{e.venueTeaser}</div>
              </div>
              <div className="venue evtime">{e.timeTeaser}</div>
              {e.rsvp ? (
                <a
                  className="btn btn-ghost btn-sm rsvp"
                  href={e.rsvp}
                  target="_blank"
                  rel="noopener"
                >
                  RSVP
                </a>
              ) : (
                <a className="btn btn-ghost btn-sm rsvp" href="/events">
                  Details
                </a>
              )}
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
