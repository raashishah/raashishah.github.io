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
        <div className="home__work">{work}</div>
        {!portraitInPrimary ? portraitNode : null}
      </div>
    </SiteShell>
  );
}
