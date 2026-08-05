import React from "react";
import { WeeklySchedule } from "@/components/sections/WeeklySchedule";
import { Badge } from "@/components/ui/Badge";

export const metadata = {
  title: "Weekly Class Schedule & Timetable",
  description: "View real-time class schedule, filter by day or category, and reserve your workout spot.",
};

export default function SchedulePage() {
  return (
    <div className="pt-28 pb-16 bg-zinc-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <Badge variant="primary" className="mb-4">
          WEEKLY TIMETABLE
        </Badge>
        <h1 className="text-4xl sm:text-6xl font-black uppercase font-heading text-white tracking-tight">
          CLASS <span className="text-primary accent-glow-text">SCHEDULE</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          Book your group workouts in advance to guarantee your spot on the floor.
        </p>
      </div>

      <WeeklySchedule />
    </div>
  );
}
