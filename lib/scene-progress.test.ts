import { describe, expect, it } from "vitest";
import {
  easeOutCubic,
  expressionPoseIndex,
  lerp,
  progressSegment,
} from "./scene-progress";

describe("scene-progress", () => {
  it("lerps between values", () => {
    expect(lerp(0, 100, 0.5)).toBe(50);
    expect(lerp(10, 20, 0)).toBe(10);
    expect(lerp(10, 20, 1)).toBe(20);
  });

  it("segments progress", () => {
    expect(progressSegment(0, 4)).toEqual({ index: 0, local: 0 });
    expect(progressSegment(0.5, 4)).toEqual({ index: 2, local: 0 });
    expect(progressSegment(1, 4)).toEqual({ index: 3, local: 1 });
  });

  it("maps expression pose index", () => {
    expect(expressionPoseIndex(0, 8)).toBe(0);
    expect(expressionPoseIndex(0.99, 8)).toBe(7);
  });

  it("eases out cubic", () => {
    expect(easeOutCubic(0)).toBe(0);
    expect(easeOutCubic(1)).toBe(1);
    expect(easeOutCubic(0.5)).toBeGreaterThan(0.5);
  });
});
