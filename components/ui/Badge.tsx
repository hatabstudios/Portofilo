import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "dark" | "outline" | "gold";
  size?: "sm" | "md" | "lg";
  className?: string;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  icon,
}) => {
  const baseStyles =
    "inline-flex items-center font-extrabold tracking-widest uppercase rounded-full select-none";

  const variants = {
    primary: "bg-primary-muted text-primary border border-primary/30",
    secondary: "bg-white/10 text-white border border-white/20",
    dark: "bg-zinc-900/90 text-zinc-300 border border-zinc-800",
    outline: "bg-transparent text-primary border border-primary",
    gold: "bg-amber-500/15 text-amber-400 border border-amber-500/30",
  };

  const sizes = {
    sm: "px-2.5 py-0.5 text-[10px] gap-1",
    md: "px-3.5 py-1 text-xs gap-1.5",
    lg: "px-4 py-1.5 text-xs gap-2",
  };

  return (
    <span className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))}>
      {icon && <span>{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
