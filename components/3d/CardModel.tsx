'use client';

import React, { useMemo, useRef, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { useFBX } from '@react-three/drei';
import * as THREE from 'three';
import { Project } from '@/data/projects';

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

  // Load card's dedicated custom texture + PBR material maps from public/textures
  const dedicatedTexture = useLoader(THREE.TextureLoader, project.texturePath);
  const pbrMaps = useLoader(THREE.TextureLoader, [
    '/textures/Authentication_Card_Authentication_Card_No.png',
    '/textures/Authentication_Card_Authentication_Card_Ro.png',
    '/textures/Authentication_Card_Authentication_Card_Me.png',
    '/textures/Authentication_Card_Authentication_Card_Am.png',
  ]);

  const [normalMap, roughnessMap, metalnessMap, aoMap] = pbrMaps;

  // Clone, rotate vertical facing camera, & center FBX group
  const { clonedFbx, autoScale } = useMemo(() => {
    const clone = originalFbx.clone(true);

    // Rotate FBX model so card stands vertical and faces camera directly
    clone.rotation.x = Math.PI / 2;
    clone.updateMatrixWorld(true);

    // Calculate bounding box in vertical orientation
    const box = new THREE.Box3().setFromObject(clone);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    // Center mesh geometry inside group
    clone.position.x = -center.x;
    clone.position.y = -center.y;
    clone.position.z = -center.z;

    // Standardize vertical height to 3.8 world units in 3D viewport
    const maxDim = Math.max(size.x, size.y, size.z);
    const scaleFactor = maxDim > 0 ? 3.8 / maxDim : 1.0;

    return { clonedFbx: clone, autoScale: scaleFactor };
  }, [originalFbx]);

  // Apply dedicated custom texture and PBR material maps to mesh instances
  useMemo(() => {
    if (!clonedFbx) return;

    dedicatedTexture.colorSpace = THREE.SRGBColorSpace;
    dedicatedTexture.needsUpdate = true;

    clonedFbx.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;

        const customMat = new THREE.MeshStandardMaterial({
          map: dedicatedTexture,
          normalMap: normalMap,
          normalScale: new THREE.Vector2(0.8, 0.8),
          roughnessMap: roughnessMap,
          roughness: isSelected ? 0.35 : 0.55,
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

    const cardSpacing = 4.2;
    const currentPosIndex = index - carouselOffset;

    const targetX = currentPosIndex * cardSpacing;
    const targetZ = -Math.pow(currentPosIndex, 2) * 0.5;

    const targetRotY = currentPosIndex * -0.25;
    const targetRotZ = currentPosIndex * -0.04;

    const floatOffset = Math.sin(state.clock.elapsedTime * 2 + index) * 0.1;
    const targetY = isSelected ? 0.1 + floatOffset : floatOffset;

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
    </group>
  );
}
