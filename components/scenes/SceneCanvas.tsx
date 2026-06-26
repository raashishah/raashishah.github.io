"use client";

import { Canvas } from "@react-three/fiber";
import { Component, Suspense, useEffect, useState, type ReactNode } from "react";
import { SceneFallback } from "./SceneFallback";

let cachedWebglSupport: boolean | null = null;

function detectWebglSupport() {
  if (typeof window === "undefined") return false;

  const canvas = document.createElement("canvas");
  try {
    const context =
      canvas.getContext("webgl2", { failIfMajorPerformanceCaveat: true }) ||
      canvas.getContext("webgl", { failIfMajorPerformanceCaveat: true }) ||
      canvas.getContext("experimental-webgl");

    if (!context) return false;

    const loseContext = (context as WebGLRenderingContext & { getExtension?: (name: string) => { loseContext?: () => void } | null })
      .getExtension?.("WEBGL_lose_context");
    loseContext?.loseContext?.();
    return true;
  } catch {
    return false;
  }
}

type SceneErrorBoundaryProps = {
  children: ReactNode;
  fallback: ReactNode;
  onError: () => void;
};

type SceneErrorBoundaryState = {
  hasError: boolean;
};

class SceneErrorBoundary extends Component<SceneErrorBoundaryProps, SceneErrorBoundaryState> {
  state: SceneErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    this.props.onError();
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

type SceneCanvasProps = {
  children: React.ReactNode;
  className?: string;
  camera?: { position: [number, number, number]; fov?: number };
  enabled?: boolean;
};

export function SceneCanvas({
  children,
  className = "",
  camera = { position: [0, 0, 5], fov: 45 },
  enabled = true,
}: SceneCanvasProps) {
  const [supportsWebgl, setSupportsWebgl] = useState(() => cachedWebglSupport);
  const fallback = <SceneFallback />;

  useEffect(() => {
    if (cachedWebglSupport !== null) {
      setSupportsWebgl(cachedWebglSupport);
      return;
    }

    const supported = detectWebglSupport();
    cachedWebglSupport = supported;
    setSupportsWebgl(supported);
  }, []);

  const handleWebglError = () => {
    cachedWebglSupport = false;
    setSupportsWebgl(false);
  };

  if (!enabled) {
    return <div className={`scene-canvas ${className}`} aria-hidden="true" />;
  }

  if (supportsWebgl !== true) {
    return (
      <div className={`scene-canvas ${className}`}>
        {fallback}
      </div>
    );
  }

  return (
    <div className={`scene-canvas ${className}`}>
      <SceneErrorBoundary fallback={fallback} onError={handleWebglError}>
        <Canvas
          camera={{ position: camera.position, fov: camera.fov }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          fallback={fallback}
          onCreated={() => {
            cachedWebglSupport = true;
          }}
        >
          <Suspense fallback={null}>{children}</Suspense>
        </Canvas>
      </SceneErrorBoundary>
    </div>
  );
}
