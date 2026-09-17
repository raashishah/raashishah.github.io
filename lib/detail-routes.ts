import { expressionContent } from "@/content/expression";
import type { PortfolioEntry } from "@/content/types";

export type DetailRouteConfig = {
  slug: DetailSlug;
  pageLabel: string;
  introRole: string;
  introTagline: string;
  idPrefix: string;
  sections: readonly PortfolioEntry[];
  cta?: { label: string; href: string };
};

export const DETAIL_SEARCH_PARAM = "detail";
export const DETAIL_SLUGS = ["expression"] as const;
export type DetailSlug = (typeof DETAIL_SLUGS)[number];

const DETAIL_SLUG_SET: ReadonlySet<string> = new Set(DETAIL_SLUGS);

export const detailRoutes: Record<DetailSlug, DetailRouteConfig> = {
  expression: {
    slug: "expression",
    ...expressionContent,
  },
};

export function getDetailHref(slug: DetailSlug): string {
  return `/?${DETAIL_SEARCH_PARAM}=${slug}`;
}

export function isDetailSlug(value: string): value is DetailSlug {
  return DETAIL_SLUG_SET.has(value);
}

export function getDetailSlugFromSearchParam(value: string | null): DetailSlug | null {
  if (!value || !isDetailSlug(value)) {
    return null;
  }
  return value;
}

export function getDetailSlugFromHref(href: string): DetailSlug | null {
  const queryIndex = href.indexOf("?");
  if (queryIndex === -1) {
    return null;
  }

  const query = href.slice(queryIndex + 1).split("#", 1)[0];
  return getDetailSlugFromSearchParam(
    new URLSearchParams(query).get(DETAIL_SEARCH_PARAM),
  );
}

export function isDetailHref(href: string): boolean {
  return getDetailSlugFromHref(href) !== null;
}

export function isDetailPanelAccordion(slug: DetailSlug, accordionId: string): boolean {
  return accordionId === slug || accordionId.startsWith(`${slug}-`);
}

export function getDetailRoute(slug: DetailSlug): DetailRouteConfig {
  return detailRoutes[slug];
}
