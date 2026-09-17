import { expect, type Page } from "@playwright/test";

export const MOBILE_WIDTHS = [320, 375, 390] as const;

export async function getSemanticColor(page: Page, cssVariable: string) {
  return page.evaluate((variable) => {
    const probe = document.createElement("span");
    probe.style.color = `var(${variable})`;
    probe.style.display = "none";
    document.body.appendChild(probe);
    const color = getComputedStyle(probe).color;
    probe.remove();
    return color;
  }, cssVariable);
}

export async function assertNoHorizontalScroll(page: Page) {
  const { scrollWidth, clientWidth } = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));

  expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
}

export async function getFirstLineText(page: Page, selector: string) {
  return page.evaluate((sel) => {
    const el = document.querySelector(sel);
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
  }, selector);
}

export async function assertInlineLinkArrowOnLastLine(
  page: Page,
  linkSelector: string,
) {
  const arrowOnLastLine = await page.evaluate((sel) => {
    const link = document.querySelector(sel);
    const icon = link?.querySelector(".home__inline-link-icon");
    if (!link || !icon) {
      return false;
    }

    const range = document.createRange();
    range.selectNodeContents(link);
    const lineTops = Array.from(range.getClientRects()).map((rect) => rect.top);
    const lastLineTop = Math.max(...lineTops);

    return Math.abs(icon.getBoundingClientRect().top - lastLineTop) < 4;
  }, linkSelector);

  expect(arrowOnLastLine).toBe(true);
}

export async function assertHeaderContactDoesNotOrphanOr(page: Page) {
  const lineCount = await page.evaluate(() => {
    const nav = document.querySelector(".home__header-contact");
    if (!nav) {
      return 0;
    }

    const range = document.createRange();
    range.selectNodeContents(nav);
    const tops = Array.from(range.getClientRects()).map((rect) => Math.round(rect.top));

    return tops.filter((top, index, all) => all.indexOf(top) === index).length;
  });

  expect(lineCount).toBe(1);
}

export async function assertFooterMetaWithinHomePadding(page: Page) {
  const alignment = await page.evaluate(() => {
    const home = document.querySelector(".home");
    const meta = document.querySelector(".home__footer-meta");
    const mark = document.querySelector(".home__footer-mark");
    const hint = document.querySelector(".home__footer-meta-hint");

    if (!home || !meta || !mark || !hint) {
      return null;
    }

    const homeRect = home.getBoundingClientRect();
    const metaRect = meta.getBoundingClientRect();
    const markRect = mark.getBoundingClientRect();
    const homeStyles = getComputedStyle(home);
    const padLeft = Number.parseFloat(homeStyles.paddingLeft);
    const padRight = Number.parseFloat(homeStyles.paddingRight);
    const contentLeft = homeRect.left + padLeft;
    const contentRight = homeRect.right - padRight;

    return {
      contentLeft: Math.round(contentLeft),
      contentRight: Math.round(contentRight),
      metaLeft: Math.round(metaRect.left),
      metaRight: Math.round(metaRect.right),
      markLeft: Math.round(markRect.left),
      markInHint: hint.contains(mark),
    };
  });

  expect(alignment).not.toBeNull();
  if (!alignment) {
    return;
  }

  expect(alignment.markInHint).toBe(true);
  expect(alignment.metaLeft).toBeGreaterThanOrEqual(alignment.contentLeft - 1);
  expect(alignment.markLeft).toBeGreaterThanOrEqual(alignment.contentLeft - 1);
  expect(alignment.metaRight).toBeLessThanOrEqual(alignment.contentRight + 1);
}

export async function getComputedFontSize(page: Page, selector: string) {
  return page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) {
      return 0;
    }
    return Number.parseFloat(getComputedStyle(el).fontSize);
  }, selector);
}

export async function getComputedFontWeight(page: Page, selector: string) {
  return page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) {
      return 0;
    }
    return Number.parseInt(getComputedStyle(el).fontWeight, 10);
  }, selector);
}

export async function assertTypographyHierarchy(page: Page) {
  const nameSize = await getComputedFontSize(page, ".home__intro .home__line--name");
  const taglineSize = await getComputedFontSize(
    page,
    ".home__intro .home__line--tagline",
  );
  const sublineSize = await getComputedFontSize(
    page,
    ".home__intro .home__line--subline",
  );
  const nameWeight = await getComputedFontWeight(page, ".home__intro .home__line--name");
  const taglineWeight = await getComputedFontWeight(
    page,
    ".home__intro .home__line--tagline",
  );
  const sublineWeight = await getComputedFontWeight(
    page,
    ".home__intro .home__line--subline",
  );

  expect(nameWeight).toBe(400);
  expect(taglineWeight).toBe(400);
  expect(sublineWeight).toBe(400);
  expect(Math.abs(nameSize - taglineSize)).toBeLessThan(0.5);
  expect(Math.abs(nameSize - sublineSize)).toBeLessThan(0.5);
}

