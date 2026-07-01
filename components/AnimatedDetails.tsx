"use client";

import { useCallback, useEffect, useRef, type ReactNode } from "react";
import { useDetailsAccordion } from "@/components/DetailsAccordion";
import {
  ACCORDION_CLOSE_MS,
  ACCORDION_OPEN_MS,
  TRANSITION_FALLBACK_BUFFER_MS,
} from "@/lib/motion";

type AnimatedDetailsProps = {
  className?: string;
  summary: ReactNode;
  children: ReactNode;
  accordionId?: string;
};

type TransitionMode = "open" | "close";

function watchTransition(
  element: HTMLElement,
  propertyName: string,
  durationMs: number,
  onComplete: () => void,
): () => void {
  let finished = false;

  const finish = () => {
    if (finished) return;
    finished = true;
    element.removeEventListener("transitionend", onTransitionEnd);
    window.clearTimeout(fallbackTimer);
    onComplete();
  };

  const onTransitionEnd = (event: TransitionEvent) => {
    if (event.target !== element || event.propertyName !== propertyName) {
      return;
    }
    finish();
  };

  element.addEventListener("transitionend", onTransitionEnd);
  const fallbackTimer = window.setTimeout(
    finish,
    durationMs + TRANSITION_FALLBACK_BUFFER_MS,
  );

  return () => {
    finished = true;
    element.removeEventListener("transitionend", onTransitionEnd);
    window.clearTimeout(fallbackTimer);
  };
}

export function AnimatedDetails({
  className,
  summary,
  children,
  accordionId,
}: AnimatedDetailsProps) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const cleanupRef = useRef<(() => void) | null>(null);
  const accordion = useDetailsAccordion();

  const cancelAnimation = () => {
    cleanupRef.current?.();
    cleanupRef.current = null;
  };

  const clearMotionClasses = (details: HTMLDetailsElement) => {
    details.classList.remove("home__details--opening", "home__details--closing");
  };

  const runTransition = useCallback((mode: TransitionMode): Promise<void> => {
    const details = detailsRef.current;
    const shell = shellRef.current;
    if (!details || !shell) {
      return Promise.resolve();
    }

    if (mode === "close" && !details.open) {
      return Promise.resolve();
    }

    const durationMs = mode === "open" ? ACCORDION_OPEN_MS : ACCORDION_CLOSE_MS;

    return new Promise((resolve) => {
      cancelAnimation();

      if (mode === "open") {
        clearMotionClasses(details);
        details.classList.add("home__details--opening");
        details.open = true;
        void shell.offsetHeight;
      } else {
        details.classList.remove("home__details--opening");
        details.classList.add("home__details--closing");
      }

      const cleanup = watchTransition(
        shell,
        "grid-template-rows",
        durationMs,
        () => {
          if (mode === "close") {
            details.open = false;
            clearMotionClasses(details);
          } else {
            details.classList.remove("home__details--opening");
          }
          cleanupRef.current = null;
          resolve();
        },
      );

      cleanupRef.current = cleanup;
    });
  }, []);

  useEffect(() => {
    if (!accordionId || !accordion) return;

    accordion.register(accordionId, () => runTransition("close"));
    return () => accordion.unregister(accordionId);
  }, [accordion, accordionId, runTransition]);

  const handleSummaryClick = async (event: React.MouseEvent<HTMLElement>) => {
    const details = detailsRef.current;
    if (!details) return;

    if (event.target instanceof Element && event.target.closest("a")) {
      return;
    }

    event.preventDefault();
    cancelAnimation();

    if (details.open) {
      await runTransition("close");
      if (accordionId && accordion) {
        accordion.notifyClosed(accordionId);
      }
      return;
    }

    if (accordionId && accordion) {
      await accordion.prepareOpen(accordionId);
    }

    await runTransition("open");
  };

  return (
    <details ref={detailsRef} className={className}>
      <summary
        className="home__details-summary"
        onClickCapture={handleSummaryClick}
      >
        {summary}
      </summary>
      <div ref={shellRef} className="home__project-body-shell">
        {children}
      </div>
    </details>
  );
}
