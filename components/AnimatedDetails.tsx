"use client";

import { useRef, type ReactNode } from "react";

const CLOSE_MS = 350;
const CLOSE_EASING = "cubic-bezier(0.4, 0, 1, 1)";

type AnimatedDetailsProps = {
  className?: string;
  summary: ReactNode;
  children: ReactNode;
};

export function AnimatedDetails({
  className,
  summary,
  children,
}: AnimatedDetailsProps) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);

  const resetShellStyles = (shell: HTMLDivElement) => {
    shell.style.display = "";
    shell.style.gridTemplateRows = "";
    shell.style.height = "";
    shell.style.overflow = "";
    shell.style.transition = "";
  };

  const handleSummaryClick = (event: React.MouseEvent<HTMLElement>) => {
    const details = detailsRef.current;
    const shell = shellRef.current;
    if (!details || !shell) return;

    if (!details.open) {
      resetShellStyles(shell);
      return;
    }

    event.preventDefault();

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      details.open = false;
      return;
    }

    const startHeight = shell.getBoundingClientRect().height;
    details.classList.add("home__details--closing");
    shell.style.display = "block";
    shell.style.gridTemplateRows = "none";
    shell.style.height = `${startHeight}px`;
    shell.style.overflow = "hidden";
    shell.style.transition = `height ${CLOSE_MS}ms ${CLOSE_EASING}`;

    requestAnimationFrame(() => {
      shell.style.height = "0px";
    });

    let finished = false;
    const finishClose = () => {
      if (finished) return;
      finished = true;
      details.open = false;
      details.classList.remove("home__details--closing");
      resetShellStyles(shell);
      shell.removeEventListener("transitionend", onTransitionEnd);
      window.clearTimeout(fallbackTimer);
    };

    const onTransitionEnd = (transitionEvent: TransitionEvent) => {
      if (
        transitionEvent.target !== shell ||
        transitionEvent.propertyName !== "height"
      ) {
        return;
      }
      finishClose();
    };

    shell.addEventListener("transitionend", onTransitionEnd);
    const fallbackTimer = window.setTimeout(finishClose, CLOSE_MS + 50);
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
