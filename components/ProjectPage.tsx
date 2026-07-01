import { DetailsAccordion } from "@/components/DetailsAccordion";
import { PortfolioList } from "@/components/PortfolioList";
import { SiteShell } from "@/components/SiteShell";
import { calendlyLink } from "@/content/site";
import type { PortfolioEntry } from "@/content/types";

export type ProjectPageContent = {
  introRole: string;
  introTagline: string;
  sections: readonly PortfolioEntry[];
  pageLabel: string;
  idPrefix: string;
  showBookDemo?: boolean;
};

export function ProjectPage({
  introRole,
  introTagline,
  sections,
  pageLabel,
  idPrefix,
  showBookDemo = false,
}: ProjectPageContent) {
  return (
    <SiteShell nameHref="/" nameAsHeading={false}>
      <div className="home__content">
        <section className="home__intro" aria-label={pageLabel}>
          <p className="home__line home__line--role">{introRole}</p>
          <p className="home__line home__line--tagline">{introTagline}</p>
          {showBookDemo ? (
            <p className="home__line home__line--cta">
              <a
                href={calendlyLink.href}
                className="home__link home__link--header"
                target="_blank"
                rel="noopener noreferrer"
              >
                Book Demo
              </a>
            </p>
          ) : null}
        </section>

        <section aria-label={pageLabel}>
          <DetailsAccordion>
            <PortfolioList
              items={sections}
              idPrefix={idPrefix}
              ariaLabel={pageLabel}
            />
          </DetailsAccordion>
          <p className="home__line home__line--role home__updating-note">
            still updating this page
          </p>
        </section>
      </div>
    </SiteShell>
  );
}
