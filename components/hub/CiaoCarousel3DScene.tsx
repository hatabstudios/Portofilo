"use client";

import React, { useRef, useState, useMemo, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Text, RoundedBox, useTexture } from "@react-three/drei";
import * as THREE from "three";

export interface ProjectCarouselData {
  id: string;
  title: string;
  accentColor: string;
  destination: string;
  isInternal: boolean;
}

export const CAROUSEL_PROJECTS: ProjectCarouselData[] = [
  {
    id: "vortex-gym",
    title: "VORTEX ATHLETIC CLUB",
    accentColor: "#ef4444",
    destination: "/gym",
    isInternal: true,
  },
  {
    id: "aasifaa",
    title: "AASIFAA STUDIO",
    accentColor: "#06b6d4",
    destination: "https://aasifaa.vercel.app",
    isInternal: false,
  },
  {
    id: "majarrah",
    title: "MAJARRAH PLATFORM",
    accentColor: "#a855f7",
    destination: "https://majarrah.vercel.app",
    isInternal: false,
  },
];

interface CiaoCarouselSceneProps {
  activeIndex: number;
  setActiveIndex: (idx: number | ((prev: number) => number)) => void;
  onNavigate: (index: number) => void;
}

// 3D Keycard Model with PBR Textures
const AuthenticatedKeycard3D: React.FC<{
  project: ProjectCarouselData;
  index: number;
  activeIndex: number;
  onSelect: () => void;
  mousePos: { x: number; y: number };
}> = ({ project, index, activeIndex, onSelect, mousePos }) => {
  const groupRef = useRef<THREE.Group>(null);
  const matRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const isCenter = index === activeIndex;

  // Load PBR Textures
  const [baseMap, normalMap, roughnessMap, metallicMap, aoMap] = useTexture([
    "/textures/keycard/Authentication_Card_Authentication_Card_Ba.png",
    "/textures/keycard/Authentication_Card_Authentication_Card_No.png",
    "/textures/keycard/Authentication_Card_Authentication_Card_Ro.png",
    "/textures/keycard/Authentication_Card_Authentication_Card_Me.png",
    "/textures/keycard/Authentication_Card_Authentication_Card_Am.png",
  ]);

  // Target coordinates in 3D shallow arc
  const targetX = (index - activeIndex) * 3.4;
  const targetY = isCenter ? 0.35 : 0.1;
  const targetZ = isCenter ? 0.1 : -0.9;
  const targetScale = isCenter ? 1.35 : 0.88;
  const targetRotY = (index - activeIndex) * -0.28;

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Carousel lerp position
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, delta * 8);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, delta * 8);
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, delta * 8);
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 8);

    // Ultra-slow, laggy mouse cursor tracking on center card (doesn't snap!)
    const mouseTargetX = isCenter ? mousePos.x * 0.3 : 0;
    const mouseTargetY = isCenter ? -mousePos.y * 0.2 : 0;

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotY + mouseTargetX,
      delta * 1.5
    );

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      mouseTargetY,
      delta * 1.5
    );

    if (matRef.current) {
      matRef.current.emissiveIntensity = THREE.MathUtils.lerp(
        matRef.current.emissiveIntensity,
        isCenter ? 0.45 : 0.05,
        delta * 6
      );
    }
  });

  return (
    <group
      ref={groupRef}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        document.body.style.cursor = "default";
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
    >
      <Float speed={isCenter ? 1.5 : 0} rotationIntensity={0.05} floatIntensity={isCenter ? 0.15 : 0}>
        {/* Sleek Vertical Keycard Body */}
        <RoundedBox args={[1.7, 2.7, 0.08]} radius={0.1} smoothness={4}>
          <meshPhysicalMaterial
            ref={matRef}
            map={baseMap}
            normalMap={normalMap}
            roughnessMap={roughnessMap}
            metalnessMap={metallicMap}
            aoMap={aoMap}
            color="#09090b"
            emissive={project.accentColor}
            emissiveIntensity={isCenter ? 0.45 : 0.05}
            metalness={0.9}
            roughness={0.15}
            clearcoat={1.0}
            clearcoatRoughness={0.08}
            reflectivity={0.9}
            side={THREE.DoubleSide}
          />
        </RoundedBox>

        {/* Security Metallic Chip */}
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

        {/* Monogram Emblem */}
        <Text
          position={[0.45, 0.85, 0.05]}
          fontSize={0.14}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
        >
          HS
        </Text>

        {/* Holographic Security Strip */}
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

        {/* Card Title Label */}
        <Text
          position={[0, -1.0, 0.05]}
          fontSize={0.11}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.05}
        >
          {project.title}
        </Text>

        {/* Inner Border Glow */}
        <lineSegments position={[0, 0, 0.045]}>
          <edgesGeometry args={[new THREE.PlaneGeometry(1.6, 2.6)]} />
          <lineBasicMaterial color={project.accentColor} linewidth={2} />
        </lineSegments>
      </Float>
    </group>
  );
};

