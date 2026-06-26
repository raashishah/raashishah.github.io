"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { setTickerActive, subscribeAnimationTicker } from "@/lib/animation-ticker";

type Scene2DProps = {
  children: ReactNode;
  className?: string;
  enabled?: boolean;
  active?: boolean;
  onTick?: (dt: number, now: number) => void;
};

export function Scene2D({
  children,
  className = "",
  enabled = true,
  active = true,
  onTick,
}: Scene2DProps) {
  const idRef = useRef(`scene2d-${Math.random().toString(36).slice(2)}`);

  useEffect(() => {
    if (!onTick || !enabled) return;
    const id = idRef.current;
    const unsub = subscribeAnimationTicker(id, onTick, active);
    return unsub;
  }, [onTick, enabled, active]);

  useEffect(() => {
    if (!onTick) return;
    setTickerActive(idRef.current, active && enabled);
  }, [active, enabled, onTick]);

  if (!enabled) {
    return <div className={`scene-2d scene-2d--idle ${className}`} aria-hidden="true" />;
  }

  return (
    <div className={`scene-2d ${className}`} data-scene-2d>
      {children}
    </div>
  );
}
