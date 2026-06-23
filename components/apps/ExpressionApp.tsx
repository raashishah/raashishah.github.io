import { projects } from "@/content/projects";

const project = projects.find((p) => p.id === "expression")!;

export function ExpressionApp() {
  return (
    <>
      <span className="app-status">building</span>
      <p className="app-insight">{project.insight}</p>
    </>
  );
}
