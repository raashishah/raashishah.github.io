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

test("mobile inline links keep the arrow on the last word line", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page
    .locator("summary.home__details-summary")
    .filter({ hasText: "Professional Tool for Animators" })
    .click();

  const arrowSharesLastWordLine = await page.evaluate(() => {
    const end = document.querySelector(
      ".home__details[open] .home__inline-link-end",
    );
    const icon = end?.querySelector(".home__inline-link-icon");
    if (!end || !icon) {
      return false;
    }

    return (
      Math.abs(icon.getBoundingClientRect().top - end.getBoundingClientRect().top) <
      3
    );
  });

  expect(arrowSharesLastWordLine).toBe(true);
});

test("mobile tagline does not orphan AI from agents", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const lines = await page.evaluate(() => {
    const el = document.querySelector(".home__line--tagline");
    if (!el) {
      return [];
    }

    const rendered: string[] = [];
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    let node: Node | null = walker.nextNode();

    while (node) {
      const text = node.textContent ?? "";
      const range = document.createRange();
      let lineTop: number | null = null;
      let lineStart = 0;

      for (let index = 0; index <= text.length; index += 1) {
        if (index < text.length) {
          range.setStart(node, index);
          range.setEnd(node, index + 1);
        }

        const top = index < text.length ? range.getBoundingClientRect().top : null;
        if (lineTop !== null && top !== null && Math.abs(top - lineTop) > 2) {
          rendered.push(text.slice(lineStart, index).trimEnd());
          lineStart = index;
        }

        if (top !== null) {
          lineTop = top;
        }
      }

      if (lineStart < text.length) {
        rendered.push(text.slice(lineStart).trim());
      }

      node = walker.nextNode();
    }

    return rendered.filter(Boolean);
  });

  expect(lines.some((line) => line.endsWith(" AI"))).toBe(false);
  expect(lines.some((line) => line.startsWith("agents"))).toBe(false);
});
