"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import { useDetail } from "@/components/DetailProvider";
import { getDetailAccordionId } from "@/lib/detail-routes";

type CloseHandler = () => Promise<void>;

type DetailsAccordionContextValue = {
  prepareOpen: (id: string) => Promise<void>;
  notifyClosed: (id: string) => void;
  register: (id: string, close: CloseHandler) => void;
  unregister: (id: string) => void;
};

const DetailsAccordionContext =
  createContext<DetailsAccordionContextValue | null>(null);

export function useDetailsAccordion() {
  return useContext(DetailsAccordionContext);
}

export function DetailsAccordion({ children }: { children: ReactNode }) {
  const openIdRef = useRef<string | null>(null);
  const closersRef = useRef(new Map<string, CloseHandler>());
  const { isOpen, path, requestCloseDetail } = useDetail();

  const register = useCallback((id: string, close: CloseHandler) => {
    closersRef.current.set(id, close);
  }, []);

  const unregister = useCallback((id: string) => {
    closersRef.current.delete(id);
  }, []);

  const prepareOpen = useCallback(async (id: string) => {
    const currentOpenId = openIdRef.current;
    const closingDetail =
      isOpen && path && getDetailAccordionId(path) !== id
        ? requestCloseDetail()
        : Promise.resolve();
    const closingAccordion =
      currentOpenId && currentOpenId !== id
        ? (closersRef.current.get(currentOpenId)?.() ?? Promise.resolve())
        : Promise.resolve();

    await Promise.all([closingDetail, closingAccordion]);
    openIdRef.current = id;
  }, [isOpen, path, requestCloseDetail]);

  const notifyClosed = useCallback((id: string) => {
    if (openIdRef.current === id) {
      openIdRef.current = null;
    }
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
