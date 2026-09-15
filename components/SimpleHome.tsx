import { DetailsAccordion } from "@/components/DetailsAccordion";
import { HomepageMarker } from "@/components/HomepageMarker";
import { HomePortrait } from "@/components/HomePortrait";
import { PortfolioList } from "@/components/PortfolioList";
import { PortfolioShell } from "@/components/PortfolioShell";
import type { HomeContent } from "@/lib/home-content";

export function SimpleHome({
  nameEasterEggHref,
  introIdentity,
  introSubline,
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
            <div className="home__intro-identity">
              <h2 className="home__line home__line--name">{introIdentity}</h2>
            </div>
            <div className="home__intro-lede">
              <p className="home__line home__line--tagline">{introTagline}</p>
              <p className="home__line home__line--subline">{introSubline}</p>
            </div>
          </section>
        }
        portrait={<HomePortrait />}
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
