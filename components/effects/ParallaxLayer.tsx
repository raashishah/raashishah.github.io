"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { registerGsapPlugins } from "@/lib/animations";

type ParallaxLayerProps = {
  children: ReactNode;
  speed?: number;
  className?: string;
};

export function ParallaxLayer({ children, speed = 0.85, className = "" }: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsapPlugins();
    const el = ref.current;
    if (!el) return;

    const trigger = gsap.to(el, {
      y: () => (1 - speed) * 80,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      trigger.scrollTrigger?.kill();
      trigger.kill();
    };
  }, [speed]);

  return (
    <div ref={ref} className={className} data-speed={speed}>
      {children}
    </div>
  );
}
