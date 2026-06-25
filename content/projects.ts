import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "admissions",
    title: "JBCN Admissions",
    tagline: "Enterprise agents for school admissions",
    insight: "Schools get thousands of applications but only a percentage of seats. I made agents that fit the pipeline.",
    story: [
      "Schools get thousands of applications every year but, they have only a percentage of available seats. Today these applications are assessed largely with humans. I made enterprise grade Agents that would fit right into the pipeline and use decision making context to rank leads.",
      "This project gave agents tools for making sense of data and grading it consistently, used RAG for data lookups, telemetry to measure agent metrics such performance and cost, all tied together with Google's ADK. A task that would spread across weeks and multiple humans was now standardised with agentic AI.",
      "My first project as an end-to-end application developer. After spending 7 years being a product manager in technical roles, I wanted to make something that was challenging 'cause only then would it be fun.",
    ],
    href: "https://admissions.raashishah.com",
    status: "live",
    scene: "admissions",
    type: "project",
  },
  {
    slug: "expression",
    title: "Expression",
    tagline: "Hand drawn animation, coloured automatically",
    insight: "Artists dread colouring frames. Nobody's solved it at scale. I'm working on it.",
    story: [
      "Expression automates colouring for frames hand drawn by the artist, in a style called frame by frame animation.",
      "It's a repetitive, boring step that artists dread but can't skip since no tools today offer to do this. All frames are also coloured one by one. A 1 min 25fps shot has 1500 frames.",
      "This problem remains unsolved all over the world. So far I have solved a problem in the pipeline where I am able to parse a png line art a universal output for the first step of the animating process, 1:1, as the artist intended.",
    ],
    status: "building",
    scene: "expression",
    type: "project",
  },
  {
    slug: "design-pov",
    title: "Design POV",
    tagline: "Exhibition navigation, offline",
    insight: "Made in 12 hours. Works offline at the exhibition floor.",
    story: [
      "Exhibition navigation that is ultra smooth and works offline. Made in 12 hrs.",
      "Easy problems don't excite me, so I made this interesting for myself by making it work offline at the exhibition floor.",
    ],
    href: "https://povindex.designpovindia.com",
    status: "live",
    scene: "design-pov",
    type: "project",
  },
  {
    slug: "pluto",
    title: "Pluto",
    tagline: "Head of Product · 2021–2024",
    insight: "I transformed a non technical, art studio into a tech and product led company.",
    story: [
      "Worked with a bunch of engineers, designers, artists, marketers. Turned a crypto wallet into a product people actually used daily.",
      "The hard part wasn't the tech. It was making a creative studio think in products.",
    ],
    status: "role",
    scene: "pluto",
    type: "work",
  },
  {
    slug: "kawa",
    title: "Kawa Space",
    tagline: "Product · 2019",
    insight: "ML models on geospatial data, accessible through Dialogflow. Back in 2020.",
    story: [
      "I made ML models using geospatial data. And to make it accessible to non-technical users, we used Dialogflow so you could directly talk to it and ask it for any inferences you needed.",
      "First taste of hardware-adjacent product work.",
    ],
    status: "role",
    scene: "kawa",
    type: "work",
  },
  {
    slug: "aula",
    title: "Aula",
    tagline: "Engagement Associate · 2018–2019",
    insight: "I wasn't in product, but I found gaps in the engineering pipeline and made it faster.",
    story: [
      "Working on this LMS but it was a facebook like community. Here I actually didn't have a product role but since I was in client relationships, I identified gaps in the engineering pipeline and made it faster. Improved efficiency of solving bugs.",
      "Learned that adoption beats features in EdTech.",
    ],
    status: "role",
    scene: "aula",
    type: "work",
  },
  {
    slug: "kotak",
    title: "Kotak Neo",
    tagline: "Product · 2020",
    insight: "Finance UX at scale. Every tap has compliance behind it.",
    story: [
      "Did a brief stint in a corporate environment, Kotak Securities neo app.",
      "Finance UX at scale, every tap has compliance behind it.",
    ],
    status: "role",
    scene: "kotak",
    type: "work",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const projectSlugs = projects.map((p) => p.slug);
