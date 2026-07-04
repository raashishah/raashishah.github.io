import { DetailsAccordion } from "@/components/DetailsAccordion";
import { PortfolioList } from "@/components/PortfolioList";
import { calendlyLink } from "@/content/site";
import type { PortfolioEntry } from "@/content/types";

export type ProjectDetailProps = {
  introRole: string;
  introTagline: string;
  sections: readonly PortfolioEntry[];
  pageLabel: string;
  idPrefix: string;
  showBookDemo?: boolean;
  showIntro?: boolean;
};

export function ProjectDetail({
  introRole,
  introTagline,
  sections,
  pageLabel,
  idPrefix,
  showBookDemo = false,
  showIntro = true,
}: ProjectDetailProps) {
  return (
    <section className="home__detail-content" aria-label={pageLabel}>
      {showIntro ? (
        <div className="home__detail-intro">
          <p className="home__line home__line--role">{introRole}</p>
          <h2 className="home__line home__line--tagline">{introTagline}</h2>
        </div>
      ) : null}
      <DetailsAccordion>
        <PortfolioList items={sections} idPrefix={idPrefix} ariaLabel={pageLabel} />
      </DetailsAccordion>
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
      <p className="home__line home__line--role home__updating-note">
        Still updating this page
      </p>
    </section>
  );
}
