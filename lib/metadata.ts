import type { Metadata } from "next";

const introName = "Raashi Shah";
const introRole = "Product Management, AI Engineering";
const introSubline =
  "Over eight years working with human engineers, now with agent engineers";
const introTagline = "Scoping and developing apps and AI agents";
const introDescription = `${introName}. ${introRole}. ${introTagline} ${introSubline}`;

export const siteConfig = {
  name: "Decavalent",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL ?? "https://decavalent.com",
  introName,
  introRole,
  introSubline,
  introTagline,
  description: introDescription,
  creator: "Decavalent",
  twitterHandle: "@rash_driving",
} as const;

export function getSiteUrl() {
  return new URL(siteConfig.url);
}

export function absoluteUrl(path = "/") {
  return new URL(path, getSiteUrl()).toString();
}

export function buildSubpageMetadata({
  canonical,
  title,
  description,
}: {
  canonical: string;
  title: string;
  description: string;
}): Metadata {
  const ogImage = absoluteUrl("/opengraph-image.png");

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "website",
      url: canonical,
      title,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${title} — ${description}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
