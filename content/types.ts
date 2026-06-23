export type AppId =
  | "jbcn"
  | "design-pov"
  | "expression"
  | "work"
  | "about";

export type DockApp = {
  id: AppId;
  label: string;
  shortLabel: string;
  color: string;
};

export type NowPlaying = {
  isPlaying: boolean;
  title: string;
  artist: string;
  albumArtUrl: string | null;
  trackUri: string | null;
};

export type SocialLink = {
  id: string;
  label: string;
  href: string;
  icon: "giphy" | "medium" | "linkedin" | "github" | "spotify" | "twitter" | "duolingo" | "soundcloud" | "email";
};

export type Project = {
  id: AppId;
  title: string;
  insight: string;
  href?: string;
  status?: "live" | "building";
};

export type Role = {
  company: string;
  title: string;
  years: string;
  insight: string;
  featured?: boolean;
};

export type Fragment = {
  id: string;
  title: string;
  body: string;
  surface: "widget" | "app" | "both";
};
