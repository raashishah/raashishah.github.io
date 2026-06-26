"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { palette } from "@/lib/palette";

type PlutoSceneProps = {
  progress: number;
};

function Tile({
  index,
  progress,
  startPos,
}: {
  index: number;
  progress: number;
  startPos: [number, number, number];
}) {
  const ref = useRef<THREE.Mesh>(null);
  const gridX = (index % 3) * 0.55 - 0.55;
  const gridY = -Math.floor(index / 3) * 0.55 + 0.55;
  const delay = index * 0.06;
  const t = Math.min(1, Math.max(0, (progress - delay) / 0.5));

  useFrame(() => {
    if (!ref.current) return;
    ref.current.position.x = THREE.MathUtils.lerp(startPos[0], gridX, t);
    ref.current.position.y = THREE.MathUtils.lerp(startPos[1], gridY, t);
    ref.current.rotation.z = THREE.MathUtils.lerp(startPos[2] * 0.3, 0, t);
  });

  const colors = [palette.ink, palette.rose, palette.greyBlue, palette.navy];
  const color = colors[index % colors.length];

  return (
    <mesh ref={ref} position={startPos}>
      <planeGeometry args={[0.45, 0.45]} />
      <meshBasicMaterial color={color} transparent opacity={0.9} />
    </mesh>
  );
}

export function PlutoScene({ progress }: PlutoSceneProps) {
  const starts: [number, number, number][] = [
    [-1.8, 1.2, 0.5],
    [1.5, 0.9, -0.3],
    [-0.5, -1.1, 0.8],
    [1.8, -0.6, -0.5],
    [-1.2, -0.4, 0.2],
    [0.3, 1.4, -0.7],
  ];

  return (
    <>
      <ambientLight intensity={0.7} />
      <mesh position={[0, 0, -0.1]}>
        <planeGeometry args={[2.2, 1.6]} />
        <meshBasicMaterial color={palette.ink} transparent opacity={0.08} />
      </mesh>
      {starts.map((pos, i) => (
        <Tile key={i} index={i} progress={progress} startPos={pos} />
      ))}
    </>
  );
}
