'use client';

import React, { Suspense, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Preload } from '@react-three/drei';
import { PROJECTS } from '@/data/projects';
import { CardModel } from './CardModel';
import * as THREE from 'three';

interface SceneProps {
  activeIndex: number;
  onActiveChange: (index: number) => void;
}

function CarouselController({
  activeIndex,
  onActiveChange,
}: SceneProps) {
  const offsetRef = useRef(activeIndex);
  const targetOffsetRef = useRef(activeIndex);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const dragStartOffsetRef = useRef(activeIndex);

  // Sync external index change if updated by dots / buttons
  useEffect(() => {
    targetOffsetRef.current = activeIndex;
  }, [activeIndex]);

  // Touch and mouse drag physics with mobile gestures
  useEffect(() => {
    const getClientX = (e: MouseEvent | TouchEvent): number => {
      if ('touches' in e && e.touches.length > 0) {
        return e.touches[0].clientX;
      }
      return (e as MouseEvent).clientX;
    };

    const getClientY = (e: MouseEvent | TouchEvent): number => {
      if ('touches' in e && e.touches.length > 0) {
        return e.touches[0].clientY;
      }
      return (e as MouseEvent).clientY;
    };

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      // Ignore clicks on buttons/nav
      if ((e.target as HTMLElement)?.closest('button, a')) return;
      isDraggingRef.current = true;
      startXRef.current = getClientX(e);
      startYRef.current = getClientY(e);
      dragStartOffsetRef.current = targetOffsetRef.current;
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDraggingRef.current) return;
      const currentX = getClientX(e);
      const currentY = getClientY(e);
      const deltaX = currentX - startXRef.current;
      const deltaY = currentY - startYRef.current;

      // Mark dragging gesture to prevent accidental site opening
      if (Math.hypot(deltaX, deltaY) > 6) {
        (window as any).__IS_CAROUSEL_DRAGGING__ = true;
      }

      // Responsive drag sensitivity scaling
      const sensitivity = window.innerWidth < 768 ? 260 : 380;
      const deltaOffset = -deltaX / sensitivity;
      let newTarget = dragStartOffsetRef.current + deltaOffset;

      const maxIndex = PROJECTS.length - 1;
      targetOffsetRef.current = Math.max(0, Math.min(maxIndex, newTarget));
    };

    const handlePointerUp = () => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;

      setTimeout(() => {
        (window as any).__IS_CAROUSEL_DRAGGING__ = false;
      }, 120);

      // Snap to nearest card index
      const maxIndex = PROJECTS.length - 1;
      const snapped = Math.max(0, Math.min(maxIndex, Math.round(targetOffsetRef.current)));
      targetOffsetRef.current = snapped;
      onActiveChange(snapped);
    };

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        const delta = e.deltaX * 0.0015;
        targetOffsetRef.current = Math.max(
          0,
          Math.min(PROJECTS.length - 1, targetOffsetRef.current + delta)
        );
        const snapped = Math.round(targetOffsetRef.current);
        onActiveChange(snapped);
      }
    };

    // Attach mouse & touch listeners for desktop & mobile
    window.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);

    window.addEventListener('touchstart', handlePointerDown, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchend', handlePointerUp);
    window.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      window.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);

      window.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [onActiveChange]);

  // Frame loop interpolates offsetRef directly in WebGL (Zero 60FPS React state lag)
  useFrame((_, delta) => {
    const diff = targetOffsetRef.current - offsetRef.current;
    if (Math.abs(diff) > 0.0005) {
      offsetRef.current = THREE.MathUtils.lerp(offsetRef.current, targetOffsetRef.current, delta * 9);

      // Check if nearest integer index changed
      const nearest = Math.max(0, Math.min(PROJECTS.length - 1, Math.round(offsetRef.current)));
      if (nearest !== activeIndex && !isDraggingRef.current) {
        onActiveChange(nearest);
      }
    }
  });

  return (
    <group position={[0, -0.2, 0]}>
      {PROJECTS.map((project, idx) => {
        const isSelected = activeIndex === idx;
        return (
          <CardModel
            key={project.id}
            project={project}
            index={idx}
            totalCards={PROJECTS.length}
            offsetRef={offsetRef}
            isSelected={isSelected}
            onSelect={() => {
              targetOffsetRef.current = idx;
              onActiveChange(idx);
            }}
          />
        );
      })}
    </group>
  );
}

function LoaderFallback() {
  return (
    <mesh>
      <boxGeometry args={[1.5, 2.2, 0.1]} />
      <meshStandardMaterial color="#1e293b" wireframe />
    </mesh>
  );
}

export function CiaoCarousel3DScene({
  activeIndex,
  onActiveChange,
}: SceneProps) {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing touch-none select-none">
      <Canvas
        camera={{ position: [0, 0, 7.2], fov: 44 }}
        dpr={[1, 2]} // High Performance DPI scaling for mobile
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight
          position={[5, 8, 6]}
          intensity={2.0}
        />
        <directionalLight position={[-5, -2, -4]} intensity={0.5} color="#94a3b8" />

        {/* Dynamic Studio Environment Reflections */}
        <Environment preset="city" />

        <Suspense fallback={<LoaderFallback />}>
          <CarouselController activeIndex={activeIndex} onActiveChange={onActiveChange} />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
