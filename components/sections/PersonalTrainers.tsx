"use client";

import React, { useState } from "react";
import Image from "next/image";
import { trainersData, Trainer } from "@/data/trainers";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { FadeIn, StaggerContainer } from "@/components/animations/MotionWrappers";
import { Award, Instagram, Linkedin, Twitter, ArrowRight, Quote } from "lucide-react";

export const PersonalTrainers: React.FC = () => {
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);

  return (
    <section className="py-24 bg-surface border-y border-surface-border relative overflow-hidden" id="trainers">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="WORLD CLASS COACHES"
          title="MEET OUR MASTER"
          highlightTitle="TRAINERS"
          description="Certified strength specialists, body composition experts, and fight mechanics coaches dedicated to your progress."
        />

        <StaggerContainer staggerChildren={0.15} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {trainersData.map((trainer) => (
            <FadeIn key={trainer.id}>
              <Card className="h-full flex flex-col justify-between p-0 overflow-hidden group bg-surface-card border-surface-border">
                {/* Photo Frame */}
                <div className="relative h-80 w-full overflow-hidden">
                  <Image
                    src={trainer.image}
                    alt={trainer.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent opacity-90" />

                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary bg-primary/20 border border-primary/30 px-2.5 py-0.5 rounded-full inline-block mb-1">
                      {trainer.experienceYears} Years Exp
                    </span>
                    <h3 className="text-xl font-black uppercase font-heading text-white">
                      {trainer.name}
                    </h3>
                    <p className="text-xs text-zinc-300 font-semibold">{trainer.role}</p>
                  </div>
                </div>

                {/* Specialties preview & button */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {trainer.specialties.map((spec, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-bold uppercase tracking-wider bg-surface-muted text-zinc-300 px-2.5 py-1 rounded-md border border-surface-border"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>

                  <Button
                    onClick={() => setSelectedTrainer(trainer)}
                    variant="outline"
                    size="sm"
                    fullWidth
                    icon={<ArrowRight className="w-4 h-4" />}
                  >
                    View Coach Bio
                  </Button>
                </div>
              </Card>
            </FadeIn>
          ))}
        </StaggerContainer>
      </div>

      {/* Trainer Bio Modal */}
      {selectedTrainer && (
        <Modal
          isOpen={!!selectedTrainer}
          onClose={() => setSelectedTrainer(null)}
          maxWidth="xl"
          title={`${selectedTrainer.name} - Bio`}
        >
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-6 items-center">
              <div className="relative w-32 h-32 rounded-xl overflow-hidden shrink-0 border-2 border-primary">
                <Image
                  src={selectedTrainer.image}
                  alt={selectedTrainer.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-2 text-center sm:text-left">
                <Badge variant="primary">{selectedTrainer.role}</Badge>
                <h3 className="text-2xl font-black uppercase font-heading text-white">
                  {selectedTrainer.name}
                </h3>
                <p className="text-xs text-zinc-400 font-semibold">
                  {selectedTrainer.experienceYears} Years Professional Coaching Experience
                </p>
              </div>
            </div>

            <div className="p-4 bg-surface-muted rounded-xl border border-surface-border italic text-xs text-zinc-300 flex items-start gap-3">
              <Quote className="w-5 h-5 text-primary shrink-0" />
              <span>&ldquo;{selectedTrainer.quote}&rdquo;</span>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Coaching Philosophy & Background
              </h4>
              <p className="text-xs text-zinc-300 leading-relaxed font-normal">
                {selectedTrainer.bio}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Accreditations & Certifications
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedTrainer.certifications.map((cert, i) => (
                  <span
                    key={i}
                    className="text-[11px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-3 py-1 rounded-md flex items-center gap-1.5"
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>{cert}</span>
                  </span>
                ))}
              </div>
            </div>

            <Button
              href="/contact"
              variant="primary"
              fullWidth
              size="lg"
              onClick={() => setSelectedTrainer(null)}
            >
              Book 1-on-1 Session With {selectedTrainer.name.split(" ")[0]}
            </Button>
          </div>
        </Modal>
      )}
    </section>
  );
};
