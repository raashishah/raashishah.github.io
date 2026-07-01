import type { FooterSocialLink, FooterSocialLinkId, SocialLink, SocialLinkId } from "./types";

export const nameEasterEgg = {
  spotifyTrackId: "0Si6B4gh96eFsjFMplPGtJ",
  spotifyUrl: "https://open.spotify.com/track/0Si6B4gh96eFsjFMplPGtJ",
  appleMusicUrl:
    "https://music.apple.com/us/album/who-i-am-channel-tres-remix/1583616462?i=1583616467",
} as const;

export type NameEasterEgg = typeof nameEasterEgg;

export const nameEasterEggHref = nameEasterEgg.spotifyUrl;

export const footerDiscoveryHint = "i've hid something here";

export const socialLinks = [
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
    href: "https://m.soundcloud.com/raashi-shah",
  },
  {
    id: "email",
    label: "email me",
    href: "mailto:raashishah.work@gmail.com",
  },
  {
    id: "calendly",
    label: "let's meet sometime",
    href: "https://calendar.app.google/CQiAZnhWLZs1HF8X6",
  },
] as const satisfies readonly SocialLink[];

const linksById = Object.fromEntries(
  socialLinks.map((link) => [link.id, link]),
) as Record<SocialLinkId, SocialLink>;

export { linksById };

export const footerLinkOrder = [
  "linkedin",
  "twitter",
  "github",
  "medium",
  "spotify",
  "soundcloud",
  "duolingo",
  "giphy",
] as const satisfies readonly FooterSocialLinkId[];

export const footerLinks = footerLinkOrder.map(
  (id) => linksById[id],
) as readonly FooterSocialLink[];

export const emailLink = linksById.email;
export const calendlyLink = linksById.calendly;
