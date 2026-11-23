import { describe, expect, it } from "vitest";
import {
  HOVER_SCRAMBLE_CYCLES,
  hoverScrambleSettled,
  hoverScrambleText,
} from "./hover-scramble";

describe("hover scramble", () => {
  const word = "ARCADE";
  const glyph = () => "#";

  it("locks one character every three ticks, left to right", () => {
    expect(hoverScrambleText(word, 2, glyph)).toBe("######");
    expect(hoverScrambleText(word, HOVER_SCRAMBLE_CYCLES, glyph)).toBe("A#####");
    expect(hoverScrambleText(word, HOVER_SCRAMBLE_CYCLES * 2, glyph)).toBe("AR####");
    expect(hoverScrambleSettled(word, HOVER_SCRAMBLE_CYCLES * word.length - 1)).toBe(
      false,
    );
    expect(hoverScrambleText(word, HOVER_SCRAMBLE_CYCLES * word.length, glyph)).toBe(
      word,
    );
    expect(hoverScrambleSettled(word, HOVER_SCRAMBLE_CYCLES * word.length)).toBe(true);
  });
});
