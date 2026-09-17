import { DetailsAccordion } from "@/components/DetailsAccordion";
import { PortfolioList } from "@/components/PortfolioList";
import type { DetailRouteConfig } from "@/lib/detail-routes";

export function ProjectDetail({
  introRole,
  introTagline,
  sections,
  pageLabel,
  idPrefix,
  cta,
}: Omit<DetailRouteConfig, "slug">) {
  return (
    <section className="home__detail-content" aria-label={pageLabel}>
      <div className="home__detail-intro">
        <p className="home__line home__line--role">{introRole}</p>
        <h2 className="home__line home__line--tagline">{introTagline}</h2>
      </div>
      <DetailsAccordion>
        <PortfolioList items={sections} idPrefix={idPrefix} ariaLabel={pageLabel} />
      </DetailsAccordion>
      {cta ? (
        <p className="home__line home__line--cta">
          <a
            href={cta.href}
            className="home__link home__link--header home__link--cta"
            aria-label={`${cta.label} (opens in new tab)`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {cta.label}
          </a>
        </p>
      ) : null}
      <p className="home__line home__line--role home__updating-note">
        Still updating this page
      </p>
    </section>
  );
}
