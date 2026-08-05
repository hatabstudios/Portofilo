'use client';

import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, Preload } from '@react-three/drei';
import { PROJECTS, Project } from '@/data/projects';
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
  const [carouselOffset, setCarouselOffset] = useState(activeIndex);
  const offsetRef = useRef(activeIndex);
  const targetOffsetRef = useRef(activeIndex);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const dragStartOffsetRef = useRef(activeIndex);

  // Sync external index change if updated by dots / buttons
  useEffect(() => {
    targetOffsetRef.current = activeIndex;
  }, [activeIndex]);

  // Handle Drag & Touch physics
  useEffect(() => {
    const handlePointerDown = (e: PointerEvent) => {
      // Don't drag if clicking buttons or nav
      if ((e.target as HTMLElement)?.closest('button, a')) return;
      isDraggingRef.current = true;
      startXRef.current = e.clientX;
      dragStartOffsetRef.current = targetOffsetRef.current;
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - startXRef.current;
      // Sensitivity scaling
      const deltaOffset = -deltaX / 380;
      let newTarget = dragStartOffsetRef.current + deltaOffset;
      // Clamp bounds with elastic pull resistance
      const maxIndex = PROJECTS.length - 1;
      if (newTarget < 0) newTarget = newTarget * 0.3;
      if (newTarget > maxIndex) maxIndex + (newTarget - maxIndex) * 0.3;

      targetOffsetRef.current = newTarget;
    };

    const handlePointerUp = () => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      // Snap to nearest integer index
      const maxIndex = PROJECTS.length - 1;
      const snapped = Math.max(0, Math.min(maxIndex, Math.round(targetOffsetRef.current)));
      targetOffsetRef.current = snapped;
      onActiveChange(snapped);
    };

    const handleWheel = (e: WheelEvent) => {
      // Wheel horizontal cycling
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

    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [onActiveChange]);

  // Frame loop smoothly interpolates currentOffset -> targetOffset (inertia)
  useFrame((_, delta) => {
    const diff = targetOffsetRef.current - offsetRef.current;
    if (Math.abs(diff) > 0.001) {
      offsetRef.current = THREE.MathUtils.lerp(offsetRef.current, targetOffsetRef.current, delta * 7);
      setCarouselOffset(offsetRef.current);

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
        const isSelected = Math.round(carouselOffset) === idx;
        return (
          <CardModel
            key={project.id}
            project={project}
            index={idx}
            totalCards={PROJECTS.length}
            carouselOffset={carouselOffset}
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
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas
        shadows
        camera={{ position: [0, 0, 7.2], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight
          position={[5, 8, 6]}
          intensity={2.2}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <directionalLight position={[-5, -2, -4]} intensity={0.6} color="#94a3b8" />

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
