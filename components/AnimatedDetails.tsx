"use client";

import { useCallback, useEffect, useRef, type ReactNode } from "react";
import { useDetailsAccordion } from "@/components/DetailsAccordion";

const OPEN_MS = 350;
const CLOSE_MS = 250;
const CLOSE_EASING = "cubic-bezier(0.4, 0, 1, 1)";
const FALLBACK_BUFFER_MS = 50;

type AnimatedDetailsProps = {
  className?: string;
  summary: ReactNode;
  children: ReactNode;
  accordionId?: string;
};

type TransitionWatch = {
  cancel: () => void;
};

function watchTransition(
  element: HTMLElement,
  propertyName: string,
  durationMs: number,
  onComplete: () => void,
): TransitionWatch {
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
    durationMs + FALLBACK_BUFFER_MS,
  );

  return {
    cancel: () => {
      finished = true;
      element.removeEventListener("transitionend", onTransitionEnd);
      window.clearTimeout(fallbackTimer);
    },
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

    const watch = watchTransition(shell, "height", durationMs, () => {
      details.classList.remove("home__details--animating");
      animationCleanupRef.current = null;
      onComplete();
    });

    animationCleanupRef.current = () => {
      watch.cancel();
      details.classList.remove("home__details--animating");
      animationCleanupRef.current = null;
    };

    requestAnimationFrame(() => {
      shell.style.height = `${toHeight}px`;
    });
  };

  const animateOpen = useCallback((): Promise<void> => {
    const details = detailsRef.current;
    const shell = shellRef.current;
    if (!details || !shell) {
      return Promise.resolve();
    }

    return new Promise((resolve) => {
      cancelAnimation();

      const targetHeight = measureOpenHeight(details, shell);
      const body = shell.querySelector<HTMLElement>(".home__project-body");

      details.classList.add("home__details--animating");
      details.open = true;

      shell.style.display = "block";
      shell.style.gridTemplateRows = "none";
      shell.style.overflow = "hidden";
      shell.style.height = `${targetHeight}px`;

      const finish = () => {
        details.classList.remove("home__details--animating");
        resetShellStyles(shell);
        animationCleanupRef.current = null;
        resolve();
      };

      if (!body) {
        finish();
        return;
      }

      const watch = watchTransition(body, "opacity", OPEN_MS, finish);

      animationCleanupRef.current = () => {
        watch.cancel();
        details.classList.remove("home__details--animating");
        animationCleanupRef.current = null;
      };

      void body.offsetHeight;
    });
  }, []);

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
