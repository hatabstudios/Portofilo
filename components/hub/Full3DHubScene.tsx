"use client";

import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox, Text } from "@react-three/drei";
import * as THREE from "three";

export interface ProjectPanelData {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  tagline: string;
  accentColor: string;
  destination: string;
  isInternal: boolean;
}

export const PANELS: ProjectPanelData[] = [
  {
    id: "vortex-gym",
    title: "VORTEX ATHLETIC CLUB",
    subtitle: "FULL WEB APP",
    tag: "LIVE TEMPLATE",
    tagline: "24/7 fitness platform — BMI calculator, scheduling, booking",
    accentColor: "#ef4444",
    destination: "/gym",
    isInternal: true,
  },
  {
    id: "aasifaa",
    title: "AASIFAA STUDIO",
    subtitle: "EXTERNAL PLATFORM",
    tag: "VERCEL DEPLOYED",
    tagline: "Fast, animated, built for engagement",
    accentColor: "#06b6d4",
    destination: "https://aasifaa.vercel.app",
    isInternal: false,
  },
  {
    id: "majarrah",
    title: "MAJARRAH PLATFORM",
    subtitle: "EXTERNAL PLATFORM",
    tag: "VERCEL DEPLOYED",
    tagline: "Custom UI components, responsive, production-grade",
    accentColor: "#a855f7",
    destination: "https://majarrah.vercel.app",
    isInternal: false,
  },
];

interface Full3DSceneContentProps {
  activeIndex: number;
  setActiveIndex: (idx: number) => void;
  isSwiping: boolean;
  onNavigate: (index: number) => void;
  mousePos: { x: number; y: number };
}

// 3D Keycard Mesh in Scene
const KeycardMesh3D: React.FC<{
  activeColor: string;
  isSwiping: boolean;
  mousePos: { x: number; y: number };
}> = ({ activeColor, isSwiping, mousePos }) => {
  const groupRef = useRef<THREE.Group>(null);
  const matRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const themeColor = useMemo(() => new THREE.Color(activeColor), [activeColor]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    if (isSwiping) {
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, 4, delta * 12);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, -1.5, delta * 12);
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, -0.8, delta * 12);
      return;
    }

    const rotX = mousePos.y * 0.2;
    const rotY = mousePos.x * 0.3 + state.clock.elapsedTime * 0.2;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, rotX, delta * 4);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, rotY, delta * 3);
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, 0, delta * 5);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, 0.4, delta * 5);

    if (matRef.current) {
      matRef.current.emissive.lerp(themeColor, delta * 4);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.4, 0]}>
      <Float speed={2.5} rotationIntensity={0.15} floatIntensity={0.4}>
        <RoundedBox args={[3.2, 2.0, 0.08]} radius={0.12} smoothness={4}>
          <meshPhysicalMaterial
            ref={matRef}
            color="#09090b"
            emissive={themeColor}
            emissiveIntensity={0.4}
            metalness={0.9}
            roughness={0.12}
            clearcoat={1.0}
            clearcoatRoughness={0.08}
            reflectivity={0.95}
            iridescence={0.95}
            iridescenceIOR={1.3}
          />
        </RoundedBox>

        {/* Security Chip Mesh */}
        <mesh position={[-1.0, 0.35, 0.05]}>
          <planeGeometry args={[0.42, 0.35]} />
          <meshStandardMaterial color="#f59e0b" metalness={0.95} roughness={0.1} />
        </mesh>

        {/* Holographic Security Strip Mesh */}
        <mesh position={[0, -0.6, 0.05]}>
          <planeGeometry args={[3.0, 0.28]} />
          <meshStandardMaterial
            color={activeColor}
            emissive={activeColor}
            emissiveIntensity={0.9}
            metalness={0.95}
            roughness={0.05}
          />
        </mesh>

        {/* Border Glow Wireframe Mesh */}
        <lineSegments position={[0, 0, 0.045]}>
          <edgesGeometry args={[new THREE.PlaneGeometry(3.1, 1.9)]} />
          <lineBasicMaterial color={activeColor} linewidth={2} />
        </lineSegments>
      </Float>
    </group>
  );
};

