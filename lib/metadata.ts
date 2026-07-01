import type { Metadata } from "next";

const introRole = "Technical Product Manager, AI Engineer";
const introTagline = "Designing and developing apps and AI agents end-to-end";
const introDescription = `${introRole}. ${introTagline}`;

export const siteConfig = {
  name: "Raashi Shah",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL ?? "https://raashishah.com",
  introRole,
  introTagline,
  description: introDescription,
  creator: "Raashi Shah",
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
