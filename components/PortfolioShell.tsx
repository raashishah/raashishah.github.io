"use client";

import type { ReactNode } from "react";
import { DetailPanelContent } from "@/components/DetailPanel";
import { useDetail } from "@/components/DetailProvider";
import { SiteShell } from "@/components/SiteShell";

type PortfolioShellProps = {
  nameHref: string;
  nameExternal?: boolean;
  nameAsHeading?: boolean;
  intro: ReactNode;
  work: ReactNode;
  portrait?: ReactNode;
};

export function PortfolioShell({
  nameHref,
  nameExternal = false,
  nameAsHeading = true,
  intro,
  work,
  portrait,
}: PortfolioShellProps) {
  const { route, isDesktop, isMediaReady } = useDetail();
  const showPortrait = Boolean(portrait) && !(isMediaReady && isDesktop && route);

  return (
    <SiteShell
      nameHref={nameHref}
      nameExternal={nameExternal}
      nameAsHeading={nameAsHeading}
    >
      <div className="home__content">
        <div className="home__primary">
          {intro}
          {route ? <DetailPanelContent route={route} /> : null}
        </div>
        <div className="home__work">{work}</div>
        {showPortrait ? portrait : null}
      </div>
    </SiteShell>
  );
}
