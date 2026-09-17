import { test, expect } from "@playwright/test";
import { homePortrait } from "../content/site";
import { getDetailHref } from "../lib/detail-routes";
import { siteConfig } from "../lib/metadata";
import {
  MOBILE_WIDTHS,
  assertFooterMetaWithinHomePadding,
  assertHeaderContactDoesNotOrphanOr,
  assertInlineLinkArrowOnLastLine,
  assertNoHorizontalScroll,
  assertTypographyHierarchy,
  assertListSectionHeadingHierarchy,
  assertDictionaryTypeMix,
  getBodyCopyColor,
  getFirstLineText,
  getSemanticColor,
} from "./helpers/mobile-layout";

test("homepage shows intro and project list", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: siteConfig.name })).toBeVisible();
  await expect(
    page.getByRole("article", { name: "Dictionary entry for decavalent" }),
  ).toBeVisible();
  await expect(page.locator(".dictionary-entry__lemma")).toHaveText("decavalent");
  await expect(page.locator(".home__intro .home__line--name")).toHaveText(
    siteConfig.introIdentity,
  );
  await expect(page.locator(".home__intro .home__line--role")).toHaveCount(0);
  await expect(page.locator(".home__intro .home__line--subline")).toHaveText(
    siteConfig.introSubline,
  );
  await expect(page.locator(".home__line--tagline")).toHaveText(
    siteConfig.introTagline,
  );
  await expect(page.getByText("Entreprise-grade")).toBeVisible();
  await expect(page.getByRole("link", { name: "email me" })).toBeVisible();
  await expect(page.getByRole("img", { name: homePortrait.alt })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Agents", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Machine Learning" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Web apps" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Product Management" })).toBeVisible();
  await expect(page.locator(".home__work .home__line--role")).toHaveText(
    "BSc in Product, from Aston, UK",
  );
  await expect(page.getByRole("heading", { name: "Projects" })).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "Experience" })).toHaveCount(0);
});

test("clicking outside a project accordion runs the close animation", async ({
  page,
}) => {
  await page.goto("/");
  const details = page
    .locator(".home__work details")
    .filter({ hasText: "Animation" })
    .first();
  await details.locator("summary").click();
  await expect(details).toHaveAttribute("open");
  const closing = expect(details).toHaveClass(/home__details--closing/);
  await page.locator(".home__intro").click({ position: { x: 8, y: 8 } });
  await closing;
  await expect(details).not.toHaveAttribute("open");
});

test("project details expand with body copy", async ({ page }) => {
  await page.goto("/");
  await page
    .locator("summary.home__details-summary")
    .filter({ hasText: "Animation" })
    .click();
  await expect(
    page.getByRole("link", { name: "Colouring for hand-drawn animation" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Colouring for hand-drawn animation" }),
  ).toHaveAttribute("href", getDetailHref("expression"));
  await expect(
    page
      .getByRole("link", { name: "Colouring for hand-drawn animation" })
      .locator(".home__inline-link-icon"),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Colouring for hand-drawn animation" }),
  ).not.toHaveAttribute("target", "_blank");
  await expect(
    page.getByText("Unsolved problem worldwide"),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "View Animation" }),
  ).toHaveCount(0);
});

test("linked projects show inline body link when expanded", async ({ page }) => {
  await page.goto("/");
  await page
    .locator("summary.home__details-summary")
    .filter({ hasText: "Entreprise-grade" })
    .click();

  const projectLink = page.getByRole("link", {
    name: "Academic admissions cycle",
  });
  await expect(projectLink).toBeVisible();
  await expect(projectLink).toHaveAttribute(
    "href",
    "https://admissions.raashishah.com",
  );
  await expect(
    page.getByRole("link", { name: /View Entreprise-grade/ }),
  ).toHaveCount(0);
});

test("Astrothunder shows chart engine link when expanded", async ({ page }) => {
  await page.goto("/");
  await page
    .locator("summary.home__details-summary")
    .filter({ hasText: "Vedic Astrologer" })
    .click();

  const projectLink = page.getByRole("link", {
    name: "Astrothunder",
  });
  await expect(projectLink).toBeVisible();
  await expect(projectLink).toHaveAttribute(
    "href",
    "https://astrothunder.life",
  );
  await expect(projectLink.locator(".home__inline-link-icon")).toBeVisible();
  await expect(projectLink).toHaveAttribute("target", "_blank");
  await expect(
    page.getByText("Starts from the chart, then shows the working"),
  ).toHaveCount(0);
});

