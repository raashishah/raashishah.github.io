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
  /** Rose fill zones behind the ink lines */
  fills: { cx: number; cy: number; rx: number; ry: number }[];
};

/** Eight keyframes — stick-figure character performing a cartwheel left to right. */
const CARTWHEEL_POSES: CharacterPose[] = [
  // 0 — standing, arms raised
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
  // 1 — lunge, hands reaching down
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
  // 2 — hands on ground, legs lifting
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
  // 3 — upside down, legs split
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
  // 4 — horizontal mid-roll
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
  // 5 — upside down, other side
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
  // 6 — feet coming down
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
  // 7 — landing, arms out for balance
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

function lerpPoint(a: Point, b: Point, t: number): Point {
  return { x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t) };
}

function lerpLimb(a: Limb, b: Limb, t: number): Limb {
  return { a: lerpPoint(a.a, b.a, t), b: lerpPoint(a.b, b.b, t) };
}

function lerpPose(a: CharacterPose, b: CharacterPose, t: number): CharacterPose {
  const fillCount = Math.max(a.fills.length, b.fills.length);
  const fills = Array.from({ length: fillCount }, (_, i) => {
    const fa = a.fills[i] ?? a.fills[a.fills.length - 1]!;
    const fb = b.fills[i] ?? b.fills[b.fills.length - 1]!;
    return {
      cx: lerp(fa.cx, fb.cx, t),
      cy: lerp(fa.cy, fb.cy, t),
      rx: lerp(fa.rx, fb.rx, t),
      ry: lerp(fa.ry, fb.ry, t),
    };
  });

  return {
    head: lerpPoint(a.head, b.head, t),
    headR: lerp(a.headR, b.headR, t),
    torso: lerpLimb(a.torso, b.torso, t),
    armL: lerpLimb(a.armL, b.armL, t),
    armR: lerpLimb(a.armR, b.armR, t),
    legL: lerpLimb(a.legL, b.legL, t),
    legR: lerpLimb(a.legR, b.legR, t),
    fills,
  };
}

function CharacterFigure({
  pose,
  fillProgress,
  strokeWidth = 2.5,
}: {
  pose: CharacterPose;
  fillProgress: number;
  strokeWidth?: number;
}) {
  const ink = palette.ink;
  const rose = palette.rose;

  return (
    <g>
      {pose.fills.map((zone, i) => (
        <ellipse
          key={i}
          cx={zone.cx}
          cy={zone.cy}
          rx={zone.rx * fillProgress}
          ry={zone.ry * fillProgress}
          fill={rose}
          opacity={0.88}
        />
      ))}
      <circle cx={pose.head.x} cy={pose.head.y} r={pose.headR} fill="none" stroke={ink} strokeWidth={strokeWidth} />
      <line
        x1={pose.torso.a.x}
        y1={pose.torso.a.y}
        x2={pose.torso.b.x}
        y2={pose.torso.b.y}
        stroke={ink}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <line x1={pose.armL.a.x} y1={pose.armL.a.y} x2={pose.armL.b.x} y2={pose.armL.b.y} stroke={ink} strokeWidth={strokeWidth} strokeLinecap="round" />
      <line x1={pose.armR.a.x} y1={pose.armR.a.y} x2={pose.armR.b.x} y2={pose.armR.b.y} stroke={ink} strokeWidth={strokeWidth} strokeLinecap="round" />
      <line x1={pose.legL.a.x} y1={pose.legL.a.y} x2={pose.legL.b.x} y2={pose.legL.b.y} stroke={ink} strokeWidth={strokeWidth} strokeLinecap="round" />
      <line x1={pose.legR.a.x} y1={pose.legR.a.y} x2={pose.legR.b.x} y2={pose.legR.b.y} stroke={ink} strokeWidth={strokeWidth} strokeLinecap="round" />
      {/* Simple face — reads as character, not abstract shape */}
      <circle cx={pose.head.x - 3} cy={pose.head.y - 1} r={1.2} fill={ink} />
      <circle cx={pose.head.x + 3} cy={pose.head.y - 1} r={1.2} fill={ink} />
    </g>
  );
}

const FRAME_W = 88;
const FRAME_COUNT = 5;

export function ExpressionScene({ progress }: ExpressionSceneProps) {
  const poseCount = CARTWHEEL_POSES.length;
  const { index, local } = progressSegment(progress, poseCount - 1);
  const currentPose = lerpPose(CARTWHEEL_POSES[index]!, CARTWHEEL_POSES[Math.min(index + 1, poseCount - 1)]!, local);

  const travelX = lerp(8, FRAME_W * (FRAME_COUNT - 1) - 8, progress);
  const fillT = lerp(0, 1, Math.min(1, progress * 1.25));

  return (
    <Scene2D className="scene-expression">
      <svg viewBox="0 0 440 200" className="scene-expression__svg" role="img" aria-label="Character cartwheel colouring animation">
        <rect width="440" height="200" fill={palette.base} />

        {/* Filmstrip frames */}
        {Array.from({ length: FRAME_COUNT }).map((_, frame) => {
          const framePoseIdx = Math.min(poseCount - 1, index + frame - 2);
          const framePose = CARTWHEEL_POSES[framePoseIdx]!;
          const isCenter = frame === 2;
          const x = frame * FRAME_W + 12;
          const opacity = isCenter ? 1 : 0.3;

          return (
            <g key={frame} transform={`translate(${x}, 16)`} opacity={opacity}>
              <rect
                x="0"
                y="0"
                width={FRAME_W - 8}
                height="168"
                fill={palette.base}
                stroke={palette.ink}
                strokeWidth={isCenter ? 2 : 1}
              />
              <g transform="translate(4, 28)">
                <CharacterFigure pose={framePose} fillProgress={isCenter ? fillT : fillT * 0.6} strokeWidth={isCenter ? 2.5 : 2} />
              </g>
              <text x={(FRAME_W - 8) / 2} y="162" fill={palette.greyBlue} fontSize="8" textAnchor="middle">
                {String(framePoseIdx + 1).padStart(2, "0")}
              </text>
            </g>
          );
        })}

        {/* Hero character — interpolated pose, travels across strip */}
        <g transform={`translate(${travelX}, 16)`} opacity={0.95}>
          <rect
            x="0"
            y="0"
            width={FRAME_W - 8}
            height="168"
            fill="none"
            stroke={palette.rose}
            strokeWidth={1.5}
            strokeDasharray="4 4"
            opacity={0.5}
          />
          <g transform="translate(4, 28)">
            <CharacterFigure pose={currentPose} fillProgress={fillT} strokeWidth={3} />
          </g>
        </g>
      </svg>
    </Scene2D>
  );
}
