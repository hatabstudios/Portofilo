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
  offsetRef: React.MutableRefObject<number>;
  isSelected: boolean;
  onSelect: () => void;
  onOpenModal?: (project: Project) => void;
}

// Procedurally generate smooth radial floor shadow texture
function createGroundShadowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 120);
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0.85)');
    gradient.addColorStop(0.35, 'rgba(0, 0, 0, 0.45)');
    gradient.addColorStop(0.75, 'rgba(0, 0, 0, 0.12)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

// Procedurally generate dynamic sheen / specular glare texture
function createGlareTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const gradient = ctx.createLinearGradient(0, 0, 512, 512);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
    gradient.addColorStop(0.42, 'rgba(255, 255, 255, 0.02)');
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.45)');
    gradient.addColorStop(0.58, 'rgba(255, 255, 255, 0.02)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

export function CardModel({
  project,
  index,
  totalCards,
  offsetRef,
  isSelected,
  onSelect,
  onOpenModal,
}: CardModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const imageMeshRef = useRef<THREE.Mesh>(null);
  const glareMeshRef = useRef<THREE.Mesh>(null);
  const shadowMeshRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  const [hovered, setHovered] = useState(false);

  // Load FBX 3D Geometry
  const originalFbx = useFBX('/models/Authentication Card.fbx');

  // Load project screenshot / thumbnail image
  const imagePath = project.image || project.texturePath || '/textures/blank_keycard_texture.jpg';
  const screenshotTexture = useLoader(THREE.TextureLoader, imagePath);

  // Load 3D Bevel Normal Map
  const normalMap = useLoader(
    THREE.TextureLoader,
    '/textures/Authentication_Card_Authentication_Card_No.png'
  );

  // Reusable procedurally generated shadow and glare textures
  const groundShadowTexture = useMemo(() => createGroundShadowTexture(), []);
  const glareTexture = useMemo(() => createGlareTexture(), []);

  // Compute auto-scale & vertical alignment for 3D card FBX model
  const { clonedFbx, autoScale } = useMemo(() => {
    const clone = originalFbx.clone(true);
    clone.rotation.x = -Math.PI / 2;
    clone.rotation.z = 0;
    clone.updateMatrixWorld(true);

    const box = new THREE.Box3().setFromObject(clone);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    clone.position.x = -center.x;
    clone.position.y = -center.y;
    clone.position.z = -center.z;

    const maxDim = Math.max(size.x, size.y, size.z);
    const scaleFactor = maxDim > 0 ? 3.5 / maxDim : 1.0;

    return { clonedFbx: clone, autoScale: scaleFactor };
  }, [originalFbx]);

  // Universal Card Shell Canvas Texture Generator
  const shellTexture = useMemo(() => {
    if (typeof window === 'undefined') return null;

    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      const accent = project.accentColor || '#38BDF8';

      // 1. Dark Midnight Metallic Background
      const bgGrad = ctx.createRadialGradient(512, 512, 100, 512, 512, 700);
      bgGrad.addColorStop(0, '#0f172a');
      bgGrad.addColorStop(0.6, '#090d16');
      bgGrad.addColorStop(1, '#030712');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 1024, 1024);

      // 2. Subtle Accent Ambient Glow
      const glowGrad = ctx.createRadialGradient(512, 350, 0, 512, 350, 450);
      glowGrad.addColorStop(0, accent + '25');
      glowGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, 1024, 1024);

      // 3. Technical Grid Lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      for (let x = 60; x < 1024; x += 80) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 1024);
        ctx.stroke();
      }
      for (let y = 60; y < 1024; y += 80) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(1024, y);
        ctx.stroke();
      }

      // 4. Outer Glass Chamfer Border Frame
      ctx.strokeStyle = accent + '50';
      ctx.lineWidth = 6;
      ctx.strokeRect(36, 36, 952, 952);

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 2;
      ctx.strokeRect(48, 48, 928, 928);

      // Corner tech accents
      ctx.fillStyle = accent;
      ctx.fillRect(32, 32, 16, 16);
      ctx.fillRect(976, 32, 16, 16);
      ctx.fillRect(32, 976, 16, 16);
      ctx.fillRect(976, 976, 16, 16);

      // 5. Header Section: Badge Chip & Emblem Monogram
      const badgeText = (project.badge || 'WEB PROJECT').toUpperCase();
      ctx.font = '900 24px sans-serif';
      const badgeWidth = ctx.measureText(badgeText).width + 36;

      // Badge background pill
      ctx.fillStyle = accent + '30';
      ctx.strokeStyle = accent;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(70, 70, badgeWidth, 42, 21);
      ctx.fill();
      ctx.stroke();

      // Badge text
      ctx.fillStyle = '#ffffff';
      ctx.fillText(badgeText, 88, 99);

      // Emblem Monogram (Derived from Title if not supplied)
      const emblem =
        project.emblemText ||
        project.name
          .split(' ')
          .map((w) => w[0])
          .join('')
          .slice(0, 3)
          .toUpperCase();
      ctx.fillStyle = '#030712';
      ctx.strokeStyle = accent;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.roundRect(880, 68, 72, 48, 12);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = accent;
      ctx.font = '900 22px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(emblem, 916, 100);
      ctx.textAlign = 'left';

      // 6. Project Title & Tagline Header
      ctx.fillStyle = '#ffffff';
      ctx.font = '900 48px sans-serif';
      ctx.shadowColor = accent;
      ctx.shadowBlur = 15;
      ctx.fillText(project.name.toUpperCase(), 70, 185);
      ctx.shadowBlur = 0;

      ctx.fillStyle = accent;
      ctx.font = '600 22px sans-serif';
      const taglineText = project.subtitle || project.tagline || '';
      ctx.fillText(taglineText.slice(0, 48), 70, 220);

      // 7. Recessed Display Window Frame (Cutout area for Parallax Screenshot)
      ctx.fillStyle = '#02040a';
      ctx.fillRect(70, 250, 884, 620);

      // Inner Bezel Highlight
      ctx.strokeStyle = accent + '80';
      ctx.lineWidth = 3;
      ctx.strokeRect(68, 248, 888, 624);

      ctx.strokeStyle = 'rgba(255,255,255,0.1)';
      ctx.lineWidth = 1;
      ctx.strokeRect(60, 240, 904, 640);

      // 8. Footer Section: Technical Serial & Status Dot
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(80, 925, 8, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.font = '600 18px monospace';
      ctx.fillText('SYSTEM ONLINE :: SEC-PASS ' + project.id.toUpperCase(), 102, 931);

      ctx.fillStyle = accent;
      ctx.font = '700 18px monospace';
      ctx.fillText('VERIFIED AGENT [01]', 750, 931);
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.center.set(0.5, 0.5);
    tex.rotation = Math.PI / 2;
    tex.needsUpdate = true;
    return tex;
  }, [project]);

  // Apply card shell material to cloned FBX meshes
  useMemo(() => {
    if (!clonedFbx || !shellTexture) return;

    shellTexture.colorSpace = THREE.SRGBColorSpace;
    shellTexture.center.set(0.5, 0.5);
    shellTexture.rotation = Math.PI / 2;
    shellTexture.needsUpdate = true;

    if (normalMap) normalMap.needsUpdate = true;

    clonedFbx.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.material = new THREE.MeshStandardMaterial({
          map: shellTexture,
          normalMap: normalMap || null,
          normalScale: new THREE.Vector2(0.3, 0.3),
          roughness: isSelected ? 0.35 : 0.55,
          metalness: 0.25,
          envMapIntensity: isSelected ? 1.5 : 0.8,
        });
      }
    });
  }, [clonedFbx, shellTexture, normalMap, isSelected]);

  // Smooth frame loop updating 3D positioning, Parallax, Specular Glare, Rim Lights, & Ground Shadow
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const currentOffset = offsetRef.current;
    const isMobile = state.viewport.width < 5.5;
    const cardSpacing = isMobile ? 3.4 : 4.2;

    const currentPosIndex = index - currentOffset;

    const targetX = currentPosIndex * cardSpacing;
    const targetZ = -Math.pow(currentPosIndex, 2) * (isMobile ? 0.6 : 0.5);

    const targetRotY = currentPosIndex * -0.22;
    const targetRotZ = currentPosIndex * -0.03;

    const floatOffset = Math.sin(state.clock.elapsedTime * 2 + index) * (isMobile ? 0.06 : 0.1);
    const targetY = isSelected ? 0.15 + floatOffset : floatOffset;

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

    // --- EFFECT 1: SUBTLE 3D PARALLAX ---
    // Shift screenshot image relative to the card frame based on cursor pointer
    if (imageMeshRef.current && isSelected) {
      const px = state.pointer.x * 0.12;
      const py = state.pointer.y * 0.12;
      imageMeshRef.current.position.x = THREE.MathUtils.lerp(imageMeshRef.current.position.x, px, lerpSpeed);
      imageMeshRef.current.position.y = THREE.MathUtils.lerp(imageMeshRef.current.position.y, 0.08 + py, lerpSpeed);
    }

    // --- EFFECT 2: MOVING SPECULAR GLARE SWEEP ---
    // Dynamic sheen sweep across card surface on hover/tilt
    if (glareMeshRef.current) {
      const glareSweepX = Math.sin(state.clock.elapsedTime * 1.8 + index) * 0.8 + (hovered ? state.pointer.x * 0.4 : 0);
      glareMeshRef.current.position.x = THREE.MathUtils.lerp(glareMeshRef.current.position.x, glareSweepX, lerpSpeed);
    }

    // --- EFFECT 3: RIM & EDGE LIGHTING ---
    // Point light intensity scales dynamically as card rotates toward camera
    if (lightRef.current) {
      const rotAngleFactor = Math.cos(targetRotY);
      const targetIntensity = isSelected ? 3.8 * rotAngleFactor : 0.8;
      lightRef.current.intensity = THREE.MathUtils.lerp(lightRef.current.intensity, targetIntensity, lerpSpeed);
    }

    // --- EFFECT 4: SOFT REFLECTION / GROUND SHADOW ---
    // Shadow tracks card position, scaling & fading based on card height
    if (shadowMeshRef.current) {
      const shadowY = -1.85 - groupRef.current.position.y * 0.5;
      const shadowScale = (1.0 + (targetY - floatOffset) * 0.4) * (isSelected ? 1.1 : 0.85);
      const shadowOpacity = Math.max(0.1, 0.65 - Math.abs(currentPosIndex) * 0.12);

      shadowMeshRef.current.position.y = shadowY;
      shadowMeshRef.current.scale.set(shadowScale, shadowScale, 1);
      (shadowMeshRef.current.material as THREE.MeshBasicMaterial).opacity = THREE.MathUtils.lerp(
        (shadowMeshRef.current.material as THREE.MeshBasicMaterial).opacity,
        shadowOpacity,
        lerpSpeed
      );
    }
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

    if (typeof window !== 'undefined' && (window as any).__IS_CAROUSEL_DRAGGING__) {
      return;
    }

    if (isSelected) {
      if (project.url.startsWith('http://') || project.url.startsWith('https://')) {
        window.open(project.url, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = project.url;
      }
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
      {/* Outer 3D Card FBX Mesh */}
      <primitive object={clonedFbx} />

      {/* Inner 3D Parallax Viewport Screenshot Mesh */}
      <mesh ref={imageMeshRef} position={[0, 0.08, 0.04]}>
        <planeGeometry args={[1.82, 1.22]} />
        <meshStandardMaterial
          map={screenshotTexture}
          roughness={0.4}
          metalness={0.1}
          toneMapped={false}
        />
      </mesh>

      {/* Moving Specular Glare Sheen Overlay */}
      <mesh ref={glareMeshRef} position={[0, 0.08, 0.07]}>
        <planeGeometry args={[1.9, 2.8]} />
        <meshBasicMaterial
          map={glareTexture}
          transparent
          opacity={hovered ? 0.65 : 0.35}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Soft Floor Contact Shadow */}
      <mesh ref={shadowMeshRef} position={[0, -1.85, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.8, 1.5]} />
        <meshBasicMaterial
          map={groundShadowTexture}
          transparent
          opacity={0.6}
          depthWrite={false}
        />
      </mesh>

      {/* Dynamic Edge & Rim Lighting */}
      <pointLight
        ref={lightRef}
        position={[0, 1.5, 1.8]}
        intensity={isSelected ? 3.8 : 1.0}
        color={project.accentColor || '#38BDF8'}
        distance={6}
      />
    </group>
  );
}
