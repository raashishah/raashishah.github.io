"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, type ReactNode } from "react";
import { Flip } from "gsap/Flip";
import { registerGsapPlugins } from "@/lib/animations";
import { useMagnetic } from "@/components/cursor/useMagnetic";
import { useCursorState } from "@/components/cursor/CursorProvider";

type FlipLinkProps = {
  href: string;
  flipId: string;
  className?: string;
  children: ReactNode;
};

export function FlipLink({ href, flipId, className = "", children }: FlipLinkProps) {
  const ref = useMagnetic<HTMLAnchorElement>(0.25);
  const router = useRouter();
  const navigating = useRef(false);
  const { setCursorState, resetCursor } = useCursorState();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (navigating.current) return;
    navigating.current = true;

    registerGsapPlugins();
    const source = document.querySelector(`[data-flip-id="${flipId}"]`);
    if (!source) {
      router.push(href);
      return;
    }

    const state = Flip.getState(source);
    router.push(href);

    requestAnimationFrame(() => {
      const target = document.querySelector(`[data-flip-id="${flipId}"]`);
      if (target) {
        Flip.from(state, {
          duration: 0.6,
          ease: "power4.inOut",
          absolute: true,
          onComplete: () => {
            navigating.current = false;
          },
        });
      } else {
        navigating.current = false;
      }
    });
  };

  return (
    <Link
      ref={ref}
      href={href}
      className={className}
      data-sparkle-burst
      onClick={handleClick}
      onMouseEnter={() => setCursorState("link", "view")}
      onMouseLeave={resetCursor}
    >
      {children}
    </Link>
  );
}
