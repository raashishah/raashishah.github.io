import { test, expect } from "@playwright/test";
import { siteConfig } from "../lib/metadata";
import {
  MOBILE_WIDTHS,
  assertFooterMetaWithinHomePadding,
  assertHeaderContactDoesNotOrphanOr,
  assertInlineLinkArrowOnLastLine,
  assertNoHorizontalScroll,
  getBodyCopyColor,
  getFirstLineText,
  getSemanticColor,
} from "./helpers/mobile-layout";

test("homepage shows intro and project list", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: siteConfig.name })).toBeVisible();
  await expect(page.locator(".home__intro .home__line--role")).toHaveText(siteConfig.introRole);
  await expect(page.locator(".home__line--tagline")).toHaveText(
    siteConfig.introTagline,
  );
  await expect(page.getByText("Enterprise-Grade Agents")).toBeVisible();
  await expect(page.getByRole("link", { name: "email me" })).toBeVisible();
});

test("project details expand with body copy", async ({ page }) => {
  await page.goto("/");
  await page
    .locator("summary.home__details-summary")
    .filter({ hasText: "Professional Tool for Animators" })
    .click();
  await expect(
    page.getByRole("link", { name: "Colouring for hand drawn animation" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Colouring for hand drawn animation" }),
  ).toHaveAttribute("href", "/expression");
  await expect(
    page
      .getByRole("link", { name: "Colouring for hand drawn animation" })
      .locator(".home__inline-link-icon"),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Colouring for hand drawn animation" }),
  ).not.toHaveAttribute("target", "_blank");
  await expect(
    page.getByText("This problem remains unsolved worldwide"),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "View Professional Tool for Animators" }),
  ).toHaveCount(0);
});

test("linked projects show inline body link when expanded", async ({ page }) => {
  await page.goto("/");
  await page
    .locator("summary.home__details-summary")
    .filter({ hasText: "Enterprise-Grade Agents" })
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
    page.getByRole("link", { name: /View Enterprise-Grade Agents/ }),
  ).toHaveCount(0);
});

test("opening a second dropdown closes the first", async ({ page }) => {
  await page.goto("/");
  const enterpriseDetails = page
    .locator("details")
    .filter({ hasText: "Enterprise-Grade Agents" });
  const onDeviceDetails = page.locator("details").filter({ hasText: "On-device AI" });

  await enterpriseDetails.locator("summary").click();
  await expect(enterpriseDetails).toHaveAttribute("open", "");

  await onDeviceDetails.locator("summary").click();
  await expect(enterpriseDetails).not.toHaveAttribute("open");
  await expect(onDeviceDetails).toHaveAttribute("open", "");
});

test("expanded body copy uses the secondary ink color", async ({ page }) => {
  await page.goto("/");
  await page
    .locator("summary.home__details-summary")
    .filter({ hasText: "Professional Tool for Animators" })
    .click();

  const expected = await getSemanticColor(page, "--ink-secondary");
  await expect(await getBodyCopyColor(page)).toBe(expected);
});

test.describe("mobile layout", () => {
  for (const width of MOBILE_WIDTHS) {
    test(`no horizontal scroll at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 844 });
      await page.goto("/");
      await assertNoHorizontalScroll(page);
    });

    test(`tagline fills the line before wrapping at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 844 });
      await page.goto("/");

      const firstLine = await getFirstLineText(page, ".home__line--tagline");
      expect(firstLine).toContain("apps");
      expect(firstLine.endsWith("developing")).toBe(false);
    });

    test(`inline link arrow stays on the last line at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 844 });
      await page.goto("/");
      await page
        .locator("summary.home__details-summary")
        .filter({ hasText: "Professional Tool for Animators" })
        .click();

      await assertInlineLinkArrowOnLastLine(
        page,
        ".home__details[open] .home__inline-link",
      );
    });

    test(`pullquotes keep left border at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 844 });
      await page.goto("/");
      await page
        .locator("summary.home__details-summary")
        .filter({ hasText: "Professional Tool for Animators" })
        .click();

      const pullquoteStyles = await page.evaluate(() => {
        const pullquote = document.querySelector(
          ".home__details[open] .home__project-body-pullquote",
        );
        if (!pullquote) {
          return null;
        }

        const styles = getComputedStyle(pullquote);
        return {
          paddingInlineStart: styles.paddingInlineStart,
          borderInlineStartWidth: styles.borderInlineStartWidth,
        };
      });

      expect(pullquoteStyles?.borderInlineStartWidth).toBe("2px");
      expect(parseFloat(pullquoteStyles?.paddingInlineStart ?? "0")).toBeGreaterThan(0);
    });

    test(`header contact does not orphan or at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 844 });
      await page.goto("/");
      await assertHeaderContactDoesNotOrphanOr(page);
    });

    test(`footer meta stays inside home padding at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 844 });
      await page.goto("/");
      await assertFooterMetaWithinHomePadding(page);
    });
  }
});

test.describe("footer layout", () => {
  test("footer meta aligns to the content edge on desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    await assertFooterMetaWithinHomePadding(page);
  });

  test("footer meta aligns to the content edge at the tablet breakpoint", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 640, height: 800 });
    await page.goto("/");
    await assertFooterMetaWithinHomePadding(page);
  });
});
