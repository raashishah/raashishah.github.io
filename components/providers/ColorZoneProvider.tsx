"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { ProjectPalette } from "@/lib/colors";
import { basePalette } from "@/lib/colors";

type ColorZoneContextValue = {
  activeZone: string | null;
  palette: ProjectPalette | typeof basePalette & { id?: string };
  setActiveZone: (zone: string | null, palette?: ProjectPalette) => void;
};

const ColorZoneContext = createContext<ColorZoneContextValue | null>(null);

export function ColorZoneProvider({ children }: { children: ReactNode }) {
  const [activeZone, setZone] = useState<string | null>(null);
  const [palette, setPalette] = useState<ProjectPalette | (typeof basePalette & { id?: string })>(
    basePalette,
  );

  const setActiveZone = useCallback((zone: string | null, zonePalette?: ProjectPalette) => {
    setZone(zone);
    if (zonePalette) {
      setPalette(zonePalette);
    } else if (!zone) {
      setPalette(basePalette);
    }
  }, []);

  const value = useMemo(
    () => ({ activeZone, palette, setActiveZone }),
    [activeZone, palette, setActiveZone],
  );

  return <ColorZoneContext.Provider value={value}>{children}</ColorZoneContext.Provider>;
}

export function useColorZone(): ColorZoneContextValue {
  const ctx = useContext(ColorZoneContext);
  if (!ctx) throw new Error("useColorZone must be used within ColorZoneProvider");
  return ctx;
}
