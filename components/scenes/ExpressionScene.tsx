"use client";

import { palette } from "@/lib/palette";
import { lerp, progressSegment } from "@/lib/scene-progress";
import { Scene2D } from "@/components/scenes/Scene2D";

type ExpressionSceneProps = {
  progress: number;
};

type Point = { x: number; y: number };
type Limb = { a: Point; b: Point };

type CharacterPose = {
  head: Point;
  headR: number;
  torso: Limb;
  armL: Limb;
  armR: Limb;
  legL: Limb;
  legR: Limb;
  fills: { cx: number; cy: number; rx: number; ry: number }[];
};

const DEFAULT_POSE: CharacterPose = {
  head: { x: 40, y: 16 },
  headR: 9,
  torso: { a: { x: 40, y: 26 }, b: { x: 40, y: 58 } },
  armL: { a: { x: 40, y: 32 }, b: { x: 22, y: 18 } },
  armR: { a: { x: 40, y: 32 }, b: { x: 58, y: 18 } },
  legL: { a: { x: 40, y: 58 }, b: { x: 30, y: 92 } },
  legR: { a: { x: 40, y: 58 }, b: { x: 50, y: 92 } },
  fills: [
    { cx: 40, cy: 42, rx: 12, ry: 18 },
    { cx: 40, cy: 16, rx: 9, ry: 9 },
  ],
};

/** Eight cartwheel keyframes — line-art character, scroll-scrubbed. */
const CARTWHEEL_POSES: CharacterPose[] = [
  {
    head: { x: 40, y: 16 },
    headR: 9,
    torso: { a: { x: 40, y: 26 }, b: { x: 40, y: 58 } },
    armL: { a: { x: 40, y: 32 }, b: { x: 22, y: 18 } },
    armR: { a: { x: 40, y: 32 }, b: { x: 58, y: 18 } },
    legL: { a: { x: 40, y: 58 }, b: { x: 30, y: 92 } },
    legR: { a: { x: 40, y: 58 }, b: { x: 50, y: 92 } },
    fills: [
      { cx: 40, cy: 42, rx: 12, ry: 18 },
      { cx: 40, cy: 16, rx: 9, ry: 9 },
    ],
  },
  {
    head: { x: 48, y: 30 },
    headR: 9,
    torso: { a: { x: 44, y: 38 }, b: { x: 36, y: 62 } },
    armL: { a: { x: 40, y: 44 }, b: { x: 22, y: 68 } },
    armR: { a: { x: 42, y: 40 }, b: { x: 58, y: 52 } },
    legL: { a: { x: 36, y: 62 }, b: { x: 24, y: 90 } },
    legR: { a: { x: 36, y: 62 }, b: { x: 52, y: 78 } },
    fills: [
      { cx: 40, cy: 50, rx: 14, ry: 16 },
      { cx: 48, cy: 30, rx: 9, ry: 9 },
    ],
  },
  {
    head: { x: 58, y: 52 },
    headR: 9,
    torso: { a: { x: 50, y: 48 }, b: { x: 34, y: 56 } },
    armL: { a: { x: 38, y: 54 }, b: { x: 22, y: 68 } },
    armR: { a: { x: 42, y: 52 }, b: { x: 58, y: 68 } },
    legL: { a: { x: 34, y: 56 }, b: { x: 20, y: 28 } },
    legR: { a: { x: 34, y: 56 }, b: { x: 48, y: 22 } },
    fills: [
      { cx: 42, cy: 52, rx: 16, ry: 12 },
      { cx: 58, cy: 52, rx: 9, ry: 9 },
      { cx: 34, cy: 38, rx: 10, ry: 18 },
    ],
  },
  {
    head: { x: 62, y: 68 },
    headR: 9,
    torso: { a: { x: 52, y: 62 }, b: { x: 32, y: 58 } },
    armL: { a: { x: 36, y: 60 }, b: { x: 20, y: 72 } },
    armR: { a: { x: 40, y: 60 }, b: { x: 56, y: 72 } },
    legL: { a: { x: 32, y: 58 }, b: { x: 18, y: 32 } },
    legR: { a: { x: 32, y: 58 }, b: { x: 46, y: 24 } },
    fills: [
      { cx: 42, cy: 60, rx: 18, ry: 10 },
      { cx: 62, cy: 68, rx: 9, ry: 9 },
      { cx: 32, cy: 40, rx: 12, ry: 20 },
    ],
  },
  {
    head: { x: 18, y: 48 },
    headR: 9,
    torso: { a: { x: 28, y: 50 }, b: { x: 58, y: 52 } },
    armL: { a: { x: 24, y: 50 }, b: { x: 12, y: 62 } },
    armR: { a: { x: 62, y: 52 }, b: { x: 72, y: 64 } },
    legL: { a: { x: 28, y: 50 }, b: { x: 10, y: 38 } },
    legR: { a: { x: 58, y: 52 }, b: { x: 72, y: 40 } },
    fills: [
      { cx: 42, cy: 51, rx: 28, ry: 10 },
      { cx: 18, cy: 48, rx: 9, ry: 9 },
      { cx: 66, cy: 46, rx: 10, ry: 14 },
    ],
  },
  {
    head: { x: 18, y: 68 },
    headR: 9,
    torso: { a: { x: 28, y: 62 }, b: { x: 48, y: 58 } },
    armL: { a: { x: 24, y: 60 }, b: { x: 8, y: 72 } },
    armR: { a: { x: 44, y: 60 }, b: { x: 60, y: 72 } },
    legL: { a: { x: 48, y: 58 }, b: { x: 62, y: 24 } },
    legR: { a: { x: 48, y: 58 }, b: { x: 34, y: 30 } },
    fills: [
      { cx: 38, cy: 60, rx: 18, ry: 10 },
      { cx: 18, cy: 68, rx: 9, ry: 9 },
      { cx: 52, cy: 40, rx: 12, ry: 20 },
    ],
  },
  {
    head: { x: 32, y: 52 },
    headR: 9,
    torso: { a: { x: 36, y: 48 }, b: { x: 46, y: 62 } },
    armL: { a: { x: 34, y: 52 }, b: { x: 18, y: 68 } },
    armR: { a: { x: 40, y: 50 }, b: { x: 58, y: 52 } },
    legL: { a: { x: 46, y: 62 }, b: { x: 52, y: 78 } },
    legR: { a: { x: 46, y: 62 }, b: { x: 28, y: 90 } },
    fills: [
      { cx: 40, cy: 54, rx: 14, ry: 16 },
      { cx: 32, cy: 52, rx: 9, ry: 9 },
    ],
  },
  {
    head: { x: 40, y: 20 },
    headR: 9,
    torso: { a: { x: 40, y: 30 }, b: { x: 40, y: 58 } },
    armL: { a: { x: 40, y: 36 }, b: { x: 18, y: 44 } },
    armR: { a: { x: 40, y: 36 }, b: { x: 62, y: 44 } },
    legL: { a: { x: 40, y: 58 }, b: { x: 28, y: 92 } },
    legR: { a: { x: 40, y: 58 }, b: { x: 52, y: 92 } },
    fills: [
      { cx: 40, cy: 44, rx: 12, ry: 18 },
      { cx: 40, cy: 20, rx: 9, ry: 9 },
    ],
  },
];

