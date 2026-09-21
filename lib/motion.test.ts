import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  ACCORDION_CLOSE_MS,
  ACCORDION_OPEN_MS,
  PANEL_CLOSE_MS,
  PANEL_OPEN_MS,
  SHEET_CLOSE_MS,
  SHEET_OPEN_MS,
} from "@/lib/motion";
import { buildMotionValidationState, motionSpec } from "@/lib/motion-spec";

const repoRoot = join(import.meta.dirname, "..");

function readRepoFile(relativePath: string): string {
  return readFileSync(join(repoRoot, relativePath), "utf8");
}

describe("motion constants", () => {
  it("matches the revised Decavalent timing spec", () => {
    expect(ACCORDION_OPEN_MS).toBe(220);
    expect(ACCORDION_CLOSE_MS).toBe(160);
    expect(PANEL_OPEN_MS).toBe(220);
    expect(PANEL_CLOSE_MS).toBe(160);
    expect(SHEET_OPEN_MS).toBe(280);
    expect(SHEET_CLOSE_MS).toBe(220);
  });

  it("exports the same values through motionSpec", () => {
    expect(motionSpec.accordion.openMs).toBe(ACCORDION_OPEN_MS);
    expect(motionSpec.panel.closeMs).toBe(PANEL_CLOSE_MS);
    expect(motionSpec.sheet.openMs).toBe(SHEET_OPEN_MS);
  });
});

describe("motion CSS tokens", () => {
  it("keeps semantic duration tokens aligned with lib/motion.ts", () => {
    const tokens = readRepoFile("app/styles/tokens.css");
    expect(tokens).toContain(`--duration-accordion-open: ${ACCORDION_OPEN_MS}ms`);
    expect(tokens).toContain(`--duration-accordion-close: ${ACCORDION_CLOSE_MS}ms`);
    expect(tokens).toContain(`--duration-panel-open: ${PANEL_OPEN_MS}ms`);
    expect(tokens).toContain(`--duration-panel-close: ${PANEL_CLOSE_MS}ms`);
    expect(tokens).toContain(`--duration-sheet-open: ${SHEET_OPEN_MS}ms`);
    expect(tokens).toContain(`--duration-sheet-close: ${SHEET_CLOSE_MS}ms`);
  });
});

describe("motion implementation signals", () => {
  it("uses simultaneous accordion switching", () => {
    const detailsAccordion = readRepoFile("components/DetailsAccordion.tsx");
    expect(detailsAccordion).not.toMatch(/await Promise\.all\(\[closingDetail, closingAccordion\]\)/);
    expect(detailsAccordion).toContain("void closersRef.current.get(currentOpenId)?.close()");
  });

  it("provides immediate accordion feedback before the transition", () => {
    const animatedDetails = readRepoFile("components/AnimatedDetails.tsx");
    expect(animatedDetails).toContain('details.classList.toggle("home__details--armed"');
    const accordionCss = readRepoFile("app/styles/accordion.css");
    expect(accordionCss).toContain(".home__details--armed .home__details-summary");
  });

  it("builds a Jev validation payload from source files", () => {
    const state = buildMotionValidationState({
      motionTs: readRepoFile("lib/motion.ts"),
      tokensCss: readRepoFile("app/styles/tokens.css"),
      accordionCss: readRepoFile("app/styles/accordion.css"),
      panelCss: readRepoFile("app/styles/panel.css"),
      animatedDetailsTs: readRepoFile("components/AnimatedDetails.tsx"),
      detailsAccordionTs: readRepoFile("components/DetailsAccordion.tsx"),
    });

    expect(state).toContain('"openMs": 220');
    expect(state).toContain("home__details--armed");
    expect(state).toContain("prepareOpen");
  });
});
