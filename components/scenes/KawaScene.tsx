"use client";

import { palette } from "@/lib/palette";
import { easeOutCubic, lerp } from "@/lib/scene-progress";
import { Scene2D } from "@/components/scenes/Scene2D";

type KawaSceneProps = {
  progress: number;
};

export function KawaScene({ progress }: KawaSceneProps) {
  const phase1 = easeOutCubic(Math.min(1, progress / 0.35));
  const phase2 = easeOutCubic(Math.min(1, Math.max(0, (progress - 0.35) / 0.35)));
  const phase3 = easeOutCubic(Math.min(1, Math.max(0, (progress - 0.7) / 0.3)));
  const replyLen = Math.floor(lerp(0, 52, phase3));

  return (
    <Scene2D className="scene-kawa">
      <svg viewBox="0 0 400 280" className="scene-kawa__svg" role="img" aria-label="Geospatial rainfall chatbot">
        <rect width="400" height="280" fill={palette.base} />
        {/* Map grid */}
        {Array.from({ length: 8 }).map((_, row) =>
          Array.from({ length: 10 }).map((__, col) => {
            const wet = col > 4 && col < 8 && row > 2 && phase2 > 0;
            return (
              <rect
                key={`${row}-${col}`}
                x={col * 40}
                y={row * 28}
                width="38"
                height="26"
                fill={wet ? palette.navy : palette.base}
                fillOpacity={wet ? lerp(0, 0.35, phase2) : 1}
                stroke={palette.greyBlue}
                strokeWidth="0.5"
                opacity={phase2 * 0.5 + 0.2}
              />
            );
          }),
        )}
        {/* Chat panel */}
        <rect x="16" y="16" width="368" height="248" fill={palette.base} stroke={palette.ink} strokeWidth="2" rx="4" />
        <text x="28" y="44" fill={palette.greyBlue} fontSize="10">
          Kawa · geospatial query
        </text>
        <rect x="28" y="56" width="240" height="36" fill={palette.base} stroke={palette.ink} strokeWidth="1.5" opacity={phase1} />
        <text x="40" y="78" fill={palette.ink} fontSize="11" opacity={phase1}>
          Is it raining in Shoreditch?
        </text>
        <rect x="28" y="108" width="280" height="48" fill={palette.rose} fillOpacity={0.12 * phase3} stroke={palette.ink} strokeWidth="1.5" />
        <text x="40" y="130" fill={palette.ink} fontSize="11">
          {`Yes — moderate rainfall across the western sector.`.slice(0, replyLen)}
        </text>
      </svg>
    </Scene2D>
  );
}
