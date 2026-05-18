"use client";

import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

// ─────────────────────────────────────────────────────────────────────────────
// Static data
// ─────────────────────────────────────────────────────────────────────────────

const DAYS_OF_WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

const LEGEND = [
    { color: "bg-[#00E5A0]", label: "Sick Leave" },
    { color: "bg-[#FFB800]", label: "Privilege Leave" },
    { color: "bg-[#0066FF]", label: "Official Duty" },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function LeaveCalendarPage() {
    return (
        <Page
            title="Team Leave Calendar"
            subtitle="View upcoming planned absences across your department to avoid overlaps"
            breadcrumbs={[
                { label: "Leave", href: "/leave/dashboard" },
                { label: "Calendar" },
            ]}
            maxWidth="1400px"
            actions={
                <div role="group" aria-label="Calendar view" className="inline-flex gap-1 rounded-lg border border-[#1A2A3A] bg-[#0D1928] p-1">
                    <Button size="sm">Month</Button>
                    <Button variant="ghost" size="sm">Week</Button>
                </div>
            }
        >
            <Card padding="none" className="flex flex-col" style={{ minHeight: "700px" }}>
                {/* Toolbar */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1A2A3A] bg-[#0A1420] p-4">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <Button
                                variant="secondary"
                                size="sm"
                                icon={<ChevronLeft size={16} aria-hidden="true" />}
                                aria-label="Previous month"
                            />
                            <span className="w-40 text-center text-lg font-bold text-white">November 2024</span>
                            <Button
                                variant="secondary"
                                size="sm"
                                icon={<ChevronRight size={16} aria-hidden="true" />}
                                aria-label="Next month"
                            />
                        </div>
                        <Button variant="ghost" size="sm">Today</Button>
                    </div>
                    <div className="flex gap-3">
                        <select
                            aria-label="Filter by department"
                            className="rounded-lg border border-[#1A2A3A] bg-[#060B14] px-3 py-2 text-sm text-white outline-none focus:border-[#0066FF]"
                        >
                            <option>Engineering Dept</option>
                            <option>Product Dept</option>
                        </select>
                        <div className="relative">
                            <Search
                                size={16}
                                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]"
                                aria-hidden="true"
                            />
                            <input
                                type="search"
                                placeholder="Search employee…"
                                aria-label="Search employee"
                                className="w-64 rounded-lg border border-[#1A2A3A] bg-[#060B14] py-2 pl-9 pr-3 text-sm text-white outline-none focus:border-[#0066FF]"
                            />
                        </div>
                    </div>
                </div>

                {/* Calendar grid */}
                <div className="flex-1 overflow-auto bg-[#060B14] p-6">
                    <div className="grid grid-cols-7 gap-4">
                        {DAYS_OF_WEEK.map((day) => (
                            <div
                                key={day}
                                className="mb-2 text-center text-xs font-bold uppercase tracking-widest text-[#556677]"
                                aria-hidden="true"
                            >
                                {day}
                            </div>
                        ))}

                        {Array.from({ length: 35 }).map((_, i) => {
                            const isWeekend = i % 7 === 5 || i % 7 === 6;
                            const dayNum = (i + 28) % 31 + 1;
                            const isToday = i === 13;
                            return (
                                <div
                                    key={i}
                                    className={`min-h-[120px] rounded-xl border border-[#1A2A3A] p-2 ${isWeekend ? "bg-[#060B14]" : "bg-[#0D1928]"}`}
                                >
                                    <div
                                        className={`mb-2 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                                            isToday
                                                ? "bg-[#0066FF] text-white"
                                                : "text-[#556677]"
                                        }`}
                                    >
                                        {dayNum}
                                    </div>

                                    {i === 13 && (
                                        <div className="mb-1 cursor-pointer rounded border-l-2 border-[#00E5A0] bg-[#00E5A0]/10 p-1.5 transition-colors hover:bg-[#00E5A0]/20">
                                            <p className="truncate text-[10px] font-bold text-[#00E5A0]">Rohan (Sick)</p>
                                        </div>
                                    )}
                                    {i === 14 && (
                                        <div className="mb-1 cursor-pointer rounded border-l-2 border-[#FFB800] bg-[#FFB800]/10 p-1.5 transition-colors hover:bg-[#FFB800]/20">
                                            <p className="truncate text-[10px] font-bold text-[#FFB800]">Priya (EL)</p>
                                        </div>
                                    )}
                                    {i > 22 && i < 26 && (
                                        <div className="mb-1 cursor-pointer rounded border-l-2 border-[#0066FF] bg-[#0066FF]/10 p-1.5 transition-colors hover:bg-[#0066FF]/20">
                                            <p className="truncate text-[10px] font-bold text-[#0066FF]">Arjun (Conf)</p>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Legend */}
                <div className="flex flex-wrap items-center gap-6 border-t border-[#1A2A3A] bg-[#0A1420] p-4 text-xs font-bold text-[#8899AA]">
                    {LEGEND.map((item) => (
                        <span key={item.label} className="flex items-center gap-2">
                            <span className={`h-3 w-3 rounded-sm opacity-50 ${item.color}`} aria-hidden="true" />
                            {item.label}
                        </span>
                    ))}
                </div>
            </Card>
        </Page>
    );
}
