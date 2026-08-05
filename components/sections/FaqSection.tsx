"use client";

import React, { useState } from "react";
import { faqsData } from "@/data/faqs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeIn } from "@/components/animations/MotionWrappers";
import { ChevronDown, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(faqsData[0].id);

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="py-24 bg-zinc-950 relative overflow-hidden" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="GOT QUESTIONS?"
          title="FREQUENTLY ASKED"
          highlightTitle="QUESTIONS"
          description="Everything you need to know about keycard access, membership cancellation, guest passes, and coaching."
        />

        <div className="space-y-4">
          {faqsData.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <FadeIn key={faq.id} direction="up">
                <div className="glass-card rounded-xl border border-surface-border overflow-hidden transition-all duration-300">
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-white uppercase font-heading hover:text-primary transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-3 text-base">
                      <HelpCircle className="w-5 h-5 text-primary shrink-0" />
                      <span>{faq.question}</span>
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-zinc-400 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-primary" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6 pt-2 text-xs text-zinc-300 leading-relaxed border-t border-surface-border/50">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
};
