import { expressionContent } from "@/content/expression";
import type { PortfolioEntry } from "@/content/types";

export type DetailRouteConfig = {
  path: DetailPath;
  pageLabel: string;
  introRole: string;
  introTagline: string;
  idPrefix: string;
  sections: readonly PortfolioEntry[];
  cta?: { label: string; href: string };
};

export const DETAIL_SEARCH_PARAM = "detail";
export const DETAIL_PATHS = ["/expression"] as const;
export type DetailPath = (typeof DETAIL_PATHS)[number];

export const detailRoutes: Record<DetailPath, DetailRouteConfig> = {
  "/expression": {
    path: "/expression",
    pageLabel: "About Expression",
    ...expressionContent,
  },
};

export const DETAIL_ACCORDION_ID: Record<DetailPath, string> = {
  "/expression": "expression",
};

export function getDetailAccordionId(path: DetailPath): string {
  return DETAIL_ACCORDION_ID[path];
}

export function getDetailSlug(path: DetailPath): string {
  return path.slice(1);
}

export function getDetailHref(path: DetailPath): string {
  return `/?${DETAIL_SEARCH_PARAM}=${getDetailSlug(path)}`;
}

export function getDetailPathFromSlug(slug: string | null): DetailPath | null {
  if (!slug) {
    return null;
  }
  const path = `/${slug}`;
  return isDetailPath(path) ? path : null;
}

export function getDetailPathFromHref(href: string): DetailPath | null {
  if (isDetailPath(href)) {
    return href;
  }

  try {
    const url = new URL(href, "https://decavalent.local");
    return getDetailPathFromSlug(url.searchParams.get(DETAIL_SEARCH_PARAM));
  } catch {
    return null;
  }
}

/** True when accordionId is the homepage row or a nested section inside the open detail panel. */
export function isDetailPanelAccordion(
  path: DetailPath,
  accordionId: string,
): boolean {
  const detailAccordionId = getDetailAccordionId(path);
  return (
    accordionId === detailAccordionId ||
    accordionId.startsWith(`${detailAccordionId}-`)
  );
}

export function isDetailPath(path: string): path is DetailPath {
  return DETAIL_PATHS.includes(path as DetailPath);
}

export function isDetailHref(href: string): boolean {
  return getDetailPathFromHref(href) !== null;
}

export function getDetailRoute(path: string): DetailRouteConfig | null {
  if (!isDetailPath(path)) {
    return null;
  }
  return detailRoutes[path];
}
