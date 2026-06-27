"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isE2EMode, shouldSkipMotionChrome } from "@/lib/e2e";
import { registerGsapPlugins } from "@/lib/animations";
import { palette } from "@/lib/palette";
import { useMounted } from "@/lib/useMounted";

type PreloaderProps = {
  onComplete: () => void;
};

const CORAL_TENDRILS = [
  {
    d: "M160 215 C148 178 142 142 148 108 C154 74 168 44 188 22 C198 12 210 6 222 2",
    origin: [160, 215] as const,
    strokeWidth: 15,
    gradientId: "coral-flow-a",
    sway: 4.5,
  },
  {
    d: "M158 198 C128 172 104 138 94 98 C86 68 90 38 104 16",
    origin: [158, 198] as const,
    strokeWidth: 12,
    gradientId: "coral-flow-b",
    sway: -5,
  },
  {
    d: "M164 190 C188 168 208 142 220 112 C228 88 230 62 224 36",
    origin: [164, 190] as const,
    strokeWidth: 13,
    gradientId: "coral-flow-c",
    sway: 4,
  },
  {
    d: "M152 186 C118 162 96 128 88 92 C82 64 88 38 102 18",
    origin: [152, 186] as const,
    strokeWidth: 10,
    gradientId: "coral-flow-b",
    sway: -3.5,
  },
  {
    d: "M170 176 C196 158 214 132 226 102 C234 78 236 54 228 30",
    origin: [170, 176] as const,
    strokeWidth: 11,
    gradientId: "coral-flow-a",
    sway: 3.5,
  },
] as const;

