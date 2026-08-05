"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { classesData } from "@/data/classes";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { FadeIn, StaggerContainer } from "@/components/animations/MotionWrappers";
import { Clock, Flame, ArrowRight, Dumbbell } from "lucide-react";

export const ClassesSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");

  const categories = ["ALL", "Strength", "HIIT", "Cardio", "Yoga & Mobility", "Boxing & Combat"];

  const filteredClasses = classesData.filter((item) => {
    if (activeCategory === "ALL") return true;
    return item.category === activeCategory;
  });

  return (
    <section className="py-24 bg-zinc-950 relative overflow-hidden" id="classes">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="TRAINING DISCIPLINES"
          title="HIGH-INTENSITY & STRENGTH"
          highlightTitle="CLASSES"
          description="Designed to challenge every fitness level, from high-octane cardiovascular shredding to technical heavy barbell platforms."
        />

        {/* Category Filters */}
        <FadeIn direction="down" className="flex items-center justify-center flex-wrap gap-2.5 mb-14">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 text-xs font-black uppercase tracking-wider rounded-full transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-primary text-white shadow-lg shadow-primary-glow"
                  : "bg-surface-card text-zinc-400 hover:text-white border border-surface-border"
              }`}
            >
              {cat}
            </button>
          ))}
        </FadeIn>

        {/* Classes Grid */}
        <StaggerContainer staggerChildren={0.12} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredClasses.map((item) => (
            <FadeIn key={item.id}>
              <Card className="h-full flex flex-col justify-between p-0 overflow-hidden group bg-surface-card border-surface-border">
                {/* Class Image Container */}
                <div className="relative h-60 w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-card via-surface-card/40 to-transparent" />

                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <Badge variant="primary" size="sm">
                      {item.category}
                    </Badge>
                  </div>

                  <div className="absolute top-4 right-4">
                    <Badge variant="dark" size="sm">
                      {item.intensity}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-xl font-black uppercase font-heading text-white group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed mt-2 line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  {/* Metadata Bar */}
                  <div className="grid grid-cols-2 gap-2 pt-4 border-t border-surface-border text-xs text-zinc-300 font-semibold">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>{item.durationMinutes} Mins</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Flame className="w-4 h-4 text-primary" />
                      <span>{item.caloriesBurned}</span>
                    </div>
                  </div>

                  <Link href={`/classes/${item.slug}`} className="block pt-2">
                    <Button variant="outline" size="sm" fullWidth icon={<ArrowRight className="w-4 h-4" />}>
                      Class Details
                    </Button>
                  </Link>
                </div>
              </Card>
            </FadeIn>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};
