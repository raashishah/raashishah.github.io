"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { DetailPanel } from "@/components/DetailPanel";
import { isHomepageMounted } from "@/components/HomepageMarker";
import {
  getDetailRoute,
  isDetailPath,
  type DetailPath,
  type DetailRouteConfig,
} from "@/lib/detail-routes";
import { SHEET_BREAKPOINT } from "@/lib/motion";

type DetailContextValue = {
  isOpen: boolean;
  path: DetailPath | null;
  route: DetailRouteConfig | null;
  isDesktop: boolean;
  closeDetail: () => void;
};

const DetailContext = createContext<DetailContextValue | null>(null);

export function useDetail() {
  const context = useContext(DetailContext);
  if (!context) {
    return {
      isOpen: false,
      path: null,
      route: null,
      isDesktop: false,
      closeDetail: () => {},
    } satisfies DetailContextValue;
  }
  return context;
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const onChange = () => setMatches(media.matches);
    onChange();
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

type DetailProviderProps = {
  children: ReactNode;
  detail: ReactNode;
};

export function DetailProvider({ children, detail }: DetailProviderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isHomepage, setIsHomepage] = useState(false);
  const isDesktop = useMediaQuery(`(min-width: ${SHEET_BREAKPOINT})`);

  useEffect(() => {
    setIsHomepage(isHomepageMounted());
  }, [pathname, detail]);

  const isIntercept =
    detail !== null && isDetailPath(pathname) && isHomepage;
  const path = isIntercept ? (pathname as DetailPath) : null;
  const route = path ? getDetailRoute(path) : null;

  const closeDetail = useCallback(() => {
    router.back();
  }, [router]);

  const value = useMemo(
    () => ({
      isOpen: isIntercept,
      path,
      route,
      isDesktop,
      closeDetail,
    }),
    [isIntercept, path, route, isDesktop, closeDetail],
  );

  return (
    <DetailContext.Provider value={value}>
      {children}
      {isIntercept && route ? <DetailPanel route={route} /> : null}
    </DetailContext.Provider>
  );
}
