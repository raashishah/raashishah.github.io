"use client";

import { Suspense, useEffect, useRef, useState, type RefObject } from "react";
import { useSearchParams } from "next/navigation";
import { calendlyLink, emailLink } from "@/content/site";
import {
  mentoringBookingLabel,
  mentoringCheckoutView,
  mentoringPaymentQuery,
} from "@/lib/mentoring-return";

export function AgentMentoring() {
  return (
    <Suspense fallback={<MentoringOffer />}>
      <MentoringReturn />
    </Suspense>
  );
}

function MentoringReturn() {
  const searchParams = useSearchParams();
  const view = mentoringCheckoutView({
    mentoring: searchParams.get(mentoringPaymentQuery),
    status: searchParams.get("status"),
  });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (view === "offer") return;
    sectionRef.current?.scrollIntoView({ block: "nearest" });
  }, [view]);

  if (view === "paid") {
    return (
      <section ref={sectionRef} className="home__mentoring" aria-labelledby="mentoring-title">
        <p className="home__mentoring-eyebrow">Payment received</p>
        <h2 id="mentoring-title">Choose a time</h2>
        <p className="home__mentoring-description">
          Pick a 60-minute slot, then send your workflow before the call
        </p>
        <a className="home__mentoring-book" href={calendlyLink.href}>
          <span className="home__mentoring-book-label">{mentoringBookingLabel()}</span>
          <span className="home__mentoring-book-arrow" aria-hidden="true">↗</span>
        </a>
      </section>
    );
  }

  return (
    <MentoringOffer
      sectionRef={sectionRef}
      notice={
        view === "failed"
          ? "Payment didn’t go through."
          : view === "processing"
            ? "Payment is still processing."
            : ""
      }
    />
  );
}

function MentoringOffer({
  sectionRef,
  notice = "",
}: {
  sectionRef?: RefObject<HTMLElement | null>;
  notice?: string;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const pending = useRef(false);

  async function bookSession() {
    if (pending.current) return;
    pending.current = true;
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/mentoring/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
    <section ref={sectionRef} className="home__mentoring" aria-labelledby="mentoring-title">
      <p className="home__mentoring-eyebrow">
        <span>1:1 mentoring</span>
        <span aria-hidden="true">·</span>
        <span className="home__mentoring-price">₹2,500 / hour</span>
      </p>
      <h2 id="mentoring-title">Work with agents</h2>
      <p className="home__mentoring-description">
        What they are, why to use them, and how they fit your work
      </p>
      <p className="home__mentoring-description">
        Send your workflow before the call. I prepare the hour around that process
      </p>
      <button
        type="button"
        className="home__mentoring-book"
        disabled={busy}
        aria-busy={busy}
        aria-live="polite"
        onClick={() => void bookSession()}
      >
        <span className="home__mentoring-book-label">
          {busy ? "Opening checkout…" : "Book a session"}
        </span>
        <span className="home__mentoring-book-arrow" aria-hidden="true">↗</span>
      </button>
      {notice && (
        <p className="home__mentoring-error" role="alert">
          {notice} <a href={emailLink.href}>Email me ↗</a>
        </p>
      )}
      {error && <p className="home__mentoring-error" role="alert">{error} <a href={emailLink.href}>Email me ↗</a></p>}
    </section>
  );
}
