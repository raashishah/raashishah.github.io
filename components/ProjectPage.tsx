import { ProjectDetail, type ProjectDetailProps } from "@/components/ProjectDetail";
import { PortfolioShell } from "@/components/PortfolioShell";

export type ProjectPageContent = ProjectDetailProps;

export function ProjectPage({
  introRole,
  introTagline,
  sections,
  pageLabel,
  idPrefix,
  showBookDemo = false,
}: ProjectPageContent) {
  return (
    <PortfolioShell
      nameHref="/"
      intro={
        <section className="home__intro" aria-label={pageLabel}>
          <p className="home__line home__line--role">{introRole}</p>
          <h2 className="home__line home__line--tagline">{introTagline}</h2>
        </section>
      }
      work={
        <ProjectDetail
          introRole={introRole}
          introTagline={introTagline}
          sections={sections}
          pageLabel={pageLabel}
          idPrefix={idPrefix}
          showBookDemo={showBookDemo}
          showIntro={false}
        />
      }
    />
  );
}
