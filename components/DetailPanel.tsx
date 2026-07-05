"use client";

import { useEffect, useRef } from "react";
import { BottomSheet } from "@/components/BottomSheet";
import { ProjectDetail } from "@/components/ProjectDetail";
import { useDetail } from "@/components/DetailProvider";
import { PANEL_CROSSFADE_MS } from "@/lib/motion";
import type { DetailRouteConfig } from "@/lib/detail-routes";

type DetailPanelProps = {
  route: DetailRouteConfig;
};

export function DetailPanel({ route }: DetailPanelProps) {
  const { isDesktop, isMediaReady, closeDetail, requestCloseDetail, isClosing, path } =
    useDetail();
  const detailRef = useRef<HTMLDivElement>(null);
  const previousPathRef = useRef(path);

  useEffect(() => {
    if (isDesktop && detailRef.current) {
      detailRef.current.focus();
    }
  }, [isDesktop, route.path]);

  useEffect(() => {
    if (previousPathRef.current && previousPathRef.current !== path && detailRef.current) {
      detailRef.current.classList.remove("home__detail--crossfade");
      void detailRef.current.offsetWidth;
      detailRef.current.classList.add("home__detail--crossfade");
      window.setTimeout(() => {
        detailRef.current?.classList.remove("home__detail--crossfade");
      }, PANEL_CROSSFADE_MS);
    }
    previousPathRef.current = path;
  }, [path]);

  if (!isMediaReady) {
    return null;
  }

  if (!isDesktop) {
    return (
      <BottomSheet
        title={route.pageLabel}
        onClose={closeDetail}
        requestClose={requestCloseDetail}
        closing={isClosing}
      >
        <ProjectDetail {...route} />
      </BottomSheet>
    );
  }

  return null;
}

export function DetailPanelContent({ route }: DetailPanelProps) {
  const { isOpen, isClosing, isDesktop, isMediaReady } = useDetail();
  const detailRef = useRef<HTMLDivElement>(null);

  if (!isMediaReady || (!isOpen && !isClosing) || !isDesktop) {
    return null;
  }

  return (
    <div
      ref={detailRef}
      className={`home__detail${isClosing ? " home__detail--exit" : " home__detail--enter"}`}
      tabIndex={-1}
      aria-label={route.pageLabel}
    >
      <ProjectDetail {...route} />
    </div>
  );
}
