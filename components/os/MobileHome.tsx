"use client";

import Image from "next/image";
import { dockApps } from "@/content/apps";
import type { AppId } from "@/content/types";
import { AboutApp } from "@/components/apps/AboutApp";
import { DesignPovApp } from "@/components/apps/DesignPovApp";
import { ExpressionApp } from "@/components/apps/ExpressionApp";
import { JbcnApp } from "@/components/apps/JbcnApp";
import { WorkApp } from "@/components/apps/WorkApp";
import { Dock } from "./Dock";
import { FragmentWidget, MetricsWidget } from "./Widget";
import { SpotifyWidget } from "./SpotifyWidget";
import { useOS } from "./OSProvider";

function MobileAppContent({ id }: { id: AppId }) {
  switch (id) {
    case "jbcn":
      return <JbcnApp />;
    case "design-pov":
      return <DesignPovApp />;
    case "expression":
      return <ExpressionApp />;
    case "work":
      return <WorkApp />;
    case "about":
      return <AboutApp />;
    default: {
      const _exhaustive: never = id;
      return _exhaustive;
    }
  }
}

export function MobileHome() {
  const { activeApp, openApp, closeApp } = useOS();
  const activeLabel = dockApps.find((a) => a.id === activeApp)?.label;

  return (
    <>
      <div className="mobile-home">
        <div className="mobile-home__widgets">
          <SpotifyWidget />
          <FragmentWidget />
          <MetricsWidget />
        </div>
        <button
          type="button"
          className="mobile-home__photos glass"
          onClick={() => openApp("about")}
        >
          <Image src="/img/pro.jpeg" alt="" width={64} height={64} />
          <div>
            <p className="widget__label">Photos</p>
            <p className="widget__title">Tap to open About</p>
          </div>
        </button>
      </div>

      <Dock variant="mobile" />

      {activeApp ? (
        <div className="mobile-sheet glass-strong" role="dialog" aria-label={activeLabel}>
          <header className="mobile-sheet__header">
            <h2>{activeLabel}</h2>
            <button
              type="button"
              className="mobile-sheet__close"
              onClick={() => closeApp(activeApp)}
              aria-label="Close"
            >
              ×
            </button>
          </header>
          <div className="mobile-sheet__body">
            <MobileAppContent id={activeApp} />
          </div>
        </div>
      ) : null}
    </>
  );
}
