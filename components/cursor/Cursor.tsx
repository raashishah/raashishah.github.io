"use client";

import { useEffect, useRef } from "react";
import { subscribeAnimationTicker } from "@/lib/animation-ticker";
import { shouldSkipMotionChrome } from "@/lib/e2e";
import { palette } from "@/lib/palette";
import { useMounted } from "@/lib/useMounted";
import { useCursorState } from "@/components/cursor/CursorProvider";

type Stroke = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  width: number;
};

const STROKE_LIFE = 400;

export function Cursor() {
  const mounted = useMounted();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const strokesRef = useRef<Stroke[]>([]);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const magnetic = useRef({ x: 0, y: 0 });
  const labelRef = useRef<HTMLSpanElement>(null);
  const { state, label } = useCursorState();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches || shouldSkipMotionChrome()) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    document.body.classList.add("custom-cursor");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };

      const el = document.elementFromPoint(e.clientX, e.clientY);
      const magneticEl = el?.closest("[data-magnetic]") ?? el?.closest("a, button");
      if (magneticEl) {
        const rect = magneticEl.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.hypot(dx, dy);
        if (dist < 80) {
          magnetic.current = { x: cx + dx * 0.15, y: cy + dy * 0.15 };
        } else {
          magnetic.current = { x: 0, y: 0 };
        }
      } else {
        magnetic.current = { x: 0, y: 0 };
      }
    };

    window.addEventListener("mousemove", onMove);

    let lastStamp = 0;
    const tick = (_dt: number, now: number) => {
      pos.current.x += (target.current.x - pos.current.x) * 0.2;
      pos.current.y += (target.current.y - pos.current.y) * 0.2;

      const drawX = magnetic.current.x || pos.current.x;
      const drawY = magnetic.current.y || pos.current.y;

      if (now - lastStamp > 24 && state !== "link") {
        lastStamp = now;
        const prev = strokesRef.current[strokesRef.current.length - 1];
        strokesRef.current.push({
          x: drawX,
          y: drawY,
          vx: prev ? drawX - prev.x : 0,
          vy: prev ? drawY - prev.y : 0,
          life: STROKE_LIFE,
          width: state === "project" ? 5 : magnetic.current.x ? 4 : 2.5,
        });
      }

      strokesRef.current = strokesRef.current
        .map((s) => ({ ...s, life: s.life - 16 }))
        .filter((s) => s.life > 0);

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      if (state === "link") {
        ctx.strokeStyle = palette.ink;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(drawX - 14, drawY);
        ctx.lineTo(drawX + 14, drawY);
        ctx.stroke();
        return;
      }

      if (state === "project") {
        ctx.fillStyle = palette.rose;
        ctx.globalAlpha = 0.25;
        ctx.beginPath();
        ctx.arc(drawX, drawY, 36, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      for (const stroke of strokesRef.current) {
        const alpha = stroke.life / STROKE_LIFE;
        ctx.strokeStyle = state === "project" ? palette.rose : palette.ink;
        ctx.globalAlpha = alpha * 0.7;
        ctx.lineWidth = stroke.width * alpha;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(stroke.x - stroke.vx, stroke.y - stroke.vy);
        ctx.lineTo(stroke.x, stroke.y);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      if (labelRef.current) {
        labelRef.current.style.transform = `translate(${drawX}px, ${drawY - 52}px) translate(-50%, 0)`;
      }
    };

    const unsub = subscribeAnimationTicker("cursor-brush", tick);

    return () => {
      unsub();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      document.body.classList.remove("custom-cursor");
    };
  }, [state]);

  useEffect(() => {
    const labelEl = labelRef.current;
    if (!labelEl) return;
    labelEl.textContent = label;
    labelEl.style.opacity = label && state === "project" ? "1" : "0";
  }, [label, state]);

  if (!mounted) return null;
  if (typeof window !== "undefined" && (window.matchMedia("(pointer: coarse)").matches || shouldSkipMotionChrome())) {
    return null;
  }

  return (
    <>
      <canvas ref={canvasRef} className="cursor-canvas" aria-hidden="true" />
      <span ref={labelRef} className="cursor-label" aria-hidden="true" />
    </>
  );
}
