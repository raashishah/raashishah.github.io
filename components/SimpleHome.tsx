import { HomepageMarker } from "@/components/HomepageMarker";
import { DetailsAccordion } from "@/components/DetailsAccordion";
import { PortfolioList } from "@/components/PortfolioList";
import { PortfolioShell } from "@/components/PortfolioShell";
import type { HomeContent } from "@/lib/home-content";

export function SimpleHome({
  nameEasterEggHref,
  introRole,
  introTagline,
  projects,
  workExperience,
}: HomeContent) {
  return (
    <HomepageMarker>
      <PortfolioShell
      nameHref={nameEasterEggHref}
      nameExternal
      intro={
        <section className="home__intro" aria-label="About">
          <p className="home__line home__line--role">{introRole}</p>
          <p className="home__line home__line--tagline">{introTagline}</p>
        </section>
      }
      work={
        <section aria-label="Work and experience">
          <DetailsAccordion>
            <div className="home__project-groups">
              <PortfolioList items={projects} ariaLabel="Projects" />
              <div className="home__experience-groups">
                <PortfolioList items={workExperience} ariaLabel="Experience" />
              </div>
            </div>
          </DetailsAccordion>
        </section>
      }
    />
    </HomepageMarker>
  );
}
