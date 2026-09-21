/** Accordion motion — keep in sync with `app/styles/tokens.css` duration tokens. */
export const ACCORDION_OPEN_MS = 220;
export const ACCORDION_CLOSE_MS = 160;
export const TRANSITION_FALLBACK_BUFFER_MS = 50;

/** Desktop detail panel motion. */
export const PANEL_OPEN_MS = 220;
export const PANEL_CLOSE_MS = 160;

/** Phone bottom sheet motion. */
export const SHEET_OPEN_MS = 280;
export const SHEET_CLOSE_MS = 220;

/** Bottom sheet interaction. */
export const SHEET_DISMISS_THRESHOLD_PX = 80;
export const SHEET_BREAKPOINT = "40rem";
export const SHEET_HEIGHT_MEDIUM = "70dvh";
export const SHEET_HEIGHT_LARGE = "82dvh";

export function watchTransition(
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
