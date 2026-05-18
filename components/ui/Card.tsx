"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Card — standard surface used across the app.
 *
 * Variants:
 *   - default: subtle background + border (used inside content areas)
 *   - elevated: higher contrast + shadow (used for modals / standalone cards)
 *   - bare: no background or border (just a layout primitive)
 *
 * Padding is a separate prop so dense lists / data tables can use `padding="none"`
 * while keeping card visuals.
 */

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "elevated" | "bare";
    padding?: "none" | "sm" | "md" | "lg";
}

const variantClasses = {
    default: "bg-[#0D1928] border border-[#1A2A3A]",
    elevated: "bg-[#0D1928] border border-[#1A2A3A] shadow-[0_4px_24px_rgba(0,0,0,0.5)]",
    bare: "",
} as const;

const paddingClasses = {
    none: "",
    sm: "p-3",
    md: "p-5",
    lg: "p-7",
} as const;

const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ variant = "default", padding = "md", className, children, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(
                "rounded-2xl",
                variantClasses[variant],
                paddingClasses[padding],
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
);
Card.displayName = "Card";
export default Card;

export function CardHeader({
    className,
    children,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn("mb-4 flex flex-wrap items-center justify-between gap-2", className)}
            {...props}
        >
            {children}
        </div>
    );
}

export function CardTitle({
    className,
    children,
    ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h3
            className={cn("text-base font-semibold text-white", className)}
            {...props}
        >
            {children}
        </h3>
    );
}
