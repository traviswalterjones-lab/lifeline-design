"use client";

import { useEffect, useRef } from "react";

// Documentary field footage — 4 x 2 grid, ordered by file number
// (top row 1-4, bottom row 5-8). `crop` tightens/repositions a tile.
const VIDEOS = [
  { f: "1-Rice", label: "Condoleezza Rice" },
  { f: "2-march", label: "An AIDS awareness march" },
  { f: "3-Dybul", label: "Mark Dybul", crop: { scale: 1.3 } },
  { f: "4-SA", label: "South Africa" },
  { f: "5-Mugyeni", label: "Dr. Peter Mugyenyi", crop: { scale: 1.42, origin: "0% 0%" } },
  { f: "6-Bush", label: "President George W. Bush", crop: { scale: 1.32 } },
  { f: "7-Kanki", label: "Dr. Phyllis Kanki" },
  { f: "8-Fauci", label: "Dr. Anthony Fauci" },
];

const src = (f) => `/assets/video%20wall/${encodeURIComponent(f)}.mp4`;

export default function VideoWall() {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const vids = Array.from(root.querySelectorAll("video"));
    vids.forEach((v) => {
      v.muted = true;
    });
    // Play only while the band is on screen; pause otherwise (perf + battery).
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const v = e.target;
          if (e.isIntersecting) {
            const p = v.play();
            if (p && p.catch) p.catch(() => {});
          } else {
            try {
              v.pause();
            } catch (_) {}
          }
        });
      },
      { threshold: 0.05 }
    );
    vids.forEach((v) => io.observe(v));
    return () => io.disconnect();
  }, []);

  return (
    <section className="videowall" ref={ref} aria-label="Documentary footage from the PEPFAR era">
      <div className="vw-row">
        {VIDEOS.map((v, i) => (
          <div className="vw-tile" key={i}>
            <video
              src={src(v.f)}
              muted
              loop
              playsInline
              autoPlay
              preload="metadata"
              tabIndex={-1}
              aria-label={`Archival footage: ${v.label}`}
              style={
                v.crop
                  ? { transform: `scale(${v.crop.scale})`, transformOrigin: v.crop.origin || "center" }
                  : undefined
              }
            />
          </div>
        ))}
      </div>
    </section>
  );
}
