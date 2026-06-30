export type SocialLink = {
  id: string;
  label: string;
  href: string;
  icon: "giphy" | "medium" | "linkedin" | "github" | "spotify" | "twitter" | "duolingo" | "soundcloud" | "email" | "calendly";
};

export type RichLink = { text: string; href: string };
export type RichSegment = string | RichLink;
export type RichLine = string | readonly RichSegment[];
export type PullquoteParagraph = { text: RichLine; pullquote: true };
export type BodyParagraph = string | RichLine | PullquoteParagraph;

export type PortfolioEntry = {
  id: string;
  title: string;
  seoName?: string;
  primaryUrl?: string;
  seoDescription: string;
  seoLongDetail?: string;
  seoPeriod?: string;
  paragraphs: readonly BodyParagraph[];
  showOnHomepage?: boolean;
};
