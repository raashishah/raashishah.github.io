export const CURSOR_HEATMAP_GAP = 10;
export const CURSOR_HEATMAP_ORIGIN = 6;
export const CURSOR_HEATMAP_RADIUS = 3.2;

const HEATMAP_FILL = {
  "0": "#C080811A",
  "1": "#C0808129",
  "2": "#C0808147",
  "3": "#C0808173",
  "4": "#C08081",
} as const;

export type HeatmapLevel = keyof typeof HEATMAP_FILL;

/**
 * Sunday–Saturday rows, 53 weeks. `.` is a pad day outside the year.
 * Levels 0–4 are binned from public activity on cursor.com/@rashdriving.
 */
export const cursorHeatmapRows = [
  ".3010010011311201040001222131442440224000000000000000",
  ".3211332133421113130414342432232440244000000000000000",
  ".0201332021331301130144244443131341434000000000000000",
  ".1301321131112323111122242443242220344000000000000000",
  "20201412131130122020122433442343414341000000000000000",
  "2331242111103312223024413332444440433000000000000000.",
  "4230030003012002034004102242443440233000000000000000.",
] as const;

export function cursorHeatmapSize() {
  const weeks = cursorHeatmapRows[0].length;
  const days = cursorHeatmapRows.length;

  return {
    width:
      CURSOR_HEATMAP_ORIGIN +
      (weeks - 1) * CURSOR_HEATMAP_GAP +
      CURSOR_HEATMAP_ORIGIN,
    height:
      CURSOR_HEATMAP_ORIGIN +
      (days - 1) * CURSOR_HEATMAP_GAP +
      CURSOR_HEATMAP_ORIGIN,
  };
}

export function fillForHeatmapCell(cell: string): string | null {
  if (cell === ".") {
    return null;
  }

  if (cell in HEATMAP_FILL) {
    return HEATMAP_FILL[cell as HeatmapLevel];
  }

  return null;
}
