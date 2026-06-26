"use client";

type SceneFallbackProps = {
  className?: string;
};

export function SceneFallback({ className = "" }: SceneFallbackProps) {
  return <div className={`scene-fallback ${className}`.trim()} aria-hidden="true" />;
}
