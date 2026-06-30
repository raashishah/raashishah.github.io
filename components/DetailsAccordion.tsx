"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  type ReactNode,
} from "react";

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

  const register = useCallback((id: string, close: CloseHandler) => {
    closersRef.current.set(id, close);
  }, []);

  const unregister = useCallback((id: string) => {
    closersRef.current.delete(id);
  }, []);

  const prepareOpen = useCallback(async (id: string) => {
    const currentOpenId = openIdRef.current;
    if (currentOpenId && currentOpenId !== id) {
      await closersRef.current.get(currentOpenId)?.();
    }
    openIdRef.current = id;
  }, []);

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