// Interactive 3D Panel Button Mesh
const ProjectPanel3D: React.FC<{
  panel: ProjectPanelData;
  index: number;
  isActive: boolean;
  onHover: () => void;
  onClick: () => void;
}> = ({ panel, index, isActive, onHover, onClick }) => {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Position 3 panels in a row below the card in 3D space
  const posX = (index - 1) * 2.8;
  const posY = -1.6;
  const posZ = 0;

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const targetY = posY + (hovered || isActive ? 0.25 : 0);
    const targetZ = posZ + (hovered || isActive ? 0.3 : 0);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, delta * 6);
    meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, targetZ, delta * 6);
  });

  return (
    <group
      ref={meshRef}
      position={[posX, posY, posZ]}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
        onHover();
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "default";
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      {/* 3D Panel Base Box Mesh */}
      <RoundedBox args={[2.55, 1.35, 0.12]} radius={0.08} smoothness={4}>
        <meshStandardMaterial
          color={isActive || hovered ? "#18181b" : "#09090b"}
          emissive={panel.accentColor}
          emissiveIntensity={isActive || hovered ? 0.25 : 0.05}
          metalness={0.8}
          roughness={0.2}
        />
      </RoundedBox>

      {/* Top Emissive Light Bar Mesh */}
      <mesh position={[0, 0.6, 0.07]}>
        <boxGeometry args={[2.4, 0.06, 0.02]} />
        <meshBasicMaterial color={panel.accentColor} />
      </mesh>

      {/* 3D Panel Title Text */}
      <Text
        position={[0, 0.25, 0.08]}
        fontSize={0.15}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.05}
        fontWeight="bold"
      >
        {`0${index + 1}. ${panel.title}`}
      </Text>

      {/* 3D Panel Subtitle Tag Text */}
      <Text
        position={[0, 0.02, 0.08]}
        fontSize={0.09}
        color={panel.accentColor}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.08}
      >
        {panel.tag}
      </Text>

      {/* 3D Panel Tagline Text */}
      <Text
        position={[0, -0.25, 0.08]}
        fontSize={0.075}
        color="#a1a1aa"
        anchorX="center"
        anchorY="middle"
        maxWidth={2.3}
        textAlign="center"
      >
        {panel.tagline}
      </Text>

      {/* 3D Action Prompt Text */}
      <Text
        position={[0, -0.48, 0.08]}
        fontSize={0.08}
        color={isActive || hovered ? "#ffffff" : "#71717a"}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.05}
      >
        {isActive || hovered ? "[ CLICK TO ENTER ]" : "[ SELECT SLOT ]"}
      </Text>
    </group>
  );
};

// Scene Content Manager
const Full3DSceneContent: React.FC<Full3DSceneContentProps> = ({
  activeIndex,
  setActiveIndex,
  isSwiping,
  onNavigate,
  mousePos,
}) => {
  const activePanel = PANELS[activeIndex];

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-10, -5, -5]} intensity={1.2} color={activePanel.accentColor} />
      <directionalLight position={[0, 5, 5]} intensity={1.2} />

      {/* 3D Logo Wordmark Mesh (Top Sign Plaque in Scene) */}
      <group position={[0, 2.7, 0]}>
        <Text
          fontSize={0.24}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.15}
          fontWeight="bold"
        >
          HATAB STUDIOS HUB
        </Text>
        <Text
          position={[0, -0.22, 0]}
          fontSize={0.09}
          color="#a1a1aa"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.12}
        >
          CAIRO, EGYPT • DIGITAL WEB PORTFOLIO
        </Text>
      </group>

      {/* 3D Terminal Monospace Headline Mesh */}
      <Text
        position={[0, 1.95, 0]}
        fontSize={0.12}
        color={activePanel.accentColor}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.2}
      >
        // INSERT CARD TO ACCESS PROJECT
      </Text>

      {/* Center 3D Keycard Mesh */}
      <KeycardMesh3D
        activeColor={activePanel.accentColor}
        isSwiping={isSwiping}
        mousePos={mousePos}
      />

      {/* 3D Project Panel Meshes (Scene Buttons) */}
      {PANELS.map((panel, idx) => (
        <ProjectPanel3D
          key={panel.id}
          panel={panel}
          index={idx}
          isActive={activeIndex === idx}
          onHover={() => setActiveIndex(idx)}
          onClick={() => onNavigate(idx)}
        />
      ))}

      {/* 3D Direct Swipe Button Mesh */}
      <group
        position={[0, -2.5, 0]}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "default";
        }}
        onClick={(e) => {
          e.stopPropagation();
          onNavigate(activeIndex);
        }}
      >
        <RoundedBox args={[3.2, 0.45, 0.08]} radius={0.08} smoothness={4}>
          <meshStandardMaterial
            color="#18181b"
            emissive={activePanel.accentColor}
            emissiveIntensity={0.5}
            metalness={0.9}
            roughness={0.1}
          />
        </RoundedBox>
        <Text
          position={[0, 0, 0.05]}
          fontSize={0.11}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.1}
          fontWeight="bold"
        >
          {`SWIPE CARD TO ENTER ${activePanel.title} ➔`}
        </Text>
      </group>

      {/* 3D Footer Contact Plaque Mesh */}
      <Text
        position={[0, -3.1, 0]}
        fontSize={0.075}
        color="#71717a"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.08}
      >
        HATAB STUDIOS • GIZA / CAIRO, EGYPT • ISMAILHATAB88@GMAIL.COM • 010X XXX XXXX
      </Text>

      {/* Perspective Grid Floor Plane Mesh */}
      <gridHelper args={[30, 30, activePanel.accentColor, "#27272a"]} position={[0, -3.5, -2]} />
    </>
  );
};

export const Full3DHubScene: React.FC<Full3DSceneContentProps> = (props) => {
  return (
    <div className="w-full h-screen fixed inset-0 bg-zinc-950">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 48 }}
        gl={{ antialias: true, alpha: false }}
        className="w-full h-full"
      >
        <Full3DSceneContent {...props} />
      </Canvas>
    </div>
  );
};
