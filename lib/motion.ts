/** Accordion motion — keep in sync with `app/globals.css` duration/ease tokens. */
export const ACCORDION_OPEN_MS = 350;
export const ACCORDION_CLOSE_MS = 250;
export const TRANSITION_FALLBACK_BUFFER_MS = 50;

/** Detail panel motion — reuse accordion timing for enter/exit. */
export const PANEL_OPEN_MS = ACCORDION_OPEN_MS;
export const PANEL_CLOSE_MS = ACCORDION_CLOSE_MS;
export const PANEL_CROSSFADE_MS = 150;

/** Bottom sheet interaction. */
export const SHEET_DISMISS_THRESHOLD_PX = 80;
export const SHEET_BREAKPOINT = "40rem";
export const SHEET_HEIGHT_MEDIUM = "50dvh";
export const SHEET_HEIGHT_LARGE = "82dvh";
