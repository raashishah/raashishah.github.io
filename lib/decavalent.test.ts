import { describe, expect, it } from "vitest";
import { decavalentDictionary } from "@/content/decavalent";

describe("decavalent dictionary copy", () => {
  it("keeps a single UK pronunciation", () => {
    expect(decavalentDictionary.pronunciation).toBe("dɪˈkeɪ.və.lənt");
    expect(decavalentDictionary).not.toHaveProperty("pronunciations");
  });

  it("uses Oxford compact sense order: chemistry gloss then figurative citation", () => {
    expect(decavalentDictionary.partOfSpeech).toBe("adjective");
    expect(decavalentDictionary.grammarLabel).toBe("chemistry");
    expect(decavalentDictionary.gloss).toContain("valence of ten");
    expect(decavalentDictionary.citations[0]?.example).toBe("a decavalent atom");
    expect(decavalentDictionary.citations[1]?.label).toBe("figurative");
    expect(decavalentDictionary.origin).toContain("Greek deka");
  });
});
