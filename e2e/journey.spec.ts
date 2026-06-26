import { expect, test } from "@playwright/test";

test.describe("rashOS scroll journey", () => {
  test("e2e mode shows hero and project sections", async ({ page }) => {
    await page.goto("/?e2e=1");

    await expect(page.getByRole("heading", { name: /apps and ai tools designer/i })).toBeVisible({
      timeout: 15_000,
    });

    await expect(page.getByText("originally a product manager")).toBeVisible();

    const sections = page.locator(".project-section");
    await expect(sections).toHaveCount(7);

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(page.getByText("connect")).toBeVisible();
  });
});