function getPose(index: number): CharacterPose {
  const safe = Math.max(0, Math.min(CARTWHEEL_POSES.length - 1, index));
  return CARTWHEEL_POSES[safe] ?? DEFAULT_POSE;
}

function lerpPoint(a: Point, b: Point, t: number): Point {
  return { x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t) };
}

function lerpLimb(a: Limb, b: Limb, t: number): Limb {
  return { a: lerpPoint(a.a, b.a, t), b: lerpPoint(a.b, b.b, t) };
}

function lerpPose(a: CharacterPose, b: CharacterPose, t: number): CharacterPose {
  const from = a ?? DEFAULT_POSE;
  const to = b ?? from;
  const fillCount = Math.max(from.fills.length, to.fills.length, 1);

  const fills = Array.from({ length: fillCount }, (_, i) => {
    const fa = from.fills[i] ?? from.fills[from.fills.length - 1] ?? DEFAULT_POSE.fills[0]!;
    const fb = to.fills[i] ?? to.fills[to.fills.length - 1] ?? fa;
    return {
      cx: lerp(fa.cx, fb.cx, t),
      cy: lerp(fa.cy, fb.cy, t),
      rx: lerp(fa.rx, fb.rx, t),
      ry: lerp(fa.ry, fb.ry, t),
    };
  });

  return {
    head: lerpPoint(from.head, to.head, t),
    headR: lerp(from.headR, to.headR, t),
    torso: lerpLimb(from.torso, to.torso, t),
    armL: lerpLimb(from.armL, to.armL, t),
    armR: lerpLimb(from.armR, to.armR, t),
    legL: lerpLimb(from.legL, to.legL, t),
    legR: lerpLimb(from.legR, to.legR, t),
    fills,
  };
}

