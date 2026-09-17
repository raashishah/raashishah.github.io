"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import { useDetail } from "@/components/DetailProvider";
import { isDetailPanelAccordion } from "@/lib/detail-routes";

type CloseHandler = () => Promise<void>;

type AccordionEntry = {
  close: CloseHandler;
  contains: (node: Node | null) => boolean;
};

type DetailsAccordionContextValue = {
  prepareOpen: (id: string) => Promise<void>;
  notifyClosed: (id: string) => void;
  register: (id: string, entry: AccordionEntry) => void;
  unregister: (id: string) => void;
};

function shouldIgnoreOutsidePointer(target: EventTarget | null) {
  if (!(target instanceof Element)) {
    return false;
  }

  return Boolean(
    target.closest(
      "summary.home__details-summary, .home__detail, .home__sheet",
    ),
  );
}

const DetailsAccordionContext =
  createContext<DetailsAccordionContextValue | null>(null);

export function useDetailsAccordion() {
  return useContext(DetailsAccordionContext);
}

export function DetailsAccordion({ children }: { children: ReactNode }) {
  const openIdRef = useRef<string | null>(null);
  const closersRef = useRef(new Map<string, AccordionEntry>());
  const { isOpen, path, requestCloseDetail } = useDetail();

  const register = useCallback((id: string, entry: AccordionEntry) => {
    closersRef.current.set(id, entry);
  }, []);

  const unregister = useCallback((id: string) => {
    closersRef.current.delete(id);
  }, []);

  const prepareOpen = useCallback(async (id: string) => {
    const currentOpenId = openIdRef.current;
    openIdRef.current = id;
    const closingDetail =
      isOpen && path && !isDetailPanelAccordion(path, id)
        ? requestCloseDetail()
        : Promise.resolve();
    const closingAccordion =
      currentOpenId && currentOpenId !== id
        ? (closersRef.current.get(currentOpenId)?.close() ?? Promise.resolve())
        : Promise.resolve();

    await Promise.all([closingDetail, closingAccordion]);
  }, [isOpen, path, requestCloseDetail]);

  const notifyClosed = useCallback((id: string) => {
    if (openIdRef.current === id) {
      openIdRef.current = null;
    }
  }, []);

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0) {
        return;
      }

      const openId = openIdRef.current;
      if (!openId) {
        return;
      }

      const entry = closersRef.current.get(openId);
      if (!entry) {
        return;
      }

      const target = event.target;
      if (shouldIgnoreOutsidePointer(target)) {
        return;
      }

      if (target instanceof Node && entry.contains(target)) {
        return;
      }

      openIdRef.current = null;
      void entry.close();
    };

    document.addEventListener("pointerdown", onPointerDown, true);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown, true);
    };
  }, []);

  const value = useMemo(
    () => ({ prepareOpen, notifyClosed, register, unregister }),
    [prepareOpen, notifyClosed, register, unregister],
  );

  return (
    <DetailsAccordionContext.Provider value={value}>
      {children}
    </DetailsAccordionContext.Provider>
  );
}
