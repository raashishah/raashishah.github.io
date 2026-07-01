export const footerSocialIconClasses = {
  linkedin: "fa-brands fa-linkedin-in",
  github: "fa-brands fa-github",
  spotify: "fa-brands fa-spotify",
  twitter: "fa-brands fa-x-twitter",
  duolingo: "fa-brands fa-duolingo",
  soundcloud: "fa-brands fa-soundcloud",
} as const;

export const footerSocialIconIds = [
  "linkedin",
  "giphy",
  "medium",
  "github",
  "spotify",
  "twitter",
  "duolingo",
  "soundcloud",
] as const;

export type FooterSocialIconId = (typeof footerSocialIconIds)[number];
