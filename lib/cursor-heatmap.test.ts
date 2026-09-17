import { describe, expect, it } from "vitest";
import {
  cursorHeatmapRows,
  cursorHeatmapSize,
  fillForHeatmapCell,
} from "@/content/cursor-heatmap";

describe("cursor heatmap", () => {
  it("stores a 7 by 53 week grid", () => {
    expect(cursorHeatmapRows).toHaveLength(7);
    for (const row of cursorHeatmapRows) {
      expect(row).toHaveLength(53);
      expect(row).toMatch(/^[.0-4]+$/);
    }
  });

  it("maps pad cells to no dot and levels to old-rose fills", () => {
    expect(fillForHeatmapCell(".")).toBeNull();
    expect(fillForHeatmapCell("0")).toBe("#C080811A");
    expect(fillForHeatmapCell("4")).toBe("#C08081");
    expect(fillForHeatmapCell("x")).toBeNull();
  });

  it("sizes the svg from the grid gap", () => {
    const size = cursorHeatmapSize();
    expect(size.width).toBe(532);
    expect(size.height).toBe(72);
  });
});
