import { describe, expect, it } from "vitest";
import { calendlyLink, footerLinks } from "@/content/site";

describe("content/site", () => {
  it("puts LinkedIn first in the footer", () => {
    expect(footerLinks[0]?.id).toBe("linkedin");
  });

  it("uses the short Calendly header label", () => {
    expect(calendlyLink.label).toBe("let's meet");
  });

  it("keeps header-only contact links out of the footer", () => {
    const footerIds = footerLinks.map((link) => link.id);
    expect(footerIds).not.toContain("email");
    expect(footerIds).not.toContain("calendly");
  });
});
