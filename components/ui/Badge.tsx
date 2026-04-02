import React from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant = "success" | "warning" | "danger" | "info" | "purple" | "neutral" | "ai";

const variantMap: Record<BadgeVariant, string> = {
  success: "bg-[rgba(0,229,160,0.12)] text-[#00e5a0] border border-[rgba(0,229,160,0.2)]",
  warning: "bg-[rgba(245,158,11,0.12)] text-[#f59e0b] border border-[rgba(245,158,11,0.2)]",
  danger:  "bg-[rgba(239,68,68,0.12)]  text-[#ef4444] border border-[rgba(239,68,68,0.2)]",
  info:    "bg-[rgba(59,130,246,0.12)]  text-[#3b82f6] border border-[rgba(59,130,246,0.2)]",
  purple:  "bg-[rgba(139,92,246,0.12)]  text-[#8b5cf6] border border-[rgba(139,92,246,0.2)]",
  neutral: "bg-[rgba(255,255,255,0.06)] text-[#7a8fa6] border border-[rgba(255,255,255,0.08)]",
  ai:      "bg-gradient-to-r from-[rgba(139,92,246,0.2)] to-[rgba(59,130,246,0.2)] text-[#a78bfa] border border-[rgba(139,92,246,0.25)]",
};

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  dot?: boolean;
}

export function Badge({ variant = "neutral", dot, className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-600 tracking-[0.02em]",
        variantMap[variant],
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
          style={{ background: "currentColor" }}
        />
      )}
      {children}
    </span>
  );
}
