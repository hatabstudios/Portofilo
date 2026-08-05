"use client";

import React, { useState } from "react";
import Image from "next/image";
import { testimonialsData } from "@/data/testimonials";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { FadeIn } from "@/components/animations/MotionWrappers";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonialsData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonialsData.length - 1 ? 0 : prev + 1));
  };

  const activeTestimonial = testimonialsData[currentIndex];

  return (
    <section className="py-24 bg-zinc-950 relative overflow-hidden" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="MEMBER STORIES"
          title="REAL RESULTS &"
          highlightTitle="TRANSFORMATIONS"
          description="Hear directly from corporate executives, physicians, and athletes who built their dream bodies with us."
        />

        <div className="max-w-4xl mx-auto relative">
          <FadeIn key={activeTestimonial.id} direction="up">
            <Card className="p-8 sm:p-12 glass-card rounded-2xl border-surface-border relative">
              <Quote className="w-16 h-16 text-primary/20 absolute top-6 right-6 pointer-events-none" />

              <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-start">
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden shrink-0 border-2 border-primary shadow-lg shadow-primary-glow">
                  <Image
                    src={activeTestimonial.avatar}
                    alt={activeTestimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="space-y-4 text-center sm:text-left flex-1">
                  <div className="flex items-center justify-center sm:justify-start gap-1">
                    {[...Array(activeTestimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <p className="text-base sm:text-lg text-zinc-200 leading-relaxed italic font-normal">
                    &ldquo;{activeTestimonial.content}&rdquo;
                  </p>

                  <div className="pt-2 border-t border-surface-border flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <h4 className="text-lg font-black uppercase font-heading text-white">
                        {activeTestimonial.name}
                      </h4>
                      <p className="text-xs text-primary font-bold">
                        {activeTestimonial.role}
                      </p>
                    </div>

                    {activeTestimonial.transformation && (
                      <div className="bg-primary/10 border border-primary/20 px-4 py-2 rounded-xl text-xs font-bold text-white flex items-center gap-3">
                        <div>
                          <span className="text-zinc-400 block text-[9px] uppercase">Duration</span>
                          <span>{activeTestimonial.transformation.weeks} Weeks</span>
                        </div>
                        <div className="h-6 w-px bg-primary/30" />
                        <div>
                          <span className="text-zinc-400 block text-[9px] uppercase">Weight Shift</span>
                          <span className="text-emerald-400">{activeTestimonial.transformation.weightChange}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </FadeIn>

          {/* Navigation Arrows */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex gap-2">
              {testimonialsData.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentIndex === idx ? "w-8 bg-primary" : "w-2 bg-zinc-800"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                className="p-3 rounded-full bg-surface-card border border-surface-border text-white hover:bg-primary transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="p-3 rounded-full bg-surface-card border border-surface-border text-white hover:bg-primary transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
