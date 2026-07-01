"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

// Black loading screen with the LIFELINE wordmark. It is server-rendered so it
// covers the very first paint — the promo hero never shows before the
// checkerboard curtain (built client-side) is in place. It fades once the
// curtain tiles have mounted (their dark tile background already covers the
// promo), with a safety timeout.
export default function Splash() {
  const pathname = usePathname();
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (pathname !== "/") return; // only the homepage has the curtain/promo
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      setGone(true);
    };

    let tries = 60; // ~3s of polling
    const poll = () => {
      if (done) return;
      const hasTiles = document.querySelector(".ir-grid .ir-tile");
      if (hasTiles || tries <= 0) {
        // let the curtain paint, then fade
        requestAnimationFrame(() => requestAnimationFrame(finish));
      } else {
        tries -= 1;
        setTimeout(poll, 50);
      }
    };
    poll();

    const fallback = setTimeout(finish, 3000);
    return () => clearTimeout(fallback);
  }, [pathname]);

  if (pathname !== "/") return null;

  return (
    <div className={`splash${gone ? " gone" : ""}`} aria-hidden="true">
      <span className="splash-name">LIFELINE</span>
    </div>
  );
}
