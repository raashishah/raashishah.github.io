"use client";

import { useEffect, useRef, useState } from "react";
import {
  coral,
  footerDiscoveryHint,
  footerDiscoveryHintAfter,
  footerDiscoveryHintBefore,
  footerDiscoveryHoverText,
} from "@/content/site";
import {
  HOVER_SCRAMBLE_CYCLES,
  HOVER_SCRAMBLE_TICK_MS,
  hoverScrambleSettled,
  hoverScrambleText,
} from "@/lib/hover-scramble";

const HOVER_GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ%#$<>/";

function glyphAt(): string {
  const glyph = HOVER_GLYPHS[Math.floor(Math.random() * HOVER_GLYPHS.length)];
  return glyph ?? "#";
}

function CoralMark() {
  return (
    <img
      src={coral.src}
      alt=""
      aria-hidden="true"
      className="home__footer-mark"
    />
  );
}

export function FooterDiscoveryHint() {
  const [active, setActive] = useState(false);
  const [shown, setShown] = useState(footerDiscoveryHoverText);
  const timer = useRef<number | null>(null);

  function clearTimer() {
    if (timer.current !== null) {
      window.clearInterval(timer.current);
      timer.current = null;
    }
  }

  function stop() {
    clearTimer();
    setActive(false);
  }

  function start() {
    clearTimer();
    setActive(true);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(footerDiscoveryHoverText);
      return;
    }

    let step = 0;
    timer.current = window.setInterval(() => {
      step += 1;
      if (hoverScrambleSettled(footerDiscoveryHoverText, step)) {
        clearTimer();
        setShown(footerDiscoveryHoverText);
        return;
      }
      setShown(
        hoverScrambleText(
          footerDiscoveryHoverText,
          step,
          glyphAt,
          HOVER_SCRAMBLE_CYCLES,
        ),
      );
    }, HOVER_SCRAMBLE_TICK_MS);
  }

  useEffect(() => clearTimer, []);

  const announced = active ? footerDiscoveryHoverText : footerDiscoveryHint;

  return (
    <>
      <button
        type="button"
        className="home__footer-meta-hint"
        aria-label={announced}
        onMouseEnter={start}
        onMouseLeave={stop}
        onFocus={start}
        onBlur={stop}
      >
        <span aria-hidden="true">
          {active ? (
            <>
              {shown} <CoralMark />
            </>
          ) : (
            <>
              {footerDiscoveryHintBefore} <CoralMark />{" "}
              {footerDiscoveryHintAfter}
            </>
          )}
        </span>
      </button>
      <span className="home__footer-label" aria-live="polite" aria-atomic="true">
        {announced}
      </span>
    </>
  );
}
