"use client";

import Reveal from "./Reveal";

export default function Story() {
  return (
    <section className="section">
      <Reveal className="wrap" selector=".r" stagger={0.12} y={28}>
        <div className="story">
          <div className="eyebrow r">HarperCollins · Nonfiction</div>
          <h1 className="r">
            An inspiring account of how the US government built a start-up called
            PEPFAR to fight AIDS—and saved more than 26 million lives.
          </h1>
          <p className="r">
            In the early 2000s, rich governments did little to fight a raging AIDS
            pandemic in Africa. More than two million Africans died of AIDS
            annually. Several militaries reported HIV infection rates above twenty-five
            percent. Nearly four in ten pregnant women in some countries were
            infected. But in 2003, to the surprise of the world, President George W.
            Bush created PEPFAR, the President&rsquo;s Emergency Plan for AIDS
            Relief—which became his signature legacy for doing good.
          </p>
          <p className="r">
            Nearly a quarter-century later, the initiative is seen as impactful as
            the Marshall Plan&rsquo;s efforts to rebuild Europe after World War II.{" "}
            <em>Lifeline</em> tells the riveting story of how Americans and Africans
            raced to set up treatment and prevention programs to save as many lives
            as possible.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
