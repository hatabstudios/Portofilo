'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { PROJECTS } from '@/data/projects';
import { classesData } from '@/data/classes';
import { trainersData } from '@/data/trainers';
import { pricingPlans } from '@/data/pricing';
import {
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  Calendar,
  Clock,
  User,
  ShieldCheck,
  Coffee,
  Dumbbell,
  Building2,
  Scissors,
  Music,
  Bot,
  Car,
  ChevronRight,
  Star,
  ShoppingBag,
  Send,
  Sliders,
  Flame,
  Globe,
  Mail,
  Zap,
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function TemplateDemoPage() {
  const params = useParams();
  const router = useRouter();
  const templateId = (params?.id as string) || 'pulse-gym';

  const project = PROJECTS.find((p) => p.id === templateId) || PROJECTS[2];

  // Interactive Demo States
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedClass, setSelectedClass] = useState<any>(null);
  const [selectedCarColor, setSelectedCarColor] = useState('#e11d48');
  const [aiPrompt, setAiPrompt] = useState('Build a Next.js 16 ecommerce storefront with 3D cards');
  const [aiResponse, setAiResponse] = useState<string | null>(null);

  // Form State
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 4000);
  };

  const handleAiGenerate = () => {
    setAiResponse('Generating code architecture with Turbopack & Three.js...');
    setTimeout(() => {
      setAiResponse(
        `✓ AI Model Output Generated:\n- Component: AppRouterLayout\n- Performance: 100/100 Lighthouse\n- Animation: 60FPS WebGL Shaders applied successfully.`
      );
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col font-sans select-text">
      {/* Top Demo Navigation Bar */}
      <header className="sticky top-0 z-50 px-4 py-3 sm:px-8 sm:py-4 bg-gray-950/90 backdrop-blur-md border-b border-gray-800 flex items-center justify-between">
        <button
          onClick={() => router.push('/')}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gray-900 border border-gray-800 text-xs sm:text-sm font-bold font-heading uppercase text-gray-300 hover:text-white hover:border-amber-400 transition-all"
        >
          <ArrowLeft size={16} />
          <span>Back to Portfolio</span>
        </button>

        <div className="flex items-center gap-3">
          <span
            className="hidden sm:inline-block px-3 py-1 text-xs font-bold font-heading uppercase rounded-full border"
            style={{
              borderColor: project.accentColor,
              color: project.accentColor,
              backgroundColor: 'rgba(15, 23, 42, 0.8)',
            }}
          >
            {project.badge}
          </span>

          <a
            href="mailto:hatabstudios@gmail.com?subject=Order%20Template%3A%20"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold font-heading text-xs uppercase tracking-wider text-gray-950 transition-all transform hover:scale-105 shadow-lg"
            style={{
              backgroundColor: project.accentColor,
              boxShadow: `0 0 20px ${project.glowColor}`,
            }}
          >
            <Mail size={14} />
            <span>Order This Template</span>
          </a>
        </div>
      </header>

      {/* Main Content Rendered By Template ID */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8 space-y-12">
        {/* Template Hero Banner */}
        <section className="relative rounded-3xl p-6 sm:p-12 border border-gray-800 overflow-hidden shadow-2xl" style={{ background: project.bgGradient }}>
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="text-xs font-bold tracking-widest uppercase font-heading text-gray-400 flex items-center gap-2">
              <Sparkles size={14} style={{ color: project.accentColor }} />
              HatabStudios Interactive Template Demo
            </span>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black font-heading uppercase tracking-tight text-white drop-shadow-lg">
              {project.name}
            </h1>

            <p className="text-lg sm:text-2xl font-medium font-heading text-amber-200/90">
              {project.tagline}
            </p>

            <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl">
              {project.description}
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-3">
              <a
                href="#demo-section"
                className="px-6 py-3 rounded-full font-bold font-heading text-xs sm:text-sm uppercase tracking-wider text-gray-950 transition-all transform hover:scale-105"
                style={{ backgroundColor: project.accentColor }}
              >
                Explore Live Demo Features ↓
              </a>
            </div>
          </div>
        </section>

        {/* DEMO SECTION SWITCHER */}
        <section id="demo-section" className="space-y-10">
          {/* 1. PULSE GYM DEMO */}
          {templateId === 'pulse-gym' && (
            <div className="space-y-12">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800 pb-6">
                <div>
                  <h2 className="text-2xl sm:text-4xl font-black font-heading uppercase text-white flex items-center gap-3">
                    <Dumbbell className="text-emerald-400" />
                    PULSE Athletic Classes & Training Schedules
                  </h2>
                  <p className="text-sm text-gray-400 mt-1">
                    Filter through live workout programs, instructor bios, and reservation slots.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {['All', 'Strength', 'HIIT', 'Boxing & Combat', 'Yoga & Mobility'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-bold font-heading transition-all ${
                        activeCategory === cat
                          ? 'bg-emerald-500 text-gray-950 shadow-md'
                          : 'bg-gray-900 text-gray-400 hover:text-white border border-gray-800'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Class Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {classesData
                  .filter((c) => activeCategory === 'All' || c.category === activeCategory)
                  .map((cls) => (
                    <div
                      key={cls.id}
                      className="rounded-2xl bg-gray-900 border border-gray-800 overflow-hidden hover:border-emerald-500/50 transition-all flex flex-col justify-between group"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={cls.image}
                          alt={cls.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-bold font-heading bg-gray-950/80 text-emerald-400 border border-emerald-500/40 uppercase">
                          {cls.category}
                        </span>
                      </div>

                      <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                        <div className="space-y-2">
                          <h3 className="text-lg font-bold text-white font-heading uppercase group-hover:text-emerald-400 transition-colors">
                            {cls.title}
                          </h3>
                          <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">
                            {cls.description}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-gray-800 space-y-2 text-xs text-gray-300">
                          <div className="flex items-center justify-between">
                            <span className="flex items-center gap-1.5 text-gray-400">
                              <Clock size={14} /> Duration:
                            </span>
                            <span className="font-semibold text-white">{cls.durationMinutes} Mins</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="flex items-center gap-1.5 text-gray-400">
                              <Flame size={14} className="text-orange-400" /> Burn:
                            </span>
                            <span className="font-semibold text-emerald-400">{cls.caloriesBurned}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="flex items-center gap-1.5 text-gray-400">
                              <User size={14} /> Coach:
                            </span>
                            <span className="font-semibold text-white">{cls.instructorName}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => setSelectedClass(cls)}
                          className="w-full py-2.5 rounded-xl bg-emerald-500 text-gray-950 font-bold font-heading text-xs uppercase tracking-wider hover:bg-emerald-400 transition-colors"
                        >
                          Book Reservation
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* 2. CAFÉ LUMIÈRE DEMO */}
          {templateId === 'cafe-lumiere' && (
            <div className="space-y-12">
              <div className="border-b border-gray-800 pb-6">
                <h2 className="text-2xl sm:text-4xl font-black font-heading uppercase text-white flex items-center gap-3">
                  <Coffee className="text-orange-400" />
                  Café Lumière Digital Bistro & Artisanal Menu
                </h2>
                <p className="text-sm text-gray-400 mt-1">
                  Boutique roasters, organic single-origin coffees, and freshly baked French pastries.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Menu Items */}
                <div className="lg:col-span-2 space-y-6">
                  <h3 className="text-lg font-bold uppercase font-heading text-amber-400 tracking-wider">
                    Signature Roasts & Artisan Bakery
                  </h3>

                  <div className="space-y-4">
                    {[
                      { name: 'Velvet Espresso Tonic', desc: 'Single-origin Ethiopian Yirgacheffe espresso over tonic and orange zest.', price: '$7.50' },
                      { name: 'Smoked Vanilla Cold Foam Brew', desc: '24-hour steep cold brew crowned with organic Bourbon vanilla cream.', price: '$8.00' },
                      { name: 'Pistachio Cardamom Croissant', desc: 'Twice-baked flaky French pastry stuffed with Sicilian pistachio praline.', price: '$6.50' },
                      { name: 'Truffle Scrambled Brioche', desc: 'Organic cage-free eggs, black truffle butter, and micro herbs on toasted brioche.', price: '$14.00' },
                    ].map((item, i) => (
                      <div key={i} className="p-4 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-between gap-4 hover:border-orange-500/50 transition-colors">
                        <div>
                          <h4 className="font-bold text-white font-heading text-base">{item.name}</h4>
                          <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                        </div>
                        <span className="text-base font-bold text-orange-400 font-heading shrink-0">{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Table Reservation Box */}
                <div className="p-6 rounded-2xl bg-gray-900 border border-gray-800 space-y-4">
                  <h3 className="text-lg font-bold font-heading uppercase text-white flex items-center gap-2">
                    <Calendar className="text-orange-400" size={18} />
                    Reserve A Table
                  </h3>
                  <p className="text-xs text-gray-400">Book your table online for coffee tastings or evening bistro service.</p>

                  <form onSubmit={handleFormSubmit} className="space-y-3 text-xs">
                    <div>
                      <label className="block text-gray-400 mb-1 font-heading uppercase">Full Name</label>
                      <input type="text" required placeholder="Alex Mercer" className="w-full p-2.5 rounded-lg bg-gray-950 border border-gray-800 text-white focus:border-orange-400 outline-none" />
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-1 font-heading uppercase">Date & Time</label>
                      <input type="datetime-local" required className="w-full p-2.5 rounded-lg bg-gray-950 border border-gray-800 text-white focus:border-orange-400 outline-none" />
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-1 font-heading uppercase">Guests</label>
                      <select className="w-full p-2.5 rounded-lg bg-gray-950 border border-gray-800 text-white focus:border-orange-400 outline-none">
                        <option>2 People</option>
                        <option>4 People</option>
                        <option>6+ VIP Private Booth</option>
                      </select>
                    </div>

                    <button type="submit" className="w-full py-3 rounded-xl bg-orange-500 text-gray-950 font-bold font-heading uppercase tracking-wider hover:bg-orange-400 transition-colors">
                      Confirm Reservation
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* 3. VELA ESTATE DEMO */}
          {templateId === 'vela-estate' && (
            <div className="space-y-12">
              <div className="border-b border-gray-800 pb-6">
                <h2 className="text-2xl sm:text-4xl font-black font-heading uppercase text-white flex items-center gap-3">
                  <Building2 className="text-sky-400" />
                  Vela Estate Architectural Penthouse Tour
                </h2>
                <p className="text-sm text-gray-400 mt-1">
                  Luxury real estate showcase with floorplan tours and private viewing concierge.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: 'The Sky Penthouse', beds: '4 Beds • 5 Baths', sqft: '6,400 Sq Ft', price: '$8,950,000', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop' },
                  { title: 'Harbor Villa', beds: '5 Beds • 6 Baths', sqft: '8,100 Sq Ft', price: '$12,400,000', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop' },
                  { title: 'Modernist Sanctuary', beds: '3 Beds • 4 Baths', sqft: '4,800 Sq Ft', price: '$5,750,000', img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop' },
                ].map((prop, i) => (
                  <div key={i} className="rounded-2xl bg-gray-900 border border-gray-800 overflow-hidden space-y-3 p-4 hover:border-sky-400/50 transition-colors">
                    <img src={prop.img} alt={prop.title} className="w-full h-48 object-cover rounded-xl" />
                    <h3 className="text-lg font-bold text-white font-heading uppercase">{prop.title}</h3>
                    <p className="text-xs text-gray-400">{prop.beds} | {prop.sqft}</p>
                    <span className="text-base font-bold text-sky-400 font-heading block">{prop.price}</span>
                    <button onClick={handleFormSubmit} className="w-full py-2.5 rounded-xl bg-sky-500 text-gray-950 font-bold font-heading text-xs uppercase hover:bg-sky-400 transition-colors">
                      Schedule Private Viewing
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. BLADE & COMB DEMO */}
          {templateId === 'blade-comb' && (
            <div className="space-y-12">
              <div className="border-b border-gray-800 pb-6">
                <h2 className="text-2xl sm:text-4xl font-black font-heading uppercase text-white flex items-center gap-3">
                  <Scissors className="text-rose-500" />
                  Blade & Comb Cyber Grooming Lounge
                </h2>
                <p className="text-sm text-gray-400 mt-1">
                  Master haircutting, hot towel razor shaves, and beard sculpt styling.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { service: 'Executive Haircut & Scalp Treatment', duration: '45 mins', price: '$65' },
                  { service: 'Traditional Hot Towel Straight Razor Shave', duration: '30 mins', price: '$45' },
                  { service: 'Beard Sculpt & Beard Oil Infusion', duration: '25 mins', price: '$35' },
                  { service: 'The Full Cyber Package (Cut + Shave + Facial)', duration: '75 mins', price: '$120' },
                ].map((s, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-gray-900 border border-gray-800 flex items-center justify-between hover:border-rose-500/50 transition-colors">
                    <div>
                      <h3 className="font-bold text-white font-heading text-base uppercase">{s.service}</h3>
                      <span className="text-xs text-gray-400">{s.duration}</span>
                    </div>
                    <div className="text-right space-y-2">
                      <span className="text-base font-bold text-rose-400 font-heading block">{s.price}</span>
                      <button onClick={handleFormSubmit} className="px-4 py-1.5 rounded-full bg-rose-500 text-gray-950 font-bold font-heading text-xs uppercase hover:bg-rose-400 transition-colors">
                        Book
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. ECHO LOUNGE DEMO */}
          {templateId === 'echo-lounge' && (
            <div className="space-y-12">
              <div className="border-b border-gray-800 pb-6">
                <h2 className="text-2xl sm:text-4xl font-black font-heading uppercase text-white flex items-center gap-3">
                  <Music className="text-purple-400" />
                  Echo Lounge VIP Nightlife & Live Events
                </h2>
                <p className="text-sm text-gray-400 mt-1">
                  DJ headliners, VIP table bottle service, and guestlist pass registration.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { event: 'CYBERPULSE // DJ KAIRO', date: 'THIS FRIDAY • 10:00 PM', price: 'VIP Table $800' },
                  { event: 'NEON WAVE // ECLIPSE NIGHT', date: 'SATURDAY • 11:00 PM', price: 'VIP Table $1,200' },
                  { event: 'AFTERHOURS // DEEP HOUSE', date: 'SUNDAY • 11:30 PM', price: 'VIP Table $650' },
                ].map((ev, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-gray-900 border border-gray-800 space-y-4 hover:border-purple-500/50 transition-colors">
                    <span className="text-xs font-bold text-purple-400 font-heading uppercase">{ev.date}</span>
                    <h3 className="text-xl font-bold text-white font-heading uppercase">{ev.event}</h3>
                    <span className="text-sm font-semibold text-gray-300 block">{ev.price}</span>
                    <button onClick={handleFormSubmit} className="w-full py-2.5 rounded-xl bg-purple-500 text-gray-950 font-bold font-heading text-xs uppercase hover:bg-purple-400 transition-colors">
                      Reserve VIP Table
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6. NEXUS AI DEMO */}
          {templateId === 'nexus-ai' && (
            <div className="space-y-12">
              <div className="border-b border-gray-800 pb-6">
                <h2 className="text-2xl sm:text-4xl font-black font-heading uppercase text-white flex items-center gap-3">
                  <Bot className="text-cyan-400" />
                  Nexus AI SaaS Prompt Simulator & API Engine
                </h2>
                <p className="text-sm text-gray-400 mt-1">
                  Test the interactive AI prompt playground for Next.js SaaS applications.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-gray-900 border border-gray-800 space-y-4">
                <label className="block text-xs font-bold font-heading text-gray-300 uppercase">Input AI Prompt</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    className="flex-1 p-3 rounded-xl bg-gray-950 border border-gray-800 text-sm text-white focus:border-cyan-400 outline-none"
                  />
                  <button
                    onClick={handleAiGenerate}
                    className="px-6 py-3 rounded-xl bg-cyan-500 text-gray-950 font-bold font-heading text-xs uppercase hover:bg-cyan-400 transition-colors"
                  >
                    Run AI Model
                  </button>
                </div>

                {aiResponse && (
                  <pre className="p-4 rounded-xl bg-gray-950 border border-cyan-500/40 text-xs font-mono text-cyan-300 overflow-x-auto">
                    {aiResponse}
                  </pre>
                )}
              </div>
            </div>
          )}

          {/* 7. APEX MOTORS DEMO */}
          {templateId === 'apex-motors' && (
            <div className="space-y-12">
              <div className="border-b border-gray-800 pb-6">
                <h2 className="text-2xl sm:text-4xl font-black font-heading uppercase text-white flex items-center gap-3">
                  <Car className="text-yellow-400" />
                  Apex Motors Supercar Paint & Spec Configurator
                </h2>
                <p className="text-sm text-gray-400 mt-1">
                  Customize vehicle exterior finishes and view performance metrics.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-gray-900 border border-gray-800 space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold font-heading uppercase text-white">Apex V12 GT Carbon</h3>
                    <p className="text-xs text-gray-400">780 HP • 0-60 MPH in 2.7s • 211 MPH Top Speed</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-gray-400 uppercase font-heading">Finish Color:</span>
                    {['#e11d48', '#0284c7', '#eab308', '#10b981', '#18181b'].map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedCarColor(color)}
                        className={`w-7 h-7 rounded-full border-2 transition-transform ${
                          selectedCarColor === color ? 'scale-125 border-white' : 'border-transparent'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                <div
                  className="h-64 rounded-xl border border-gray-800 flex items-center justify-center transition-colors duration-500 relative overflow-hidden"
                  style={{
                    background: `radial-gradient(ellipse at center, ${selectedCarColor} 0%, #090d16 80%)`,
                  }}
                >
                  <span className="text-2xl font-black font-heading uppercase tracking-widest text-white drop-shadow-2xl">
                    APEX SUPERCAR PREVIEW
                  </span>
                </div>

                <button onClick={handleFormSubmit} className="w-full py-3 rounded-xl bg-yellow-500 text-gray-950 font-bold font-heading text-xs uppercase hover:bg-yellow-400 transition-colors">
                  Schedule Track Test Drive
                </button>
              </div>
            </div>
          )}

          {/* Form Submission Success Toast Notification */}
          {formSubmitted && (
            <div className="fixed bottom-6 right-6 p-4 rounded-xl bg-emerald-500 text-gray-950 font-bold font-heading text-xs uppercase shadow-2xl flex items-center gap-2 z-50">
              <CheckCircle2 size={18} />
              <span>Demo Request Received! HatabStudios Concierge Will Contact You.</span>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
