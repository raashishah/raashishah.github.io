import { educationLabel, projects, workExperience } from "@/content/portfolio";
import { nameEasterEgg } from "@/content/site";
import type { NameEasterEgg } from "@/content/site";
import type { PortfolioEntry } from "@/content/types";
import { siteConfig } from "@/lib/metadata";

export type HomeContent = {
  nameEasterEgg: NameEasterEgg;
  introRole: string;
  introTagline: string;
  projects: readonly PortfolioEntry[];
  workExperience: readonly PortfolioEntry[];
  educationLabel: string;
};

export function getHomeContent(): HomeContent {
  return {
    nameEasterEgg,
    introRole: siteConfig.introRole,
    introTagline: siteConfig.introTagline,
    projects,
    workExperience,
    educationLabel,
  };
}
