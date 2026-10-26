"use client";

import { Fragment, useEffect, useState } from "react";
import { isPastEvent } from "@/lib/content";

// Group the flat events list into month sections, preserving order.
function byMonth(events) {
  const months = [];
  for (const e of events) {
    let group = months.find((m) => m.month === e.month);
    if (!group) {
      group = { month: e.month, items: [] };
      months.push(group);
    }
    group.items.push(e);
  }
  return months;
}

export default function EventsList({ events, serverNow }) {
  // Start from the server's timestamp so SSR and the first client render match
  // (no hydration flicker), then switch to the real current time after mount so
  // past/upcoming stays live without a redeploy.
  const [now, setNow] = useState(serverNow);
  useEffect(() => {
    setNow(Date.now());
  }, []);
  const ref = new Date(now);

  const months = byMonth(events);

  return (
    <>
      {months.map((m) => (
        <Fragment key={m.month}>
          <div className="month">{m.month}</div>
          {m.items.map((e) => (
            <div className="ev" key={e.dateLabel + e.city}>
              <div className="d">
                <div className="day">{e.day}</div>
                <div className="mo">
                  {e.dow} · {e.mon}
                </div>
              </div>
              <div>
                <div className="city">{e.city}</div>
                <div className="venue">{e.venue}</div>
              </div>
              <div className="fmt">
                {e.format}
                {e.time ? <span className="time">{e.time}</span> : null}
              </div>
              {e.rsvp ? (
                <a
                  className="btn btn-ghost btn-sm pill"
                  href={e.rsvp}
                  target="_blank"
                  rel="noopener"
                >
                  {isPastEvent(e, ref) ? "Details" : "RSVP"}
                </a>
              ) : e.link ? (
                <a
                  className="btn btn-ghost btn-sm pill"
                  href={e.link}
                  target="_blank"
                  rel="noopener"
                >
                  Details
                </a>
              ) : (
                <span className="btn btn-ghost btn-sm pill ev-soon">
                  Details soon
                </span>
              )}
            </div>
          ))}
        </Fragment>
      ))}
    </>
  );
}
