"use client";

import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { isE2EMode, shouldSkipMotionChrome } from "@/lib/e2e";
import { registerGsapPlugins } from "@/lib/animations";

type SmoothScrollProps = {
  children: React.ReactNode;
};

declare global {
  interface Window {
    __RAASH_LENIS__?: Lenis | null;
  }
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsapPlugins();

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (reduced || coarsePointer || isE2EMode() || shouldSkipMotionChrome()) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    window.__RAASH_LENIS__ = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    let frameId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    };
    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      if (window.__RAASH_LENIS__ === lenis) {
        window.__RAASH_LENIS__ = null;
      }
      lenis.destroy();
    };
  }, []);

  return (
    <div ref={wrapperRef} id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}
