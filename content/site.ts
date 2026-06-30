import type { SocialLink } from "./types";

export const nameEasterEggHref =
  "https://open.spotify.com/track/0Si6B4gh96eFsjFMplPGtJ";

export const socialLinks: SocialLink[] = [
  {
    id: "giphy",
    label: "Giphy",
    href: "https://giphy.com/channel/raashshah",
  },
  {
    id: "medium",
    label: "Medium",
    href: "https://raashishah.medium.com",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/rhshah14/",
  },
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/raashishah",
  },
  {
    id: "spotify",
    label: "Spotify",
    href: "https://open.spotify.com/playlist/40DrG9wUH1NO3G5IWN0YQ9",
  },
  {
    id: "twitter",
    label: "Twitter",
    href: "https://x.com/rash_driving",
  },
  {
    id: "duolingo",
    label: "Duolingo",
    href: "https://www.duolingo.com/profile/Raashi_Shah",
  },
  {
    id: "soundcloud",
    label: "SoundCloud",
    href: "https://soundcloud.com",
  },
  {
    id: "email",
    label: "email me",
    href: "mailto:raashishah.work@gmail.com",
  },
  {
    id: "calendly",
    label: "let's meet sometime",
    href: "https://calendly.com/raashishah-work/new-meeting",
  },
];

const linksById = Object.fromEntries(
  socialLinks.map((link) => [link.id, link]),
) as Record<SocialLink["id"], SocialLink>;

export { linksById };

const footerLinkOrder = [
  "linkedin",
  "giphy",
  "medium",
  "github",
  "spotify",
  "twitter",
  "duolingo",
  "soundcloud",
] as const satisfies readonly SocialLink["id"][];

export const footerLinks = footerLinkOrder.map((id) => linksById[id]);

export const emailLink = linksById.email;
export const calendlyLink = linksById.calendly;
