/** Detect E2E / test harness mode (?e2e=1). */
export function isE2EMode(): boolean {
  if (typeof window === "undefined") return false;
  return new URLSearchParams(window.location.search).get("e2e") === "1";
}

export function shouldSkipMotionChrome(): boolean {
  if (typeof window === "undefined") return false;
  if (isE2EMode()) return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
