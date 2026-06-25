"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type ExpressionSceneProps = {
  progress: number;
};

function Frame({ index, progress }: { index: number; progress: number }) {
  const ref = useRef<THREE.Group>(null);
  const fill = Math.min(1, Math.max(0, (progress - index * 0.12) * 3));

  useFrame(() => {
    if (!ref.current) return;
    ref.current.position.y = Math.sin(index) * 0.1;
  });

  const colors = ["#ff6b4a", "#ffd24a", "#4affc8", "#ff4a8a", "#8a4aff"];

  return (
    <group ref={ref} position={[index * 1.1 - 2.2, 0, 0]}>
      <mesh>
        <planeGeometry args={[0.9, 0.9]} />
        <meshBasicMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[0, 0, 0.01]} scale={[fill, fill, 1]}>
        <planeGeometry args={[0.85, 0.85]} />
        <meshBasicMaterial color={colors[index % colors.length]} transparent opacity={0.85} />
      </mesh>
      {index === 2 && (
        <mesh position={[0, -0.15, 0.02]} scale={0.35}>
          <circleGeometry args={[1, 32]} />
          <meshBasicMaterial color="#f5d0a0" />
        </mesh>
      )}
    </group>
  );
}

export function ExpressionScene({ progress }: ExpressionSceneProps) {
  return (
    <>
      <ambientLight intensity={0.7} />
      {[0, 1, 2, 3, 4].map((i) => (
        <Frame key={i} index={i} progress={progress} />
      ))}
    </>
  );
}
