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
import {
  getDetailRoute,
  isDetailPath,
  type DetailPath,
  type DetailRouteConfig,
} from "@/lib/detail-routes";
import { PANEL_CLOSE_MS, SHEET_BREAKPOINT } from "@/lib/motion";

type DetailContextValue = {
  isOpen: boolean;
  isClosing: boolean;
  path: DetailPath | null;
  route: DetailRouteConfig | null;
  isDesktop: boolean;
  isMediaReady: boolean;
  closeDetail: () => void;
  requestCloseDetail: () => Promise<void>;
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
  detail: ReactNode;
};

export function DetailProvider({ children, detail }: DetailProviderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isClosing, setIsClosing] = useState(false);
  const closeTimerRef = useRef<number | null>(null);
  const { matches: isDesktop, ready: isMediaReady } = useMediaQuery(
    `(min-width: ${SHEET_BREAKPOINT})`,
  );

  const isIntercept = detail !== null && isDetailPath(pathname);
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

  const closeDetail = useCallback(() => {
    router.back();
  }, [router]);

  const requestCloseDetail = useCallback(() => {
    if (!isIntercept || isClosing) {
      return Promise.resolve();
    }

    setIsClosing(true);

    return new Promise<void>((resolve) => {
      closeTimerRef.current = window.setTimeout(() => {
        closeTimerRef.current = null;
        router.back();
        resolve();
      }, PANEL_CLOSE_MS);
    });
  }, [isClosing, isIntercept, router]);

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
    }),
    [isIntercept, isClosing, path, route, isDesktop, isMediaReady, closeDetail, requestCloseDetail],
  );

  return (
    <DetailContext.Provider value={value}>
      {children}
      {isIntercept && route ? <DetailPanel route={route} /> : null}
    </DetailContext.Provider>
  );
}
