"use client";

import { CopyPlus, ArrowRight, Zap, CheckCircle2, Bot } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function OnboardingTrigger() {
    return (
        <Page
            title="Trigger Core HR Handover"
            subtitle="Rahul Sharma has cleared BGV and accepted the offer. Convert them into an Employee in the core database."
            breadcrumbs={[
                { label: "Recruitment", href: "/recruitment/dashboard" },
                { label: "Onboarding" },
                { label: "Trigger Handover" },
            ]}
            maxWidth="900px"
        >
            {/* Hero icon */}
            <div className="mb-10 mt-6 flex flex-col items-center text-center">
                <div className="mb-6 flex h-20 w-20 rotate-3 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0066FF] to-[#00E5A0] shadow-[0_0_30px_rgba(0,102,255,0.3)]">
                    <CopyPlus size={36} className="-rotate-3 text-white" aria-hidden="true" />
                </div>
            </div>

            <Card padding="lg" className="relative overflow-hidden">
                <div
                    className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/2 rounded-full bg-[#0066FF] opacity-5 blur-[100px]"
                    aria-hidden="true"
                />

                <h3 className="relative z-10 mb-6 flex items-center gap-2 text-lg font-bold text-white">
                    <Zap size={20} className="text-[#00E5A0]" aria-hidden="true" /> Workflow Automation Setup
                </h3>

                <div className="relative z-10 space-y-6">
                    {/* Action 1 */}
                    <div className="flex items-start gap-4 rounded-2xl border border-[#2A3A4A] bg-[#0A1420] p-4">
                        <div
                            aria-hidden="true"
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#445566] bg-[#1A2A3A] font-mono text-xs font-bold text-white"
                        >
                            01
                        </div>
                        <div className="flex-1">
                            <h4 className="mb-1 text-base font-bold text-white">
                                Create Employee Profile (Database)
                            </h4>
                            <p className="mb-4 text-xs text-[#8899AA]">
                                Transfer personal data, compensation info, and documents from ATS to Core
                                Employee profile table automatically.
                            </p>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="emp-id-gen" className="mb-1 block text-[10px] font-bold uppercase text-[#445566]">
                                        Emp ID Generation
                                    </label>
                                    <select
                                        id="emp-id-gen"
                                        className="h-10 w-full rounded-xl border border-[#1A2A3A] bg-[#060B14] px-3 text-sm text-white focus:border-[#0066FF] focus:outline-none"
                                    >
                                        <option>Auto-assign Series (TC-XXXX)</option>
                                        <option>Manual Entry later</option>
                                    </select>
                                </div>
                                <div>
                                    <p className="mb-1 text-[10px] font-bold uppercase text-[#445566]">
                                        Module Sync
                                    </p>
                                    <div className="flex h-10 items-center gap-2 rounded-xl border border-[#00E5A0]/30 bg-[#00E5A0]/5 px-3 text-xs font-bold text-[#00E5A0]">
                                        <CheckCircle2 size={14} aria-hidden="true" /> Payroll Engine &amp; PMS Linked
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action 2 */}
                    <div className="flex items-start gap-4 rounded-2xl border border-[#2A3A4A] bg-[#0A1420] p-4">
                        <div
                            aria-hidden="true"
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#445566] bg-[#1A2A3A] font-mono text-xs font-bold text-white"
                        >
                            02
                        </div>
                        <div className="flex-1">
                            <h4 className="mb-1 text-base font-bold text-white">
                                Provision IT Access &amp; Hardware
                            </h4>
                            <p className="mb-4 text-xs text-[#8899AA]">
                                Auto-generate IT service desk tickets for laptop procurement and email
                                account creation.
                            </p>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="hardware-policy" className="mb-1 block text-[10px] font-bold uppercase text-[#445566]">
                                        Hardware Policy (SDE)
                                    </label>
                                    <select
                                        id="hardware-policy"
                                        className="h-10 w-full rounded-xl border border-[#1A2A3A] bg-[#060B14] px-3 text-sm text-white focus:border-[#0066FF] focus:outline-none"
                                    >
                                        <option>Apple MacBook Pro 16&quot; M3</option>
                                        <option>Apple MacBook Pro 14&quot; M3</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="access-groups" className="mb-1 block text-[10px] font-bold uppercase text-[#445566]">
                                        Access Groups (SSO)
                                    </label>
                                    <input
                                        id="access-groups"
                                        readOnly
                                        value="Engineering, GitHub, AWS Dev"
                                        className="h-10 w-full cursor-not-allowed rounded-xl border border-[#1A2A3A] bg-[#1A2A3A] px-3 text-sm text-[#8899AA]"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action 3 */}
                    <div className="flex items-start gap-4 rounded-2xl border border-[#2A3A4A] bg-[#0A1420] p-4">
                        <div
                            aria-hidden="true"
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#445566] bg-[#1A2A3A] font-mono text-xs font-bold text-white"
                        >
                            03
                        </div>
                        <div className="flex-1">
                            <h4 className="mb-3 text-base font-bold text-white">Assign Onboarding Plan</h4>
                            <div className="flex flex-wrap items-center gap-4">
                                <Button variant="outline" size="sm">
                                    Software Engineering Plan (30 Days)
                                </Button>
                                <div className="flex items-center gap-2 text-xs font-medium text-[#8899AA]">
                                    <Bot size={14} className="text-[#9B59B6]" aria-hidden="true" /> Kaarya AI Buddy initialized
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 mt-8">
                    <Button
                        iconRight={<ArrowRight size={20} aria-hidden="true" />}
                        size="lg"
                        className="w-full justify-center bg-gradient-to-r from-[#0066FF] to-[#00E5A0] shadow-[0_10px_30px_rgba(0,229,160,0.2)] hover:brightness-110"
                    >
                        Execute Handover Protocol
                    </Button>
                    <p className="mt-3 text-center text-[11px] text-[#8899AA]">
                        This action cannot be undone. Notifications will be sent to Candidate, Hiring
                        Manager, and IT.
                    </p>
                </div>
            </Card>
        </Page>
    );
}