test("Pink Depot shows body link when expanded", async ({ page }) => {
  await page.goto("/");
  await page
    .locator("summary.home__details-summary")
    .filter({ hasText: "Inventory mgmt" })
    .click();

  const projectLink = page.getByRole("link", {
    name: "Pink Depot",
  });
  await expect(projectLink).toBeVisible();
  await expect(projectLink).toHaveAttribute(
    "href",
    "https://pinkdepot.raashishah.com",
  );
  await expect(projectLink.locator(".home__inline-link-icon")).toBeVisible();
  await expect(projectLink).toHaveAttribute("target", "_blank");
  await expect(page.getByText("Materials products and profit")).toHaveCount(0);
});

test("Skills shows skill links when expanded", async ({ page }) => {
  await page.goto("/");
  await page
    .locator("summary.home__details-summary")
    .filter({ has: page.locator(".home__project-title", { hasText: /^Skills$/ }) })
    .click();

  const appleHigLink = page.getByRole("link", {
    name: "Apple HIG",
  });
  await expect(appleHigLink).toBeVisible();
  await expect(appleHigLink).toHaveAttribute(
    "href",
    "https://github.com/raashishah/apple-hig",
  );
  await expect(appleHigLink.locator(".home__inline-link-icon")).toBeVisible();
  await expect(appleHigLink).toHaveAttribute("target", "_blank");

  const userCallLink = page.getByRole("link", {
    name: "User Call",
  });
  await expect(userCallLink).toBeVisible();
  await expect(userCallLink).toHaveAttribute(
    "href",
    "https://github.com/raashishah/user-call",
  );
  await expect(userCallLink.locator(".home__inline-link-icon")).toBeVisible();
  await expect(userCallLink).toHaveAttribute("target", "_blank");
  await expect(page.getByText("Skills for cursor codex cc")).toHaveCount(0);
});

test("Pocket Analyst heading is not duplicated in the body", async ({ page }) => {
  await page.goto("/");
  await page
    .locator("summary.home__details-summary")
    .filter({ hasText: "Pocket Analyst" })
    .click();

  await expect(
    page.getByText("Analytics for traditional business owners, inside GPT"),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Pocket Analytics" })).toHaveCount(0);
});

test("On-device links to Twitter with a Research pullquote", async ({ page }) => {
  await page.goto("/");
  await page
    .locator("summary.home__details-summary")
    .filter({ hasText: "On-device" })
    .click();

  const twitterLink = page
    .locator(".home__details[open] .home__project-body")
    .getByRole("link", { name: "Twitter" });
  await expect(twitterLink).toBeVisible();
  await expect(twitterLink).toHaveAttribute("href", "https://x.com/useOnDevice");
  await expect(
    page.locator(".home__details[open] .home__project-body-pullquote"),
  ).toHaveText("Research");
  await expect(page.getByRole("link", { name: "Health App" })).toHaveCount(0);
});

test("Expo map pullquote links to the exhibition webapp", async ({ page }) => {
  await page.goto("/");
  await page
    .locator("summary.home__details-summary")
    .filter({ hasText: "Expo map" })
    .click();

  const webappLink = page
    .locator(".home__details[open] .home__project-body-pullquote")
    .getByRole("link", { name: "After loading, stays available offline" });
  await expect(webappLink).toBeVisible();
  await expect(webappLink).toHaveAttribute(
    "href",
    "https://povindex.designpovindia.com/home",
  );
  await expect(page.getByRole("link", { name: "Exhibition site" })).toHaveCount(0);
});

test("Entreprise-grade shows ADK pullquote when expanded", async ({ page }) => {
  await page.goto("/");
  await page
    .locator("summary.home__details-summary")
    .filter({ hasText: "Entreprise-grade" })
    .click();

  await expect(page.getByText("Made with Google ADK")).toBeVisible();
  await expect(page.getByText("Processes school and uni applications")).toHaveCount(0);
});

test("work groups mix projects and jobs without Projects or Experience headings", async ({
  page,
}) => {
  await page.goto("/");

  const titles = await page.locator(".home__project-title").allTextContents();
  expect(titles).toEqual([
    "Pocket Analyst",
    "Vedic Astrologer",
    "Entreprise-grade",
    "On-device",
    "Skills",
    "Animation",
    "Geospatial",
    "Expo map",
    "Inventory mgmt",
    "Working with Artists",
    "Doubled engineering speed",
  ]);
});

test("opening a second dropdown closes the first", async ({ page }) => {
  await page.goto("/");
  const enterpriseDetails = page
    .locator("details")
    .filter({ hasText: "Entreprise-grade" });
  const onDeviceDetails = page.locator("details").filter({ hasText: "On-device" });

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
    .filter({ hasText: "Animation" })
    .click();

  const expected = await getSemanticColor(page, "--ink-secondary");
  await expect(await getBodyCopyColor(page)).toBe(expected);
});

test.describe("typography hierarchy", () => {
  for (const width of [390, 1280] as const) {
    test(`name and tagline share body type at ${width}px`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 800 });
      await page.goto("/");
      await assertTypographyHierarchy(page);
    });
  }

  test("dictionary mixes Newsreader lexical type with Satoshi metadata", async ({
    page,
  }) => {
    await page.goto("/");
    await assertDictionaryTypeMix(page);
  });
});

