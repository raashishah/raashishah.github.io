"use client";

import { useCallback } from "react";
import type { NameEasterEgg } from "@/content/site";
import { openMusicTrack } from "@/lib/open-music-track";
import { siteConfig } from "@/lib/metadata";

type NameEasterEggLinkProps = {
  easterEgg: NameEasterEgg;
};

export function NameEasterEggLink({ easterEgg }: NameEasterEggLinkProps) {
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      openMusicTrack(easterEgg);
    },
    [easterEgg],
  );

  return (
    <a
      href={easterEgg.spotifyUrl}
      className="home__name-link"
      aria-label={`${siteConfig.name} (opens in music app)`}
      onClick={handleClick}
    >
      {siteConfig.name}
    </a>
  );
}
