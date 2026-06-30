import { test, expect } from "@playwright/test";
import { siteConfig } from "../lib/metadata";

test("homepage shows intro and project list", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Raashi Shah" })).toBeVisible();
  await expect(page.locator(".home__line--role")).toHaveText(siteConfig.introRole);
  await expect(page.locator(".home__line--tagline")).toHaveText(
    siteConfig.introTagline,
  );
  await expect(page.getByText("Entreprise-grade Agents")).toBeVisible();
  await expect(page.getByRole("link", { name: "email me" })).toBeVisible();
});

test("project details expand with body copy", async ({ page }) => {
  await page.goto("/");
  await page
    .locator("summary.home__details-summary")
    .filter({ hasText: "Expression" })
    .click();
  await expect(
    page.getByRole("link", { name: "Auto-colouring for hand drawn animation" }),
  ).toBeVisible();
  await expect(
    page.getByText("This problem remains unsolved worldwide"),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "View Expression" })).toHaveCount(0);
});

test("linked projects show inline body link when expanded", async ({ page }) => {
  await page.goto("/");
  await page
    .locator("summary.home__details-summary")
    .filter({ hasText: "Entreprise-grade Agents" })
    .click();

  const projectLink = page.getByRole("link", {
    name: "Admissions evaluation agent",
  });
  await expect(projectLink).toBeVisible();
  await expect(projectLink).toHaveAttribute(
    "href",
    "https://admissions.raashishah.com",
  );
  await expect(
    page.getByRole("link", { name: /View Entreprise-grade Agents/ }),
  ).toHaveCount(0);
});

test("skip link targets main content", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skipLink = page.getByRole("link", { name: "Skip to content" });
  await expect(skipLink).toBeFocused();
  await skipLink.click();
  await expect(page.locator("#main-content")).toBeVisible();
});
