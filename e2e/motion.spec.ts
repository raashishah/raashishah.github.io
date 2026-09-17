import { expect, test } from "@playwright/test";

const detailRoutes = [
  {
    label: "Animation",
    summary: "Animation",
    linkName: "Colouring for hand-drawn animation",
    path: "/?detail=expression",
  },
] as const;

for (const width of [375, 768, 1280]) {
  test(`accordion responds and reverses continuously at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const rows = page.locator(".home__work details");
    const first = rows.nth(0);
    await first.locator("summary").click();
    await page.waitForTimeout(400);
    await rows.nth(1).locator("summary").evaluate((el: HTMLElement) => el.click());
    await expect(rows.nth(1)).toHaveAttribute("open");
    await expect(first).toHaveClass(/closing/);
    await page.waitForTimeout(400);
    await expect(first).not.toHaveAttribute("open");
    await rows.nth(1).locator("summary").evaluate((el: HTMLElement) => el.click());
    await page.waitForTimeout(70);
    await rows.nth(1).locator("summary").evaluate((el: HTMLElement) => el.click());
    await page.waitForTimeout(400);
    await expect(rows.nth(1)).toHaveAttribute("open");
    await expect(rows.nth(1)).not.toHaveClass(/closing|opening/);
  });
}

for (const route of detailRoutes) {
  for (const width of [768, 1280]) {
    test(`${route.label} split expands smoothly and keeps portrait visible at ${width}px`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/");
      await page.locator("summary").filter({ hasText: route.summary }).click();
      await page.waitForTimeout(400);
      const workX = await page.locator(".home__work").evaluate(el => el.getBoundingClientRect().x);
      await page.getByRole("link", { name: route.linkName }).click();
      await expect(page).toHaveURL(route.path);
      await expect(page.locator(".home__detail-shell")).toBeVisible();
      const openingHeights = await page.locator(".home__detail-shell").evaluate(async el => {
        const heights: number[] = [];
        const start = performance.now();
        while (performance.now() - start < 400) {
          heights.push(el.getBoundingClientRect().height);
          await new Promise(requestAnimationFrame);
        }
        return heights;
      });
      expect(new Set(openingHeights.map(height => Math.round(height))).size).toBeGreaterThan(3);
      await expect(page.locator(".home__detail")).toHaveCSS("overflow-y", "auto");
      await page
        .locator("summary")
        .filter({ hasText: "Entreprise-grade" })
        .evaluate((el: HTMLElement) => el.click());
      const samples = await page.evaluate(async () => {
        const values: { height: number; opacity: string; x: number }[] = [];
        const start = performance.now();
        while (performance.now() - start < 420) {
          values.push({
            height: document.querySelector(".home__detail-shell")?.getBoundingClientRect().height ?? 0,
            opacity: getComputedStyle(document.querySelector(".home__portrait-wrap")!).opacity,
            x: document.querySelector(".home__work")!.getBoundingClientRect().x,
          });
          await new Promise(requestAnimationFrame);
        }
        return values;
      });
      expect(samples.every(sample => sample.opacity === "1" && Math.abs(sample.x - workX) < 1)).toBe(true);
      expect(samples.some(sample => sample.height > 0 && sample.height < samples[0].height)).toBe(true);
      await expect(page).toHaveURL("/");
    });
  }
}

for (const route of detailRoutes) {
  test(`${route.label} sheet follows dragging and settles without resizing`, async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 844 });
    await page.goto("/");
    await page.locator("summary").filter({ hasText: route.summary }).click();
    await page.getByRole("link", { name: route.linkName }).click();
    await expect(page).toHaveURL(route.path);
    const sheet = page.locator(".home__sheet");
    await expect(sheet).toBeVisible();
    await page.waitForTimeout(400);
    const initial = (await sheet.boundingBox())!;
    const handle = (await page.locator(".home__sheet-handle").boundingBox())!;
    await page.mouse.move(handle.x + handle.width / 2, handle.y + handle.height / 2);
    await page.mouse.down();
    await page.mouse.move(handle.x + handle.width / 2, handle.y + handle.height / 2 + 50, { steps: 5 });
    expect((await sheet.boundingBox())!.y - initial.y).toBeCloseTo(50, 0);
    await page.mouse.up();
    await page.waitForTimeout(400);
    expect((await sheet.boundingBox())!.height).toBeCloseTo(initial.height, 0);
    expect((await sheet.boundingBox())!.y).toBeCloseTo(initial.y, 0);
    await page.getByRole("button", { name: "Close", exact: true }).click();
    await expect(page).toHaveURL("/");
  });
}
