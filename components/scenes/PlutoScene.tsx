"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type PlutoSceneProps = {
  progress: number;
};

export function PlutoScene({ progress }: PlutoSceneProps) {
  const blobRef = useRef<THREE.Mesh>(null);
  const geoRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = progress;
    if (blobRef.current) {
      blobRef.current.scale.setScalar(1 - t * 0.3);
      blobRef.current.rotation.z = clock.elapsedTime * 0.2;
    }
    if (geoRef.current) {
      geoRef.current.scale.setScalar(t);
      geoRef.current.rotation.y = clock.elapsedTime * 0.3;
    }
  });

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 2, 4]} intensity={0.9} />
      <mesh ref={blobRef} position={[-0.8, 0, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#d4a574" roughness={0.8} />
      </mesh>
      <mesh ref={geoRef} position={[0.8, 0, 0]}>
        <boxGeometry args={[1.2, 1.2, 1.2]} />
        <meshStandardMaterial color="#c9956a" wireframe />
      </mesh>
    </>
  );
}
