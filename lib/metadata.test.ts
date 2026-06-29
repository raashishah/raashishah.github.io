import { afterEach, describe, expect, it, vi } from "vitest";

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

  it("keeps intro copy aligned across homepage, metadata, and OG image", async () => {
    const metadata = await importMetadataModule();

    expect(metadata.siteConfig.introRole).toBe("Technical Product Manager");
    expect(metadata.siteConfig.introTagline).toBe(
      "Designing and developing apps and AI agents end-to-end",
    );
    expect(metadata.siteConfig.description).toBe(
      "Technical Product Manager. Designing and developing apps and AI agents end-to-end.",
    );
  });
});
