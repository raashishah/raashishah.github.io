"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Project } from "@/content/types";
import { getProjectPalette } from "@/lib/colors";
import { registerGsapPlugins } from "@/lib/animations";
import { useColorZone } from "@/components/providers/ColorZoneProvider";
import { useCursorState } from "@/components/cursor/CursorProvider";
import { ProjectSceneCanvas } from "@/components/scenes/ProjectSceneRouter";
import { TextReveal } from "@/components/effects/TextReveal";
import { FlipLink } from "@/components/effects/FlipLink";

type ProjectSectionProps = {
  project: Project;
  index: number;
  ready: boolean;
};

export function ProjectSection({ project, index, ready }: ProjectSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [sceneEnabled, setSceneEnabled] = useState(false);
  const { setActiveZone } = useColorZone();
  const { setCursorState, resetCursor } = useCursorState();
  const palette = getProjectPalette(project.slug);

  useEffect(() => {
    if (!ready) {
      setSceneEnabled(false);
      return;
    }

    const section = sectionRef.current;
    if (!section) return;
    if (typeof IntersectionObserver === "undefined") {
      setSceneEnabled(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setSceneEnabled(entry.isIntersecting);
      },
      {
        rootMargin: "125% 0px",
        threshold: 0,
      },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [ready]);

  useEffect(() => {
    registerGsapPlugins();
    const section = sectionRef.current;
    if (!section) return;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=120%",
      pin: true,
      scrub: 0.8,
      onUpdate: (self) => {
        setProgress(self.progress);
      },
      onEnter: () => palette && setActiveZone(project.slug, palette),
      onEnterBack: () => palette && setActiveZone(project.slug, palette),
      onLeave: () => setActiveZone(null),
      onLeaveBack: () => setActiveZone(null),
    });

    gsap.fromTo(
      section.querySelector(".project-section__copy"),
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: section,
          start: "top 60%",
          end: "top 20%",
          scrub: true,
        },
      },
    );

    return () => {
      trigger.kill();
    };
  }, [project.slug, palette, setActiveZone]);

  const zoneStyle = palette
    ? ({
        "--zone-bg": palette.bg,
        "--zone-text": palette.text,
        "--zone-muted": palette.textMuted,
        "--zone-accent": palette.accent,
      } as CSSProperties)
    : undefined;

  return (
    <section
      ref={sectionRef}
      className="project-section"
      data-section={project.slug}
      data-index={index}
      style={zoneStyle}
      onMouseEnter={() => setCursorState("project", "dive in")}
      onMouseLeave={resetCursor}
    >
      <div className="project-section__inner">
        <ProjectSceneCanvas project={project} progress={progress} enabled={sceneEnabled} />
        <div className="project-section__copy">
          <p className="project-section__type">{project.type === "project" ? "project" : "work"}</p>
          <TextReveal as="h2" className="project-section__title" mode="words">
            {project.title}
          </TextReveal>
          <p className="project-section__insight">{project.insight}</p>
          <FlipLink href={`/project/${project.slug}`} flipId={`scene-${project.slug}`} className="project-section__cta">
            {project.href ? "see the site" : "read the story"}
            <span aria-hidden="true">→</span>
          </FlipLink>
        </div>
      </div>
    </section>
  );
}
