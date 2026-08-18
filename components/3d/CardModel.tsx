'use client';

import React, { useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { Project } from '@/data/projects';
import { Info, X, ExternalLink, Sparkles, ShieldCheck } from 'lucide-react';

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

export function CardModel({
  project,
  index,
  totalCards,
  offsetRef,
  isSelected,
  isFlipped,
  onSelect,
  onToggleFlip,
}: CardModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  const accentColor = project.accentColor || '#38BDF8';
  const badgeText = project.badge || 'WEB PROJECT';

  const emblemText = useMemo(() => {
    return (
      project.emblemText ||
      project.name
        .split(' ')
        .map((w) => w[0])
        .join('')
        .slice(0, 3)
        .toUpperCase()
    );
  }, [project]);

  // Smooth frame loop — only lerps Three.js group in world space. No flip logic here.
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const currentOffset = offsetRef.current;
    const currentPosIndex = index - currentOffset;
    const distFromCenter = Math.abs(currentPosIndex);

    const isMobile = state.viewport.width < 5.5;
    const cardSpacing = isMobile ? 3.4 : 4.2;
    const lerpSpeed = Math.min(delta * 12, 1.0);

    const targetX = currentPosIndex * cardSpacing;

    // Off-screen culling — skip expensive lerps for far-away cards
    if (distFromCenter > 2.2) {
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, lerpSpeed);
      groupRef.current.visible = distFromCenter <= 3.2;
      return;
    }
    groupRef.current.visible = true;

    const targetZ = -Math.pow(currentPosIndex, 2) * (isMobile ? 0.6 : 0.5);
    const floatOffset = Math.sin(state.clock.elapsedTime * 2 + index) * (isMobile ? 0.05 : 0.08);
    const targetY = isSelected ? 0.12 + floatOffset : floatOffset;
    const targetRotY = currentPosIndex * -0.22;
    const targetRotZ = currentPosIndex * -0.03;

    const baseScale = isSelected ? 0.95 : 0.78;
    const hoverScaleBonus = hovered && isSelected ? 0.04 : 0;
    const targetScale = baseScale + hoverScaleBonus;

    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, lerpSpeed);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, lerpSpeed);
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, lerpSpeed);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, isSelected ? 0.04 : 0, lerpSpeed);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, lerpSpeed);
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRotZ, lerpSpeed);
    groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, lerpSpeed));
  });

  // Hit-zone 1: Info button — flips, never navigates
  const handleFlipClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (typeof window !== 'undefined' && (window as any).__IS_CAROUSEL_DRAGGING__) return;
    onToggleFlip();
  };

  // Hit-zone 2: Card body — selects or navigates, never flips
  const handleCardBodyClick = (e: React.MouseEvent) => {
    if (typeof window !== 'undefined' && (window as any).__IS_CAROUSEL_DRAGGING__) return;
    if (!isSelected) { onSelect(); return; }
    // Only navigate when front face is showing and card is selected
    if (!isFlipped && project.url) {
      if (project.url.startsWith('http://') || project.url.startsWith('https://')) {
        window.open(project.url, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = project.url;
      }
    }
  };

  return (
    <group ref={groupRef}>
      {/*
       * ARCHITECTURE NOTE:
       * <Html transform> is Drei's DOM overlay — it applies its own CSS matrix
       * for 3D projection. We must NOT add rotateY to this wrapper because it
       * compounds with Drei's matrix and breaks text/layout.
       *
       * The flip is implemented ENTIRELY inside the card's own DOM:
       *   - Both faces are position:absolute, stacked in the same box.
       *   - isFlipped controls opacity + pointer-events on each face.
       *   - A CSS transition on opacity (not rotateY) avoids any 3D transform
       *     conflicts with the parent Drei Html layer.
       *
       * This is the correct approach for an Html-overlay-on-WebGL architecture.
       * A mesh-level rotateY would only work if the text were baked into a texture.
       */}
      <Html
        transform
        distanceFactor={6.5}
        position={[0, 0, 0]}
        style={{ overflow: 'hidden' }}
      >
        <div
          className="relative select-none cursor-pointer"
          style={{ width: 320, height: 460 }}
          onClick={handleCardBodyClick}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* ==================== FRONT FACE ==================== */}
          <div
            className="absolute inset-0 rounded-2xl p-5 border flex flex-col justify-between overflow-hidden shadow-2xl"
            style={{
              borderColor: `${accentColor}70`,
              background: `radial-gradient(ellipse at top, ${accentColor}18 0%, #090d16 75%, #030712 100%)`,
              boxShadow: isSelected
                ? `0 20px 50px -10px ${accentColor}40, inset 0 0 20px ${accentColor}15`
                : '0 10px 30px -10px rgba(0,0,0,0.8)',
              // Flip: hide front when flipped using opacity + pointer-events
              opacity: isFlipped ? 0 : 1,
              pointerEvents: isFlipped ? 'none' : 'auto',
              transition: 'opacity 0.35s ease',
              zIndex: isFlipped ? 0 : 1,
            }}
          >
            {/* Procedural Grid Background */}
            <div
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(${accentColor} 1px, transparent 1px), linear-gradient(to right, ${accentColor}10 1px, transparent 1px), linear-gradient(to bottom, ${accentColor}10 1px, transparent 1px)`,
                backgroundSize: '24px 24px, 12px 12px, 12px 12px',
              }}
            />

            {/* Sci-Fi HUD Bracket Corners */}
            <div className="absolute top-2.5 left-2.5 w-3.5 h-3.5 border-t-2 border-l-2 pointer-events-none" style={{ borderColor: accentColor }} />
            <div className="absolute top-2.5 right-2.5 w-3.5 h-3.5 border-t-2 border-r-2 pointer-events-none" style={{ borderColor: accentColor }} />
            <div className="absolute bottom-2.5 left-2.5 w-3.5 h-3.5 border-b-2 border-l-2 pointer-events-none" style={{ borderColor: accentColor }} />
            <div className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 border-b-2 border-r-2 pointer-events-none" style={{ borderColor: accentColor }} />

            {/* Active Scanline Glow */}
            {isSelected && (
              <div
                className="absolute inset-x-0 h-24 pointer-events-none blur-xl animate-pulse"
                style={{
                  top: '25%',
                  background: `linear-gradient(180deg, transparent 0%, ${accentColor}25 50%, transparent 100%)`,
                }}
              />
            )}

            {/* Header row: badge + info button */}
            <div className="flex items-center justify-between z-10">
              <span
                className="px-3 py-1 text-[10px] font-extrabold tracking-widest rounded-full uppercase border backdrop-blur-md"
                style={{ borderColor: accentColor, color: accentColor, backgroundColor: `${accentColor}20` }}
              >
                {badgeText}
              </span>

              {/* INFO BUTTON — stopPropagation prevents navigation */}
              <button
                onClick={handleFlipClick}
                title="View project details"
                aria-label="View project details"
                className="w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-200 hover:scale-110 active:scale-90"
                style={{
                  borderColor: accentColor,
                  color: accentColor,
                  backgroundColor: 'rgba(15,23,42,0.9)',
                  boxShadow: `0 0 12px ${accentColor}40`,
                }}
              >
                <Info size={15} />
              </button>
            </div>

            {/* Screenshot */}
            <div
              className="relative my-3 rounded-xl overflow-hidden border z-10"
              style={{ height: 210, borderColor: `${accentColor}50` }}
            >
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0 opacity-40 pointer-events-none"
                style={{ background: `linear-gradient(180deg, transparent 60%, ${accentColor}40 100%)` }}
              />
              <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-gray-950/80 text-white border border-gray-800">
                {emblemText}
              </div>
            </div>

            {/* Footer */}
            <div className="flex flex-col space-y-1 z-10">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black tracking-tight text-white uppercase" style={{ textShadow: `0 0 12px ${accentColor}60` }}>
                  {project.name}
                </h3>
                <ExternalLink size={16} style={{ color: accentColor }} className="opacity-80 flex-shrink-0" />
              </div>
              <p className="text-xs font-semibold text-amber-200/90 tracking-wide line-clamp-1">
                {project.subtitle || project.tagline}
              </p>
              <div className="pt-1 flex items-center justify-between text-[10px] font-mono text-gray-400">
                <span className="flex items-center gap-1 text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  ONLINE
                </span>
                <span>Tap body to visit ↗</span>
              </div>
            </div>
          </div>

          {/* ==================== BACK FACE ==================== */}
          {/*
           * Back face: same absolute-inset position as front.
           * NOT rotated — no rotateY here at all.
           * Shown/hidden purely via opacity + pointer-events transition.
           * Text is native DOM left-to-right with zero transform complexity.
           */}
          <div
            className="absolute inset-0 rounded-2xl p-6 border flex flex-col justify-between overflow-hidden shadow-2xl"
            style={{
              borderColor: accentColor,
              background: `radial-gradient(ellipse at bottom, ${accentColor}25 0%, #060912 70%, #020408 100%)`,
              boxShadow: `0 20px 60px -10px ${accentColor}50`,
              // Flip: show back when isFlipped
              opacity: isFlipped ? 1 : 0,
              pointerEvents: isFlipped ? 'auto' : 'none',
              transition: 'opacity 0.35s ease',
              zIndex: isFlipped ? 1 : 0,
            }}
          >
            {/* HUD Bracket Corners */}
            <div className="absolute top-2.5 left-2.5 w-3.5 h-3.5 border-t-2 border-l-2 pointer-events-none" style={{ borderColor: accentColor }} />
            <div className="absolute top-2.5 right-2.5 w-3.5 h-3.5 border-t-2 border-r-2 pointer-events-none" style={{ borderColor: accentColor }} />
            <div className="absolute bottom-2.5 left-2.5 w-3.5 h-3.5 border-b-2 border-l-2 pointer-events-none" style={{ borderColor: accentColor }} />
            <div className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 border-b-2 border-r-2 pointer-events-none" style={{ borderColor: accentColor }} />

            {/* Back Header */}
            <div className="flex items-center justify-between pb-2 border-b border-gray-800">
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} style={{ color: accentColor }} />
                <h3 className="text-xl font-black text-white uppercase tracking-wider">
                  {project.name}
                </h3>
              </div>
              {/* CLOSE BUTTON — stopPropagation prevents body click navigating */}
              <button
                onClick={handleFlipClick}
                title="Flip back"
                aria-label="Flip back"
                className="p-1.5 rounded-full border border-gray-700 bg-gray-900/90 text-gray-300 hover:text-white transition-all"
              >
                <X size={16} />
              </button>
            </div>

            {/* Back Body */}
            <div className="flex flex-col space-y-3 flex-1 my-3 overflow-hidden">
              <p className="text-xs font-bold tracking-wide" style={{ color: accentColor }}>
                {project.tagline}
              </p>
              <p className="text-xs text-gray-300/95 leading-relaxed line-clamp-6">
                {project.description}
              </p>
              <div className="p-3 rounded-xl bg-gray-950/80 border border-gray-800/80 font-mono text-[10px] space-y-1.5">
                <div className="flex items-center justify-between text-gray-400">
                  <span>DEPLOYMENT:</span>
                  <span className="text-emerald-400 font-bold">VERIFIED</span>
                </div>
                <div className="text-gray-300 truncate">
                  <span className="text-gray-500">TARGET: </span>
                  {project.url}
                </div>
              </div>
            </div>

            {/* Visit Button */}
            <a
              href={project.url}
              target={project.url.startsWith('http') ? '_blank' : '_self'}
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-full py-3 rounded-full font-bold text-xs uppercase tracking-wider text-gray-950 flex items-center justify-center gap-2 transition-transform hover:scale-105 active:scale-95 shadow-lg"
              style={{ backgroundColor: accentColor, boxShadow: `0 0 20px ${accentColor}60` }}
            >
              <Sparkles size={14} />
              <span>Visit Live Project ↗</span>
            </a>
          </div>
        </div>
      </Html>
    </group>
  );
}
