import { Fragment } from "react";
import { AnimatedDetails } from "@/components/AnimatedDetails";
import { DetailsAccordion } from "@/components/DetailsAccordion";
import { ExternalLinkArrow } from "@/components/ExternalLinkArrow";
import {
  INLINE_LINK_SEPARATOR,
  type BodyParagraph,
  type PortfolioEntry,
  type PullquoteParagraph,
  type RichLine,
} from "@/content/types";
import type { HomeContent } from "@/lib/home-content";

function isPullquoteParagraph(
  paragraph: BodyParagraph,
): paragraph is PullquoteParagraph {
  return typeof paragraph === "object" && "pullquote" in paragraph;
}

function InlineBodyLink({ href, text }: { href: string; text: string }) {
  const lastSpace = text.lastIndexOf(" ");
  const lead = lastSpace === -1 ? null : text.slice(0, lastSpace + 1);
  const tail = lastSpace === -1 ? text : text.slice(lastSpace + 1);

  return (
    <a
      href={href}
      className="home__inline-link"
      target="_blank"
      rel="noopener noreferrer"
    >
      {lead}
      <span className="home__inline-link-end">
        {tail}
        <ExternalLinkArrow className="home__inline-link-icon" />
      </span>
    </a>
  );
}

function InlineText({ content }: { content: RichLine }) {
  if (typeof content === "string") {
    return <>{content}</>;
  }

  return (
    <>
      {content.map((segment, index) => {
        if (typeof segment === "string") {
          if (segment === INLINE_LINK_SEPARATOR) {
            return (
              <span key={index} className="home__inline-separator" aria-hidden="true">
                {" · "}
              </span>
            );
          }

          return <Fragment key={index}>{segment}</Fragment>;
        }

        return (
          <InlineBodyLink key={index} href={segment.href} text={segment.text} />
        );
      })}
    </>
  );
}

function BodyParagraphBlock({ paragraph }: { paragraph: BodyParagraph }) {
  if (typeof paragraph === "string") {
    return <p>{paragraph}</p>;
  }

  if (isPullquoteParagraph(paragraph)) {
    return (
      <blockquote className="home__project-body-pullquote">
        <InlineText content={paragraph.text} />
      </blockquote>
    );
  }

  return (
    <p>
      <InlineText content={paragraph} />
    </p>
  );
}

function ProjectListItem({
  item,
  accordionId,
}: {
  item: PortfolioEntry;
  accordionId: string;
}) {
  return (
    <li className="home__project-item">
      <AnimatedDetails
        className="home__details"
        accordionId={accordionId}
        summary={
          <>
            <span className="home__project-title">{item.title}</span>
            <span className="home__disclosure" aria-hidden="true" />
          </>
        }
      >
        <div className="home__project-body">
          {item.paragraphs.map((paragraph, index) => (
            <BodyParagraphBlock key={index} paragraph={paragraph} />
          ))}
        </div>
      </AnimatedDetails>
    </li>
  );
}

function SocialAnchor({
  href,
  label,
  className,
}: {
  href: string;
  label: string;
  className?: string;
}) {
  const isMailto = href.startsWith("mailto:");
  const accessibleLabel = isMailto ? label : `${label} (opens in new tab)`;

  return (
    <a
      href={href}
      className={className}
      aria-label={accessibleLabel}
      target={isMailto ? undefined : "_blank"}
      rel={isMailto ? undefined : "noopener noreferrer"}
    >
      {label}
    </a>
  );
}

export function SimpleHome({
  nameEasterEggHref,
  emailLink,
  calendlyLink,
  footerLinks,
  introRole,
  introTagline,
  projects,
  workExperience,
  educationLabel,
}: HomeContent) {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <main id="main-content" className="home">
        <header className="home__header">
          <h1 className="home__name">
            <a
              href={nameEasterEggHref}
              className="home__name-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Raashi Shah
            </a>
          </h1>
          <nav className="home__header-contact" aria-label="Contact">
            <SocialAnchor
              href={emailLink.href}
              label={emailLink.label}
              className="home__link home__link--header"
            />
            <span> or </span>
            <SocialAnchor
              href={calendlyLink.href}
              label={calendlyLink.label}
              className="home__link home__link--header"
            />
          </nav>
        </header>

        <div className="home__content">
          <section className="home__intro" aria-label="About">
            <p className="home__line home__line--role">{introRole}</p>
            <p className="home__line home__line--tagline">{introTagline}</p>
          </section>

          <section aria-label="Work and experience">
            <DetailsAccordion>
              <div className="home__project-groups">
                <ul className="home__project-list" aria-label="Projects">
                  {projects.map((project) => (
                    <ProjectListItem
                      key={project.id}
                      item={project}
                      accordionId={project.id}
                    />
                  ))}
                </ul>
                <div className="home__experience-groups">
                  <ul className="home__project-list" aria-label="Experience">
                    {workExperience.map((role) => (
                      <ProjectListItem
                        key={role.id}
                        item={role}
                        accordionId={role.id}
                      />
                    ))}
                  </ul>
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

        <footer className="home__footer">
          <nav className="home__footer-nav" aria-label="Social links">
            {footerLinks.map((link) => (
              <SocialAnchor
                key={link.id}
                href={link.href}
                label={link.label}
                className="home__link home__link--footer"
              />
            ))}
          </nav>
        </footer>
      </main>
    </>
  );
}
