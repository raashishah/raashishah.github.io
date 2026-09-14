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
      .filter({ hasText: "Pro Animation Tool" })
      .click();
    await page
      .getByRole("link", { name: "Colouring for hand-drawn animation" })
      .click();

    await expect(page).toHaveURL("/expression");
    await expect(page.locator(".home__detail")).toBeVisible();

    await page
      .locator("summary.home__details-summary")
      .filter({ hasText: "Pro Animation Tool" })
      .click();

    await page.waitForTimeout(AFTER_CLOSE_MS);

    await expect(page).toHaveURL("/expression");
    await expect(page.locator(".home__detail")).toBeVisible();
    await expect(
      page.locator("details").filter({ hasText: "Pro Animation Tool" }),
    ).not.toHaveAttribute("open");
  });

  test("collapsing same accordion keeps ondevice detail open on desktop", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    await page
      .locator("summary.home__details-summary")
      .filter({ hasText: "On-device AI Agent" })
      .click();
    await page.getByRole("link", { name: "Health App" }).click();

    await expect(page).toHaveURL("/ondevice");
    await expect(page.locator(".home__detail")).toBeVisible();

    await page
      .locator("summary.home__details-summary")
      .filter({ hasText: "On-device AI Agent" })
      .click();

    await page.waitForTimeout(AFTER_CLOSE_MS);

    await expect(page).toHaveURL("/ondevice");
    await expect(page.locator(".home__detail")).toBeVisible();
  });

  test("soft navigation keeps homepage mounted on desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    await page
      .locator("summary.home__details-summary")
      .filter({ hasText: "Pro Animation Tool" })
      .click();
    await page
      .getByRole("link", { name: "Colouring for hand-drawn animation" })
      .click();

    await expect(page).toHaveURL("/expression");
    await expect(page.locator("[data-homepage]")).toHaveCount(1);
    await expect(page.getByText("Enterprise-Grade Agents")).toBeVisible();
    await expect(page.locator(".home__detail")).toBeVisible();
  });

  test("soft navigation keeps homepage mounted on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page
      .locator("summary.home__details-summary")
      .filter({ hasText: "On-device AI Agent" })
      .click();
    await page.getByRole("link", { name: "Health App" }).click();

    await expect(page).toHaveURL("/ondevice");
    await expect(page.locator("[data-homepage]")).toHaveCount(1);
    await expect(page.locator(".home__sheet")).toBeVisible();
    await expect(page.getByText("Enterprise-Grade Agents")).toBeVisible();
  });

  test("detail link keeps homepage list visible on desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    await page
      .locator("summary.home__details-summary")
      .filter({ hasText: "Pro Animation Tool" })
      .click();
    await page
      .getByRole("link", { name: "Colouring for hand-drawn animation" })
      .click();

    await expect(page).toHaveURL("/expression");
    await expect(page.locator(".home__detail")).toBeVisible();
    await expect(page.getByText("Enterprise-Grade Agents")).toBeVisible();
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
      .filter({ hasText: "Pro Animation Tool" })
      .click();
    await page
      .getByRole("link", { name: "Colouring for hand-drawn animation" })
      .click();
    await expect(page).toHaveURL("/expression");
  }

  async function openOnDeviceDetail(page: import("@playwright/test").Page) {
    await page.goto("/");
    await page
      .locator("summary.home__details-summary")
      .filter({ hasText: "On-device AI Agent" })
      .click();
    await page.getByRole("link", { name: "Health App" }).click();
    await expect(page).toHaveURL("/ondevice");
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

  test("clicking Privacy inside ondevice detail keeps panel open on desktop", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 768, height: 800 });
    await openOnDeviceDetail(page);
    await expect(page.locator(".home__detail")).toBeVisible();

    await page
      .locator(".home__detail-content summary.home__details-summary")
      .filter({ hasText: "Privacy" })
      .click();

    await page.waitForTimeout(AFTER_CLOSE_MS);

    await expect(page).toHaveURL("/ondevice");
    await expect(page.locator(".home__detail")).toBeVisible();
    await expect(
      page.locator(".home__detail-content details").filter({ hasText: "Privacy" }),
    ).toHaveAttribute("open");
  });

  test("clicking On-Device Inference inside ondevice detail keeps sheet open on mobile", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 844 });
    await openOnDeviceDetail(page);
    await expect(page.locator(".home__sheet")).toBeVisible();

    await page
      .locator(".home__sheet summary.home__details-summary")
      .filter({ hasText: "On-Device Inference" })
      .click();

    await page.waitForTimeout(AFTER_CLOSE_MS);

    await expect(page).toHaveURL("/ondevice");
    await expect(page.locator(".home__sheet")).toBeVisible();
    await expect(
      page.locator(".home__sheet details").filter({ hasText: "On-Device Inference" }),
    ).toHaveAttribute("open");
  });
});
