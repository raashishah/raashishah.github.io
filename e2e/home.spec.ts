import { test, expect } from "@playwright/test";

test("homepage shows intro and project list", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Raashi Shah" })).toBeVisible();
  await expect(page.getByText("School Admissions Assessment Agent")).toBeVisible();
  await expect(page.getByRole("link", { name: "Email" })).toBeVisible();
});
