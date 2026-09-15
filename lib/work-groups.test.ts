import { describe, expect, it } from "vitest";
import {
  projects,
  resolveWorkGroups,
  workExperience,
  workGroupSpecs,
} from "@/content/portfolio";

describe("homepage work groups", () => {
  it("covers every project and job exactly once", () => {
    const groupedIds = workGroupSpecs.flatMap((group) => [...group.itemIds]);
    const catalogIds = [...projects, ...workExperience].map((entry) => entry.id);

    expect(groupedIds.sort()).toEqual([...catalogIds].sort());
    expect(new Set(groupedIds).size).toBe(groupedIds.length);
  });

  it("keeps the requested category order and titles", () => {
    const groups = resolveWorkGroups();

    expect(groups.map((group) => group.label)).toEqual([
      "Agents",
      "Machine Learning",
      "Web apps",
      "Product Management",
    ]);
    expect(groups[0]?.items.map((item) => item.title)).toEqual([
      "Pocket Analytics",
      "Vedic Astrology Agent",
      "Academic Agent Harness",
      "Skills",
      "On-device AI Agent",
    ]);
    expect(groups[1]?.items.map((item) => item.title)).toEqual([
      "Pro Animation Tool",
      "Geospatial Machine Learning",
    ]);
    expect(groups[2]?.items.map((item) => item.title)).toEqual([
      "Expo map and website",
      "Inventory for small businesses",
    ]);
    expect(groups[3]?.items.map((item) => item.title)).toEqual([
      "Working with Artists",
      "Doubled Engineering Speed",
    ]);
  });
});
