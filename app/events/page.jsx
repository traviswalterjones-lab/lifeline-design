import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import EventsList from "@/components/EventsList";
import { EVENTS } from "@/lib/content";

export const metadata = {
  title: "John Donnelly — Events",
  description:
    "Talks, conversations, and signings for Lifeline — John Donnelly on tour, Fall 2026.",
};

export default function Events() {
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
          <EventsList events={EVENTS} serverNow={Date.now()} />
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
