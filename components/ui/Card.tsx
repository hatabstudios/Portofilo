import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  glowOnHover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  hoverEffect = true,
  glowOnHover = false,
}) => {
  return (
    <div
      className={twMerge(
        clsx(
          "glass-card rounded-xl p-6 sm:p-8 relative overflow-hidden transition-all duration-300",
          hoverEffect && "glass-card-hover",
          glowOnHover && "hover:border-primary/50 hover:shadow-accent-glow",
          className
        )
      )}
    >
      {children}
    </div>
  );
};
