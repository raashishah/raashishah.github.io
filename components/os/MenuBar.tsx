"use client";

import { useEffect, useState } from "react";
import { useOS } from "./OSProvider";
import { ConnectMenu } from "./ConnectMenu";

function formatClock(date: Date) {
  return date.toLocaleString("en-US", {
    weekday: "short",
    hour: "numeric",
    minute: "2-digit",
    hour12: false,
  });
}

export function MenuBar() {
  const { nowPlaying, connectOpen, setConnectOpen } = useOS();
  const [clock, setClock] = useState("");

  useEffect(() => {
    const tick = () => setClock(formatClock(new Date()));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  const trackLabel = nowPlaying.isPlaying
    ? `♫ ${nowPlaying.title}${nowPlaying.artist ? ` — ${nowPlaying.artist}` : ""}`
    : "♫ Not playing";

  return (
    <header className="menu-bar glass">
      <div className="menu-bar__left">
        <span className="menu-bar__brand">raashi os</span>
      </div>
      <div className="menu-bar__center">
        <span className="menu-bar__clock">{clock}</span>
        <span className="menu-bar__now-playing" title={trackLabel}>
          {trackLabel}
        </span>
      </div>
      <div className="menu-bar__right">
        <span className="menu-bar__hint menu-bar__hint--pulse" title="Something is hidden here">
          ?
        </span>
        <button
          type="button"
          className="connect-trigger"
          aria-expanded={connectOpen}
          aria-haspopup="menu"
          onClick={() => setConnectOpen(!connectOpen)}
        >
          connect ▾
        </button>
      </div>
      {connectOpen ? <ConnectMenu /> : null}
    </header>
  );
}
