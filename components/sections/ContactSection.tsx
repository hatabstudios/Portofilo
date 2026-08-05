'use client';

import React from 'react';
import { Mail, ArrowUpRight, Globe } from 'lucide-react';

export function ContactSection() {
  return (
    <section id="contact" className="relative z-20 py-24 px-6 md:px-12 bg-gray-950 border-t border-gray-900">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <span className="text-xs font-bold tracking-widest uppercase text-amber-400 font-heading">
              HAVE A DESIGN OR SPEC READY?
            </span>
            <h2 className="text-4xl sm:text-6xl font-black font-heading tracking-tight text-white uppercase">
              LET'S BUILD YOUR SITE
            </h2>
            <p className="text-gray-400 max-w-xl text-base sm:text-lg">
              Send me your designs, logos, and requirements, and I'll code your web application with clean, high-performance engineering.
            </p>
          </div>

          <a
            href="mailto:hatabstudios@gmail.com"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-gray-950 font-bold font-heading text-sm tracking-widest uppercase hover:bg-amber-400 transition-colors w-fit"
          >
            <Mail size={18} />
            <span>hatabstudios@gmail.com</span>
            <ArrowUpRight size={18} />
          </a>
        </div>

        {/* Social / Direct Links */}
        <div className="pt-8 border-t border-gray-900 flex flex-wrap items-center gap-4">
          <a
            href="https://majarrah.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-xl bg-gray-900 border border-gray-800 text-xs font-bold font-heading tracking-widest text-gray-300 hover:text-white hover:border-amber-500/50 transition-all flex items-center gap-2"
          >
            <Globe size={16} className="text-amber-400" />
            <span>MAJARRAH SITE</span>
            <ArrowUpRight size={14} />
          </a>
          <a
            href="https://aasifaa.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-xl bg-gray-900 border border-gray-800 text-xs font-bold font-heading tracking-widest text-gray-300 hover:text-white hover:border-indigo-500/50 transition-all flex items-center gap-2"
          >
            <Globe size={16} className="text-indigo-400" />
            <span>AASIFA SITE</span>
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
