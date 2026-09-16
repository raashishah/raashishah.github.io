/** Accordion motion — keep in sync with `app/globals.css` duration/ease tokens. */
export const ACCORDION_OPEN_MS = 350;
export const ACCORDION_CLOSE_MS = 250;
export const TRANSITION_FALLBACK_BUFFER_MS = 50;

/** Detail panel motion — reuse accordion timing for enter/exit. */
export const PANEL_OPEN_MS = ACCORDION_OPEN_MS;
export const PANEL_CLOSE_MS = ACCORDION_CLOSE_MS;

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
