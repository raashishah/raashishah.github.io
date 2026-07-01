import { SiteShell } from "@/components/SiteShell";

export type ProjectPageSection = {
  heading: string;
  body: string;
};

export type ProjectPageContent = {
  title: string;
  role: string;
  tagline: string;
  sections: readonly ProjectPageSection[];
  pageLabel: string;
};

export function ProjectPage({
  title,
  role,
  tagline,
  sections,
  pageLabel,
}: ProjectPageContent) {
  return (
    <SiteShell nameHref="/" nameAsHeading={false}>
      <div className="home__content">
        <section className="home__intro" aria-label={pageLabel}>
          <h1 className="home__name">{title}</h1>
          <p className="home__line home__line--role">{role}</p>
          <p className="home__line home__line--tagline">{tagline}</p>
        </section>

        <article className="home__page-body" aria-label={pageLabel}>
          {sections.map((section) => (
            <section key={section.heading} className="home__page-section">
              <h2 className="home__project-title">{section.heading}</h2>
              <p>{section.body}</p>
            </section>
          ))}
        </article>
      </div>
    </SiteShell>
  );
}
