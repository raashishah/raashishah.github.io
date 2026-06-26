"use client";

import { useEffect, useState } from "react";

/** Avoid SSR/client hydration mismatches for browser-only UI. */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
