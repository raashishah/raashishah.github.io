"use client";

import {
  createContext,
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { DetailPanel } from "@/components/DetailPanel";
import {
  DETAIL_SEARCH_PARAM,
  getDetailRoute,
  getDetailSlugFromSearchParam,
  type DetailRouteConfig,
  type DetailSlug,
} from "@/lib/detail-routes";
import {
  PANEL_CLOSE_MS,
  SHEET_BREAKPOINT,
  SHEET_CLOSE_MS,
  TRANSITION_FALLBACK_BUFFER_MS,
} from "@/lib/motion";

type DetailContextValue = {
  isOpen: boolean;
  isClosing: boolean;
  slug: DetailSlug | null;
  route: DetailRouteConfig | null;
  isDesktop: boolean;
  isMediaReady: boolean;
  requestCloseDetail: () => Promise<void>;
  finishDetailClose: () => void;
};

const DetailContext = createContext<DetailContextValue | null>(null);

const closedDetail: DetailContextValue = {
  isOpen: false,
  isClosing: false,
  slug: null,
  route: null,
  isDesktop: false,
  isMediaReady: false,
  requestCloseDetail: async () => {},
  finishDetailClose: () => {},
};

export function useDetail() {
  const context = useContext(DetailContext);
  if (!context) {
    throw new Error("useDetail must be used within DetailProvider");
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

function DetailProviderInner({ children }: { children: ReactNode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isClosing, setIsClosing] = useState(false);
  const closeTimerRef = useRef<number | null>(null);
  const closeResolveRef = useRef<(() => void) | null>(null);
  const { matches: isDesktop, ready: isMediaReady } = useMediaQuery(
    `(min-width: ${SHEET_BREAKPOINT})`,
  );

  const slug = getDetailSlugFromSearchParam(searchParams.get(DETAIL_SEARCH_PARAM));
  const route = slug ? getDetailRoute(slug) : null;
  const isOpen = route !== null;

  useEffect(() => {
    if (!isOpen) {
      setIsClosing(false);
    }
  }, [isOpen]);

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
    router.replace("/");
    resolve?.();
  }, [router]);

  const requestCloseDetail = useCallback(() => {
    if (!isOpen || isClosing) {
      return Promise.resolve();
    }

    setIsClosing(true);
    const closeDurationMs = isDesktop
      ? PANEL_CLOSE_MS
      : SHEET_CLOSE_MS;

    return new Promise<void>((resolve) => {
      closeResolveRef.current = resolve;
      closeTimerRef.current = window.setTimeout(() => {
        finishDetailClose();
      }, closeDurationMs + TRANSITION_FALLBACK_BUFFER_MS);
    });
  }, [finishDetailClose, isClosing, isDesktop, isOpen]);

  const value = useMemo(
    () => ({
      isOpen,
      isClosing,
      slug,
      route,
      isDesktop,
      isMediaReady,
      requestCloseDetail,
      finishDetailClose,
    }),
    [isOpen, isClosing, slug, route, isDesktop, isMediaReady, requestCloseDetail, finishDetailClose],
  );

  return (
    <DetailContext.Provider value={value}>
      {children}
      {route ? <DetailPanel route={route} /> : null}
    </DetailContext.Provider>
  );
}

export function DetailProvider({ children }: { children: ReactNode }) {
  return (
    <Suspense
      fallback={
        <DetailContext.Provider value={closedDetail}>{children}</DetailContext.Provider>
      }
    >
      <DetailProviderInner>{children}</DetailProviderInner>
    </Suspense>
  );
}
