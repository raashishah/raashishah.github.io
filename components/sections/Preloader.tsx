"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";

type PreloaderProps = {
  onComplete: () => void;
};

export function Preloader({ onComplete }: PreloaderProps) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      onComplete();
      setDone(true);
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setDone(true);
        onComplete();
      },
    });

    tl.from(".preloader__name span", {
      y: 20,
      opacity: 0,
      stagger: 0.04,
      duration: 0.5,
      ease: "power3.out",
    })
      .to(".preloader__bar", { scaleX: 1, duration: 1.2, ease: "power2.inOut" }, 0.3)
      .to(".preloader__name span", {
        y: -30,
        opacity: 0,
        stagger: 0.03,
        duration: 0.4,
        ease: "power3.in",
      })
      .to(".preloader", { opacity: 0, duration: 0.4, pointerEvents: "none" });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  if (done) return null;

  return (
    <div className="preloader" aria-hidden="true">
      <p className="preloader__name" aria-hidden="true">
        {"raashi".split("").map((char, i) => (
          <span key={i}>{char}</span>
        ))}
      </p>
      <div className="preloader__bar-wrap">
        <div className="preloader__bar" />
      </div>
    </div>
  );
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
