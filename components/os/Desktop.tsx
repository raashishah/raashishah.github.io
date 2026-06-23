"use client";

import { PhotosStack, ConnectStack } from "./DesktopStack";
import { FragmentWidget, MetricsWidget } from "./Widget";
import { SpotifyWidget } from "./SpotifyWidget";
import { StageWindow } from "./StageWindow";
import { useOS } from "./OSProvider";

export function Desktop() {
  const { openApp } = useOS();

  return (
    <main className="desktop">
      <div className="desktop__grid">
        <PhotosStack onClick={() => openApp("about")} />
        <SpotifyWidget />
        <ConnectStack />
        <FragmentWidget />
        <MetricsWidget />
      </div>
      <StageWindow />
    </main>
  );
}
