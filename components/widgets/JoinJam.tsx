"use client";

import { useEffect, useState } from "react";
import { useMagnetic } from "@/components/cursor/useMagnetic";

type JamState = {
  available: boolean;
  url: string | null;
};

export function JoinJam() {
  const [jam, setJam] = useState<JamState>({ available: false, url: null });
  const ref = useMagnetic<HTMLAnchorElement>(0.35);

  useEffect(() => {
    const fetchJam = async () => {
      try {
        const res = await fetch("/api/jam");
        const data = (await res.json()) as JamState;
        setJam(data);
      } catch {
        setJam({ available: false, url: null });
      }
    };

    fetchJam();
    const interval = setInterval(fetchJam, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!jam.available || !jam.url) return null;

  return (
    <a ref={ref} href={jam.url} target="_blank" rel="noopener noreferrer" className="join-jam" data-sparkle-burst>
      listen with me
    </a>
  );
}
