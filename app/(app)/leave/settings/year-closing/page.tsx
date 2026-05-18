"use client";

import { AlertTriangle, Calendar, CheckCircle, PlayCircle, ShieldCheck } from "lucide-react";
import Page from "@/components/ui/Page";
import Card, { CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function LeaveYearClosingPage() {
    return (
        <Page
            title="Year-end Leave Closing"
            subtitle="Execute year-end carry forward, encashment, and lapsing processes"
            breadcrumbs={[
                { label: "Leave", href: "/leave/dashboard" },
                { label: "Settings" },
                { label: "Year Closing" },
            ]}
            maxWidth="900px"
        >
            <div className="space-y-6">
                {/* Warning banner */}
                <div
                    role="alert"
                    className="rounded-xl border border-[#FF4444]/30 bg-[#FF4444]/10 p-6"
                >
                    <div className="flex items-start gap-4">
                        <AlertTriangle size={24} className="shrink-0 text-[#FF4444]" aria-hidden="true" />
                        <div>
                            <h2 className="mb-2 text-lg font-bold text-white">Critical Operation</h2>
                            <p className="text-sm leading-relaxed text-[#8899AA]">
                                Running the year-end closing process is irreversible. It will calculate unused balances as of
                                Dec 31st (or configured year end), lapse ineligible leaves, carry forward eligible leaves based
                                on limits, and mark surplus leaves for encashment.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Closing parameters */}
                    <Card padding="lg">
                        <CardHeader className="border-b border-[#1A2A3A] pb-3">
                            <CardTitle className="flex items-center gap-2">
                                <Calendar size={18} className="text-[#0066FF]" aria-hidden="true" />
                                Closing Parameters
                            </CardTitle>
                        </CardHeader>

                        <div className="mt-4 space-y-4">
                            <div>
                                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#8899AA]">
                                    Financial Year Ending
                                </label>
                                <div className="flex items-center justify-between rounded-lg border border-[#1A2A3A] bg-[#060B14] p-3">
                                    <span className="font-bold text-white">31 December 2024</span>
                                    <span className="rounded bg-[#1A2A3A] px-2 py-1 font-mono text-xs text-[#8899AA]">
                                        Calendar Year
                                    </span>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="effective-date" className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#8899AA]">
                                    Effective Date for New Balances
                                </label>
                                <input
                                    id="effective-date"
                                    type="date"
                                    defaultValue="2025-01-01"
                                    className="w-full rounded-lg border border-[#1A2A3A] bg-[#060B14] p-3 font-bold text-white outline-none focus:border-[#0066FF]"
                                />
                            </div>
                        </div>
                    </Card>

                    {/* Readiness checks */}
                    <Card padding="lg">
                        <CardHeader className="border-b border-[#1A2A3A] pb-3">
                            <CardTitle className="flex items-center gap-2">
                                <ShieldCheck size={18} className="text-[#00E5A0]" aria-hidden="true" />
                                Readiness Checks
                            </CardTitle>
                        </CardHeader>

                        <ul className="mt-4 space-y-4" aria-label="Pre-flight readiness checks">
                            <li className="flex items-center gap-3 text-sm">
                                <CheckCircle size={18} className="shrink-0 text-[#00E5A0]" aria-hidden="true" />
                                <span className="text-[#8899AA]">All leave requests till Dec 31 resolved</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm">
                                <CheckCircle size={18} className="shrink-0 text-[#00E5A0]" aria-hidden="true" />
                                <span className="text-[#8899AA]">Carry forward limits configured</span>
                            </li>
                            <li className="flex items-center justify-between gap-3 text-sm">
                                <div className="flex items-center gap-3">
                                    <AlertTriangle size={18} className="shrink-0 text-[#FFB800]" aria-hidden="true" />
                                    <span className="font-bold text-[#FFB800]">3 Pending Leave Cancellations</span>
                                </div>
                                <Button variant="ghost" size="sm">Resolve</Button>
                            </li>
                        </ul>

                        <div className="mt-6 border-t border-[#1A2A3A] pt-6">
                            <Button
                                className="w-full"
                                disabled
                                icon={<PlayCircle size={20} aria-hidden="true" />}
                                aria-label="Run closing process (disabled until warnings are resolved)"
                            >
                                Run Closing Process
                            </Button>
                            <p className="mt-3 text-center text-[10px] uppercase tracking-wider text-[#556677]">
                                Fix warnings to enable
                            </p>
                        </div>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