test.describe("list section headings", () => {
  for (const width of [375, 768] as const) {
    test(`category headings sit above accordion titles at ${width}px`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 844 });
      await page.goto("/");
      await assertListSectionHeadingHierarchy(page);
    });
  }
});

test.describe("mobile layout", () => {
  for (const width of MOBILE_WIDTHS) {
    test(`no horizontal scroll at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 844 });
      await page.goto("/");
      await assertNoHorizontalScroll(page);
    });

    test(`tagline avoids a single-word tail at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 844 });
      await page.goto("/");

      const firstLine = await getFirstLineText(page, ".home__line--tagline");
      const remaining = siteConfig.introTagline.slice(firstLine.length).trim();
      expect(remaining === "" || remaining.split(/\s+/).length > 1).toBe(true);
    });

    test(`inline link arrow stays on the last line at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 844 });
      await page.goto("/");
      await page
        .locator("summary.home__details-summary")
        .filter({ hasText: "Animation" })
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
        .filter({ hasText: "Animation" })
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

test.describe("detail panel", () => {
  test("mobile opens expression in a bottom sheet without leaving homepage", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page
      .locator("summary.home__details-summary")
      .filter({ hasText: "Animation" })
      .click();
    await page.getByRole("link", { name: "Colouring for hand-drawn animation" }).click();

    await expect(page).toHaveURL(getDetailHref("expression"));
    await expect(page.locator(".home__sheet")).toBeVisible();
    await expect(page.locator(".home__scrim")).toBeVisible();
    await expect(page.getByText("Entreprise-grade")).toBeVisible();
    await expect(page.getByText("Agentic Tools for Artists")).toBeVisible();
    await expect(page.locator(".home__intro .home__line--tagline")).toHaveText(
      siteConfig.introTagline,
    );
  });

  for (const width of [768, 1024]) {
    test(`work list starts beside the intro identity at ${width}px`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 800 });
      await page.goto("/");

      const dictionary = page.locator(".home__masthead");
      const intro = page.locator(".home__intro");
      const work = page.locator(".home__work");
      await expect(dictionary).toBeVisible();
      await expect(intro).toBeVisible();
      await expect(work).toBeVisible();

      const dictionaryBox = await dictionary.boundingBox();
      const introBox = await intro.boundingBox();
      const workBox = await work.boundingBox();
      expect(dictionaryBox).not.toBeNull();
      expect(introBox).not.toBeNull();
      expect(workBox).not.toBeNull();
      expect(workBox!.y).toBeGreaterThan(dictionaryBox!.y + dictionaryBox!.height - 1);
      expect(introBox!.y - (dictionaryBox!.y + dictionaryBox!.height)).toBeCloseTo(48, 0);
      expect(Math.abs(workBox!.y - introBox!.y)).toBeLessThan(2);
      const contentBox = await page.locator(".home__content").boundingBox();
      expect(contentBox).not.toBeNull();
      expect(dictionaryBox!.width).toBeGreaterThan(contentBox!.width * 0.4);
      expect(dictionaryBox!.width).toBeLessThan(contentBox!.width * 0.6);
    });
  }

  test("desktop portrait stays in the left column without shifting work", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1024, height: 800 });
    await page.goto("/");

    const portrait = page.locator(".home__portrait");
    const work = page.locator(".home__work");
    await expect(portrait).toBeVisible();

    const portraitBox = await portrait.boundingBox();
    const workBox = await work.boundingBox();
    expect(portraitBox).not.toBeNull();
    expect(workBox).not.toBeNull();
    expect(portraitBox!.x + portraitBox!.width).toBeLessThanOrEqual(workBox!.x + 1);
    expect(workBox!.x).toBeGreaterThan(portraitBox!.x);
    const introBox = await page.locator(".home__intro").boundingBox();
    const primaryGap = await page.locator(".home__primary").evaluate(
      (element) => parseFloat(getComputedStyle(element).gap),
    );
    expect(introBox).not.toBeNull();
    expect(portraitBox!.y - (introBox!.y + introBox!.height)).toBeCloseTo(primaryGap, 0);
  });

  test("mobile portrait sits below the work list", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    const portrait = page.locator(".home__portrait");
    const work = page.locator(".home__work");
    await expect(portrait).toBeVisible();

    const portraitBox = await portrait.boundingBox();
    const workBox = await work.boundingBox();
    expect(portraitBox).not.toBeNull();
    expect(workBox).not.toBeNull();
    expect(portraitBox!.y).toBeGreaterThan(workBox!.y + workBox!.height - 1);
  });

  test("desktop split view hides the portrait and aligns with the work list", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1024, height: 800 });
    await page.goto("/");
    await expect(page.locator(".home__portrait")).toBeVisible();

    await page
      .locator("summary.home__details-summary")
      .filter({ hasText: "Animation" })
      .click();
    await page.getByRole("link", { name: "Colouring for hand-drawn animation" }).click();

    await expect(page.locator(".home__detail")).toBeVisible();
    const portrait = page.locator(".home__portrait");
    await expect(portrait).toBeHidden();
    await expect(page.locator(".home__detail-shell--open")).toBeVisible();

    const detailBox = await page.locator(".home__detail").boundingBox();
    const workBox = await page.locator(".home__work").boundingBox();
    expect(detailBox).not.toBeNull();
    expect(workBox).not.toBeNull();
    expect(Math.abs(detailBox!.y - workBox!.y)).toBeLessThan(2);

    await page
      .locator("summary.home__details-summary")
      .filter({ hasText: "Entreprise-grade" })
      .click();

    await expect(page).toHaveURL("/");
    await expect(page.locator(".home__detail")).toHaveCount(0);
    await expect(portrait).toBeVisible();
  });

  test("legacy expression URL opens the homepage split, not a separate page", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1024, height: 800 });
    await page.goto("/expression");
    await expect(page).toHaveURL(getDetailHref("expression"));
    await expect(page.locator(".home__detail")).toBeVisible();
    await expect(page.locator(".home__work")).toBeVisible();
    await expect(page.locator(".home__portrait")).toBeHidden();
  });

  test("desktop opens expression in split view level with the work list", async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 800 });
    await page.goto("/");
    await page
      .locator("summary.home__details-summary")
      .filter({ hasText: "Animation" })
      .click();
    await page.getByRole("link", { name: "Colouring for hand-drawn animation" }).click();

    await expect(page).toHaveURL(getDetailHref("expression"));
    await expect(page.locator(".home__detail")).toBeVisible();
    await expect(page.locator(".home__sheet")).toHaveCount(0);
    await expect(page.locator(".home__intro")).toBeHidden();
    await expect(page.getByText("Agentic Tools for Artists")).toBeVisible();
    await expect(page.getByText("Entreprise-grade")).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Colouring for hand-drawn animation" }),
    ).toHaveAttribute("aria-current", "page");
    const detailBox = await page.locator(".home__detail").boundingBox();
    const workBox = await page.locator(".home__work").boundingBox();
    expect(detailBox).not.toBeNull();
    expect(workBox).not.toBeNull();
    expect(Math.abs(detailBox!.y - workBox!.y)).toBeLessThan(2);
  });

  test("mobile close button returns to homepage", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page
      .locator("summary.home__details-summary")
      .filter({ hasText: "Animation" })
      .click();
    await page.getByRole("link", { name: "Colouring for hand-drawn animation" }).click();
    await page.getByRole("button", { name: "Close", exact: true }).click();

    await expect(page).toHaveURL("/");
    await expect(page.locator(".home__sheet")).toHaveCount(0);
  });

  test("desktop opening another accordion dismisses split detail", async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 800 });
    await page.goto("/");
    await page
      .locator("summary.home__details-summary")
      .filter({ hasText: "Animation" })
      .click();
    await page.getByRole("link", { name: "Colouring for hand-drawn animation" }).click();

    await expect(page).toHaveURL(getDetailHref("expression"));
    await expect(page.locator(".home__detail")).toBeVisible();

    await page
      .locator("summary.home__details-summary")
      .filter({ hasText: "Entreprise-grade" })
      .click();

    await expect(page).toHaveURL("/");
    await expect(page.locator(".home__detail")).toHaveCount(0);
  });

  test("desktop browser back closes detail panel", async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 800 });
    await page.goto("/");
    await page
      .locator("summary.home__details-summary")
      .filter({ hasText: "Animation" })
      .click();
    await page.getByRole("link", { name: "Colouring for hand-drawn animation" }).click();

    await expect(page).toHaveURL(getDetailHref("expression"));
    await expect(page.locator(".home__detail")).toBeVisible();

    await page.goBack();
    await expect(page).toHaveURL("/");
    await expect(page.locator(".home__detail")).toHaveCount(0);
  });

  test("mobile sheet closed keeps footer meta within home padding", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page
      .locator("summary.home__details-summary")
      .filter({ hasText: "Animation" })
      .click();
    await page.getByRole("link", { name: "Colouring for hand-drawn animation" }).click();
    await page.getByRole("button", { name: "Close", exact: true }).click();
    await assertFooterMetaWithinHomePadding(page);
    await assertNoHorizontalScroll(page);
  });
});

test.describe("footer layout", () => {
  test("shows an old-rose Cursor heatmap that links to the public profile", async ({
    page,
  }) => {
    await page.goto("/");
    const heatmapLink = page.locator(".home__intro").getByRole("link", {
      name: "Cursor profile @rashdriving (opens in new tab)",
    });
    await expect(heatmapLink).toBeVisible();
    await expect(heatmapLink).toHaveAttribute("href", "https://cursor.com/@rashdriving");
    await expect(heatmapLink.locator(".home__cursor-heatmap")).toBeVisible();
    await expect(page.locator(".home__intro-profile-avatar")).toBeVisible();
    await expect(heatmapLink.locator(".home__intro-profile-avatar")).toHaveCount(0);
    await expect(heatmapLink.getByText(siteConfig.introSubline)).toHaveCount(0);
    await expect(page.locator(".home__footer .home__intro-profile")).toHaveCount(0);
    await expect(page.getByText("1.4B")).toHaveCount(0);
    await expect(page.getByText("546")).toHaveCount(0);
  });

  test("keeps the Cursor heatmap in the intro on desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    const intro = page.locator(".home__intro");
    await expect(
      intro.getByRole("link", {
        name: "Cursor profile @rashdriving (opens in new tab)",
      }),
    ).toBeVisible();
    await expect(page.locator(".home__work .home__intro-profile")).toHaveCount(0);
    await expect(page.locator(".home__footer .home__intro-profile")).toHaveCount(0);
  });

  test("hides the Cursor heatmap while the expression split is open", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(getDetailHref("expression"));
    await expect(page.locator(".home__detail")).toBeVisible();
    await expect(
      page.getByRole("link", {
        name: "Cursor profile @rashdriving (opens in new tab)",
      }),
    ).toBeHidden();
  });

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
