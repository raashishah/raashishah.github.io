import type { PortfolioEntry } from "./types";

export const ondeviceContent = {
  introRole: "Agentic health app",
  introTagline:
    "Type II diabetes management with on-device AI — private by default.",
  idPrefix: "ondevice",
  sections: [
    {
      id: "privacy",
      title: "Privacy",
      seoDescription:
        "Health data stays on the device with privacy-by-default UX.",
      paragraphs: [
        "Health data stays on the device. Product direction came from 30 interviews and 10 surveys with a privacy-by-default UX.",
      ],
    },
    {
      id: "on-device-inference",
      title: "On-device inference",
      seoDescription:
        "Agentic flows run locally for personalised actions without cloud data.",
      paragraphs: [
        "Agentic flows run locally to enable personalised actions without sending sensitive data to the cloud.",
      ],
    },
  ],
} as const satisfies {
  introRole: string;
  introTagline: string;
  idPrefix: string;
  sections: readonly PortfolioEntry[];
};
