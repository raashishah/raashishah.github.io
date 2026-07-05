"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import {
  PANEL_CLOSE_MS,
  PANEL_OPEN_MS,
  SHEET_DISMISS_THRESHOLD_PX,
  SHEET_HEIGHT_LARGE,
  SHEET_HEIGHT_MEDIUM,
} from "@/lib/motion";

type SheetDetent = "medium" | "large";

type BottomSheetProps = {
  title: string;
  onClose: () => void;
  requestClose?: () => Promise<void>;
  onExitComplete?: () => void;
  closing?: boolean;
  children: ReactNode;
};

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

function getFocusableElements(container: HTMLElement) {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (element) => !element.hasAttribute("disabled") && element.offsetParent !== null,
  );
}

export function BottomSheet({
  title,
  onClose,
  requestClose: requestCloseAnimated,
  onExitComplete,
  closing: closingExternal = false,
  children,
}: BottomSheetProps) {
  const [mounted, setMounted] = useState(false);
  const [closingLocal, setClosingLocal] = useState(false);
  const closing = closingExternal || closingLocal;
  const [detent, setDetent] = useState<SheetDetent>("medium");
  const sheetRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const dragStartY = useRef<number | null>(null);
  const dragDeltaY = useRef(0);

  const sheetHeight = detent === "medium" ? SHEET_HEIGHT_MEDIUM : SHEET_HEIGHT_LARGE;

  const handleRequestClose = useCallback(() => {
    if (closing) return;
    if (requestCloseAnimated) {
      void requestCloseAnimated();
      return;
    }
    setClosingLocal(true);
  }, [closing, requestCloseAnimated]);

  const completeExit = useCallback(() => {
    if (onExitComplete) {
      onExitComplete();
      return;
    }
    onClose();
  }, [onClose, onExitComplete]);

  useEffect(() => {
    if (!closing || !sheetRef.current) {
      return;
    }

    const sheet = sheetRef.current;
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      if (closingLocal) {
        setClosingLocal(false);
      }
      completeExit();
    };

    const onAnimationEnd = (event: AnimationEvent) => {
      if (event.target !== sheet || event.animationName !== "home-sheet-exit") {
        return;
      }
      finish();
    };

    sheet.addEventListener("animationend", onAnimationEnd);
    const fallbackTimer = window.setTimeout(finish, PANEL_CLOSE_MS + 50);

    return () => {
      finished = true;
      sheet.removeEventListener("animationend", onAnimationEnd);
      window.clearTimeout(fallbackTimer);
    };
  }, [closing, closingLocal, completeExit]);

  const cycleDetent = useCallback(() => {
    setDetent((current) => (current === "medium" ? "large" : "medium"));
  }, []);

  const expandDetent = useCallback(() => {
    setDetent((current) => (current === "medium" ? "large" : current));
  }, []);

  useEffect(() => {
    const body = bodyRef.current;
    if (!body) return;

    const onScroll = () => {
      if (body.scrollTop > 0) {
        expandDetent();
      }
    };

    const onWheel = (event: WheelEvent) => {
      if (event.deltaY < 0) {
        expandDetent();
      }
    };

    let touchStartY = 0;
    const onTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0]?.clientY ?? 0;
    };

    const onTouchMove = (event: TouchEvent) => {
      const touchY = event.touches[0]?.clientY ?? touchStartY;
      if (touchStartY - touchY > 12) {
        expandDetent();
      }
    };

    body.addEventListener("scroll", onScroll, { passive: true });
    body.addEventListener("wheel", onWheel, { passive: true });
    body.addEventListener("touchstart", onTouchStart, { passive: true });
    body.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      body.removeEventListener("scroll", onScroll);
      body.removeEventListener("wheel", onWheel);
      body.removeEventListener("touchstart", onTouchStart);
      body.removeEventListener("touchmove", onTouchMove);
    };
  }, [expandDetent]);

  useEffect(() => {
    setMounted(true);
    previousFocusRef.current = document.activeElement as HTMLElement | null;

    const home = document.querySelector(".home");
    home?.setAttribute("inert", "");
    document.documentElement.classList.add("home--sheet-scroll-lock");

    const closeButton = sheetRef.current?.querySelector<HTMLElement>(".home__sheet-close");
    closeButton?.focus();

    return () => {
      home?.removeAttribute("inert");
      document.documentElement.classList.remove("home--sheet-scroll-lock");
      previousFocusRef.current?.focus();
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        handleRequestClose();
        return;
      }

      if (event.key !== "Tab" || !sheetRef.current) {
        return;
      }

      const focusable = getFocusableElements(sheetRef.current);
      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [handleRequestClose]);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    dragStartY.current = event.clientY;
    dragDeltaY.current = 0;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragStartY.current === null || !sheetRef.current) return;
    dragDeltaY.current = Math.max(0, event.clientY - dragStartY.current);
    sheetRef.current.style.transform = `translateY(${dragDeltaY.current}px)`;
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragStartY.current === null || !sheetRef.current) return;

    event.currentTarget.releasePointerCapture(event.pointerId);
    sheetRef.current.style.transform = "";

    if (dragDeltaY.current > SHEET_DISMISS_THRESHOLD_PX) {
      handleRequestClose();
    }

    dragStartY.current = null;
    dragDeltaY.current = 0;
  };

  if (!mounted) {
    return null;
  }

  return createPortal(
    <>
      <button
        type="button"
        className={`home__scrim${closing ? " home__scrim--exit" : ""}`}
        aria-label="Close detail panel"
        onClick={handleRequestClose}
      />
      <div
        ref={sheetRef}
        className={`home__sheet${closing ? " home__sheet--exit" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="home-sheet-title"
        style={{
          ["--sheet-height" as string]: sheetHeight,
          transition: `height ${PANEL_OPEN_MS}ms cubic-bezier(0, 0, 0.2, 1)`,
        }}
      >
        <div
          className="home__sheet-handle"
          role="button"
          tabIndex={0}
          aria-label="Resize sheet"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onClick={cycleDetent}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              cycleDetent();
            }
          }}
        />
        <header className="home__sheet-header">
          <button
            type="button"
            className="home__sheet-close"
            onClick={handleRequestClose}
          >
            Close
          </button>
          <p id="home-sheet-title" className="home__sheet-title">
            {title}
          </p>
        </header>
        <div ref={bodyRef} className="home__sheet-body">
          {children}
        </div>
      </div>
    </>,
    document.body,
  );
}
