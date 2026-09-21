#!/usr/bin/env node

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..");

function readRepoFile(relativePath) {
  return readFileSync(join(repoRoot, relativePath), "utf8");
}

const motionSpec = {
  accordion: { openMs: 220, closeMs: 160 },
  panel: { openMs: 220, closeMs: 160 },
  sheet: { openMs: 280, closeMs: 220 },
  principles: [
    "Press and selection feedback is immediate on the next frame",
    "Switching accordions opens the requested item without waiting for the previous close",
    "Interrupted transitions continue from the current visual position; the latest action wins",
    "Detail close and accordion operations run in parallel, not fade-then-collapse",
    "Sheet drag tracks the finger directly; settling starts from the released position",
  ],
  accessibility: {
    reducedMotionTarget:
      "Minimise spatial travel; use brief opacity or immediate state change when Reduce Motion is enabled",
    implementationNote:
      "Site intentionally retains full motion under prefers-reduced-motion — documented deviation from HIG target",
  },
};

const state = [
  "Decavalent motion specification (target):",
  JSON.stringify(motionSpec, null, 2),
  "",
  "lib/motion.ts:",
  readRepoFile("lib/motion.ts"),
  "",
  "app/styles/tokens.css:",
  readRepoFile("app/styles/tokens.css"),
  "",
  "app/styles/accordion.css:",
  readRepoFile("app/styles/accordion.css"),
  "",
  "app/styles/panel.css:",
  readRepoFile("app/styles/panel.css"),
  "",
  "components/AnimatedDetails.tsx:",
  readRepoFile("components/AnimatedDetails.tsx"),
  "",
  "components/DetailsAccordion.tsx:",
  readRepoFile("components/DetailsAccordion.tsx"),
].join("\n");

const apiKey = process.env.TYPESAFE_API_KEY;
if (!apiKey) {
  console.error("TYPESAFE_API_KEY is not set; skipping Jev motion validation.");
  process.exit(1);
}

const response = await fetch("https://api.typesafe.ai/v1/systemone", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    model: "jev-latest",
    state,
    questions: {
      timings_match_spec: {
        type: "noul",
        instructions:
          "The implementation uses the target timings: accordion 220ms open / 160ms close, desktop detail 220ms enter / 160ms exit, phone sheet 280ms enter / 220ms exit, with matching CSS tokens and lib/motion.ts constants.",
      },
      simultaneous_switching: {
        type: "noul",
        instructions:
          "Accordion switching starts opening the requested item immediately without awaiting the previous accordion close to finish.",
      },
      immediate_feedback: {
        type: "noul",
        instructions:
          "Accordion activation provides immediate visible feedback before the height transition completes.",
      },
      interruptible_transitions: {
        type: "noul",
        instructions:
          "The implementation supports interruptible accordion transitions where the latest action wins and superseded transition callbacks are cancelled.",
      },
      accessibility_gap_documented: {
        type: "noul",
        instructions:
          "The motion spec or audit documentation explicitly records that prefers-reduced-motion still retains animations as an unresolved deviation from the HIG target.",
      },
      overall_alignment: {
        type: "score",
        instructions: "How closely the inspected implementation matches the Decavalent motion target specification.",
        criteria: [
          "Major gaps remain in timings or coordination",
          "Partial alignment with notable missing behaviours",
          "Mostly aligned with only minor documentation gaps",
          "Fully aligned with the documented target specification",
        ],
      },
    },
  }),
});

if (!response.ok) {
  console.error(`Jev validation failed: ${response.status} ${response.statusText}`);
  console.error(await response.text());
  process.exit(1);
}

const result = await response.json();
const answers = result.answers ?? {};
const failures = [];

for (const [key, answer] of Object.entries(answers)) {
  if (answer.type === "noul" && answer.noul < 0.7) {
    failures.push(`${key}: noul=${answer.noul}`);
  }
  if (answer.type === "score" && answer.score < 1) {
    failures.push(`${key}: score=${answer.score}`);
  }
}

console.log(JSON.stringify(result, null, 2));

if (failures.length > 0) {
  console.error("Jev motion validation reported low confidence:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Jev motion validation passed.");
