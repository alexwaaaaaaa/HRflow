"use client";

import React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "outline";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  loadingText?: string;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
}

const sizeMap = {
  sm: "h-8 px-3 text-xs gap-1.5",
  md: "h-[38px] px-4 text-[13px] gap-2",
  lg: "h-11 px-5 text-sm gap-2",
};

const variantMap = {
  primary: [
    "bg-[#00e5a0] text-[#04080f] font-semibold",
    "hover:bg-[#00cc8e] hover:-translate-y-px hover:shadow-[0_4px_16px_rgba(0,229,160,0.3)]",
    "active:scale-[0.97] active:shadow-none",
  ].join(" "),
  secondary: [
    "bg-[#0f1c2e] text-[#c8d8e8] border border-[#162030]",
    "hover:bg-[#162030] hover:border-[#1e3048] hover:text-[#f0f4f8]",
    "active:scale-[0.97]",
  ].join(" "),
  ghost: [
    "bg-transparent text-[#00e5a0] border border-[rgba(0,229,160,0.3)]",
    "hover:bg-[rgba(0,229,160,0.08)] hover:border-[rgba(0,229,160,0.5)]",
    "active:scale-[0.97]",
  ].join(" "),
  danger: [
    "bg-[rgba(239,68,68,0.1)] text-[#ef4444] border border-[rgba(239,68,68,0.25)]",
    "hover:bg-[rgba(239,68,68,0.18)] hover:border-[rgba(239,68,68,0.4)]",
    "active:scale-[0.97]",
  ].join(" "),
  outline: [
    "bg-transparent text-[#7a8fa6] border border-[#162030]",
    "hover:bg-[rgba(255,255,255,0.04)] hover:text-[#c8d8e8] hover:border-[#1e3048]",
    "active:scale-[0.97]",
  ].join(" "),
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = "primary", size = "md", isLoading, loadingText, icon, iconRight, className, disabled, ...props }, ref) => (
    <button
      ref={ref}
      disabled={disabled || isLoading}
      className={cn(
        "inline-flex items-center justify-center rounded-[10px] font-medium",
        "transition-all duration-150 cursor-pointer select-none",
        "disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none",
        sizeMap[size],
        variantMap[variant],
        className
      )}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
          {loadingText ?? children}
        </>
      ) : (
        <>
          {icon && <span className="flex items-center">{icon}</span>}
          {children}
          {iconRight && <span className="flex items-center">{iconRight}</span>}
        </>
      )}
    </button>
  )
);
Button.displayName = "Button";
export default Button;
