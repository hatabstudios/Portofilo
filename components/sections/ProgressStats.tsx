import React from "react";
import { FadeIn, StaggerContainer } from "@/components/animations/MotionWrappers";
import { Dumbbell, Users, Trophy, HeartPulse } from "lucide-react";

export const ProgressStats: React.FC = () => {
  const stats = [
    { icon: <Users className="w-8 h-8 text-primary" />, value: "2,500+", label: "Active Athletic Members", subtext: "Driven, supportive community" },
    { icon: <Trophy className="w-8 h-8 text-primary" />, value: "98.5%", label: "Goal Achievement Rate", subtext: "Target hit within 90 days" },
    { icon: <Dumbbell className="w-8 h-8 text-primary" />, value: "150+", label: "Elite Hammer Strength Machines", subtext: "Zero wait times guaranteed" },
    { icon: <HeartPulse className="w-8 h-8 text-primary" />, value: "50,000+", label: "Total Calories Burned / Wk", subtext: "Across high-energy classes" },
  ];

  return (
    <section className="py-20 bg-surface border-y border-surface-border relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <StaggerContainer staggerChildren={0.15} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((item, idx) => (
            <FadeIn key={idx}>
              <div className="p-8 glass-card rounded-2xl border border-surface-border hover:border-primary/50 transition-all duration-300 group text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl bg-primary-muted border border-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  {item.icon}
                </div>
                <span className="text-4xl font-black font-heading text-white accent-glow-text mb-2 block">
                  {item.value}
                </span>
                <h4 className="text-sm font-extrabold uppercase tracking-wider text-white mb-1">
                  {item.label}
                </h4>
                <p className="text-xs text-zinc-400 font-normal">
                  {item.subtext}
                </p>
              </div>
            </FadeIn>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};
