import { test, expect } from "@playwright/test";
import { siteConfig } from "../lib/metadata";
import { getBodyCopyColor, getSemanticColor } from "./helpers/mobile-layout";

async function getPageColors(page: import("@playwright/test").Page) {
  return page.evaluate(() => {
    const body = document.body;
    const bodyStyles = getComputedStyle(body);
    const role = document.querySelector(".home__line--role");
    const roleColor = role ? getComputedStyle(role).color : "";

    return {
      background: bodyStyles.backgroundColor,
      text: bodyStyles.color,
      role: roleColor,
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
    expect(colors.role).toBe(await getSemanticColor(page, "--ink-tertiary"));
  });

  test("expanded body copy uses secondary ink in light mode", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "light" });
    await page.goto("/");
    await page
      .locator("summary.home__details-summary")
      .filter({ hasText: "Professional Tool for Animators" })
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
    expect(colors.role).toBe(await getSemanticColor(page, "--ink-tertiary"));

    await expect(page.getByRole("heading", { name: siteConfig.name })).toBeVisible();
    await expect(page.locator(".home__intro .home__line--role")).toHaveText(
      siteConfig.introRole,
    );
  });

  test("expanded body copy uses secondary ink in dark mode", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "dark" });
    await page.goto("/");
    await page
      .locator("summary.home__details-summary")
      .filter({ hasText: "Professional Tool for Animators" })
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

    await expect(page.getByText("Agentic tools for artists")).toBeVisible();
    await expect(page.getByText("still updating this page")).toBeVisible();
  });

  test("ondevice page uses dark semantic tokens", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "dark" });
    await page.goto("/ondevice");

    const colors = await getPageColors(page);
    expect(colors.background).toBe(await getSemanticColor(page, "--surface"));
    expect(colors.text).toBe(await getSemanticColor(page, "--ink"));

    await expect(page.getByText("Agentic health app")).toBeVisible();
    await expect(page.getByText("still updating this page")).toBeVisible();
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
