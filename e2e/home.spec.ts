import { test, expect } from "@playwright/test";
import { siteConfig } from "../lib/metadata";

test("homepage shows intro and project list", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Raashi Shah" })).toBeVisible();
  await expect(page.locator(".home__intro .home__line--role")).toHaveText(siteConfig.introRole);
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
    .filter({ hasText: "Professional Tool for Animators" })
    .click();
  await expect(
    page.getByRole("link", { name: "Auto-colouring for hand drawn animation" }),
  ).toBeVisible();
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

test("opening a second dropdown closes the first", async ({ page }) => {
  await page.goto("/");
  const enterpriseDetails = page
    .locator("details")
    .filter({ hasText: "Entreprise-grade Agents" });
  const onDeviceDetails = page.locator("details").filter({ hasText: "OnDevice" });

  await enterpriseDetails.locator("summary").click();
  await expect(enterpriseDetails).toHaveAttribute("open", "");

  await onDeviceDetails.locator("summary").click();
  await expect(enterpriseDetails).not.toHaveAttribute("open");
  await expect(onDeviceDetails).toHaveAttribute("open", "");
});

test("skip link targets main content", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skipLink = page.getByRole("link", { name: "Skip to content" });
  await expect(skipLink).toBeFocused();
  await skipLink.click();
  await expect(page.locator("#main-content")).toBeVisible();
});

test("mobile inline links keep the arrow on the last line", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page
    .locator("summary.home__details-summary")
    .filter({ hasText: "Professional Tool for Animators" })
    .click();

  const arrowOnLastLine = await page.evaluate(() => {
    const link = document.querySelector(".home__details[open] .home__inline-link");
    const icon = link?.querySelector(".home__inline-link-icon");
    if (!link || !icon) {
      return false;
    }

    const range = document.createRange();
    range.selectNodeContents(link);
    const lineTops = Array.from(range.getClientRects()).map((rect) => rect.top);
    const lastLineTop = Math.max(...lineTops);

    return Math.abs(icon.getBoundingClientRect().top - lastLineTop) < 4;
  });

  expect(arrowOnLastLine).toBe(true);
});

test("mobile pullquotes do not keep left indent", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page
    .locator("summary.home__details-summary")
    .filter({ hasText: "Professional Tool for Animators" })
    .click();

  const pullquoteStyles = await page.evaluate(() => {
    const pullquote = document.querySelector(".home__project-body-pullquote");
    if (!pullquote) {
      return null;
    }

    const styles = getComputedStyle(pullquote);
    return {
      paddingInlineStart: styles.paddingInlineStart,
      borderInlineStartWidth: styles.borderInlineStartWidth,
    };
  });

  expect(pullquoteStyles).toEqual({
    paddingInlineStart: "0px",
    borderInlineStartWidth: "0px",
  });
});

test("mobile tagline fills the line before wrapping", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const firstLine = await page.evaluate(() => {
    const el = document.querySelector(".home__line--tagline");
    if (!el) {
      return "";
    }

    const range = document.createRange();
    const text = el.textContent ?? "";
    let lineTop: number | null = null;
    let firstLineEnd = text.length;

    for (let index = 0; index < text.length; index += 1) {
      range.setStart(el.firstChild ?? el, index);
      range.setEnd(el.firstChild ?? el, index + 1);
      const top = range.getBoundingClientRect().top;

      if (lineTop !== null && Math.abs(top - lineTop) > 2) {
        firstLineEnd = index;
        break;
      }

      lineTop = top;
    }

    return text.slice(0, firstLineEnd).trim();
  });

  expect(firstLine).toContain("apps");
  expect(firstLine.endsWith("developing")).toBe(false);
});
