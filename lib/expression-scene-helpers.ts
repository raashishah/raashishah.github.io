/** Test helpers mirroring ExpressionScene pose logic (no React). */

type Point = { x: number; y: number };
type Limb = { a: Point; b: Point };

export type CharacterPose = {
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
  fills: [{ cx: 40, cy: 42, rx: 12, ry: 18 }],
};

const POSES: CharacterPose[] = [DEFAULT_POSE, { ...DEFAULT_POSE, head: { x: 50, y: 30 }, fills: [{ cx: 44, cy: 50, rx: 14, ry: 16 }] }];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * Math.min(1, Math.max(0, t));
}

export function getExpressionPose(index: number): CharacterPose {
  const safe = Math.max(0, Math.min(POSES.length - 1, index));
  return POSES[safe] ?? DEFAULT_POSE;
}

export function lerpPoseForTest(a: CharacterPose, b: CharacterPose, t: number): CharacterPose {
  const from = a ?? DEFAULT_POSE;
  const to = b ?? from;
  const fillCount = Math.max(from.fills.length, to.fills.length, 1);
  const fills = Array.from({ length: fillCount }, (_, i) => {
    const fa = from.fills[i] ?? from.fills[from.fills.length - 1] ?? DEFAULT_POSE.fills[0]!;
    const fb = to.fills[i] ?? to.fills[to.fills.length - 1] ?? fa;
    return { cx: lerp(fa.cx, fb.cx, t), cy: lerp(fa.cy, fb.cy, t), rx: lerp(fa.rx, fb.rx, t), ry: lerp(fa.ry, fb.ry, t) };
  });
  return { ...from, head: { x: lerp(from.head.x, to.head.x, t), y: lerp(from.head.y, to.head.y, t) }, fills };
}
