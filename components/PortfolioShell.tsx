"use client";

import type { ReactNode } from "react";
import { DetailPanelContent } from "@/components/DetailPanel";
import { useDetail } from "@/components/DetailProvider";
import { SiteShell } from "@/components/SiteShell";

type PortfolioShellProps = {
  nameHref: string;
  nameExternal?: boolean;
  masthead?: ReactNode;
  intro: ReactNode;
  work: ReactNode;
  portrait?: ReactNode;
};

export function PortfolioShell({
  nameHref,
  nameExternal = false,
  masthead,
  intro,
  work,
  portrait,
}: PortfolioShellProps) {
  const { route, isDesktop, isMediaReady, isOpen, isClosing } = useDetail();
  const portraitInPrimary = isMediaReady ? isDesktop : false;
  const portraitNode = portrait ? <div className="home__portrait-wrap">{portrait}</div> : null;
  const splitOpen = Boolean(route) && isMediaReady && isDesktop && (isOpen || isClosing);
  const contentClassName = [
    masthead ? "home__content home__content--masthead" : "home__content",
    splitOpen ? "home__content--detail" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <SiteShell
      nameHref={nameHref}
      nameExternal={nameExternal}
    >
      <div className={contentClassName}>
        {masthead ? <div className="home__masthead">{masthead}</div> : null}
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
