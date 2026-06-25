"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type AulaSceneProps = {
  progress: number;
};

function Node({ position, progress, delay }: { position: [number, number, number]; progress: number; delay: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const scale = Math.min(1, Math.max(0, (progress - delay) * 2));

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.scale.setScalar(scale * (1 + Math.sin(clock.elapsedTime + delay * 10) * 0.05));
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.15, 16, 16]} />
      <meshStandardMaterial color={delay > 0.3 ? "#7bdcb5" : "#9b59b6"} />
    </mesh>
  );
}

export function AulaScene({ progress }: AulaSceneProps) {
  const positions: [number, number, number][] = [
    [-1.5, 0.5, 0],
    [0, 0.8, 0],
    [1.5, 0.3, 0],
    [-0.8, -0.6, 0],
    [0.9, -0.5, 0],
    [0, 0, 0],
  ];

  return (
    <>
      <ambientLight intensity={0.6} />
      {positions.map((pos, i) => (
        <Node key={i} position={pos} progress={progress} delay={i * 0.08} />
      ))}
      {progress > 0.3 &&
        positions.slice(0, -1).map((pos, i) => (
          <line key={`line-${i}`}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[new Float32Array([...pos, ...positions[i + 1]]), 3]}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#7bdcb5" transparent opacity={0.4} />
          </line>
        ))}
    </>
  );
}
