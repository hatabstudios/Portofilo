import React from "react";
import { PersonalTrainers } from "@/components/sections/PersonalTrainers";
import { Badge } from "@/components/ui/Badge";

export const metadata = {
  title: "Personal Trainers & Master Coaches",
  description: "Work 1-on-1 with accredited strength coaches, fight mechanics specialists, and mobility practitioners.",
};

export default function TrainersPage() {
  return (
    <div className="pt-28 pb-16 bg-zinc-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <Badge variant="primary" className="mb-4">
          ACCREDITED STAFF
        </Badge>
        <h1 className="text-4xl sm:text-6xl font-black uppercase font-heading text-white tracking-tight">
          MASTER <span className="text-primary accent-glow-text">PERSONAL TRAINERS</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          1-on-1 performance coaching engineered specifically for your body type, goals, and schedule.
        </p>
      </div>

      <PersonalTrainers />
    </div>
  );
}
