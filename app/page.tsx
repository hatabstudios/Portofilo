'use client';

import React, { useState } from 'react';
import { PROJECTS } from '@/data/projects';
import { CiaoCarousel3DScene } from '@/components/3d/CiaoCarousel3DScene';
import { BackgroundCanvas } from '@/components/ui/BackgroundCanvas';
import { Navbar } from '@/components/ui/Navbar';
import { ProjectOverlay } from '@/components/ui/ProjectOverlay';
import { AboutSection } from '@/components/sections/AboutSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { Footer } from '@/components/sections/Footer';

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = PROJECTS[activeIndex] || PROJECTS[0];

  return (
    <main className="relative min-h-screen bg-gray-950 text-gray-100 flex flex-col justify-between overflow-x-hidden">
      {/* Dynamic Crossfading Background */}
      <BackgroundCanvas activeProject={activeProject} />

      {/* Header Navigation */}
      <Navbar />

      {/* Hero Section with 3D Key Card Carousel */}
      <section id="carousel" className="relative w-full h-screen flex flex-col justify-between overflow-hidden">
        {/* 3D Scene Viewport */}
        <div className="absolute inset-0 z-0">
          <CiaoCarousel3DScene
            activeIndex={activeIndex}
            onActiveChange={setActiveIndex}
          />
        </div>

        {/* UI Overlay Chrome (Title, Tagline, Controls, Links) */}
        <ProjectOverlay
          activeProject={activeProject}
          activeIndex={activeIndex}
          onSelectIndex={setActiveIndex}
        />
      </section>

      {/* Below-The-Fold Sections */}
      <AboutSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
