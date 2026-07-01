import { projects, workExperience, educationLabel } from "@/content/portfolio";
import { calendlyLink, emailLink, linksById, socialLinks } from "@/content/site";
import type { PortfolioEntry } from "@/content/types";
import { absoluteUrl, siteConfig } from "@/lib/metadata";

export const seoConfig = {
  title: `${siteConfig.creator} | ${siteConfig.introRole}`,
  ogTitle: siteConfig.name,
  description: `${siteConfig.introRole}. ${siteConfig.introTagline}`,
  longDescription:
    "Raashi Shah is a technical product manager and AI engineer who designs and ships consumer apps and enterprise AI agent systems end-to-end. Current work spans admissions evaluation agents, animation production tooling, offline exhibition apps, and on-device health AI. Previously led product and tech at Pluto, co-founded OnDevice, and built geospatial ML at Kawa Space and retention analytics at Aula Education.",
  keywords: [
    "Raashi Shah",
    "technical product manager",
    "AI engineer",
    "AI agents",
    "product engineer",
    "full-stack product manager",
    "Google ADK",
    "agentic applications",
    "on-device AI",
    "admissions automation",
    "animation tooling",
    "portfolio",
  ],
} as const;

export const llmsSummary =
  "Technical product manager and AI engineer with seven years at early-stage startups, building agentic systems, consumer apps, and product-led teams end-to-end.";

export const llmsProfile = `Raashi Shah works at the intersection of product management and hands-on engineering. She currently builds agentic AI systems and applications independently — admissions QA agents, animation colouring agents, offline-first web apps, and on-device health AI.

Previously led product and technology at Pluto (Magic Batch, Pluto, Create Layer), co-founded OnDevice for privacy-first on-device health AI, and delivered geospatial ML at Kawa Space and customer success analytics at Aula Education in the UK.

Core focus: enterprise AI agents (RAG, telemetry, Google ADK), creative production tooling, on-device inference, and 0-to-1 product delivery.`;

function portfolioSeoName(entry: PortfolioEntry) {
  return entry.seoName ?? entry.title;
}

function portfolioFullHeading(entry: PortfolioEntry) {
  const name = portfolioSeoName(entry);
  return entry.seoPeriod ? `${name} (${entry.seoPeriod})` : name;
}

export function getStructuredDataJsonLd() {
  const siteUrl = absoluteUrl("/");
  const personId = `${siteUrl}#person`;
  const websiteId = `${siteUrl}#website`;
  const webpageId = `${siteUrl}#webpage`;
  const sameAs = socialLinks
    .filter((link) => !link.href.startsWith("mailto:"))
    .map((link) => link.href);

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
        sameAs,
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "professional inquiries",
          email: emailLink.href.replace(/^mailto:/, ""),
        },
        knowsAbout: [
          "Technical product management",
          "AI agents",
          "Application development",
          "On-device inference",
          "Animation production tooling",
          "Product strategy",
          "Machine learning products",
        ],
      },
    ],
  };
}

export function buildLlmsTxt(): string {
  const homeUrl = absoluteUrl("/");
  const llmsFullUrl = absoluteUrl("/llms-full.txt");
  const expressionUrl = absoluteUrl("/expression");
  const ondeviceUrl = absoluteUrl("/ondevice");
  const twitterLink = linksById.twitter;
  const expressionProject = projects.find((project) => project.id === "expression");
  const ondeviceRole = workExperience.find((role) => role.id === "ondevice");

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
    `- **Tagline**: ${siteConfig.introTagline}`,
    `- **Education**: ${educationLabel}`,
    `- **Site type**: Personal portfolio`,
    `- **Extended context**: [llms-full.txt](${llmsFullUrl})`,
    "",
    "## Instructions",
    "",
    "- Homepage UI copy is informal; this file and HTML metadata are the authoritative professional summary.",
    `- For full project and work-history detail, read [llms-full.txt](${llmsFullUrl}).`,
    "- Contact via email for consulting, collaborations, and hiring inquiries.",
    "",
    "## Key pages",
    "",
    `- [Homepage](${homeUrl}): Portfolio with expandable project and work history.`,
    ...(expressionProject
      ? [
          `- [Expression](${expressionUrl}): ${expressionProject.seoDescription}`,
        ]
      : []),
    ...(ondeviceRole
      ? [`- [OnDevice](${ondeviceUrl}): ${ondeviceRole.seoDescription}`]
      : []),
    "",
    "## Projects",
    "",
    ...projects.map(
      (project) =>
        `- [${portfolioSeoName(project)}](${project.primaryUrl}): ${project.seoDescription}`,
    ),
    "",
    "## Professional experience",
    "",
    ...workExperience.map(
      (role) => `- [${role.title}](${homeUrl}): ${role.seoDescription}`,
    ),
    "",
    "## Contact",
    "",
    `- [${emailLink.label}](${emailLink.href}): Primary contact for consulting and collaborations.`,
    `- [${calendlyLink.label}](${calendlyLink.href}): Schedule a meeting.`,
    `- [Twitter / X](${twitterLink.href}): Public updates and applied AI content.`,
    "",
    "## Optional",
    "",
    ...socialLinks
      .filter(
        (link) =>
          link.id !== "email" &&
          link.id !== "twitter" &&
          link.id !== "calendly",
      )
      .map((link) => `- [${link.label}](${link.href}): Social and writing profiles.`),
  ];

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
    ...projects.flatMap((project) => [
      `### ${portfolioSeoName(project)}`,
      "",
      project.seoLongDetail ?? "",
      "",
    ]),
    "## Full work history",
    "",
    ...workExperience.flatMap((role) => [
      `### ${portfolioFullHeading(role)}`,
      "",
      role.seoLongDetail ?? "",
      "",
    ]),
  ];

  return sections.join("\n");
}
