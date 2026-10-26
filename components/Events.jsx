"use client";

import { useEffect, useState } from "react";
import Reveal from "./Reveal";
import { EVENTS, upcomingEvents, isPastEvent } from "@/lib/content";

export default function Events() {
  // SSR-safe default (first three); refined to today's upcoming after mount so
  // past dates drop off automatically, without needing a rebuild. Keyed by
  // index so the reveal animation keeps working when the rows swap.
  const [rows, setRows] = useState(() => EVENTS.slice(0, 3));
  useEffect(() => {
    setRows(upcomingEvents(EVENTS, 3));
  }, []);

  return (
    <section className="section events-teaser" id="events">
      <div className="wrap">
        <Reveal as="div" className="sec-head" y={16}>
          <h2>On tour this fall</h2>
        </Reveal>

        <Reveal className="ev-rows" selector=".evrow" stagger={0.1} y={22}>
          {rows.map((e, i) => {
            const showRsvp = e.rsvp && !isPastEvent(e);
            return (
              <div className="evrow" key={i}>
                <div className="date">{e.dateLabel}</div>
                <div>
                  <div className="city">{e.city}</div>
                  <div className="venue">{e.venueTeaser}</div>
                </div>
                <div className="venue evtime">{e.timeTeaser}</div>
                {showRsvp ? (
                  <a
                    className="btn btn-ghost btn-sm rsvp"
                    href={e.rsvp}
                    target="_blank"
                    rel="noopener"
                  >
                    RSVP
                  </a>
                ) : e.link ? (
                  <a
                    className="btn btn-ghost btn-sm rsvp"
                    href={e.link}
                    target="_blank"
                    rel="noopener"
                  >
                    Details
                  </a>
                ) : (
                  <a className="btn btn-ghost btn-sm rsvp" href="/events">
                    Details
                  </a>
                )}
              </div>
            );
          })}
        </Reveal>

        <div className="ev-foot">
          <a className="btn btn-ghost btn-md" href="/events">
            All events
          </a>
        </div>
      </div>
    </section>
  );
}
