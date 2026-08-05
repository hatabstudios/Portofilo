import React from "react";
import { ContactSection } from "@/components/sections/ContactSection";
import { Badge } from "@/components/ui/Badge";

export const metadata = {
  title: "Contact Us & Location Details",
  description: "Get in touch with Vortex Athletic Club, schedule a facility walkthrough, or claim your 7-day pass.",
};

export default function ContactPage() {
  return (
    <div className="pt-28 pb-16 bg-zinc-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <Badge variant="primary" className="mb-4">
          REACH OUR TEAM
        </Badge>
        <h1 className="text-4xl sm:text-6xl font-black uppercase font-heading text-white tracking-tight">
          CONTACT & <span className="text-primary accent-glow-text">LOCATION</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          We operate 24 hours a day, 7 days a week. Visit us or send a direct inquiry below.
        </p>
      </div>

      <ContactSection />
    </div>
  );
}
