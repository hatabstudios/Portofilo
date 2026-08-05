"use client";

import React from "react";
import { HolographicKeycardHub } from "@/components/hub/HolographicKeycardHub";
import { FadeIn } from "@/components/animations/MotionWrappers";
import { Mail, Phone, MapPin } from "lucide-react";

export default function MasterHubPage() {
  return (
    <div className="bg-zinc-950 min-h-screen text-white flex flex-col justify-between">
      {/* 3D Holographic Keycard Hub Experience */}
      <HolographicKeycardHub />

      {/* Hatab Studios Footer Contact Block */}
      <div className="border-t border-zinc-900 bg-zinc-950 py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-8 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5 text-center md:text-left">
              <h3 className="text-lg font-black uppercase font-heading text-white tracking-wider flex items-center justify-center md:justify-start gap-2">
                <span>HATAB STUDIOS</span>
                <span className="text-[10px] font-mono font-bold bg-primary/20 text-primary px-2 py-0.5 rounded border border-primary/30">
                  CAIRO, EGYPT 🇪🇬
                </span>
              </h3>
              <p className="text-xs text-zinc-400 font-mono flex items-center justify-center md:justify-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                <span>Pyramids Road, Al Haram, Giza, Cairo, Egypt</span>
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
              <a
                href="mailto:ismailhatab88@gmail.com"
                className="flex items-center gap-2 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 rounded-xl border border-zinc-700/80 transition-colors"
              >
                <Mail className="w-4 h-4 text-primary" />
                <span>ismailhatab88@gmail.com</span>
              </a>

              <a
                href="tel:010X XXX XXXX"
                className="flex items-center gap-2 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 rounded-xl border border-zinc-700/80 transition-colors"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>010X XXX XXXX</span>
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
