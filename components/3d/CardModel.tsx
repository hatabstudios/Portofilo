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

  // Load PBR Texture maps from public/textures
  const pbrTextures = useLoader(THREE.TextureLoader, [
    '/textures/Authentication_Card_Authentication_Card_Ba.png',
    '/textures/Authentication_Card_Authentication_Card_No.png',
    '/textures/Authentication_Card_Authentication_Card_Ro.png',
    '/textures/Authentication_Card_Authentication_Card_Me.png',
    '/textures/Authentication_Card_Authentication_Card_Am.png',
  ]);

  const [baseMap, normalMap, roughnessMap, metalnessMap, aoMap] = pbrTextures;

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

  // Dynamic Texture Compositor: overlays project brand details onto the native PBR card map
  const brandCanvasTexture = useMemo(() => {
    if (typeof window === 'undefined') return null;

    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      // Draw original high-res PBR base texture first
      if (baseMap?.image) {
        ctx.drawImage(baseMap.image, 0, 0, 1024, 1024);
      } else {
        ctx.fillStyle = '#0a0d14';
        ctx.fillRect(0, 0, 1024, 1024);
      }

      // Accent color glow tint layer
      ctx.fillStyle = project.accentColor;
      ctx.globalAlpha = 0.22;
      ctx.fillRect(0, 0, 1024, 1024);
      ctx.globalAlpha = 1.0;

      // Outer accent foil trim
      ctx.strokeStyle = project.accentColor;
      ctx.lineWidth = 24;
      ctx.strokeRect(20, 20, 984, 984);

      // Inner subtle border
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 4;
      ctx.strokeRect(44, 44, 936, 936);

      // Corner accent blocks
      ctx.fillStyle = project.accentColor;
      ctx.fillRect(52, 52, 28, 28);
      ctx.fillRect(944, 52, 28, 28);
      ctx.fillRect(52, 944, 28, 28);
      ctx.fillRect(944, 944, 28, 28);

      // Brand Title overlay in lower third
      ctx.font = '900 72px sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.shadowColor = project.accentColor;
      ctx.shadowBlur = 20;
      ctx.fillText(project.name, 512, 820);
      ctx.shadowBlur = 0;

      // Project Badge / Subtitle
      ctx.font = 'bold 32px sans-serif';
      ctx.fillStyle = project.accentColor;
      ctx.fillText(project.subtitle.toUpperCase(), 512, 880);

      // Tap cue
      ctx.font = 'bold 24px sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
      ctx.fillText('CLICK KEYCARD TO ENTER STORE ↗', 512, 940);
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.needsUpdate = true;
    return tex;
  }, [project, baseMap]);

  // Apply materials to cloned FBX meshes
  useMemo(() => {
    if (!clonedFbx) return;

    baseMap.colorSpace = THREE.SRGBColorSpace;
    baseMap.needsUpdate = true;

    clonedFbx.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;

        const customMat = new THREE.MeshStandardMaterial({
          map: brandCanvasTexture || baseMap,
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
  }, [clonedFbx, brandCanvasTexture, baseMap, normalMap, roughnessMap, metalnessMap, aoMap, isSelected]);

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
