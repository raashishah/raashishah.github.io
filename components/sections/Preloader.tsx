"use client";

import { type CSSProperties, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/animations";

type PreloaderProps = {
  onComplete: () => void;
};

export function Preloader({ onComplete }: PreloaderProps) {
  const [done, setDone] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLParagraphElement>(null);
  const branchRefs = useRef<SVGPathElement[]>([]);
  const polypRefs = useRef<SVGCircleElement[]>([]);
  const moteRefs = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    if (prefersReducedMotion()) {
      onComplete();
      setDone(true);
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          setDone(true);
          onComplete();
        },
      });

      branchRefs.current.forEach((branch) => {
        const length = branch.getTotalLength();
        gsap.set(branch, {
          strokeDasharray: length,
          strokeDashoffset: length,
          opacity: 0.95,
        });
      });

      gsap.set(polypRefs.current, {
        scale: 0,
        transformOrigin: "center center",
        opacity: 0,
      });

      gsap.set(moteRefs.current, {
        y: 24,
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
            scale: 0.85,
            duration: 0.9,
            ease: "power2.out",
          },
          0,
        )
        .from(
          nameRef.current?.querySelectorAll("span") ?? [],
          {
            yPercent: 110,
            rotate: 3,
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
            duration: 0.95,
            stagger: 0.08,
            ease: "power2.out",
          },
          0.18,
        )
        .to(
          polypRefs.current,
          {
            scale: 1,
            opacity: 1,
            duration: 0.45,
            stagger: 0.03,
            ease: "power3.out",
          },
          0.55,
        )
        .to(
          moteRefs.current,
          {
            y: -28,
            opacity: 0.75,
            duration: 1.1,
            stagger: 0.06,
            repeat: 1,
            yoyo: true,
            ease: "sine.inOut",
          },
          0.4,
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
    }, rootRef);

    return () => {
      ctx.revert();
    };
  }, [onComplete]);

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
          <div className="preloader__reef" aria-hidden="true">
            <svg
              className="preloader__reef-svg"
              viewBox="0 0 320 220"
              role="presentation"
            >
              {[
                "M160 205 C158 178 156 148 158 118 C160 95 166 75 176 56",
                "M160 156 C146 140 132 126 116 104 C105 88 99 74 96 54",
                "M166 146 C184 132 199 116 212 94 C221 80 227 64 229 44",
                "M148 186 C132 174 118 160 108 142 C101 128 98 114 99 96",
                "M178 178 C196 164 212 152 224 134 C233 121 238 107 240 88",
                "M171 121 C180 112 190 102 196 88 C202 76 204 65 203 52",
                "M145 129 C136 121 127 110 122 96 C117 83 116 71 118 58",
              ].map((path, index) => (
                <path
                  key={path}
                  ref={(node) => {
                    if (node) branchRefs.current[index] = node;
                  }}
                  className="preloader__branch"
                  d={path}
                />
              ))}
              {[
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
              ].map(([cx, cy], index) => (
                <circle
                  key={`${cx}-${cy}`}
                  ref={(node) => {
                    if (node) polypRefs.current[index] = node;
                  }}
                  className="preloader__polyp"
                  cx={cx}
                  cy={cy}
                  r={index % 3 === 0 ? 7 : 5}
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
