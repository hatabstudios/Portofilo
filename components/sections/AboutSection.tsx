'use client';

import React from 'react';
import { Code2, LayoutTemplate, Zap } from 'lucide-react';

export function AboutSection() {
  return (
    <section id="about" className="relative z-20 py-24 px-6 md:px-12 bg-gray-950/80 border-t border-gray-900">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="space-y-4 text-center md:text-left">
          <span className="text-xs font-bold tracking-widest uppercase text-amber-400 font-heading">
            ABOUT & WORKFLOW
          </span>
          <h2 className="text-4xl sm:text-5xl font-black font-heading tracking-tight text-white uppercase">
            TURNING YOUR DESIGNS & SPECS INTO PRODUCTION CODE
          </h2>
          <p className="text-gray-400 max-w-2xl text-base sm:text-lg leading-relaxed">
            I focus 100% on web development and coding. You provide the designs, logos, images, and specifications—I build the website or web application to match your exact vision.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-gray-900/60 border border-gray-800 space-y-4 hover:border-amber-500/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Code2 size={24} />
            </div>
            <h3 className="text-xl font-bold font-heading text-white uppercase">
              Full-Stack & Frontend Code
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Writing clean, structured, production-ready code with Next.js, React, TypeScript, and Tailwind CSS.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-gray-900/60 border border-gray-800 space-y-4 hover:border-indigo-500/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <LayoutTemplate size={24} />
            </div>
            <h3 className="text-xl font-bold font-heading text-white uppercase">
              Design-to-Code Precision
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Give me your Figma files, mockups, or wireframes. I build pixel-perfect responsive layouts that look and feel great.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-gray-900/60 border border-gray-800 space-y-4 hover:border-amber-500/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Zap size={24} />
            </div>
            <h3 className="text-xl font-bold font-heading text-white uppercase">
              Asset & Logo Integration
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              I incorporate your provided brand logos, product imagery, and media seamlessly into high-performance web applications.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
