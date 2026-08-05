'use client';

import React from 'react';

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4 sm:px-6 md:px-12 md:py-6 flex items-center justify-between pointer-events-auto bg-gray-950/40 backdrop-blur-sm md:bg-transparent">
      {/* Brand Logo / Title */}
      <a
        href="#"
        className="group flex items-center gap-2.5 text-xs sm:text-sm font-bold tracking-widest font-heading text-white uppercase hover:text-amber-400 transition-colors"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse shrink-0" />
        <span className="whitespace-nowrap">HatabStudios Portfolio</span>
      </a>

      {/* Navigation Links — Desktop Only (Hidden on Mobile to Prevent Header Collision) */}
      <nav className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-widest font-heading text-gray-300 uppercase">
        <a
          href="#carousel"
          className="hover:text-white transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-amber-400 hover:after:w-full after:transition-all"
        >
          Projects
        </a>
        <a
          href="#about"
          className="hover:text-white transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-amber-400 hover:after:w-full after:transition-all"
        >
          About
        </a>
        <a
          href="#contact"
          className="hover:text-white transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-amber-400 hover:after:w-full after:transition-all"
        >
          Contact
        </a>
      </nav>
    </header>
  );
}
