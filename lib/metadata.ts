export const siteConfig = {
  name: "Raashi Shah",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL ?? "https://raashishah.com",
  title: "apps and ai tools designer and engineer",
  introRole: "Originally a Technical Product Manager",
  introTagline: "Now designing and developing apps and AI agents",
  description:
    "Originally a Technical Product Manager. Now designing and developing apps and AI agents.",
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
  text: "#1d1d1f",
} as const;
