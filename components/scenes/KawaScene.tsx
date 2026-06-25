"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type KawaSceneProps = {
  progress: number;
};

export function KawaScene({ progress }: KawaSceneProps) {
  const layers = useRef<THREE.Mesh[]>([]);

  useFrame(() => {
    layers.current.forEach((mesh, i) => {
      if (!mesh) return;
      const reveal = Math.min(1, Math.max(0, (progress - i * 0.15) * 2));
      mesh.position.y = -1 + reveal * (i * 0.3);
      const mat = mesh.material as THREE.MeshStandardMaterial;
      mat.opacity = reveal * 0.85;
    });
  });

  const colors = ["#2d6a4f", "#40916c", "#52b788", "#74c69d"];

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 4, 3]} intensity={0.8} />
      {colors.map((color, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) layers.current[i] = el;
          }}
          rotation={[-Math.PI / 2.5, 0, 0]}
          position={[0, -1, 0]}
        >
          <planeGeometry args={[4, 4, 16, 16]} />
          <meshStandardMaterial color={color} transparent opacity={0} wireframe={i > 1} />
        </mesh>
      ))}
    </>
  );
}
