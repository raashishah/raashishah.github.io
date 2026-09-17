import { describe, expect, it } from "vitest";
import { footerSocialIconIds } from "@/lib/footer-social-icons";
import {
  coral,
  cursorProfile,
  footerLinkOrder,
  footerLinks,
  homePortrait,
} from "@/content/site";
import type { FooterSocialLinkId } from "@/content/types";

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
    const iconIds = new Set<FooterSocialLinkId>(footerSocialIconIds);
    for (const link of footerLinks) {
      expect(iconIds.has(link.id)).toBe(true);
    }
  });

  it("keeps the brand coral mark at a single shared path", () => {
    expect(coral.src).toBe("/img/coral.svg");
  });

  it("points the Cursor heatmap at the public profile", () => {
    expect(cursorProfile.href).toBe("https://cursor.com/@rashdriving");
    expect(cursorProfile.handle).toBe("@rashdriving");
    expect(cursorProfile.avatar.src).toBe("/img/raashi.jpg");
  });

  it("keeps the homepage portrait as a local rambo photo", () => {
    expect(homePortrait.src).toBe("/img/rambo.jpg");
    expect(homePortrait.alt).toBe("Rambo the cat");
    expect(homePortrait.width).toBe(1536);
    expect(homePortrait.height).toBe(1152);
  });
});
