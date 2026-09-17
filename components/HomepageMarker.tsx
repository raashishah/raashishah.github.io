"use client";

import { type ReactNode } from "react";

export function HomepageMarker({ children }: { children: ReactNode }) {
  return <div data-homepage="true">{children}</div>;
}
