"use client";

import { useEffect, useRef, useState } from "react";
import { BottomSheet } from "@/components/BottomSheet";
import { ProjectDetail } from "@/components/ProjectDetail";
import { useDetail } from "@/components/DetailProvider";
import { PANEL_CLOSE_MS, watchTransition } from "@/lib/motion";
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
  const shellRef = useRef<HTMLDivElement>(null);
  const [shellOpen, setShellOpen] = useState(false);

  useEffect(() => {
    if (!isMediaReady || !isDesktop || !isOpen || isClosing) {
      setShellOpen(false);
      return;
    }

    setShellOpen(false);
    const frame = window.requestAnimationFrame(() => {
      if (shellRef.current) {
        void shellRef.current.offsetHeight;
      }
      setShellOpen(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [isMediaReady, isDesktop, isOpen, isClosing, route.path]);

  useEffect(() => {
    if (!isClosing) {
      return;
    }

    const shell = shellRef.current;
    if (!shell) {
      return;
    }

    return watchTransition(shell, "grid-template-rows", PANEL_CLOSE_MS, finishDetailClose);
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
        className="home__detail"
        tabIndex={-1}
        aria-label={route.pageLabel}
      >
        <ProjectDetail {...route} />
      </div>
    </div>
  );
}
