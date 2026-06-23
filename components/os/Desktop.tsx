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
      <section className="desktop-intro" aria-label="rashOS overview">
        <p className="desktop-intro__eyebrow">rashOS · live desktop</p>
        <h1 className="desktop-intro__title">strategy, shipped like software.</h1>
        <p className="desktop-intro__body">
          a warm little operating system for the work, taste, and odd fragments that make me useful.
        </p>
      </section>
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
