import { resolveWorkGroups } from "@/content/portfolio";
import { nameEasterEggHref } from "@/content/site";
import type { WorkGroup } from "@/content/types";
import { siteConfig } from "@/lib/metadata";

export type HomeContent = {
  nameEasterEggHref: string;
  introName: string;
  introRole: string;
  introSubline: string;
  introTagline: string;
  workGroups: readonly WorkGroup[];
};

export function getHomeContent(): HomeContent {
  return {
    nameEasterEggHref,
    introName: siteConfig.introName,
    introRole: siteConfig.introRole,
    introSubline: siteConfig.introSubline,
    introTagline: siteConfig.introTagline,
    workGroups: resolveWorkGroups(),
  };
}
