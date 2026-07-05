import { expressionContent } from "@/content/expression";
import { ondeviceContent } from "@/content/ondevice";
import type { PortfolioEntry } from "@/content/types";

export type DetailRouteConfig = {
  path: DetailPath;
  pageLabel: string;
  introRole: string;
  introTagline: string;
  idPrefix: string;
  sections: readonly PortfolioEntry[];
  showBookDemo?: boolean;
};

export const DETAIL_PATHS = ["/expression", "/ondevice"] as const;
export type DetailPath = (typeof DETAIL_PATHS)[number];

export const detailRoutes: Record<DetailPath, DetailRouteConfig> = {
  "/expression": {
    path: "/expression",
    pageLabel: "About Expression",
    ...expressionContent,
  },
  "/ondevice": {
    path: "/ondevice",
    pageLabel: "About OnDevice",
    ...ondeviceContent,
  },
};

export const DETAIL_ACCORDION_ID: Record<DetailPath, string> = {
  "/expression": "expression",
  "/ondevice": "ondevice",
};

export function getDetailAccordionId(path: DetailPath): string {
  return DETAIL_ACCORDION_ID[path];
}

export function isDetailPath(path: string): path is DetailPath {
  return DETAIL_PATHS.includes(path as DetailPath);
}

export function getDetailRoute(path: string): DetailRouteConfig | null {
  if (!isDetailPath(path)) {
    return null;
  }
  return detailRoutes[path];
}
