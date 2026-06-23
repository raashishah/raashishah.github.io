"use client";

import { dockApps } from "@/content/apps";
import type { AppId } from "@/content/types";
import { AboutApp } from "@/components/apps/AboutApp";
import { DesignPovApp } from "@/components/apps/DesignPovApp";
import { ExpressionApp } from "@/components/apps/ExpressionApp";
import { JbcnApp } from "@/components/apps/JbcnApp";
import { WorkApp } from "@/components/apps/WorkApp";
import { useOS } from "./OSProvider";

function AppContent({ id }: { id: AppId }) {
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

export function StageWindow() {
  const { activeApp, closeApp } = useOS();

  if (!activeApp) return null;

  const app = dockApps.find((a) => a.id === activeApp);
  if (!app) return null;

  return (
    <section className="stage-window glass-strong" aria-label={app.label}>
      <header className="stage-window__titlebar">
        <h2 className="stage-window__title">{app.label}</h2>
        <div className="stage-window__controls">
          <button
            type="button"
            className="stage-window__control stage-window__control--close"
            onClick={() => closeApp(activeApp)}
            aria-label={`Close ${app.label}`}
          />
          <span className="stage-window__control stage-window__control--min" aria-hidden="true" />
          <span className="stage-window__control stage-window__control--max" aria-hidden="true" />
        </div>
      </header>
      <div className="stage-window__content">
        <AppContent id={activeApp} />
      </div>
    </section>
  );
}
