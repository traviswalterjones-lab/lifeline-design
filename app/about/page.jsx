import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata = {
  title: "John Donnelly — About",
  description:
    "John Donnelly spent thirty years as a reporter covering global health for The Boston Globe and beyond. Author of Lifeline (HarperCollins, 2026).",
};

export default function About() {
  return (
    <div className="page">
      <Nav variant="light" />

      <main>
        <section className="section about-head">
          <div className="wrap">
            <div className="eyebrow">The author</div>
            <p className="about-intro">
              <strong>John Donnelly</strong> spent thirty years as a reporter, based in Jerusalem; Cairo; South
              Africa; Haiti; Washington, D.C.; New York; Miami; and Vermont. At{" "}
              <em>The Boston Globe</em>, he closely covered issues around global
              health, from both Washington and from countries around the world,
              reporting on the vast gulf between people&rsquo;s needs for basic health
              care and governments&rsquo; inabilities to provide that care.
            </p>
          </div>
        </section>

        <figure className="wrap about-figure">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="about-photo"
            src="/assets/about%20page/about-field.jpg"
            width="1781"
            height="838"
            alt="John Donnelly on assignment in Haiti, walking through a devastated settlement."
          />
          <figcaption className="about-cap">
            John Donnelly on assignment in Haiti. Photo by Peter Bosch.
          </figcaption>
        </figure>

        <section className="section about-details">
          <div className="wrap about-grid">
            <aside className="about-glance">
              <div className="ag-title">At a glance</div>
              <div className="ag-item">
                <div className="ag-label">Reported from</div>
                <div className="ag-value">
                  Jerusalem · Cairo · South Africa · Haiti · Washington, D.C. · New
                  York · Miami · Vermont
                </div>
              </div>
              <div className="ag-item">
                <div className="ag-label">New book</div>
                <div className="ag-value">
                  <em>Lifeline</em> (HarperCollins), Oct 2026
                </div>
              </div>
            </aside>

            <div className="about-body">
              <p>
                He also reported for <em>The Miami Herald</em> and the Associated Press, winning several awards for his work. Following his journalism career, he spent one decade
                at the World Bank, working as an advisor for both the World Bank
                President and the CEO of the International Finance Corporation.
              </p>
              <p>
                Donnelly is the author of two earlier nonfiction books—
                <em>A Twist of Faith</em> and <em>Beyond Murder</em> (co-authored with
                John Philpin)—and a former fellow of Duke University and the Kaiser
                Family Foundation. He received a Bellagio residency from the
                Rockefeller Foundation in 2024, which helped in the writing of{" "}
                <em>Lifeline</em>. He lives outside Washington, D.C.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
