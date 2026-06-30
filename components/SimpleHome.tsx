import { Fragment } from "react";
import { AnimatedDetails } from "@/components/AnimatedDetails";
import { DetailsAccordion } from "@/components/DetailsAccordion";
import { nameEasterEggHref, socialLinks } from "@/content/site";
import { siteConfig } from "@/lib/metadata";

const emailLink = socialLinks.find((item) => item.id === "email");
const calendlyLink = socialLinks.find((item) => item.id === "calendly");
const footerLinks = [
  ...socialLinks.filter((link) => link.id === "linkedin"),
  ...socialLinks.filter(
    (link) =>
      link.id !== "email" && link.id !== "calendly" && link.id !== "linkedin",
  ),
];

type RichLink = { text: string; href: string };
type RichMedium = { text: string; medium: true };
type RichSegment = string | RichLink | RichMedium;
type RichText = readonly RichSegment[];
type RichLine = string | RichText;

type GroupedItem =
  | RichLine
  | {
      label: RichLine;
      points: readonly (RichLine | PullquoteParagraph)[];
    };

type GroupedParagraph = {
  intro: RichLine;
  items: readonly GroupedItem[];
};

type PullquoteParagraph = {
  text: RichLine;
  pullquote: true;
};

type BulletListParagraph = {
  bullets: readonly RichLine[];
};

type BodyParagraph =
  | string
  | RichLine
  | PullquoteParagraph
  | BulletListParagraph
  | GroupedParagraph;

function isGroupedParagraph(
  paragraph: BodyParagraph,
): paragraph is GroupedParagraph {
  return typeof paragraph === "object" && "intro" in paragraph && "items" in paragraph;
}

function isPullquoteParagraph(
  paragraph: BodyParagraph | PullquoteParagraph,
): paragraph is PullquoteParagraph {
  return typeof paragraph === "object" && "pullquote" in paragraph && "text" in paragraph;
}

function isBulletListParagraph(
  paragraph: BodyParagraph,
): paragraph is BulletListParagraph {
  return typeof paragraph === "object" && "bullets" in paragraph;
}

type HomeEntry = {
  title: string;
  paragraphs: readonly BodyParagraph[];
};

function InlineText({ content }: { content: RichLine }) {
  if (typeof content === "string") {
    return <>{content}</>;
  }

  return (
    <>
      {content.map((segment, index) => {
        if (typeof segment === "string") {
          return <Fragment key={index}>{segment}</Fragment>;
        }

        if ("href" in segment) {
          return (
            <a
              key={index}
              href={segment.href}
              className="home__inline-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {segment.text}
            </a>
          );
        }

        return (
          <span key={index} className="home__inline-medium">
            {segment.text}
          </span>
        );
      })}
    </>
  );
}

function isFlatGroupedItem(item: GroupedItem): item is RichLine {
  return typeof item === "string" || Array.isArray(item);
}

