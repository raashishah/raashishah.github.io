import { educationLabel, projects, workExperience } from "@/content/portfolio";
import {
  calendlyLink,
  emailLink,
  footerLinks,
  nameEasterEggHref,
} from "@/content/site";
import type { PortfolioEntry, SocialLink } from "@/content/types";
import { siteConfig } from "@/lib/metadata";

export type HomeContent = {
  nameEasterEggHref: string;
  emailLink: SocialLink;
  calendlyLink: SocialLink;
  footerLinks: readonly SocialLink[];
  introRole: string;
  introTagline: string;
  projects: readonly PortfolioEntry[];
  workExperience: readonly PortfolioEntry[];
  educationLabel: string;
};

export function getHomeContent(): HomeContent {
  return {
    nameEasterEggHref,
    emailLink,
    calendlyLink,
    footerLinks,
    introRole: siteConfig.introRole,
    introTagline: siteConfig.introTagline,
    projects,
    workExperience,
    educationLabel,
  };
}
