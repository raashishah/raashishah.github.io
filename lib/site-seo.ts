import { projects, workExperience } from "@/content/portfolio";
import { emailLink, socialLinks } from "@/content/site";
import { absoluteUrl, siteConfig } from "@/lib/metadata";

export const seoConfig = {
  title: `${siteConfig.creator} | ${siteConfig.introRole}`,
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

export const llmsProfile = `Raashi Shah works at the intersection of product management and hands-on engineering. She has led cross-functional teams at Pluto, Kawa Space, and Aula Education, and currently builds agentic systems and applications independently.

Core focus areas: enterprise AI agents (admissions evaluation, RAG, telemetry), creative tooling (Expression frame-by-frame animation coloring), offline-first web apps, on-device inference, and 0-to-1 product delivery.`;

function portfolioSeoName(entry: (typeof projects)[number] | (typeof workExperience)[number]) {
  return "seoName" in entry && entry.seoName ? entry.seoName : entry.title;
}

function portfolioFullHeading(
  entry: (typeof projects)[number] | (typeof workExperience)[number],
) {
  const name = portfolioSeoName(entry);
  return "seoPeriod" in entry && entry.seoPeriod ? `${name} (${entry.seoPeriod})` : name;
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
  const twitterLink = socialLinks.find((link) => link.id === "twitter")!;

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
    `- [Twitter / X](${twitterLink.href}): Public updates and applied AI content.`,
    `- [Homepage](${homeUrl}): Portfolio with expandable project and work history.`,
    "",
    "## Optional",
    "",
    ...socialLinks
      .filter((link) => link.id !== "email" && link.id !== "twitter")
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
