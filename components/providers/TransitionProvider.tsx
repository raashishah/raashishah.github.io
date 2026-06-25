"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type TransitionContextValue = {
  flipId: string | null;
  setFlipId: (id: string | null) => void;
};

const TransitionContext = createContext<TransitionContextValue | null>(null);

export function TransitionProvider({ children }: { children: ReactNode }) {
  const [flipId, setFlipId] = useState<string | null>(null);
  const value = useMemo(() => ({ flipId, setFlipId }), [flipId]);
  return <TransitionContext.Provider value={value}>{children}</TransitionContext.Provider>;
}

export function useTransition(): TransitionContextValue {
  const ctx = useContext(TransitionContext);
  if (!ctx) throw new Error("useTransition must be used within TransitionProvider");
  return ctx;
}
