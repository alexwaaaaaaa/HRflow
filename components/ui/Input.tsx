"use client";

import React, { forwardRef, useId } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    /**
     * Visible label rendered above the input. Bound to the input via
     * `htmlFor` / `id`. If omitted, the consumer is responsible for providing
     * an accessible name via `aria-label` or `aria-labelledby` on the input
     * (passed through via the spread props).
     */
    label?: string;
    /**
     * Validation error message. When set, the input gains `aria-invalid="true"`
     * and the message is announced via a `role="alert"` element associated by
     * `aria-describedby`.
     */
    error?: string;
    /**
     * Helper text rendered below the input. Hidden when `error` is set.
     * Associated with the input via `aria-describedby` for screen readers.
     */
    hint?: string;
    leftElement?: React.ReactNode;
    rightElement?: React.ReactNode;
}

/**
 * Standard text input primitive used across HRflow.
 *
 * Accessibility contract:
 *   - Always has a stable `id`. If the consumer doesn't pass one, `useId()`
 *     generates a SSR-safe identifier so `<label htmlFor>` always resolves.
 *   - When `error` is set: `aria-invalid="true"` on the input, the message
 *     element renders `role="alert"` so it's announced immediately, and
 *     `aria-describedby` points to the message id.
 *   - When `hint` is set (and no error): `aria-describedby` points to the
 *     hint id so screen readers read the helper text after the field name.
 *   - Visual styling differs in error state but accessibility is the same.
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            className,
            label,
            error,
            hint,
            leftElement,
            rightElement,
            id: idProp,
            "aria-describedby": ariaDescribedByProp,
            ...props
        },
        ref,
    ) => {
        const reactId = useId();
        const id = idProp ?? reactId;
        const errorId = `${id}-error`;
        const hintId = `${id}-hint`;

        const describedByParts: string[] = [];
        if (ariaDescribedByProp) describedByParts.push(ariaDescribedByProp);
        if (error) describedByParts.push(errorId);
        else if (hint) describedByParts.push(hintId);
        const describedBy = describedByParts.length > 0 ? describedByParts.join(" ") : undefined;

        return (
            <div className="flex w-full flex-col gap-1.5">
                {label && (
                    <label
                        htmlFor={id}
                        className="text-[11px] font-600 uppercase tracking-[0.05em] text-[#7a8fa6]"
                    >
                        {label}
                    </label>
                )}
                <div className="relative">
                    {leftElement && (
                        <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#7a8fa6]">
                            {leftElement}
                        </div>
                    )}
                    <input
                        id={id}
                        ref={ref}
                        aria-invalid={error ? true : undefined}
                        aria-describedby={describedBy}
                        className={cn(
                            "h-10 w-full rounded-[10px] text-[13px] font-medium outline-none",
                            "bg-[#070d18] text-[#f0f4f8] placeholder:text-[#7a8fa6]",
                            "border transition-all duration-150",
                            error
                                ? "border-[#ef4444] focus:border-[#ef4444] focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]"
                                : "border-[#162030] focus:border-[#00e5a0] focus:shadow-[0_0_0_3px_rgba(0,229,160,0.1)]",
                            leftElement ? "pl-9" : "pl-3",
                            rightElement ? "pr-9" : "pr-3",
                            className,
                        )}
                        {...props}
                    />
                    {rightElement && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7a8fa6]">
                            {rightElement}
                        </div>
                    )}
                </div>
                {error && (
                    <p id={errorId} role="alert" className="text-[11px] text-[#ef4444]">
                        {error}
                    </p>
                )}
                {!error && hint && (
                    <p id={hintId} className="text-[11px] text-[#7a8fa6]">
                        {hint}
                    </p>
                )}
            </div>
        );
    },
);
Input.displayName = "Input";
export default Input;
