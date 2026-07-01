import { test, expect } from "@playwright/test";
import { absoluteUrl, siteConfig } from "../lib/metadata";
import { buildLlmsTxt, seoConfig } from "../lib/site-seo";

test.describe("SEO and LLM discovery", () => {
  test("homepage exposes SEO metadata without changing visible intro copy", async ({
    page,
  }) => {
    const response = await page.goto("/", { waitUntil: "domcontentloaded" });
    expect(response?.ok()).toBeTruthy();

    await expect(page).toHaveTitle(seoConfig.title);

    const description = await page
      .locator('meta[name="description"]')
      .getAttribute("content");
    expect(description).toBe(seoConfig.description);

    const canonical = await page
      .locator('link[rel="canonical"]')
      .getAttribute("href");
    expect(canonical?.replace(/\/$/, "")).toBe(
      absoluteUrl("/").replace(/\/$/, ""),
    );

    await expect(page.locator(".home__intro .home__line--role")).toHaveText(
      siteConfig.introRole,
    );
    await expect(page.locator(".home__line--tagline")).toHaveText(
      siteConfig.introTagline,
    );
  });

  test("homepage includes unified JSON-LD graph", async ({ page }) => {
    const response = await page.goto("/", { waitUntil: "domcontentloaded" });
    expect(response?.ok()).toBeTruthy();

    const jsonLd = await page.locator('script[type="application/ld+json"]').textContent();
    expect(jsonLd).toBeTruthy();

    const parsed = JSON.parse(jsonLd ?? "{}") as {
      "@graph": Array<{ "@type": string }>;
    };
    expect(parsed["@graph"].map((node) => node["@type"])).toEqual([
      "WebSite",
      "WebPage",
      "Person",
    ]);
  });

  test("llms.txt is served as plain text with spec structure", async ({
    request,
  }) => {
    const response = await request.get("/llms.txt");

    expect(response.ok()).toBeTruthy();
    expect(response.headers()["content-type"]).toContain("text/plain");

    const body = await response.text();
    expect(body).toBe(buildLlmsTxt());
    expect(body).toContain("## Instructions");
    expect(body).toContain("## About");
  });

  test("llms-full.txt is served as plain text", async ({ request }) => {
    const response = await request.get("/llms-full.txt");

    expect(response.ok()).toBeTruthy();
    expect(response.headers()["content-type"]).toContain("text/plain");
    expect(await response.text()).toContain("## Full project detail");
  });

  test("robots.txt allows AI crawlers and links sitemap", async ({ request }) => {
    const response = await request.get("/robots.txt");
    const body = await response.text();

    expect(response.ok()).toBeTruthy();
    expect(body).toContain("User-Agent: GPTBot");
    expect(body).toContain("Allow: /");
    expect(body).toContain("Sitemap:");
  });

  test("sitemap.xml lists the homepage", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    const body = await response.text();

    expect(response.ok()).toBeTruthy();
    expect(body).toContain("<loc>");
    expect(body).toContain(absoluteUrl("/expression"));
    expect(body).toContain("</urlset>");
  });

  test("expression page is reachable with project copy", async ({ page }) => {
    const response = await page.goto("/expression", { waitUntil: "domcontentloaded" });
    expect(response?.ok()).toBeTruthy();

    await expect(page.getByRole("heading", { name: "Expression", level: 1 })).toBeVisible();
    await expect(page.getByText("Agentic tools for artists")).toBeVisible();
    await expect(page.getByRole("heading", { name: "The problem" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Raashi Shah" })).toHaveAttribute("href", "/");
  });

  test("opengraph-image is generated with Satoshi and site copy", async ({
    request,
  }) => {
    const response = await request.get("/opengraph-image");

    expect(response.ok()).toBeTruthy();
    expect(response.headers()["content-type"]).toContain("image/png");

    const body = await response.body();
    expect(body.byteLength).toBeGreaterThan(5_000);
  });
});
