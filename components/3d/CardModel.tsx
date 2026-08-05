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

  // Load PBR normal map for 3D card bevels
  const normalMap = useLoader(
    THREE.TextureLoader,
    '/textures/Authentication_Card_Authentication_Card_No.png'
  );

  // Clone FBX mesh, stand vertical facing camera, & compute auto-scale
  const { clonedFbx, autoScale } = useMemo(() => {
    const clone = originalFbx.clone(true);

    // Rotate FBX geometry so card stands upright & texture artwork is right-side up & forward-facing
    clone.rotation.x = -Math.PI / 2;
    clone.rotation.z = 0;
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

  // Apply dedicated custom texture artwork in full color & sharp detail
  useMemo(() => {
    if (!clonedFbx || !dedicatedTexture) return;

    dedicatedTexture.colorSpace = THREE.SRGBColorSpace;
    dedicatedTexture.center.set(0.5, 0.5);
    dedicatedTexture.needsUpdate = true;

    if (normalMap) {
      normalMap.needsUpdate = true;
    }

    clonedFbx.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;

        // Clean material displaying custom artwork texture vibrantly with normal bevels
        const customMat = new THREE.MeshStandardMaterial({
          map: dedicatedTexture,
          normalMap: normalMap || null,
          normalScale: new THREE.Vector2(0.3, 0.3),
          roughness: isSelected ? 0.25 : 0.45,
          metalness: 0.12, // Subtle sheen so texture artwork pops brightly
          envMapIntensity: isSelected ? 1.4 : 0.8,
        });

        mesh.material = customMat;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
  }, [clonedFbx, dedicatedTexture, normalMap, isSelected]);

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

    // Prevent navigation if user was performing a drag / swipe gesture
    if (typeof window !== 'undefined' && (window as any).__IS_CAROUSEL_DRAGGING__) {
      return;
    }

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
    </group>
  );
}
