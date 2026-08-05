"use client";

import React, { useState } from "react";
import { siteConfig } from "@/config/site";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { FadeIn } from "@/components/animations/MotionWrappers";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";

export const ContactSection: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "7-Day Free Trial",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", phone: "", interest: "7-Day Free Trial", message: "" });
    }, 4000);
  };

  return (
    <section className="py-24 bg-surface border-y border-surface-border relative overflow-hidden" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="GET IN TOUCH"
          title="START YOUR JOURNEY"
          highlightTitle="TODAY"
          description="Have questions about memberships, personal coaching, or scheduling a facility tour? Send us a message."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact Details Column */}
          <FadeIn direction="left" className="lg:col-span-5 space-y-6">
            <Card className="space-y-6 bg-surface-card border-surface-border">
              <h3 className="text-xl font-black uppercase font-heading text-white border-b border-surface-border pb-4">
                Club Information
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary-muted rounded-xl text-primary shrink-0 border border-primary/20">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white uppercase font-heading text-sm">Location</h4>
                    <p className="text-zinc-400 mt-0.5">{siteConfig.contact.address}</p>
                    <p className="text-zinc-400">{siteConfig.contact.city}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary-muted rounded-xl text-primary shrink-0 border border-primary/20">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white uppercase font-heading text-sm">Phone Hotline</h4>
                    <p className="text-zinc-400 mt-0.5">{siteConfig.contact.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary-muted rounded-xl text-primary shrink-0 border border-primary/20">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white uppercase font-heading text-sm">Email Inquiries</h4>
                    <p className="text-zinc-400 mt-0.5">{siteConfig.contact.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary-muted rounded-xl text-primary shrink-0 border border-primary/20">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white uppercase font-heading text-sm">Hours of Operation</h4>
                    <p className="text-zinc-400 mt-0.5">Weekdays: {siteConfig.contact.workingHours.weekdays}</p>
                    <p className="text-zinc-400">Weekends: {siteConfig.contact.workingHours.weekends}</p>
                    <p className="text-primary font-bold mt-1">24/7 Keycard Member Access</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Google Map Embed Frame */}
            <div className="h-64 rounded-xl overflow-hidden border border-surface-border relative shadow-lg">
              <iframe
                title="Gym Location Map"
                src={siteConfig.contact.mapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                allowFullScreen
                loading="lazy"
              />
            </div>
          </FadeIn>

          {/* Form Column */}
          <FadeIn direction="right" className="lg:col-span-7">
            <Card className="bg-surface-card border-surface-border p-8">
              {submitted ? (
                <div className="py-16 text-center space-y-4">
                  <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto animate-bounce" />
                  <h3 className="text-2xl font-black font-heading text-white uppercase">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-xs text-zinc-300 max-w-md mx-auto">
                    Thank you for reaching out. One of our master membership advisors will contact you within 2 business hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="text-xl font-black uppercase font-heading text-white border-b border-surface-border pb-4">
                    Send Us A Direct Message
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Your Name"
                      type="text"
                      required
                      placeholder="Alexander Vance"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    <Input
                      label="Email Address"
                      type="email"
                      required
                      placeholder="alexander@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Phone Number"
                      type="tel"
                      placeholder="010X XXX XXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                        Primary Interest
                      </label>
                      <select
                        value={formData.interest}
                        onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                        className="w-full bg-surface-muted/60 border border-surface-border text-white text-sm rounded-lg px-4 py-3 focus:outline-none focus:border-primary"
                      >
                        <option value="7-Day Free Trial">7-Day Free Trial Pass</option>
                        <option value="1-on-1 Personal Training">1-on-1 Personal Training</option>
                        <option value="VIP All-Access Membership">VIP All-Access Membership</option>
                        <option value="Corporate Membership">Corporate Membership</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                      Your Message
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Tell us about your fitness goals or any specific questions..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-surface-muted/60 border border-surface-border text-white text-sm rounded-lg p-4 focus:outline-none focus:border-primary placeholder:text-zinc-600"
                    />
                  </div>

                  <Button type="submit" variant="primary" size="lg" fullWidth icon={<Send className="w-4 h-4" />}>
                    Submit Inquiry
                  </Button>
                </form>
              )}
            </Card>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
