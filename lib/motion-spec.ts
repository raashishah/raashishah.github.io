import {
  ACCORDION_CLOSE_MS,
  ACCORDION_OPEN_MS,
  PANEL_CLOSE_MS,
  PANEL_OPEN_MS,
  SHEET_CLOSE_MS,
  SHEET_OPEN_MS,
} from "@/lib/motion";

/** Canonical Decavalent motion spec — revised 2026-09-21. */
export const motionSpec = {
  accordion: { openMs: ACCORDION_OPEN_MS, closeMs: ACCORDION_CLOSE_MS },
  panel: { openMs: PANEL_OPEN_MS, closeMs: PANEL_CLOSE_MS },
  sheet: { openMs: SHEET_OPEN_MS, closeMs: SHEET_CLOSE_MS },
  easing: {
    enter: "cubic-bezier(0, 0, 0.2, 1)",
    exit: "cubic-bezier(0.4, 0, 1, 1)",
  },
  principles: [
    "Press and selection feedback is immediate on the next frame",
    "Switching accordions opens the requested item without waiting for the previous close",
    "Interrupted transitions continue from the current visual position; the latest action wins",
    "Detail close and accordion operations run in parallel, not fade-then-collapse",
    "Sheet drag tracks the finger directly; settling starts from the released position",
  ],
  accessibility: {
    reducedMotionTarget:
      "Minimise spatial travel; use brief opacity or immediate state change when Reduce Motion is enabled",
    implementationNote:
      "Site intentionally retains full motion under prefers-reduced-motion — documented deviation from HIG target",
  },
  acceptanceChecks: [
    "First activation produces immediate visible feedback",
    "Switching begins opening the requested item without waiting for the previous close",
    "Rapid A → B → C activation leaves only C open, with no delayed reopening",
    "Repeated activation reverses smoothly from the current position",
    "Close, Escape and sheet dragging work during entry",
    "Geometry, opacity and related content visibility settle without a second beat",
    "Focus, reading position and the desktop work column remain stable",
  ],
} as const;

export function buildMotionValidationState(sources: {
  motionTs: string;
  tokensCss: string;
  accordionCss: string;
  panelCss: string;
  animatedDetailsTs: string;
  detailsAccordionTs: string;
}): string {
  return [
    "Decavalent motion specification (target):",
    JSON.stringify(motionSpec, null, 2),
    "",
    "lib/motion.ts:",
    sources.motionTs,
    "",
    "app/styles/tokens.css (motion section):",
    sources.tokensCss,
    "",
    "app/styles/accordion.css:",
    sources.accordionCss,
    "",
    "app/styles/panel.css:",
    sources.panelCss,
    "",
    "components/AnimatedDetails.tsx:",
    sources.animatedDetailsTs,
    "",
    "components/DetailsAccordion.tsx:",
    sources.detailsAccordionTs,
  ].join("\n");
}
