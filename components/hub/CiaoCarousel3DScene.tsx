"use client";

import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox, Text, useGLTF } from "@react-three/drei";
import * as THREE from "three";

export interface ProjectCarouselData {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  tagline: string;
  accentColor: string;
  destination: string;
  isInternal: boolean;
}

export const CAROUSEL_PROJECTS: ProjectCarouselData[] = [
  {
    id: "vortex-gym",
    title: "VORTEX ATHLETIC CLUB",
    subtitle: "24/7 FITNESS PLATFORM",
    tag: "LIVE TEMPLATE — FULL WEB APP",
    tagline: "24/7 fitness platform — BMI calculator, class scheduling, trainer booking",
    accentColor: "#ef4444",
    destination: "/gym",
    isInternal: true,
  },
  {
    id: "aasifaa",
    title: "AASIFAA STUDIO",
    subtitle: "MODERN WEB APPLICATION",
    tag: "VERCEL DEPLOYED — EXTERNAL PLATFORM",
    tagline: "Fast, animated, built for engagement",
    accentColor: "#06b6d4",
    destination: "https://aasifaa.vercel.app",
    isInternal: false,
  },
  {
    id: "majarrah",
    title: "MAJARRAH PLATFORM",
    subtitle: "DIGITAL DESIGN SYSTEM",
    tag: "VERCEL DEPLOYED — EXTERNAL PLATFORM",
    tagline: "Custom UI components, responsive, production-grade",
    accentColor: "#a855f7",
    destination: "https://majarrah.vercel.app",
    isInternal: false,
  },
];

const FONT_BODONI = "/fonts/BodoniModa.ttf";
const FONT_MANROPE = "/fonts/Manrope.ttf";

interface CiaoCarouselSceneProps {
  activeIndex: number;
  setActiveIndex: (idx: number) => void;
  isSwiping: boolean;
  onNavigate: (index: number) => void;
  mousePos: { x: number; y: number };
}

