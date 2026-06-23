"use client";

import { dockApps } from "@/content/apps";
import { useOS } from "./OSProvider";

type DockProps = {
  variant?: "desktop" | "mobile";
};

export function Dock({ variant = "desktop" }: DockProps) {
  const { openApp, activeApp, bouncingApp } = useOS();

  return (
    <nav
      className={`dock glass dock--${variant}`}
      aria-label="Dock"
    >
      {dockApps.map((app) => (
        <button
          key={app.id}
          type="button"
          className={`dock__item ${activeApp === app.id ? "dock__item--active" : ""} ${bouncingApp === app.id ? "dock__item--bounce" : ""}`}
          onClick={() => openApp(app.id)}
          aria-label={app.label}
          aria-pressed={activeApp === app.id}
        >
          <span className="dock__icon" style={{ background: app.color }}>
            {app.shortLabel}
          </span>
          <span className="dock__label">{app.shortLabel}</span>
        </button>
      ))}
    </nav>
  );
}
