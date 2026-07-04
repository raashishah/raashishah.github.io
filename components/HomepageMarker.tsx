"use client";

import { type ReactNode } from "react";

export function HomepageMarker({ children }: { children: ReactNode }) {
  return <div data-homepage="true">{children}</div>;
}

export function isHomepageMounted() {
  if (typeof document === "undefined") {
    return false;
  }
  return document.querySelector("[data-homepage]") !== null;
}
