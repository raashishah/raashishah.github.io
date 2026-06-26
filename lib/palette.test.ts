import { describe, expect, it } from "vitest";
import { cssVarMap, palette, paletteStyle } from "./palette";

describe("palette", () => {
  it("exports five unified tokens", () => {
    expect(palette.base).toBe("#f5ede8");
    expect(palette.ink).toBe("#111010");
    expect(palette.rose).toBe("#c08081");
    expect(palette.greyBlue).toBe("#8fa0b4");
    expect(palette.navy).toBe("#1a2038");
  });

  it("maps CSS variables to palette hex", () => {
    expect(cssVarMap["--bg-base"]).toBe(palette.base);
    expect(cssVarMap["--accent"]).toBe(palette.rose);
    expect(cssVarMap["--text-muted"]).toBe(palette.greyBlue);
  });

  it("paletteStyle returns css var map", () => {
    expect(paletteStyle()).toEqual(cssVarMap);
  });
});
