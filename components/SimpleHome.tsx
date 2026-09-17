import { DetailsAccordion } from "@/components/DetailsAccordion";
import { DecavalentDictionary } from "@/components/DecavalentDictionary";
import { HomepageMarker } from "@/components/HomepageMarker";
import { HomePortrait } from "@/components/HomePortrait";
import { HomeIntroProfile } from "@/components/HomeIntroProfile";
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
          <section className="home__intro home__intro--masthead" aria-label="About">
            <DecavalentDictionary />
            <HomeIntroProfile
              introName={introName}
              introRole={introRole}
              introTagline={introTagline}
              introSubline={introSubline}
            />
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
