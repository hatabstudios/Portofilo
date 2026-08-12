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

      {/* Main Content Area: On mobile positioned at bottom so 3D card is fully visible. On desktop aligned left/right beside the card */}
      <div className="mt-auto md:my-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProject.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className={`pointer-events-none p-3 sm:p-4 md:p-0 rounded-xl md:rounded-none bg-gray-950/85 md:bg-transparent backdrop-blur-md md:backdrop-blur-none border border-gray-800/60 md:border-none shadow-xl md:shadow-none w-full max-w-none md:max-w-md ${
              isRightAligned
                ? 'text-center md:ml-auto md:mr-0 md:text-right items-center md:items-end'
                : 'text-center md:mr-auto md:ml-0 md:text-left items-center md:items-start'
            } flex flex-col space-y-1.5 md:space-y-3`}
          >
            <h2
              className="text-2xl sm:text-3xl md:text-8xl font-black font-heading tracking-tight text-white uppercase drop-shadow-2xl leading-none"
              style={{
                textShadow: `0 0 35px ${activeProject.glowColor}`,
              }}
            >
              {activeProject.name}
            </h2>

            <p className="text-[11px] sm:text-xs md:text-xl font-medium text-amber-200/90 tracking-wide font-heading">
              {activeProject.tagline}
            </p>

            <p className="hidden md:block text-sm text-gray-300/80 leading-relaxed">
              {activeProject.description}
            </p>

            {/* Keycard Entry Cue & Interactive CTA Button */}
            <div className={`pt-2 md:pt-4 flex flex-col sm:flex-row items-center gap-3 pointer-events-auto ${
              isRightAligned ? 'md:justify-end' : 'md:justify-start'
            }`}>
              <a
                href={activeProject.url}
                target="_blank"
                rel="noopener noreferrer"
                data-clickable="true"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold font-heading text-xs sm:text-sm uppercase tracking-wider text-gray-950 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg group cursor-pointer"
                style={{
                  backgroundColor: activeProject.accentColor,
                  boxShadow: `0 0 25px ${activeProject.glowColor}`,
                }}
              >
                <MousePointerClick size={16} className="animate-bounce group-hover:animate-none" />
                <span>Visit {activeProject.name} ↗</span>
              </a>
              <span className="text-[10px] sm:text-xs font-semibold text-gray-400 font-heading tracking-wide">
                (or click 3D card)
              </span>
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
