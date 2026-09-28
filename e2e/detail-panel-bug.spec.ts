import { expect, test } from "@playwright/test";
import { getDetailHref } from "../lib/detail-routes";
import { siteConfig } from "../lib/metadata";
import {
  ACCORDION_CLOSE_MS,
  PANEL_CLOSE_MS,
  SHEET_CLOSE_MS,
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

    await expect(page).toHaveURL(getDetailHref("expression"));
    await expect(page.locator(".home__detail")).toBeVisible();

    await page
      .locator("summary.home__details-summary")
      .filter({ hasText: "Animation" })
      .click();

    await page.waitForTimeout(AFTER_CLOSE_MS);

    await expect(page).toHaveURL(getDetailHref("expression"));
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

    await expect(page).toHaveURL(getDetailHref("expression"));
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

    await expect(page).toHaveURL(getDetailHref("expression"));
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

    await expect(page).toHaveURL(getDetailHref("expression"));
    await expect(page.locator(".home__detail")).toBeVisible();
    await expect(page.getByText("Entreprise-grade")).toBeVisible();
    await expect(page.locator(".home__intro .home__line--tagline")).toHaveText(
      siteConfig.introTagline,
    );
  });
});

test.describe("expression sheet scroll", () => {
  test("closing the sheet on a phone keeps the page where it was", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page
      .locator("summary.home__details-summary")
      .filter({ hasText: "Animation" })
      .click();

    const detailLink = page.getByRole("link", {
      name: "Colouring for hand-drawn animation",
    });
    await detailLink.evaluate((element) => {
      element.scrollIntoView({ block: "center" });
    });
    const before = await page.evaluate(() => {
      (window as Window & { __pageMarker?: number }).__pageMarker = 1;
      return window.scrollY;
    });
    expect(before).toBeGreaterThan(0);

    await detailLink.evaluate((element) => {
      (element as HTMLElement).click();
    });
    await expect(page.locator(".home__sheet")).toBeVisible();

    await page.getByRole("button", { name: "Close", exact: true }).click();
    await expect(page).toHaveURL("/", {
      timeout: SHEET_CLOSE_MS + TRANSITION_FALLBACK_BUFFER_MS + 1000,
    });
    await expect(page.locator(".home__sheet")).toHaveCount(0);

    const after = await page.evaluate(() => ({
      y: window.scrollY,
      marker: (window as Window & { __pageMarker?: number }).__pageMarker ?? 0,
    }));
    expect(after.marker).toBe(1);
    expect(Math.abs(after.y - before)).toBeLessThanOrEqual(2);
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
    await expect(page).toHaveURL(getDetailHref("expression"));
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

    await expect(page).toHaveURL(getDetailHref("expression"));
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

    await expect(page).toHaveURL(getDetailHref("expression"));
    await expect(page.locator(".home__sheet")).toBeVisible();
    await expect(
      page.locator(".home__sheet details").filter({ hasText: "Auto-Colour" }),
    ).toHaveAttribute("open");
  });
});
