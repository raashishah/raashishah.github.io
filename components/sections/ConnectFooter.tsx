"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import { registerGsapPlugins } from "@/lib/animations";
import { socialLinks } from "@/content/site";
import { useMagnetic } from "@/components/cursor/useMagnetic";
import { useCursorState } from "@/components/cursor/CursorProvider";

export function ConnectFooter() {
  const nameRef = useRef<HTMLParagraphElement>(null);
  const { setCursorState, resetCursor } = useCursorState();

  useEffect(() => {
    registerGsapPlugins();
    const name = nameRef.current;
    if (!name) return;

    const letters = name.querySelectorAll("span");
    letters.forEach((letter, i) => {
      gsap.to(letter, {
        y: Math.sin(i) * 3,
        duration: 2 + i * 0.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    const onEnter = () => {
      gsap.to(letters, {
        y: -8,
        rotation: () => gsap.utils.random(-8, 8),
        stagger: 0.03,
        duration: 0.35,
        ease: "back.out(2)",
      });
      setCursorState("scene", "");
    };

    const onLeave = () => {
      gsap.to(letters, {
        y: 0,
        rotation: 0,
        stagger: 0.02,
        duration: 0.4,
        ease: "power3.out",
      });
      resetCursor();
    };

    name.addEventListener("mouseenter", onEnter);
    name.addEventListener("mouseleave", onLeave);

    return () => {
      name.removeEventListener("mouseenter", onEnter);
      name.removeEventListener("mouseleave", onLeave);
    };
  }, [resetCursor, setCursorState]);

  return (
    <footer className="connect-footer" data-section="footer" id="connect">
      <p className="connect-footer__label">connect</p>
      <ul className="connect-footer__links">
        {socialLinks.map((link) => (
          <SocialLink key={link.id} href={link.href} label={link.label} />
        ))}
      </ul>
      <p ref={nameRef} className="connect-footer__name" data-sparkle-burst>
        {"raashi".split("").map((char, i) => (
          <span key={i}>{char}</span>
        ))}
      </p>
      <p className="connect-footer__hint">keep scrolling. it loops.</p>
      <LoopScroll />
    </footer>
  );
}

function SocialLink({ href, label }: { href: string; label: string }) {
  const ref = useMagnetic<HTMLAnchorElement>(0.3);
  const { setCursorState, resetCursor } = useCursorState();

  return (
    <li>
      <a
        ref={ref}
        href={href}
        target={href.startsWith("mailto:") ? undefined : "_blank"}
        rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
        className="connect-footer__link"
        data-magnetic
        data-sparkle-burst
        onMouseEnter={() => setCursorState("link", label)}
        onMouseLeave={resetCursor}
      >
        {label}
      </a>
    </li>
  );
}

function LoopScroll() {
  useEffect(() => {
    registerGsapPlugins();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const footer = document.querySelector("[data-section='footer']");
    if (!footer) return;

    let looping = false;
    const observer = Observer.create({
      target: window,
      type: "wheel,touch",
      onDown: () => {
        const footerRect = footer.getBoundingClientRect();
        const atBottom =
          Math.ceil(window.innerHeight + window.scrollY) >=
          document.documentElement.scrollHeight - 4;
        const footerFullyVisible =
          footerRect.top <= window.innerHeight && footerRect.bottom <= window.innerHeight + 24;

        if (atBottom && footerFullyVisible && !looping) {
          looping = true;
          window.__RAASH_LENIS__?.scrollTo(0, {
            immediate: true,
            force: true,
            lock: true,
          });
          if (!window.__RAASH_LENIS__) {
            window.scrollTo({ top: 0, left: 0, behavior: "auto" });
          }
          setTimeout(() => {
            looping = false;
          }, 700);
        }
      },
      tolerance: 50,
    });

    return () => observer.kill();
  }, []);

  return null;
}
