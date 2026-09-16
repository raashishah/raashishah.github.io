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

function primaryClassName(isDesktop: boolean, hasRoute: boolean, isClosing: boolean) {
  return [
    "home__primary",
    isDesktop && hasRoute && !isClosing ? "home__primary--detail-open" : "",
    isDesktop && isClosing ? "home__primary--detail-closing" : "",
  ]
    .filter(Boolean)
    .join(" ");
}

export function PortfolioShell({
  nameHref,
  nameExternal = false,
  nameAsHeading = true,
  intro,
  work,
  portrait,
}: PortfolioShellProps) {
  const { route, isDesktop, isMediaReady, isClosing } = useDetail();
  const portraitInPrimary = isMediaReady ? isDesktop : false;
  const portraitNode = portrait ? <div className="home__portrait-wrap">{portrait}</div> : null;

  return (
    <SiteShell
      nameHref={nameHref}
      nameExternal={nameExternal}
      nameAsHeading={nameAsHeading}
    >
      <div className="home__content">
        <div className={primaryClassName(isDesktop, Boolean(route), isClosing)}>
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
