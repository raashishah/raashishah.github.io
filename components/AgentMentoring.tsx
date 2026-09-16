"use client";

import { useRef, useState } from "react";
import { emailLink } from "@/content/site";

export function AgentMentoring() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const pending = useRef(false);

  async function bookSession() {
    if (pending.current) return;
    pending.current = true;
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/mentoring/checkout", { method: "POST" });
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
      <button className="home__mentoring-book" onClick={bookSession} disabled={busy} aria-busy={busy} aria-live="polite">
        <span className="home__mentoring-book-label">
          {busy ? "Opening checkout…" : "Book a session"}
        </span>
      </button>
      {error && <p className="home__mentoring-error" role="alert">{error} <a href={emailLink.href}>Email me ↗</a></p>}
    </section>
  );
}
