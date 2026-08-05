"use client";

import React from "react";
import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { ProgressStats } from "@/components/sections/ProgressStats";
import { ClassesSection } from "@/components/sections/ClassesSection";
import { PersonalTrainers } from "@/components/sections/PersonalTrainers";
import { BmiCalculator } from "@/components/sections/BmiCalculator";
import { WeeklySchedule } from "@/components/sections/WeeklySchedule";
import { MembershipPlans } from "@/components/sections/MembershipPlans";
import { Testimonials } from "@/components/sections/Testimonials";
import { GallerySection } from "@/components/sections/GallerySection";
import { FaqSection } from "@/components/sections/FaqSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Newsletter } from "@/components/sections/Newsletter";

export default function GymPage() {
  return (
    <div className="w-full">
      <Hero />
      <Features />
      <WhyChooseUs />
      <ProgressStats />
      <ClassesSection />
      <PersonalTrainers />
      <BmiCalculator />
      <WeeklySchedule />
      <MembershipPlans />
      <Testimonials />
      <GallerySection />
      <FaqSection />
      <ContactSection />
      <Newsletter />
    </div>
  );
}
