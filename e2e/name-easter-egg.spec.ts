import { test, expect } from "@playwright/test";
import { siteConfig } from "../lib/metadata";
import { nameEasterEgg } from "../content/site";

test.describe("name easter egg", () => {
  test("name link keeps Spotify as the no-JS href", async ({ page }) => {
    await page.goto("/");

    const nameLink = page.getByRole("link", {
      name: `${siteConfig.name} (opens in music app)`,
    });

    await expect(nameLink).toHaveAttribute("href", nameEasterEgg.spotifyUrl);
    await expect(nameLink).not.toHaveAttribute("target", "_blank");
  });

  test("clicking the name tries Spotify then falls back to Apple Music", async ({
    page,
  }) => {
    await page.goto("/");

    const nameLink = page.getByRole("link", {
      name: `${siteConfig.name} (opens in music app)`,
    });

    const appleNavigation = page.waitForURL(
      (url) => url.href.startsWith(nameEasterEgg.appleMusicUrl),
      { timeout: 3_000 },
    );

    await nameLink.click();

    await expect
      .poll(async () =>
        page.evaluate(() => {
          const iframe = document.querySelector('iframe[src^="spotify:track:"]');
          return iframe?.getAttribute("src") ?? null;
        }),
      )
      .toBe(`spotify:track:${nameEasterEgg.spotifyTrackId}`);

    await appleNavigation;
  });

  test("mobile click uses the same Spotify then Apple Music flow", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    const nameLink = page.getByRole("link", {
      name: `${siteConfig.name} (opens in music app)`,
    });

    const appleNavigation = page.waitForURL(
      (url) => url.href.startsWith(nameEasterEgg.appleMusicUrl),
      { timeout: 3_000 },
    );

    await nameLink.click();

    await expect
      .poll(async () =>
        page.evaluate(() =>
          document.querySelector('iframe[src^="spotify:track:"]') ? true : false,
        ),
      )
      .toBe(true);

    await appleNavigation;
  });
});
