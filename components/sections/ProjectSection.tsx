"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Project } from "@/content/types";
import { registerGsapPlugins } from "@/lib/animations";
import { isE2EMode } from "@/lib/e2e";
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
  const [isCompactViewport, setIsCompactViewport] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isE2E, setIsE2E] = useState(false);
  const { setCursorState, resetCursor } = useCursorState();

  useEffect(() => {
    setIsE2E(isE2EMode());
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const media = window.matchMedia("(max-width: 900px), (pointer: coarse)");
    const update = () => setIsCompactViewport(media.matches);
    update();

    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

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
    if (!section || !ready) return;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: isCompactViewport ? "+=90%" : "+=120%",
      pin: !isCompactViewport,
      scrub: isCompactViewport ? 0.45 : 0.8,
      onUpdate: (self) => {
        setProgress(self.progress);
      },
      onEnter: () => {
        setIsActive(true);
        document.querySelector(".journey")?.setAttribute("data-active-section", project.slug);
      },
      onEnterBack: () => {
        setIsActive(true);
        document.querySelector(".journey")?.setAttribute("data-active-section", project.slug);
      },
      onLeave: () => setIsActive(false),
      onLeaveBack: () => setIsActive(false),
    });

    gsap.fromTo(
      section.querySelector(".project-section__copy"),
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: section,
          start: "top 60%",
          end: "top 20%",
          scrub: isCompactViewport ? 0.3 : true,
        },
      },
    );

    return () => {
      trigger.kill();
    };
  }, [isCompactViewport, project.slug, ready]);

  return (
    <section
      ref={sectionRef}
      className="project-section"
      data-section={project.slug}
      data-index={index}
      data-active={isActive ? "true" : "false"}
      onMouseEnter={() => setCursorState("project", project.title)}
      onMouseLeave={resetCursor}
    >
      <div className="project-section__inner">
        <ProjectSceneCanvas
          project={project}
          progress={progress}
          enabled={sceneEnabled || isE2E}
          active={isActive}
        />
        <div className="project-section__copy">
          <p className="project-section__type">{project.type === "project" ? "project" : "work"}</p>
          <TextReveal as="h2" className="project-section__title" mode="words">
            {project.title}
          </TextReveal>
          <TextReveal as="p" className="project-section__insight" mode="scrub-words">
            {project.insight}
          </TextReveal>
          <FlipLink href={`/project/${project.slug}`} flipId={`scene-${project.slug}`} className="project-section__cta">
            {project.href ? "see the site" : "read the story"}
            <span aria-hidden="true">→</span>
          </FlipLink>
        </div>
      </div>
    </section>
  );
}
