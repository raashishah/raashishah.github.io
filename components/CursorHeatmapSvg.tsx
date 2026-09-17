import {
  CURSOR_HEATMAP_GAP,
  CURSOR_HEATMAP_ORIGIN,
  CURSOR_HEATMAP_RADIUS,
  cursorHeatmapRows,
  cursorHeatmapSize,
  fillForHeatmapCell,
} from "@/content/cursor-heatmap";

export function CursorHeatmapSvg() {
  const { width, height } = cursorHeatmapSize();

  return (
    <svg
      className="home__cursor-heatmap"
      viewBox={`0 0 ${width} ${height}`}
      role="presentation"
    >
      {cursorHeatmapRows.flatMap((row, day) =>
        Array.from(row, (cell, week) => {
          const fill = fillForHeatmapCell(cell);
          if (fill === null) {
            return null;
          }

          return (
            <circle
              key={`${day}-${week}`}
              cx={CURSOR_HEATMAP_ORIGIN + week * CURSOR_HEATMAP_GAP}
              cy={CURSOR_HEATMAP_ORIGIN + day * CURSOR_HEATMAP_GAP}
              r={CURSOR_HEATMAP_RADIUS}
              fill={fill}
            />
          );
        }),
      )}
    </svg>
  );
}