// Vertical Portrait Keycard Mesh (No black artifacts, double-sided materials, sleek chip & strip)
const VerticalKeycardMesh3D: React.FC<{
  project: ProjectCarouselData;
  index: number;
  activeIndex: number;
  isSwiping: boolean;
  onSelect: () => void;
  onEnter: () => void;
}> = ({ project, index, activeIndex, isSwiping, onSelect, onEnter }) => {
  const groupRef = useRef<THREE.Group>(null);
  const matRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const [hovered, setHovered] = useState(false);

  const isCenter = index === activeIndex;
  const themeColor = useMemo(() => new THREE.Color(project.accentColor), [project.accentColor]);

  // Target 3D positions in shallow arc
  const targetX = (index - activeIndex) * 3.2;
  const targetY = isCenter ? 0.35 : 0.15;
  const targetZ = isCenter ? 0.4 : -0.7;
  const targetScale = isCenter ? (isSwiping ? 2.4 : 1.12) : 0.82;
  const targetRotY = (index - activeIndex) * -0.22;

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Fast scale + flash enter transition (~0.3s)
    if (isCenter && isSwiping) {
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, 0, delta * 15);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, 0.35, delta * 15);
      groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, 2.5, delta * 15);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, 0, delta * 15);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, 0, delta * 15);

      if (matRef.current) {
        matRef.current.emissiveIntensity = THREE.MathUtils.lerp(matRef.current.emissiveIntensity, 2.2, delta * 15);
      }
      return;
    }

    // Lerp carousel transitions
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, delta * 9);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, delta * 9);
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, delta * 9);
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 9);

    const idleRot = isCenter ? Math.sin(state.clock.elapsedTime * 1.5) * 0.06 : 0;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotY + idleRot,
      delta * 8
    );

    if (matRef.current) {
      const targetEmissive = isCenter ? 0.45 : hovered ? 0.25 : 0.06;
      matRef.current.emissiveIntensity = THREE.MathUtils.lerp(
        matRef.current.emissiveIntensity,
        targetEmissive,
        delta * 8
      );
    }
  });

  return (
    <group
      ref={groupRef}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "default";
      }}
      onClick={(e) => {
        e.stopPropagation();
        if (isCenter) {
          onEnter();
        } else {
          onSelect();
        }
      }}
    >
      <Float speed={isCenter ? 2 : 0} rotationIntensity={0.1} floatIntensity={isCenter ? 0.25 : 0}>
        {/* Vertical/Portrait Card Body Mesh (1.7 x 2.7) */}
        <RoundedBox args={[1.7, 2.7, 0.08]} radius={0.1} smoothness={4}>
          <meshPhysicalMaterial
            ref={matRef}
            color="#09090b"
            emissive={themeColor}
            emissiveIntensity={isCenter ? 0.45 : 0.06}
            metalness={0.9}
            roughness={0.15}
            clearcoat={1.0}
            clearcoatRoughness={0.08}
            reflectivity={0.9}
            iridescence={0.95}
            iridescenceIOR={1.3}
            side={THREE.DoubleSide}
          />
        </RoundedBox>

        {/* Security Metallic Gold Chip (DoubleSide material, no black quads) */}
        <mesh position={[-0.45, 0.85, 0.05]}>
          <planeGeometry args={[0.38, 0.3]} />
          <meshStandardMaterial
            color="#f59e0b"
            emissive="#d97706"
            emissiveIntensity={0.4}
            metalness={0.95}
            roughness={0.1}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Studio Emblem Monogram Text on Card */}
        <Text
          font={FONT_MANROPE}
          position={[0.45, 0.85, 0.05]}
          fontSize={0.14}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
        >
          HS
        </Text>

        {/* Holographic Vertical Security Strip (DoubleSide material) */}
        <mesh position={[0, -0.15, 0.05]}>
          <planeGeometry args={[1.5, 1.4]} />
          <meshStandardMaterial
            color={project.accentColor}
            emissive={project.accentColor}
            emissiveIntensity={isCenter ? 0.85 : 0.2}
            metalness={0.95}
            roughness={0.05}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Card Title Label Text */}
        <Text
          font={FONT_BODONI}
          position={[0, -1.0, 0.05]}
          fontSize={0.11}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.05}
        >
          {project.title}
        </Text>

        {/* Inner Border Glow Line */}
        <lineSegments position={[0, 0, 0.045]}>
          <edgesGeometry args={[new THREE.PlaneGeometry(1.6, 2.6)]} />
          <lineBasicMaterial color={project.accentColor} linewidth={2} />
        </lineSegments>
      </Float>
    </group>
  );
};

// Corner Viewfinder Bracket Mesh
const CornerBrackets3D: React.FC = () => {
  return (
    <group position={[0, 0, 0]}>
      {/* Top Left */}
      <lineSegments position={[-4.5, 3.0, 0]}>
        <bufferGeometry
          attach="geometry"
          onUpdate={(geom) => {
            geom.setFromPoints([
              new THREE.Vector3(0, -0.4, 0),
              new THREE.Vector3(0, 0, 0),
              new THREE.Vector3(0.4, 0, 0),
            ]);
          }}
        />
        <lineBasicMaterial color="#ffffff" opacity={0.4} transparent linewidth={2} />
      </lineSegments>

      {/* Top Right */}
      <lineSegments position={[4.5, 3.0, 0]}>
        <bufferGeometry
          attach="geometry"
          onUpdate={(geom) => {
            geom.setFromPoints([
              new THREE.Vector3(-0.4, 0, 0),
              new THREE.Vector3(0, 0, 0),
              new THREE.Vector3(0, -0.4, 0),
            ]);
          }}
        />
        <lineBasicMaterial color="#ffffff" opacity={0.4} transparent linewidth={2} />
      </lineSegments>

      {/* Bottom Left */}
      <lineSegments position={[-4.5, -3.0, 0]}>
        <bufferGeometry
          attach="geometry"
          onUpdate={(geom) => {
            geom.setFromPoints([
              new THREE.Vector3(0, 0.4, 0),
              new THREE.Vector3(0, 0, 0),
              new THREE.Vector3(0.4, 0, 0),
            ]);
          }}
        />
        <lineBasicMaterial color="#ffffff" opacity={0.4} transparent linewidth={2} />
      </lineSegments>

      {/* Bottom Right */}
      <lineSegments position={[4.5, -3.0, 0]}>
        <bufferGeometry
          attach="geometry"
          onUpdate={(geom) => {
            geom.setFromPoints([
              new THREE.Vector3(-0.4, 0, 0),
              new THREE.Vector3(0, 0, 0),
              new THREE.Vector3(0, 0.4, 0),
            ]);
          }}
        />
        <lineBasicMaterial color="#ffffff" opacity={0.4} transparent linewidth={2} />
      </lineSegments>
    </group>
  );
};

