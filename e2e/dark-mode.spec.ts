import { test, expect } from "@playwright/test";
import { siteConfig } from "../lib/metadata";
import { getBodyCopyColor } from "./helpers/mobile-layout";

const LIGHT = {
  surface: "rgb(250, 249, 246)",
  ink: "rgb(29, 29, 31)",
  bodyCopy: "rgb(81, 81, 84)",
  muted: "rgb(134, 134, 139)",
} as const;

const DARK = {
  surface: "rgb(26, 26, 28)",
  ink: "rgb(245, 245, 247)",
  bodyCopy: "rgb(174, 174, 178)",
  muted: "rgb(142, 142, 147)",
} as const;

async function getPageColors(page: import("@playwright/test").Page) {
  return page.evaluate(() => {
    const root = document.documentElement;
    const styles = getComputedStyle(root);
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
    expect(colors.background).toBe(LIGHT.surface);
    expect(colors.text).toBe(LIGHT.ink);
    expect(colors.role).toBe(LIGHT.muted);
  });

  test("expanded body copy uses secondary ink in light mode", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "light" });
    await page.goto("/");
    await page
      .locator("summary.home__details-summary")
      .filter({ hasText: "Professional Tool for Animators" })
      .click();

    await expect(await getBodyCopyColor(page)).toBe(LIGHT.bodyCopy);
  });

  test("expression page uses light semantic tokens", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "light" });
    await page.goto("/expression");

    const colors = await getPageColors(page);
    expect(colors.background).toBe(LIGHT.surface);
    expect(colors.text).toBe(LIGHT.ink);
  });

  test("ondevice page uses light semantic tokens", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "light" });
    await page.goto("/ondevice");

    const colors = await getPageColors(page);
    expect(colors.background).toBe(LIGHT.surface);
    expect(colors.text).toBe(LIGHT.ink);
  });
});

test.describe("dark mode (system preference)", () => {
  test("homepage uses dark semantic tokens", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "dark" });
    await page.goto("/");

    const colors = await getPageColors(page);
    expect(colors.background).toBe(DARK.surface);
    expect(colors.text).toBe(DARK.ink);
    expect(colors.role).toBe(DARK.muted);

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

    await expect(await getBodyCopyColor(page)).toBe(DARK.bodyCopy);
  });

  test("expression page uses dark semantic tokens", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "dark" });
    await page.goto("/expression");

    const colors = await getPageColors(page);
    expect(colors.background).toBe(DARK.surface);
    expect(colors.text).toBe(DARK.ink);

    await expect(page.getByRole("heading", { name: "Expression", level: 1 })).toBeVisible();
  });

  test("ondevice page uses dark semantic tokens", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "dark" });
    await page.goto("/ondevice");

    const colors = await getPageColors(page);
    expect(colors.background).toBe(DARK.surface);
    expect(colors.text).toBe(DARK.ink);

    await expect(page.getByRole("heading", { name: "OnDevice", level: 1 })).toBeVisible();
  });

  test("switching from dark to light updates tokens", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "dark" });
    await page.goto("/");

    let colors = await getPageColors(page);
    expect(colors.background).toBe(DARK.surface);

    await page.emulateMedia({ colorScheme: "light" });
    await page.reload();

    colors = await getPageColors(page);
    expect(colors.background).toBe(LIGHT.surface);
    expect(colors.text).toBe(LIGHT.ink);
  });
});
