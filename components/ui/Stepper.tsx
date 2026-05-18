"use client";

import React, { useId, useRef, useCallback } from "react";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface StepItem {
    id: string;
    label: string;
    description?: string;
    icon?: React.ReactNode;
}

export interface StepperProps {
    steps: readonly StepItem[];
    current: number;
    onStepClick?: (index: number) => void;
    ariaLabel?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Module-scope subcomponent — StepButton
// Defined at module scope to satisfy react/no-unstable-nested-components.
// ─────────────────────────────────────────────────────────────────────────────

interface StepButtonProps {
    index: number;
    step: StepItem;
    isDone: boolean;
    isActive: boolean;
    isFocusable: boolean;
    onStepClick?: (index: number) => void;
    buttonRef: React.RefCallback<HTMLButtonElement>;
}

function StepButton({
    index,
    step,
    isDone,
    isActive,
    isFocusable,
    onStepClick,
    buttonRef,
}: StepButtonProps) {
    const isClickable = isDone && !!onStepClick;

    const stateLabel = isDone ? "Completed" : isActive ? "Current" : "Upcoming";
    const ariaLabel = `${stateLabel} step: ${step.label}${step.description ? ` — ${step.description}` : ""}`;

    return (
        <button
            ref={buttonRef}
            type="button"
            onClick={isClickable ? () => onStepClick(index) : undefined}
            // Only truly disable future steps (not reachable at all).
            // Active and past steps stay enabled so they can receive focus;
            // the active step just has no onClick handler.
            disabled={!isActive && !isDone}
            tabIndex={isFocusable ? 0 : -1}
            aria-label={ariaLabel}
            className={cn(
                "relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-150",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00e5a0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D1928]",
                isDone
                    ? "border-[#00e5a0] bg-[#00e5a0] cursor-pointer hover:shadow-[0_0_10px_rgba(0,229,160,0.3)]"
                    : isActive
                      ? "border-[#00e5a0] bg-[rgba(0,229,160,0.15)] cursor-default"
                      : "border-[#1A2A3A] bg-[#0A1420] cursor-default",
                "disabled:cursor-default",
            )}
        >
            {isDone ? (
                <CheckCircle2 size={20} className="text-[#060B14]" aria-hidden="true" />
            ) : step.icon ? (
                <span
                    className={cn(
                        "flex items-center justify-center",
                        isActive ? "text-[#00e5a0]" : "text-[#445566]",
                    )}
                    aria-hidden="true"
                >
                    {step.icon}
                </span>
            ) : (
                <span
                    className={cn(
                        "text-xs font-bold",
                        isActive ? "text-[#00e5a0]" : "text-[#445566]",
                    )}
                    aria-hidden="true"
                >
                    {index + 1}
                </span>
            )}
        </button>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Stepper
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Stepper — generalised wizard progress indicator.
 *
 * Accessibility contract:
 *   - Renders `<ol role="list" aria-label>` so screen readers announce the group.
 *   - Active step's `<li>` gets `aria-current="step"`.
 *   - Past steps are clickable buttons (when `onStepClick` is provided); future
 *     steps are disabled buttons so they are announced but not activatable.
 *   - Arrow-key navigation moves focus between focusable step buttons.
 *   - Clicking a step button moves focus to that button.
 *
 * Requirements: 1.2, 5.4, 7.4
 */
export default function Stepper({ steps, current, onStepClick, ariaLabel }: StepperProps) {
    const listId = useId();
    // Collect refs to all step buttons so we can manage focus programmatically.
    const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

    // Stable ref callback factory — returns a RefCallback for a given index.
    const makeRefCallback = useCallback(
        (index: number): React.RefCallback<HTMLButtonElement> =>
            (el) => {
                buttonRefs.current[index] = el;
            },
        [],
    );

    // Arrow-key navigation between focusable step buttons.
    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLOListElement>) => {
            if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;

            // A step is keyboard-reachable if it has tabIndex=0 (active step or
            // past+clickable steps). Disabled future steps have tabIndex=-1.
            const focusableIndices = steps
                .map((_, i) => i)
                .filter((i) => {
                    const btn = buttonRefs.current[i];
                    return btn && btn.tabIndex === 0;
                });

            if (focusableIndices.length === 0) return;

            const activeIndex = focusableIndices.findIndex(
                (i) => buttonRefs.current[i] === document.activeElement,
            );

            let nextIndex: number;
            if (e.key === "ArrowRight") {
                nextIndex =
                    activeIndex === -1 || activeIndex === focusableIndices.length - 1
                        ? focusableIndices[0]!
                        : focusableIndices[activeIndex + 1]!;
            } else {
                nextIndex =
                    activeIndex <= 0
                        ? focusableIndices[focusableIndices.length - 1]!
                        : focusableIndices[activeIndex - 1]!;
            }

            buttonRefs.current[nextIndex]?.focus();
            e.preventDefault();
        },
        [steps],
    );

    return (
        <div className="overflow-x-auto">
            <ol
                id={listId}
                role="list"
                aria-label={ariaLabel ?? "Progress steps"}
                className="flex min-w-max items-start gap-0"
                onKeyDown={handleKeyDown}
            >
                {steps.map((step, i) => {
                    const isDone = i < current;
                    const isActive = i === current;
                    // Active step and past steps (when clickable) are in the tab order.
                    // Future steps get tabIndex=-1 so they are reachable via arrow keys only.
                    const isFocusable = isActive || isDone;

                    return (
                        <li
                            key={step.id}
                            aria-current={isActive ? "step" : undefined}
                            className="relative flex flex-1 flex-col items-center"
                        >
                            {/* Connector line — left half */}
                            {i > 0 && (
                                <span
                                    aria-hidden="true"
                                    className={cn(
                                        "absolute left-0 top-5 h-0.5 w-1/2 transition-colors",
                                        isDone || isActive ? "bg-[#00e5a0]" : "bg-[#1A2A3A]",
                                    )}
                                />
                            )}
                            {/* Connector line — right half */}
                            {i < steps.length - 1 && (
                                <span
                                    aria-hidden="true"
                                    className={cn(
                                        "absolute right-0 top-5 h-0.5 w-1/2 transition-colors",
                                        isDone ? "bg-[#00e5a0]" : "bg-[#1A2A3A]",
                                    )}
                                />
                            )}

                            <StepButton
                                index={i}
                                step={step}
                                isDone={isDone}
                                isActive={isActive}
                                isFocusable={isFocusable}
                                onStepClick={onStepClick}
                                buttonRef={makeRefCallback(i)}
                            />

                            <div className="mt-2 text-center">
                                <div
                                    className={cn(
                                        "text-xs font-semibold transition-colors",
                                        isActive
                                            ? "text-white"
                                            : isDone
                                              ? "text-[#00e5a0]"
                                              : "text-[#445566]",
                                    )}
                                >
                                    {step.label}
                                </div>
                                {step.description && (
                                    <div className="mt-0.5 text-[11px] text-[#445566]">
                                        {step.description}
                                    </div>
                                )}
                            </div>
                        </li>
                    );
                })}
            </ol>
        </div>
    );
}
