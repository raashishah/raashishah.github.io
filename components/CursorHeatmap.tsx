import Image from "next/image";
import { ExternalLinkArrow } from "@/components/ExternalLinkArrow";
import {
  CURSOR_HEATMAP_GAP,
  CURSOR_HEATMAP_ORIGIN,
  CURSOR_HEATMAP_RADIUS,
  cursorHeatmapRows,
  cursorHeatmapSize,
  fillForHeatmapCell,
} from "@/content/cursor-heatmap";
import { cursorProfile } from "@/content/site";

export function CursorHeatmap() {
  const { width, height } = cursorHeatmapSize();
  const { avatar } = cursorProfile;

  return (
    <a
      className="home__cursor-profile"
      href={cursorProfile.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${cursorProfile.label} (opens in new tab)`}
    >
      <span className="home__cursor-identity">
        <Image
          src={avatar.src}
          alt=""
          aria-hidden="true"
          width={avatar.width}
          height={avatar.height}
          className="home__cursor-avatar"
        />
        <span className="home__cursor-name-block">
          <span className="home__cursor-name">{cursorProfile.name}</span>
          <span className="home__cursor-handle">{cursorProfile.handle}</span>
        </span>
        <ExternalLinkArrow className="home__cursor-arrow" />
      </span>
      <span className="home__cursor-heatmap-wrap">
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
      </span>
    </a>
  );
}
