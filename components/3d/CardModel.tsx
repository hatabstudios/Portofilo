'use client';

import React, { useMemo, useRef, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { useFBX, Html } from '@react-three/drei';
import * as THREE from 'three';
import { Project } from '@/data/projects';
import { MousePointerClick } from 'lucide-react';

interface CardModelProps {
  project: Project;
  index: number;
  totalCards: number;
  carouselOffset: number; // continuously updated scroll/drag offset
  isSelected: boolean;
  onSelect: () => void;
}

export function CardModel({
  project,
  index,
  totalCards,
  carouselOffset,
  isSelected,
  onSelect,
}: CardModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Load FBX Model using R3F Drei helper
  const originalFbx = useFBX('/models/Authentication Card.fbx');

  // Load card's dedicated custom texture file from project.texturePath
  const dedicatedTexture = useLoader(THREE.TextureLoader, project.texturePath);

  // Load PBR normal/roughness/metallic/ao maps for realistic lighting reflections
  const pbrMaps = useLoader(THREE.TextureLoader, [
    '/textures/Authentication_Card_Authentication_Card_No.png',
    '/textures/Authentication_Card_Authentication_Card_Ro.png',
    '/textures/Authentication_Card_Authentication_Card_Me.png',
    '/textures/Authentication_Card_Authentication_Card_Am.png',
  ]);

  const [normalMap, roughnessMap, metalnessMap, aoMap] = pbrMaps;

  // Clone FBX mesh, stand vertical facing camera, & compute auto-scale
  const { clonedFbx, autoScale } = useMemo(() => {
    const clone = originalFbx.clone(true);

    // Rotate FBX geometry so card stands vertical & text is right-side up facing camera
    clone.rotation.x = Math.PI / 2;
    clone.rotation.z = Math.PI; // Right-side up orientation for texture text
    clone.updateMatrixWorld(true);

    // Calculate bounding box in vertical orientation
    const box = new THREE.Box3().setFromObject(clone);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    // Center mesh geometry inside group
    clone.position.x = -center.x;
    clone.position.y = -center.y;
    clone.position.z = -center.z;

    // Standardize vertical height to 3.6 world units in 3D viewport
    const maxDim = Math.max(size.x, size.y, size.z);
    const scaleFactor = maxDim > 0 ? 3.6 / maxDim : 1.0;

    return { clonedFbx: clone, autoScale: scaleFactor };
  }, [originalFbx]);

  // Apply card's dedicated custom texture and PBR material maps
  useMemo(() => {
    if (!clonedFbx || !dedicatedTexture) return;

    dedicatedTexture.colorSpace = THREE.SRGBColorSpace;
    dedicatedTexture.center.set(0.5, 0.5);
    dedicatedTexture.needsUpdate = true;

    clonedFbx.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;

        const customMat = new THREE.MeshStandardMaterial({
          map: dedicatedTexture,
          normalMap: normalMap,
          normalScale: new THREE.Vector2(0.8, 0.8),
          roughnessMap: roughnessMap,
          roughness: isSelected ? 0.3 : 0.5,
          metalnessMap: metalnessMap,
          metalness: 0.85,
          aoMap: aoMap,
          aoMapIntensity: 1.0,
          envMapIntensity: isSelected ? 1.8 : 1.0,
        });

        mesh.material = customMat;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
  }, [clonedFbx, dedicatedTexture, normalMap, roughnessMap, metalnessMap, aoMap, isSelected]);

  // Frame loop for Ciao Energy carousel position math & physics bobbing
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const cardSpacing = 4.4;
    const currentPosIndex = index - carouselOffset;

    const targetX = currentPosIndex * cardSpacing;
    const targetZ = -Math.pow(currentPosIndex, 2) * 0.5;

    const targetRotY = currentPosIndex * -0.25;
    const targetRotZ = currentPosIndex * -0.04;

    const floatOffset = Math.sin(state.clock.elapsedTime * 2 + index) * 0.1;
    const targetY = isSelected ? 0.2 + floatOffset : floatOffset;

    const baseScale = isSelected ? autoScale * 1.0 : autoScale * 0.82;
    const hoverScaleBonus = hovered && isSelected ? autoScale * 0.08 : 0;
    const targetScale = baseScale + hoverScaleBonus;

    const lerpSpeed = delta * 8;
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, lerpSpeed);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, lerpSpeed);
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, lerpSpeed);

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      isSelected ? 0.05 : 0,
      lerpSpeed
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, lerpSpeed);
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRotZ, lerpSpeed);

    groupRef.current.scale.setScalar(
      THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, lerpSpeed)
    );
  });

  const handleClick = (e: any) => {
    e.stopPropagation();
    if (isSelected) {
      window.open(project.url, '_blank', 'noopener,noreferrer');
    } else {
      onSelect();
    }
  };

  return (
    <group
      ref={groupRef}
      onClick={handleClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <primitive object={clonedFbx} />

      {/* Selective rim light for selected card */}
      {isSelected && (
        <pointLight
          position={[0, 1.5, 1.5]}
          intensity={4.5}
          color={project.accentColor}
          distance={6}
        />
      )}

      {/* 3D Local Text Container — Scoped 100% to this card's local 3D coordinate space (Zero Overlap / Zero Bleed) */}
      <Html
        position={[0, -2.2, 0.2]}
        center
        distanceFactor={7.5}
        className="pointer-events-none select-none transition-opacity duration-300"
        style={{
          opacity: isSelected ? 1 : 0.45,
        }}
      >
        <div className="w-80 text-center space-y-2 font-heading">
          <span
            className="inline-block px-3 py-1 text-[10px] md:text-xs font-bold tracking-widest rounded-full uppercase border backdrop-blur-md"
            style={{
              borderColor: project.accentColor,
              color: project.accentColor,
              backgroundColor: 'rgba(15, 23, 42, 0.75)',
            }}
          >
            {project.badge}
          </span>

          <h2
            className="text-4xl md:text-5xl font-black tracking-tight text-white uppercase drop-shadow-xl"
            style={{
              textShadow: `0 0 30px ${project.glowColor}`,
            }}
          >
            {project.name}
          </h2>

          <p className="text-xs md:text-sm font-semibold text-amber-200/90 tracking-wide">
            {project.tagline}
          </p>

          <p className="text-[11px] text-gray-300/80 leading-snug line-clamp-2 px-2">
            {project.description}
          </p>

          {isSelected && (
            <div className="pt-2 flex items-center justify-center gap-1.5 text-[11px] font-bold text-amber-400">
              <MousePointerClick size={14} className="animate-bounce" />
              <span>CLICK KEYCARD TO ENTER ↗</span>
            </div>
          )}
        </div>
      </Html>
    </group>
  );
}
