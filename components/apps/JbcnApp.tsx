import { projects } from "@/content/projects";

const project = projects.find((p) => p.id === "jbcn")!;

export function JbcnApp() {
  return (
    <>
      <p className="app-insight">{project.insight}</p>
      {project.href ? (
        <a href={project.href} className="app-link" target="_blank" rel="noopener noreferrer">
          admissions.raashishah.com →
        </a>
      ) : null}
    </>
  );
}
