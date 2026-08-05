import React from "react";
import { Badge } from "./Badge";
import { FadeIn } from "../animations/MotionWrappers";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  highlightTitle?: string;
  description?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  title,
  highlightTitle,
  description,
  align = "center",
  className = "",
}) => {
  const alignClasses = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto",
  };

  return (
    <FadeIn className={`flex flex-col max-w-3xl mb-12 sm:mb-16 ${alignClasses[align]} ${className}`}>
      {badge && (
        <Badge variant="primary" className="mb-4">
          {badge}
        </Badge>
      )}

      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight uppercase text-white font-heading leading-tight">
        {title}{" "}
        {highlightTitle && (
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-red-400 to-amber-400 accent-glow-text">
            {highlightTitle}
          </span>
        )}
      </h2>

      {description && (
        <p className="mt-4 text-base sm:text-lg text-zinc-400 font-normal leading-relaxed">
          {description}
        </p>
      )}

      <div className="w-16 h-1 bg-primary rounded-full mt-6" />
    </FadeIn>
  );
};
