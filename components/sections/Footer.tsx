'use client';

import React from 'react';
import { ArrowUp } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-20 py-8 px-6 md:px-12 bg-gray-950 border-t border-gray-900 text-xs font-heading text-gray-500 uppercase tracking-widest">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          © {new Date().getFullYear()} PORTFOLIO. ALL RIGHTS RESERVED.
        </div>

        <div className="flex items-center gap-6">
          <span>CAIRO, EGYPT</span>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-gray-400 hover:text-amber-400 transition-colors cursor-pointer"
          >
            <span>BACK TO TOP</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
