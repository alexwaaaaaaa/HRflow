"use client";

import { Calculator, Calendar, Info, AlertTriangle, ChevronRight, RefreshCcw, ShieldCheck } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

// ─── Notice period calculation — DO NOT CHANGE these values ───────────────────
// Base period: 90 days (Standard policy for Full-Time Regular)
// Resignation date: 2024-03-12
// Adjustments: -2 days (leave balance credit)
// Total duration: 88 days
// Calculated LWD: 10 June 2024

const ADJUSTMENTS = [
    { id: "adj1", label: "Leave Balance Credit", desc: "Add encashable leaves to shorten LWD", type: "Credit" },
    { id: "adj2", label: "Unpaid Leave Penalty", desc: "Extend LWD for unapproved absences", type: "Deduction" },
    { id: "adj3", label: "Management Discretion", desc: "Manual override for strategic handovers", type: "Manual" },
];

export default function NoticePeriodCalculator() {
    return (
        <Page
            title="Notice Period Calculator"
            subtitle="Verify LWD based on employee tenure and policy rules."
            breadcrumbs={[
                { label: "FnF", href: "/fnf/dashboard" },
                { label: "Notice Calculator" },
            ]}
            maxWidth="1200px"
            actions={
                <Button variant="secondary" icon={<RefreshCcw size={14} aria-hidden="true" />}>
                    Reset Values
                </Button>
            }
        >
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Configuration */}
                <div className="space-y-6 lg:col-span-2">
                    <Card padding="lg">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div className="space-y-2">
                                <label htmlFor="emp-group" className="text-xs font-bold uppercase tracking-widest text-[#445566]">
                                    Employee Group
                                </label>
                                <select
                                    id="emp-group"
                                    className="w-full rounded-xl border border-[#1A2A3A] bg-[#060B14] px-4 py-3 text-sm font-semibold text-white outline-none focus:border-[#00e5a0]"
                                >
                                    <option>Full-Time Regular</option>
                                    <option>Probationary</option>
                                    <option>Senior Management</option>
                                    <option>Contractual</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-[#445566]">
                                    Notice Policy
                                </label>
                                <div className="flex items-center justify-between rounded-xl border border-[#1A2A3A] bg-[#060B14] px-4 py-3 text-sm font-semibold text-[#8899AA]">
                                    Standard (90 Days)
                                    <ShieldCheck size={16} className="text-emerald-500" aria-hidden="true" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="resignation-date" className="text-xs font-bold uppercase tracking-widest text-[#445566]">
                                    Resignation Date
                                </label>
                                <div className="relative">
                                    <Calendar size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" aria-hidden="true" />
                                    <input
                                        id="resignation-date"
                                        type="date"
                                        defaultValue="2024-03-12"
                                        className="w-full rounded-xl border border-[#1A2A3A] bg-[#060B14] py-3 pl-10 pr-4 text-sm font-semibold text-white outline-none focus:border-[#00e5a0]"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="shortfall-days" className="text-xs font-bold uppercase tracking-widest text-[#445566]">
                                    Shortfall Period (Days)
                                </label>
                                <div className="relative">
                                    <Calculator size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-amber-500" aria-hidden="true" />
                                    <input
                                        id="shortfall-days"
                                        type="number"
                                        defaultValue={0}
                                        className="w-full rounded-xl border border-[#1A2A3A] bg-[#060B14] py-3 pl-10 pr-4 text-sm font-semibold text-white outline-none focus:border-[#00e5a0]"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex items-start gap-3 rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
                            <Info size={16} className="mt-0.5 shrink-0 text-blue-500" aria-hidden="true" />
                            <p className="text-xs text-[#8899AA]">
                                Calculator automatically accounts for the notice period starting the day after resignation
                                submission. Any shortfall will require either a waiver or a buyout adjustment in the final
                                settlement.
                            </p>
                        </div>
                    </Card>

                    <Card padding="md">
                        <h3 className="mb-4 border-l-4 border-amber-500 pl-3 text-xs font-bold uppercase tracking-widest text-[#445566]">
                            Adjustments &amp; Leaves
                        </h3>
                        <ul className="space-y-3" role="list">
                            {ADJUSTMENTS.map((adj) => (
                                <li
                                    key={adj.id}
                                    className="flex items-center justify-between rounded-xl border border-[#1A2A3A] bg-[#060B14] p-4 transition-colors hover:border-blue-500/30"
                                >
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm font-bold uppercase tracking-tight text-white">{adj.label}</p>
                                        <p className="text-xs text-[#445566]">{adj.desc}</p>
                                    </div>
                                    <div className="ml-4 flex items-center gap-3">
                                        <label htmlFor={`adj-${adj.id}`} className="sr-only">
                                            {adj.label} days
                                        </label>
                                        <input
                                            id={`adj-${adj.id}`}
                                            type="number"
                                            placeholder="Days"
                                            className="w-20 rounded-lg border border-[#1A2A3A] bg-[#0D1928] px-2 py-1.5 text-xs text-white outline-none focus:border-[#00e5a0]"
                                        />
                                        <ChevronRight size={14} className="text-[#445566]" aria-hidden="true" />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </Card>
                </div>

                {/* Results Card */}
                <div className="space-y-6">
                    <Card padding="lg" variant="elevated">
                        <h3 className="mb-6 text-center text-xs font-bold uppercase tracking-widest text-[#445566]">
                            Calculated LWD
                        </h3>
                        <div className="text-center">
                            <p className="text-6xl font-black tabular-nums text-white">10</p>
                            <p className="mt-1 text-2xl font-bold uppercase italic text-[#8899AA]">June 2024</p>
                        </div>

                        <dl className="mt-6 space-y-2 rounded-xl border border-[#1A2A3A] bg-[#060B14] p-4">
                            <div className="flex justify-between text-xs font-semibold">
                                <dt className="text-[#8899AA]">Base Period</dt>
                                <dd className="text-white">90 Days</dd>
                            </div>
                            <div className="flex justify-between text-xs font-semibold">
                                <dt className="text-[#8899AA]">Adjustments</dt>
                                <dd className="text-white">-02 Days</dd>
                            </div>
                            <div className="my-2 h-px bg-[#1A2A3A]" />
                            <div className="flex justify-between text-sm font-black">
                                <dt className="uppercase tracking-tight text-white">Total Duration</dt>
                                <dd className="text-yellow-300">88 Days</dd>
                            </div>
                        </dl>

                        <Button variant="primary" className="mt-6 w-full">
                            Save &amp; Update Case
                        </Button>
                    </Card>

                    <div className="flex items-start gap-3 rounded-xl border border-rose-500/20 bg-rose-500/5 p-4">
                        <AlertTriangle size={16} className="mt-0.5 shrink-0 text-rose-500" aria-hidden="true" />
                        <div>
                            <p className="mb-1 text-xs font-bold uppercase tracking-widest text-rose-400">
                                Potential Conflicts
                            </p>
                            <p className="text-[11px] text-[#8899AA]">
                                "Proposed LWD falls on a company holiday (Dragon Boat Festival). Consider shifting to the
                                previous working day."
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Page>
    );
}
