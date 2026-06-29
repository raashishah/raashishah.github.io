import { readFile } from "node:fs/promises";
import { join } from "node:path";

const SATOSHI_PATH = join(process.cwd(), "app/fonts/Satoshi-Variable.ttf");

export async function getOgSatoshiFonts() {
  const data = await readFile(SATOSHI_PATH);

  return [
    { name: "Satoshi", data, style: "normal" as const, weight: 400 as const },
    { name: "Satoshi", data, style: "normal" as const, weight: 500 as const },
  ];
}
