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
  containerRef?: React.RefObject<HTMLDivElement | null>;
}

function CarouselController({
  activeIndex,
  onActiveChange,
  containerRef,
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

  // Touch and mouse drag physics with smooth mobile gestures
  useEffect(() => {
    const container = containerRef?.current;
    if (!container) return;

    let isHorizontalSwipe: boolean | null = null;

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
      // Ignore clicks on buttons/nav/links
      if ((e.target as HTMLElement)?.closest('button, a, nav')) return;
      isDraggingRef.current = true;
      isHorizontalSwipe = null;
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

      // Determine swipe direction on first significant movement
      if (isHorizontalSwipe === null && Math.hypot(deltaX, deltaY) > 6) {
        isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY) * 1.2;
      }

      // If vertical scroll intent, release drag entirely so page scrolls normally
      if (isHorizontalSwipe === false) {
        isDraggingRef.current = false;
        return;
      }

      // Only preventDefault on confirmed horizontal swipe (touch)
      if (isHorizontalSwipe && 'touches' in e && e.cancelable) {
        e.preventDefault();
      }

      // Mark as dragging to prevent accidental card click
      if (Math.abs(deltaX) > 4) {
        (window as any).__IS_CAROUSEL_DRAGGING__ = true;
      }

      // High sensitivity drag
      const sensitivity = window.innerWidth < 768 ? 140 : 280;
      const deltaOffset = -deltaX / sensitivity;
      let newTarget = dragStartOffsetRef.current + deltaOffset;

      // Elastic overshoot at boundaries
      const maxIndex = PROJECTS.length - 1;
      if (newTarget < 0) newTarget *= 0.25;
      if (newTarget > maxIndex) newTarget = maxIndex + (newTarget - maxIndex) * 0.25;

      targetOffsetRef.current = newTarget;
    };

    const handlePointerUp = () => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      isHorizontalSwipe = null;

      setTimeout(() => {
        (window as any).__IS_CAROUSEL_DRAGGING__ = false;
      }, 80);

      // Snap to nearest card index
      const maxIndex = PROJECTS.length - 1;
      const snapped = Math.max(0, Math.min(maxIndex, Math.round(targetOffsetRef.current)));
      targetOffsetRef.current = snapped;
      onActiveChange(snapped);
    };

    const handleWheel = (e: WheelEvent) => {
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(delta) > 2) {
        targetOffsetRef.current = Math.max(
          0,
          Math.min(PROJECTS.length - 1, targetOffsetRef.current + delta * 0.003)
        );
        const snapped = Math.round(targetOffsetRef.current);
        onActiveChange(snapped);
      }
    };

    // Scope listeners to the carousel container only (not window)
    container.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);

    container.addEventListener('touchstart', handlePointerDown, { passive: true });
    container.addEventListener('touchmove', handlePointerMove, { passive: false });
    container.addEventListener('touchend', handlePointerUp);
    container.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      container.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);

      container.removeEventListener('touchstart', handlePointerDown);
      container.removeEventListener('touchmove', handlePointerMove);
      container.removeEventListener('touchend', handlePointerUp);
      container.removeEventListener('wheel', handleWheel);
    };
  }, [onActiveChange, containerRef]);

  // Frame loop interpolates offsetRef directly in WebGL (Zero 60FPS React state lag)
  useFrame((_, delta) => {
    const diff = targetOffsetRef.current - offsetRef.current;
    if (Math.abs(diff) > 0.0005) {
      offsetRef.current = THREE.MathUtils.lerp(offsetRef.current, targetOffsetRef.current, Math.min(delta * 12, 1.0));

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
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="w-full h-full relative cursor-grab active:cursor-grabbing select-none">
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
          <CarouselController activeIndex={activeIndex} onActiveChange={onActiveChange} containerRef={containerRef} />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
