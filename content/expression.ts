import type { PortfolioEntry } from "./types";

export const expressionContent = {
  introRole: "Agentic tools for artists",
  introTagline:
    "Auto-colour hand-drawn animation frames — with the artist in control.",
  showBookDemo: true,
  idPrefix: "expression",
  sections: [
    {
      id: "the-problem",
      title: "The problem",
      seoDescription:
        "A one-minute shot at 25 fps is 1,500 frames — each coloured by hand.",
      paragraphs: [
        "A one-minute shot at 25 fps is 1,500 frames — each coloured by hand. Automating that without taking control from the artist is still largely unsolved.",
      ],
    },
    {
      id: "parse",
      title: "Parse",
      seoDescription:
        "Closed line art from standard PNG exports — faithful to what you drew.",
      paragraphs: [
        "Closed line art from standard PNG exports — faithful to what you drew.",
      ],
    },
    {
      id: "auto-colour",
      title: "Auto-colour",
      seoDescription: "Colours to other frames across poses and holds.",
      paragraphs: ["Colours to other frames across poses and holds."],
    },
  ],
} as const satisfies {
  introRole: string;
  introTagline: string;
  showBookDemo: boolean;
  idPrefix: string;
  sections: readonly PortfolioEntry[];
};
