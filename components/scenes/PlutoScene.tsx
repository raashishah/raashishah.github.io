"use client";

import { palette } from "@/lib/palette";
import { lerp } from "@/lib/scene-progress";
import { Scene2D } from "@/components/scenes/Scene2D";

type PlutoSceneProps = {
  progress: number;
};

type TileSpec = {
  chaos: { x: number; y: number; rotate: number };
  grid: { x: number; y: number };
  w: number;
  h: number;
  shape: "rect" | "blob" | "diamond";
  fill: string;
};

const TILES: TileSpec[] = [
  { chaos: { x: 28, y: 36, rotate: -18 }, grid: { x: 52, y: 58 }, w: 44, h: 38, shape: "blob", fill: palette.rose },
  { chaos: { x: 118, y: 22, rotate: 24 }, grid: { x: 108, y: 58 }, w: 40, h: 40, shape: "diamond", fill: palette.greyBlue },
  { chaos: { x: 200, y: 48, rotate: -8 }, grid: { x: 164, y: 58 }, w: 46, h: 34, shape: "rect", fill: palette.navy },
  { chaos: { x: 290, y: 28, rotate: 14 }, grid: { x: 220, y: 58 }, w: 42, h: 42, shape: "blob", fill: palette.ink },
  { chaos: { x: 48, y: 128, rotate: -22 }, grid: { x: 52, y: 118 }, w: 38, h: 44, shape: "rect", fill: palette.greyBlue },
  { chaos: { x: 168, y: 142, rotate: 11 }, grid: { x: 108, y: 118 }, w: 44, h: 36, shape: "diamond", fill: palette.rose },
  { chaos: { x: 248, y: 118, rotate: -14 }, grid: { x: 164, y: 118 }, w: 40, h: 40, shape: "blob", fill: palette.ink },
  { chaos: { x: 320, y: 136, rotate: 19 }, grid: { x: 220, y: 118 }, w: 42, h: 38, shape: "rect", fill: palette.navy },
  { chaos: { x: 96, y: 168, rotate: -6 }, grid: { x: 52, y: 178 }, w: 36, h: 36, shape: "diamond", fill: palette.rose },
];

function tilePath(shape: TileSpec["shape"], x: number, y: number, w: number, h: number): string {
  if (shape === "diamond") {
    return `M${x + w / 2} ${y} L${x + w} ${y + h / 2} L${x + w / 2} ${y + h} L${x} ${y + h / 2} Z`;
  }
  if (shape === "blob") {
    return `M${x} ${y + h * 0.35} Q${x + w * 0.15} ${y} ${x + w * 0.55} ${y + h * 0.08} T${x + w} ${y + h * 0.45} Q${x + w * 0.92} ${y + h} ${x + w * 0.5} ${y + h} T${x} ${y + h * 0.55} Z`;
  }
  return `M${x} ${y} H${x + w} V${y + h} H${x} Z`;
}

function Tile({ spec, progress, index }: { spec: TileSpec; progress: number; index: number }) {
  const delay = index * 0.04;
  const t = Math.min(1, Math.max(0, (progress - delay) / 0.55));
  const x = lerp(spec.chaos.x, spec.grid.x, t);
  const y = lerp(spec.chaos.y, spec.grid.y, t);
  const rotate = lerp(spec.chaos.rotate, 0, t);
  const cx = x + spec.w / 2;
  const cy = y + spec.h / 2;

  return (
    <g transform={`rotate(${rotate} ${cx} ${cy})`}>
      <path d={tilePath(spec.shape, x, y, spec.w, spec.h)} fill={spec.fill} opacity={0.92} />
      <path
        d={tilePath(spec.shape, x, y, spec.w, spec.h)}
        fill="none"
        stroke={palette.ink}
        strokeWidth="1.5"
      />
    </g>
  );
}

export function PlutoScene({ progress }: PlutoSceneProps) {
  const safeProgress = Number.isFinite(progress) ? Math.min(1, Math.max(0, progress)) : 0;
  const frameOpacity = lerp(0.35, 1, Math.min(1, safeProgress * 1.4));

  return (
    <Scene2D className="scene-pluto">
      <svg viewBox="0 0 320 240" className="scene-pluto__svg" role="img" aria-label="Creative tiles snapping into product grid">
        <rect width="320" height="240" fill={palette.base} />
        <text x="16" y="22" fill={palette.greyBlue} fontSize="10" letterSpacing="0.06em">
          PLUTO · studio chaos → product grid
        </text>

        <g opacity={frameOpacity}>
          <rect
            x="36"
            y="44"
            width="248"
            height="168"
            fill={palette.base}
            stroke={palette.ink}
            strokeWidth="2.5"
          />
          <rect x="36" y="44" width="248" height="14" fill={palette.ink} />
          <circle cx="48" cy="51" r="2.5" fill={palette.base} />
          <circle cx="58" cy="51" r="2.5" fill={palette.base} />
          <circle cx="68" cy="51" r="2.5" fill={palette.base} />
        </g>

        {TILES.map((spec, i) => (
          <Tile key={i} spec={spec} progress={safeProgress} index={i} />
        ))}
      </svg>
    </Scene2D>
  );
}
