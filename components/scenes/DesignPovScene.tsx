"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type DesignPovSceneProps = {
  progress: number;
};

export function DesignPovScene({ progress }: DesignPovSceneProps) {
  const deviceRef = useRef<THREE.Mesh>(null);
  const offline = progress > 0.4;

  useFrame(() => {
    if (!deviceRef.current) return;
    deviceRef.current.rotation.y = Math.sin(progress * Math.PI) * 0.2;
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[2, 3, 4]} intensity={0.8} />
      <mesh ref={deviceRef}>
        <boxGeometry args={[2.2, 1.4, 0.08]} />
        <meshStandardMaterial color="#111111" />
      </mesh>
      <mesh position={[0, 0, 0.05]}>
        <planeGeometry args={[2, 1.2]} />
        <meshBasicMaterial color={offline ? "#ffffff" : "#333333"} />
      </mesh>
      {offline && (
        <mesh position={[0, 0, 0.06]}>
          <planeGeometry args={[0.6, 0.15]} />
          <meshBasicMaterial color="#e02020" />
        </mesh>
      )}
    </>
  );
}
