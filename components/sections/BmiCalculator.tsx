"use client";

import React, { useState } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { FadeIn } from "@/components/animations/MotionWrappers";
import { Calculator, ArrowRight, Activity, Flame, ShieldAlert } from "lucide-react";

export const BmiCalculator: React.FC = () => {
  const [unitSystem, setUnitSystem] = useState<"metric" | "imperial">("metric");
  
  // Metric Inputs
  const [heightCm, setHeightCm] = useState<number>(175);
  const [weightKg, setWeightKg] = useState<number>(75);

  // Imperial Inputs
  const [heightFt, setHeightFt] = useState<number>(5);
  const [heightIn, setHeightIn] = useState<number>(9);
  const [weightLbs, setWeightLbs] = useState<number>(165);

  // Calculation Result
  const calculateBmi = (): number => {
    if (unitSystem === "metric") {
      if (!heightCm || !weightKg) return 0;
      const heightM = heightCm / 100;
      return parseFloat((weightKg / (heightM * heightM)).toFixed(1));
    } else {
      const totalInches = heightFt * 12 + heightIn;
      if (!totalInches || !weightLbs) return 0;
      return parseFloat(((weightLbs / (totalInches * totalInches)) * 703).toFixed(1));
    }
  };

  const bmiScore = calculateBmi();

  const getBmiCategory = (score: number) => {
    if (score < 18.5) {
      return {
        label: "Underweight",
        color: "text-amber-400 border-amber-400 bg-amber-400/10",
        barPercent: 20,
        recommendation: "Focus on hypertrophy strength training and caloric surplus nutrition.",
        suggestedClass: "Powerlifting & Barbell Mechanics",
      };
    } else if (score >= 18.5 && score <= 24.9) {
      return {
        label: "Optimal / Athletic",
        color: "text-emerald-400 border-emerald-400 bg-emerald-400/10",
        barPercent: 50,
        recommendation: "Maintain peak conditioning with metabolic circuits and mobility work.",
        suggestedClass: "Vortex HIIT & Metcon Shred",
      };
    } else if (score >= 25 && score <= 29.9) {
      return {
        label: "Overweight",
        color: "text-orange-400 border-orange-400 bg-orange-400/10",
        barPercent: 75,
        recommendation: "Combine high-energy cardio intervals with lean protein nutrition planning.",
        suggestedClass: "Heavy Bag Boxing & Tactical Strike",
      };
    } else {
      return {
        label: "High Body Mass / Obese",
        color: "text-red-400 border-red-400 bg-red-400/10",
        barPercent: 95,
        recommendation: "Low-impact indoor spin cycling paired with steady state walking.",
        suggestedClass: "Endurance Spin & Ergometer Hybrid",
      };
    }
  };

  const category = getBmiCategory(bmiScore);

  return (
    <section className="py-24 bg-zinc-950 relative overflow-hidden" id="bmi-calculator">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="INTERACTIVE HEALTH TOOL"
          title="BODY MASS INDEX"
          highlightTitle="CALCULATOR"
          description="Calculate your body composition score in real-time and unlock customized training program recommendations."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
          {/* Input Panel */}
          <FadeIn direction="left" className="lg:col-span-7">
            <Card className="h-full space-y-6 bg-surface-card border-surface-border">
              {/* Unit System Switcher */}
              <div className="flex items-center justify-between pb-4 border-b border-surface-border">
                <div className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-black uppercase font-heading text-white">
                    Enter Your Metrics
                  </h3>
                </div>

                <div className="bg-surface-muted p-1 rounded-lg border border-surface-border flex items-center text-xs">
                  <button
                    onClick={() => setUnitSystem("metric")}
                    className={`px-3 py-1.5 font-bold uppercase rounded-md transition-colors ${
                      unitSystem === "metric" ? "bg-primary text-white" : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    Metric (cm/kg)
                  </button>
                  <button
                    onClick={() => setUnitSystem("imperial")}
                    className={`px-3 py-1.5 font-bold uppercase rounded-md transition-colors ${
                      unitSystem === "imperial" ? "bg-primary text-white" : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    Imperial (ft/lbs)
                  </button>
                </div>
              </div>

              {/* Form Controls */}
              {unitSystem === "metric" ? (
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                      <span>Height: {heightCm} cm</span>
                      <span className="text-zinc-500">120cm - 220cm</span>
                    </div>
                    <input
                      type="range"
                      min={120}
                      max={220}
                      value={heightCm}
                      onChange={(e) => setHeightCm(Number(e.target.value))}
                      className="w-full accent-primary bg-surface-muted h-2 rounded-lg cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                      <span>Weight: {weightKg} kg</span>
                      <span className="text-zinc-500">40kg - 180kg</span>
                    </div>
                    <input
                      type="range"
                      min={40}
                      max={180}
                      value={weightKg}
                      onChange={(e) => setWeightKg(Number(e.target.value))}
                      className="w-full accent-primary bg-surface-muted h-2 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                        Height (Feet)
                      </label>
                      <input
                        type="number"
                        min={4}
                        max={7}
                        value={heightFt}
                        onChange={(e) => setHeightFt(Number(e.target.value))}
                        className="w-full bg-surface border border-surface-border text-white text-sm rounded-lg p-3"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                        Height (Inches)
                      </label>
                      <input
                        type="number"
                        min={0}
                        max={11}
                        value={heightIn}
                        onChange={(e) => setHeightIn(Number(e.target.value))}
                        className="w-full bg-surface border border-surface-border text-white text-sm rounded-lg p-3"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                      <span>Weight: {weightLbs} lbs</span>
                      <span className="text-zinc-500">90lbs - 400lbs</span>
                    </div>
                    <input
                      type="range"
                      min={90}
                      max={400}
                      value={weightLbs}
                      onChange={(e) => setWeightLbs(Number(e.target.value))}
                      className="w-full accent-primary bg-surface-muted h-2 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>
              )}

              <p className="text-[11px] text-zinc-500 italic pt-2">
                * Note: Body Mass Index is a screening score. For clinical body fat composition, try our in-house InBody 770 Bio-impedance scanner at the gym.
              </p>
            </Card>
          </FadeIn>

          {/* Results Score Card */}
          <FadeIn direction="right" className="lg:col-span-5">
            <Card className="h-full flex flex-col justify-between space-y-6 bg-surface-card border-primary/40 shadow-2xl">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-zinc-400">
                    Calculated Result
                  </span>
                  <Badge variant="primary">LIVE SCORE</Badge>
                </div>

                <div className="my-6 text-center py-6 bg-surface-muted/80 rounded-2xl border border-surface-border">
                  <span className="text-6xl font-black font-heading text-white accent-glow-text block">
                    {bmiScore}
                  </span>
                  <span className={`inline-block text-xs font-extrabold uppercase tracking-widest px-3 py-1 rounded-full border mt-3 ${category.color}`}>
                    {category.label}
                  </span>
                </div>

                {/* Progress Bar Indicator */}
                <div className="space-y-1.5 mb-6">
                  <div className="flex justify-between text-[10px] font-bold text-zinc-500 uppercase">
                    <span>Underweight</span>
                    <span>Optimal</span>
                    <span>Overweight</span>
                    <span>Obese</span>
                  </div>
                  <div className="w-full bg-surface-muted h-3 rounded-full overflow-hidden p-0.5 border border-surface-border">
                    <div
                      className="h-full bg-gradient-to-r from-amber-400 via-emerald-400 to-primary rounded-full transition-all duration-500"
                      style={{ width: `${category.barPercent}%` }}
                    />
                  </div>
                </div>

                <div className="p-4 bg-surface-muted rounded-xl border border-surface-border space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                    <Activity className="w-4 h-4 text-primary" />
                    <span>Recommended Fitness Focus</span>
                  </h4>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {category.recommendation}
                  </p>
                  <p className="text-xs text-primary font-bold pt-1">
                    Suggested Class: {category.suggestedClass}
                  </p>
                </div>
              </div>

              <Button href="/schedule" variant="primary" fullWidth icon={<ArrowRight className="w-4 h-4" />}>
                Book Recommended Class
              </Button>
            </Card>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
