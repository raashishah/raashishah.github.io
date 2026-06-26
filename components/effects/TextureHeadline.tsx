"use client";

import { useEffect, useRef, type ReactNode } from "react";

type TextureHeadlineProps = {
  children: ReactNode;
};

export function TextureHeadline({ children }: TextureHeadlineProps) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap || window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      const rect = wrap.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      wrap.style.setProperty("--texture-x", `${x}%`);
      wrap.style.setProperty("--texture-y", `${y}%`);
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div ref={wrapRef} className="texture-headline">
      <div className="texture-headline__grain" aria-hidden="true" />
      {children}
    </div>
  );
}
