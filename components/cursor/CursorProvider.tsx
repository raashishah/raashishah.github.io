"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type CursorState = "default" | "link" | "project" | "scene";

type CursorContextValue = {
  state: CursorState;
  label: string;
  setCursorState: (state: CursorState, label?: string) => void;
  resetCursor: () => void;
};

const CursorContext = createContext<CursorContextValue | null>(null);

export function CursorProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CursorState>("default");
  const [label, setLabel] = useState("");

  const setCursorState = useCallback((next: CursorState, nextLabel = "") => {
    setState(next);
    setLabel(nextLabel);
  }, []);

  const resetCursor = useCallback(() => {
    setState("default");
    setLabel("");
  }, []);

  const value = useMemo(
    () => ({ state, label, setCursorState, resetCursor }),
    [state, label, setCursorState, resetCursor],
  );

  return <CursorContext.Provider value={value}>{children}</CursorContext.Provider>;
}

export function useCursorState(): CursorContextValue {
  const ctx = useContext(CursorContext);
  if (!ctx) throw new Error("useCursorState must be used within CursorProvider");
  return ctx;
}
