"use client";

/**
 * Shared "labelled row" controls used across HR policy settings pages
 * (late-coming, overtime, leave accrual, OKR settings, etc.).
 *
 * These were originally defined inside individual page components, which
 * triggered React 19's `react-hooks/static-components` rule — every parent
 * render created a fresh component identity, resetting the inner input's
 * focus on every keystroke. Hoisting them to module scope fixes that.
 */

import type { ChangeEvent } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// Toggle
// ─────────────────────────────────────────────────────────────────────────────

interface ToggleProps {
    on: boolean;
    onChange: () => void;
    label?: string;
    disabled?: boolean;
}

export function Toggle({ on, onChange, label, disabled }: ToggleProps) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={on}
            aria-label={label}
            disabled={disabled}
            onClick={onChange}
            className={`relative h-5 w-10 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                on ? "bg-[#00E5A0]" : "bg-[#1A2A3A]"
            }`}
        >
            <span
                className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${
                    on ? "translate-x-5" : "translate-x-0.5"
                }`}
            />
        </button>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// PolicyRow
// ─────────────────────────────────────────────────────────────────────────────

export type PolicyRowType = "text" | "number" | "time" | "toggle";

interface PolicyRowProps {
    label: string;
    desc?: string;
    value: string | boolean;
    type?: PolicyRowType;
    placeholder?: string;
    disabled?: boolean;
    onChange: (next: string | boolean) => void;
}

export function PolicyRow({
    label,
    desc,
    value,
    type = "text",
    placeholder,
    disabled,
    onChange,
}: PolicyRowProps) {
    const handleInput = (e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value);

    return (
        <div className="flex items-center justify-between border-b border-[#1A2A3A] py-4 last:border-0">
            <div className="min-w-0 flex-1 pr-4">
                <p className="text-sm font-medium text-white">{label}</p>
                {desc && <p className="mt-0.5 text-xs text-[#445566]">{desc}</p>}
            </div>
            {type === "toggle" ? (
                <Toggle
                    on={!!value}
                    label={label}
                    disabled={disabled}
                    onChange={() => onChange(!value)}
                />
            ) : (
                <input
                    aria-label={label}
                    value={String(value)}
                    onChange={handleInput}
                    type={type === "time" ? "time" : type === "number" ? "number" : "text"}
                    placeholder={placeholder}
                    disabled={disabled}
                    className="w-28 rounded-lg border border-[#1A2A3A] bg-[#060B14] px-3 py-1.5 text-right text-sm text-white outline-none transition-colors focus:border-[#00E5A0] disabled:opacity-50"
                />
            )}
        </div>
    );
}


// ─────────────────────────────────────────────────────────────────────────────
// SettingsToggle — labelled row with a toggle on the right (variant accent)
// ─────────────────────────────────────────────────────────────────────────────

interface SettingsToggleProps {
    id: string;
    label: string;
    desc?: string;
    on: boolean;
    onChange: (next: boolean) => void;
    /** Toggle accent colour (defaults to the brand green). */
    accent?: string;
}

export function SettingsToggle({
    id,
    label,
    desc,
    on,
    onChange,
    accent = "#00E5A0",
}: SettingsToggleProps) {
    return (
        <div className="flex items-start justify-between gap-4 border-b border-[#1A2A3A] py-4 last:border-0">
            <div className="min-w-0 flex-1">
                <label htmlFor={id} className="cursor-pointer text-sm font-medium text-white">
                    {label}
                </label>
                {desc && <p className="mt-0.5 text-xs text-[#8899AA]">{desc}</p>}
            </div>
            <button
                id={id}
                type="button"
                role="switch"
                aria-checked={on}
                onClick={() => onChange(!on)}
                className="relative h-6 w-11 shrink-0 rounded-full transition-colors"
                style={{ background: on ? accent : "#1A2A3A" }}
            >
                <span
                    aria-hidden="true"
                    className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                        on ? "translate-x-5" : "translate-x-0"
                    }`}
                />
                <span className="sr-only">{on ? "Enabled" : "Disabled"}</span>
            </button>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// SettingsSelect — labelled row with a select dropdown on the right
// ─────────────────────────────────────────────────────────────────────────────

interface SettingsSelectProps {
    id: string;
    label: string;
    desc?: string;
    value: string;
    options: readonly string[];
    onChange: (next: string) => void;
    /** Focus border colour (defaults to brand green). */
    accent?: string;
}

export function SettingsSelect({
    id,
    label,
    desc,
    value,
    options,
    onChange,
    accent = "#00E5A0",
}: SettingsSelectProps) {
    return (
        <div className="flex items-start justify-between gap-4 border-b border-[#1A2A3A] py-4 last:border-0">
            <div className="min-w-0 flex-1">
                <label htmlFor={id} className="text-sm font-medium text-white">
                    {label}
                </label>
                {desc && <p className="mt-0.5 text-xs text-[#8899AA]">{desc}</p>}
            </div>
            <div className="relative shrink-0">
                <select
                    id={id}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="cursor-pointer appearance-none rounded-lg border border-[#1A2A3A] bg-[#0A1420] py-1.5 pl-3 pr-7 text-sm text-white outline-none transition-colors"
                    style={{ borderColor: undefined }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = accent)}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "#1A2A3A")}
                >
                    {options.map((o) => (
                        <option key={o}>{o}</option>
                    ))}
                </select>
                <svg
                    aria-hidden="true"
                    className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 text-[#445566]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
        </div>
    );
}
