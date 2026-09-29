import { afterEach, describe, expect, it } from "vitest";
import { getGaMeasurementId } from "./google-analytics";

describe("getGaMeasurementId", () => {
  const original = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  afterEach(() => {
    if (original === undefined) delete process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
    else process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = original;
  });

  it("reads a GA4 measurement id from the environment", () => {
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = " G-ABC123 ";
    expect(getGaMeasurementId()).toBe("G-ABC123");
  });

  it("stays off when the id is missing or not a measurement id", () => {
    delete process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
    expect(getGaMeasurementId()).toBeUndefined();
    expect(getGaMeasurementId("UA-1")).toBeUndefined();
    expect(getGaMeasurementId("")).toBeUndefined();
  });
});
