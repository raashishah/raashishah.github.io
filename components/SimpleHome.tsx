const expandableProjects = [
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
] as const;

const listedProjects = [
  "Pluto",
  "Kotak Securities",
  "Kawa Space",
  "Aula Education",
] as const;

export function SimpleHome() {
  return (
    <main className="home">
      <section className="home__intro" aria-label="About">
        <h1 className="home__name">Raashi Shah</h1>
        <p className="home__line">Originally a Technical Product Manager</p>
        <p className="home__line">
          Now designing and developing apps and AI agents
        </p>
      </section>

      <section className="home__projects" aria-label="Projects">
        <ul className="home__project-list">
          {expandableProjects.map((project) => (
            <li key={project.title} className="home__project-item">
              <details className="home__details">
                <summary className="home__project-title">{project.title}</summary>
                <div className="home__project-body">
                  {project.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </details>
            </li>
          ))}
          {listedProjects.map((title) => (
            <li key={title} className="home__project-item home__project-item--plain">
              <span className="home__project-title">{title}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
