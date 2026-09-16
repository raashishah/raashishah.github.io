"use client";

import { useRef, useState } from "react";
import { emailLink } from "@/content/site";

export function AgentMentoring() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [hours, setHours] = useState("1");
  const pending = useRef(false);
  const quantity = Number(hours);
  const validQuantity = Number.isSafeInteger(quantity) && quantity > 0;

  async function bookSession() {
    if (pending.current || !validQuantity) return;
    pending.current = true;
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/mentoring/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity }),
      });
      const result = await response.json();
      if (!response.ok || typeof result.checkoutUrl !== "string") {
        throw new Error("Checkout unavailable");
      }
      window.location.assign(result.checkoutUrl);
    } catch {
      setError("Couldn’t open checkout.");
      pending.current = false;
      setBusy(false);
    }
  }

  return (
    <section className="home__mentoring" aria-labelledby="mentoring-title">
      <p className="home__mentoring-eyebrow">
        <span>1:1 mentoring</span>
        <span aria-hidden="true">·</span>
        <span className="home__mentoring-price">₹2,500 / hour</span>
      </p>
      <h2 id="mentoring-title">Work with agents</h2>
      <p className="home__mentoring-description">
        Explore what agents are. Understand why and how to use them in your workflow
      </p>
      <form onSubmit={(event) => { event.preventDefault(); void bookSession(); }}>
        <div className="home__mentoring-quantity">
          <label htmlFor="mentoring-hours">Hours</label>
          <input
            id="mentoring-hours"
            name="quantity"
            type="number"
            inputMode="numeric"
            min="1"
            step="1"
            required
            value={hours}
            onChange={(event) => setHours(event.target.value)}
            disabled={busy}
          />
          <output htmlFor="mentoring-hours" aria-live="polite">
            {validQuantity ? new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(quantity * 2500) : ""}
          </output>
        </div>
        <button type="submit" className="home__mentoring-book" disabled={busy || !validQuantity} aria-busy={busy} aria-live="polite">
          <span className="home__mentoring-book-label">
            {busy ? "Opening checkout…" : "Book a session"}
          </span>
        </button>
      </form>
      {error && <p className="home__mentoring-error" role="alert">{error} <a href={emailLink.href}>Email me ↗</a></p>}
    </section>
  );
}