function renderGroupedItem(item: GroupedItem, itemIndex: number) {
  if (isFlatGroupedItem(item)) {
    return (
      <p key={itemIndex} className="home__project-body-sub">
        <InlineText content={item} />
      </p>
    );
  }

  return (
    <div key={itemIndex} className="home__project-body-nested">
      <p className="home__project-body-sub">
        <InlineText content={item.label} />
      </p>
      {item.points.map((point, pointIndex) => {
        if (isPullquoteParagraph(point)) {
          return (
            <blockquote
              key={pointIndex}
              className="home__project-body-pullquote"
            >
              <InlineText content={point.text} />
            </blockquote>
          );
        }

        return (
          <p
            key={pointIndex}
            className="home__project-body-sub home__project-body-sub--nested"
          >
            <InlineText content={point} />
          </p>
        );
      })}
    </div>
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

  if (isBulletListParagraph(paragraph)) {
    return (
      <ul className="home__project-body-list">
        {paragraph.bullets.map((bullet, index) => (
          <li key={index}>
            <InlineText content={bullet} />
          </li>
        ))}
      </ul>
    );
  }

  if (isGroupedParagraph(paragraph)) {
    return (
      <div className="home__project-body-group">
        <p>
          <InlineText content={paragraph.intro} />
        </p>
        {paragraph.items.map(renderGroupedItem)}
      </div>
    );
  }

  return (
    <p>
      <InlineText content={paragraph} />
    </p>
  );
}

const projects = [
  {
    title: "Entreprise-grade Agents",
    paragraphs: [
      [
        {
          text: "Admissions evaluation agent",
          href: "https://admissions.raashishah.com",
        },
        " for academic institutions",
      ],
    ],
  },
  {
    title: "Professional Tool for Animators",
    paragraphs: [
      [
        {
          text: "Auto-colouring for hand drawn animation",
          href: "https://github.com/raashishah/colourer",
        },
      ],
      "This problem remains unsolved worldwide",
    ],
  },
  {
    title: "Offline Expo Navigation",
    paragraphs: [
      [
        {
          text: "Design POV",
          href: "https://povindex.designpovindia.com/home",
        },
      ],
      {
        text: "Works offline regardless of footfall",
        pullquote: true,
      },
      {
        text: "Made 99% of this in 12 hours",
        pullquote: true,
      },
    ],
  },
] satisfies ReadonlyArray<HomeEntry>;

const workExperience = [
  {
    title: "OnDevice",
    paragraphs: [
      {
        text: "Designed a health app for diabetic patients",
        pullquote: true,
      },
      [
        "Distributed Applied AI content on ",
        { text: "Twitter", href: "https://x.com/useondevice" },
      ],
    ],
  },
  {
    title: "Pluto",
    paragraphs: [
      {
        text: "Transformed a creative studio into a product led team",
        pullquote: true,
      },
      [
        { text: "Magic Batch", href: "https://opensea.io/collection/magicbatch" },
        " | ",
        {
          text: "Pluto",
          href: "https://medium.com/pluto-misfits/introducing-interoperable-nft-minting-67f3af6d0f94",
        },
        " | ",
        {
          text: "Create",
          href: "https://x.com/createlayer/status/1805623167538340046/video/1",
        },
      ],
    ],
  },
  {
    title: "Kawa Space",
    paragraphs: [
      [
        {
          text: "Geospatial data ML models",
          href: "https://www.linkedin.com/company/kawaspace/",
        },
      ],
      {
        text: "Pre-GPT3 chatbot for users to get inference simply by asking",
        pullquote: true,
      },
    ],
  },
  {
    title: "Aula Education",
    paragraphs: [
      [
        {
          text: "Client relationships in the UK and the US",
          href: "https://www.linkedin.com/company/aulaeducation/",
        },
      ],
      {
        text: "Doubled engineering delivery speed by implementing agile workflows",
        pullquote: true,
      },
    ],
  },
] satisfies ReadonlyArray<HomeEntry>;

const educationLabel = "BSc Product Design and Mgmt, Aston Uni, UK";

function ProjectListItem({
  item,
  accordionId,
}: {
  item: HomeEntry;
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

export function SimpleHome() {
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
          {emailLink && calendlyLink ? (
            <nav className="home__header-contact" aria-label="Contact">
              <SocialAnchor
                href={emailLink.href}
                label={emailLink.label}
                className="home__link home__link--header"
              />
              <span className="home__header-contact-or"> or </span>
              <SocialAnchor
                href={calendlyLink.href}
                label={calendlyLink.label}
                className="home__link home__link--header"
              />
            </nav>
          ) : null}
        </header>

        <div className="home__content">
          <section className="home__intro" aria-label="About">
            <p className="home__line home__line--role">{siteConfig.introRole}</p>
            <p className="home__line home__line--tagline">
              {siteConfig.introTagline}
            </p>
          </section>

          <section className="home__projects" aria-label="Work and experience">
            <DetailsAccordion>
              <div className="home__project-groups">
                <ul className="home__project-list" aria-label="Projects">
                  {projects.map((project) => (
                    <ProjectListItem
                      key={project.title}
                      item={project}
                      accordionId={project.title}
                    />
                  ))}
                </ul>
                <div className="home__experience-groups">
                  <ul className="home__project-list" aria-label="Experience">
                    {workExperience.map((role) => (
                      <ProjectListItem
                        key={role.title}
                        item={role}
                        accordionId={role.title}
                      />
                    ))}
                  </ul>
                  <ul className="home__project-list" aria-label="Education">
                    <li className="home__project-item">
                      <p className="home__project-static">
                        <span className="home__project-title">{educationLabel}</span>
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
