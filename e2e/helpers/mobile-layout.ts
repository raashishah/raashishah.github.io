import { expect, type Page } from "@playwright/test";

export const MOBILE_WIDTHS = [320, 375, 390] as const;

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

export async function getBodyCopyColor(page: Page) {
  return page.evaluate(() => {
    const paragraph = document.querySelector(
      ".home__details[open] .home__project-body p",
    );
    return paragraph ? getComputedStyle(paragraph).color : "";
  });
}
