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
    paragraphs: [
      "Schools get thousands of applications every year but only a percentage of available seats. Today these applications are assessed largely with humans. I made enterprise grade agents that fit right into the pipeline and use decision making context to rank leads.",
      "The project gave agents tools for making sense of data and grading it consistently, used RAG for data lookups, and telemetry to measure agent performance and cost — all tied together with Google's ADK. A task that would spread across weeks and multiple humans was standardised with agentic AI.",
      "My first project as an end-to-end application developer. After seven years as a product manager in technical roles, I wanted to make something challenging — only then would it be fun.",
    ],
  },
  {
    title: "Expression",
    paragraphs: [
      "Expression automates colouring for frames hand drawn by the artist, in a style called frame by frame animation.",
      "It's a repetitive step that artists dread but can't skip — no tools today offer to do this at scale. All frames are coloured one by one. A one-minute 25fps shot has 1,500 frames.",
      "This problem remains unsolved worldwide. So far I've solved parsing PNG line art as a universal output for the first step of the animating process, 1:1, as the artist intended.",
    ],
  },
  {
    title: "Offline Exhibition Navigation Web App",
    paragraphs: [
      "Exhibition navigation that is ultra smooth and works offline. Made in 12 hours.",
      "Easy problems don't excite me, so I made this interesting by making it work offline at the exhibition floor.",
    ],
  },
  {
    title: "Pluto",
    paragraphs: [
      "Head of Product, 2021–2024. I transformed a non-technical art studio into a tech and product-led company.",
      "Worked with engineers, designers, artists, and marketers. Turned a crypto wallet into a product people actually used daily.",
      "The hard part wasn't the tech. It was making a creative studio think in products.",
    ],
  },
  {
    title: "Kotak Securities",
    paragraphs: [
      "Product, 2020. A brief stint in a corporate environment on the Kotak Securities neo app.",
      "Finance UX at scale — every tap has compliance behind it.",
    ],
  },
  {
    title: "Kawa Space",
    paragraphs: [
      "Product, 2019. I made ML models using geospatial data.",
      "To make it accessible to non-technical users, we used Dialogflow so you could talk to it directly and ask for any inferences you needed.",
      "First taste of hardware-adjacent product work.",
    ],
  },
  {
    title: "Aula Education",
    paragraphs: [
      "Engagement Associate, 2018–2019. Worked on an LMS with a Facebook-like community.",
      "I wasn't in a product role, but in client relationships I identified gaps in the engineering pipeline and made it faster. Improved efficiency of solving bugs.",
      "Learned that adoption beats features in EdTech.",
    ],
  },
] as const;

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

  return (
    <a
      href={href}
      className={className}
      target={isMailto ? undefined : "_blank"}
      rel={isMailto ? undefined : "noopener noreferrer"}
    >
      {label}
    </a>
  );
}

export function SimpleHome() {
  return (
    <main className="home">
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
          <p className="home__line">{siteConfig.introRole}</p>
          <p className="home__line">{siteConfig.introTagline}</p>
        </section>

        <section className="home__projects" aria-label="Projects">
          <ul className="home__project-list">
            {projects.map((project) => (
              <li key={project.title} className="home__project-item">
                <details className="home__details">
                  <summary className="home__project-title">
                    {project.title}
                  </summary>
                  <div className="home__project-body">
                    {project.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </details>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <footer className="home__footer">
        <nav className="home__footer-nav" aria-label="Social links">
          {footerLinks.map((link) => (
            <SocialAnchor
              key={link.id}
              href={link.href}
              label={link.label}
              className="home__link"
            />
          ))}
        </nav>
      </footer>
    </main>
  );
}
