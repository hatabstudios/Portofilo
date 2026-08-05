"use client";

import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text, useGLTF } from "@react-three/drei";
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

// Preload the real 3D Keycard GLTF Model
useGLTF.preload("/models/keycard/Keycard.gltf");

interface CiaoCarouselSceneProps {
  activeIndex: number;
  setActiveIndex: (idx: number) => void;
  onNavigate: (index: number) => void;
}

// 3D GLTF Keycard Instance Component
const GLTFKeycardInstance: React.FC<{
  project: ProjectCarouselData;
  index: number;
  activeIndex: number;
  onSelect: () => void;
  onEnter: () => void;
}> = ({ project, index, activeIndex, onSelect, onEnter }) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Load the GLTF model
  const { scene } = useGLTF("/models/keycard/Keycard.gltf");

  // Clone scene for unique instance rendering & material tinting
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
            mat.emissiveIntensity = 0.35;
          } else {
            mat.emissive = themeColor;
            mat.emissiveIntensity = 0.05;
          }
          mesh.material = mat;
        }
      }
    });
    return cloned;
  }, [scene, project.accentColor, index, activeIndex]);

  const isCenter = index === activeIndex;

  // Target coordinates in 3D arc
  const targetX = (index - activeIndex) * 3.3;
  const targetY = isCenter ? 0.3 : 0.1;
  const targetZ = isCenter ? 0.4 : -0.7;
  const targetScale = isCenter ? 1.4 : 0.95;
  const targetRotY = (index - activeIndex) * -0.25;

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Smooth carousel lerp positioning
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
        if (isCenter) {
          onEnter();
        } else {
          onSelect();
        }
      }}
    >
      <Float speed={isCenter ? 2 : 0} rotationIntensity={0.1} floatIntensity={isCenter ? 0.25 : 0}>
        <primitive object={clonedScene} scale={0.45} />
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
    setActiveIndex((activeIndex - 1 + CAROUSEL_PROJECTS.length) % CAROUSEL_PROJECTS.length);
  };

  const handleNext = () => {
    setActiveIndex((activeIndex + 1) % CAROUSEL_PROJECTS.length);
  };

  return (
    <>
      {/* Ambient & Volumetric Scene Lighting */}
      <color attach="background" args={["#050507"]} />
      <ambientLight intensity={0.7} />
      <pointLight position={[0, 5, 6]} intensity={2.0} color="#ffffff" />
      <pointLight position={[0, -2, 4]} intensity={1.5} color={activeProject.accentColor} />
      <directionalLight position={[0, 6, 4]} intensity={1.2} />

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

      {/* MAIN CAROUSEL STAGE — 3 GLTF KEYCARDS IN 3D SPACE */}
      {CAROUSEL_PROJECTS.map((project, idx) => (
        <GLTFKeycardInstance
          key={project.id}
          project={project}
          index={idx}
          activeIndex={activeIndex}
          onSelect={() => setActiveIndex(idx)}
          onEnter={() => onNavigate(idx)}
        />
      ))}

      {/* MINIMAL GLOWING 3D DOT-CLUSTER NAV CONTROLS */}
      {/* Left Dot Cluster Button */}
      <group
        position={[-1.8, 0.35, 0.5]}
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
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial
            color={activeProject.accentColor}
            emissive={activeProject.accentColor}
            emissiveIntensity={1.0}
          />
        </mesh>
        <mesh position={[0.08, 0, 0]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial color="#a1a1aa" />
        </mesh>
      </group>

      {/* Right Dot Cluster Button */}
      <group
        position={[1.8, 0.35, 0.5]}
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
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial
            color={activeProject.accentColor}
            emissive={activeProject.accentColor}
            emissiveIntensity={1.0}
          />
        </mesh>
      </group>

      {/* BELOW CENTER CARD — PROJECT TITLE (No description) */}
      <group position={[0, -1.4, 0.4]}>
        <Text
          position={[0, 0.1, 0.06]}
          fontSize={0.28}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.06}
          fontWeight="bold"
        >
          {activeProject.title}
        </Text>

        {/* Clickable Action Button */}
        <group
          position={[0, -0.4, 0.06]}
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
            fontSize={0.11}
            color={activeProject.accentColor}
            anchorX="center"
            anchorY="middle"
            letterSpacing={0.1}
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