// Main 3D Scene Content
const CiaoCarouselSceneContent: React.FC<CiaoCarouselSceneProps> = ({
  activeIndex,
  setActiveIndex,
  isSwiping,
  onNavigate,
}) => {
  const activeProject = CAROUSEL_PROJECTS[activeIndex];

  const handlePrev = () => {
    setActiveIndex((activeIndex - 1 + CAROUSEL_PROJECTS.length) % CAROUSEL_PROJECTS.length);
  };

  const handleNext = () => {
    setActiveIndex((activeIndex + 1) % CAROUSEL_PROJECTS.length);
  };

  return (
    <>
      <ambientLight intensity={0.55} />
      <pointLight position={[0, 4, 6]} intensity={1.8} color="#ffffff" />
      <pointLight position={[0, -2, 4]} intensity={1.2} color={activeProject.accentColor} />

      {/* Corner Viewfinder Brackets */}
      <CornerBrackets3D />

      {/* TOP BAR IN 3D SCENE */}
      <group position={[0, 2.8, 0]}>
        {/* Left Status Readout (Manrope font) */}
        <Text
          font={FONT_MANROPE}
          position={[-3.8, 0, 0]}
          fontSize={0.095}
          color="#a1a1aa"
          anchorX="left"
          anchorY="middle"
          letterSpacing={0.1}
        >
          • HATAB STUDIOS — LIVE
        </Text>

        {/* Center Logo Wordmark (Bodoni Moda Luxury Display Font) */}
        <group position={[0, 0, 0]}>
          <Text
            font={FONT_BODONI}
            fontSize={0.22}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            letterSpacing={0.12}
          >
            HATAB STUDIOS HUB
          </Text>
        </group>

        {/* Right Contact Plaque Button (Manrope font) */}
        <group
          position={[3.8, 0, 0]}
          onPointerOver={(e) => {
            e.stopPropagation();
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            document.body.style.cursor = "default";
          }}
          onClick={() => {
            window.location.href = "mailto:ismailhatab88@gmail.com";
          }}
        >
          <Text
            font={FONT_MANROPE}
            fontSize={0.095}
            color={activeProject.accentColor}
            anchorX="right"
            anchorY="middle"
            letterSpacing={0.08}
          >
            [ CONTACT / CAIRO 🇪🇬 ]
          </Text>
        </group>
      </group>

      {/* MAIN CAROUSEL STAGE — 3 VERTICAL KEYCARDS */}
      {CAROUSEL_PROJECTS.map((project, idx) => (
        <VerticalKeycardMesh3D
          key={project.id}
          project={project}
          index={idx}
          activeIndex={activeIndex}
          isSwiping={isSwiping}
          onSelect={() => setActiveIndex(idx)}
          onEnter={() => onNavigate(activeIndex)}
        />
      ))}

      {/* MINIMAL GLOWING 3D DOT-CLUSTER NAV CONTROLS (No rectangular buttons!) */}
      {/* Left Dot Cluster */}
      <group
        position={[-1.7, 0.35, 0.5]}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "default";
        }}
        onClick={(e) => {
          e.stopPropagation();
          handlePrev();
        }}
      >
        <mesh position={[-0.08, 0, 0]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial
            color={activeProject.accentColor}
            emissive={activeProject.accentColor}
            emissiveIntensity={0.9}
          />
        </mesh>
        <mesh position={[0.08, 0, 0]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial color="#a1a1aa" />
        </mesh>
      </group>

      {/* Right Dot Cluster */}
      <group
        position={[1.7, 0.35, 0.5]}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "default";
        }}
        onClick={(e) => {
          e.stopPropagation();
          handleNext();
        }}
      >
        <mesh position={[-0.08, 0, 0]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial color="#a1a1aa" />
        </mesh>
        <mesh position={[0.08, 0, 0]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial
            color={activeProject.accentColor}
            emissive={activeProject.accentColor}
            emissiveIntensity={0.9}
          />
        </mesh>
      </group>

      {/* BELOW CENTER CARD — PROJECT TITLE (Bodoni Moda) & TAGLINE (Manrope) */}
      <group position={[0, -1.45, 0.4]}>
        {/* Large Bold Project Name Text in Bodoni Moda */}
        <Text
          font={FONT_BODONI}
          position={[0, 0.1, 0.06]}
          fontSize={0.28}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.05}
        >
          {activeProject.title}
        </Text>

        {/* Project Tagline Subtext in Manrope */}
        <Text
          font={FONT_MANROPE}
          position={[0, -0.22, 0.06]}
          fontSize={0.095}
          color={activeProject.accentColor}
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.06}
        >
          {activeProject.tagline}
        </Text>

        {/* Action Prompt */}
        <group
          position={[0, -0.5, 0.06]}
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
          <Text
            font={FONT_MANROPE}
            fontSize={0.09}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            letterSpacing={0.1}
          >
            [ CLICK CENTER CARD TO ENTER ]
          </Text>
        </group>
      </group>

      {/* BOTTOM SCRUBBER TRACK IN 3D SCENE */}
      <group position={[0, -2.4, 0.2]}>
        {/* Scrubber Track Line */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[4.2, 0.04, 0.02]} />
          <meshBasicMaterial color="#27272a" />
        </mesh>

        {/* 3 Step Stop Markers */}
        {CAROUSEL_PROJECTS.map((proj, idx) => {
          const stepX = (idx - 1) * 1.8;
          return (
            <mesh
              key={proj.id}
              position={[stepX, 0, 0.02]}
              onPointerOver={(e) => {
                e.stopPropagation();
                document.body.style.cursor = "pointer";
              }}
              onPointerOut={() => {
                document.body.style.cursor = "default";
              }}
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex(idx);
              }}
            >
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshBasicMaterial color={activeIndex === idx ? proj.accentColor : "#52525b"} />
            </mesh>
          );
        })}

        {/* Active Scrubber Handle Disc */}
        <mesh position={[(activeIndex - 1) * 1.8, 0, 0.04]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.16, 0.16, 0.05, 32]} />
          <meshStandardMaterial
            color={activeProject.accentColor}
            emissive={activeProject.accentColor}
            emissiveIntensity={0.8}
          />
        </mesh>
      </group>

      {/* Reflective Floor Plane */}
      <gridHelper args={[24, 24, activeProject.accentColor, "#18181b"]} position={[0, -3.2, -2]} />
    </>
  );
};

export const CiaoCarousel3DScene: React.FC<CiaoCarouselSceneProps> = (props) => {
  return (
    <div className="w-full h-screen fixed inset-0 bg-zinc-950">
      <Canvas
        camera={{ position: [0, 0, 5.0], fov: 46 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false }}
        className="w-full h-full"
      >
        <CiaoCarouselSceneContent {...props} />
      </Canvas>
    </div>
  );
};
