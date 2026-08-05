import React from "react";
import { MembershipPlans } from "@/components/sections/MembershipPlans";
import { FaqSection } from "@/components/sections/FaqSection";
import { Badge } from "@/components/ui/Badge";

export const metadata = {
  title: "Membership Plans & Pricing",
  description: "Simple, transparent gym membership pricing with no contracts or hidden cancellation fees.",
};

export default function PricingPage() {
  return (
    <div className="pt-28 pb-16 bg-zinc-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <Badge variant="primary" className="mb-4">
          MEMBERSHIP TIERS
        </Badge>
        <h1 className="text-4xl sm:text-6xl font-black uppercase font-heading text-white tracking-tight">
          MEMBERSHIP <span className="text-primary accent-glow-text">PLANS & PRICING</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          Choose the membership level that matches your physical ambition. Cancel or pause anytime.
        </p>
      </div>

      <MembershipPlans />
      <FaqSection />
    </div>
  );
}
