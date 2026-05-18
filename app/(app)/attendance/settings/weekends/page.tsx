"use client";

import { CheckCircle2, Save } from "lucide-react";

import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

// ─────────────────────────────────────────────────────────────────────────────
// Static config (module scope — keeps render pure)
// ─────────────────────────────────────────────────────────────────────────────

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const;
type Day = (typeof DAYS)[number];

const DEFAULT_WEEKENDS = new Set<Day>(["Saturday", "Sunday"]);

const WEEK_ORDINALS = ["1st", "2nd", "3rd", "4th", "5th"] as const;
// Odd Saturdays (2nd, 4th) are working by default; even (1st, 3rd, 5th) are off.
const DEFAULT_OFF_SATURDAYS = new Set([0, 2, 4]); // indices into WEEK_ORDINALS

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components (module scope — never defined inside render)
// ─────────────────────────────────────────────────────────────────────────────

interface DayTileProps {
    day: Day;
    isOff: boolean;
}

function DayTile({ day, isOff }: DayTileProps) {
    return (
        <button
            type="button"
            aria-pressed={isOff}
            className={`relative flex flex-col items-center justify-center rounded-xl border p-4 transition-colors hover:bg-[#1A2A3A]/50 ${
                isOff
                    ? "border-[#00E5A0]/50 bg-[#00E5A0]/10"
                    : "border-[#1A2A3A] bg-[#060B14]"
            }`}
        >
            {isOff && (
                <span className="absolute right-2 top-2 text-[#00E5A0]">
                    <CheckCircle2 size={14} aria-hidden="true" />
                </span>
            )}
            <span
                className={`mt-2 text-sm font-bold ${
                    isOff ? "text-[#00E5A0]" : "text-[#8899AA]"
                }`}
            >
                {day.substring(0, 3)}
            </span>
        </button>
    );
}

interface SaturdayToggleProps {
    ordinal: string;
    isOff: boolean;
}

function SaturdayToggle({ ordinal, isOff }: SaturdayToggleProps) {
    return (
        <label className="flex cursor-pointer items-center gap-2 rounded border border-[#2A3A4A] bg-[#1A2A3A] px-3 py-1.5">
            <input
                type="checkbox"
                defaultChecked={isOff}
                className="h-3 w-3 accent-[#0066FF]"
                aria-label={`${ordinal} Saturday is an off-day`}
            />
            <span className="w-3 text-xs font-bold text-white">{ordinal}</span>
        </label>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function WeekendPolicy() {
    return (
        <Page
            title="Weekend & Off-Day Policy"
            subtitle="Set default rest days for the organization. (Shift Roster overrides these settings)."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Attendance", href: "/attendance" },
                { label: "Settings", href: "/attendance/settings" },
                { label: "Weekends" },
            ]}
            maxWidth="900px"
            actions={
                <Button
                    variant="primary"
                    size="md"
                    icon={<Save size={16} aria-hidden="true" />}
                >
                    Save Pattern
                </Button>
            }
        >
            <div className="space-y-6">
                <Card padding="lg">
                    <h2 className="mb-6 text-lg font-bold text-white">
                        Select Weekly Off Days
                    </h2>

                    <div className="mb-8 grid grid-cols-4 gap-4 sm:grid-cols-7">
                        {DAYS.map((day) => (
                            <DayTile
                                key={day}
                                day={day}
                                isOff={DEFAULT_WEEKENDS.has(day)}
                            />
                        ))}
                    </div>

                    {/* Advanced exceptions */}
                    <div className="rounded-lg border border-[#2A3A4A] bg-[#060B14] p-5">
                        <h3 className="mb-4 text-sm font-bold text-white">
                            Advanced Exceptions (Odd/Even Saturdays)
                        </h3>

                        <label className="group mb-4 flex cursor-pointer items-start gap-3">
                            <div className="relative mt-0.5 flex items-center justify-center">
                                <input
                                    type="checkbox"
                                    className="peer sr-only"
                                    defaultChecked
                                    aria-label="Enable Alternate Saturday Working"
                                />
                                <div className="flex h-4 w-4 items-center justify-center rounded border border-[#2A3A4A] bg-[#060B14] transition-colors peer-checked:border-[#0066FF] peer-checked:bg-[#0066FF]">
                                    <svg
                                        className="h-3 w-3 text-white opacity-0 peer-checked:opacity-100"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={3}
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <span className="text-sm font-bold text-white transition-colors group-hover:text-[#0066FF]">
                                    Enable Alternate Saturday Working
                                </span>
                                <p className="text-xs text-[#8899AA]">
                                    Certain weeks will override the Saturday Rest-Day.
                                </p>
                            </div>
                        </label>

                        <div className="flex flex-wrap gap-3 pl-7">
                            {WEEK_ORDINALS.map((ordinal, ix) => (
                                <SaturdayToggle
                                    key={ordinal}
                                    ordinal={ordinal}
                                    isOff={DEFAULT_OFF_SATURDAYS.has(ix)}
                                />
                            ))}
                        </div>
                        <p className="mt-2 pl-7 text-[10px] text-[#556677]">
                            Checking the box makes it an OFF-DAY. Unchecked means it&apos;s a Working Day.
                        </p>
                    </div>
                </Card>
            </div>
        </Page>
    );
}
