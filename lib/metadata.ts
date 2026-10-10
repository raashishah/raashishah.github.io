import type { Metadata } from "next";

const introName = "Raashi Shah";
const introRole = "AI Engineer";
const introIdentity = `${introName}, ${introRole}`;
const introTagline = "Developing apps and agents";
const introSubline =
  "Seven years as a Technical Product Manager working with human engineers, over a year with engineering agents";
const introDescription = `${introIdentity}. ${introTagline}. ${introSubline}.`;
const socialDescription = `${introRole}. ${introTagline}.`;

export const siteConfig = {
  name: "Decavalent",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL ?? "https://decavalent.com",
  introName,
  introRole,
  introIdentity,
  introSubline,
  introTagline,
  description: introDescription,
  socialDescription,
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
