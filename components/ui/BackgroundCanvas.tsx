'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Project } from '@/data/projects';

interface BackgroundProps {
  activeProject: Project;
}

export function BackgroundCanvas({ activeProject }: BackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [prevProject, setPrevProject] = useState<Project>(activeProject);
  const [currentProject, setCurrentProject] = useState<Project>(activeProject);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (activeProject.id !== currentProject.id) {
      setPrevProject(currentProject);
      setCurrentProject(activeProject);
      setIsTransitioning(true);

      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 650);

      return () => clearTimeout(timer);
    }
  }, [activeProject, currentProject]);

  // Ambient particle starfield canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Create dust particles
    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.8 + 0.5,
      speedX: (Math.random() - 0.5) * 0.35,
      speedY: (Math.random() - 0.5) * 0.35,
      alpha: Math.random() * 0.6 + 0.2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * 0.35})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-gray-950">
      {/* Previous Layer (Crossfading out) */}
      <div
        className="absolute inset-0 w-full h-full transition-opacity duration-700 ease-out"
        style={{
          opacity: isTransitioning ? 0 : 1,
          background: currentProject.bgGradient,
        }}
      >
        {currentProject.backgroundVideo ? (
          <video
            src={currentProject.backgroundVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-40 mix-blend-screen"
          />
        ) : (
          <div
            className="absolute inset-0 opacity-40 mix-blend-screen"
            style={{
              background: `radial-gradient(circle at 50% 45%, ${currentProject.glowColor} 0%, transparent 65%)`,
            }}
          />
        )}
      </div>

      {/* Crossfade Out Layer */}
      {isTransitioning && (
        <div
          className="absolute inset-0 w-full h-full transition-opacity duration-700 ease-out opacity-0"
          style={{
            background: prevProject.bgGradient,
          }}
        >
          {prevProject.backgroundVideo && (
            <video
              src={prevProject.backgroundVideo}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-40 mix-blend-screen"
            />
          )}
        </div>
      )}

      {/* Floating Canvas Dust Particles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60" />

      {/* Vignette Overlay */}
      <div className="absolute inset-0 bg-radial from-transparent via-gray-950/40 to-gray-950/90 pointer-events-none" />
    </div>
  );
}
