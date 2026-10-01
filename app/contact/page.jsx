import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "John Donnelly — Contact",
  description:
    "Contact for interviews, events, and rights regarding John Donnelly and Lifeline (HarperCollins, 2026).",
};

const KATE = "kate.d'esmond@harpercollins.com";
const BONNIE = "bonnie@hillnadell.com";
const LAURA = "hambleton.laura@gmail.com";

const CONTACTS = [
  { label: "Press & media", emails: [KATE] },
  { label: "Speaking & events", emails: [BONNIE, LAURA] },
  { label: "Foreign & subsidiary rights", emails: [BONNIE] },
];

export default function Contact() {
  return (
    <div className="page">
      <Nav variant="light" />

      <main>
        <section className="section contact-intro">
          <div className="wrap">
            <div className="eyebrow">Get in touch</div>
            <p className="contact-lead">
              For interviews, events, and rights, please see contacts below.
            </p>

            <div className="contact-list">
              {CONTACTS.map((c) => (
                <div className="contact-item" key={c.label}>
                  <div className="ci-label">{c.label}</div>
                  {c.emails.map((email) => (
                    <a className="ci-email" key={email} href={`mailto:${email}`}>
                      {email}
                    </a>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section contact-form-section">
          <div className="wrap">
            <ContactForm />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
