import { AnimatedDetails } from "@/components/AnimatedDetails";
import { socialLinks } from "@/content/site";
import { siteConfig } from "@/lib/metadata";

const headerLinks = ["email", "calendly"].flatMap((id) => {
  const link = socialLinks.find((item) => item.id === id);
  return link ? [link] : [];
});
const footerLinks = socialLinks.filter(
  (link) => link.id !== "email" && link.id !== "calendly",
);

type GroupedItem =
  | string
  | {
      label: string;
      points: readonly string[];
    };

type BodyParagraph =
  | string
  | {
      intro: string;
      items: readonly GroupedItem[];
    };

function renderGroupedItem(item: GroupedItem, itemIndex: number) {
  if (typeof item === "string") {
    return (
      <p key={itemIndex} className="home__project-body-sub">
        {item}
      </p>
    );
  }

  return (
    <div key={itemIndex} className="home__project-body-nested">
      <p className="home__project-body-sub">{item.label}</p>
      {item.points.map((point, pointIndex) => (
        <p
          key={pointIndex}
          className="home__project-body-sub home__project-body-sub--nested"
        >
          {point}
        </p>
      ))}
    </div>
  );
}

function BodyParagraphBlock({
  paragraph,
  index,
}: {
  paragraph: BodyParagraph;
  index: number;
}) {
  if (typeof paragraph === "string") {
    return <p>{paragraph}</p>;
  }

  return (
    <div className="home__project-body-group">
      <p>{paragraph.intro}</p>
      {paragraph.items.map(renderGroupedItem)}
    </div>
  );
}

const projects = [
  {
    title: "Admission Evaluation Agent",
    href: "https://admissions.raashishah.com",
    paragraphs: [
      "Academic instituitions process thousands of applications every year with a workflow spread across weeks and multiple humans",
      "Standardised this enterprise-grade agents that fit right into the pipeline and use decision-making context to qualify students",
      "Gave agents tools for making sense of data and grading it consistently",
      "Did a RAG for data lookups",
      "Telemetry to measure agent performance and cost - brought cost down to 15 cents per student",
      "Tied together with Google's ADK",
      Can also process past data    ],
  },
  {
    title: "Expression - Animation tool",
    paragraphs: [
      "Expression automates colouring for frames hand drawn by the artist, in a style called frame by frame animation.",
      "It's a repetitive step that artists dread but can't skip. All frames are coloured one by one. A one-minute 25fps shot has 1,500 frames.",
      "This problem remains unsolved worldwide",
      "Parsing PNG line art (universal input) 1:1, as the artist intended - first one to ever solve this step in the pipeline - it can work with any software that the artist uses",
      "My goal is for artists to retain full control while giving them better tools",
    ],
  },
  {
    title: "Offline Expo Navigation",
    href: "https://povindex.designpovindia.com/home",
    paragraphs: [
      "Web app for exhibition navigation",
      "Worked offline regardless of footfall",
      "Made most of this within 12 hours",
    ],
  },
] satisfies ReadonlyArray<{
  title: string;
  paragraphs: readonly BodyParagraph[];
  href?: string;
}>;

const workExperience = [
  {
    title: "OnDevice",
    paragraphs: [
      "2025",
      "Got back into building in AI",
      "Collaborated on a health app for diabetic patients that uses on-device inference.",
      "Executed an early GTM plan by distributing Applied AI content on Twitter and YouTube, got 4k+ pre-launch views.",
    ],
  },
  {
    title: "Pluto",
    paragraphs: [
      "2021-2024",
      "Collaborated cross-functionaly with artists and transformed a creative studio into a product and tech-led team",
      {
        intro: "Launched 3 digital asset products:",
        items: [
          "1. Magic Batch - MVP",
          {
            label: "2. Pluto",
            points: [
              "First ever project to introducing cross-platform payments driving 37% sales growth YoY",
              "Increased retention by 82% through A/B-tested incentives",
            ],
          },
          "3. Create Layer - 500+ users generated 5k+ digital assets within 10 days, including some made with image-gen models",
        ],
      },
      "Owned end-to-end product delivery",
    ],
  },
  {
    title: "Kotak Securities",
    paragraphs: [
      "2021",
      "Founding hire on Kotak Neo's product team (their consumer trading app)",
      "Short stint",
    ],
  },
  {
    title: "Kawa Space",
    paragraphs: [
      "2020",
      "Geospatial data analysis using machine learning in agriculture, rainfall, and population density",
      "Created a chatbot using Dialogflow for non-technical users to query data in NLP just by chatting - This was pre-GPT3",
    ],
  },
  {
    title: "Aula Education",
    paragraphs: [
      "2018-2019",
      "Led customer success and engagement analytics for the team's largest portfolio, expanding from 1 to 3 universities across the UK and the US.",
      "Boosted retention from 9.2% to 32% by designing a data-driven analytics toolkit that combined qualitative insights with quantitative usage data.",
      "Doubled engineering delivery speed by analysing user feedback and partnering with VP of Product to implement agile workflows.",
    ],
  },
] satisfies ReadonlyArray<{
  title: string;
  paragraphs: readonly BodyParagraph[];
  href?: string;
}>;

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

function ProjectLink({ href, title }: { href: string; title: string }) {
  return (
    <a
      href={href}
      className="home__project-link"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View ${title} (opens in new tab)`}
    >
      <span>View project</span>
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

function ProjectListItem({
  item,
}: {
  item: {
    title: string;
    paragraphs: readonly BodyParagraph[];
    href?: string;
  };
}) {
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
            <BodyParagraphBlock key={index} paragraph={paragraph} index={index} />
          ))}
          {item.href ? (
            <ProjectLink href={item.href} title={item.title} />
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
          <nav className="home__header-nav" aria-label="Contact">
            {headerLinks.map((link) => (
              <SocialAnchor
                key={link.id}
                href={link.href}
                label={link.label}
                className="home__link"
              />
            ))}
          </nav>
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
