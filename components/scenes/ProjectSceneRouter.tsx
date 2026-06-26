"use client";

import { Suspense } from "react";
import type { CSSProperties } from "react";
import type { Project } from "@/content/types";
import { getProjectPalette } from "@/lib/colors";
import { SceneCanvas } from "@/components/scenes/SceneCanvas";
import { SceneFallback } from "@/components/scenes/SceneFallback";
import { AdmissionsScene } from "@/components/scenes/AdmissionsScene";
import { ExpressionScene } from "@/components/scenes/ExpressionScene";
import { DesignPovScene } from "@/components/scenes/DesignPovScene";
import { PlutoScene } from "@/components/scenes/PlutoScene";
import { KawaScene } from "@/components/scenes/KawaScene";
import { AulaScene } from "@/components/scenes/AulaScene";
import { KotakScene } from "@/components/scenes/KotakScene";
import type { ProjectSlug } from "@/content/types";

const sceneMap = {
  admissions: AdmissionsScene,
  expression: ExpressionScene,
  "design-pov": DesignPovScene,
  pluto: PlutoScene,
  kawa: KawaScene,
  aula: AulaScene,
  kotak: KotakScene,
} as const;

type ProjectSceneProps = {
  slug: ProjectSlug;
  progress: number;
};

export function ProjectScene({ slug, progress }: ProjectSceneProps) {
  const SceneComponent = sceneMap[slug];
  if (!SceneComponent) return <SceneFallback />;

  return (
    <Suspense fallback={<SceneFallback />}>
      <SceneComponent progress={progress} />
    </Suspense>
  );
}

export function ProjectSceneCanvas({
  project,
  progress,
  enabled = true,
}: {
  project: Project;
  progress: number;
  enabled?: boolean;
}) {
  const palette = getProjectPalette(project.slug);

  return (
    <div
      className="project-scene-wrap"
      data-flip-id={`scene-${project.slug}`}
      style={
        palette
          ? ({
              "--zone-bg": palette.bg,
              "--zone-accent": palette.accent,
            } as CSSProperties)
          : undefined
      }
    >
      <SceneCanvas className="project-scene-canvas" enabled={enabled}>
        <ProjectScene slug={project.slug} progress={progress} />
      </SceneCanvas>
    </div>
  );
}
