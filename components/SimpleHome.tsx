import { DetailsAccordion } from "@/components/DetailsAccordion";
import { PortfolioList } from "@/components/PortfolioList";
import { SiteShell } from "@/components/SiteShell";
import type { HomeContent } from "@/lib/home-content";

export function SimpleHome({
  nameEasterEggHref,
  introRole,
  introTagline,
  projects,
  workExperience,
  educationLabel,
}: HomeContent) {
  return (
    <SiteShell nameHref={nameEasterEggHref} nameExternal>
      <div className="home__content">
        <section className="home__intro" aria-label="About">
          <p className="home__line home__line--role">{introRole}</p>
          <p className="home__line home__line--tagline">{introTagline}</p>
        </section>

        <section aria-label="Work and experience">
          <DetailsAccordion>
            <div className="home__project-groups">
              <PortfolioList
                items={projects}
                ariaLabel="Projects"
              />
              <div className="home__experience-groups">
                <PortfolioList
                  items={workExperience}
                  ariaLabel="Experience"
                />
                <ul className="home__project-list" aria-label="Education">
                  <li className="home__project-item">
                    <p className="home__project-static home__line home__line--role">
                      {educationLabel}
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </DetailsAccordion>
        </section>
      </div>
    </SiteShell>
  );
}
