'use client';

import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Preload } from '@react-three/drei';
import { Project, PROJECTS } from '@/data/projects';
import { CardModel } from './CardModel';
import * as THREE from 'three';

interface SceneProps {
  activeIndex: number;
  onActiveChange: (index: number) => void;
  containerRef?: React.RefObject<HTMLDivElement | null>;
  onOpenModal?: (project: Project) => void;
}

function CarouselController({
  activeIndex,
  onActiveChange,
  containerRef,
  onOpenModal,
}: SceneProps) {
  const offsetRef = useRef(activeIndex);
  const targetOffsetRef = useRef(activeIndex);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const dragStartOffsetRef = useRef(activeIndex);

  // Single card flip state
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  // Reset card flip whenever active index changes (drag, arrow, or dot click)
  useEffect(() => {
    targetOffsetRef.current = activeIndex;
    setFlippedIndex(null);
  }, [activeIndex]);

  // Touch and mouse drag physics with smooth mobile gestures
  useEffect(() => {
    const container = containerRef?.current;
    if (!container) return;

    let isHorizontalSwipe: boolean | null = null;
    let isDragThresholdExceeded = false;

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
      if ((e.target as HTMLElement)?.closest('button, a, nav, [data-clickable]')) return;
      isDraggingRef.current = true;
      isDragThresholdExceeded = false;
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
      const dist = Math.hypot(deltaX, deltaY);

      if (isHorizontalSwipe === null && dist > 8) {
        isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY) * 1.2;
      }

      if (isHorizontalSwipe === false) {
        isDraggingRef.current = false;
        return;
      }

      const dragThreshold = window.innerWidth < 768 ? 8 : 12;
      if (!isDragThresholdExceeded) {
        if (dist > dragThreshold) {
          isDragThresholdExceeded = true;
          (window as any).__IS_CAROUSEL_DRAGGING__ = true;
        } else {
          return;
        }
      }

      if (isHorizontalSwipe && 'touches' in e && e.cancelable) {
        e.preventDefault();
      }

      const sensitivity = window.innerWidth < 768 ? 140 : 280;
      const deltaOffset = -deltaX / sensitivity;
      let newTarget = dragStartOffsetRef.current + deltaOffset;

      const maxIndex = PROJECTS.length - 1;
      if (newTarget < 0) newTarget *= 0.25;
      if (newTarget > maxIndex) newTarget = maxIndex + (newTarget - maxIndex) * 0.25;

      targetOffsetRef.current = newTarget;
    };

    const handlePointerUp = () => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      isHorizontalSwipe = null;

      if (!isDragThresholdExceeded) {
        (window as any).__IS_CAROUSEL_DRAGGING__ = false;
        return;
      }

      setTimeout(() => {
        (window as any).__IS_CAROUSEL_DRAGGING__ = false;
      }, 50);

      const maxIndex = PROJECTS.length - 1;
      const snapped = Math.max(0, Math.min(maxIndex, Math.round(targetOffsetRef.current)));
      targetOffsetRef.current = snapped;
      onActiveChange(snapped);
      setFlippedIndex(null);
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
        setFlippedIndex(null);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.tagName === 'INPUT' || (e.target as HTMLElement)?.tagName === 'TEXTAREA') return;
      if (['ArrowLeft', 'a', 'A'].includes(e.key)) {
        const next = Math.max(0, Math.round(targetOffsetRef.current) - 1);
        targetOffsetRef.current = next;
        onActiveChange(next);
        setFlippedIndex(null);
      } else if (['ArrowRight', 'd', 'D'].includes(e.key)) {
        const next = Math.min(PROJECTS.length - 1, Math.round(targetOffsetRef.current) + 1);
        targetOffsetRef.current = next;
        onActiveChange(next);
        setFlippedIndex(null);
      }
    };

    container.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);

    container.addEventListener('touchstart', handlePointerDown, { passive: true });
    container.addEventListener('touchmove', handlePointerMove, { passive: false });
    container.addEventListener('touchend', handlePointerUp);
    container.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      container.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);

      container.removeEventListener('touchstart', handlePointerDown);
      container.removeEventListener('touchmove', handlePointerMove);
      container.removeEventListener('touchend', handlePointerUp);
      container.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onActiveChange, containerRef]);

  // Interpolate continuous scroll offset in WebGL loop
  useFrame((_, delta) => {
    const diff = targetOffsetRef.current - offsetRef.current;
    if (Math.abs(diff) > 0.0005) {
      offsetRef.current = THREE.MathUtils.lerp(offsetRef.current, targetOffsetRef.current, Math.min(delta * 12, 1.0));

      const nearest = Math.max(0, Math.min(PROJECTS.length - 1, Math.round(offsetRef.current)));
      if (nearest !== activeIndex && !isDraggingRef.current) {
        onActiveChange(nearest);
        setFlippedIndex(null);
      }
    }
  });

  return (
    <group position={[0, -0.2, 0]}>
      {PROJECTS.map((project, idx) => {
        const isSelected = activeIndex === idx;
        const isFlipped = flippedIndex === idx;
        return (
          <CardModel
            key={project.id}
            project={project}
            index={idx}
            totalCards={PROJECTS.length}
            offsetRef={offsetRef}
            isSelected={isSelected}
            isFlipped={isFlipped}
            onSelect={() => {
              targetOffsetRef.current = idx;
              onActiveChange(idx);
              setFlippedIndex(null);
            }}
            onToggleFlip={() => {
              setFlippedIndex((prev) => (prev === idx ? null : idx));
            }}
            onOpenModal={onOpenModal}
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
  onOpenModal,
}: SceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="w-full h-full relative cursor-grab active:cursor-grabbing select-none">
      <Canvas
        camera={{ position: [0, 0, 7.2], fov: 44 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[5, 8, 6]} intensity={2.0} />
        <directionalLight position={[-5, -2, -4]} intensity={0.5} color="#94a3b8" />

        <Environment preset="city" />

        <Suspense fallback={<LoaderFallback />}>
          <CarouselController
            activeIndex={activeIndex}
            onActiveChange={onActiveChange}
            containerRef={containerRef}
            onOpenModal={onOpenModal}
          />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
