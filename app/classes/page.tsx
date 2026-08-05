import React from "react";
import { ClassesSection } from "@/components/sections/ClassesSection";
import { WeeklySchedule } from "@/components/sections/WeeklySchedule";
import { Badge } from "@/components/ui/Badge";

export const metadata = {
  title: "Fitness & Training Classes | Group Fitness",
  description: "Explore strength, powerlifting, boxing, HIIT, and yoga classes led by master coaches.",
};

export default function ClassesPage() {
  return (
    <div className="pt-28 pb-16 bg-zinc-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <Badge variant="primary" className="mb-4">
          GROUP FITNESS PROGRAMMING
        </Badge>
        <h1 className="text-4xl sm:text-6xl font-black uppercase font-heading text-white tracking-tight">
          ALL <span className="text-primary accent-glow-text">CLASSES & DISCIPLINES</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          From 700 kcal metabolic burn circuits to technical Olympic platforms. Select your discipline below.
        </p>
      </div>

      <ClassesSection />
      <WeeklySchedule />
    </div>
  );
}
