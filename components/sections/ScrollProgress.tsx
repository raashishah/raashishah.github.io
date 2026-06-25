"use client";

import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { registerGsapPlugins } from "@/lib/animations";
import { projects } from "@/content/projects";

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsapPlugins();

    const triggers: ScrollTrigger[] = [];

    const bar = barRef.current;
    if (bar) {
      triggers.push(
        ScrollTrigger.create({
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
          onUpdate: (self) => {
            bar.style.transform = `scaleX(${self.progress})`;
          },
        }),
      );
    }

    const dots = dotsRef.current;
    if (dots) {
      const dotEls = dots.querySelectorAll("[data-dot]");
      dotEls.forEach((dot, i) => {
        const slug = projects[i]?.slug;
        if (!slug) return;
        triggers.push(
          ScrollTrigger.create({
            trigger: `[data-section="${slug}"]`,
            start: "top center",
            end: "bottom center",
            onEnter: () => dot.classList.add("scroll-progress__dot--active"),
            onEnterBack: () => dot.classList.add("scroll-progress__dot--active"),
            onLeave: () => dot.classList.remove("scroll-progress__dot--active"),
            onLeaveBack: () => dot.classList.remove("scroll-progress__dot--active"),
          }),
        );
      });
    }

    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <>
      <div className="scroll-progress" aria-hidden="true">
        <div ref={barRef} className="scroll-progress__bar" />
      </div>
      <nav className="scroll-progress__dots" ref={dotsRef} aria-label="Section navigation">
        {projects.map((p) => (
          <button
            key={p.slug}
            type="button"
            data-dot={p.slug}
            className="scroll-progress__dot"
            aria-label={`Go to ${p.title}`}
            onClick={() => {
              document.querySelector(`[data-section="${p.slug}"]`)?.scrollIntoView({ behavior: "smooth" });
            }}
          />
        ))}
      </nav>
    </>
  );
}
