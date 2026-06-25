"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { SparkleTrail } from "@/components/effects/SparkleTrail";

export function SparkleProvider({ children }: { children: ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const trail = new SparkleTrail(canvas);
    trail.start();

    return () => trail.stop();
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="sparkle-canvas" aria-hidden="true" />
      {children}
    </>
  );
}
