"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
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
import { PANEL_CLOSE_MS, SHEET_BREAKPOINT, TRANSITION_FALLBACK_BUFFER_MS } from "@/lib/motion";

type DetailContextValue = {
  isOpen: boolean;
  isClosing: boolean;
  path: DetailPath | null;
  route: DetailRouteConfig | null;
  isDesktop: boolean;
  isMediaReady: boolean;
  closeDetail: () => void;
  requestCloseDetail: () => Promise<void>;
  finishDetailClose: () => void;
};

const DetailContext = createContext<DetailContextValue | null>(null);

export function useDetail() {
  const context = useContext(DetailContext);
  if (!context) {
    return {
      isOpen: false,
      isClosing: false,
      path: null,
      route: null,
      isDesktop: false,
      isMediaReady: false,
      closeDetail: () => {},
      requestCloseDetail: async () => {},
      finishDetailClose: () => {},
    } satisfies DetailContextValue;
  }
  return context;
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const onChange = () => setMatches(media.matches);
    onChange();
    setReady(true);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [query]);

  return { matches, ready };
}

type DetailProviderProps = {
  children: ReactNode;
};

export function DetailProvider({ children }: DetailProviderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isClosing, setIsClosing] = useState(false);
  const [isHomepage, setIsHomepage] = useState(false);
  const closeTimerRef = useRef<number | null>(null);
  const closeResolveRef = useRef<(() => void) | null>(null);
  const { matches: isDesktop, ready: isMediaReady } = useMediaQuery(
    `(min-width: ${SHEET_BREAKPOINT})`,
  );

  useEffect(() => {
    setIsHomepage(isHomepageMounted());
  }, [pathname]);

  const isIntercept = isHomepage && isDetailPath(pathname);
  const path = isIntercept ? (pathname as DetailPath) : null;
  const route = path ? getDetailRoute(path) : null;

  useEffect(() => {
    if (!isIntercept) {
      setIsClosing(false);
    }
  }, [isIntercept]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        window.clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  const finishDetailClose = useCallback(() => {
    if (!closeResolveRef.current && !closeTimerRef.current) {
      return;
    }
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    const resolve = closeResolveRef.current;
    closeResolveRef.current = null;
    router.back();
    resolve?.();
  }, [router]);

  const closeDetail = useCallback(() => {
    router.back();
  }, [router]);

  const requestCloseDetail = useCallback(() => {
    if (!isIntercept || isClosing) {
      return Promise.resolve();
    }

    setIsClosing(true);

    return new Promise<void>((resolve) => {
      closeResolveRef.current = resolve;
      closeTimerRef.current = window.setTimeout(() => {
        finishDetailClose();
      }, PANEL_CLOSE_MS + TRANSITION_FALLBACK_BUFFER_MS);
    });
  }, [finishDetailClose, isClosing, isIntercept]);

  const value = useMemo(
    () => ({
      isOpen: isIntercept,
      isClosing,
      path,
      route,
      isDesktop,
      isMediaReady,
      closeDetail,
      requestCloseDetail,
      finishDetailClose,
    }),
    [isIntercept, isClosing, path, route, isDesktop, isMediaReady, closeDetail, requestCloseDetail, finishDetailClose],
  );

  return (
    <DetailContext.Provider value={value}>
      {children}
      {isIntercept && route ? <DetailPanel route={route} /> : null}
    </DetailContext.Provider>
  );
}
