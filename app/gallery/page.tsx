import React from "react";
import { GallerySection } from "@/components/sections/GallerySection";
import { Badge } from "@/components/ui/Badge";

export const metadata = {
  title: "Photo & Facility Gallery",
  description: "Take a visual tour of our state-of-the-art machinery, sauna recovery lounge, and training floors.",
};

export default function GalleryPage() {
  return (
    <div className="pt-28 pb-16 bg-zinc-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <Badge variant="primary" className="mb-4">
          VISUAL TOUR
        </Badge>
        <h1 className="text-4xl sm:text-6xl font-black uppercase font-heading text-white tracking-tight">
          OUR <span className="text-primary accent-glow-text">FACILITY GALLERY</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          High-resolution look inside our heavy dumbbell racks, power platforms, and cryo suite.
        </p>
      </div>

      <GallerySection />
    </div>
  );
}
