import { expect, test } from "@playwright/test";
import { siteConfig } from "../lib/metadata";
import {
  ACCORDION_CLOSE_MS,
  PANEL_CLOSE_MS,
  TRANSITION_FALLBACK_BUFFER_MS,
} from "../lib/motion";

const AFTER_CLOSE_MS =
  Math.max(ACCORDION_CLOSE_MS, PANEL_CLOSE_MS) + TRANSITION_FALLBACK_BUFFER_MS + 50;

test.describe("detail panel accordion interaction", () => {
  test("collapsing same accordion keeps expression detail open on desktop", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    await page
      .locator("summary.home__details-summary")
      .filter({ hasText: "Animation" })
      .click();
    await page
      .getByRole("link", { name: "Colouring for hand-drawn animation" })
      .click();

    await expect(page).toHaveURL("/expression");
    await expect(page.locator(".home__detail")).toBeVisible();

    await page
      .locator("summary.home__details-summary")
      .filter({ hasText: "Animation" })
      .click();

    await page.waitForTimeout(AFTER_CLOSE_MS);

    await expect(page).toHaveURL("/expression");
    await expect(page.locator(".home__detail")).toBeVisible();
    await expect(
      page.locator("details").filter({ hasText: "Animation" }),
    ).not.toHaveAttribute("open");
  });

  test("soft navigation keeps homepage mounted on desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    await page
      .locator("summary.home__details-summary")
      .filter({ hasText: "Animation" })
      .click();
    await page
      .getByRole("link", { name: "Colouring for hand-drawn animation" })
      .click();

    await expect(page).toHaveURL("/expression");
    await expect(page.locator("[data-homepage]")).toHaveCount(1);
    await expect(page.getByText("Entreprise-grade")).toBeVisible();
    await expect(page.locator(".home__detail")).toBeVisible();
  });

  test("soft navigation keeps homepage mounted on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page
      .locator("summary.home__details-summary")
      .filter({ hasText: "Animation" })
      .click();
    await page
      .getByRole("link", { name: "Colouring for hand-drawn animation" })
      .click();

    await expect(page).toHaveURL("/expression");
    await expect(page.locator("[data-homepage]")).toHaveCount(1);
    await expect(page.locator(".home__sheet")).toBeVisible();
    await expect(page.getByText("Entreprise-grade")).toBeVisible();
  });

  test("detail link keeps homepage list visible on desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    await page
      .locator("summary.home__details-summary")
      .filter({ hasText: "Animation" })
      .click();
    await page
      .getByRole("link", { name: "Colouring for hand-drawn animation" })
      .click();

    await expect(page).toHaveURL("/expression");
    await expect(page.locator(".home__detail")).toBeVisible();
    await expect(page.getByText("Entreprise-grade")).toBeVisible();
    await expect(page.locator(".home__intro .home__line--tagline")).toHaveText(
      siteConfig.introTagline,
    );
  });
});

test.describe("nested detail panel accordions", () => {
  async function openExpressionDetail(page: import("@playwright/test").Page) {
    await page.goto("/");
    await page
      .locator("summary.home__details-summary")
      .filter({ hasText: "Animation" })
      .click();
    await page
      .getByRole("link", { name: "Colouring for hand-drawn animation" })
      .click();
    await expect(page).toHaveURL("/expression");
  }

  test("clicking Auto-Colour inside expression detail keeps panel open on desktop", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 768, height: 800 });
    await openExpressionDetail(page);
    await expect(page.locator(".home__detail")).toBeVisible();

    await page
      .locator(".home__detail-content summary.home__details-summary")
      .filter({ hasText: "Auto-Colour" })
      .click();

    await page.waitForTimeout(AFTER_CLOSE_MS);

    await expect(page).toHaveURL("/expression");
    await expect(page.locator(".home__detail")).toBeVisible();
    await expect(
      page.locator(".home__detail-content details").filter({ hasText: "Auto-Colour" }),
    ).toHaveAttribute("open");
  });

  test("clicking Auto-Colour inside expression detail keeps sheet open on mobile", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 844 });
    await openExpressionDetail(page);
    await expect(page.locator(".home__sheet")).toBeVisible();

    await page
      .locator(".home__sheet summary.home__details-summary")
      .filter({ hasText: "Auto-Colour" })
      .click();

    await page.waitForTimeout(AFTER_CLOSE_MS);

    await expect(page).toHaveURL("/expression");
    await expect(page.locator(".home__sheet")).toBeVisible();
    await expect(
      page.locator(".home__sheet details").filter({ hasText: "Auto-Colour" }),
    ).toHaveAttribute("open");
  });
});
