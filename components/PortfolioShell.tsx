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
};

export function PortfolioShell({
  nameHref,
  nameExternal = false,
  nameAsHeading = true,
  intro,
  work,
}: PortfolioShellProps) {
  const { isOpen, isClosing, route } = useDetail();
  const showDetailOpenLayout = isOpen && !isClosing;

  return (
    <SiteShell
      nameHref={nameHref}
      nameExternal={nameExternal}
      nameAsHeading={nameAsHeading}
    >
      <div
        className={`home__content${showDetailOpenLayout ? " home__content--detail-open" : ""}${isClosing ? " home__content--detail-closing" : ""}`}
      >
        <div className="home__primary">
          {intro}
          {route ? <DetailPanelContent route={route} /> : null}
        </div>
        <div className="home__work">{work}</div>
      </div>
    </SiteShell>
  );
}
