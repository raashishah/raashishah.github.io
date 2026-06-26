"use client";

import { type CSSProperties, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/animations";

type PreloaderProps = {
  onComplete: () => void;
};

const BRANCH_PATHS = [
  "M160 205 C158 178 156 148 158 118 C160 95 166 75 176 56",
  "M160 156 C146 140 132 126 116 104 C105 88 99 74 96 54",
  "M166 146 C184 132 199 116 212 94 C221 80 227 64 229 44",
  "M148 186 C132 174 118 160 108 142 C101 128 98 114 99 96",
  "M178 178 C196 164 212 152 224 134 C233 121 238 107 240 88",
  "M171 121 C180 112 190 102 196 88 C202 76 204 65 203 52",
  "M145 129 C136 121 127 110 122 96 C117 83 116 71 118 58",
] as const;

const BRANCH_ORIGINS = [
  [160, 205],
  [160, 156],
  [166, 146],
  [148, 186],
  [178, 178],
  [171, 121],
  [145, 129],
] as const;

const POLYP_POINTS = [
  [176, 56],
  [96, 54],
  [229, 44],
  [99, 96],
  [240, 88],
  [203, 52],
  [118, 58],
  [116, 104],
  [212, 94],
  [224, 134],
] as const;

export function Preloader({ onComplete }: PreloaderProps) {
  const [done, setDone] = useState(false);
  const onCompleteRef = useRef(onComplete);
  const rootRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLParagraphElement>(null);
  const reefRef = useRef<HTMLDivElement>(null);
  const branchRefs = useRef<SVGPathElement[]>([]);
  const polypRefs = useRef<SVGCircleElement[]>([]);
  const moteRefs = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    let isActive = true;

    if (prefersReducedMotion()) {
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
        },
      });

      branchRefs.current.forEach((branch) => {
        const length = branch.getTotalLength();
        gsap.set(branch, {
          strokeDasharray: length,
          strokeDashoffset: length,
          opacity: 1,
        });
      });

      gsap.set(polypRefs.current, {
        scale: 0,
        transformOrigin: "center center",
        opacity: 0,
      });

      gsap.set(moteRefs.current, {
        y: 18,
        x: 0,
        opacity: 0,
      });

      tl.fromTo(
        ".preloader__backdrop",
        {
          clipPath: "inset(0% 0% 0% 0% round 0px)",
        },
        {
          clipPath: "inset(0% 0% 0% 0% round 0px)",
          duration: 0.1,
        },
      )
        .from(
          ".preloader__glow",
          {
            opacity: 0,
            scale: 0.92,
            duration: 0.9,
            ease: "power2.out",
          },
          0,
        )
        .from(
          nameRef.current?.querySelectorAll("span") ?? [],
          {
            yPercent: 110,
            rotate: 2,
            opacity: 0,
            stagger: 0.045,
            duration: 0.7,
          },
          0.15,
        )
        .to(
          branchRefs.current,
          {
            strokeDashoffset: 0,
            duration: 1.15,
            stagger: {
              each: 0.07,
              from: "center",
            },
            ease: "power1.inOut",
          },
          0.18,
        )
        .to(
          polypRefs.current,
          {
            scale: 1,
            opacity: 0.85,
            duration: 0.35,
            stagger: 0.025,
            ease: "power2.out",
          },
          0.72,
        )
        .to(
          ".preloader__tide",
          {
            scaleX: 1,
            duration: 1.25,
            ease: "power2.inOut",
          },
          0.2,
        )
        .to(
          ".preloader__reef",
          {
            yPercent: -8,
            duration: 0.6,
            ease: "power2.inOut",
          },
          0.9,
        )
        .to(
          ".preloader__content",
          {
            yPercent: -12,
            opacity: 0,
            duration: 0.42,
            ease: "power3.in",
          },
          1.45,
        )
        .to(
          ".preloader__backdrop",
          {
            yPercent: -100,
            duration: 0.65,
            ease: "power4.inOut",
            pointerEvents: "none",
          },
          1.52,
        );

      branchRefs.current.forEach((branch, index) => {
        const sway = index % 2 === 0 ? 3.5 : -3.5;
        const [ox, oy] = BRANCH_ORIGINS[index] ?? [160, 205];

        gsap.to(branch, {
          rotation: sway,
          duration: 2.4 + index * 0.18,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          transformOrigin: `${ox}px ${oy}px`,
          delay: 0.55 + index * 0.06,
        });
      });

      if (reefRef.current) {
        gsap.to(reefRef.current, {
          y: -6,
          duration: 3.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 0.5,
        });

        gsap.to(reefRef.current, {
          rotation: 1.2,
          duration: 4.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 0.8,
        });
      }

      polypRefs.current.forEach((polyp, index) => {
        gsap.to(polyp, {
          scale: 1.35,
          opacity: 0.55,
          duration: 1.6 + (index % 3) * 0.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 0.9 + index * 0.08,
          transformOrigin: "center center",
        });
      });

      moteRefs.current.forEach((mote, index) => {
        const drift = index % 2 === 0 ? 14 : -14;

        gsap.to(mote, {
          y: -32 - (index % 4) * 8,
          x: drift,
          opacity: 0.5,
          duration: 2.8 + index * 0.15,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 0.45 + index * 0.12,
        });
      });
    }, rootRef);

    return () => {
      isActive = false;
      ctx.revert();
    };
  }, []);

  if (done) return null;

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
              role="presentation"
            >
              {BRANCH_PATHS.map((path, index) => (
                <path
                  key={path}
                  ref={(node) => {
                    if (node) branchRefs.current[index] = node;
                  }}
                  className="preloader__branch"
                  d={path}
                />
              ))}
              {POLYP_POINTS.map(([cx, cy], index) => (
                <circle
                  key={`${cx}-${cy}`}
                  ref={(node) => {
                    if (node) polypRefs.current[index] = node;
                  }}
                  className="preloader__polyp"
                  cx={cx}
                  cy={cy}
                  r={index % 3 === 0 ? 4 : 2.5}
                />
              ))}
            </svg>
            <div className="preloader__motes">
              {Array.from({ length: 8 }).map((_, index) => (
                <span
                  key={index}
                  ref={(node) => {
                    if (node) moteRefs.current[index] = node;
                  }}
                  className="preloader__mote"
                  style={
                    {
                      "--mote-left": `${12 + index * 11}%`,
                    } as CSSProperties
                  }
                />
              ))}
            </div>
          </div>
        </div>
        <div className="preloader__tide-wrap">
          <div className="preloader__tide" />
        </div>
      </div>
    </div>
  );
}
