"use client";

import { CheckCircle2, FileText, Send, Eye, Clock, Download, ChevronRight, Briefcase, Calendar } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function OfferAcceptance() {
    return (
        <Page
            title="Offer Status & Tracking"
            subtitle="Monitor the final stages of the hiring process for Rahul Sharma"
            breadcrumbs={[
                { label: "Recruitment", href: "/recruitment/dashboard" },
                { label: "Offers" },
                { label: "Acceptance" },
            ]}
            maxWidth="1000px"
            actions={
                <Button iconRight={<ChevronRight size={16} aria-hidden="true" />}>
                    Trigger Onboarding
                </Button>
            }
        >
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Status Tracker */}
                <div className="space-y-6 lg:col-span-2">
                    <Card padding="lg" className="relative overflow-hidden">
                        <div
                            className="pointer-events-none absolute right-0 top-0 h-32 w-32 translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00E5A0] opacity-5 blur-[80px]"
                            aria-hidden="true"
                        />
                        <div className="mb-8 flex items-center gap-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#00E5A0] to-[#0066FF] shadow-lg">
                                <CheckCircle2 size={28} className="text-white" aria-hidden="true" />
                            </div>
                            <div>
                                <h2 className="mb-1 text-2xl font-bold text-white">Offer Accepted!</h2>
                                <p className="text-sm text-[#8899AA]">
                                    Rahul signed the offer letter digitally 2 hours ago.
                                </p>
                            </div>
                            <Badge variant="success" className="ml-auto">Accepted</Badge>
                        </div>

                        {/* Timeline */}
                        <ol
                            aria-label="Offer timeline"
                            className="relative space-y-8 pl-6 before:absolute before:inset-y-2 before:left-[31px] before:w-0.5 before:bg-[#1A2A3A]"
                        >
                            <li className="relative flex gap-4">
                                <div
                                    aria-current="step"
                                    className="absolute -left-[14px] z-10 flex h-8 w-8 items-center justify-center rounded-full border-4 border-[#0D1928] bg-[#00E5A0]"
                                >
                                    <CheckCircle2 size={14} className="text-[#060B14]" aria-hidden="true" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-white">Offer Accepted</h4>
                                    <p className="mb-2 text-[11px] text-[#445566]">
                                        15 Mar 2025, 11:45 AM · IP: 192.168.1.1
                                    </p>
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        icon={<Download size={12} aria-hidden="true" />}
                                    >
                                        Download Signed PDF
                                    </Button>
                                </div>
                            </li>

                            <li className="relative flex gap-4">
                                <div className="absolute -left-[14px] z-10 flex h-8 w-8 items-center justify-center rounded-full border-4 border-[#0D1928] bg-[#0066FF]">
                                    <Eye size={14} className="text-white" aria-hidden="true" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-white">Offer Viewed</h4>
                                    <p className="text-[11px] text-[#445566]">14 Mar 2025, 06:20 PM</p>
                                    <p className="mt-1 text-xs text-[#8899AA]">
                                        Candidate opened the secure link generated via DocuSign.
                                    </p>
                                </div>
                            </li>

                            <li className="relative flex gap-4">
                                <div className="absolute -left-[14px] z-10 flex h-8 w-8 items-center justify-center rounded-full border-4 border-[#0D1928] bg-[#1A2A3A]">
                                    <Send size={12} className="text-[#8899AA]" aria-hidden="true" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-[#8899AA]">Offer Sent</h4>
                                    <p className="text-[11px] text-[#445566]">14 Mar 2025, 04:00 PM</p>
                                    <p className="mt-1 text-xs text-[#445566]">
                                        Offer generated by Priya Nair and emailed.
                                    </p>
                                </div>
                            </li>
                        </ol>
                    </Card>

                    <Card padding="lg">
                        <h3 className="mb-4 text-sm font-semibold text-white">
                            Background Verification (BGV) Status
                        </h3>
                        <div className="flex items-center justify-between rounded-xl border border-dashed border-[#2A3A4A] bg-[#0A1420] p-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1A2A3A] text-[#8899AA]">
                                    <Clock size={16} aria-hidden="true" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-white">Not Initiated</p>
                                    <p className="text-xs text-[#445566]">BGV link has not been sent yet</p>
                                </div>
                            </div>
                            <Button variant="secondary" size="sm">Initiate BGV</Button>
                        </div>
                    </Card>
                </div>

                {/* Offer Summary Card */}
                <Card padding="lg">
                    <h3 className="mb-4 text-sm font-semibold text-white">Final Offer Details</h3>
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#1A2A3A]">
                                <Briefcase size={14} className="text-[#8899AA]" aria-hidden="true" />
                            </div>
                            <div>
                                <p className="text-xs text-[#8899AA]">Role</p>
                                <p className="text-sm font-semibold text-white">Senior Frontend Engineer</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#1A2A3A]">
                                <span className="text-xs font-bold text-[#8899AA]">₹</span>
                            </div>
                            <div>
                                <p className="text-xs text-[#8899AA]">Total CTC</p>
                                <p className="text-sm font-bold text-[#00E5A0]">₹32,00,000</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#1A2A3A]">
                                <Calendar size={14} className="text-[#8899AA]" aria-hidden="true" />
                            </div>
                            <div>
                                <p className="text-xs text-[#8899AA]">Joining Date</p>
                                <p className="text-sm font-semibold text-white">15 April 2025</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 border-t border-[#1A2A3A] pt-6">
                        <Button
                            variant="outline"
                            size="sm"
                            icon={<FileText size={14} aria-hidden="true" />}
                            className="w-full justify-center"
                        >
                            View Original Document
                        </Button>
                    </div>
                </Card>
            </div>
        </Page>
    );
}
