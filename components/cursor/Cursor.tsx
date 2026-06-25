"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useCursorState } from "@/components/cursor/CursorProvider";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const { state, label } = useCursorState();

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.body.classList.add("custom-cursor");

    const pos = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };

    window.addEventListener("mousemove", onMove);

    const tick = () => {
      pos.x += (target.x - pos.x) * 0.15;
      pos.y += (target.y - pos.y) * 0.15;
      gsap.set(dot, { x: pos.x, y: pos.y });
      gsap.set(ring, { x: pos.x, y: pos.y });
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.body.classList.remove("custom-cursor");
    };
  }, []);

  useEffect(() => {
    const ring = ringRef.current;
    const labelEl = labelRef.current;
    if (!ring) return;

    const sizes: Record<string, number> = {
      default: 8,
      link: 40,
      project: 80,
      scene: 24,
    };

    gsap.to(ring, {
      width: sizes[state] ?? 8,
      height: sizes[state] ?? 8,
      duration: 0.35,
      ease: "power3.out",
    });

    if (labelEl) {
      labelEl.textContent = label;
      gsap.to(labelEl, { opacity: label ? 1 : 0, duration: 0.2 });
    }
  }, [state, label]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true">
        <span ref={labelRef} className="cursor-ring__label" />
      </div>
    </>
  );
}
