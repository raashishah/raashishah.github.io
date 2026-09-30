import { describe, expect, it } from "vitest";
import { safeJsonLdStringify } from "./json-ld";
import { siteConfig } from "./metadata";
import {
  buildLlmsFullTxt,
  buildLlmsTxt,
  getStructuredDataJsonLd,
  llmsSummary,
  seoConfig,
} from "./site-seo";

describe("site SEO copy", () => {
  it("uses professional crawler copy separate from homepage intro fields", () => {
    expect(seoConfig.title).toBe(`${siteConfig.creator} | AI Engineering`);
    expect(seoConfig.ogTitle).toBe(seoConfig.title);
    expect(seoConfig.title).not.toBe("apps and ai tools designer and engineer");
    expect(seoConfig.description).not.toContain(siteConfig.introName);
    expect(seoConfig.description).not.toMatch(/Raashi/i);
    expect(seoConfig.description).toMatch(/AI engineering/);
    expect(seoConfig.description).toMatch(/apps and agents/);
    expect(seoConfig.description).toContain("Bombay");
    expect(seoConfig.description.toLowerCase()).not.toContain("decavalent");
    expect(seoConfig.description.toLowerCase()).not.toContain("valence");
    expect(seoConfig.description.length).toBeLessThanOrEqual(170);
    expect(seoConfig.longDescription.length).toBeGreaterThan(120);
    expect(seoConfig.longDescription).toContain(siteConfig.introName);
    expect(seoConfig.longDescription).toContain("Bombay");
    expect(seoConfig.keywords).toContain("AI engineering");
    expect(seoConfig.keywords).toContain("AI agents");
    expect(seoConfig.keywords).toContain("Bombay");
  });

  it("builds llms.txt with required spec structure", () => {
    const llmsTxt = buildLlmsTxt();

    expect(llmsTxt.startsWith(`# ${siteConfig.introName} (${siteConfig.creator})\n`)).toBe(true);
    expect(llmsTxt).toContain("## Search intents");
    expect(llmsTxt).toContain("never uses the name Decavalent");
    expect(llmsTxt).toContain("brand etymology");
    expect(llmsTxt).not.toContain("valence of ten");
    expect(llmsTxt).toMatch(/^> .+/m);
    expect(llmsTxt).toContain("## About");
    expect(llmsTxt).toContain("**Location**: Bombay");
    expect(llmsTxt).toContain("based in Bombay");
    expect(llmsTxt).toContain("AI engineer in Bombay");
    expect(llmsTxt).toContain("## Instructions");
    expect(llmsTxt).toContain("## Open to");
    expect(llmsTxt).toContain("## Why hire");
    expect(llmsTxt).toContain("## What she builds");
    expect(llmsTxt).toContain("consulting, contract work, and full-time");
    expect(llmsTxt).toContain("Cal.com");
    expect(llmsTxt).toContain("https://cal.com/raashishah");
    expect(llmsTxt).not.toContain("Calendly");
    expect(llmsTxt).toContain("## Key pages");
    expect(llmsTxt).toContain("## Projects");
    expect(llmsTxt).toContain("https://admissions.raashishah.com");
    expect(llmsTxt).toContain("https://pinkdepot.raashishah.com");
    expect(llmsTxt).toContain("https://astrothunder.life");
    expect(llmsTxt).toContain("https://github.com/raashishah/apple-hig");
    expect(llmsTxt).toContain("https://github.com/raashishah/user-call");
    expect(llmsTxt).toContain("- Skills:");
    expect(llmsTxt).toContain("/llms-full.txt");
    expect(llmsTxt).toContain("detail=expression");
    expect(llmsTxt).toContain("https://x.com/useOnDevice");
    expect(llmsTxt).not.toContain("/ondevice");
    expect(llmsTxt).toContain("## Optional");
  });

  it("keeps the personal name out of snippet-facing JSON-LD descriptions", () => {
    const jsonLd = getStructuredDataJsonLd();
    const descriptions = jsonLd["@graph"].map(
      (node) => (node as { description: string }).description,
    );

    expect(descriptions).toEqual([
      seoConfig.description,
      seoConfig.description,
      seoConfig.description,
    ]);
    for (const description of descriptions) {
      expect(description).not.toContain(siteConfig.introName);
      expect(description).not.toMatch(/Raashi/i);
    }
    expect(buildLlmsTxt()).toContain(`> ${llmsSummary}`);
    expect(llmsSummary).toContain(siteConfig.introName);
    expect(llmsSummary).toContain("Bombay");
  });

  it("uses a unified @graph with website, profile page, and person nodes", () => {
    const jsonLd = getStructuredDataJsonLd();

    expect(jsonLd["@graph"]).toHaveLength(3);
    expect(jsonLd["@graph"].map((node) => node["@type"])).toEqual([
      "WebSite",
      "ProfilePage",
      "Person",
    ]);

    const person = jsonLd["@graph"].find((node) => node["@type"] === "Person") as {
      name: string;
      alternateName: string;
      homeLocation: { "@type": string; name: string };
    };
    expect(person.name).toBe(siteConfig.introName);
    expect(person.alternateName).toBe(siteConfig.creator);
    expect(person.homeLocation).toEqual({ "@type": "Place", name: "Bombay" });
  });

  it("escapes angle brackets in JSON-LD output", () => {
    const payload = safeJsonLdStringify({ note: "</script>" });

    expect(payload).not.toContain("</script>");
    expect(payload).toContain("\\u003c/script>");
  });

  it("builds llms-full.txt with expanded project and work detail", () => {
    const llmsFullTxt = buildLlmsFullTxt();

    expect(llmsFullTxt).toContain("## Full project detail");
    expect(llmsFullTxt).toContain("Google ADK");
    expect(llmsFullTxt).toContain("4,000+ student profiles");
    expect(llmsFullTxt).toContain("### Pluto (2021–2024)");
    expect(llmsFullTxt).toContain("27% sales growth");
  });
});
