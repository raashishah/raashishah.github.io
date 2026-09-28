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

/** Homepage href with the detail search param removed. Other params and the hash stay. */
export function getHrefWithoutDetail(href: string): string {
  const url = new URL(href, "http://localhost");
  url.searchParams.delete(DETAIL_SEARCH_PARAM);
  const query = url.searchParams.toString();
  return `${url.pathname}${query ? `?${query}` : ""}${url.hash}`;
}

/** Homepage href with the detail search param set. Other params and the hash stay. */
export function getHrefWithDetail(href: string, slug: DetailSlug): string {
  const url = new URL(href, "http://localhost");
  url.searchParams.set(DETAIL_SEARCH_PARAM, slug);
  const query = url.searchParams.toString();
  return `${url.pathname}${query ? `?${query}` : ""}${url.hash}`;
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
