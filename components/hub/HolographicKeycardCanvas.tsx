"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

interface HolographicKeycardCanvasProps {
  activeSlotIndex: number;
  activeColor: string;
  isSwiping: boolean;
  mousePos: { x: number; y: number };
}

// 3D Keycard Mesh Component
const KeycardMesh: React.FC<{
  activeColor: string;
  isSwiping: boolean;
  mousePos: { x: number; y: number };
  activeSlotIndex: number;
}> = ({ activeColor, isSwiping, mousePos, activeSlotIndex }) => {
  const meshRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  // Convert hex color to THREE.Color
  const themeColor = useMemo(() => new THREE.Color(activeColor), [activeColor]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Swipe animation handling
    if (isSwiping) {
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, 3.5, delta * 12);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, -1.2, delta * 12);
      meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, -0.6, delta * 12);
      return;
    }

    // Mouse tilt calculation (max ~12 deg)
    const targetRotX = mousePos.y * 0.25;
    const targetRotY = mousePos.x * 0.35 + state.clock.elapsedTime * 0.15; // Slow continuous Y rotation

    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotX, delta * 4);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotY, delta * 3);
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, 0, delta * 5);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, 0, delta * 5);

    // Dynamic material color interpolation
    if (materialRef.current) {
      materialRef.current.emissive.lerp(themeColor, delta * 4);
    }
  });

  return (
    <group ref={meshRef}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        {/* Main Keycard Body */}
        <RoundedBox args={[3.4, 2.15, 0.08]} radius={0.12} smoothness={4}>
          <meshPhysicalMaterial
            ref={materialRef}
            color="#09090b"
            emissive={themeColor}
            emissiveIntensity={0.35}
            metalness={0.85}
            roughness={0.15}
            clearcoat={1.0}
            clearcoatRoughness={0.1}
            reflectivity={0.9}
            iridescence={0.9}
            iridescenceIOR={1.3}
          />
        </RoundedBox>

        {/* Security Metallic Chip */}
        <mesh position={[-1.1, 0.35, 0.05]}>
          <planeGeometry args={[0.45, 0.38]} />
          <meshStandardMaterial color="#f59e0b" metalness={0.95} roughness={0.1} />
        </mesh>

        {/* Holographic Security Strip */}
        <mesh position={[0, -0.65, 0.05]}>
          <planeGeometry args={[3.2, 0.3]} />
          <meshStandardMaterial
            color={activeColor}
            emissive={activeColor}
            emissiveIntensity={0.8}
            metalness={0.9}
            roughness={0.05}
          />
        </mesh>

        {/* Inner Border Glow Lines */}
        <lineSegments position={[0, 0, 0.045]}>
          <edgesGeometry args={[new THREE.PlaneGeometry(3.25, 2.0)]} />
          <lineBasicMaterial color={activeColor} linewidth={2} />
        </lineSegments>
      </Float>
    </group>
  );
};

export const HolographicKeycardCanvas: React.FC<HolographicKeycardCanvasProps> = ({
  activeSlotIndex,
  activeColor,
  isSwiping,
  mousePos,
}) => {
  return (
    <div className="w-full h-[400px] sm:h-[480px] relative">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={1.0} color={activeColor} />
        <directionalLight position={[0, 5, 5]} intensity={1.2} />

        <KeycardMesh
          activeSlotIndex={activeSlotIndex}
          activeColor={activeColor}
          isSwiping={isSwiping}
          mousePos={mousePos}
        />
      </Canvas>
    </div>
  );
};
