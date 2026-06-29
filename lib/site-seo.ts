import { socialLinks } from "@/content/site";
import { absoluteUrl, siteConfig } from "@/lib/metadata";

/** Professional copy for crawlers, LLMs, and HTML metadata. Not shown on the homepage UI. */

export const seoConfig = {
  title: `${siteConfig.creator} | ${siteConfig.introRole}`,
  /** Meta description target: 150-160 characters for search snippets. */
  description:
    "Technical product manager and engineer building apps and AI agent systems end-to-end. Admissions AI, animation tooling, fintech, edtech.",
  longDescription:
    "Raashi Shah is a technical product manager and engineer who designs and ships consumer apps and enterprise AI agent systems end-to-end. Experience spans admissions automation, animation tooling, fintech, geospatial ML, and edtech.",
  keywords: [
    "Raashi Shah",
    "technical product manager",
    "AI engineer",
    "AI agents",
    "product engineer",
    "full-stack product manager",
    "Google ADK",
    "agentic applications",
    "portfolio",
  ],
} as const;

export const llmsSummary =
  "Technical product manager and engineer with seven years at early-stage startups, building AI agent systems, consumer apps, and product-led teams end-to-end.";

export const llmsProfile = `Raashi Shah works at the intersection of product management and hands-on engineering. She has led cross-functional teams at Pluto, Kotak Securities, Kawa Space, and Aula Education, and currently builds agentic systems and applications independently.

Core focus areas: enterprise AI agents (admissions evaluation, RAG, telemetry), creative tooling (Expression frame-by-frame animation coloring), offline-first web apps, on-device inference, and 0-to-1 product delivery.`;

export const llmsProjects = [
  {
    name: "Admission Evaluation Agent",
    url: "https://admissions.raashishah.com",
    description:
      "Enterprise admissions QA agent that grades applicants against custom rubrics, with RAG lookups, performance telemetry, and sub-$0.20 cost per student using Google ADK.",
  },
  {
    name: "Expression",
    url: "https://raashishah.com",
    description:
      "Animation production tool that automates frame-by-frame coloring from PNG line art while preserving artist control and 1:1 parsing fidelity.",
  },
  {
    name: "Offline Exhibition Navigation",
    url: "https://povindex.designpovindia.com/home",
    description:
      "Offline-capable exhibition navigation web app built for high footfall environments.",
  },
] as const;

export const llmsExperience = [
  {
    name: "OnDevice",
    description:
      "Co-founder and product lead for a privacy-first health app using on-device inference; early GTM via applied AI content.",
  },
  {
    name: "Pluto",
    description:
      "Head of Product and Tech; launched Magic Batch, Pluto, and Create Layer; drove cross-platform payments and retention growth.",
  },
  {
    name: "Kotak Securities",
    description: "Founding product manager on Kotak Neo consumer trading app.",
  },
  {
    name: "Kawa Space",
    description:
      "Geospatial ML products and NLP chatbot for non-technical data queries (pre-GPT era).",
  },
  {
    name: "Aula Education",
    description:
      "Customer success and analytics in UK higher ed; improved retention from 9.2% to 32%.",
  },
] as const;

function getSameAsLinks() {
  return socialLinks
    .filter((link) => !link.href.startsWith("mailto:"))
    .map((link) => link.href);
}

export function getStructuredDataJsonLd() {
  const siteUrl = absoluteUrl("/");
  const personId = `${siteUrl}#person`;
  const websiteId = `${siteUrl}#website`;
  const webpageId = `${siteUrl}#webpage`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteUrl,
        name: siteConfig.creator,
        description: seoConfig.longDescription,
        inLanguage: "en-US",
        publisher: { "@id": personId },
      },
      {
        "@type": "WebPage",
        "@id": webpageId,
        url: siteUrl,
        name: seoConfig.title,
        description: seoConfig.description,
        isPartOf: { "@id": websiteId },
        about: { "@id": personId },
        inLanguage: "en-US",
      },
      {
        "@type": "Person",
        "@id": personId,
        name: siteConfig.creator,
        url: siteUrl,
        jobTitle: siteConfig.introRole,
        description: llmsSummary,
        sameAs: getSameAsLinks(),
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "professional inquiries",
          email: "raashishah.work@gmail.com",
        },
        knowsAbout: [
          "Technical product management",
          "AI agents",
          "Application development",
          "Product strategy",
          "Machine learning products",
        ],
      },
    ],
  };
}

