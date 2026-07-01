import { describe, expect, it } from "vitest";
import { safeJsonLdStringify } from "./json-ld";
import {
  buildLlmsFullTxt,
  buildLlmsTxt,
  getStructuredDataJsonLd,
  llmsSummary,
  seoConfig,
} from "./site-seo";

describe("site SEO copy", () => {
  it("uses professional crawler copy separate from homepage intro fields", () => {
    expect(seoConfig.title).toContain("Raashi Shah");
    expect(seoConfig.title).not.toBe("apps and ai tools designer and engineer");
    expect(seoConfig.description.length).toBeLessThanOrEqual(160);
    expect(seoConfig.longDescription.length).toBeGreaterThan(120);
    expect(seoConfig.keywords).toContain("AI agents");
  });

  it("builds llms.txt with required spec structure", () => {
    const llmsTxt = buildLlmsTxt();

    expect(llmsTxt.startsWith("# Raashi Shah\n")).toBe(true);
    expect(llmsTxt).toMatch(/^> .+/m);
    expect(llmsTxt).toContain("## About");
    expect(llmsTxt).toContain("## Instructions");
    expect(llmsTxt).toContain("## Key pages");
    expect(llmsTxt).toContain("## Projects");
    expect(llmsTxt).toContain("https://admissions.raashishah.com");
    expect(llmsTxt).toContain("/llms-full.txt");
    expect(llmsTxt).toContain("/expression");
    expect(llmsTxt).toContain("/ondevice");
    expect(llmsTxt).toContain("BSc in Product");
    expect(llmsTxt).toContain("## Optional");
  });

  it("aligns JSON-LD person description with llms.txt blockquote", () => {
    const jsonLd = getStructuredDataJsonLd();
    const person = jsonLd["@graph"].find(
      (node) => node["@type"] === "Person",
    ) as { description: string };

    expect(person.description).toBe(llmsSummary);
  });

  it("uses a unified @graph with website, webpage, and person nodes", () => {
    const jsonLd = getStructuredDataJsonLd();

    expect(jsonLd["@graph"]).toHaveLength(3);
    expect(jsonLd["@graph"].map((node) => node["@type"])).toEqual([
      "WebSite",
      "WebPage",
      "Person",
    ]);
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
