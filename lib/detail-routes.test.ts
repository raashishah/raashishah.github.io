import { describe, expect, it } from "vitest";
import {
  getDetailHref,
  getDetailSlugFromHref,
  getDetailSlugFromSearchParam,
  getHrefWithoutDetail,
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

  it("drops only the detail param when closing the sheet", () => {
    expect(getHrefWithoutDetail("/?detail=expression")).toBe("/");
    expect(getHrefWithoutDetail("https://decavalent.com/?detail=expression")).toBe("/");
    expect(getHrefWithoutDetail("/?detail=expression&status=paid")).toBe("/?status=paid");
    expect(getHrefWithoutDetail("/?detail=expression#work")).toBe("/#work");
  });
});
