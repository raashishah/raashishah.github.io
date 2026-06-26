"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";

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
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const media = window.matchMedia("(pointer: coarse)");
    const update = () => setIsCoarsePointer(media.matches);
    update();

    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  if (!enabled) {
    return <div className={`scene-canvas ${className}`} aria-hidden="true" />;
  }

  return (
    <div className={`scene-canvas ${className}`}>
      <Canvas
        camera={{ position: camera.position, fov: camera.fov }}
        dpr={isCoarsePointer ? [1, 1.1] : [1, 1.5]}
        gl={{ antialias: !isCoarsePointer, alpha: true, powerPreference: isCoarsePointer ? "default" : "high-performance" }}
      >
        <Suspense fallback={null}>{children}</Suspense>
      </Canvas>
    </div>
  );
}
