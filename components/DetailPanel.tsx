"use client";

import { useEffect, useRef, useState } from "react";
import { BottomSheet } from "@/components/BottomSheet";
import { ProjectDetail } from "@/components/ProjectDetail";
import { useDetail } from "@/components/DetailProvider";
import {
  PANEL_CLOSE_MS,
  PANEL_CROSSFADE_MS,
  PANEL_OPEN_MS,
  TRANSITION_FALLBACK_BUFFER_MS,
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
    path,
  } = useDetail();
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

  useEffect(() => {
    if (isClosing) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      setShellOpen(true);
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [isClosing]);

  useEffect(() => {
    if (!shellOpen || isClosing) {
      return;
    }

    const shell = shellRef.current;
    if (!shell) {
      return;
    }

    shell.classList.add("home__detail-shell--opening");
    void shell.offsetHeight;

    let finished = false;
    const finishOpening = () => {
      if (finished) {
        return;
      }
      finished = true;
      shell.classList.remove("home__detail-shell--opening");
    };

    const onTransitionEnd = (event: TransitionEvent) => {
      if (event.target !== shell || event.propertyName !== "grid-template-rows") {
        return;
      }
      finishOpening();
    };

    shell.addEventListener("transitionend", onTransitionEnd);
    const fallbackTimer = window.setTimeout(
      finishOpening,
      PANEL_OPEN_MS + TRANSITION_FALLBACK_BUFFER_MS,
    );

    return () => {
      finished = true;
      shell.removeEventListener("transitionend", onTransitionEnd);
      window.clearTimeout(fallbackTimer);
    };
  }, [isClosing, shellOpen]);

  useEffect(() => {
    if (!isClosing) {
      return;
    }

    let finished = false;
    let animationDone = false;
    let transitionDone = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      finishDetailClose();
    };

    const maybeFinish = () => {
      if (animationDone && transitionDone) {
        finish();
      }
    };

    const detail = detailRef.current;
    const shell = shellRef.current;

    const onAnimationEnd = (event: AnimationEvent) => {
      if (event.target !== detail || event.animationName !== "home-detail-exit") {
        return;
      }
      animationDone = true;
      maybeFinish();
    };

    const onTransitionEnd = (event: TransitionEvent) => {
      if (event.target !== shell || event.propertyName !== "grid-template-rows") {
        return;
      }
      transitionDone = true;
      maybeFinish();
    };

    detail?.addEventListener("animationend", onAnimationEnd);
    shell?.addEventListener("transitionend", onTransitionEnd);
    const fallbackTimer = window.setTimeout(finish, PANEL_CLOSE_MS + 50);

    return () => {
      finished = true;
      detail?.removeEventListener("animationend", onAnimationEnd);
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
        className={`home__detail${isClosing ? " home__detail--exit" : ""}`}
        tabIndex={-1}
        aria-label={route.pageLabel}
      >
        <ProjectDetail {...route} />
      </div>
    </div>
  );
}
