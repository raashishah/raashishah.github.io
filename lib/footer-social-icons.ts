import { footerLinkOrder } from "@/content/site";
import type { FooterSocialLinkId } from "@/content/types";
import { legacyFooterSocialSvgIcons } from "@/lib/legacy-social-icons";

export const footerSocialIconIds = footerLinkOrder;

export type FooterSocialIconId = FooterSocialLinkId;

type FaIconDescriptor = {
  kind: "fa";
  iconClass: string;
};

type SvgIconDescriptor = {
  kind: "svg";
  legacyKey: keyof typeof legacyFooterSocialSvgIcons;
  scaleClass?: "home__footer-icon--giphy" | "home__footer-icon--medium";
};

export type FooterIconDescriptor = FaIconDescriptor | SvgIconDescriptor;

export const footerIconDescriptors: Record<FooterSocialLinkId, FooterIconDescriptor> = {
  linkedin: { kind: "fa", iconClass: "fa-brands fa-linkedin-in" },
  twitter: { kind: "fa", iconClass: "fa-brands fa-x-twitter" },
  github: { kind: "fa", iconClass: "fa-brands fa-github" },
  medium: {
    kind: "svg",
    legacyKey: "medium",
    scaleClass: "home__footer-icon--medium",
  },
  spotify: { kind: "fa", iconClass: "fa-brands fa-spotify" },
  soundcloud: { kind: "fa", iconClass: "fa-brands fa-soundcloud" },
  duolingo: { kind: "fa", iconClass: "fa-brands fa-duolingo" },
  giphy: {
    kind: "svg",
    legacyKey: "giphy",
    scaleClass: "home__footer-icon--giphy",
  },
};
