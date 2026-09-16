import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { chromium } from "@playwright/test";

const root = process.cwd();
// Keep in sync with --surface in app/styles/tokens.css
const ICON_SURFACE = "#faf9f6";
const ICON_CORNER_RATIO = 0.22;
const svgSource = readFileSync(join(root, "public/img/coral.svg"), "utf8");

function coralSvg(size) {
  return svgSource
    .replace(/width="472"/, `width="${size}"`)
    .replace(/height="448"/, `height="${size}"`);
}

async function writeIcon({ output, canvas, mark }) {
  const radius = Math.round(canvas * ICON_CORNER_RATIO);
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: canvas, height: canvas },
    deviceScaleFactor: 1,
  });

  await page.setContent(`<!doctype html>
<html>
  <body style="margin:0;background:transparent">
    <div style="width:${canvas}px;height:${canvas}px;background:${ICON_SURFACE};border-radius:${radius}px;display:flex;align-items:center;justify-content:center">
      ${coralSvg(mark)}
    </div>
  </body>
</html>`);

  const png = await page.screenshot({ omitBackground: true, type: "png" });
  writeFileSync(join(root, output), png);
  await browser.close();
}

await writeIcon({ output: "app/icon.png", canvas: 32, mark: 28 });
await writeIcon({ output: "app/apple-icon.png", canvas: 180, mark: 156 });

console.log("Generated app/icon.png and app/apple-icon.png");
