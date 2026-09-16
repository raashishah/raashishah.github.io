import { test, expect } from "@playwright/test";
import { siteConfig } from "../lib/metadata";
import { getBodyCopyColor, getSemanticColor } from "./helpers/mobile-layout";

async function getPageColors(page: import("@playwright/test").Page) {
  return page.evaluate(() => {
    const body = document.body;
    const bodyStyles = getComputedStyle(body);
    const name = document.querySelector(".home__intro .home__intro-name");
    const tagline = document.querySelector(".home__intro .home__line--tagline");
    const subline = document.querySelector(".home__intro .home__line--subline");

    return {
      background: bodyStyles.backgroundColor,
      text: bodyStyles.color,
      name: name ? getComputedStyle(name).color : "",
      tagline: tagline ? getComputedStyle(tagline).color : "",
      subline: subline ? getComputedStyle(subline).color : "",
    };
  });
}

test.describe("light mode (default)", () => {
  test("homepage uses light semantic tokens", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "light" });
    await page.goto("/");

    const colors = await getPageColors(page);
    expect(colors.background).toBe(await getSemanticColor(page, "--surface"));
    expect(colors.text).toBe(await getSemanticColor(page, "--ink"));
    expect(colors.name).toBe(await getSemanticColor(page, "--accent"));
    expect(colors.tagline).toBe(await getSemanticColor(page, "--ink"));
    expect(colors.subline).toBe(await getSemanticColor(page, "--ink-secondary"));
  });

  test("expanded body copy uses secondary ink in light mode", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "light" });
    await page.goto("/");
    await page
      .locator("summary.home__details-summary")
      .filter({ hasText: "Animation" })
      .click();

    const expected = await getSemanticColor(page, "--ink-secondary");
    await expect(await getBodyCopyColor(page)).toBe(expected);
  });

  test("expression page uses light semantic tokens", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "light" });
    await page.goto("/expression");

    const colors = await getPageColors(page);
    expect(colors.background).toBe(await getSemanticColor(page, "--surface"));
    expect(colors.text).toBe(await getSemanticColor(page, "--ink"));
  });

  test("ondevice page uses light semantic tokens", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "light" });
    await page.goto("/ondevice");

    const colors = await getPageColors(page);
    expect(colors.background).toBe(await getSemanticColor(page, "--surface"));
    expect(colors.text).toBe(await getSemanticColor(page, "--ink"));
  });
});

test.describe("dark mode (system preference)", () => {
  test("homepage uses dark semantic tokens", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "dark" });
    await page.goto("/");

    const colors = await getPageColors(page);
    expect(colors.background).toBe(await getSemanticColor(page, "--surface"));
    expect(colors.text).toBe(await getSemanticColor(page, "--ink"));
    expect(colors.name).toBe(await getSemanticColor(page, "--accent"));
    expect(colors.tagline).toBe(await getSemanticColor(page, "--ink"));
    expect(colors.subline).toBe(await getSemanticColor(page, "--ink-secondary"));

    await expect(page.getByRole("heading", { name: siteConfig.name })).toBeVisible();
    await expect(page.locator(".home__intro .home__line--name")).toHaveText(
      siteConfig.introIdentity,
    );
  });

  test("expanded body copy uses secondary ink in dark mode", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "dark" });
    await page.goto("/");
    await page
      .locator("summary.home__details-summary")
      .filter({ hasText: "Animation" })
      .click();

    const expected = await getSemanticColor(page, "--ink-secondary");
    await expect(await getBodyCopyColor(page)).toBe(expected);
  });

  test("expression page uses dark semantic tokens", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "dark" });
    await page.goto("/expression");

    const colors = await getPageColors(page);
    expect(colors.background).toBe(await getSemanticColor(page, "--surface"));
    expect(colors.text).toBe(await getSemanticColor(page, "--ink"));

    await expect(page.locator(".home__intro .home__line--role")).toHaveText(
      "Agentic Tools for Artists",
    );
    await expect(page.getByText("Still updating this page")).toBeVisible();
  });

  test("ondevice page uses dark semantic tokens", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "dark" });
    await page.goto("/ondevice");

    const colors = await getPageColors(page);
    expect(colors.background).toBe(await getSemanticColor(page, "--surface"));
    expect(colors.text).toBe(await getSemanticColor(page, "--ink"));

    await expect(page.locator(".home__intro .home__line--role")).toHaveText(
      "Health App",
    );
    await expect(page.getByText("Still updating this page")).toBeVisible();
  });

  test("soft nav expression panel uses dark semantic tokens", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "dark" });
    await page.setViewportSize({ width: 1024, height: 800 });
    await page.goto("/");
    await page
      .locator("summary.home__details-summary")
      .filter({ hasText: "Animation" })
      .click();
    await page.getByRole("link", { name: "Colouring for hand-drawn animation" }).click();

    const colors = await getPageColors(page);
    expect(colors.background).toBe(await getSemanticColor(page, "--surface"));
    expect(colors.text).toBe(await getSemanticColor(page, "--ink"));
    await expect(page.locator(".home__detail")).toBeVisible();
  });

  test("switching from dark to light updates tokens", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "dark" });
    await page.goto("/");

    let colors = await getPageColors(page);
    expect(colors.background).toBe(await getSemanticColor(page, "--surface"));

    await page.emulateMedia({ colorScheme: "light" });
    await page.reload();

    colors = await getPageColors(page);
    expect(colors.background).toBe(await getSemanticColor(page, "--surface"));
    expect(colors.text).toBe(await getSemanticColor(page, "--ink"));
  });
});
