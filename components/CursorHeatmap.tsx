import { ExternalLinkArrow } from "@/components/ExternalLinkArrow";
import {
  CURSOR_HEATMAP_GAP,
  CURSOR_HEATMAP_ORIGIN,
  CURSOR_HEATMAP_RADIUS,
  cursorHeatmapRows,
  cursorHeatmapSize,
  opacityForHeatmapCell,
} from "@/content/cursor-heatmap";
import { cursorProfile } from "@/content/site";

export function CursorHeatmap() {
  const { width, height } = cursorHeatmapSize();

  return (
    <a
      className="home__cursor-profile"
      href={cursorProfile.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${cursorProfile.label} (opens in new tab)`}
    >
      <span className="home__cursor-handle">
        {cursorProfile.handle}
        <ExternalLinkArrow className="home__inline-link-icon" />
      </span>
      <svg
        className="home__cursor-heatmap"
        viewBox={`0 0 ${width} ${height}`}
        role="presentation"
      >
        {cursorHeatmapRows.flatMap((row, day) =>
          Array.from(row, (cell, week) => {
            const opacity = opacityForHeatmapCell(cell);
            if (opacity === null) {
              return null;
            }

            return (
              <circle
                key={`${day}-${week}`}
                cx={CURSOR_HEATMAP_ORIGIN + week * CURSOR_HEATMAP_GAP}
                cy={CURSOR_HEATMAP_ORIGIN + day * CURSOR_HEATMAP_GAP}
                r={CURSOR_HEATMAP_RADIUS}
                fill="currentColor"
                fillOpacity={opacity}
              />
            );
          }),
        )}
      </svg>
    </a>
  );
}
