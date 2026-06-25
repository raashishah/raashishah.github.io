"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type KotakSceneProps = {
  progress: number;
};

export function KotakScene({ progress }: KotakSceneProps) {
  const bars = useRef<THREE.Mesh[]>([]);

  useFrame(({ clock }) => {
    bars.current.forEach((bar, i) => {
      if (!bar) return;
      const h = 0.3 + Math.sin(clock.elapsedTime * 2 + i) * 0.2 + progress * 0.5;
      bar.scale.y = h;
      bar.position.y = h / 2 - 0.5;
    });
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[2, 3, 2]} intensity={0.7} />
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) bars.current[i] = el;
          }}
          position={[i * 0.35 - 1.2, 0, 0]}
        >
          <boxGeometry args={[0.25, 1, 0.25]} />
          <meshStandardMaterial color={i % 2 === 0 ? "#ED1C24" : "#333333"} />
        </mesh>
      ))}
    </>
  );
}
