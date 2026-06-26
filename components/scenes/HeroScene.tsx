"use client";

import { useEffect, useRef } from "react";
import { subscribeAnimationTicker } from "@/lib/animation-ticker";
import { palette } from "@/lib/palette";
import { prefersReducedMotion } from "@/lib/animations";

const COLS = 12;
const ROWS = 8;

type Cell = {
  col: number;
  row: number;
  x: number;
  y: number;
  w: number;
  h: number;
  baseX: number;
  baseY: number;
};

export function HeroGridCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointer = useRef({ x: -9999, y: -9999 });
  const cellsRef = useRef<Cell[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReducedMotion()) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const gap = 6;
      const cellW = (rect.width - gap * (COLS + 1)) / COLS;
      const cellH = (rect.height - gap * (ROWS + 1)) / ROWS;
      cellsRef.current = [];

      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          const x = gap + col * (cellW + gap);
          const y = gap + row * (cellH + gap);
          cellsRef.current.push({
            col,
            row,
            x,
            y,
            w: cellW,
            h: cellH,
            baseX: x,
            baseY: y,
          });
        }
      }
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const onLeave = () => {
      pointer.current = { x: -9999, y: -9999 };
    };

    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      ctx.fillStyle = palette.base;
      ctx.fillRect(0, 0, rect.width, rect.height);

      for (const cell of cellsRef.current) {
        const cx = cell.baseX + cell.w / 2;
        const cy = cell.baseY + cell.h / 2;
        const dist = Math.hypot(pointer.current.x - cx, pointer.current.y - cy);
        const influence = Math.max(0, 1 - dist / 180);
        const scale = 1 + influence * 0.15;
        const skew = (pointer.current.x - cx) * 0.0008 * influence;
        const offsetX = (pointer.current.x - cx) * 0.04 * influence;
        const offsetY = (pointer.current.y - cy) * 0.04 * influence;

        const w = cell.w * scale;
        const h = cell.h * scale;
        const x = cell.baseX + offsetX - (w - cell.w) / 2;
        const y = cell.baseY + offsetY - (h - cell.h) / 2;

        ctx.save();
        ctx.translate(x + w / 2, y + h / 2);
        ctx.transform(1, 0, skew, 1, 0, 0);
        ctx.strokeStyle = palette.ink;
        ctx.lineWidth = 1.5;
        ctx.strokeRect(-w / 2, -h / 2, w, h);
        ctx.restore();
      }
    };

    const unsub = subscribeAnimationTicker("hero-grid", () => draw());

    return () => {
      unsub();
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-grid-canvas" aria-hidden="true" />;
}
