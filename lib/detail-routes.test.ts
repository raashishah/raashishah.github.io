import { describe, expect, it } from "vitest";
import {
  getDetailHref,
  getDetailSlugFromHref,
  getDetailSlugFromSearchParam,
  isDetailHref,
} from "@/lib/detail-routes";

describe("detail routes", () => {
  it("builds and parses the expression search-param href", () => {
    const href = getDetailHref("expression");

    expect(href).toBe("/?detail=expression");
    expect(getDetailSlugFromHref(href)).toBe("expression");
    expect(getDetailSlugFromHref("/expression")).toBeNull();
    expect(getDetailSlugFromSearchParam("expression")).toBe("expression");
    expect(getDetailSlugFromSearchParam("ondevice")).toBeNull();
    expect(isDetailHref(href)).toBe(true);
    expect(isDetailHref("/expression")).toBe(false);
  });
});
