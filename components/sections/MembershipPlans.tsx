"use client";

import React, { useState } from "react";
import { pricingPlans } from "@/data/pricing";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { FadeIn, StaggerContainer } from "@/components/animations/MotionWrappers";
import { Check, X, Sparkles, ShieldCheck } from "lucide-react";

export const MembershipPlans: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section className="py-24 bg-zinc-950 relative overflow-hidden" id="pricing">
      {/* Glow background accent */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="TRANSPARENT PRICING"
          title="INVEST IN YOUR"
          highlightTitle="PHYSICAL SUPREMACY"
          description="Flexible membership tiers with no hidden registration fees or long-term lock-in contracts."
        />

        {/* Monthly vs Annual Billing Toggle */}
        <FadeIn direction="down" className="flex items-center justify-center mb-16">
          <div className="bg-surface-card p-1.5 rounded-full border border-surface-border inline-flex items-center gap-2">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-6 py-2.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 ${
                !isAnnual
                  ? "bg-primary text-white shadow-md shadow-primary-glow"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-6 py-2.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 flex items-center gap-2 ${
                isAnnual
                  ? "bg-primary text-white shadow-md shadow-primary-glow"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <span>Annual Prepaid</span>
              <span className="bg-amber-400 text-black text-[10px] font-black px-2 py-0.5 rounded-full">
                SAVE 25%
              </span>
            </button>
          </div>
        </FadeIn>

        {/* Pricing Cards Grid */}
        <StaggerContainer staggerChildren={0.15} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {pricingPlans.map((plan) => {
            const price = isAnnual ? plan.annualPriceMonthlyEquivalent : plan.monthlyPrice;

            return (
              <FadeIn key={plan.id}>
                <Card
                  className={`h-full flex flex-col justify-between relative ${
                    plan.popular
                      ? "border-primary/60 shadow-2xl shadow-primary-glow/20 bg-surface-card/90"
                      : "bg-surface-card/60"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-extrabold tracking-widest px-4 py-1.5 rounded-bl-xl uppercase shadow-md flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>{plan.badge}</span>
                    </div>
                  )}

                  <div>
                    {!plan.popular && plan.badge && (
                      <Badge variant="dark" className="mb-4">
                        {plan.badge}
                      </Badge>
                    )}

                    <h3 className="text-2xl font-black uppercase font-heading text-white mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-xs text-zinc-400 min-h-[36px] leading-relaxed mb-6">
                      {plan.description}
                    </p>

                    {/* Price Display */}
                    <div className="py-4 my-4 border-y border-surface-border flex items-baseline gap-2">
                      <span className="text-5xl font-black font-heading text-white accent-glow-text">
                        ${price}
                      </span>
                      <span className="text-sm font-bold text-zinc-400 uppercase">
                        / month {isAnnual && <span className="text-[10px] text-primary block">Billed annually</span>}
                      </span>
                    </div>

                    {/* Feature Checklist */}
                    <ul className="space-y-3.5 my-6 text-xs">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          {feature.included ? (
                            <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          ) : (
                            <X className="w-4 h-4 text-zinc-600 shrink-0 mt-0.5" />
                          )}
                          <span className={feature.included ? "text-zinc-200" : "text-zinc-600 line-through"}>
                            {feature.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6">
                    <Button
                      href="/contact"
                      variant={plan.popular ? "primary" : "outline"}
                      fullWidth
                      size="lg"
                    >
                      {plan.ctaText}
                    </Button>
                    <p className="text-[11px] text-center text-zinc-500 mt-3 flex items-center justify-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                      <span>7-Day Money-Back Guarantee</span>
                    </p>
                  </div>
                </Card>
              </FadeIn>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
};
