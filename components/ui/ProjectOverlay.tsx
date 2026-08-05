'use client';

import React from 'react';
import { Project, PROJECTS } from '@/data/projects';
import { ChevronLeft, ChevronRight, MousePointerClick, MoveHorizontal } from 'lucide-react';

interface OverlayProps {
  activeProject: Project;
  activeIndex: number;
  onSelectIndex: (index: number) => void;
}

export function ProjectOverlay({
  activeProject,
  activeIndex,
  onSelectIndex,
}: OverlayProps) {
  const isFirst = activeIndex === 0;
  const isLast = activeIndex === PROJECTS.length - 1;

  return (
    <div className="absolute inset-0 z-10 flex flex-col justify-between p-6 md:p-12 pointer-events-none select-none">
      {/* Top Metadata Badge & Carousel Navigation */}
      <div className="mt-16 md:mt-20 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-3">
          <span
            className="px-3 py-1 text-[10px] md:text-xs font-bold tracking-widest font-heading rounded-full uppercase border backdrop-blur-md"
            style={{
              borderColor: activeProject.accentColor,
              color: activeProject.accentColor,
              backgroundColor: 'rgba(15, 23, 42, 0.6)',
            }}
          >
            {activeProject.badge}
          </span>
          <span className="text-[10px] md:text-xs font-semibold tracking-widest text-gray-400 uppercase font-heading">
            KEYCARD {String(activeIndex + 1).padStart(2, '0')} / {String(PROJECTS.length).padStart(2, '0')}
          </span>
        </div>

        {/* Carousel Prev / Next Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => !isFirst && onSelectIndex(activeIndex - 1)}
            disabled={isFirst}
            aria-label="Previous card"
            className={`p-2.5 rounded-full border transition-all ${
              isFirst
                ? 'border-gray-800 text-gray-600 cursor-not-allowed'
                : 'border-gray-700 bg-gray-900/60 text-white hover:border-white hover:bg-gray-800'
            }`}
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => !isLast && onSelectIndex(activeIndex + 1)}
            disabled={isLast}
            aria-label="Next card"
            className={`p-2.5 rounded-full border transition-all ${
              isLast
                ? 'border-gray-800 text-gray-600 cursor-not-allowed'
                : 'border-gray-700 bg-gray-900/60 text-white hover:border-white hover:bg-gray-800'
            }`}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Main Content Area (Positioned on the RIGHT side to avoid overlapping 3D card) */}
      <div className="my-auto max-w-lg ml-auto text-right pointer-events-none">
        <div className="space-y-4 flex flex-col items-end">
          <h2
            className="text-5xl sm:text-7xl md:text-8xl font-black font-heading tracking-tight text-white uppercase drop-shadow-2xl leading-none text-right"
            style={{
              textShadow: `0 0 40px ${activeProject.glowColor}`,
            }}
          >
            {activeProject.name}
          </h2>

          <p className="text-base sm:text-lg md:text-xl font-medium text-amber-200/90 tracking-wide font-heading text-right">
            {activeProject.tagline}
          </p>

          <p className="text-xs sm:text-sm text-gray-300/80 leading-relaxed max-w-md text-right">
            {activeProject.description}
          </p>

          {/* Keycard Entry Cue */}
          <div className="pt-2 flex items-center justify-end gap-2 text-xs sm:text-sm font-bold font-heading text-amber-400">
            <span>CLICK / TAP 3D KEYCARD TO ENTER WEBPAGE ↗</span>
            <MousePointerClick size={18} className="animate-bounce" />
          </div>
        </div>
      </div>

      {/* Bottom Scroll Cue */}
      <div className="mb-4 flex items-center justify-between text-xs text-gray-400 font-heading tracking-widest uppercase pointer-events-auto">
        <div className="flex items-center gap-2 text-[11px] font-semibold text-gray-300">
          <MoveHorizontal size={16} className="text-amber-400 animate-pulse" />
          <span>Scroll / Drag horizontally to cycle cards</span>
        </div>

        {/* Carousel Indicators */}
        <div className="flex items-center gap-2">
          {PROJECTS.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => onSelectIndex(idx)}
              aria-label={`Go to ${p.name}`}
              className={`h-1.5 rounded-full transition-all ${
                idx === activeIndex
                  ? 'w-8 bg-amber-400'
                  : 'w-2 bg-gray-700 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
