"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { BottomSheet } from "@/components/BottomSheet";
import { ProjectDetail } from "@/components/ProjectDetail";
import { useDetail } from "@/components/DetailProvider";
import {
  PANEL_CLOSE_MS,
} from "@/lib/motion";
import type { DetailRouteConfig } from "@/lib/detail-routes";

type DetailPanelProps = {
  route: DetailRouteConfig;
};

export function DetailPanel({ route }: DetailPanelProps) {
  const {
    isDesktop,
    isMediaReady,
    closeDetail,
    requestCloseDetail,
    finishDetailClose,
    isClosing,
  } = useDetail();
  if (!isMediaReady) {
    return null;
  }

  if (!isDesktop) {
    return (
      <BottomSheet
        title={route.pageLabel}
        onClose={closeDetail}
        requestClose={requestCloseDetail}
        onExitComplete={finishDetailClose}
        closing={isClosing}
      >
        <ProjectDetail {...route} />
      </BottomSheet>
    );
  }

  return null;
}

export function DetailPanelContent({ route }: DetailPanelProps) {
  const { isOpen, isClosing, isDesktop, isMediaReady, finishDetailClose } = useDetail();
  const detailRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const [shellOpen, setShellOpen] = useState(false);

  useLayoutEffect(() => {
    if (!isMediaReady || !isDesktop || !shellRef.current) return;
    // Commit the collapsed geometry before setting the destination.
    void shellRef.current.offsetHeight;
    setShellOpen(true);
  }, [isMediaReady, isDesktop]);

  useEffect(() => {
    if (!isClosing) {
      return;
    }

    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      finishDetailClose();
    };

    const shell = shellRef.current;

    const onTransitionEnd = (event: TransitionEvent) => {
      if (event.target !== shell || event.propertyName !== "grid-template-rows") {
        return;
      }
      finish();
    };

    shell?.addEventListener("transitionend", onTransitionEnd);
    const fallbackTimer = window.setTimeout(finish, PANEL_CLOSE_MS + 50);

    return () => {
      finished = true;
      shell?.removeEventListener("transitionend", onTransitionEnd);
      window.clearTimeout(fallbackTimer);
    };
  }, [finishDetailClose, isClosing]);

  if (!isMediaReady || (!isOpen && !isClosing) || !isDesktop) {
    return null;
  }

  const shellClassName = [
    "home__detail-shell",
    shellOpen ? "home__detail-shell--open" : "",
    isClosing ? "home__detail-shell--closing" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={shellRef} className={shellClassName}>
      <div
        ref={detailRef}
        className="home__detail"
        tabIndex={-1}
        aria-label={route.pageLabel}
      >
        <ProjectDetail {...route} />
      </div>
    </div>
  );
}
