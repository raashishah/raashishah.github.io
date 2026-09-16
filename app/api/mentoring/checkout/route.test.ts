import { afterEach, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "./route";
import { calendlyLink } from "@/content/site";

afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals(); });
const request = (origin = "https://example.com") => new NextRequest("https://example.com/api/mentoring/checkout", {
  method: "POST", headers: { origin },
});

it("rejects foreign origins before contacting Dodo", async () => {
  const fetch = vi.fn(); vi.stubGlobal("fetch", fetch);
  expect((await POST(request("https://other.com"))).status).toBe(403);
  expect(fetch).not.toHaveBeenCalled();
});

it("fails closed without a dedicated product", async () => {
  vi.stubEnv("DODO_MENTORING_PRODUCT_ID", "");
  expect((await POST(request())).status).toBe(503);
});

it("uses the server product and calendar return URL", async () => {
  vi.stubEnv("DODO_PAYMENTS_API_KEY", "test-key");
  vi.stubEnv("DODO_MENTORING_PRODUCT_ID", "pdt_mentoring");
  vi.stubEnv("DODO_PAYMENTS_ENVIRONMENT", "test_mode");
  const fetch = vi.fn().mockResolvedValue(Response.json({ checkout_url: "https://test.checkout.dodopayments.com/session" }));
  vi.stubGlobal("fetch", fetch);
  expect((await POST(request())).status).toBe(200);
  expect(fetch.mock.calls[0][0]).toBe("https://test.dodopayments.com/checkouts");
  expect(JSON.parse(fetch.mock.calls[0][1].body)).toMatchObject({
    product_cart: [{ product_id: "pdt_mentoring", quantity: 1 }], return_url: calendlyLink.href,
  });
});

it("rejects unexpected redirects without exposing provider errors", async () => {
  vi.stubEnv("DODO_PAYMENTS_API_KEY", "test-key");
  vi.stubEnv("DODO_MENTORING_PRODUCT_ID", "pdt_mentoring");
  vi.stubEnv("DODO_PAYMENTS_ENVIRONMENT", "test_mode");
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue(Response.json({ checkout_url: "https://other.com" })));
  const response = await POST(request());
  expect(response.status).toBe(503);
  expect(await response.json()).toEqual({ error: "Checkout unavailable" });
});
