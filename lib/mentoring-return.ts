import { calendlyLink } from "@/content/site";

export const mentoringPaymentQuery = "mentoring";
export const mentoringPaymentValue = "paid";

export function mentoringReturnUrl(origin: string): string {
  const url = new URL("/", origin);
  url.searchParams.set(mentoringPaymentQuery, mentoringPaymentValue);
  return url.toString();
}

export function mentoringBookingLabel(href: string = calendlyLink.href): string {
  const url = new URL(href);
  return `${url.host}${url.pathname.replace(/\/$/, "")}`;
}

export type MentoringCheckoutView = "offer" | "paid" | "failed" | "processing";

export function mentoringCheckoutView(params: {
  mentoring: string | null;
  status: string | null;
}): MentoringCheckoutView {
  if (params.mentoring !== mentoringPaymentValue) return "offer";
  switch (params.status) {
    case "succeeded":
      return "paid";
    case "failed":
    case "cancelled":
      return "failed";
    case null:
      return "offer";
    default:
      return "processing";
  }
}
