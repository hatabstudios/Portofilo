'use client';

import React from 'react';
import { Project } from '@/data/projects';
import { X, ExternalLink, CheckCircle2, Sparkles, Mail, Layers, Cpu, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  const isExternalUrl = project.url.startsWith('http://') || project.url.startsWith('https://');

  const handleInquire = () => {
    onClose();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Dark Backdrop with Glass Blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-gray-950/80 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl bg-gray-900/95 border border-gray-800 shadow-2xl z-10 p-6 sm:p-8 space-y-6 text-gray-100 select-text"
          style={{
            boxShadow: `0 0 50px ${project.glowColor}`,
          }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-5 right-5 p-2 rounded-full bg-gray-800/80 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>

          {/* Header */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span
                className="px-3 py-1 text-xs font-bold font-heading uppercase rounded-full border"
                style={{
                  borderColor: project.accentColor,
                  color: project.accentColor,
                  backgroundColor: 'rgba(15, 23, 42, 0.8)',
                }}
              >
                {project.badge}
              </span>
              <span className="text-xs font-semibold text-gray-400 uppercase font-heading flex items-center gap-1">
                <Sparkles size={14} className="text-amber-400" />
                HatabStudios Showcase
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-white uppercase">
              {project.name}
            </h2>

            <p className="text-base sm:text-lg font-medium text-amber-200/90 font-heading">
              {project.tagline}
            </p>
          </div>

          {/* Description */}
          <div className="p-4 rounded-xl bg-gray-950/60 border border-gray-800/80 space-y-2">
            <h3 className="text-xs font-bold tracking-widest text-gray-400 uppercase font-heading flex items-center gap-2">
              <Layers size={16} style={{ color: project.accentColor }} />
              Overview & Application Scope
            </h3>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Key Features Breakdown */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold tracking-widest text-gray-400 uppercase font-heading flex items-center gap-2">
              <ShieldCheck size={16} style={{ color: project.accentColor }} />
              Template Architecture & Features
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-gray-950/40 border border-gray-800/60 flex items-start gap-3">
                <CheckCircle2 size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white uppercase font-heading">High-Performance Layout</h4>
                  <p className="text-xs text-gray-400 mt-0.5">Optimized 60FPS WebGL & Framer Motion interactive UI.</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-gray-950/40 border border-gray-800/60 flex items-start gap-3">
                <CheckCircle2 size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white uppercase font-heading">Custom Branding & Theme</h4>
                  <p className="text-xs text-gray-400 mt-0.5">Tailored colors, typography, keycards, and assets.</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-gray-950/40 border border-gray-800/60 flex items-start gap-3">
                <CheckCircle2 size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white uppercase font-heading">Responsive & Mobile First</h4>
                  <p className="text-xs text-gray-400 mt-0.5">Pixel-perfect experience across desktops, tablets, and phones.</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-gray-950/40 border border-gray-800/60 flex items-start gap-3">
                <CheckCircle2 size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white uppercase font-heading">SEO & Vercel Ready</h4>
                  <p className="text-xs text-gray-400 mt-0.5">Built on Next.js 16 App Router for instant global deployment.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            {isExternalUrl ? (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold font-heading text-xs sm:text-sm uppercase tracking-wider text-gray-950 transition-all hover:scale-105 shadow-lg"
                style={{
                  backgroundColor: project.accentColor,
                  boxShadow: `0 0 20px ${project.glowColor}`,
                }}
              >
                <ExternalLink size={16} />
                <span>Visit Live Application ↗</span>
              </a>
            ) : (
              <button
                onClick={handleInquire}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold font-heading text-xs sm:text-sm uppercase tracking-wider text-gray-950 transition-all hover:scale-105 shadow-lg"
                style={{
                  backgroundColor: project.accentColor,
                  boxShadow: `0 0 20px ${project.glowColor}`,
                }}
              >
                <Mail size={16} />
                <span>Request / Order This Template</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-gray-800 text-gray-300 font-bold font-heading text-xs uppercase tracking-wider hover:bg-gray-700 hover:text-white transition-colors"
            >
              Close Preview
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
