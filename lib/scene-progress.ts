/** Map scroll progress [0,1] to a segment index and local t. */
export function progressSegment(
  progress: number,
  segmentCount: number,
): { index: number; local: number } {
  if (segmentCount <= 0) return { index: 0, local: 0 };
  const clamped = Math.min(1, Math.max(0, progress));
  const scaled = clamped * segmentCount;
  const index = Math.min(segmentCount - 1, Math.floor(scaled));
  const local = scaled - index;
  return { index, local };
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * Math.min(1, Math.max(0, t));
}

export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/** Expression cartwheel: 8 poses across progress. */
export function expressionPoseIndex(progress: number, poseCount = 8): number {
  return Math.min(poseCount - 1, Math.floor(progress * poseCount));
}
