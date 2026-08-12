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
  offsetRef: React.MutableRefObject<number>; // continuous drag offset ref (prevents 60FPS React re-render lag)
  isSelected: boolean;
  onSelect: () => void;
}

export function CardModel({
  project,
  index,
  totalCards,
  offsetRef,
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

    // Rotate FBX geometry so card stands upright & front texture artwork is forward-facing & right-side up
    clone.rotation.x = Math.PI / 2;
    clone.rotation.z = Math.PI;
    clone.updateMatrixWorld(true);

    // Calculate bounding box in vertical orientation
    const box = new THREE.Box3().setFromObject(clone);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    // Center mesh geometry inside group
    clone.position.x = -center.x;
    clone.position.y = -center.y;
    clone.position.z = -center.z;

    // Standardize vertical height to 3.5 world units in 3D viewport
    const maxDim = Math.max(size.x, size.y, size.z);
    const scaleFactor = maxDim > 0 ? 3.5 / maxDim : 1.0;

    return { clonedFbx: clone, autoScale: scaleFactor };
  }, [originalFbx]);

  // Dynamic Texture Compositor: overlays secret keycard artwork, brand title, and accent glow onto both UV halves
  const compositedTexture = useMemo(() => {
    if (typeof window === 'undefined') return null;

    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      // 1. Draw dedicated texture image across both halves if loaded
      if (dedicatedTexture?.image) {
        // Draw the artwork side (512..1024) onto both left half (0..512) and right half (512..1024)
        ctx.drawImage(dedicatedTexture.image, 512, 0, 512, 1024, 0, 0, 512, 1024);
        ctx.drawImage(dedicatedTexture.image, 512, 0, 512, 1024, 512, 0, 512, 1024);
      } else {
        ctx.fillStyle = '#0a0d14';
        ctx.fillRect(0, 0, 1024, 1024);
      }

      // 2. Add signature brand accent color tint overlay
      ctx.fillStyle = project.accentColor;
      ctx.globalAlpha = 0.12;
      ctx.fillRect(0, 0, 1024, 1024);
      ctx.globalAlpha = 1.0;

      // 3. Add accent foil trim around card boundaries
      ctx.strokeStyle = project.accentColor;
      ctx.lineWidth = 14;
      ctx.strokeRect(10, 10, 492, 1004);
      ctx.strokeRect(522, 10, 492, 1004);
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.needsUpdate = true;
    return tex;
  }, [project, dedicatedTexture]);

  // Apply composited texture artwork to cloned FBX meshes
  useMemo(() => {
    if (!clonedFbx) return;

    const activeMap = compositedTexture || dedicatedTexture;
    if (activeMap) {
      activeMap.colorSpace = THREE.SRGBColorSpace;
      activeMap.generateMipmaps = true;
      activeMap.minFilter = THREE.LinearMipmapLinearFilter;
      activeMap.needsUpdate = true;
    }

    if (normalMap) {
      normalMap.needsUpdate = true;
    }

    clonedFbx.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;

        // Clean material displaying custom artwork texture vibrantly with normal bevels
        const customMat = new THREE.MeshStandardMaterial({
          map: activeMap || null,
          normalMap: normalMap || null,
          normalScale: new THREE.Vector2(0.25, 0.25),
          roughness: isSelected ? 0.3 : 0.5,
          metalness: 0.2,
          envMapIntensity: isSelected ? 1.4 : 0.8,
        });

        mesh.material = customMat;
      }
    });
  }, [clonedFbx, compositedTexture, dedicatedTexture, normalMap, isSelected]);

  // Frame loop smoothly updates 3D mesh position directly from offsetRef (Zero React state re-render overhead)
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Read current continuous scroll/drag offset directly from ref
    const currentOffset = offsetRef.current;

    // Mobile screen scale adjustment
    const isMobile = state.viewport.width < 5.5;
    const cardSpacing = isMobile ? 3.4 : 4.2;

    const currentPosIndex = index - currentOffset;

    const targetX = currentPosIndex * cardSpacing;
    const targetZ = -Math.pow(currentPosIndex, 2) * (isMobile ? 0.6 : 0.5);

    const targetRotY = currentPosIndex * -0.22;
    const targetRotZ = currentPosIndex * -0.03;

    const floatOffset = Math.sin(state.clock.elapsedTime * 2 + index) * (isMobile ? 0.06 : 0.1);
    const targetY = isSelected ? 0.15 + floatOffset : floatOffset;

    // Responsive scaling for mobile screens
    const responsiveAutoScale = isMobile ? autoScale * 0.72 : autoScale;
    const baseScale = isSelected ? responsiveAutoScale * 1.0 : responsiveAutoScale * 0.8;
    const hoverScaleBonus = hovered && isSelected ? responsiveAutoScale * 0.06 : 0;
    const targetScale = baseScale + hoverScaleBonus;

    const lerpSpeed = Math.min(delta * 12, 1.0);
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

  const handlePointerOver = (e: any) => {
    e.stopPropagation();
    setHovered(true);
    if (typeof document !== 'undefined') {
      document.body.style.cursor = 'pointer';
    }
  };

  const handlePointerOut = (e: any) => {
    setHovered(false);
    if (typeof document !== 'undefined') {
      document.body.style.cursor = 'auto';
    }
  };

  const handleClick = (e: any) => {
    e.stopPropagation();

    // Prevent navigation if user was performing a true drag gesture
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
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <primitive object={clonedFbx} />

      {/* Selective rim light for selected card */}
      {isSelected && (
        <pointLight
          position={[0, 1.5, 1.5]}
          intensity={3.5}
          color={project.accentColor}
          distance={5}
        />
      )}
    </group>
  );
}
