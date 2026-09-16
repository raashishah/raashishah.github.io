"use client";

import { useRef, useState } from "react";
import { calendlyLink, emailLink } from "@/content/site";

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
      setError("Booking is temporarily unavailable. Please email me to arrange a session.");
      pending.current = false;
      setBusy(false);
    }
  }

  return (
    <section className="home__mentoring" aria-labelledby="mentoring-title">
      <p className="home__mentoring-eyebrow">One-to-one mentoring</p>
      <h2 id="mentoring-title">Work with agents</h2>
      <p className="home__mentoring-description">
        Bring your workflow. We’ll explore where agents can help and how to start using them
      </p>
      <p className="home__mentoring-price">₹2,500 <span>/ 60 minutes</span></p>
      <button className="home__mentoring-book" onClick={bookSession} disabled={busy}>
        {busy ? "Opening checkout…" : "Book a session"} <span aria-hidden="true">↗</span>
      </button>
      <p className="home__mentoring-note">Pay, then pick a time on Google Calendar</p>
      <a className="home__mentoring-availability" href={calendlyLink.href} target="_blank" rel="noopener noreferrer">
        Check availability <span aria-hidden="true">↗</span>
      </a>
      {error && <p className="home__mentoring-error" role="alert">{error} <a href={emailLink.href}>Email me ↗</a></p>}
    </section>
  );
}
