"use client";

import React, { useState } from "react";
import Image from "next/image";
import { galleryData, GalleryItem } from "@/data/gallery";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Modal } from "@/components/ui/Modal";
import { FadeIn, StaggerContainer } from "@/components/animations/MotionWrappers";
import { Maximize2 } from "lucide-react";

export const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const categories = ["ALL", "Facilities", "Equipment", "Classes", "Recovery"];

  const filteredGallery = galleryData.filter((item) => {
    if (activeCategory === "ALL") return true;
    return item.category === activeCategory;
  });

  return (
    <section className="py-24 bg-surface border-y border-surface-border relative overflow-hidden" id="gallery">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="FACILITY SHOWCASE"
          title="INSIDE VORTEX ATHLETIC"
          highlightTitle="CLUB"
          description="Take a visual tour of our 15,000 sq ft fitness floor, heavy weight platforms, and luxury spa recovery lounge."
        />

        {/* Category Tabs */}
        <FadeIn direction="down" className="flex items-center justify-center flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 text-xs font-black uppercase tracking-wider rounded-full transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-primary text-white shadow-md shadow-primary-glow"
                  : "bg-surface-card text-zinc-400 hover:text-white border border-surface-border"
              }`}
            >
              {cat}
            </button>
          ))}
        </FadeIn>

        {/* Gallery Grid */}
        <StaggerContainer staggerChildren={0.1} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredGallery.map((item) => (
            <FadeIn key={item.id}>
              <div
                onClick={() => setActiveItem(item)}
                className="relative h-64 rounded-xl overflow-hidden group cursor-pointer border border-surface-border"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                <div className="absolute top-3 right-3 p-2 bg-black/60 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" />
                </div>

                <div className="absolute bottom-4 left-4 right-4 space-y-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary bg-primary/20 px-2 py-0.5 rounded-full inline-block">
                    {item.category}
                  </span>
                  <h4 className="text-sm font-black uppercase font-heading text-white">
                    {item.title}
                  </h4>
                </div>
              </div>
            </FadeIn>
          ))}
        </StaggerContainer>
      </div>

      {/* Gallery Lightbox Modal */}
      {activeItem && (
        <Modal
          isOpen={!!activeItem}
          onClose={() => setActiveItem(null)}
          maxWidth="2xl"
          title={activeItem.title}
        >
          <div className="space-y-4">
            <div className="relative h-[400px] w-full rounded-xl overflow-hidden border border-surface-border">
              <Image
                src={activeItem.image}
                alt={activeItem.title}
                fill
                className="object-cover"
              />
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed italic">
              {activeItem.caption}
            </p>
          </div>
        </Modal>
      )}
    </section>
  );
};
