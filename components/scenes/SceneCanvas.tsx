"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { SceneFallback } from "./SceneFallback";

type SceneCanvasProps = {
  children: React.ReactNode;
  className?: string;
  camera?: { position: [number, number, number]; fov?: number };
};

export function SceneCanvas({
  children,
  className = "",
  camera = { position: [0, 0, 5], fov: 45 },
}: SceneCanvasProps) {
  return (
    <div className={`scene-canvas ${className}`}>
      <Canvas
        camera={{ position: camera.position, fov: camera.fov }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>{children}</Suspense>
      </Canvas>
    </div>
  );
}

export { SceneFallback };
