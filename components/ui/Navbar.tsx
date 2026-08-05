'use client';

import React from 'react';

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-5 md:px-12 md:py-6 flex items-center justify-between pointer-events-auto">
      {/* Brand Logo / Name */}
      <a
        href="#"
        className="group flex items-center gap-3 text-xs md:text-sm font-bold tracking-widest font-heading text-white uppercase hover:text-amber-400 transition-colors"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
        <span>HATAB STUDIOS <span className="text-gray-400 font-normal">/ PORTFOLIO</span></span>
      </a>

      {/* Navigation Links */}
      <nav className="flex items-center gap-6 md:gap-10 text-[11px] md:text-xs font-semibold tracking-widest font-heading text-gray-300 uppercase">
        <a
          href="#carousel"
          className="hover:text-white transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-amber-400 hover:after:w-full after:transition-all"
        >
          Projects
        </a>
        <a
          href="#about"
          className="hover:text-white transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-amber-400 hover:after:w-full after:transition-all"
        >
          About
        </a>
        <a
          href="#contact"
          className="hover:text-white transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-amber-400 hover:after:w-full after:transition-all"
        >
          Contact
        </a>
      </nav>
    </header>
  );
}
