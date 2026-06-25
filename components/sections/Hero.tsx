"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import { TextReveal } from "@/components/effects/TextReveal";

const HeroScene = dynamic(() => import("@/components/scenes/HeroScene").then((m) => m.HeroScene), {
  ssr: false,
  loading: () => <div className="hero-scene-fallback" />,
});

type HeroProps = {
  ready: boolean;
};

export function Hero({ ready }: HeroProps) {
  return (
    <section className="hero" data-section="hero">
      <div className="hero__scene">
        <Suspense fallback={<div className="hero-scene-fallback" />}>
          {ready && <HeroScene />}
        </Suspense>
      </div>
      <div className="hero__content">
        <p className="hero__eyebrow">rashOS</p>
        {ready && (
          <TextReveal as="h1" className="hero__title" mode="words" trigger={false}>
            strategy, shipped like software.
          </TextReveal>
        )}
        <p className="hero__subtitle">
          PM who builds. Direct, a little funny, work speaks louder than the bio.
        </p>
      </div>
      <div className="hero__scroll" aria-hidden="true">
        <span>scroll</span>
        <span className="hero__scroll-chevron" />
      </div>
    </section>
  );
}
