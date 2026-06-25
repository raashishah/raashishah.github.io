"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { registerGsapPlugins, prefersReducedMotion } from "@/lib/animations";

type TextRevealProps = {
  children: string;
  as?: "h1" | "h2" | "p" | "span";
  className?: string;
  mode?: "chars" | "words" | "lines";
  trigger?: boolean;
};

export function TextReveal({
  children,
  as: Tag = "h2",
  className = "",
  mode = "chars",
  trigger = true,
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsapPlugins();
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const parts =
      mode === "chars"
        ? children.split("").map((c) => (c === " " ? "\u00A0" : c))
        : mode === "words"
          ? children.split(" ")
          : [children];

    el.innerHTML = parts
      .map((part, i) => {
        const content = mode === "words" ? part : part;
        const spacer = mode === "words" && i < parts.length - 1 ? " " : "";
        return `<span class="text-reveal__part" style="display:inline-block;overflow:hidden"><span class="text-reveal__inner" style="display:inline-block">${content}${spacer}</span></span>`;
      })
      .join(mode === "chars" ? "" : " ");

    const inners = el.querySelectorAll(".text-reveal__inner");

    gsap.set(inners, { y: "110%", opacity: 0 });

    const anim = gsap.to(inners, {
      y: "0%",
      opacity: 1,
      duration: 0.7,
      stagger: mode === "chars" ? 0.02 : 0.06,
      ease: "power4.out",
      scrollTrigger: trigger
        ? {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          }
        : undefined,
    });

    if (!trigger) {
      gsap.to(inners, {
        y: "0%",
        opacity: 1,
        duration: 0.8,
        stagger: 0.02,
        ease: "power4.out",
        delay: 0.3,
      });
    }

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, [children, mode, trigger]);

  return (
    <Tag ref={ref as never} className={`text-reveal ${className}`} aria-label={children} />
  );
}
