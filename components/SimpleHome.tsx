import { AnimatedDetails } from "@/components/AnimatedDetails";
import { socialLinks } from "@/content/site";
import { siteConfig } from "@/lib/metadata";

const headerLinks = ["email", "twitter"].flatMap((id) => {
  const link = socialLinks.find((item) => item.id === id);
  return link ? [link] : [];
});
const footerLinks = socialLinks.filter(
  (link) => link.id !== "email" && link.id !== "twitter",
);

const projects = [
  {
    title: "School Admissions Assessment Agent",
    href: "https://admissions.raashishah.com",
    paragraphs: [
      "Schools get thousands of applications every year, but only a fraction of those become available seats. Today these applications are assessed largely by humans.",
      "Enterprise-grade agents that fit right into the pipeline and use decision-making context to qualify students.",
      "The project gave agents tools for making sense of data and grading it consistently, used RAG for data lookups, and telemetry to measure agent performance and cost — all tied together with Google's ADK. A task that would spread across weeks and multiple humans was standardised with agentic AI.",
    ],
  },
  {
    title: "Expression",
    paragraphs: [
      "Expression automates colouring for frames hand drawn by the artist, in a style called frame by frame animation.",
      "It's a repetitive step that artists dread but can't skip - no tools today offer to do this at scale. All frames are coloured one by one. A one-minute 25fps shot has 1,500 frames.",
      "This problem remains unsolved worldwide. So far I've solved parsing PNG line art (universal input) 1:1, as the artist intended.",
    ],
  },
  {
    title: "Offline Expo Navigation",
    href: "https://povindex.designpovindia.com/home",
    paragraphs: [
      "Exhibition navigation web app.",
      "Works offline regardless of footfall.",
      "Made in 12 hours.",
    ],
  },
] satisfies ReadonlyArray<{
  title: string;
  paragraphs: readonly string[];
  href?: string;
}>;

const workExperience = [
  {
    title: "OnDevice",
    paragraphs: [
      "2025",
      "Got back into building AI.",
      "Collaborated on a health app for diabetic patients that uses on-device inference.",
      "Executed an early GTM plan by distributing Applied AI content on Twitter/X and YouTube, securing 4k+ pre-launch views.",
    ],
  },
  {
    title: "Pluto",
    paragraphs: [
      "2021–2024",
      "Transformed a creative studio into a tech-led team by reorganising and hiring talent, introducing agile sprints and product-first thinking.",
      "Launched a 3-stage product suite: Magic Batch — MVP for digital asset sales; Pluto — drove 27% sales growth YoY by introducing cross-platform payments and 82% retention through A/B-tested incentives; Create — enabled 500+ users to generate 5k+ digital assets in 10 days, partly via integrated vision model workflows.",
      "Drove end-to-end product delivery by collaborating cross-functionally with 20+ engineers, designers, artists, marketers, a PM, and executives.",
    ],
  },
  {
    title: "Kotak Securities",
    paragraphs: [
      "2021",
      "Short product role stint.",
    ],
  },
  {
    title: "Kawa Space",
    paragraphs: [
      "2020",
      "Geospatial data using machine learning in agriculture, rainfall, population density.",
      "Created a chatbot using Dialogflow for non-technical users to get inferences just by chatting.",
    ],
  },
  {
    title: "Aula Education",
    paragraphs: [
      "2018–2019",
      "Led customer success and engagement analytics for the team's largest portfolio, expanding from 1 to 3 universities across the UK and the US.",
      "Boosted retention from 9.2% to 32% by designing a data-driven analytics toolkit that combined qualitative insights with quantitative usage data.",
      "Doubled engineering delivery speed by analysing user feedback and partnering with VP of Product to implement agile workflows.",
    ],
  },
] satisfies ReadonlyArray<{
  title: string;
  paragraphs: readonly string[];
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
    paragraphs: readonly string[];
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
          {item.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
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
