"use client";

import { MenuBar } from "./MenuBar";
import { StageStrip } from "./StageStrip";
import { Desktop } from "./Desktop";
import { Dock } from "./Dock";
import { MobileHome } from "./MobileHome";
import { OSProvider, useOS } from "./OSProvider";

function RashOSInner() {
  const { booting } = useOS();

  return (
    <div className={`os-root ${booting ? "os-root--booting" : ""}`}>
      <MenuBar />
      <div className="os-shell">
        <div className="os-wallpaper" aria-hidden="true">
          <span className="os-wallpaper__orb os-wallpaper__orb--rose" />
          <span className="os-wallpaper__orb os-wallpaper__orb--violet" />
          <span className="os-wallpaper__noise" />
          <span className="os-wallpaper__signal" />
        </div>
        <StageStrip />
        <Desktop />
      </div>
      <Dock variant="desktop" />
      <MobileHome />
    </div>
  );
}

export function RashOS() {
  return (
    <OSProvider>
      <RashOSInner />
    </OSProvider>
  );
}
