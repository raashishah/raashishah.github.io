export type ProjectSlug =
  | "admissions"
  | "expression"
  | "design-pov"
  | "pluto"
  | "kawa"
  | "aula"
  | "kotak";

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
  slug: ProjectSlug;
  title: string;
  tagline: string;
  insight: string;
  story: string[];
  href?: string;
  status?: "live" | "building" | "role";
  scene: "admissions" | "expression" | "design-pov" | "pluto" | "kawa" | "aula" | "kotak";
  type: "project" | "work";
};

export type Role = {
  slug: ProjectSlug;
  company: string;
  title: string;
  years: string;
  insight: string;
  story: string[];
  featured?: boolean;
};

export type BreathingLine = {
  id: string;
  text: string;
};
