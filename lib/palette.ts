/** Unified rashOS palette — single source of truth for scroll journey. */
export const palette = {
  base: "#f5ede8",
  ink: "#111010",
  rose: "#c08081",
  greyBlue: "#8fa0b4",
  navy: "#1a2038",
} as const;

export type PaletteToken = keyof typeof palette;

export const cssVarMap = {
  "--bg-base": palette.base,
  "--bg-section": palette.base,
  "--text-primary": palette.ink,
  "--text-muted": palette.greyBlue,
  "--accent": palette.rose,
  "--zone-bg": palette.base,
  "--zone-text": palette.ink,
  "--zone-muted": palette.greyBlue,
  "--zone-accent": palette.rose,
} as const;

export function paletteStyle(): Record<string, string> {
  return { ...cssVarMap };
}
