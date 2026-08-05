import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { classesData } from "@/data/classes";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Clock, Flame, Calendar, User, CheckCircle2, ArrowLeft, ShieldCheck } from "lucide-react";

interface ClassDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ClassDetailPageProps) {
  const resolvedParams = await params;
  const gymClass = classesData.find((c) => c.slug === resolvedParams.slug);
  if (!gymClass) return { title: "Class Not Found" };
  return {
    title: `${gymClass.title} | Vortex Fitness Class`,
    description: gymClass.description,
  };
}

export default async function ClassDetailPage({ params }: ClassDetailPageProps) {
  const resolvedParams = await params;
  const gymClass = classesData.find((c) => c.slug === resolvedParams.slug);

  if (!gymClass) {
    notFound();
  }

  return (
    <div className="pt-28 pb-20 bg-zinc-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/classes"
          className="inline-flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-white uppercase mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Classes</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Detail Content */}
          <div className="lg:col-span-8 space-y-8">
            <div className="relative h-[420px] w-full rounded-2xl overflow-hidden border border-surface-border shadow-2xl">
              <Image
                src={gymClass.image}
                alt={gymClass.title}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />

              <div className="absolute bottom-6 left-6 right-6 space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="primary">{gymClass.category}</Badge>
                  <Badge variant="dark">{gymClass.intensity}</Badge>
                </div>
                <h1 className="text-3xl sm:text-5xl font-black uppercase font-heading text-white">
                  {gymClass.title}
                </h1>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-bold uppercase font-heading text-white border-b border-surface-border pb-3">
                Class Overview & Physiology
              </h2>
              <p className="text-sm text-zinc-300 leading-relaxed font-normal">
                {gymClass.fullDescription}
              </p>

              <div className="space-y-3 pt-4">
                <h3 className="text-base font-bold uppercase font-heading text-white">
                  Key Training Benefits
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {gymClass.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-surface-card rounded-xl border border-surface-border">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-xs font-semibold text-zinc-200">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {gymClass.equipmentNeeded && (
                <div className="space-y-3 pt-4">
                  <h3 className="text-base font-bold uppercase font-heading text-white">
                    What to Bring
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {gymClass.equipmentNeeded.map((item, idx) => (
                      <span key={idx} className="text-xs font-bold bg-surface-muted text-zinc-300 px-3 py-1.5 rounded-lg border border-surface-border">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar Booking & Info */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="bg-surface-card border-surface-border space-y-6">
              <h3 className="text-lg font-black uppercase font-heading text-white border-b border-surface-border pb-3">
                Class Information
              </h3>

              <div className="space-y-4 text-xs font-semibold text-zinc-300">
                <div className="flex items-center justify-between py-2 border-b border-surface-border/50">
                  <span className="flex items-center gap-2 text-zinc-400">
                    <Clock className="w-4 h-4 text-primary" /> Duration
                  </span>
                  <span className="text-white font-bold">{gymClass.durationMinutes} Minutes</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-surface-border/50">
                  <span className="flex items-center gap-2 text-zinc-400">
                    <Flame className="w-4 h-4 text-primary" /> Calorie Burn
                  </span>
                  <span className="text-white font-bold">{gymClass.caloriesBurned}</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-surface-border/50">
                  <span className="flex items-center gap-2 text-zinc-400">
                    <User className="w-4 h-4 text-primary" /> Lead Coach
                  </span>
                  <span className="text-white font-bold">{gymClass.instructorName}</span>
                </div>

                <div className="flex items-center justify-between py-2">
                  <span className="flex items-center gap-2 text-zinc-400">
                    <Calendar className="w-4 h-4 text-primary" /> Schedule
                  </span>
                  <span className="text-white font-bold">{gymClass.scheduleInfo}</span>
                </div>
              </div>

              <div className="pt-2 space-y-3">
                <Button href="/schedule" variant="primary" fullWidth size="lg">
                  Reserve Class Slot
                </Button>
                <p className="text-[11px] text-center text-zinc-500 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                  <span>Free Class Booking With All Pass Tiers</span>
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
