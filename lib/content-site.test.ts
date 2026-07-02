import { describe, expect, it } from "vitest";
import { footerSocialIconIds } from "@/lib/footer-social-icons";
import { footerLinkOrder, footerLinks } from "@/content/site";

describe("content/site", () => {
  it("puts LinkedIn first in the footer", () => {
    expect(footerLinks[0]?.id).toBe("linkedin");
  });

  it("keeps header-only contact links out of the footer", () => {
    const footerIds = footerLinks.map((link) => link.id);
    expect(footerIds).not.toContain("email");
    expect(footerIds).not.toContain("calendly");
  });

  it("derives footer icon ids from footer link order", () => {
    expect(footerSocialIconIds).toEqual(footerLinkOrder);
  });

  it("maps every footer link to a social icon", () => {
    const iconIds = new Set(footerSocialIconIds);
    for (const link of footerLinks) {
      expect(iconIds.has(link.id)).toBe(true);
    }
  });
});
