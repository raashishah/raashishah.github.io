export const siteConfig = {
  name: "rashOS",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL ?? "https://raashishah.com",
  title: "strategy, shipped like software.",
  description: "PM who builds. Direct, a little funny, work speaks louder than the bio.",
  creator: "Raashi Shah",
  twitterHandle: "@_RaashiShah",
} as const;

export function getSiteUrl() {
  return new URL(siteConfig.url);
}

export function absoluteUrl(path = "/") {
  return new URL(path, getSiteUrl()).toString();
}

export const shareImageBasePalette = {
  bg: "#f6f3ed",
  panel: "#efebe4",
  text: "#2c2620",
  muted: "#6f675f",
  accent: "#6f63d9",
} as const;

export const shareImageProjectPalettes = {
  admissions: {
    bg: "#172445",
    panel: "#21325a",
    text: "#eef2ff",
    muted: "#b7c4e4",
    accent: "#5f82ff",
  },
  expression: {
    bg: "#4a2418",
    panel: "#633022",
    text: "#fbf4e7",
    muted: "#d6b29a",
    accent: "#ff7a45",
  },
  "design-pov": {
    bg: "#0f0f10",
    panel: "#1b1b1d",
    text: "#f5f5f5",
    muted: "#a9a9ac",
    accent: "#ff5d39",
  },
  pluto: {
    bg: "#62513b",
    panel: "#766149",
    text: "#f7f1e6",
    muted: "#d9c7a9",
    accent: "#e5d6a7",
  },
  kawa: {
    bg: "#174c45",
    panel: "#216058",
    text: "#effaf7",
    muted: "#b6d7d0",
    accent: "#7dd5c6",
  },
  aula: {
    bg: "#4b235e",
    panel: "#602d79",
    text: "#f8f1ff",
    muted: "#d8b7ea",
    accent: "#b56cff",
  },
  kotak: {
    bg: "#2b201d",
    panel: "#3a2b27",
    text: "#f6f0eb",
    muted: "#c8aea0",
    accent: "#e8693d",
  },
} as const;
