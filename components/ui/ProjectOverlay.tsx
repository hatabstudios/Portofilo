'use client';

import React from 'react';
import { Project, PROJECTS } from '@/data/projects';
import { ChevronLeft, ChevronRight, MousePointerClick, MoveHorizontal } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

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
  onOpenModal,
}: OverlayProps) {
  const isFirst = activeIndex === 0;
  const isLast = activeIndex === PROJECTS.length - 1;
  const isRightAligned = activeProject.align === 'right';
  const isExternalUrl = activeProject.url.startsWith('http://') || activeProject.url.startsWith('https://');

  const handleActionClick = (e: React.MouseEvent) => {
    if (!isExternalUrl) {
      e.preventDefault();
      window.location.href = activeProject.url;
    }
  };

  const accentColor = activeProject.accentColor || '#38BDF8';
  const glowColor = activeProject.glowColor || 'rgba(56, 189, 248, 0.45)';
  const badgeText = activeProject.badge || 'WEB PROJECT';

  return (
    <div className="absolute inset-0 z-10 flex flex-col justify-between p-4 sm:p-6 md:p-12 pointer-events-none select-none">
      {/* Top Controls & Active Indicator (Positioned cleanly below header on mobile) */}
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

      {/* Main Content Area: Styled in isolated glassmorphic card so text never overlaps 3D background cards */}
      <div className="mt-auto md:my-auto w-full flex items-center justify-between">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProject.id}
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.98 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className={`pointer-events-auto p-5 sm:p-7 rounded-2xl bg-gray-950/90 backdrop-blur-xl border border-gray-800/90 shadow-2xl w-full max-w-sm sm:max-w-md ${
              isRightAligned
                ? 'ml-auto mr-0 text-right items-end'
                : 'mr-auto ml-0 text-left items-start'
            } flex flex-col space-y-2.5 sm:space-y-3`}
            style={{
              boxShadow: `0 15px 40px -10px ${glowColor}`,
            }}
          >
            <h2
              className="text-2xl sm:text-4xl md:text-5xl font-black font-heading tracking-tight text-white uppercase leading-none drop-shadow-md"
              style={{
                textShadow: `0 0 20px ${glowColor}`,
              }}
            >
              {activeProject.name}
            </h2>

            <p className="text-xs sm:text-sm font-semibold font-heading text-amber-200/90 tracking-wide">
              {activeProject.tagline}
            </p>

            <p className="text-xs sm:text-sm text-gray-300/90 leading-relaxed line-clamp-3">
              {activeProject.description}
            </p>

            {/* Keycard Entry Cue & Interactive CTA Button */}
            <div className={`pt-2 flex flex-col sm:flex-row items-center gap-2.5 w-full ${
              isRightAligned ? 'justify-end' : 'justify-start'
            }`}>
              <a
                href={activeProject.url}
                target={isExternalUrl ? '_blank' : '_self'}
                rel={isExternalUrl ? 'noopener noreferrer' : undefined}
                onClick={handleActionClick}
                data-clickable="true"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full font-bold font-heading text-xs uppercase tracking-wider text-gray-950 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg group cursor-pointer w-full sm:w-auto"
                style={{
                  backgroundColor: accentColor,
                  boxShadow: `0 0 20px ${glowColor}`,
                }}
              >
                <MousePointerClick size={15} className="animate-bounce group-hover:animate-none" />
                <span>{isExternalUrl ? `Visit ${activeProject.name} ↗` : `Explore ${activeProject.name} ↗`}</span>
              </a>
              <span className="text-[10px] font-semibold text-gray-400 font-heading">
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
