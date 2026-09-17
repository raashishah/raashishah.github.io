"use client";

import { useCallback, useEffect, useRef, type ReactNode } from "react";
import { useDetailsAccordion } from "@/components/DetailsAccordion";
import {
  ACCORDION_CLOSE_MS,
  ACCORDION_OPEN_MS,
  watchTransition,
} from "@/lib/motion";

type AnimatedDetailsProps = {
  className?: string;
  summary: ReactNode;
  children: ReactNode;
  accordionId?: string;
};

type TransitionMode = "open" | "close";

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
  const targetOpenRef = useRef(false);

  useEffect(() => () => cleanupRef.current?.(), []);

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
      targetOpenRef.current = mode === "open";

      if (mode === "open" && !details.open) {
        clearMotionClasses(details);
        details.classList.add("home__details--closing");
        details.open = true;
        void shell.offsetHeight;
        details.classList.replace("home__details--closing", "home__details--opening");
      } else if (mode === "open") {
        details.classList.replace("home__details--closing", "home__details--opening");
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

      cleanupRef.current = () => {
        cleanup();
        resolve();
      };
    });
  }, []);

  useEffect(() => {
    if (!accordionId || !accordion) return;

    accordion.register(accordionId, {
      close: () => runTransition("close"),
      contains: (node) => {
        const details = detailsRef.current;
        return Boolean(details && node && details.contains(node));
      },
    });
    return () => accordion.unregister(accordionId);
  }, [accordion, accordionId, runTransition]);

  const handleSummaryClick = async (event: React.MouseEvent<HTMLElement>) => {
    const details = detailsRef.current;
    if (!details) return;

    if (event.target instanceof Element && event.target.closest("a")) {
      return;
    }

    event.preventDefault();

    if (targetOpenRef.current) {
      await runTransition("close");
      if (!targetOpenRef.current && accordionId && accordion) {
        accordion.notifyClosed(accordionId);
      }
      return;
    }

    if (accordionId && accordion) {
      void accordion.prepareOpen(accordionId);
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
