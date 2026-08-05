import React from "react";
import Image from "next/image";
import { whyChooseUsStats } from "@/data/features";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeIn, StaggerContainer } from "@/components/animations/MotionWrappers";
import { CheckCircle2, Shield, Flame, Trophy } from "lucide-react";

export const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-24 bg-surface relative overflow-hidden border-y border-surface-border">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column Image Overlay Frame */}
          <div className="lg:col-span-6 relative">
            <FadeIn direction="left">
              <div className="relative rounded-2xl overflow-hidden border border-surface-border shadow-2xl group">
                <Image
                  src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1000&auto=format&fit=crop"
                  alt="Why Choose Us Gym Floor"
                  width={800}
                  height={900}
                  className="object-cover w-full h-[520px] group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                {/* Floating Badge Overlay */}
                <div className="absolute bottom-6 left-6 right-6 glass-card p-6 rounded-xl border border-white/10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center text-white shrink-0 shadow-lg shadow-primary-glow">
                      <Trophy className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white font-heading uppercase">
                        VORTEX ATHLETICS STANDARD
                      </h4>
                      <p className="text-xs text-zinc-300">
                        Voted #1 Premium Athletic Facility 3 Years in a Row.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right Column Content */}
          <div className="lg:col-span-6 space-y-8">
            <SectionHeader
              badge="THE VORTEX ADVANTAGE"
              title="WHY ATHLETES CHOOSE"
              highlightTitle="OUR FACILITY"
              description="We refuse to compromise on quality, cleanliness, equipment variety, or coaching standards."
              align="left"
            />

            <StaggerContainer staggerChildren={0.1} className="space-y-4">
              {[
                { title: "No Crowded Bench Lines", text: "Multiple redundant platforms and squat racks ensure zero waiting time." },
                { title: "Medical-Grade Air Filtration", text: "HEPA 14 ventilation keeps fresh oxygen flowing continuously." },
                { title: "Personalized Digital App", text: "Track workout weights, progress scans, and schedule classes seamlessly." },
                { title: "Executive Amenity Standard", text: "High-pressure rainfall showers, plush towels, and sauna access." },
              ].map((item, idx) => (
                <FadeIn key={idx} direction="up">
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-surface-card border border-surface-border hover:border-primary/40 transition-colors">
                    <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-base font-bold text-white uppercase font-heading">
                        {item.title}
                      </h4>
                      <p className="text-xs text-zinc-400 mt-1">{item.text}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </StaggerContainer>

            {/* Quick Numbers Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-surface-border">
              {whyChooseUsStats.map((stat, idx) => (
                <div key={idx} className="space-y-1">
                  <span className="text-2xl font-black font-heading text-white accent-glow-text">
                    {stat.value}
                  </span>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
