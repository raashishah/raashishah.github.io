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

export async function getComputedColor(page: Page, selector: string) {
  return page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) {
      return "";
    }
    return getComputedStyle(el).color;
  }, selector);
}

export async function assertTypographyHierarchy(page: Page) {
  const nameSize = await getComputedFontSize(page, ".home__intro .home__line--name");
  const roleSize = await getComputedFontSize(page, ".home__intro .home__line--role");
  const taglineSize = await getComputedFontSize(
    page,
    ".home__intro .home__line--tagline",
  );
  const sublineSize = await getComputedFontSize(
    page,
    ".home__intro .home__line--subline",
  );
  const nameWeight = await getComputedFontWeight(page, ".home__intro .home__line--name");
  const roleWeight = await getComputedFontWeight(page, ".home__intro .home__line--role");
  const taglineWeight = await getComputedFontWeight(
    page,
    ".home__intro .home__line--tagline",
  );
  const sublineWeight = await getComputedFontWeight(
    page,
    ".home__intro .home__line--subline",
  );
  const roleColor = await getComputedColor(page, ".home__intro .home__line--role");
  const taglineColor = await getComputedColor(page, ".home__intro .home__line--tagline");
  const sublineColor = await getComputedColor(page, ".home__intro .home__line--subline");

  expect(nameWeight).toBe(500);
  expect(roleWeight).toBe(400);
  expect(taglineWeight).toBe(500);
  expect(sublineWeight).toBe(400);
  expect(nameSize).toBeGreaterThan(taglineSize);
  expect(taglineSize).toBeGreaterThan(sublineSize);
  expect(sublineSize).toBeGreaterThan(roleSize);
  expect(roleColor).toBe(await getSemanticColor(page, "--text-muted"));
  expect(taglineColor).toBe(await getSemanticColor(page, "--text"));
  expect(sublineColor).toBe(await getSemanticColor(page, "--color-body"));
}

export async function getBodyCopyColor(page: Page) {
  return page.evaluate(() => {
    const paragraph = document.querySelector(
      ".home__details[open] .home__project-body p",
    );
    return paragraph ? getComputedStyle(paragraph).color : "";
  });
}
