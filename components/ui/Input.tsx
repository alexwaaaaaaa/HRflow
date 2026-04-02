"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, leftElement, rightElement, id, ...props }, ref) => (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-[11px] font-600 text-[#7a8fa6] uppercase tracking-[0.05em]">
          {label}
        </label>
      )}
      <div className="relative">
        {leftElement && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#3d5166] pointer-events-none">
            {leftElement}
          </div>
        )}
        <input
          id={id}
          ref={ref}
          className={cn(
            "w-full h-10 rounded-[10px] text-[13px] font-medium outline-none",
            "bg-[#070d18] text-[#f0f4f8] placeholder:text-[#3d5166]",
            "border transition-all duration-150",
            error
              ? "border-[#ef4444] focus:border-[#ef4444] focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]"
              : "border-[#162030] focus:border-[#00e5a0] focus:shadow-[0_0_0_3px_rgba(0,229,160,0.1)]",
            leftElement  ? "pl-9"  : "pl-3",
            rightElement ? "pr-9"  : "pr-3",
            className
          )}
          {...props}
        />
        {rightElement && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#3d5166]">
            {rightElement}
          </div>
        )}
      </div>
      {error && <p className="text-[11px] text-[#ef4444]">{error}</p>}
      {!error && hint && <p className="text-[11px] text-[#3d5166]">{hint}</p>}
    </div>
  )
);
Input.displayName = "Input";
export default Input;
