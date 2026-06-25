"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { projects } from "@/content/projects";
import { registerGsapPlugins } from "@/lib/animations";
import { TextReveal } from "@/components/effects/TextReveal";

export function WorkTimeline() {
  const ref = useRef<HTMLElement>(null);
  const workProjects = projects.filter((p) => p.type === "work");

  useEffect(() => {
    registerGsapPlugins();
    const section = ref.current;
    if (!section) return;

    const items = section.querySelectorAll(".work-timeline__item");
    items.forEach((item) => {
      gsap.fromTo(
        item,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    });
  }, []);

  return (
    <section ref={ref} className="work-timeline" data-section="work">
      <TextReveal as="h2" className="work-timeline__heading" mode="words">
        then, everywhere else
      </TextReveal>
      <ul className="work-timeline__list">
        {workProjects.map((role) => (
          <li key={role.slug} className="work-timeline__item" data-sparkle-burst>
            <div className="work-timeline__accent" style={{ background: `var(--zone-accent, oklch(55% 0.12 280))` }} />
            <div>
              <p className="work-timeline__company">{role.title}</p>
              <p className="work-timeline__meta">{role.tagline}</p>
              <p className="work-timeline__insight">{role.insight}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
