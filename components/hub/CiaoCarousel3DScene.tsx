"use client";

import React, { useRef, useState, useMemo, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text, useFBX, useTexture, Stars } from "@react-three/drei";
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

// Preload the Authentication Card FBX Model
useFBX.preload("/models/keycard/Authentication Card.fbx");

interface CiaoCarouselSceneProps {
  activeIndex: number;
  setActiveIndex: (idx: number | ((prev: number) => number)) => void;
  onNavigate: (index: number) => void;
}

// Real 3D FBX Keycard Model Instance (No procedural card geometry!)
const AuthenticFBXKeycardInstance: React.FC<{
  project: ProjectCarouselData;
  index: number;
  activeIndex: number;
  onSelect: () => void;
  mousePos: { x: number; y: number };
}> = ({ project, index, activeIndex, onSelect, mousePos }) => {
  const groupRef = useRef<THREE.Group>(null);
  const isCenter = index === activeIndex;

  // Load the real 3D FBX Model from Assets/source/Authentication Card.fbx
  const fbxModel = useFBX("/models/keycard/Authentication Card.fbx");

  // Load PBR Textures from Assets/textures
  const [baseMap, normalMap, roughnessMap, metallicMap, aoMap] = useTexture([
    "/textures/keycard/Authentication_Card_Authentication_Card_Ba.png",
    "/textures/keycard/Authentication_Card_Authentication_Card_No.png",
    "/textures/keycard/Authentication_Card_Authentication_Card_Me.png",
    "/textures/keycard/Authentication_Card_Authentication_Card_No.png",
    "/textures/keycard/Authentication_Card_Authentication_Card_Ro.png",
  ]);

  // Clone FBX model scene for unique project instances
  const clonedFBX = useMemo(() => {
    const cloned = fbxModel.clone(true);
    const themeColor = new THREE.Color(project.accentColor);

    cloned.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const mat = new THREE.MeshPhysicalMaterial({
          map: baseMap,
          normalMap: normalMap,
          roughnessMap: roughnessMap,
          metalnessMap: metallicMap,
          aoMap: aoMap,
          color: themeColor,
          emissive: themeColor,
          emissiveIntensity: index === activeIndex ? 0.45 : 0.08,
          metalness: 0.85,
          roughness: 0.2,
          clearcoat: 1.0,
          clearcoatRoughness: 0.1,
          side: THREE.DoubleSide,
        });
        mesh.material = mat;
      }
    });
    return cloned;
  }, [fbxModel, project.accentColor, index, activeIndex, baseMap, normalMap, roughnessMap, metallicMap, aoMap]);

  // Target coordinates in 3D arc
  const targetX = (index - activeIndex) * 3.4;
  const targetY = isCenter ? 0.35 : 0.1;
  const targetZ = isCenter ? 0.2 : -0.9;
  const targetScale = isCenter ? 0.024 : 0.016;
  const targetRotY = (index - activeIndex) * -0.28;

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Smooth carousel lerp
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, delta * 8);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, delta * 8);
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, delta * 8);
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 8);

    // Ultra-slow, laggy mouse cursor tracking on center card (no snapping!)
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
        <primitive object={clonedFBX} />
      </Float>
    </group>
  );
};

// Top Overhead Ring Light Fixture Mesh
const TopLightRingFixture: React.FC = () => {
  return (
    <group position={[0, 3.2, -0.5]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.6, 1.6, 0.25, 32]} />
        <meshStandardMaterial color="#111113" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.13, 0]}>
        <ringGeometry args={[1.2, 1.5, 32]} />
        <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

// Corner Viewfinder Brackets Mesh
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
      {/* Background Gradient & Stars */}
      <color attach="background" args={["#030305"]} />
      <Stars radius={50} depth={50} count={1500} factor={4} saturation={0} fade speed={1.5} />

      {/* Spotlight Lighting */}
      <ambientLight intensity={0.7} />
      <spotLight position={[0, 8, 4]} angle={0.6} penumbra={0.9} intensity={3.5} color="#ffffff" />
      <pointLight position={[0, -2, 4]} intensity={2.0} color={activeProject.accentColor} />

      {/* Overhead Ring Fixture */}
      <TopLightRingFixture />

      {/* Viewfinder Brackets */}
      <CornerBrackets3D />

      {/* TOP BAR */}
      <group position={[0, 2.8, 0]}>
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

      {/* MAIN CAROUSEL STAGE — 3 REAL FBX MODEL INSTANCES */}
      {CAROUSEL_PROJECTS.map((project, idx) => (
        <AuthenticFBXKeycardInstance
          key={project.id}
          project={project}
          index={idx}
          activeIndex={activeIndex}
          onSelect={() => setActiveIndex(idx)}
          mousePos={mousePos}
        />
      ))}

      {/* CHEVRON ARROWS FLANKING CENTER CARD */}
      <group
        position={[-2.4, 0.35, 0.6]}
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

      <group
        position={[2.4, 0.35, 0.6]}
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

      {/* PROJECT TITLE & DEDICATED ENTER BUTTON (POSITIONED IN FRONT AT Z: 1.2 — NO CLIPPING!) */}
      <group position={[0, -1.8, 1.2]}>
        <Text
          position={[0, 0.2, 0.1]}
          fontSize={0.32}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.08}
          fontWeight="bold"
        >
          {activeProject.title}
        </Text>

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
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[4.2, 0.03, 0.01]} />
          <meshBasicMaterial color="#27272a" />
        </mesh>

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
