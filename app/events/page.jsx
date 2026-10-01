import { Fragment } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { EVENTS } from "@/lib/content";

export const metadata = {
  title: "John Donnelly — Events",
  description:
    "Talks, conversations, and signings for Lifeline — John Donnelly on tour, Fall 2026.",
};

// Group the flat EVENTS list into month sections, preserving order.
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

export default function Events() {
  const months = byMonth(EVENTS);

  return (
    <div className="page">
      <Nav variant="light" />

      <main>
        <section className="wrap ev-hero">
          <div className="eyebrow">On tour · Fall 2026</div>
          <h1 className="ev-h1">
            Talks, conversations, and signings for <em>Lifeline</em>.
          </h1>
        </section>

        <section className="wrap section ev-list">
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
                      RSVP
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
        </section>

        <section className="wrap ev-cta">
          <h2>Invite John to speak</h2>
          <div className="row">
            <a className="btn btn-violet btn-lg" href="/contact">
              Speaking inquiries
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
