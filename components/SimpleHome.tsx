import { Fragment } from "react";
import { AnimatedDetails } from "@/components/AnimatedDetails";
import { socialLinks } from "@/content/site";
import { siteConfig } from "@/lib/metadata";

const emailLink = socialLinks.find((item) => item.id === "email");
const calendlyLink = socialLinks.find((item) => item.id === "calendly");
const footerLinks = socialLinks.filter(
  (link) => link.id !== "email" && link.id !== "calendly",
);

type RichSegment = string | { text: string; href: string };
type RichText = readonly RichSegment[];

type GroupedItem =
  | RichText
  | {
      label: RichText;
      points: readonly RichText[];
    };

type BodyParagraph =
  | RichText
  | {
      intro: RichText;
      items: readonly GroupedItem[];
    };

type HomeEntry = {
  title: string;
  paragraphs: readonly BodyParagraph[];
  href?: string;
  linkLabel?: string;
};

function InlineText({ content }: { content: RichText }) {
  return (
    <>
      {content.map((segment, index) => {
        if (typeof segment === "string") {
          return <Fragment key={index}>{segment}</Fragment>;
        }

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
      })}
    </>
  );
}

function renderGroupedItem(item: GroupedItem, itemIndex: number) {
  if (!Array.isArray(item)) {
    return (
      <div key={itemIndex} className="home__project-body-nested">
        <p className="home__project-body-sub">
          <InlineText content={item.label} />
        </p>
        {item.points.map((point, pointIndex) => (
          <p
            key={pointIndex}
            className="home__project-body-sub home__project-body-sub--nested"
          >
            <InlineText content={point} />
          </p>
        ))}
      </div>
    );
  }

  return (
    <p key={itemIndex} className="home__project-body-sub">
      <InlineText content={item} />
    </p>
  );
}

function BodyParagraphBlock({ paragraph }: { paragraph: BodyParagraph }) {
  if (Array.isArray(paragraph)) {
    return (
      <p>
        <InlineText content={paragraph} />
      </p>
    );
  }

  return (
    <div className="home__project-body-group">
      <p>
        <InlineText content={paragraph.intro} />
      </p>
      {paragraph.items.map(renderGroupedItem)}
    </div>
  );
}

const projects = [
  {
    title: "Admission Evaluation Agent",
    href: "https://admissions.raashishah.com",
    paragraphs: [
      "Academic instituitions process thousands of applications every year with a workflow spread across months and multiple humans",
      "Standardised this enterprise-grade agents made with Google's ADK. ", 
      "Fits right into the pipeline and uses decision-making context to qualify students",
      "Gave agents tools for making sense of data and grading it consistently",
      "Created a RAG for data lookups",
      "Telemetry to measure agent performance and cost - brought cost down to 15 cents per student",
      "Also processes past data for insights",
    ],
  },
  {
    title: "Expression - Animation Tool",
    paragraphs: [
      "Auto-colouring frames hand drawn by an animator, in a style called frame by frame animation.",
      "It's a repetitive step that artists dread but can't skip. All frames are coloured one by one. A one-minute 25fps shot has 1,500 frames.",
      "This problem remains unsolved worldwide",
      "So far I've parsed line art in a png file (universal input) 1:1, as the artist intended - first one to ever solve this step in the pipeline - it can work with any software that the artist uses",
      "My goal is for artists to retain full control while giving them better tools",
    ],
  },
  {
    title: "Offline Expo Navigation",
    href: "https://povindex.designpovindia.com/home",
    paragraphs: [
      "Web app for an architecture exhibition navigation",
      "Worked offline regardless of footfall",
      "Made most of this within 12 hours",
    ],
  },
] satisfies ReadonlyArray<HomeEntry>;

