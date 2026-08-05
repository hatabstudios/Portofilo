import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ArrowLeft, Dumbbell } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center pt-28 pb-16 px-4">
      <div className="max-w-md w-full text-center space-y-6 glass-card p-10 rounded-2xl border border-surface-border relative">
        <div className="w-16 h-16 rounded-2xl bg-primary-muted border border-primary/30 flex items-center justify-center mx-auto text-primary">
          <Dumbbell className="w-8 h-8" />
        </div>

        <Badge variant="primary">ERROR 404</Badge>

        <h1 className="text-5xl font-black font-heading text-white accent-glow-text uppercase">
          OUT OF BOUNDS
        </h1>

        <p className="text-xs text-zinc-400 leading-relaxed">
          The page or workout route you are looking for has been moved or does not exist in our training directory.
        </p>

        <Button href="/" variant="primary" fullWidth icon={<ArrowLeft className="w-4 h-4" />} iconPosition="left">
          Return To Home Base
        </Button>
      </div>
    </div>
  );
}
