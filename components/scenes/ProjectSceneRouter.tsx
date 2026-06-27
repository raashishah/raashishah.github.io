"use client";

import { Suspense, type ComponentType } from "react";
import type { Project, ProjectSlug } from "@/content/types";
import { SceneCanvas } from "@/components/scenes/SceneCanvas";
import { AdmissionsScene } from "@/components/scenes/AdmissionsScene";
import { ExpressionScene } from "@/components/scenes/ExpressionScene";
import { DesignPovScene } from "@/components/scenes/DesignPovScene";
import { PlutoScene } from "@/components/scenes/PlutoScene";
import { KawaScene } from "@/components/scenes/KawaScene";
import { AulaScene } from "@/components/scenes/AulaScene";
import { KotakScene } from "@/components/scenes/KotakScene";

type SceneRenderer = "2d" | "3d";

const sceneConfig: Record<ProjectSlug, { type: SceneRenderer; Component: ComponentType<{ progress: number }> }> = {
  admissions: { type: "2d", Component: AdmissionsScene },
  expression: { type: "2d", Component: ExpressionScene },
  "design-pov": { type: "2d", Component: DesignPovScene },
  pluto: { type: "2d", Component: PlutoScene },
  kawa: { type: "2d", Component: KawaScene },
  aula: { type: "2d", Component: AulaScene },
  kotak: { type: "2d", Component: KotakScene },
};

type ProjectSceneProps = {
  slug: ProjectSlug;
  progress: number;
};

export function ProjectScene({ slug, progress }: ProjectSceneProps) {
  const config = sceneConfig[slug];
  if (!config) return null;

  const { Component } = config;
  return (
    <Suspense fallback={null}>
      <Component progress={progress} />
    </Suspense>
  );
}

export function ProjectSceneCanvas({
  project,
  progress,
  enabled = true,
  active = true,
}: {
  project: Project;
  progress: number;
  enabled?: boolean;
  active?: boolean;
}) {
  const config = sceneConfig[project.slug];
  if (!config) return null;

  if (config.type === "3d") {
    return (
      <div className="project-scene-wrap" data-flip-id={`scene-${project.slug}`}>
        <SceneCanvas className="project-scene-canvas" enabled={enabled && active}>
          <ProjectScene slug={project.slug} progress={progress} />
        </SceneCanvas>
      </div>
    );
  }

  return (
    <div
      className="project-scene-wrap project-scene-wrap--2d"
      data-flip-id={`scene-${project.slug}`}
      data-scene-active={active ? "true" : "false"}
    >
      {enabled ? <ProjectScene slug={project.slug} progress={progress} /> : <div className="project-scene-fallback" />}
    </div>
  );
}
