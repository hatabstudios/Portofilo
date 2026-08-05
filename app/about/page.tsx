import React from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Features } from "@/components/sections/Features";
import { PersonalTrainers } from "@/components/sections/PersonalTrainers";
import { ProgressStats } from "@/components/sections/ProgressStats";
import { FadeIn } from "@/components/animations/MotionWrappers";
import { Trophy, Shield, Dumbbell, Target, CheckCircle2, ArrowRight } from "lucide-react";

export const metadata = {
  title: "About Us | Elite Fitness Story",
  description: "Learn about Vortex Athletic Club's story, mission, equipment standards, and master trainer leadership.",
};

export default function AboutPage() {
  return (
    <div className="pt-28 pb-16 bg-zinc-950 min-h-screen">
      {/* Page Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center relative z-10">
        <Badge variant="primary" className="mb-4">
          OUR LEGACY & MISSION
        </Badge>
        <h1 className="text-4xl sm:text-6xl font-black uppercase font-heading text-white tracking-tight">
          ABOUT <span className="text-primary accent-glow-text">{siteConfig.logo.text}</span> ATHLETICS
        </h1>
        <p className="mt-4 text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          Founded on the principle that physical mastery breeds mental resilience. We built the premier facility we always wished existed.
        </p>
      </div>

      {/* Main Story & Values Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <FadeIn direction="left" className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-surface-border shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop"
                alt="Gym Interior"
                width={800}
                height={600}
                className="object-cover w-full h-[480px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
            </div>
          </FadeIn>

          <FadeIn direction="right" className="lg:col-span-6 space-y-6">
            <Badge variant="primary">OUR FOUNDING STORY</Badge>
            <h2 className="text-3xl font-black uppercase font-heading text-white leading-tight">
              REDEFINING THE STANDARD OF <span className="text-primary">ATHLETIC EXCELLENCE</span>
            </h2>
            <p className="text-sm text-zinc-300 leading-relaxed">
              We started {siteConfig.name} because commercial gyms had lost their way—crowded floor spaces, broken machinery, and uninterested staff. We set out to build an obsidian sanctuary for serious athletes, busy executives, and fitness enthusiasts alike.
            </p>
            <p className="text-sm text-zinc-300 leading-relaxed">
              Every bar is calibrated Eleiko Swedish steel. Every dumbbell is custom polyurethane. Every coach has at least 8 years of accredited performance background.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-surface-border">
              <div className="flex items-center gap-3">
                <Target className="w-5 h-5 text-primary shrink-0" />
                <span className="text-xs font-bold uppercase text-white">Targeted Bio-Mechanics</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-primary shrink-0" />
                <span className="text-xs font-bold uppercase text-white">Sanitized Every 60 Mins</span>
              </div>
              <div className="flex items-center gap-3">
                <Trophy className="w-5 h-5 text-primary shrink-0" />
                <span className="text-xs font-bold uppercase text-white">Certified Master Staff</span>
              </div>
              <div className="flex items-center gap-3">
                <Dumbbell className="w-5 h-5 text-primary shrink-0" />
                <span className="text-xs font-bold uppercase text-white">15,000 Sq Ft Space</span>
              </div>
            </div>

            <Button href="/pricing" variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
              Claim Your 7-Day Trial Pass
            </Button>
          </FadeIn>
        </div>
      </div>

      <ProgressStats />
      <Features />
      <PersonalTrainers />
    </div>
  );
}
