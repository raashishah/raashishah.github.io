import type { Metadata } from "next";
import { ProjectPage } from "@/components/ProjectPage";
import { expressionContent } from "@/content/expression";
import { buildSubpageMetadata } from "@/lib/metadata";
import { projects } from "@/content/portfolio";

const expressionProject = projects.find((project) => project.id === "expression");

if (!expressionProject) {
  throw new Error("Expression project is missing from portfolio content");
}

export const metadata: Metadata = buildSubpageMetadata({
  canonical: "/expression",
  title: expressionProject.seoName ?? expressionProject.title,
  description: expressionProject.seoDescription,
});

export default function Page() {
  return (
    <ProjectPage {...expressionContent} pageLabel="About Expression" />
  );
}
