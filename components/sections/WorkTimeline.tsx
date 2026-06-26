"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/content/projects";
import { registerGsapPlugins } from "@/lib/animations";
import { palette } from "@/lib/palette";
import { TextReveal } from "@/components/effects/TextReveal";

export function WorkTimeline() {
  const ref = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const workProjects = projects.filter((p) => p.type === "work");

  useEffect(() => {
    registerGsapPlugins();
    const section = ref.current;
    const line = lineRef.current;
    if (!section) return;

    if (line) {
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            end: "bottom 30%",
            scrub: 0.8,
          },
        },
      );
    }

    const items = section.querySelectorAll(".work-timeline__item");
    items.forEach((item) => {
      gsap.fromTo(
        item,
        { opacity: 0, x: -48 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: item,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        },
      );

      const counter = item.querySelector(".work-timeline__years");
      if (counter) {
        const target = parseInt(counter.getAttribute("data-years") ?? "0", 10);
        const proxy = { val: 0 };
        gsap.to(proxy, {
          val: target,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          onUpdate: () => {
            counter.textContent = `${Math.round(proxy.val)}yr`;
          },
        });
      }
    });

    ScrollTrigger.refresh();
  }, []);

  return (
    <section ref={ref} className="work-timeline" data-section="work">
      <TextReveal as="h2" className="work-timeline__heading" mode="chars">
        then, everywhere else
      </TextReveal>
      <div className="work-timeline__track">
        <div ref={lineRef} className="work-timeline__line" />
        <ul className="work-timeline__list">
          {workProjects.map((role, i) => (
            <li key={role.slug} className="work-timeline__item" data-sparkle-burst>
              <div className="work-timeline__accent" style={{ background: palette.rose }} />
              <div>
                <p className="work-timeline__company">{role.title}</p>
                <p className="work-timeline__meta">{role.tagline}</p>
                <p className="work-timeline__years" data-years={i + 1}>
                  0yr
                </p>
                <p className="work-timeline__insight">{role.insight}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
