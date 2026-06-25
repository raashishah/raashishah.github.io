export type ProjectPalette = {
  id: string;
  bg: string;
  bgElevated: string;
  text: string;
  textMuted: string;
  accent: string;
  sparkle: string;
};

export const basePalette = {
  bg: "oklch(97% 0.008 80)",
  bgSection: "oklch(95% 0.006 78)",
  text: "oklch(18% 0.01 50)",
  textMuted: "oklch(42% 0.01 50)",
  accent: "oklch(55% 0.12 280)",
  sparkle: "oklch(78% 0.12 85)",
} as const;

// next/og does not support oklch() in its CSS parser, so the share-image
// palette stays visually aligned with the site while using sRGB-safe values.
export const ogBasePalette = {
  bg: "rgb(247, 244, 238)",
  bgSection: "rgb(239, 235, 229)",
  text: "rgb(39, 31, 27)",
  textMuted: "rgb(99, 89, 79)",
  accent: "rgb(110, 86, 223)",
  sparkle: "rgb(238, 191, 103)",
} as const;

export const projectPalettes: Record<string, ProjectPalette> = {
  admissions: {
    id: "admissions",
    bg: "oklch(22% 0.04 250)",
    bgElevated: "oklch(28% 0.045 250)",
    text: "oklch(95% 0.01 250)",
    textMuted: "oklch(75% 0.03 250)",
    accent: "oklch(62% 0.18 250)",
    sparkle: "oklch(72% 0.16 250)",
  },
  expression: {
    id: "expression",
    bg: "oklch(28% 0.06 30)",
    bgElevated: "oklch(35% 0.08 30)",
    text: "oklch(96% 0.01 80)",
    textMuted: "oklch(78% 0.04 50)",
    accent: "oklch(68% 0.22 35)",
    sparkle: "oklch(75% 0.2 45)",
  },
  "design-pov": {
    id: "design-pov",
    bg: "oklch(12% 0.005 0)",
    bgElevated: "oklch(18% 0.005 0)",
    text: "oklch(96% 0.005 0)",
    textMuted: "oklch(70% 0.01 0)",
    accent: "oklch(55% 0.22 25)",
    sparkle: "oklch(60% 0.2 25)",
  },
  pluto: {
    id: "pluto",
    bg: "oklch(35% 0.04 65)",
    bgElevated: "oklch(42% 0.05 65)",
    text: "oklch(96% 0.01 80)",
    textMuted: "oklch(78% 0.04 70)",
    accent: "oklch(82% 0.08 75)",
    sparkle: "oklch(85% 0.1 80)",
  },
  kawa: {
    id: "kawa",
    bg: "oklch(30% 0.05 165)",
    bgElevated: "oklch(38% 0.06 165)",
    text: "oklch(96% 0.01 165)",
    textMuted: "oklch(78% 0.04 165)",
    accent: "oklch(78% 0.14 160)",
    sparkle: "oklch(82% 0.12 165)",
  },
  aula: {
    id: "aula",
    bg: "oklch(28% 0.06 290)",
    bgElevated: "oklch(35% 0.07 290)",
    text: "oklch(96% 0.01 290)",
    textMuted: "oklch(78% 0.04 290)",
    accent: "oklch(52% 0.18 290)",
    sparkle: "oklch(78% 0.12 170)",
  },
  kotak: {
    id: "kotak",
    bg: "oklch(18% 0.02 25)",
    bgElevated: "oklch(24% 0.03 25)",
    text: "oklch(96% 0.005 25)",
    textMuted: "oklch(72% 0.02 25)",
    accent: "oklch(55% 0.22 25)",
    sparkle: "oklch(65% 0.2 25)",
  },
};

export function getProjectPalette(id: string): ProjectPalette | null {
  return projectPalettes[id] ?? null;
}
