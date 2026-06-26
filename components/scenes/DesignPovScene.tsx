"use client";

import { palette } from "@/lib/palette";
import { lerp } from "@/lib/scene-progress";
import { Scene2D } from "@/components/scenes/Scene2D";

type DesignPovSceneProps = {
  progress: number;
};

const BOOTHS = [
  { x: 40, y: 40, w: 70, h: 50, shape: "rect" as const },
  { x: 140, y: 60, w: 50, h: 50, shape: "circle" as const },
  { x: 220, y: 30, w: 80, h: 60, shape: "rect" as const },
  { x: 80, y: 140, w: 60, h: 60, shape: "tri" as const },
  { x: 200, y: 130, w: 55, h: 55, shape: "circle" as const },
  { x: 300, y: 100, w: 65, h: 45, shape: "rect" as const },
];

const PATH = [
  { x: 30, y: 200 },
  { x: 75, y: 65 },
  { x: 165, y: 85 },
  { x: 260, y: 60 },
  { x: 115, y: 170 },
  { x: 227, y: 157 },
  { x: 332, y: 122 },
];

export function DesignPovScene({ progress }: DesignPovSceneProps) {
  const pathLen = PATH.length - 1;
  const pos = progress * pathLen;
  const idx = Math.min(pathLen - 1, Math.floor(pos));
  const t = pos - idx;
  const dotX = lerp(PATH[idx].x, PATH[idx + 1].x, t);
  const dotY = lerp(PATH[idx].y, PATH[idx + 1].y, t);
  const offlineOn = progress > 0.15;

  return (
    <Scene2D className="scene-design-pov">
      <svg viewBox="0 0 380 220" className="scene-design-pov__svg" role="img" aria-label="Exhibition floor navigation">
        <rect width="380" height="220" fill={palette.base} />
        {BOOTHS.map((b, i) => {
          const revealed = progress > i * 0.08;
          if (!revealed) return null;
          if (b.shape === "circle") {
            return (
              <circle
                key={i}
                cx={b.x + b.w / 2}
                cy={b.y + b.h / 2}
                r={b.w / 2}
                fill="none"
                stroke={palette.ink}
                strokeWidth="2"
              />
            );
          }
          if (b.shape === "tri") {
            return (
              <polygon
                key={i}
                points={`${b.x + b.w / 2},${b.y} ${b.x + b.w},${b.y + b.h} ${b.x},${b.y + b.h}`}
                fill="none"
                stroke={palette.ink}
                strokeWidth="2"
              />
            );
          }
          return (
            <rect
              key={i}
              x={b.x}
              y={b.y}
              width={b.w}
              height={b.h}
              fill="none"
              stroke={palette.ink}
              strokeWidth="2"
            />
          );
        })}
        <polyline
          points={PATH.map((p) => `${p.x},${p.y}`).join(" ")}
          fill="none"
          stroke={palette.greyBlue}
          strokeWidth="1.5"
          strokeDasharray="4 4"
          opacity={0.6}
        />
        <circle cx={dotX} cy={dotY} r="8" fill={palette.rose} />
        <circle cx={dotX} cy={dotY} r="4" fill={palette.ink} />
        <g transform="translate(12, 12)">
          <rect width="72" height="22" fill={palette.ink} rx="2" opacity={offlineOn ? 1 : 0.3} />
          <text x="36" y="15" fill={palette.base} fontSize="9" fontWeight="700" textAnchor="middle">
            OFFLINE
          </text>
        </g>
      </svg>
    </Scene2D>
  );
}
