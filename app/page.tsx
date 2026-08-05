"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { CAROUSEL_PROJECTS } from "@/components/hub/CiaoCarousel3DScene";

// Dynamic import of 3D Ciao Energy Style GLTF R3F Canvas without SSR
const CiaoCarousel3DScene = dynamic(
  () => import("@/components/hub/CiaoCarousel3DScene").then((mod) => mod.CiaoCarousel3DScene),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-screen fixed inset-0 bg-zinc-950 flex flex-col items-center justify-center space-y-4 text-white font-mono text-xs">
        <div className="w-12 h-12 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
        <p className="tracking-widest uppercase text-zinc-400 font-bold">
          LOADING HATAB STUDIOS 3D KEYCARD HUB...
        </p>
      </div>
    ),
  }
);

export default function MasterHubPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [webglSupported, setWebglSupported] = useState(true);

  // WebGL availability check
  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) setWebglSupported(false);
    } catch {
      setWebglSupported(false);
    }
  }, []);

  // Direct Instant Navigation
  const handleNavigate = (index: number) => {
    const target = CAROUSEL_PROJECTS[index];
    if (target.isInternal) {
      window.location.href = target.destination;
    } else {
      window.open(target.destination, "_blank", "noopener,noreferrer") || (window.location.href = target.destination);
    }
  };

  return (
    <div className="w-full h-screen relative bg-zinc-950">
      {webglSupported ? (
        <CiaoCarousel3DScene
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          onNavigate={handleNavigate}
        />
      ) : (
        /* No-WebGL HTML Fallback */
        <div className="w-full h-screen bg-zinc-950 text-white p-8 flex flex-col justify-center items-center space-y-6">
          <h1 className="text-2xl font-black font-heading tracking-widest text-primary">
            HATAB STUDIOS HUB
          </h1>
          <p className="text-xs text-zinc-400 font-mono">
            // SELECT PROJECT TO ACCESS
          </p>
          <div className="flex flex-col gap-4 w-full max-w-md">
            {CAROUSEL_PROJECTS.map((panel, idx) => (
              <button
                key={panel.id}
                onClick={() => handleNavigate(idx)}
                className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl text-left hover:border-primary font-mono text-xs font-bold text-white uppercase"
              >
                {panel.title} ➔
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
