'use client';

import React from 'react';
import { Project, PROJECTS } from '@/data/projects';
import { ChevronLeft, ChevronRight, MousePointerClick, MoveHorizontal } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

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
  const isRightAligned = activeProject.align === 'right';

  return (
    <div className="absolute inset-0 z-10 flex flex-col justify-between p-4 sm:p-6 md:p-12 pointer-events-none select-none">
      {/* Top Controls & Active Indicator (Positioned cleanly below header on mobile) */}
      <div className="mt-16 sm:mt-20 md:mt-24 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-2 sm:gap-3">
          <span
            className="px-2.5 py-1 text-[9px] sm:text-[10px] md:text-xs font-bold tracking-widest font-heading rounded-full uppercase border backdrop-blur-md"
            style={{
              borderColor: activeProject.accentColor,
              color: activeProject.accentColor,
              backgroundColor: 'rgba(15, 23, 42, 0.8)',
            }}
          >
            {activeProject.badge}
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

      {/* Main Content Area: On mobile, text is rendered in a clean glass box below/above the 3D card. On desktop, text is aligned left or right */}
      <div className="my-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProject.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={`pointer-events-none p-4 sm:p-6 rounded-2xl bg-gray-950/80 md:bg-transparent backdrop-blur-lg md:backdrop-blur-none border border-gray-800/80 md:border-none shadow-2xl md:shadow-none w-full max-w-sm sm:max-w-md md:max-w-md ${
              isRightAligned
                ? 'mx-auto md:ml-auto md:mr-0 text-center md:text-right items-center md:items-end'
                : 'mx-auto md:mr-auto md:ml-0 text-center md:text-left items-center md:items-start'
            } flex flex-col space-y-2.5 sm:space-y-3`}
          >
            <h2
              className="text-4xl sm:text-6xl md:text-8xl font-black font-heading tracking-tight text-white uppercase drop-shadow-2xl leading-none"
              style={{
                textShadow: `0 0 35px ${activeProject.glowColor}`,
              }}
            >
              {activeProject.name}
            </h2>

            <p className="text-xs sm:text-base md:text-xl font-medium text-amber-200/90 tracking-wide font-heading">
              {activeProject.tagline}
            </p>

            <p className="text-[11px] sm:text-xs md:text-sm text-gray-300/80 leading-relaxed">
              {activeProject.description}
            </p>

            {/* Keycard Entry Cue */}
            <div className="pt-2 flex items-center justify-center md:justify-start gap-2 text-[11px] sm:text-xs md:text-sm font-bold font-heading text-amber-400">
              <MousePointerClick size={16} className="animate-bounce" />
              <span>TAP KEYCARD TO ENTER STORE ↗</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Carousel Indicator Cue */}
      <div className="mb-2 sm:mb-4 flex items-center justify-between text-xs text-gray-400 font-heading tracking-widest uppercase pointer-events-auto">
        <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-semibold text-gray-300">
          <MoveHorizontal size={14} className="text-amber-400 animate-pulse" />
          <span>Swipe or drag cards</span>
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