// Overhead Light Ring Fixture Mesh (Ciao Energy Style)
const TopLightRingFixture: React.FC = () => {
  return (
    <group position={[0, 3.2, -0.5]}>
      {/* Outer Fixture Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.6, 1.6, 0.25, 32]} />
        <meshStandardMaterial color="#111113" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Emissive Inner Glow Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.13, 0]}>
        <ringGeometry args={[1.2, 1.5, 32]} />
        <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

// Corner Brackets Mesh
const CornerBrackets3D: React.FC = () => {
  return (
    <group position={[0, 0, 0]}>
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
    </group>
  );
};

// Main 3D Scene Content
const CiaoCarouselSceneContent: React.FC<CiaoCarouselSceneProps> = ({
  activeIndex,
  setActiveIndex,
  onNavigate,
}) => {
  const activeProject = CAROUSEL_PROJECTS[activeIndex];
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + CAROUSEL_PROJECTS.length) % CAROUSEL_PROJECTS.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % CAROUSEL_PROJECTS.length);
  };

  // Keyboard Arrow Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        handlePrev();
      } else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      {/* Ciao Energy Dark Studio Spotlight Background */}
      <color attach="background" args={["#030305"]} />

      {/* Spotlight Lighting */}
      <ambientLight intensity={0.6} />
      <spotLight
        position={[0, 8, 4]}
        angle={0.6}
        penumbra={0.9}
        intensity={3.5}
        color="#ffffff"
      />
      <pointLight position={[0, -2, 4]} intensity={2.0} color={activeProject.accentColor} />

      {/* Overhead Ring Fixture */}
      <TopLightRingFixture />

      {/* Viewfinder Brackets */}
      <CornerBrackets3D />

      {/* TOP BAR (In Ciao Energy Style) */}
      <group position={[0, 2.8, 0]}>
        {/* Left Audio Status Readout */}
        <Text
          position={[-3.8, 0, 0]}
          fontSize={0.1}
          color="#a1a1aa"
          anchorX="left"
          anchorY="middle"
          letterSpacing={0.12}
        >
          ON 🔊 • HATAB STUDIOS
        </Text>

        {/* Center Logo Wordmark */}
        <Text
          position={[0, 0, 0]}
          fontSize={0.22}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.15}
          fontWeight="bold"
        >
          HATAB STUDIOS
        </Text>

        {/* Right Contact Button */}
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
            fontSize={0.1}
            color={activeProject.accentColor}
            anchorX="right"
            anchorY="middle"
            letterSpacing={0.1}
          >
            [ CONTACT ]
          </Text>
        </group>
      </group>

      {/* MAIN CAROUSEL STAGE — 3 PBR KEYCARDS */}
      {CAROUSEL_PROJECTS.map((project, idx) => (
        <AuthenticatedKeycard3D
          key={project.id}
          project={project}
          index={idx}
          activeIndex={activeIndex}
          onSelect={() => setActiveIndex(idx)}
          mousePos={mousePos}
        />
      ))}

      {/* CHEVRON ARROWS FLANKING CENTER CARD */}
      {/* Left Arrow Chevron */}
      <group
        position={[-2.3, 0.35, 0.6]}
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
        <Text fontSize={0.25} color="#ffffff" anchorX="center" anchorY="middle">
          ‹
        </Text>
      </group>

      {/* Right Arrow Chevron */}
      <group
        position={[2.3, 0.35, 0.6]}
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
        <Text fontSize={0.25} color="#ffffff" anchorX="center" anchorY="middle">
          ›
        </Text>
      </group>

      {/* BOTTOM PEDESTAL & PROJECT TITLE (POSITIONED IN FRONT AT Z: 1.0 TO PREVENT CLIPPING!) */}
      <group position={[0, -1.8, 1.0]}>
        {/* Pedestal Cap Mesh */}
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.4, -0.4]}>
          <cylinderGeometry args={[1.5, 1.5, 0.2, 32]} />
          <meshStandardMaterial color="#111113" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Project Name Text (Bold, Front Layer Z: 1.0) */}
        <Text
          position={[0, 0.15, 0.1]}
          fontSize={0.32}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.08}
          fontWeight="bold"
        >
          {activeProject.title}
        </Text>

        {/* Dedicated Enter Site Button */}
        <group
          position={[0, -0.35, 0.1]}
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
          <mesh position={[0, 0, 0]}>
            <planeGeometry args={[2.8, 0.34]} />
            <meshStandardMaterial color="#18181b" roughness={0.2} metalness={0.8} />
          </mesh>
          <Text
            position={[0, 0, 0.01]}
            fontSize={0.11}
            color={activeProject.accentColor}
            anchorX="center"
            anchorY="middle"
            letterSpacing={0.1}
            fontWeight="bold"
          >
            [ CLICK TO ENTER SITE ➔ ]
          </Text>
        </group>
      </group>

      {/* BOTTOM SCRUBBER TRACK (Monochromatic, NO RGB Line!) */}
      <group position={[0, -2.7, 0.5]}>
        {/* Scrubber Line */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[4.2, 0.03, 0.01]} />
          <meshBasicMaterial color="#27272a" />
        </mesh>

        {/* 3 Step Markers */}
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

        {/* Handle Marker */}
        <mesh position={[(activeIndex - 1) * 1.8, 0, 0.04]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.14, 0.14, 0.04, 32]} />
          <meshStandardMaterial color={activeProject.accentColor} emissive={activeProject.accentColor} emissiveIntensity={0.9} />
        </mesh>
      </group>
    </>
  );
};

export const CiaoCarousel3DScene: React.FC<CiaoCarouselSceneProps> = (props) => {
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  // Swipe / Drag controls
  const handlePointerDown = (e: React.PointerEvent) => {
    setTouchStartX(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (touchStartX === null) return;
    const diffX = e.clientX - touchStartX;
    if (Math.abs(diffX) > 40) {
      if (diffX < 0) {
        props.setActiveIndex((prev) => (prev + 1) % CAROUSEL_PROJECTS.length);
      } else {
        props.setActiveIndex((prev) => (prev - 1 + CAROUSEL_PROJECTS.length) % CAROUSEL_PROJECTS.length);
      }
    }
    setTouchStartX(null);
  };

  return (
    <div
      className="w-full h-screen fixed inset-0 bg-zinc-950 select-none"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      <Canvas
        camera={{ position: [0, 0, 5.0], fov: 46 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false }}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          <CiaoCarouselSceneContent {...props} />
        </Suspense>
      </Canvas>
    </div>
  );
};
