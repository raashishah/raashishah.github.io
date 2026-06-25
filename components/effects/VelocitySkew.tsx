"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Lenis from "lenis";

type VelocitySkewProps = {
  children: ReactNode;
  className?: string;
};

export function VelocitySkew({ children, className = "" }: VelocitySkewProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let lastScroll = 0;
    let velocity = 0;

    const onScroll = () => {
      const current = window.scrollY;
      velocity = current - lastScroll;
      lastScroll = current;
      const skew = Math.max(-3, Math.min(3, velocity * 0.05));
      el.style.transform = `skewY(${skew}deg)`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    const lenis = new Lenis();
    lenis.on("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      lenis.destroy();
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
