"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalLink, Sparkles, Dumbbell, Globe, Layers } from "lucide-react";

export const StudioBanner: React.FC = () => {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return (
    <div className="bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border-b border-primary/20 text-white text-xs py-2 px-4 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        {/* Left Branding */}
        <Link href="/" className="flex items-center gap-2 font-black tracking-wider uppercase font-heading hover:text-primary transition-colors">
          <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
          <span>HATAB STUDIOS</span>
          <span className="bg-primary/20 text-primary text-[10px] px-2 py-0.5 rounded-full border border-primary/30 font-bold">
            HUB
          </span>
        </Link>

        {/* Website Selector Quick Switcher */}
        <div className="flex items-center gap-1 sm:gap-3 overflow-x-auto py-0.5 text-[11px]">
          <span className="text-zinc-400 font-semibold hidden md:inline">Select Website:</span>
          
          <Link
            href="/gym"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 font-bold transition-all shrink-0"
          >
            <Dumbbell className="w-3 h-3" />
            <span>Gym Template</span>
          </Link>

          <a
            href="https://aasifaa.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 font-semibold transition-all shrink-0"
          >
            <Globe className="w-3 h-3 text-cyan-400" />
            <span>Aasifaa</span>
            <ExternalLink className="w-2.5 h-2.5 opacity-70" />
          </a>

          <a
            href="https://majarrah.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 font-semibold transition-all shrink-0"
          >
            <Layers className="w-3 h-3 text-purple-400" />
            <span>Majarrah</span>
            <ExternalLink className="w-2.5 h-2.5 opacity-70" />
          </a>
        </div>
      </div>
    </div>
  );
};
