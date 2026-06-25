"use client";

import { useEffect, useState } from "react";
import type { NowPlaying as NowPlayingType } from "@/content/types";

export function NowPlaying() {
  const [track, setTrack] = useState<NowPlayingType | null>(null);

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        const res = await fetch("/api/now-playing");
        const data = (await res.json()) as NowPlayingType;
        setTrack(data);
      } catch {
        setTrack(null);
      }
    };

    fetchTrack();
    const interval = setInterval(fetchTrack, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!track) return null;

  return (
    <div className="now-playing" data-sparkle-burst>
      <div className="now-playing__art">
        {track.albumArtUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={track.albumArtUrl} alt="" />
        ) : (
          <span>♪</span>
        )}
      </div>
      <div>
        <p className="now-playing__label">{track.isPlaying ? "now playing" : "last played"}</p>
        <p className="now-playing__track">{track.title}</p>
        <p className="now-playing__artist">{track.artist}</p>
      </div>
    </div>
  );
}
