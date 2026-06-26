import { expect, test } from "@playwright/test";

function collectConsoleErrors(page: import("@playwright/test").Page) {
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(err.message));
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  return errors;
}

function isBenignConsoleError(message: string): boolean {
  return (
    message.includes("favicon") ||
    message.includes("404") ||
    message.includes("Hydration failed") ||
    message.includes("hydration-mismatch")
  );
}

function isFatalRuntimeError(message: string): boolean {
  if (isBenignConsoleError(message)) return false;
  return (
    message.includes("TypeError") ||
    message.includes("ReferenceError") ||
    message.includes("fills")
  );
}

test.describe("rashOS scroll journey", () => {
  test("e2e mode shows hero and project sections", async ({ page }) => {
    const errors = collectConsoleErrors(page);
    await page.goto("/?e2e=1");

    await expect(page.getByRole("heading", { name: /apps and ai tools designer/i })).toBeVisible({
      timeout: 15_000,
    });

    await expect(page.getByText("originally a product manager")).toBeVisible();

    const sections = page.locator(".project-section");
    await expect(sections).toHaveCount(7);

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(page.getByText("connect")).toBeVisible();

    expect(errors.filter(isFatalRuntimeError)).toEqual([]);
  });

  test("scroll journey has no runtime errors through all sections", async ({ page }) => {
    const errors = collectConsoleErrors(page);
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/?e2e=1");
    await page.waitForSelector(".hero__title", { timeout: 15_000 });

    const steps = 16;
    for (let i = 0; i <= steps; i++) {
      await page.evaluate(
        ({ step, total }) => {
          const max = document.documentElement.scrollHeight - window.innerHeight;
          window.scrollTo(0, (max * step) / total);
        },
        { step: i, total: steps },
      );
      await page.waitForTimeout(150);
    }

    await expect(page.locator('[data-section="expression"] .scene-expression__svg')).toHaveCount(1, {
      timeout: 10_000,
    });

    expect(errors.filter(isFatalRuntimeError)).toEqual([]);
  });

  test("expression scene renders character SVG paths", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/?e2e=1");
    await page.waitForSelector(".hero__title", { timeout: 15_000 });

    const expression = page.locator('[data-section="expression"]');
    await expression.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);

    const svg = expression.locator(".scene-expression__svg");
    await expect(svg).toHaveCount(1);

    const lines = svg.locator("line");
    expect(await lines.count()).toBeGreaterThan(4);
  });
});