export function Preloader({ onComplete }: PreloaderProps) {
  const mounted = useMounted();
  const [done, setDone] = useState(false);
  const onCompleteRef = useRef(onComplete);
  const rootRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLParagraphElement>(null);
  const reefRef = useRef<HTMLDivElement>(null);
  const inkRefs = useRef<SVGPathElement[]>([]);
  const bleedRefs = useRef<SVGPathElement[]>([]);
  const gradientRefs = useRef<SVGLinearGradientElement[]>([]);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    let isActive = true;

    if (shouldSkipMotionChrome() || isE2EMode()) {
      if (isActive) {
        onCompleteRef.current();
        setDone(true);
      }
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          if (!isActive) return;
          setDone(true);
          onCompleteRef.current();
          registerGsapPlugins();
          ScrollTrigger.refresh();
        },
      });

      inkRefs.current.forEach((tendril) => {
        const length = tendril.getTotalLength();
        gsap.set(tendril, {
          strokeDasharray: length,
          strokeDashoffset: length,
          opacity: 1,
        });
      });
      bleedRefs.current.forEach((bleed, i) => {
        const ink = inkRefs.current[i];
        const length = ink?.getTotalLength() ?? 0;
        gsap.set(bleed, { strokeDasharray: length, strokeDashoffset: length, opacity: 0 });
      });

      tl.fromTo(
        ".preloader__backdrop",
        { clipPath: "inset(0% 0% 0% 0% round 0px)" },
        { clipPath: "inset(0% 0% 0% 0% round 0px)", duration: 0.1 },
      )
        .from(
          ".preloader__glow",
          { opacity: 0, scale: 0.88, duration: 1.2, ease: "power2.out" },
          0,
        )
        .from(
          nameRef.current?.querySelectorAll("span") ?? [],
          { yPercent: 110, rotate: 2, opacity: 0, stagger: 0.05, duration: 0.8 },
          0.2,
        )
        .to(
          inkRefs.current,
          {
            strokeDashoffset: 0,
            duration: 1.65,
            stagger: { each: 0.1, from: "center" },
            ease: "power2.inOut",
          },
          0.22,
        )
        .to(
          bleedRefs.current,
          {
            strokeDashoffset: 0,
            opacity: 1,
            duration: 1.65,
            stagger: { each: 0.1, from: "center" },
            ease: "power2.inOut",
          },
          0.22,
        )
        .to(
          ".preloader__tide",
          { scaleX: 1, duration: 1.5, ease: "power2.inOut" },
          0.25,
        )
        .to(
          ".preloader__reef",
          { yPercent: -8, duration: 0.75, ease: "power2.inOut" },
          1.15,
        )
        .to({}, { duration: 1.75 })
        .to(
          ".preloader__content",
          { yPercent: -12, opacity: 0, duration: 0.55, ease: "power3.in" },
          2.9,
        )
        .to(
          ".preloader__backdrop",
          {
            yPercent: -100,
            duration: 0.85,
            ease: "power4.inOut",
            pointerEvents: "none",
          },
          2.95,
        );

      inkRefs.current.forEach((tendril, index) => {
        const { sway } = CORAL_TENDRILS[index] ?? { sway: 3 };
        const [ox, oy] = CORAL_TENDRILS[index]?.origin ?? [160, 215];

        gsap.to(tendril, {
          rotation: sway,
          duration: 2.8 + index * 0.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          transformOrigin: `${ox}px ${oy}px`,
          delay: 0.6 + index * 0.08,
        });

        gsap.to(tendril, {
          attr: { "stroke-width": CORAL_TENDRILS[index]!.strokeWidth + 2.5 },
          duration: 2.2 + index * 0.15,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 0.75 + index * 0.1,
        });
      });

      gradientRefs.current.forEach((gradient, index) => {
        gsap.to(gradient, {
          attr: { x1: 80 + index * 12, y1: 40, x2: 280 - index * 8, y2: 200 },
          duration: 3.5 + index * 0.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.2,
        });
      });

      if (reefRef.current) {
        gsap.to(reefRef.current, {
          y: -8,
          duration: 3.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 0.5,
        });

        gsap.to(reefRef.current, {
          rotation: 1.5,
          duration: 5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 0.8,
        });

        gsap.to(reefRef.current, {
          scale: 1.04,
          duration: 2.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 1.1,
          transformOrigin: "50% 85%",
        });
      }
    }, rootRef);

    return () => {
      isActive = false;
      ctx.revert();
    };
  }, []);

  if (!mounted || done) return null;

  return (
    <div ref={rootRef} className="preloader" aria-hidden="true">
      <div className="preloader__backdrop">
        <div className="preloader__glow" />
        <div className="preloader__content">
          <p ref={nameRef} className="preloader__name" aria-hidden="true">
            {"raashi".split("").map((char, i) => (
              <span key={i}>{char}</span>
            ))}
          </p>
          <div ref={reefRef} className="preloader__reef" aria-hidden="true">
            <svg
              className="preloader__reef-svg"
              viewBox="0 0 320 220"
              preserveAspectRatio="xMidYMax slice"
              role="presentation"
            >
              <defs>
                <linearGradient
                  id="coral-flow-a"
                  ref={(node) => {
                    if (node) gradientRefs.current[0] = node;
                  }}
                  gradientUnits="userSpaceOnUse"
                  x1="120"
                  y1="220"
                  x2="240"
                  y2="20"
                >
                  <stop offset="0%" stopColor={palette.rose} stopOpacity="0.62" />
                  <stop offset="55%" stopColor={palette.rose} stopOpacity="0.48" />
                  <stop offset="100%" stopColor={palette.base} stopOpacity="0.12" />
                </linearGradient>
                <linearGradient
                  id="coral-flow-b"
                  ref={(node) => {
                    if (node) gradientRefs.current[1] = node;
                  }}
                  gradientUnits="userSpaceOnUse"
                  x1="60"
                  y1="180"
                  x2="200"
                  y2="10"
                >
                  <stop offset="0%" stopColor={palette.rose} stopOpacity="0.58" />
                  <stop offset="50%" stopColor={palette.rose} stopOpacity="0.42" />
                  <stop offset="100%" stopColor={palette.base} stopOpacity="0.1" />
                </linearGradient>
                <linearGradient
                  id="coral-flow-c"
                  ref={(node) => {
                    if (node) gradientRefs.current[2] = node;
                  }}
                  gradientUnits="userSpaceOnUse"
                  x1="180"
                  y1="200"
                  x2="300"
                  y2="30"
                >
                  <stop offset="0%" stopColor={palette.rose} stopOpacity="0.55" />
                  <stop offset="55%" stopColor={palette.rose} stopOpacity="0.38" />
                  <stop offset="100%" stopColor={palette.base} stopOpacity="0.08" />
                </linearGradient>
              </defs>
              {CORAL_TENDRILS.map((tendril, index) => (
                <path
                  key={tendril.d}
                  ref={(node) => {
                    if (node) inkRefs.current[index] = node;
                  }}
                  className="preloader__coral"
                  d={tendril.d}
                  fill="none"
                  stroke={palette.ink}
                  strokeWidth={tendril.strokeWidth}
                />
              ))}
              {CORAL_TENDRILS.map((tendril, index) => (
                <path
                  key={`${tendril.d}-bleed`}
                  ref={(node) => {
                    if (node) bleedRefs.current[index] = node;
                  }}
                  className="preloader__coral preloader__coral--bleed"
                  d={tendril.d}
                  fill="none"
                  stroke={`url(#${tendril.gradientId})`}
                  strokeWidth={tendril.strokeWidth + 4}
                />
              ))}
            </svg>
          </div>
        </div>
        <div className="preloader__tide-wrap">
          <div className="preloader__tide" />
        </div>
      </div>
    </div>
  );
}
