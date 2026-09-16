import { NextRequest, NextResponse } from "next/server";
import { calendlyLink } from "@/content/site";

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (!origin || origin !== request.nextUrl.origin) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  // Empty bodies support pages opened before quantity selection was deployed.
  let quantity = 1;
  try {
    const body = await request.text();
    if (body) quantity = JSON.parse(body)?.quantity;
    if (!Number.isSafeInteger(quantity) || quantity < 1) {
      return NextResponse.json({ error: "Choose a whole number of hours, starting at 1" }, { status: 400 });
    }
  } catch {
    return NextResponse.json({ error: "Invalid checkout request" }, { status: 400 });
  }

  const key = process.env.DODO_PAYMENTS_API_KEY;
  // A dedicated one-time INR 2,500 product, never Astrothunder's licence product.
  const product = process.env.DODO_MENTORING_PRODUCT_ID;
  const environment = process.env.DODO_PAYMENTS_ENVIRONMENT;
  if (!key || !product || !["test_mode", "live_mode"].includes(environment ?? "")) {
    return NextResponse.json({ error: "Checkout unavailable" }, { status: 503 });
  }

  const base = environment === "live_mode"
    ? "https://live.dodopayments.com"
    : "https://test.dodopayments.com";
  try {
    const response = await fetch(`${base}/checkouts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        product_cart: [{ product_id: product, quantity }],
        return_url: calendlyLink.href,
        customization: { theme: "light" },
        feature_flags: { allow_discount_code: false },
      }),
      signal: AbortSignal.timeout(15000),
      cache: "no-store",
    });
    if (!response.ok) throw new Error("Checkout failed");
    const result = await response.json();
    const url = new URL(result.checkout_url);
    if (url.protocol !== "https:" || !["checkout.dodopayments.com", "test.checkout.dodopayments.com"].includes(url.hostname)) {
      throw new Error("Invalid checkout URL");
    }
    return NextResponse.json({ checkoutUrl: url.href }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "Checkout unavailable" }, { status: 503 });
  }
}
