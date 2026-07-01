const introRole = "Technical Product Manager, AI Engineer";
const introTagline = "Designing and developing apps and AI agents end-to-end";

export const siteConfig = {
  name: "Raashi Shah",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL ?? "https://raashishah.com",
  introRole,
  introTagline,
  description: `${introRole}, ${introTagline}`,
  creator: "Raashi Shah",
  twitterHandle: "@rash_driving",
} as const;

export function getSiteUrl() {
  return new URL(siteConfig.url);
}

export function absoluteUrl(path = "/") {
  return new URL(path, getSiteUrl()).toString();
}
