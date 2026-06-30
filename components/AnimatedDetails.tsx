"use client";

import { useCallback, useEffect, useRef, type ReactNode } from "react";
import { useDetailsAccordion } from "@/components/DetailsAccordion";

const OPEN_MS = 350;
const CLOSE_MS = 250;
const OPEN_EASING = "cubic-bezier(0, 0, 0.2, 1)";
const CLOSE_EASING = "cubic-bezier(0.4, 0, 1, 1)";
const FALLBACK_BUFFER_MS = 50;

type AnimatedDetailsProps = {
  className?: string;
  summary: ReactNode;
  children: ReactNode;
  accordionId?: string;
};

export function AnimatedDetails({
  className,
  summary,
  children,
  accordionId,
}: AnimatedDetailsProps) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const animationCleanupRef = useRef<(() => void) | null>(null);
  const accordion = useDetailsAccordion();

  const resetShellStyles = (shell: HTMLDivElement) => {
    shell.style.display = "";
    shell.style.gridTemplateRows = "";
    shell.style.height = "";
    shell.style.overflow = "";
    shell.style.transition = "";
    shell.style.visibility = "";
    shell.style.position = "";
    shell.style.width = "";
  };

  const cancelAnimation = () => {
    animationCleanupRef.current?.();
    animationCleanupRef.current = null;
  };

  const measureOpenHeight = (details: HTMLDetailsElement, shell: HTMLDivElement) => {
    details.classList.add("home__details--measuring");
    const targetHeight = shell.scrollHeight;
    details.classList.remove("home__details--measuring");
    return targetHeight;
  };

  const animateShellHeight = ({
    details,
    shell,
    fromHeight,
    toHeight,
    durationMs,
    easing,
    onComplete,
  }: {
    details: HTMLDetailsElement;
    shell: HTMLDivElement;
    fromHeight: number;
    toHeight: number;
    durationMs: number;
    easing: string;
    onComplete: () => void;
  }) => {
    cancelAnimation();

    details.classList.add("home__details--animating");
    shell.style.display = "block";
    shell.style.gridTemplateRows = "none";
    shell.style.overflow = "hidden";
    shell.style.height = `${fromHeight}px`;
    shell.style.transition = `height ${durationMs}ms ${easing}`;

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      details.classList.remove("home__details--animating");
      shell.removeEventListener("transitionend", onTransitionEnd);
      window.clearTimeout(fallbackTimer);
      animationCleanupRef.current = null;
      onComplete();
    };

    const onTransitionEnd = (transitionEvent: TransitionEvent) => {
      if (
        transitionEvent.target !== shell ||
        transitionEvent.propertyName !== "height"
      ) {
        return;
      }
      finish();
    };

    shell.addEventListener("transitionend", onTransitionEnd);
    const fallbackTimer = window.setTimeout(finish, durationMs + FALLBACK_BUFFER_MS);

    animationCleanupRef.current = () => {
      finished = true;
      shell.removeEventListener("transitionend", onTransitionEnd);
      window.clearTimeout(fallbackTimer);
      details.classList.remove("home__details--animating");
      animationCleanupRef.current = null;
    };

    requestAnimationFrame(() => {
      shell.style.height = `${toHeight}px`;
    });
  };

  const animateClose = useCallback((): Promise<void> => {
    const details = detailsRef.current;
    const shell = shellRef.current;
    if (!details || !shell || !details.open) {
      return Promise.resolve();
    }

    return new Promise((resolve) => {
      cancelAnimation();
      details.classList.add("home__details--closing");
      const startHeight = shell.getBoundingClientRect().height;

      animateShellHeight({
        details,
        shell,
        fromHeight: startHeight,
        toHeight: 0,
        durationMs: CLOSE_MS,
        easing: CLOSE_EASING,
        onComplete: () => {
          details.open = false;
          details.classList.remove("home__details--closing");
          resetShellStyles(shell);
          resolve();
        },
      });
    });
  }, []);

  useEffect(() => {
    if (!accordionId || !accordion) return;

    accordion.register(accordionId, animateClose);
    return () => accordion.unregister(accordionId);
  }, [accordion, accordionId, animateClose]);

  const handleSummaryClick = async (event: React.MouseEvent<HTMLElement>) => {
    const details = detailsRef.current;
    const shell = shellRef.current;
    if (!details || !shell) return;

    if ((event.target as HTMLElement).closest("a")) {
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

    const targetHeight = measureOpenHeight(details, shell);
    details.classList.add("home__details--animating");
    details.open = true;

    animateShellHeight({
      details,
      shell,
      fromHeight: 0,
      toHeight: targetHeight,
      durationMs: OPEN_MS,
      easing: OPEN_EASING,
      onComplete: () => {
        details.classList.remove("home__details--animating");
        resetShellStyles(shell);
      },
    });
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
