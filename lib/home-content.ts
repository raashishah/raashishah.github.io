import { projects, resolveWorkGroups, workExperience } from "@/content/portfolio";
import { nameEasterEggHref } from "@/content/site";
import type { PortfolioEntry, WorkGroup } from "@/content/types";
import { siteConfig } from "@/lib/metadata";

export type HomeContent = {
  nameEasterEggHref: string;
  introIdentity: string;
  introName: string;
  introRole: string;
  introSubline: string;
  introTagline: string;
  projects: readonly PortfolioEntry[];
  workExperience: readonly PortfolioEntry[];
  workGroups: readonly WorkGroup[];
};

export function getHomeContent(): HomeContent {
  return {
    nameEasterEggHref,
    introIdentity: siteConfig.introIdentity,
    introName: siteConfig.introName,
    introRole: siteConfig.introRole,
    introSubline: siteConfig.introSubline,
    introTagline: siteConfig.introTagline,
    projects,
    workExperience,
    workGroups: resolveWorkGroups(),
  };
}
