/** Hover decode: 0.03s ticks, three cycles, then the character locks left to right. */
export const HOVER_SCRAMBLE_TICK_MS = 30;
export const HOVER_SCRAMBLE_CYCLES = 3;

export function hoverScrambleText(
  text: string,
  step: number,
  glyphAt: (index: number) => string,
  cycles = HOVER_SCRAMBLE_CYCLES,
): string {
  const locked = Math.floor(step / cycles);
  if (locked >= text.length) {
    return text;
  }
  return text
    .split("")
    .map((char, index) => (index < locked ? char : glyphAt(index)))
    .join("");
}

export function hoverScrambleSettled(
  text: string,
  step: number,
  cycles = HOVER_SCRAMBLE_CYCLES,
): boolean {
  return Math.floor(step / cycles) >= text.length;
}
