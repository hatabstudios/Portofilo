"use client";

import React, { useRef, useState, useMemo, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text, useGLTF, Stars } from "@react-three/drei";
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

// Preload the Keycard GLTF Model from public/models/keycard/Keycard.gltf
useGLTF.preload("/models/keycard/Keycard.gltf");

interface CiaoCarouselSceneProps {
  activeIndex: number;
  setActiveIndex: (idx: number | ((prev: number) => number)) => void;
  onNavigate: (index: number) => void;
}

// 3D GLTF Keycard Model Instance
const GLTFKeycardModelInstance: React.FC<{
  project: ProjectCarouselData;
  index: number;
  activeIndex: number;
  onSelect: () => void;
}> = ({ project, index, activeIndex, onSelect }) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Load GLTF Model from Assets / public/models/keycard
  const { scene } = useGLTF("/models/keycard/Keycard.gltf");

  // Clone scene for unique project accent emissive material
  const clonedScene = useMemo(() => {
    const cloned = scene.clone(true);
    const themeColor = new THREE.Color(project.accentColor);

    cloned.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          const mat = (mesh.material as THREE.MeshStandardMaterial).clone();
          mat.side = THREE.DoubleSide;
          if (index === activeIndex) {
            mat.emissive = themeColor;
            mat.emissiveIntensity = 0.45;
          } else {
            mat.emissive = themeColor;
            mat.emissiveIntensity = 0.08;
          }
          mesh.material = mat;
        }
      }
    });
    return cloned;
  }, [scene, project.accentColor, index, activeIndex]);

  const isCenter = index === activeIndex;

  // Target shallow arc positions
  const targetX = (index - activeIndex) * 3.4;
  const targetY = isCenter ? 0.35 : 0.1;
  const targetZ = isCenter ? 0.4 : -0.8;
  const targetScale = isCenter ? 0.55 : 0.38;
  const targetRotY = (index - activeIndex) * -0.28;

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Smooth lerp positioning
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, delta * 9);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, delta * 9);
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, delta * 9);
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 9);

    const idleRot = isCenter ? Math.sin(state.clock.elapsedTime * 1.5) * 0.08 : 0;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotY + idleRot,
      delta * 8
    );
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
        // Clicking a card ONLY selects/focuses it (No accidental navigation!)
        onSelect();
      }}
    >
      <Float speed={isCenter ? 2 : 0} rotationIntensity={0.1} floatIntensity={isCenter ? 0.25 : 0}>
        <primitive object={clonedScene} />
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
  onNavigate,
}) => {
  const activeProject = CAROUSEL_PROJECTS[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + CAROUSEL_PROJECTS.length) % CAROUSEL_PROJECTS.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % CAROUSEL_PROJECTS.length);
  };

  // Keyboard Arrow Navigation (Left / Right Arrows)
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
      {/* Background Gradient & Stars */}
      <color attach="background" args={["#030305"]} />
      <Stars radius={50} depth={50} count={1500} factor={4} saturation={0} fade speed={1.5} />

      {/* Ambient & Volumetric Lighting */}
      <ambientLight intensity={0.8} />
      <pointLight position={[0, 5, 6]} intensity={2.2} color="#ffffff" />
      <pointLight position={[0, -2, 4]} intensity={1.8} color={activeProject.accentColor} />
      <directionalLight position={[0, 6, 4]} intensity={1.5} />

      {/* Corner Viewfinder Brackets */}
      <CornerBrackets3D />

      {/* TOP BAR IN 3D SCENE */}
      <group position={[0, 2.8, 0]}>
        {/* Left Status Readout */}
        <Text
          position={[-3.8, 0, 0]}
          fontSize={0.1}
          color="#a1a1aa"
          anchorX="left"
          anchorY="middle"
          letterSpacing={0.12}
        >
          • HATAB STUDIOS — LIVE
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
          HATAB STUDIOS HUB
        </Text>

        {/* Right Contact Link */}
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
            [ CONTACT / CAIRO 🇪🇬 ]
          </Text>
        </group>
      </group>

      {/* MAIN CAROUSEL STAGE — 3 REAL GLTF KEYCARDS */}
      {CAROUSEL_PROJECTS.map((project, idx) => (
        <GLTFKeycardModelInstance
          key={project.id}
          project={project}
          index={idx}
          activeIndex={activeIndex}
          onSelect={() => setActiveIndex(idx)}
        />
      ))}

      {/* MINIMAL GLOWING 3D DOT-CLUSTER NAV CONTROLS */}
      {/* Left Dot Cluster Button */}
      <group
        position={[-2.2, 0.35, 0.5]}
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
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial
            color={activeProject.accentColor}
            emissive={activeProject.accentColor}
            emissiveIntensity={1.2}
          />
        </mesh>
        <mesh position={[0.08, 0, 0]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial color="#a1a1aa" />
        </mesh>
      </group>

      {/* Right Dot Cluster Button */}
      <group
        position={[2.2, 0.35, 0.5]}
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
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial
            color={activeProject.accentColor}
            emissive={activeProject.accentColor}
            emissiveIntensity={1.2}
          />
        </mesh>
      </group>

      {/* BELOW CENTER CARD — PROJECT TITLE & EXPLICIT ENTER BUTTON (No accidental clicks!) */}
      <group position={[0, -1.5, 0.4]}>
        <Text
          position={[0, 0.15, 0.06]}
          fontSize={0.28}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.06}
          fontWeight="bold"
        >
          {activeProject.title}
        </Text>

        {/* Dedicated Explicit Enter Site Button */}
        <group
          position={[0, -0.35, 0.06]}
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
            <planeGeometry args={[2.8, 0.32]} />
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
            emissiveIntensity={0.9}
          />
        </mesh>
      </group>

      {/* Reflective Ground Grid Floor Plane */}
      <gridHelper args={[24, 24, activeProject.accentColor, "#18181b"]} position={[0, -3.2, -2]} />
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
      className="w-full h-screen fixed inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900 to-black select-none"
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
