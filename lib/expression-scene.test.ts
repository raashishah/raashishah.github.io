import { describe, expect, it } from "vitest";
import { lerpPoseForTest, getExpressionPose } from "./expression-scene-helpers";

describe("expression-scene-helpers", () => {
  it("returns valid poses for edge indices", () => {
    expect(getExpressionPose(-5).fills.length).toBeGreaterThan(0);
    expect(getExpressionPose(99).fills.length).toBeGreaterThan(0);
  });

  it("lerpPose never returns undefined fills", () => {
    const a = getExpressionPose(0);
    const b = getExpressionPose(3);
    const mid = lerpPoseForTest(a, b, 0.5);
    expect(mid.fills).toBeDefined();
    expect(mid.fills.length).toBeGreaterThan(0);
    expect(mid.head.x).toBeTypeOf("number");
  });
});
