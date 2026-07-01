// Full-bleed newspaper front page — John Donnelly's Boston Sunday Globe spread,
// shown as its own printed page (no overlay), cropped to the masthead + headline.
export default function LivesLost() {
  return (
    <section className="lives-lost">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="ll-bg"
        src="/assets/none%20of%20them/IMG_4310.jpeg"
        width="1512"
        height="2016"
        alt="The Boston Sunday Globe front page, January 26, 2003 — 'None of them had to die' — from John Donnelly's reporting on the AIDS pandemic."
      />
    </section>
  );
}
