"use client";

import React from "react";
import Link from "next/link";
import { FadeIn, ScaleIn } from "@/components/animations/MotionWrappers";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  Sparkles,
  Dumbbell,
  Globe,
  Layers,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Zap,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";

export default function MasterStudioHub() {
  const websites = [
    {
      id: "gym-template",
      title: "VORTEX ATHLETIC CLUB",
      subtitle: "Luxury Gym & Fitness Web Application",
      category: "Full Web App",
      badge: "LIVE TEMPLATE",
      badgeColor: "bg-red-500/20 text-red-400 border-red-500/30",
      description:
        "High-energy 24/7 fitness club platform featuring interactive BMI calculator, 50+ class schedules, personal trainer booking, and membership tiers.",
      icon: <Dumbbell className="w-8 h-8 text-red-500" />,
      image:
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop",
      href: "/gym",
      isInternal: true,
      buttonText: "ENTER GYM WEBSITE",
      accent: "from-red-600 to-rose-700",
      stats: ["24/7 Keycard Access", "Interactive Schedule", "BMI Calculator"],
    },
    {
      id: "aasifaa",
      title: "AASIFAA STUDIO",
      subtitle: "Modern Web & Digital Experience",
      category: "External Platform",
      badge: "VERCEL DEPLOYED",
      badgeColor: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
      description:
        "Interactive digital application built for speed, dynamic animations, and seamless user engagement.",
      icon: <Globe className="w-8 h-8 text-cyan-400" />,
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
      href: "https://aasifaa.vercel.app",
      isInternal: false,
      buttonText: "VISIT AASIFAA SITE",
      accent: "from-cyan-600 to-blue-700",
      stats: ["React / Next.js", "High Performance", "Vercel Hosted"],
    },
    {
      id: "majarrah",
      title: "MAJARRAH PLATFORM",
      subtitle: "Creative Design & Digital Solutions",
      category: "External Platform",
      badge: "VERCEL DEPLOYED",
      badgeColor: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      description:
        "Cutting-edge digital portal showcasing responsive UI design, custom component libraries, and rich web layouts.",
      icon: <Layers className="w-8 h-8 text-purple-400" />,
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
      href: "https://majarrah.vercel.app",
      isInternal: false,
      buttonText: "VISIT MAJARRAH SITE",
      accent: "from-purple-600 to-indigo-700",
      stats: ["Custom UI Components", "Responsive Design", "Vercel Hosted"],
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white relative overflow-hidden">
      {/* Background Ambient Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-primary/20 via-purple-600/10 to-transparent blur-[140px] pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 relative z-10">
        {/* Studio Hero Header */}
        <FadeIn className="text-center max-w-4xl mx-auto mb-16 space-y-6">
          <Badge variant="primary" className="px-4 py-1.5 text-xs tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 mr-1.5 inline" /> HATAB STUDIOS PORTFOLIO
          </Badge>

          <h1 className="text-4xl sm:text-7xl font-black uppercase font-heading tracking-tight text-white leading-tight">
            SELECT A WEBSITE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-rose-400 to-amber-400 accent-glow-text">
              TO VISIT & EXPLORE
            </span>
          </h1>

          <p className="text-base sm:text-xl text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            Welcome to <strong className="text-white font-bold">Hatab Studios Hub</strong>. Select any of our featured web applications below to launch into the full experience.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-6 pt-2 text-xs text-zinc-400 font-semibold">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Vercel Cloud Hosting
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-400" /> High Performance Next.js
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-rose-400" /> Cairo, Egypt 🇪🇬
            </span>
          </div>
        </FadeIn>

        {/* Website Selector Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-20">
          {websites.map((site, index) => (
            <ScaleIn key={site.id} delay={index * 0.15} className="flex">
              <Card className="flex flex-col justify-between w-full bg-zinc-900/80 border-surface-border hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 group overflow-hidden p-0">
                {/* Project Image Banner */}
                <div className="relative h-48 w-full overflow-hidden bg-zinc-950">
                  <img
                    src={site.image}
                    alt={site.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent" />

                  {/* Badge */}
                  <div className="absolute top-4 left-4">
                    <span
                      className={`text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full border backdrop-blur-md ${site.badgeColor}`}
                    >
                      {site.badge}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="absolute bottom-4 left-4 p-3 bg-zinc-950/80 backdrop-blur-md rounded-xl border border-white/10 shadow-lg">
                    {site.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <span className="text-xs font-extrabold uppercase text-primary tracking-widest">
                      {site.category}
                    </span>

                    <h2 className="text-2xl font-black uppercase font-heading text-white tracking-tight group-hover:text-primary transition-colors">
                      {site.title}
                    </h2>

                    <p className="text-xs text-zinc-400 leading-relaxed min-h-[48px]">
                      {site.description}
                    </p>
                  </div>

                  {/* Feature Tags */}
                  <div className="flex flex-wrap gap-2 border-t border-zinc-800/80 pt-4">
                    {site.stats.map((stat, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-semibold text-zinc-300 bg-zinc-800/60 px-2.5 py-1 rounded-md border border-zinc-700/50"
                      >
                        {stat}
                      </span>
                    ))}
                  </div>

                  {/* CTA Launch Button */}
                  <div className="pt-2">
                    {site.isInternal ? (
                      <Link href={site.href} className="block w-full">
                        <Button
                          variant="primary"
                          size="lg"
                          fullWidth
                          icon={<ArrowRight className="w-4 h-4" />}
                        >
                          {site.buttonText}
                        </Button>
                      </Link>
                    ) : (
                      <a
                        href={site.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full"
                      >
                        <Button
                          variant="outline"
                          size="lg"
                          fullWidth
                          icon={<ExternalLink className="w-4 h-4" />}
                        >
                          {site.buttonText}
                        </Button>
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            </ScaleIn>
          ))}
        </div>

        {/* Hatab Studios Info / Quick Contact Strip */}
        <FadeIn className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-8 max-w-4xl mx-auto backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl font-black uppercase font-heading text-white">
              HATAB STUDIOS — EGYPT
            </h3>
            <p className="text-xs text-zinc-400">
              Pyramids Road, Al Haram, Giza, Cairo, Egypt 🇪🇬
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            <a
              href="mailto:ismailhatab88@gmail.com"
              className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-xl border border-zinc-700 transition-colors"
            >
              <Mail className="w-4 h-4 text-primary" />
              <span>ismailhatab88@gmail.com</span>
            </a>

            <a
              href="tel:010X XXX XXXX"
              className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-xl border border-zinc-700 transition-colors"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>010X XXX XXXX</span>
            </a>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
