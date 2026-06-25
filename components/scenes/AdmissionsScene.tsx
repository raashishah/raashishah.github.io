"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type AdmissionsSceneProps = {
  progress: number;
};

function Doc({ index, progress }: { index: number; progress: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const side = progress > 0.5 + index * 0.08 ? 1 : progress > 0.3 ? 0 : -1;

  useFrame(() => {
    if (!ref.current) return;
    const targetX = side * 2.5;
    ref.current.position.x += (targetX - ref.current.position.x) * 0.08;
    ref.current.rotation.z = Math.sin(index) * 0.1;
  });

  return (
    <mesh ref={ref} position={[index * 0.3 - 1, index * 0.15 - 0.5, -index * 0.2]}>
      <planeGeometry args={[0.8, 1.1]} />
      <meshStandardMaterial
        color={side > 0 ? "#4a9eff" : side < 0 ? "#334455" : "#8899aa"}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}

export function AdmissionsScene({ progress }: AdmissionsSceneProps) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 4, 5]} intensity={1} />
      {[0, 1, 2, 3, 4].map((i) => (
        <Doc key={i} index={i} progress={progress} />
      ))}
    </>
  );
}
