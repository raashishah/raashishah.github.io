"use client";

import { dockApps } from "@/content/apps";
import { useOS } from "./OSProvider";

export function StageStrip() {
  const { openApps, activeApp, setActiveApp } = useOS();

  if (openApps.length === 0) return <aside className="stage-strip glass" aria-hidden />;

  return (
    <aside className="stage-strip glass" aria-label="Open apps">
      {openApps.map((id) => {
        const app = dockApps.find((a) => a.id === id);
        if (!app) return null;
        return (
          <button
            key={id}
            type="button"
            className={`stage-strip__thumb ${activeApp === id ? "stage-strip__thumb--active" : ""}`}
            style={{ background: app.color }}
            onClick={() => setActiveApp(id)}
            aria-label={app.label}
            aria-current={activeApp === id ? "true" : undefined}
          >
            {app.shortLabel.slice(0, 2)}
          </button>
        );
      })}
    </aside>
  );
}
