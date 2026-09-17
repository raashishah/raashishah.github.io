"use client";

import type { ReactNode } from "react";
import { CursorHeatmap } from "@/components/CursorHeatmap";
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
  showCursorHeatmap?: boolean;
};

export function PortfolioShell({
  nameHref,
  nameExternal = false,
  nameAsHeading = true,
  intro,
  work,
  portrait,
  showCursorHeatmap = false,
}: PortfolioShellProps) {
  const { route, isDesktop, isMediaReady } = useDetail();
  const portraitInPrimary = isMediaReady ? isDesktop : false;
  const portraitNode = portrait ? <div className="home__portrait-wrap">{portrait}</div> : null;

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
          {portraitInPrimary ? portraitNode : null}
        </div>
        <div className="home__work">
          {work}
          {showCursorHeatmap ? <CursorHeatmap /> : null}
        </div>
        {!portraitInPrimary ? portraitNode : null}
      </div>
    </SiteShell>
  );
}
