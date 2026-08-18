'use client';

import React from 'react';
import { Project, PROJECTS } from '@/data/projects';
import { ChevronLeft, ChevronRight, MoveHorizontal, RotateCw } from 'lucide-react';

interface OverlayProps {
  activeProject: Project;
  activeIndex: number;
  onSelectIndex: (index: number) => void;
  onOpenModal: (project: Project) => void;
}

export function ProjectOverlay({
  activeProject,
  activeIndex,
  onSelectIndex,
}: OverlayProps) {
  const isFirst = activeIndex === 0;
  const isLast = activeIndex === PROJECTS.length - 1;
  const accentColor = activeProject.accentColor || '#38BDF8';
  const badgeText = activeProject.badge || 'WEB PROJECT';

  return (
    <div className="absolute inset-0 z-10 flex flex-col justify-between p-4 sm:p-6 md:p-12 pointer-events-none select-none">
      {/* Top Controls & Active Indicator */}
      <div className="mt-16 sm:mt-20 md:mt-24 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-2 sm:gap-3">
          <span
            className="px-2.5 py-1 text-[9px] sm:text-[10px] md:text-xs font-bold tracking-widest font-heading rounded-full uppercase border backdrop-blur-md"
            style={{
              borderColor: accentColor,
              color: accentColor,
              backgroundColor: 'rgba(15, 23, 42, 0.8)',
            }}
          >
            {badgeText}
          </span>
          <span className="text-[9px] sm:text-[10px] md:text-xs font-semibold tracking-widest text-gray-400 uppercase font-heading">
            {String(activeIndex + 1).padStart(2, '0')} / {String(PROJECTS.length).padStart(2, '0')}
          </span>
        </div>

        {/* Carousel Prev / Next Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => !isFirst && onSelectIndex(activeIndex - 1)}
            disabled={isFirst}
            aria-label="Previous card"
            className={`p-2 sm:p-2.5 rounded-full border transition-all ${
              isFirst
                ? 'border-gray-800 text-gray-600 cursor-not-allowed'
                : 'border-gray-700 bg-gray-900/80 text-white hover:border-white hover:bg-gray-800'
            }`}
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => !isLast && onSelectIndex(activeIndex + 1)}
            disabled={isLast}
            aria-label="Next card"
            className={`p-2 sm:p-2.5 rounded-full border transition-all ${
              isLast
                ? 'border-gray-800 text-gray-600 cursor-not-allowed'
                : 'border-gray-700 bg-gray-900/80 text-white hover:border-white hover:bg-gray-800'
            }`}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Bottom Carousel Indicator Cue */}
      <div className="mt-auto mb-2 sm:mb-4 flex items-center justify-between text-xs text-gray-400 font-heading tracking-widest uppercase pointer-events-auto">
        <div className="flex items-center gap-3 text-[10px] sm:text-[11px] font-semibold text-gray-300">
          <div className="flex items-center gap-1.5">
            <RotateCw size={13} className="text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Tap card to flip ↺</span>
          </div>
          <span className="text-gray-600">|</span>
          <div className="flex items-center gap-1.5">
            <MoveHorizontal size={13} className="text-amber-400 animate-pulse" />
            <span>Drag to scroll</span>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {PROJECTS.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => onSelectIndex(idx)}
              aria-label={`Go to ${p.name}`}
              className={`h-1 sm:h-1.5 rounded-full transition-all ${
                idx === activeIndex
                  ? 'w-6 sm:w-8 bg-amber-400'
                  : 'w-1.5 sm:w-2 bg-gray-700 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
