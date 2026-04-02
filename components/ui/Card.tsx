"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "glass" | "gradient-border";
  hover?: boolean;
  glow?: "green" | "blue" | "amber" | "red" | "purple" | "none";
  padding?: "none" | "sm" | "md" | "lg";
}

const glowMap = {
  green:  "hover:shadow-[0_4px_24px_rgba(0,229,160,0.12),0_0_0_1px_rgba(0,229,160,0.1)]",
  blue:   "hover:shadow-[0_4px_24px_rgba(59,130,246,0.12),0_0_0_1px_rgba(59,130,246,0.1)]",
  amber:  "hover:shadow-[0_4px_24px_rgba(245,158,11,0.12),0_0_0_1px_rgba(245,158,11,0.1)]",
  red:    "hover:shadow-[0_4px_24px_rgba(239,68,68,0.12),0_0_0_1px_rgba(239,68,68,0.1)]",
  purple: "hover:shadow-[0_4px_24px_rgba(139,92,246,0.12),0_0_0_1px_rgba(139,92,246,0.1)]",
  none:   "",
};

const paddingMap = {
  none: "",
  sm:   "p-4",
  md:   "p-5",
  lg:   "p-6",
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", hover = true, glow = "none", padding = "md", children, ...props }, ref) => {
    const base = "rounded-[18px] transition-all duration-200";

    const variants = {
      default: "bg-[#0b1422] border border-[#162030] shadow-[0_1px_3px_rgba(0,0,0,0.4),0_4px_16px_rgba(0,0,0,0.3)]",
      elevated: "bg-[#0f1c2e] border border-[#1e3048] shadow-[0_4px_24px_rgba(0,0,0,0.5),0_1px_4px_rgba(0,0,0,0.4)]",
      glass: "bg-[rgba(11,20,34,0.7)] backdrop-blur-xl border border-[rgba(255,255,255,0.06)]",
      "gradient-border": "bg-[#0b1422] border border-transparent bg-clip-padding",
    };

    return (
      <div
        ref={ref}
        className={cn(
          base,
          variants[variant],
          hover && "hover:-translate-y-0.5 hover:border-[#1e3048]",
          glow !== "none" && glowMap[glow],
          paddingMap[padding],
          className
        )}
        {...props}
      >
        {variant === "gradient-border" ? (
          <div className="relative">
            <div
              className="absolute inset-0 rounded-[18px] pointer-events-none"
              style={{
                background: "linear-gradient(135deg, rgba(0,229,160,0.25), rgba(59,130,246,0.12), transparent 60%)",
                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
                padding: "1px",
              }}
            />
            {children}
          </div>
        ) : children}
      </div>
    );
  }
);
Card.displayName = "Card";

export function CardHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex items-center justify-between mb-5", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn("text-[15px] font-600 text-[#f0f4f8] m-0", className)} {...props}>
      {children}
    </h3>
  );
}
