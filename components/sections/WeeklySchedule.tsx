"use client";

import React, { useState } from "react";
import { weeklyScheduleData, DaySchedule } from "@/data/schedule";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Badge } from "@/components/ui/Badge";
import { FadeIn } from "@/components/animations/MotionWrappers";
import { Clock, MapPin, User, Calendar, CheckCircle } from "lucide-react";

export const WeeklySchedule: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<DaySchedule["day"]>("Monday");
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");
  const [bookingModalSlot, setBookingModalSlot] = useState<any | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const currentDayData = weeklyScheduleData.find((d) => d.day === selectedDay);

  const categories = ["ALL", "Strength", "HIIT", "Cardio", "Yoga & Mobility", "Boxing & Combat"];

  const filteredSlots = currentDayData?.slots.filter((slot) => {
    if (categoryFilter === "ALL") return true;
    return slot.category === categoryFilter;
  }) || [];

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setBookingModalSlot(null);
    }, 2500);
  };

  return (
    <section className="py-24 bg-surface border-y border-surface-border relative overflow-hidden" id="schedule">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="LIVE TIMETABLE"
          title="WEEKLY CLASS"
          highlightTitle="SCHEDULE"
          description="Filter by day or workout discipline to plan your weekly physical training."
        />

        {/* Day Selection Tabs */}
        <FadeIn direction="down" className="flex items-center justify-start lg:justify-center overflow-x-auto pb-4 mb-8 gap-2 scrollbar-none">
          {weeklyScheduleData.map((d) => (
            <button
              key={d.day}
              onClick={() => setSelectedDay(d.day)}
              className={`px-5 py-3 text-xs font-black uppercase tracking-wider rounded-xl transition-all duration-200 shrink-0 ${
                selectedDay === d.day
                  ? "bg-primary text-white shadow-lg shadow-primary-glow"
                  : "bg-surface-card text-zinc-400 hover:text-white border border-surface-border"
              }`}
            >
              {d.day}
            </button>
          ))}
        </FadeIn>

        {/* Category Pills Filter */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider rounded-full transition-colors ${
                categoryFilter === cat
                  ? "bg-white text-black"
                  : "bg-surface-muted text-zinc-400 hover:text-white border border-surface-border"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Schedule Grid */}
        <div className="space-y-4">
          {filteredSlots.length === 0 ? (
            <div className="text-center py-12 text-zinc-500 font-semibold uppercase tracking-wider text-sm">
              No classes scheduled for this filter on {selectedDay}.
            </div>
          ) : (
            filteredSlots.map((slot) => (
              <FadeIn key={slot.id} direction="up">
                <Card className="p-4 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface-card/80 hover:border-primary/50 transition-all">
                  <div className="flex items-start sm:items-center gap-4">
                    <div className="px-4 py-3 bg-surface-muted rounded-xl border border-surface-border text-center shrink-0 min-w-[100px]">
                      <Clock className="w-4 h-4 text-primary mx-auto mb-1" />
                      <span className="text-xs font-black text-white font-heading tracking-wider block">
                        {slot.time}
                      </span>
                      <span className="text-[10px] font-bold text-zinc-500 uppercase">
                        {slot.duration}
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <Badge variant="primary" size="sm">
                          {slot.category}
                        </Badge>
                        <span className="text-xs font-semibold text-zinc-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-zinc-500" />
                          {slot.room}
                        </span>
                      </div>
                      <h4 className="text-lg font-black uppercase font-heading text-white">
                        {slot.className}
                      </h4>
                      <p className="text-xs text-zinc-400 flex items-center gap-1 mt-1">
                        <User className="w-3.5 h-3.5 text-primary" />
                        <span>Coach: <strong className="text-zinc-200">{slot.instructor}</strong></span>
                      </p>
                    </div>
                  </div>

                  <Button
                    onClick={() => setBookingModalSlot(slot)}
                    variant="outline"
                    size="sm"
                    className="self-start md:self-center"
                  >
                    Reserve Spot
                  </Button>
                </Card>
              </FadeIn>
            ))
          )}
        </div>
      </div>

      {/* Class Reservation Modal */}
      {bookingModalSlot && (
        <Modal
          isOpen={!!bookingModalSlot}
          onClose={() => setBookingModalSlot(null)}
          title={`Reserve ${bookingModalSlot.className}`}
        >
          {bookingSuccess ? (
            <div className="text-center py-8 space-y-4">
              <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto animate-bounce" />
              <h3 className="text-xl font-extrabold text-white font-heading uppercase">
                Reservation Confirmed!
              </h3>
              <p className="text-xs text-zinc-300">
                Your spot for {bookingModalSlot.className} on {selectedDay} at {bookingModalSlot.time} has been reserved. A confirmation pass was sent to your email.
              </p>
            </div>
          ) : (
            <form onSubmit={handleBookSubmit} className="space-y-4">
              <div className="p-4 bg-surface-muted rounded-xl border border-surface-border space-y-1 text-xs">
                <p className="text-white font-bold">{bookingModalSlot.className}</p>
                <p className="text-zinc-400">Day: {selectedDay} at {bookingModalSlot.time}</p>
                <p className="text-zinc-400">Coach: {bookingModalSlot.instructor} ({bookingModalSlot.room})</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  className="w-full bg-surface border border-surface-border text-white text-sm rounded-lg p-3"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="john@example.com"
                  className="w-full bg-surface border border-surface-border text-white text-sm rounded-lg p-3"
                />
              </div>

              <Button type="submit" variant="primary" fullWidth size="lg">
                Confirm Reservation
              </Button>
            </form>
          )}
        </Modal>
      )}
    </section>
  );
};