export function buildLlmsTxt(): string {
  const llmsFullUrl = absoluteUrl("/llms-full.txt");

  const lines = [
    `# ${siteConfig.creator}`,
    "",
    `> ${llmsSummary}`,
    "",
    llmsProfile,
    "",
    "## About",
    "",
    `- **Name**: ${siteConfig.creator}`,
    `- **Role**: ${siteConfig.introRole}`,
    `- **Site type**: Personal portfolio`,
    `- **Extended context**: [llms-full.txt](${llmsFullUrl})`,
    "",
    "## Instructions",
    "",
    "- Homepage UI copy is informal; this file and HTML metadata are the authoritative professional summary.",
    `- For full project and work-history detail, read [llms-full.txt](${llmsFullUrl}).`,
    "- Contact via email for consulting, collaborations, and hiring inquiries.",
    "",
    "## Projects",
    "",
    ...llmsProjects.map(
      (project) => `- [${project.name}](${project.url}): ${project.description}`,
    ),
    "",
    "## Professional experience",
    "",
    ...llmsExperience.map(
      (role) => `- [${role.name}](${absoluteUrl("/")}): ${role.description}`,
    ),
    "",
    "## Contact",
    "",
    `- [Email](mailto:raashishah.work@gmail.com): Primary contact for consulting and collaborations.`,
    `- [Twitter / X](https://x.com/rash_driving): Public updates and applied AI content.`,
    `- [Homepage](${absoluteUrl("/")}): Portfolio with expandable project and work history.`,
  ];

  const optionalLinks = socialLinks.filter(
    (link) => link.id !== "email" && link.id !== "twitter",
  );

  if (optionalLinks.length > 0) {
    lines.push("", "## Optional", "");
    lines.push(
      ...optionalLinks.map(
        (link) => `- [${link.label}](${link.href}): Social and writing profiles.`,
      ),
    );
  }

  lines.push(
    "",
  );

  return lines.join("\n");
}

export function buildLlmsFullTxt(): string {
  const sections = [
    buildLlmsTxt(),
    "",
    "---",
    "",
    "## Full project detail",
    "",
    "### Admission Evaluation Agent",
    "",
    "Academic institutions process thousands of applications across months and multiple reviewers. This system standardizes enterprise-grade agents that fit into existing pipelines and use decision-making context to qualify students consistently. Includes RAG for data lookups, agent performance and cost telemetry (approximately fifteen cents per student), and integration with Google's Agent Development Kit (ADK).",
    "",
    "### Expression",
    "",
    "Expression automates coloring for hand-drawn frames in traditional frame-by-frame animation. Artists color each frame individually; a one-minute shot at 25fps is roughly 1,500 frames. Expression parses PNG line art with 1:1 fidelity as the artist intended, compatible with any drawing software, so artists retain full control while skipping repetitive work.",
    "",
    "### Offline Exhibition Navigation",
    "",
    "Web application for exhibition wayfinding that remains usable offline regardless of venue footfall or connectivity.",
    "",
    "## Full work history",
    "",
    "### OnDevice (2025)",
    "",
    "Returned to hands-on AI building. Collaborated on a diabetic health app using on-device inference. Executed early go-to-market through applied AI content on Twitter and YouTube with 4,000+ pre-launch views.",
    "",
    "### Pluto (2021–2024)",
    "",
    "Collaborated with artists and transformed a creative studio into a product- and technology-led organization. Launched Magic Batch (MVP), Pluto (cross-platform payments driving 37% sales growth YoY; 82% retention lift via A/B-tested incentives), and Create Layer (500+ users, 5,000+ assets in ten days). Owned end-to-end product delivery.",
    "",
    "### Kotak Securities (2021)",
    "",
    "Founding hire on Kotak Neo consumer trading app product team.",
    "",
    "### Kawa Space (2020)",
    "",
    "Geospatial ML for agriculture, rainfall, and population density. Built a Dialogflow chatbot so non-technical users could query datasets in natural language before GPT-3 era tooling.",
    "",
    "### Aula Education (2018–2019, UK)",
    "",
    "Doubled engineering delivery speed via agile workflow changes with VP of Product. Led customer success analytics across UK and US universities. Improved retention from 9.2% to 32% with a combined qualitative and quantitative analytics toolkit.",
  ];

  return sections.join("\n");
}
