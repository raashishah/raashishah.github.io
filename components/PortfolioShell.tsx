import type { ReactNode } from "react";
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
  return (
    <SiteShell
      nameHref={nameHref}
      nameExternal={nameExternal}
      nameAsHeading={nameAsHeading}
    >
      <div className="home__content">
        {intro}
        {work}
      </div>
    </SiteShell>
  );
}
