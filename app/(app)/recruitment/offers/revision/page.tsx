"use client";

import { CheckCircle2, AlertTriangle, Send } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function OfferRevision() {
    return (
        <Page
            title="Offer Revision Approval"
            subtitle="Amit Patel · Backend Engineer"
            breadcrumbs={[
                { label: "Recruitment", href: "/recruitment/dashboard" },
                { label: "Offers" },
                { label: "Revision" },
            ]}
            maxWidth="1000px"
            actions={
                <Button
                    icon={<Send size={14} aria-hidden="true" />}
                    disabled
                    aria-disabled="true"
                >
                    Re-issue Offer
                </Button>
            }
        >
            {/* Warning Banner */}
            <div className="mb-6 flex gap-4 rounded-2xl border border-[#FFB800]/30 bg-[#FFB800]/10 p-4">
                <AlertTriangle size={24} className="shrink-0 text-[#FFB800]" aria-hidden="true" />
                <div>
                    <h3 className="mb-1 text-sm font-bold text-[#FFB800]">Approval Required</h3>
                    <p className="text-xs text-[#FFB800]/80">
                        The proposed V2 offer (₹32L) exceeds the originally budgeted amount (₹30L) for
                        this requisition. Approval from VP Finance is required before re-issuing.
                    </p>
                </div>
            </div>

            {/* Diff View */}
            <Card padding="none" className="mb-6 overflow-hidden">
                <div className="grid grid-cols-1 sm:grid-cols-2">
                    {/* V1 Old */}
                    <div className="border-b border-[#1A2A3A] sm:border-b-0 sm:border-r">
                        <div className="flex items-center justify-between border-b border-[#1A2A3A] bg-[#0A1420] p-4">
                            <h3 className="font-semibold text-[#8899AA]">Original Offer (V1)</h3>
                            <span className="rounded bg-[#1A2A3A] px-2 py-0.5 text-[10px] text-[#8899AA]">
                                Rejected
                            </span>
                        </div>
                        <div className="space-y-4 p-6">
                            <div className="flex items-center justify-between rounded-lg border border-[#FF4444]/20 bg-[#FF4444]/5 p-3">
                                <span className="text-sm text-[#8899AA]">Total Fixed CTC</span>
                                <span className="text-sm font-bold text-white line-through decoration-[#FF4444]">
                                    ₹ 28,00,000
                                </span>
                            </div>
                            <div className="flex items-center justify-between rounded-lg border border-[#FF4444]/20 bg-[#FF4444]/5 p-3">
                                <span className="text-sm text-[#8899AA]">Joining Bonus</span>
                                <span className="text-sm font-bold text-white line-through decoration-[#FF4444]">
                                    ₹ 1,00,000
                                </span>
                            </div>
                            <div className="flex items-center justify-between rounded-lg p-3">
                                <span className="text-sm text-[#8899AA]">Stock Options (ESOPs)</span>
                                <span className="text-sm font-medium text-white">None</span>
                            </div>
                        </div>
                    </div>

                    {/* V2 New */}
                    <div className="bg-[#00E5A0]/5">
                        <div className="flex items-center justify-between border-b border-[#00E5A0]/20 bg-[#00E5A0]/10 p-4">
                            <h3 className="font-semibold text-[#00E5A0]">Proposed Revision (V2)</h3>
                            <span className="rounded bg-[#00E5A0] px-2 py-0.5 text-[10px] font-bold text-[#060B14]">
                                Draft
                            </span>
                        </div>
                        <div className="space-y-4 p-6">
                            <div className="flex items-center justify-between rounded-lg border border-[#00E5A0]/30 bg-[#00E5A0]/10 p-3">
                                <span className="text-sm text-[#8899AA]">Total Fixed CTC</span>
                                <div className="text-right">
                                    <span className="text-sm font-bold text-[#00E5A0]">₹ 32,00,000</span>
                                    <p className="mt-0.5 text-[10px] text-[#00E5A0]">+14.2%</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between rounded-lg border border-[#FFB800]/30 bg-[#FFB800]/10 p-3">
                                <span className="text-sm text-[#8899AA]">Joining Bonus</span>
                                <div className="text-right">
                                    <span className="text-sm font-bold text-[#FFB800]">₹ 0</span>
                                    <p className="mt-0.5 text-[10px] text-[#FFB800]">Removed</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between rounded-lg p-3">
                                <span className="text-sm text-[#8899AA]">Stock Options (ESOPs)</span>
                                <span className="text-sm font-medium text-white">None</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Approval Workflow */}
            <Card padding="lg">
                <h3 className="mb-4 text-sm font-semibold text-white">Approval Chain</h3>
                <ol
                    aria-label="Approval workflow"
                    className="relative space-y-4 before:absolute before:inset-y-4 before:left-[19px] before:z-0 before:w-0.5 before:bg-[#1A2A3A]"
                >
                    <li className="relative z-10 flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00E5A0] shadow-[0_0_10px_rgba(0,229,160,0.3)]">
                            <CheckCircle2 size={18} className="text-[#060B14]" aria-hidden="true" />
                        </div>
                        <div className="flex flex-1 items-center justify-between rounded-xl border border-[#2A3A4A] bg-[#1A2A3A] p-3">
                            <div>
                                <p className="text-sm font-bold text-white">
                                    Priya Nair{" "}
                                    <span className="text-xs font-normal text-[#8899AA]">(Recruiter)</span>
                                </p>
                                <p className="text-xs text-[#00E5A0]">Initiated V2</p>
                            </div>
                            <span className="text-xs text-[#8899AA]">Today, 11:45 AM</span>
                        </div>
                    </li>

                    <li className="relative z-10 flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFB800] shadow-[0_0_10px_rgba(255,184,0,0.3)]">
                            <div className="h-3 w-3 animate-pulse rounded-full bg-black" aria-hidden="true" />
                        </div>
                        <div className="flex flex-1 items-center justify-between rounded-xl border border-[#FFB800]/30 bg-[#0A1420] p-3">
                            <div>
                                <p className="text-sm font-bold text-white">
                                    VP Finance{" "}
                                    <span className="text-xs font-normal text-[#8899AA]">(Approver)</span>
                                </p>
                                <p className="mt-0.5 text-[11px] text-[#FFB800]">Pending Approval</p>
                            </div>
                            <Button variant="secondary" size="sm">Remind</Button>
                        </div>
                    </li>
                </ol>
            </Card>
        </Page>
    );
}
