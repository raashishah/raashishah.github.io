"use client";

import { useEffect, useRef } from "react";
import { TextReveal } from "@/components/effects/TextReveal";
import { HeroGridCanvas } from "@/components/scenes/HeroScene";
import { TextureHeadline } from "@/components/effects/TextureHeadline";

type HeroProps = {
  ready: boolean;
};

export function Hero({ ready }: HeroProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ready || !scrollRef.current) return;
    scrollRef.current.classList.add("hero__scroll--pulse");
  }, [ready]);

  return (
    <section className="hero" data-section="hero">
      <div className="hero__scene">
        {ready && <HeroGridCanvas />}
      </div>
      <div className="hero__content">
        <p className="hero__eyebrow">originally a product manager</p>
        {ready && (
          <TextureHeadline>
            <TextReveal as="h1" className="hero__title" mode="words" trigger={false}>
              apps and ai tools designer and engineer
            </TextReveal>
          </TextureHeadline>
        )}
      </div>
      <div ref={scrollRef} className="hero__scroll" aria-hidden="true">
        <span>scroll</span>
        <span className="hero__scroll-bar" />
      </div>
    </section>
  );
}
