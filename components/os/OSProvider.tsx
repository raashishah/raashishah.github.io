"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { AppId, NowPlaying } from "@/content/types";

type OSContextValue = {
  openApps: AppId[];
  activeApp: AppId | null;
  openApp: (id: AppId) => void;
  closeApp: (id: AppId) => void;
  setActiveApp: (id: AppId) => void;
  bouncingApp: AppId | null;
  connectOpen: boolean;
  setConnectOpen: (open: boolean) => void;
  nowPlaying: NowPlaying;
  setNowPlaying: (track: NowPlaying) => void;
  easterEggActive: boolean;
  triggerEasterEgg: () => void;
  reducedMotion: boolean;
  booting: boolean;
};

const idleNowPlaying: NowPlaying = {
  isPlaying: false,
  title: "Not playing",
  artist: "",
  albumArtUrl: null,
  trackUri: null,
};

const easterEggTrack: NowPlaying = {
  isPlaying: true,
  title: "Who I Am (Channel Tres Remix)",
  artist: "Toro y Moi, Channel Tres",
  albumArtUrl: null,
  trackUri: "spotify:album:5YMsYTDaUkHU97gVRhhOV1",
};

const OSContext = createContext<OSContextValue | null>(null);

export function OSProvider({ children }: { children: ReactNode }) {
  const [openApps, setOpenApps] = useState<AppId[]>([]);
  const [activeApp, setActiveAppState] = useState<AppId | null>(null);
  const [bouncingApp, setBouncingApp] = useState<AppId | null>(null);
  const [connectOpen, setConnectOpen] = useState(false);
  const [nowPlaying, setNowPlaying] = useState<NowPlaying>(idleNowPlaying);
  const [easterEggActive, setEasterEggActive] = useState(false);
  const [booting, setBooting] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => setBooting(false), reducedMotion ? 0 : 600);
    return () => window.clearTimeout(timer);
  }, [reducedMotion]);

  useEffect(() => {
    let cancelled = false;

    async function fetchNowPlaying() {
      try {
        const res = await fetch("/api/now-playing");
        if (!res.ok) return;
        const data = (await res.json()) as NowPlaying;
        if (!cancelled && !easterEggActive) {
          setNowPlaying(data);
        }
      } catch {
        /* API optional until Spotify credentials are set */
      }
    }

    fetchNowPlaying();
    const interval = window.setInterval(fetchNowPlaying, 30_000);
    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, [easterEggActive]);

  const openApp = useCallback(
    (id: AppId) => {
      setOpenApps((prev) => (prev.includes(id) ? prev : [...prev, id]));
      setActiveAppState(id);
      if (!reducedMotion) {
        setBouncingApp(id);
        window.setTimeout(() => setBouncingApp(null), 400);
      }
    },
    [reducedMotion],
  );

  const closeApp = useCallback((id: AppId) => {
    setOpenApps((prev) => {
      const next = prev.filter((app) => app !== id);
      setActiveAppState((current) => {
        if (current !== id) return current;
        return next.length > 0 ? next[next.length - 1] : null;
      });
      return next;
    });
  }, []);

  const setActiveApp = useCallback((id: AppId) => {
    setActiveAppState(id);
  }, []);

  const triggerEasterEgg = useCallback(() => {
    setEasterEggActive(true);
    setNowPlaying(easterEggTrack);
  }, []);

  const value = useMemo(
    () => ({
      openApps,
      activeApp,
      openApp,
      closeApp,
      setActiveApp,
      bouncingApp,
      connectOpen,
      setConnectOpen,
      nowPlaying,
      setNowPlaying,
      easterEggActive,
      triggerEasterEgg,
      reducedMotion,
      booting,
    }),
    [
      openApps,
      activeApp,
      openApp,
      closeApp,
      setActiveApp,
      bouncingApp,
      connectOpen,
      nowPlaying,
      easterEggActive,
      triggerEasterEgg,
      reducedMotion,
      booting,
    ],
  );

  return <OSContext.Provider value={value}>{children}</OSContext.Provider>;
}

export function useOS() {
  const ctx = useContext(OSContext);
  if (!ctx) throw new Error("useOS must be used within OSProvider");
  return ctx;
}
