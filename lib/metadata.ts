export const siteConfig = {
  name: "Raashi Shah",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL ?? "https://raashishah.com",
  title: "apps and ai tools designer and engineer",
  description: "Originally a product manager. Now I design and build apps and AI tools end to end.",
  creator: "Raashi Shah",
  twitterHandle: "@rash_driving",
} as const;

export function getSiteUrl() {
  return new URL(siteConfig.url);
}

export function absoluteUrl(path = "/") {
  return new URL(path, getSiteUrl()).toString();
}

export const shareImageBasePalette = {
  bg: "#ffffff",
  text: "#111010",
} as const;
