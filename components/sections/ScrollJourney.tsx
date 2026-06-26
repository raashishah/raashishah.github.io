"use client";

import { useState } from "react";
import { projects } from "@/content/projects";
import { Hero } from "@/components/sections/Hero";
import { Preloader } from "@/components/sections/Preloader";
import { ProjectSection } from "@/components/sections/ProjectSection";
import { BreathingMoment } from "@/components/sections/BreathingMoment";
import { WorkTimeline } from "@/components/sections/WorkTimeline";
import { ConnectFooter } from "@/components/sections/ConnectFooter";
import { ScrollProgress } from "@/components/sections/ScrollProgress";
import { GrainOverlay } from "@/components/effects/GrainOverlay";

export function ScrollJourney() {
  const [ready, setReady] = useState(false);

  return (
    <>
      <Preloader onComplete={() => setReady(true)} />
      <ScrollProgress />
      <GrainOverlay />
      <main className="journey" data-active-section="">
        <Hero ready={ready} />
        {projects.map((project, i) => (
          <div key={project.slug}>
            <ProjectSection project={project} index={i} ready={ready} />
            {i < projects.length - 1 && i % 2 === 0 && <BreathingMoment index={Math.floor(i / 2)} />}
          </div>
        ))}
        <WorkTimeline />
        <ConnectFooter />
      </main>
    </>
  );
}
