import { afterEach, describe, expect, it, vi } from "vitest";
import { safeJsonLdStringify } from "./json-ld";
import {
  buildLlmsFullTxt,
  buildLlmsTxt,
  getStructuredDataJsonLd,
  llmsSummary,
  seoConfig,
} from "./site-seo";

const ORIGINAL_NEXT_PUBLIC_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;
const ORIGINAL_SITE_URL = process.env.SITE_URL;

async function importMetadataModule() {
  vi.resetModules();
  return import("./metadata");
}

afterEach(() => {
  process.env.NEXT_PUBLIC_SITE_URL = ORIGINAL_NEXT_PUBLIC_SITE_URL;
  process.env.SITE_URL = ORIGINAL_SITE_URL;
  vi.resetModules();
});

describe("metadata helpers", () => {
  it("prefers NEXT_PUBLIC_SITE_URL over SITE_URL", async () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://public.example";
    process.env.SITE_URL = "https://server.example";

    const metadata = await importMetadataModule();

    expect(metadata.getSiteUrl().toString()).toBe("https://public.example/");
  });

  it("falls back to SITE_URL when NEXT_PUBLIC_SITE_URL is missing", async () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    process.env.SITE_URL = "https://server.example";

    const metadata = await importMetadataModule();

    expect(metadata.getSiteUrl().toString()).toBe("https://server.example/");
  });

  it("builds absolute URLs against the default production origin", async () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    delete process.env.SITE_URL;

    const metadata = await importMetadataModule();

    expect(metadata.absoluteUrl("/")).toBe("https://raashishah.com/");
  });

  it("keeps intro copy aligned across homepage and metadata helpers", async () => {
    const metadata = await importMetadataModule();

    expect(metadata.siteConfig.introRole).toBe(
      "Technical Product Manager, AI Engineer",
    );
    expect(metadata.siteConfig.introTagline).toBe(
      "Designing and developing apps and AI agents end-to-end",
    );
    expect(metadata.siteConfig.description).toBe(
      "Technical Product Manager, AI Engineer. Designing and developing apps and AI agents end-to-end.",
    );
  });
});

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
    expect(llmsTxt).toContain("## Projects");
    expect(llmsTxt).toContain("https://admissions.raashishah.com");
    expect(llmsTxt).toContain("/llms-full.txt");
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
    expect(llmsFullTxt).toContain("### Pluto (2021–2024)");
  });
});
