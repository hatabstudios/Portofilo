"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/animations/MotionWrappers";
import { Mail, CheckCircle2, Gift } from "lucide-react";

export const Newsletter: React.FC = () => {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail("");
    }, 4000);
  };

  return (
    <section className="py-20 bg-zinc-950 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn direction="up">
          <Card className="p-8 sm:p-12 bg-gradient-to-r from-surface-card via-surface-card to-zinc-900 border-primary/40 shadow-2xl relative overflow-hidden">
            {/* Ambient accent orb */}
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
              <div className="md:col-span-7 space-y-3">
                <span className="text-xs font-extrabold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20 inline-flex items-center gap-1.5">
                  <Gift className="w-3.5 h-3.5" />
                  <span>CLAIM FREE TRAINING GUIDE</span>
                </span>
                <h3 className="text-2xl sm:text-3xl font-black uppercase font-heading text-white">
                  JOIN THE VORTEX INSIDER CLUB
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                  Subscribe today to get our 12-Week Hypertrophy & Fat Loss PDF program + exclusive member day guest passes delivered to your inbox.
                </p>
              </div>

              <div className="md:col-span-5">
                {subscribed ? (
                  <div className="p-4 bg-emerald-950/60 border border-emerald-800/40 rounded-xl text-center space-y-2">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                    <p className="text-xs font-bold text-white uppercase font-heading">
                      You&apos;re On The List!
                    </p>
                    <p className="text-[11px] text-zinc-300">
                      Check your inbox for your free PDF guide download.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="space-y-3">
                    <div className="relative">
                      <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
                      <input
                        type="email"
                        required
                        placeholder="Enter your email address..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-surface border border-surface-border text-white text-xs rounded-xl pl-10 pr-4 py-3.5 focus:outline-none focus:border-primary"
                      />
                    </div>
                    <Button type="submit" variant="primary" size="md" fullWidth>
                      Get Free Training Guide
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </Card>
        </FadeIn>
      </div>
    </section>
  );
};
