"use client";

import { useEffect, useRef } from "react";

// Documentary field footage from the PEPFAR story.
const VIDEOS = [
  { f: "1-Rice", label: "Condoleezza Rice" },
  { f: "6-Bush", label: "President George W. Bush" },
  { f: "8-Fauci", label: "Dr. Anthony Fauci" },
  { f: "3-Dybul", label: "Mark Dybul" },
  { f: "5-Mugyeni", label: "Dr. Peter Mugyenyi" },
  { f: "7-Kanki", label: "Dr. Phyllis Kanki" },
  { f: "2-march", label: "An AIDS awareness march" },
  { f: "4-SA", label: "South Africa" },
  { f: "2-SA", label: "South Africa" },
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
            />
          </div>
        ))}
      </div>
    </section>
  );
}
