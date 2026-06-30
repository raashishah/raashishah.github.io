"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
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
  const [openId, setOpenId] = useState<string | null>(null);
  const closersRef = useRef(new Map<string, CloseHandler>());

  const register = useCallback((id: string, close: CloseHandler) => {
    closersRef.current.set(id, close);
  }, []);

  const unregister = useCallback((id: string) => {
    closersRef.current.delete(id);
  }, []);

  const prepareOpen = useCallback(
    async (id: string) => {
      if (openId && openId !== id) {
        await closersRef.current.get(openId)?.();
      }
      setOpenId(id);
    },
    [openId],
  );

  const notifyClosed = useCallback((id: string) => {
    setOpenId((current) => (current === id ? null : current));
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
