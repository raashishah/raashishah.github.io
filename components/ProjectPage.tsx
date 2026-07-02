import { DetailsAccordion } from "@/components/DetailsAccordion";
import { PortfolioList } from "@/components/PortfolioList";
import { PortfolioShell } from "@/components/PortfolioShell";
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
    <PortfolioShell
      nameHref="/"
      nameAsHeading={false}
      intro={
        <section className="home__intro" aria-label={pageLabel}>
          <p className="home__line home__line--role">{introRole}</p>
          <p className="home__line home__line--tagline">{introTagline}</p>
        </section>
      }
      work={
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
          {showBookDemo ? (
            <p className="home__line home__line--cta">
              <a
                href={calendlyLink.href}
                className="home__link home__link--header home__link--cta"
                aria-label="Book demo (opens in new tab)"
                target="_blank"
                rel="noopener noreferrer"
              >
                Book demo
              </a>
            </p>
          ) : null}
        </section>
      }
    />
  );
}
