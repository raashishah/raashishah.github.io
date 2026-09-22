import { expect, it } from "vitest";
import { calendlyLink } from "@/content/site";
import {
  mentoringBookingLabel,
  mentoringCheckoutView,
  mentoringReturnUrl,
} from "./mentoring-return";

it("returns buyers to the paid mentoring screen", () => {
  expect(mentoringReturnUrl("https://decavalent.com")).toBe(
    "https://decavalent.com/?mentoring=paid",
  );
});

it("labels the booking link with the Cal.com path", () => {
  expect(mentoringBookingLabel(calendlyLink.href)).toBe("cal.com/raashishah");
});

it("shows the booking link only after a succeeded payment", () => {
  expect(mentoringCheckoutView({ mentoring: "paid", status: "succeeded" })).toBe("paid");
  expect(mentoringCheckoutView({ mentoring: "paid", status: "failed" })).toBe("failed");
  expect(mentoringCheckoutView({ mentoring: "paid", status: "cancelled" })).toBe("failed");
  expect(mentoringCheckoutView({ mentoring: "paid", status: "processing" })).toBe("processing");
  expect(mentoringCheckoutView({ mentoring: null, status: "succeeded" })).toBe("offer");
  expect(mentoringCheckoutView({ mentoring: "paid", status: null })).toBe("offer");
});
