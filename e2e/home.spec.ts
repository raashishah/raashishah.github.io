import { test, expect } from "@playwright/test";
import { siteConfig } from "../lib/metadata";

test("homepage shows intro and project list", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Raashi Shah" })).toBeVisible();
  await expect(page.getByText(siteConfig.introRole)).toBeVisible();
  await expect(page.getByText(siteConfig.introTagline)).toBeVisible();
  await expect(page.getByText("Admission Evaluation Agent")).toBeVisible();
  await expect(page.getByRole("link", { name: "Email" })).toBeVisible();
});

test("project details expand with body copy", async ({ page }) => {
  await page.goto("/");
  await page
    .locator("summary.home__details-summary")
    .filter({ hasText: "Expression" })
    .click();
  await expect(
    page.getByText("Expression automates colouring for frames hand drawn by the artist"),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "View Expression" })).toHaveCount(0);
});

test("linked projects show view project link when expanded", async ({ page }) => {
  await page.goto("/");
  await page
    .locator("summary.home__details-summary")
    .filter({ hasText: "Admission Evaluation Agent" })
    .click();

  const projectLink = page.getByRole("link", {
    name: "View Admission Evaluation Agent (opens in new tab)",
  });
  await expect(projectLink).toBeVisible();
  await expect(projectLink).toHaveAttribute("href", "https://admissions.raashishah.com");
});

test("skip link targets main content", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skipLink = page.getByRole("link", { name: "Skip to content" });
  await expect(skipLink).toBeFocused();
  await skipLink.click();
  await expect(page.locator("#main-content")).toBeVisible();
});
