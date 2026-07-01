import type { ReactNode } from "react";
import { SiteShell } from "@/components/SiteShell";
import type { NameEasterEgg } from "@/content/site";

type PortfolioShellProps = {
  nameHref: string;
  nameExternal?: boolean;
  nameEasterEgg?: NameEasterEgg;
  nameAsHeading?: boolean;
  intro: ReactNode;
  work: ReactNode;
};

export function PortfolioShell({
  nameHref,
  nameExternal = false,
  nameEasterEgg,
  nameAsHeading = true,
  intro,
  work,
}: PortfolioShellProps) {
  return (
    <SiteShell
      nameHref={nameHref}
      nameExternal={nameExternal}
      nameEasterEgg={nameEasterEgg}
      nameAsHeading={nameAsHeading}
    >
      <div className="home__content">
        {intro}
        {work}
      </div>
    </SiteShell>
  );
}
