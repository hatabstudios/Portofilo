"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { PANELS } from "@/components/hub/Full3DHubScene";

// Dynamic import of pure 3D R3F Canvas without SSR
const Full3DHubScene = dynamic(
  () => import("@/components/hub/Full3DHubScene").then((mod) => mod.Full3DHubScene),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-screen fixed inset-0 bg-zinc-950 flex flex-col items-center justify-center space-y-4 text-white font-mono text-xs">
        <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="tracking-widest uppercase text-zinc-400 font-bold">
          LOADING HATAB STUDIOS 3D HUB...
        </p>
      </div>
    ),
  }
);

export default function MasterHubPage() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [webglSupported, setWebglSupported] = useState(true);

  // Pointer move handler for 3D camera/tilt parallax
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth) * 2 - 1;
    const y = -(clientY / innerHeight) * 2 + 1;
    setMousePos({ x, y });
  };

  // WebGL support check
  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) setWebglSupported(false);
    } catch {
      setWebglSupported(false);
    }
  }, []);

  // Handle 3D Raycasting Navigation Action
  const handleNavigate = (index: number) => {
    const target = PANELS[index];
    setIsSwiping(true);

    setTimeout(() => {
      if (target.isInternal) {
        router.push(target.destination);
      } else {
        window.open(target.destination, "_blank", "noopener,noreferrer");
        setIsSwiping(false);
      }
    }, 600);
  };

  return (
    <div onMouseMove={handleMouseMove} className="w-full h-screen relative bg-zinc-950">
      {webglSupported ? (
        <Full3DHubScene
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          isSwiping={isSwiping}
          onNavigate={handleNavigate}
          mousePos={mousePos}
        />
      ) : (
        /* No-WebGL HTML Fallback (only triggered if WebGL is disabled in browser) */
        <div className="w-full h-screen bg-zinc-950 text-white p-8 flex flex-col justify-center items-center space-y-6">
          <h1 className="text-2xl font-black font-heading tracking-widest text-primary">
            HATAB STUDIOS HUB
          </h1>
          <p className="text-xs text-zinc-400 font-mono">
            // INSERT CARD TO ACCESS PROJECT
          </p>
          <div className="flex flex-col gap-4 w-full max-w-md">
            {PANELS.map((panel, idx) => (
              <button
                key={panel.id}
                onClick={() => handleNavigate(idx)}
                className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl text-left hover:border-primary font-mono text-xs"
              >
                <div className="font-bold text-white uppercase">{panel.title}</div>
                <div className="text-zinc-400 mt-1">{panel.tagline}</div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
