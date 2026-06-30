import type { PortfolioEntry } from "./types";

export const projects = [
  {
    id: "admissions-agent",
    title: "Entreprise-grade Agents",
    seoName: "Admission Evaluation Agent",
    primaryUrl: "https://admissions.raashishah.com",
    seoDescription:
      "Enterprise admissions QA agent that grades applicants against custom rubrics, with RAG lookups, performance telemetry, and sub-$0.20 cost per student using Google ADK.",
    seoLongDetail:
      "Academic institutions process thousands of applications across months and multiple reviewers. This system standardizes enterprise-grade agents that fit into existing pipelines and use decision-making context to qualify students consistently. Includes RAG for data lookups, agent performance and cost telemetry (approximately fifteen cents per student), and integration with Google's Agent Development Kit (ADK).",
    paragraphs: [
      [
        {
          text: "Admissions evaluation agent",
          href: "https://admissions.raashishah.com",
        },
      ],
      {
        text: "Admission applications processes for academic institutions",
        pullquote: true,
      },
    ],
  },
  {
    id: "expression",
    title: "Professional Tool for Animators",
    seoName: "Expression",
    primaryUrl: "https://raashishah.com",
    seoDescription:
      "Animation production tool that automates frame-by-frame coloring from PNG line art while preserving artist control and 1:1 parsing fidelity.",
    seoLongDetail:
      "Expression automates coloring for hand-drawn frames in traditional frame-by-frame animation. Artists color each frame individually; a one-minute shot at 25fps is roughly 1,500 frames. Expression parses PNG line art with 1:1 fidelity as the artist intended, compatible with any drawing software, so artists retain full control while skipping repetitive work.",
    paragraphs: [
      [
        {
          text: "Auto-colouring for hand drawn animation",
          href: "https://github.com/raashishah/colourer",
        },
      ],
      {
        text: "This problem remains unsolved worldwide",
        pullquote: true,
      },
    ],
  },
  {
    id: "offline-expo-nav",
    title: "Offline Expo Navigation",
    seoName: "Offline Exhibition Navigation",
    primaryUrl: "https://povindex.designpovindia.com/home",
    seoDescription:
      "Offline-capable exhibition navigation web app built for high footfall environments.",
    seoLongDetail:
      "Web application for exhibition wayfinding that remains usable offline regardless of venue footfall or connectivity.",
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
] as const satisfies ReadonlyArray<PortfolioEntry>;

export const workExperience = [
  {
    id: "pluto",
    title: "Pluto",
    seoPeriod: "2021–2024",
    seoDescription:
      "Head of Product and Tech; launched Magic Batch, Pluto, and Create Layer; drove cross-platform payments and retention growth.",
    seoLongDetail:
      "Collaborated with artists and transformed a creative studio into a product- and technology-led organization. Launched Magic Batch (MVP), Pluto (cross-platform payments driving 37% sales growth YoY; 82% retention lift via A/B-tested incentives), and Create Layer (500+ users, 5,000+ assets in ten days). Owned end-to-end product delivery.",
    paragraphs: [
      [
        {
          text: "Pluto",
          href: "https://medium.com/pluto-misfits/introducing-interoperable-nft-minting-67f3af6d0f94",
        },
        " · ",
        { text: "Magic Batch", href: "https://opensea.io/collection/magicbatch" },
        " · ",
        {
          text: "Create",
          href: "https://x.com/createlayer/status/1805623167538340046/video/1",
        },
      ],
      {
        text: "Transformed a creative studio into a product led team",
        pullquote: true,
      },
    ],
  },
  {
    id: "ondevice",
    title: "OnDevice",
    seoPeriod: "2025",
    seoDescription:
      "Co-founder and product lead for a privacy-first health app using on-device inference; early GTM via applied AI content.",
    seoLongDetail:
      "Returned to hands-on AI building. Collaborated on a diabetic health app using on-device inference. Executed early go-to-market through applied AI content on Twitter and YouTube with 4,000+ pre-launch views.",
    paragraphs: [
      [
        "Distributed Applied AI content on ",
        { text: "Twitter", href: "https://x.com/useondevice" },
      ],
      {
        text: "Designed a health app for diabetic patients",
        pullquote: true,
      },
    ],
  },
  {
    id: "kawa-space",
    title: "Kawa Space",
    seoPeriod: "2020",
    seoDescription:
      "Geospatial ML products and NLP chatbot for non-technical data queries (pre-GPT era).",
    seoLongDetail:
      "Geospatial ML for agriculture, rainfall, and population density. Built a Dialogflow chatbot so non-technical users could query datasets in natural language before GPT-3 era tooling.",
    paragraphs: [
      [
        {
          text: "Geospatial data ML models",
          href: "https://www.linkedin.com/company/kawaspace/",
        },
      ],
      {
        text: "Chatbot for users to get inference simply by asking, made before GPT3",
        pullquote: true,
      },
    ],
  },
  {
    id: "aula-education",
    title: "Aula Education",
    seoPeriod: "2018–2019, UK",
    seoDescription:
      "Customer success and analytics in UK higher ed; improved retention from 9.2% to 32%.",
    seoLongDetail:
      "Doubled engineering delivery speed via agile workflow changes with VP of Product. Led customer success analytics across UK and US universities. Improved retention from 9.2% to 32% with a combined qualitative and quantitative analytics toolkit.",
    paragraphs: [
      [
        {
          text: "Client relationships in the UK and the US",
          href: "https://www.linkedin.com/company/aulaeducation/",
        },
      ],
      {
        text: "Optimised engineering workflows and doubled delivery speed",
        pullquote: true,
      },
    ],
  },
] as const satisfies ReadonlyArray<PortfolioEntry>;

export const homepageProjects = projects;
export const homepageWorkExperience = workExperience;

export const educationLabel = "BSc in Product, Aston, UK";
