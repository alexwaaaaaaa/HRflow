"use client";

import React, { useId } from "react";
import { cn } from "@/lib/utils";

export interface CheckboxCardOption<V extends string> {
    value: V;
    label: string;
    description?: string;
    badge?: React.ReactNode;
}

export interface CheckboxCardGroupProps<V extends string> {
    name: string;
    legend: string;
    values: V[];
    options: CheckboxCardOption<V>[];
    onChange: (values: V[]) => void;
    ariaLabel?: string;
}

/**
 * CheckboxCardGroup — visual multi-select card group.
 *
 * Accessibility contract:
 *   - Renders a `<fieldset role="group" aria-label>` so screen readers
 *     announce the group name.
 *   - Each option is a `<label>` wrapping a `<input type="checkbox" className="peer sr-only">`.
 *     The `peer` class lets Tailwind's peer-checked variant style the visible card.
 *   - Space toggles the focused checkbox natively.
 *   - Tab moves between checkboxes; each gets a visible focus ring via
 *     `peer-focus-visible:opacity-100` on the ring overlay.
 *
 * Requirements: 6.4, 6.5, 7.3
 */
export default function CheckboxCardGroup<V extends string>({
    name,
    legend,
    values,
    options,
    onChange,
    ariaLabel,
}: CheckboxCardGroupProps<V>) {
    const baseId = useId();

    function handleChange(optionValue: V, checked: boolean) {
        if (checked) {
            onChange([...values, optionValue]);
        } else {
            onChange(values.filter((v) => v !== optionValue));
        }
    }

    return (
        <fieldset
            role="group"
            aria-label={ariaLabel ?? legend}
            className="border-0 p-0 m-0"
        >
            <legend className="text-[11px] font-600 uppercase tracking-[0.05em] text-[#7a8fa6] mb-3">
                {legend}
            </legend>
            <div className="flex flex-wrap gap-3">
                {options.map((option) => {
                    const inputId = `${baseId}-${option.value}`;
                    const isChecked = values.includes(option.value);

                    return (
                        <label
                            key={option.value}
                            htmlFor={inputId}
                            className={cn(
                                "relative flex cursor-pointer flex-col gap-1 rounded-2xl border p-4 transition-all duration-150",
                                "min-w-[140px] flex-1",
                                isChecked
                                    ? "border-[#00e5a0] bg-[#00e5a0]/5 shadow-[0_0_0_1px_#00e5a0]"
                                    : "border-[#1A2A3A] bg-[#0D1928] hover:border-[#2a3f55]",
                            )}
                        >
                            {/* sr-only checkbox input — peer drives visual state */}
                            <input
                                type="checkbox"
                                id={inputId}
                                name={name}
                                value={option.value}
                                checked={isChecked}
                                onChange={(e) => handleChange(option.value, e.target.checked)}
                                className="peer sr-only"
                            />

                            {/* Visual card content */}
                            <div className="flex items-center justify-between gap-2">
                                <span
                                    className={cn(
                                        "text-[13px] font-semibold",
                                        isChecked ? "text-[#00e5a0]" : "text-[#f0f4f8]",
                                    )}
                                >
                                    {option.label}
                                </span>
                                {option.badge && (
                                    <span className="shrink-0">{option.badge}</span>
                                )}
                            </div>

                            {option.description && (
                                <span className="text-[11px] text-[#7a8fa6] leading-relaxed">
                                    {option.description}
                                </span>
                            )}

                            {/* Focus ring — visible when the hidden input is focused via keyboard */}
                            <span
                                aria-hidden="true"
                                className={cn(
                                    "pointer-events-none absolute inset-0 rounded-2xl ring-2 ring-[#00e5a0] ring-offset-2 ring-offset-[#070d18] opacity-0",
                                    "peer-focus-visible:opacity-100",
                                )}
                            />
                        </label>
                    );
                })}
            </div>
        </fieldset>
    );
}
