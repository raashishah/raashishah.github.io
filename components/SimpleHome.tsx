import { DetailsAccordion } from "@/components/DetailsAccordion";
import { DecavalentDictionary } from "@/components/DecavalentDictionary";
import { HomepageMarker } from "@/components/HomepageMarker";
import { HomePortrait } from "@/components/HomePortrait";
import { AgentMentoring } from "@/components/AgentMentoring";
import { PortfolioList } from "@/components/PortfolioList";
import { PortfolioShell } from "@/components/PortfolioShell";
import type { HomeContent } from "@/lib/home-content";

export function SimpleHome({
  nameEasterEggHref,
  introName,
  introRole,
  introSubline,
  introTagline,
  workGroups,
}: HomeContent) {
  return (
    <HomepageMarker>
      <PortfolioShell
        nameHref={nameEasterEggHref}
        nameExternal
        intro={
          <section className="home__intro" aria-label="About">
            <DecavalentDictionary />
            <div className="home__intro-identity">
              <h2 className="home__line home__line--name">
                <span className="home__intro-name">{`${introName},`}</span>
                <span className="home__intro-role">{` ${introRole}`}</span>
              </h2>
            </div>
            <div className="home__intro-lede">
              <p className="home__line home__line--tagline">{introTagline}</p>
              <p className="home__line home__line--subline">{introSubline}</p>
            </div>
          </section>
        }
        portrait={<><HomePortrait /><AgentMentoring /></>}
        work={
          <section aria-label="Work and experience">
            <DetailsAccordion>
              <div className="home__project-groups">
                {workGroups.map((group) => {
                  const headingId = `work-group-${group.id}`;
                  return (
                    <section
                      key={group.id}
                      className="home__list-section"
                      aria-labelledby={headingId}
                    >
                      <h3 id={headingId} className="home__list-section-heading">
                        {group.label}
                      </h3>
                      <PortfolioList items={group.items} labelledBy={headingId} />
                    </section>
                  );
                })}
              </div>
            </DetailsAccordion>
          </section>
        }
      />
    </HomepageMarker>
  );
}
