import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vortex Athletic Club | Luxury Gym & Fitness Center",
  description:
    "Experience elite fitness, state-of-the-art machinery, world-class personal trainers, and high-energy group classes.",
};

export default function GymLayout({ children }: { children: React.ReactNode }) {
  return <div className="w-full min-h-screen bg-zinc-950">{children}</div>;
}
