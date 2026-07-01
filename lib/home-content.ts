import { educationLabel, projects, workExperience } from "@/content/portfolio";
import { nameEasterEggHref } from "@/content/site";
import type { PortfolioEntry } from "@/content/types";
import { siteConfig } from "@/lib/metadata";

export type HomeContent = {
  nameEasterEggHref: string;
  introRole: string;
  introTagline: string;
  projects: readonly PortfolioEntry[];
  workExperience: readonly PortfolioEntry[];
  educationLabel: string;
};

export function getHomeContent(): HomeContent {
  return {
    nameEasterEggHref,
    introRole: siteConfig.introRole,
    introTagline: siteConfig.introTagline,
    projects,
    workExperience,
    educationLabel,
  };
}
