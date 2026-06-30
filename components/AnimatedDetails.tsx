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

  const animateClose = useCallback((): Promise<void> => {
    const details = detailsRef.current;
    const shell = shellRef.current;
    if (!details || !shell || !details.open) {
      return Promise.resolve();
    }

    return new Promise((resolve) => {
      cancelAnimation();
      details.classList.remove("home__details--opening");
      details.classList.add("home__details--closing");

      const cleanup = watchTransition(
        shell,
        "grid-template-rows",
        ACCORDION_CLOSE_MS,
        () => {
          details.open = false;
          clearMotionClasses(details);
          cleanupRef.current = null;
          resolve();
        },
      );

      cleanupRef.current = cleanup;
    });
  }, []);

  const animateOpen = useCallback((): Promise<void> => {
    const details = detailsRef.current;
    const shell = shellRef.current;
    if (!details || !shell) {
      return Promise.resolve();
    }

    return new Promise((resolve) => {
      cancelAnimation();
      clearMotionClasses(details);
      details.classList.add("home__details--opening");
      details.open = true;

      void shell.offsetHeight;

      const cleanup = watchTransition(
        shell,
        "grid-template-rows",
        ACCORDION_OPEN_MS,
        () => {
          details.classList.remove("home__details--opening");
          cleanupRef.current = null;
          resolve();
        },
      );

      cleanupRef.current = cleanup;
    });
  }, []);

  useEffect(() => {
    if (!accordionId || !accordion) return;

    accordion.register(accordionId, animateClose);
    return () => accordion.unregister(accordionId);
  }, [accordion, accordionId, animateClose]);

  const handleSummaryClick = async (event: React.MouseEvent<HTMLElement>) => {
    const details = detailsRef.current;
    if (!details) return;

    if (event.target instanceof Element && event.target.closest("a")) {
      return;
    }

    event.preventDefault();
    cancelAnimation();

    if (details.open) {
      await animateClose();
      if (accordionId && accordion) {
        accordion.notifyClosed(accordionId);
      }
      return;
    }

    if (accordionId && accordion) {
      await accordion.prepareOpen(accordionId);
    }

    await animateOpen();
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
