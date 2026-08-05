"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FadeIn, ScaleIn } from "@/components/animations/MotionWrappers";
import {
  ShieldCheck,
  Zap,
  ArrowRight,
  ExternalLink,
  Cpu,
  Dumbbell,
  Globe,
  Layers,
  Sparkles,
  Lock,
  Volume2,
  VolumeX,
} from "lucide-react";

// Dynamic import of 3D R3F Canvas without SSR
const HolographicKeycardCanvas = dynamic(
  () =>
    import("./HolographicKeycardCanvas").then((mod) => mod.HolographicKeycardCanvas),
  { ssr: false }
);

export interface ProjectSlot {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  tagline: string;
  accentColor: string; // Hex color
  accentBg: string;
  accentBorder: string;
  destination: string;
  isInternal: boolean;
  icon: React.ReactNode;
  techTags: string[];
}

export const PROJECT_SLOTS: ProjectSlot[] = [
  {
    id: "vortex-gym",
    title: "VORTEX ATHLETIC CLUB",
    subtitle: "24/7 Luxury Fitness & Athletic Platform",
    tag: "LIVE TEMPLATE — FULL WEB APP",
    tagline: "24/7 fitness platform — BMI calculator, class scheduling, trainer booking",
    accentColor: "#ef4444",
    accentBg: "bg-red-500/10",
    accentBorder: "border-red-500/40",
    destination: "/gym",
    isInternal: true,
    icon: <Dumbbell className="w-5 h-5 text-red-500" />,
    techTags: ["Next.js 16", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    id: "aasifaa",
    title: "AASIFAA STUDIO",
    subtitle: "Modern Interactive Web Application",
    tag: "VERCEL DEPLOYED — EXTERNAL PLATFORM",
    tagline: "Fast, animated, built for engagement",
    accentColor: "#06b6d4",
    accentBg: "bg-cyan-500/10",
    accentBorder: "border-cyan-500/40",
    destination: "https://aasifaa.vercel.app",
    isInternal: false,
    icon: <Globe className="w-5 h-5 text-cyan-400" />,
    techTags: ["React", "Next.js", "Web Performance", "Vercel"],
  },
  {
    id: "majarrah",
    title: "MAJARRAH PLATFORM",
    subtitle: "Digital Design System & Creative UI",
    tag: "VERCEL DEPLOYED — EXTERNAL PLATFORM",
    tagline: "Custom UI components, responsive, production-grade",
    accentColor: "#a855f7",
    accentBg: "bg-purple-500/10",
    accentBorder: "border-purple-500/40",
    destination: "https://majarrah.vercel.app",
    isInternal: false,
    icon: <Layers className="w-5 h-5 text-purple-400" />,
    techTags: ["Custom UI Engine", "Responsive Design", "Vercel Cloud"],
  },
];

export const HolographicKeycardHub: React.FC = () => {
  const router = useRouter();
  const [activeSlotIndex, setActiveSlotIndex] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);

  const activeSlot = PROJECT_SLOTS[activeSlotIndex];

  // Mouse move handler for pointer tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth) * 2 - 1;
    const y = -(clientY / innerHeight) * 2 + 1;
    setMousePos({ x, y });
  };

  // Check WebGL availability on mount
  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) setWebglSupported(false);
    } catch {
      setWebglSupported(false);
    }
  }, []);

  // Handle Card Swipe & Navigation
  const handleSwipeAccess = (slotIndex?: number) => {
    const targetSlot = slotIndex !== undefined ? PROJECT_SLOTS[slotIndex] : activeSlot;
    setIsSwiping(true);

    setTimeout(() => {
      if (targetSlot.isInternal) {
        router.push(targetSlot.destination);
      } else {
        window.open(targetSlot.destination, "_blank", "noopener,noreferrer");
        setIsSwiping(false);
      }
    }, 600);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-zinc-950 text-white relative overflow-hidden flex flex-col justify-between"
    >
      {/* Background Tech Grid & Volumetric Lighting */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b15_1px,transparent_1px),linear-gradient(to_bottom,#18181b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[450px] blur-[150px] transition-all duration-700 pointer-events-none rounded-full"
        style={{
          backgroundColor: activeSlot.accentColor,
          opacity: 0.18,
        }}
      />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 relative z-10 w-full flex-1 flex flex-col justify-between">
        {/* Terminal Header */}
        <FadeIn className="text-center space-y-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs font-mono tracking-widest text-zinc-400 uppercase">
            <Cpu className="w-3.5 h-3.5 text-primary animate-pulse" />
            <span>HATAB STUDIOS KEYCARD ACCESS TERMINAL</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping ml-1" />
          </div>

          <h1 className="text-xs font-mono uppercase tracking-[0.35em] text-zinc-400 font-bold">
            // INSERT CARD TO ACCESS PROJECT
          </h1>
        </FadeIn>

        {/* Centerpiece 3D Holographic Scene & Slot Selector Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto">
          {/* Left Column: Access Slots Selector */}
          <div className="lg:col-span-4 space-y-4">
            <div className="text-xs font-mono uppercase tracking-widest text-zinc-400 flex items-center gap-2 mb-2">
              <Lock className="w-3.5 h-3.5 text-primary" />
              <span>SELECT ACCESS SLOT</span>
            </div>

            <div className="space-y-3">
              {PROJECT_SLOTS.map((slot, index) => {
                const isActive = activeSlotIndex === index;
                return (
                  <button
                    key={slot.id}
                    onClick={() => {
                      setActiveSlotIndex(index);
                    }}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-300 relative overflow-hidden group ${
                      isActive
                        ? `${slot.accentBg} ${slot.accentBorder} shadow-lg shadow-${slot.accentColor}/10 ring-1 ring-${slot.accentColor}/40`
                        : "bg-zinc-900/50 border-zinc-800/80 hover:bg-zinc-900 hover:border-zinc-700"
                    }`}
                  >
                    {/* Active Accent Bar */}
                    {isActive && (
                      <div
                        className="absolute left-0 top-0 bottom-0 w-1.5 transition-all duration-300"
                        style={{ backgroundColor: slot.accentColor }}
                      />
                    )}

                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800">
                          {slot.icon}
                        </div>
                        <div>
                          <span className="text-[10px] font-mono tracking-wider text-zinc-400 block uppercase">
                            SLOT 0{index + 1}
                          </span>
                          <h3 className="text-sm font-black uppercase font-heading text-white tracking-wide">
                            {slot.title}
                          </h3>
                        </div>
                      </div>

                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                          isActive
                            ? "bg-white/10 text-white border-white/20"
                            : "bg-zinc-800/60 text-zinc-400 border-zinc-700/50"
                        }`}
                      >
                        {isActive ? "ACTIVE" : "SELECT"}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Center Column: 3D Holographic Keycard Stage */}
          <div className="lg:col-span-8 flex flex-col items-center justify-center relative">
            {/* Sound & Status Controls */}
            <div className="absolute top-2 right-2 z-20 flex items-center gap-2">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                aria-label="Toggle Audio"
                className="p-2 rounded-lg bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
              >
                {soundEnabled ? (
                  <Volume2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <VolumeX className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* 3D Keycard Canvas OR WebGL Fallback */}
            {webglSupported ? (
              <HolographicKeycardCanvas
                activeSlotIndex={activeSlotIndex}
                activeColor={activeSlot.accentColor}
                isSwiping={isSwiping}
                mousePos={mousePos}
              />
            ) : (
              /* Fallback Graphic */
              <div className="w-full h-[360px] flex items-center justify-center relative">
                <div
                  className="w-80 h-52 rounded-2xl border-2 p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden backdrop-blur-xl transition-all duration-500"
                  style={{
                    backgroundColor: "#09090b",
                    borderColor: activeSlot.accentColor,
                    boxShadow: `0 0 40px ${activeSlot.accentColor}40`,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-zinc-300">
                      HATAB STUDIOS KEYCARD
                    </span>
                    <div className="w-8 h-6 rounded bg-amber-400/90 border border-amber-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black uppercase text-white font-heading tracking-wide">
                      {activeSlot.title}
                    </h3>
                    <p className="text-[11px] font-mono text-zinc-400">{activeSlot.subtitle}</p>
                  </div>
                  <div
                    className="h-2 rounded-full w-full"
                    style={{ backgroundColor: activeSlot.accentColor }}
                  />
                </div>
              </div>
            )}

            {/* Active Holographic Display Panel */}
            <div className="w-full max-w-xl bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 shadow-2xl backdrop-blur-xl mt-4 relative overflow-hidden">
              {/* Scanline Animation Effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-12 animate-scanline pointer-events-none" />

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-block w-2 h-2 rounded-full"
                      style={{ backgroundColor: activeSlot.accentColor }}
                    />
                    <span className="text-[11px] font-mono tracking-widest uppercase text-zinc-400">
                      {activeSlot.tag}
                    </span>
                  </div>

                  <h2 className="text-xl font-black uppercase font-heading text-white tracking-wide">
                    {activeSlot.title}
                  </h2>

                  <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                    {activeSlot.tagline}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {activeSlot.techTags.map((tech, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800 text-zinc-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Swipe Access Action Button */}
                <button
                  onClick={() => handleSwipeAccess()}
                  disabled={isSwiping}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-black font-heading uppercase text-xs tracking-wider text-black transition-all duration-300 shadow-xl flex items-center justify-center gap-2 shrink-0 group hover:scale-105 active:scale-95"
                  style={{
                    backgroundColor: activeSlot.accentColor,
                    boxShadow: `0 0 25px ${activeSlot.accentColor}60`,
                  }}
                >
                  <span>{isSwiping ? "SWIPING CARD..." : "SWIPE CARD TO ENTER"}</span>
                  {activeSlot.isInternal ? (
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  ) : (
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