function CharacterFigure({
  pose,
  fillProgress,
  strokeWidth = 2.5,
  scale = 1,
}: {
  pose: CharacterPose;
  fillProgress: number;
  strokeWidth?: number;
  scale?: number;
}) {
  const p = pose ?? DEFAULT_POSE;
  const ink = palette.ink;
  const rose = palette.rose;
  const sw = strokeWidth / scale;

  return (
    <g transform={`scale(${scale})`}>
      {p.fills.map((zone, i) => (
        <ellipse
          key={`base-${i}`}
          cx={zone.cx}
          cy={zone.cy}
          rx={zone.rx}
          ry={zone.ry}
          fill={palette.base}
          stroke={palette.ink}
          strokeWidth={sw * 0.35}
        />
      ))}
      {p.fills.map((zone, i) => (
        <ellipse
          key={`rose-${i}`}
          cx={zone.cx}
          cy={zone.cy}
          rx={zone.rx * fillProgress}
          ry={zone.ry * fillProgress}
          fill={palette.rose}
          opacity={0.92}
        />
      ))}
      <circle cx={p.head.x} cy={p.head.y} r={p.headR} fill="none" stroke={ink} strokeWidth={sw} />
      <line x1={p.torso.a.x} y1={p.torso.a.y} x2={p.torso.b.x} y2={p.torso.b.y} stroke={ink} strokeWidth={sw} strokeLinecap="round" />
      <line x1={p.armL.a.x} y1={p.armL.a.y} x2={p.armL.b.x} y2={p.armL.b.y} stroke={ink} strokeWidth={sw} strokeLinecap="round" />
      <line x1={p.armR.a.x} y1={p.armR.a.y} x2={p.armR.b.x} y2={p.armR.b.y} stroke={ink} strokeWidth={sw} strokeLinecap="round" />
      <line x1={p.legL.a.x} y1={p.legL.a.y} x2={p.legL.b.x} y2={p.legL.b.y} stroke={ink} strokeWidth={sw} strokeLinecap="round" />
      <line x1={p.legR.a.x} y1={p.legR.a.y} x2={p.legR.b.x} y2={p.legR.b.y} stroke={ink} strokeWidth={sw} strokeLinecap="round" />
      <circle cx={p.head.x - 3} cy={p.head.y - 1} r={1.2} fill={ink} />
      <circle cx={p.head.x + 3} cy={p.head.y - 1} r={1.2} fill={ink} />
    </g>
  );
}

const FRAME_COUNT = 7;
const CELL_W = 56;

export function ExpressionScene({ progress }: ExpressionSceneProps) {
  const safeProgress = Number.isFinite(progress) ? Math.min(1, Math.max(0, progress)) : 0;
  const poseCount = CARTWHEEL_POSES.length;
  const { index, local } = progressSegment(safeProgress, poseCount - 1);
  const currentPose = lerpPose(getPose(index), getPose(index + 1), local);
  const fillT = lerp(0, 1, Math.min(1, safeProgress * 1.25));
  const activeFrame = Math.round(safeProgress * (FRAME_COUNT - 1));

  return (
    <Scene2D className="scene-expression">
      <svg
        viewBox="0 0 400 220"
        className="scene-expression__svg"
        role="img"
        aria-label="Character cartwheeling through colouring frames"
      >
        <rect width="400" height="220" fill={palette.base} />
        <text x="16" y="24" fill={palette.greyBlue} fontSize="10" letterSpacing="0.06em">
          EXPRESSION · line art → flat colour
        </text>

        {Array.from({ length: FRAME_COUNT }).map((_, frame) => {
          const isActive = frame === activeFrame;
          const framePose = isActive ? currentPose : getPose(Math.round((frame / (FRAME_COUNT - 1)) * (poseCount - 1)));
          const x = 16 + frame * (CELL_W + 4);
          const frameFill = isActive ? fillT : lerp(0, 0.45, frame / FRAME_COUNT);

          return (
            <g key={frame} transform={`translate(${x}, 36)`}>
              <rect
                x="0"
                y="0"
                width={CELL_W}
                height="160"
                fill={palette.base}
                stroke={isActive ? palette.rose : palette.ink}
                strokeWidth={isActive ? 2 : 1}
              />
              <g transform={`translate(${CELL_W / 2 - 40}, 20)`}>
                <CharacterFigure
                  pose={framePose}
                  fillProgress={frameFill}
                  strokeWidth={isActive ? 3 : 2}
                  scale={isActive ? 1.15 : 0.95}
                />
              </g>
              <text x={CELL_W / 2} y="152" fill={palette.greyBlue} fontSize="8" textAnchor="middle">
                {String(frame + 1).padStart(2, "0")}
              </text>
            </g>
          );
        })}
      </svg>
    </Scene2D>
  );
}
