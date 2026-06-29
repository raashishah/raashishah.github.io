import { readFile } from "node:fs/promises";
import { join } from "node:path";

const FONTS_DIR = join(process.cwd(), "app/fonts");

export async function getOgSatoshiFonts() {
  const [regular, medium] = await Promise.all([
    readFile(join(FONTS_DIR, "Satoshi-Regular.ttf")),
    readFile(join(FONTS_DIR, "Satoshi-Medium.ttf")),
  ]);

  return [
    { name: "Satoshi", data: regular, style: "normal" as const, weight: 400 as const },
    { name: "Satoshi", data: medium, style: "normal" as const, weight: 500 as const },
  ];
}
