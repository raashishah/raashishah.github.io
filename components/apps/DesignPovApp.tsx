import { projects } from "@/content/projects";

const project = projects.find((p) => p.id === "design-pov")!;

export function DesignPovApp() {
  return (
    <>
      <p className="app-insight">{project.insight}</p>
      {project.href ? (
        <a href={project.href} className="app-link" target="_blank" rel="noopener noreferrer">
          povindex.designpovindia.com →
        </a>
      ) : null}
    </>
  );
}
