"use client";

import React from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { FadeIn, StaggerContainer } from "@/components/animations/MotionWrappers";
import { ArrowRight, Play, Award, Zap, ShieldCheck } from "lucide-react";

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-zinc-950">
      {/* High-Resolution Background Image with Dark Vignette Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={siteConfig.hero.bgImage}
          alt={siteConfig.name}
          fill
          priority
          className="object-cover object-center opacity-35 scale-105 animate-pulse-slow"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-zinc-950/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent" />
      </div>

      {/* Dynamic Background Glow Orbs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-red-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Hero Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8 space-y-6 text-left">
            <FadeIn direction="down" delay={0.1}>
              <Badge variant="primary" size="lg" icon={<Zap className="w-4 h-4" />}>
                {siteConfig.hero.badge}
              </Badge>
            </FadeIn>

            <FadeIn direction="up" delay={0.2}>
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase font-heading tracking-tight text-white leading-[0.95]">
                {siteConfig.hero.headingLine1}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-red-500 to-amber-400 accent-glow-text">
                  {siteConfig.hero.headingHighlight}
                </span>{" "}
                {siteConfig.hero.headingLine2}
              </h1>
            </FadeIn>

            <FadeIn direction="up" delay={0.3}>
              <p className="text-lg sm:text-xl text-zinc-300 max-w-2xl font-normal leading-relaxed">
                {siteConfig.hero.description}
              </p>
            </FadeIn>

            <FadeIn direction="up" delay={0.4}>
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Button
                  href={siteConfig.hero.primaryCta.href}
                  variant="primary"
                  size="xl"
                  icon={<ArrowRight className="w-5 h-5" />}
                >
                  {siteConfig.hero.primaryCta.text}
                </Button>

                <Button
                  href={siteConfig.hero.secondaryCta.href}
                  variant="glass"
                  size="xl"
                  icon={<Play className="w-4 h-4 fill-white" />}
                  iconPosition="left"
                >
                  {siteConfig.hero.secondaryCta.text}
                </Button>
              </div>
            </FadeIn>

            {/* Micro Guarantees */}
            <FadeIn direction="up" delay={0.5}>
              <div className="flex flex-wrap items-center gap-6 pt-4 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  <span>No Long-Term Contracts</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-primary" />
                  <span>100% Certified Master Coaches</span>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Stats Column Floating Box */}
          <div className="lg:col-span-4">
            <StaggerContainer staggerChildren={0.15}>
              <div className="grid grid-cols-2 gap-4 p-6 glass-card rounded-2xl border border-white/10 shadow-2xl relative">
                <div className="absolute -top-3 -right-3 bg-primary text-white text-[10px] font-extrabold tracking-widest px-3 py-1 rounded-full uppercase shadow-md">
                  TOP RATED
                </div>

                {siteConfig.hero.stats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-surface-muted/60 rounded-xl border border-surface-border flex flex-col justify-center"
                  >
                    <span className="text-2xl sm:text-3xl font-black font-heading text-white accent-glow-text">
                      {stat.value}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 mt-1">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </StaggerContainer>
          </div>
        </div>
      </div>
    </section>
  );
};