export async function assertListSectionHeadingHierarchy(page: Page) {
  const heading = page.locator(".home__list-section-heading").first();
  const rowTitle = page.locator(".home__project-title").first();
  await expect(heading).toBeVisible();
  await expect(rowTitle).toBeVisible();

  const metrics = await page.evaluate(() => {
    const sectionHeading = document.querySelector(".home__list-section-heading");
    const title = document.querySelector(".home__project-title");
    const tagline = document.querySelector(".home__intro .home__line--tagline");
    const identity = document.querySelector(".home__intro .home__line--name");
    const lemma = document.querySelector(".dictionary-entry__lemma");
    if (!sectionHeading || !title || !tagline || !identity || !lemma) {
      return null;
    }

    const headingStyles = getComputedStyle(sectionHeading);
    const titleStyles = getComputedStyle(title);
    return {
      headingSize: Number.parseFloat(headingStyles.fontSize),
      headingWeight: Number.parseInt(headingStyles.fontWeight, 10),
      headingColor: headingStyles.color,
      rowSize: Number.parseFloat(titleStyles.fontSize),
      taglineSize: Number.parseFloat(getComputedStyle(tagline).fontSize),
      identitySize: Number.parseFloat(getComputedStyle(identity).fontSize),
      lemmaSize: Number.parseFloat(getComputedStyle(lemma).fontSize),
    };
  });

  expect(metrics).not.toBeNull();
  if (!metrics) {
    return;
  }

  const ink = await getSemanticColor(page, "--text");
  const muted = await getSemanticColor(page, "--text-muted");
  expect(metrics.headingWeight).toBe(500);
  expect(metrics.headingColor).toBe(ink);
  expect(metrics.headingColor).not.toBe(muted);
  expect(metrics.headingSize).toBeGreaterThan(metrics.rowSize);
  expect(metrics.taglineSize).toBeGreaterThan(metrics.headingSize);
  expect(metrics.identitySize).toBeGreaterThan(metrics.headingSize);
  expect(metrics.lemmaSize).toBeGreaterThan(metrics.identitySize);
}

export async function assertDictionaryTypeMix(page: Page) {
  const fonts = await page.evaluate(() => {
    const styleOf = (selector: string) => {
      const el = document.querySelector(selector);
      if (!el) {
        return { family: "", weight: 0 };
      }
      const styles = getComputedStyle(el);
      return {
        family: styles.fontFamily.toLowerCase(),
        weight: Number.parseInt(styles.fontWeight, 10),
      };
    };

    const examples = Array.from(
      document.querySelectorAll(".dictionary-entry__example"),
    );

    return {
      lemma: styleOf(".dictionary-entry__lemma"),
      gloss: styleOf(".dictionary-entry__gloss"),
      example: styleOf(".dictionary-entry__example"),
      followExample: examples[1]
        ? {
            family: getComputedStyle(examples[1]).fontFamily.toLowerCase(),
            weight: Number.parseInt(getComputedStyle(examples[1]).fontWeight, 10),
          }
        : { family: "", weight: 0 },
      origin: styleOf(".dictionary-entry__origin"),
      ipa: styleOf(".dictionary-entry__ipa"),
      pos: styleOf(".dictionary-entry__pos-word"),
      grammar: styleOf(".dictionary-entry__grammar"),
      label: styleOf(".dictionary-entry__label"),
    };
  });

  expect(fonts.lemma.family).toMatch(/newsreader/i);
  expect(fonts.gloss.family).toMatch(/newsreader/i);
  expect(fonts.example.family).toMatch(/newsreader/i);
  expect(fonts.followExample.family).toMatch(/newsreader/i);
  expect(fonts.origin.family).toMatch(/newsreader/i);
  expect(fonts.ipa.family).toMatch(/newsreader/i);
  expect(fonts.pos.family).toMatch(/satoshi/i);
  expect(fonts.grammar.family).toMatch(/satoshi/i);
  expect(fonts.label.family).toMatch(/satoshi/i);

  expect(fonts.lemma.weight).toBe(500);
  expect(fonts.gloss.weight).toBe(400);
  expect(fonts.example.weight).toBe(400);
  expect(fonts.followExample.weight).toBe(400);
  expect(fonts.origin.weight).toBe(400);
  expect(fonts.ipa.weight).toBe(400);
  expect(fonts.pos.weight).toBe(500);
  expect(fonts.grammar.weight).toBe(400);
  expect(fonts.label.weight).toBe(400);
}

export async function getBodyCopyColor(page: Page) {
  return page.evaluate(() => {
    const paragraph = document.querySelector(
      ".home__details[open] .home__project-body p",
    );
    return paragraph ? getComputedStyle(paragraph).color : "";
  });
}
