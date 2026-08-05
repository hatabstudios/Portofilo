import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className = "", ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {icon && (
            <div className="absolute left-3.5 text-zinc-500 pointer-events-none">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={twMerge(
              clsx(
                "w-full bg-surface-muted/60 border border-surface-border text-white text-sm rounded-lg px-4 py-3 transition-all duration-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-zinc-600",
                icon && "pl-11",
                error && "border-red-500 focus:border-red-500 focus:ring-red-500",
                className
              )
            )}
            {...props}
          />
        </div>
        {error && <p className="text-xs text-red-500 font-medium mt-1">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
