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
  isFlipped: boolean;
  onSelect: () => void;
  onToggleFlip: () => void;
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

// Canvas text word wrapping helper
function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) {
  const words = text.split(' ');
  let line = '';
  let currentY = y;
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      ctx.fillText(line, x, currentY);
      line = words[n] + ' ';
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, currentY);
}

export function CardModel({
  project,
  index,
  totalCards,
  offsetRef,
  isSelected,
  isFlipped,
  onSelect,
  onToggleFlip,
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

  // Front Face Canvas Texture Generator (512x512 for high performance)
  const frontTexture = useMemo(() => {
    if (typeof window === 'undefined') return null;

    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      const accent = project.accentColor || '#38BDF8';

      // Background gradient
      const bgGrad = ctx.createRadialGradient(256, 256, 50, 256, 256, 350);
      bgGrad.addColorStop(0, '#0f172a');
      bgGrad.addColorStop(0.6, '#090d16');
      bgGrad.addColorStop(1, '#030712');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 512, 512);

      // Glass Chamfer Border Frame
      ctx.strokeStyle = accent + '50';
      ctx.lineWidth = 4;
      ctx.strokeRect(18, 18, 476, 476);

      // Corner tech accents
      ctx.fillStyle = accent;
      ctx.fillRect(16, 16, 10, 10);
      ctx.fillRect(486, 16, 10, 10);
      ctx.fillRect(16, 486, 10, 10);
      ctx.fillRect(486, 486, 10, 10);

      // Badge Chip
      const badgeText = (project.badge || 'WEB PROJECT').toUpperCase();
      ctx.font = '900 13px sans-serif';
      const badgeWidth = ctx.measureText(badgeText).width + 20;

      ctx.fillStyle = accent + '30';
      ctx.strokeStyle = accent;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(35, 35, badgeWidth, 24, 12);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.fillText(badgeText, 45, 52);

      // Emblem Monogram
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
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(436, 34, 40, 26, 6);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = accent;
      ctx.font = '900 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(emblem, 456, 51);
      ctx.textAlign = 'left';

      // Title & Tagline Header
      ctx.fillStyle = '#ffffff';
      ctx.font = '900 24px sans-serif';
      ctx.shadowColor = accent;
      ctx.shadowBlur = 8;
      ctx.fillText(project.name.toUpperCase(), 35, 95);
      ctx.shadowBlur = 0;

      ctx.fillStyle = accent;
      ctx.font = '600 12px sans-serif';
      const taglineText = project.subtitle || project.tagline || '';
      ctx.fillText(taglineText.slice(0, 35), 35, 114);

      // Display Window Frame (Cutout area for Parallax Screenshot)
      ctx.fillStyle = '#02040a';
      ctx.fillRect(35, 130, 442, 310);

      ctx.strokeStyle = accent + '80';
      ctx.lineWidth = 2;
      ctx.strokeRect(34, 129, 444, 312);

      // Footer Section
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(42, 465, 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.font = '600 10px monospace';
      ctx.fillText('SEC-PASS :: ' + project.id.toUpperCase(), 52, 468);

      ctx.fillStyle = accent;
      ctx.font = '700 10px monospace';
      ctx.fillText('[TAP TO FLIP ↺]', 370, 468);
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.center.set(0.5, 0.5);
    tex.rotation = Math.PI / 2;
    tex.needsUpdate = true;
    return tex;
  }, [project]);

  // Back Face Canvas Texture Generator (512x512)
  const backTexture = useMemo(() => {
    if (typeof window === 'undefined') return null;

    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      const accent = project.accentColor || '#38BDF8';

      // Dark Carbon Background
      const bgGrad = ctx.createRadialGradient(256, 256, 50, 256, 256, 350);
      bgGrad.addColorStop(0, '#0f172a');
      bgGrad.addColorStop(0.7, '#070a12');
      bgGrad.addColorStop(1, '#020408');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 512, 512);

      // Border line
      ctx.strokeStyle = accent + '80';
      ctx.lineWidth = 3;
      ctx.strokeRect(20, 20, 472, 472);

      // Monogram & Title Header
      ctx.fillStyle = accent;
      ctx.font = '900 20px sans-serif';
      ctx.fillText(project.name.toUpperCase(), 36, 60);

      ctx.fillStyle = '#ffffff';
      ctx.font = '700 12px sans-serif';
      ctx.fillText(project.tagline, 36, 82);

      // Divider line
      ctx.strokeStyle = 'rgba(255,255,255,0.15)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(36, 96);
      ctx.lineTo(476, 96);
      ctx.stroke();

      // Project Description Text
      ctx.fillStyle = 'rgba(241, 245, 249, 0.95)';
      ctx.font = '500 13px sans-serif';
      wrapText(ctx, project.description, 36, 125, 435, 20);

      // Tech specs box
      ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
      ctx.strokeStyle = accent + '40';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(36, 310, 440, 80, 8);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = accent;
      ctx.font = '700 11px monospace';
      ctx.fillText('DEPLOYMENT METRICS:', 48, 332);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '500 11px monospace';
      ctx.fillText('• STATUS: PRODUCTION READY ONLINE', 48, 352);
      ctx.fillText('• URL: ' + project.url, 48, 370);

      // Prominent CTA Button Box
      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.roundRect(36, 410, 440, 52, 26);
      ctx.fill();

      ctx.fillStyle = '#030712';
      ctx.font = '900 15px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('VISIT LIVE PROJECT ↗', 256, 442);
      ctx.textAlign = 'left';
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.center.set(0.5, 0.5);
    tex.rotation = Math.PI / 2;
    tex.needsUpdate = true;
    return tex;
  }, [project]);

  // Apply material to FBX meshes
  useMemo(() => {
    if (!clonedFbx || !frontTexture) return;

    frontTexture.colorSpace = THREE.SRGBColorSpace;
    frontTexture.center.set(0.5, 0.5);
    frontTexture.rotation = Math.PI / 2;
    frontTexture.needsUpdate = true;

    clonedFbx.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.material = new THREE.MeshStandardMaterial({
          map: frontTexture,
          normalMap: normalMap || null,
          normalScale: new THREE.Vector2(0.25, 0.25),
          roughness: isSelected ? 0.35 : 0.55,
          metalness: 0.25,
        });
      }
    });
  }, [clonedFbx, frontTexture, normalMap, isSelected]);

  // Smooth frame loop with OFF-SCREEN CULLING & 180° Y-Rotation Flip
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const currentOffset = offsetRef.current;
    const currentPosIndex = index - currentOffset;
    const distFromCenter = Math.abs(currentPosIndex);

    const isMobile = state.viewport.width < 5.5;
    const cardSpacing = isMobile ? 3.4 : 4.2;

    const targetX = currentPosIndex * cardSpacing;
    const lerpSpeed = Math.min(delta * 12, 1.0);

    // --- PERF OPTIMIZATION: OFF-SCREEN CULLING ---
    // If card is far offscreen (> 2.2 units away), skip heavy lerps & lights
    if (distFromCenter > 2.2) {
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, lerpSpeed);
      groupRef.current.visible = distFromCenter <= 3.2; // Hide completely if > 3.2 away
      return;
    }
    groupRef.current.visible = true;

    const targetZ = -Math.pow(currentPosIndex, 2) * (isMobile ? 0.6 : 0.5);
    const floatOffset = Math.sin(state.clock.elapsedTime * 2 + index) * (isMobile ? 0.06 : 0.1);
    const targetY = isSelected ? 0.15 + floatOffset : floatOffset;

    // 180-degree flip angle calculation
    const flipAngle = isFlipped ? Math.PI : 0;
    const targetRotY = currentPosIndex * -0.22 + flipAngle;
    const targetRotZ = currentPosIndex * -0.03;

    const responsiveAutoScale = isMobile ? autoScale * 0.72 : autoScale;
    const baseScale = isSelected ? responsiveAutoScale * 1.0 : responsiveAutoScale * 0.8;
    const hoverScaleBonus = hovered && isSelected ? responsiveAutoScale * 0.06 : 0;
    const targetScale = baseScale + hoverScaleBonus;

    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, lerpSpeed);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, lerpSpeed);
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, lerpSpeed);

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      isSelected ? 0.05 : 0,
      lerpSpeed
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, Math.min(delta * 9, 1.0));
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRotZ, lerpSpeed);

    groupRef.current.scale.setScalar(
      THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, lerpSpeed)
    );

    // EFFECT 1: SUBTLE 3D PARALLAX (Active only when front-facing)
    if (imageMeshRef.current && isSelected && !isFlipped) {
      const px = state.pointer.x * 0.12;
      const py = state.pointer.y * 0.12;
      imageMeshRef.current.position.x = THREE.MathUtils.lerp(imageMeshRef.current.position.x, px, lerpSpeed);
      imageMeshRef.current.position.y = THREE.MathUtils.lerp(imageMeshRef.current.position.y, 0.06 + py, lerpSpeed);
    }

    // EFFECT 2: MOVING SPECULAR GLARE SWEEP
    if (glareMeshRef.current) {
      const glareSweepX = Math.sin(state.clock.elapsedTime * 1.8 + index) * 0.8 + (hovered ? state.pointer.x * 0.4 : 0);
      glareMeshRef.current.position.x = THREE.MathUtils.lerp(glareMeshRef.current.position.x, glareSweepX, lerpSpeed);
    }

    // EFFECT 3: SINGLE POINT LIGHT LERP (Selected card only)
    if (lightRef.current && isSelected) {
      const targetIntensity = 3.5;
      lightRef.current.intensity = THREE.MathUtils.lerp(lightRef.current.intensity, targetIntensity, lerpSpeed);
    }

    // EFFECT 4: SOFT REFLECTION / GROUND SHADOW
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

    // Ignore click if dragging carousel
    if (typeof window !== 'undefined' && (window as any).__IS_CAROUSEL_DRAGGING__) {
      return;
    }

    if (!isSelected) {
      onSelect();
      return;
    }

    // If card is already flipped, check if user tapped the lower CTA area or top to flip back
    if (isFlipped) {
      // Direct navigation when tapping flipped card
      if (project.url.startsWith('http://') || project.url.startsWith('https://')) {
        window.open(project.url, '_blank', 'noopener,noreferrer');
      } else if (project.url) {
        window.location.href = project.url;
      }
      onToggleFlip();
    } else {
      onToggleFlip();
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

      {/* Front Face Viewport Screenshot Mesh (z = +0.04) */}
      <mesh ref={imageMeshRef} position={[0, 0.06, 0.04]}>
        <planeGeometry args={[1.82, 1.25]} />
        <meshStandardMaterial
          map={screenshotTexture}
          roughness={0.4}
          metalness={0.1}
          toneMapped={false}
        />
      </mesh>

      {/* Back Face Detailed Description Mesh (z = -0.04, facing 180°) */}
      <mesh position={[0, 0, -0.04]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[2.15, 3.35]} />
        <meshStandardMaterial
          map={backTexture || null}
          roughness={0.35}
          metalness={0.2}
        />
      </mesh>

      {/* Moving Specular Glare Sheen Overlay */}
      <mesh ref={glareMeshRef} position={[0, 0.06, 0.07]}>
        <planeGeometry args={[1.9, 2.8]} />
        <meshBasicMaterial
          map={glareTexture}
          transparent
          opacity={hovered ? 0.65 : 0.3}
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

      {/* Dynamic Edge & Rim Light (Rendered ONLY for selected card) */}
      {isSelected && (
        <pointLight
          ref={lightRef}
          position={[0, 1.5, 1.8]}
          intensity={3.5}
          color={project.accentColor || '#38BDF8'}
          distance={6}
        />
      )}
    </group>
  );
}