const workExperience = [
  {
    title: "OnDevice",
    href: "https://x.com/useondevice",
    linkLabel: "Visit OnDevice",
    paragraphs: [
      "2025",
      "Got back into building in AI",
      "Collaborated on a health app for diabetic patients that uses on-device inference.",
      [
        "Executed an early GTM plan by distributing Applied AI content on ",
        { text: "Twitter", href: "https://x.com/useondevice" },
        " and ",
        { text: "YouTube", href: "https://www.youtube.com/@raashi_shah" },
        ", got 4k+ pre-launch views.",
      ],
    ],
  },
  {
    title: "Pluto",
    href: "https://hub.xyz/pluto",
    linkLabel: "Visit Pluto",
    paragraphs: [
      "2021-2024",
      "Collaborated cross-functionaly with artists and transformed a creative studio into a product and tech-led team",
      {
        intro: "Launched 3 digital asset products:",
        items: [
          [
            "1. ",
            { text: "Magic Batch", href: "https://opensea.io/collection/magicbatch" },
            " - MVP",
          ],
          {
            label: [
              "2. ",
              { text: "Pluto", href: "https://opensea.io/collection/plutomisfits" },
            ],
            points: [
              [
                "First ever project to ",
                {
                  text: "introducing cross-platform payments",
                  href: "https://medium.com/pluto-misfits/introducing-interoperable-nft-minting-67f3af6d0f94",
                },
                " driving 37% sales growth YoY",
              ],
              "Increased retention by 82% through A/B-tested incentives",
            ],
          },
          [
            "3. ",
            {
              text: "Create Layer",
              href: "https://x.com/createlayer/status/1805623167538340046/video/1",
            },
            " - 500+ users generated 5k+ digital assets within 10 days, including some made with image-gen models",
          ],
        ],
      },
    ],
  },
  {
    title: "Kotak Securities",
    href: "https://www.kotaksecurities.com/platform/kotak-neo/",
    linkLabel: "Visit Kotak Neo",
    paragraphs: [
      "2021",
      [
        "Founding hire on ",
        {
          text: "Kotak Neo",
          href: "https://www.kotaksecurities.com/platform/kotak-neo/",
        },
        "'s product team (their consumer trading app)",
      ],
      "Short stint",
    ],
  },
  {
    title: "Kawa Space",
    href: "https://www.linkedin.com/company/kawaspace/",
    linkLabel: "Visit Kawa Space",
    paragraphs: [
      "2020",
      "Geospatial data analysis using machine learning in agriculture, rainfall, and population density",
      "Created a chatbot using Dialogflow for non-technical users to query data in NLP just by chatting - This was pre-GPT3",
    ],
  },
  {
    title: "Aula Education",
    href: "https://www.linkedin.com/company/aulaeducation/",
    linkLabel: "Visit Aula Education",
    paragraphs: [
      "2018-2019 in the UK",
      "Doubled engineering delivery speed by analysing user feedback and partnering with VP of Product to implement agile workflows",
      "Led customer success and engagement analytics for the team's largest portfolio, expanding from 1 to 3 universities across the UK and the US",
      "Boosted retention from 9.2% to 32% by designing a data-driven analytics toolkit that combined qualitative insights with quantitative usage data",
    ],
  },
] satisfies ReadonlyArray<HomeEntry>;

function ExternalLinkIcon() {
  return (
    <svg
      className="home__project-link-icon"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3.25 3.25H8.75M8.75 3.25V8.75M8.75 3.25L3.25 8.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ProjectLink({
  href,
  title,
  label = "View project",
}: {
  href: string;
  title: string;
  label?: string;
}) {
  return (
    <a
      href={href}
      className="home__project-link"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} for ${title} (opens in new tab)`}
    >
      <span>{label}</span>
      <ExternalLinkIcon />
    </a>
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

function ProjectListItem({ item }: { item: HomeEntry }) {
  return (
    <li className="home__project-item">
      <AnimatedDetails
        className="home__details"
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
          {item.href ? (
            <ProjectLink
              href={item.href}
              title={item.title}
              label={item.linkLabel}
            />
          ) : null}
        </div>
      </AnimatedDetails>
    </li>
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
          <h1 className="home__name">Raashi Shah</h1>
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
            <div className="home__project-groups">
              <ul className="home__project-list" aria-label="Projects">
                {projects.map((project) => (
                  <ProjectListItem key={project.title} item={project} />
                ))}
              </ul>
              <ul className="home__project-list" aria-label="Experience">
                {workExperience.map((role) => (
                  <ProjectListItem key={role.title} item={role} />
                ))}
              </ul>
            </div>
          </section>
        </div>

        <footer>
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
