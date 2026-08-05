'use client';

import React from 'react';
import { Project, PROJECTS } from '@/data/projects';
import { ChevronLeft, ChevronRight, MoveHorizontal } from 'lucide-react';

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
      {/* Top Controls & Active Indicator */}
      <div className="mt-16 md:mt-20 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-3">
          <span className="text-xs md:text-sm font-bold tracking-widest text-gray-300 uppercase font-heading">
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

      {/* Bottom Carousel Indicator Cue */}
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
