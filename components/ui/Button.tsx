"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "glass" | "ghost";
  size?: "sm" | "md" | "lg" | "xl";
  href?: string;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  href,
  children,
  className = "",
  icon,
  iconPosition = "right",
  fullWidth = false,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-bold tracking-wider uppercase transition-all duration-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none";

  const variants = {
    primary:
      "bg-primary text-white hover:bg-primary-hover shadow-lg shadow-primary-glow border border-primary/20",
    secondary:
      "bg-white text-black hover:bg-zinc-200 border border-white/80 shadow-md",
    outline:
      "bg-transparent text-white border border-white/30 hover:border-primary hover:text-primary hover:bg-primary/10",
    glass:
      "bg-white/10 text-white backdrop-blur-md border border-white/15 hover:bg-white/20 hover:border-white/30",
    ghost: "bg-transparent text-zinc-400 hover:text-white hover:bg-white/5",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs gap-1.5",
    md: "px-6 py-3 text-sm gap-2",
    lg: "px-8 py-4 text-base gap-2.5",
    xl: "px-10 py-5 text-lg gap-3",
  };

  const combinedClasses = twMerge(
    clsx(
      baseStyles,
      variants[variant],
      sizes[size],
      fullWidth && "w-full",
      className
    )
  );

  const content = (
    <>
      {icon && iconPosition === "left" && <span className="inline-block">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === "right" && <span className="inline-block">{icon}</span>}
    </>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={combinedClasses}
        >
          {content}
        </motion.div>
      </Link>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={combinedClasses}
      {...(props as any)}
    >
      {content}
    </motion.button>
  );
};
