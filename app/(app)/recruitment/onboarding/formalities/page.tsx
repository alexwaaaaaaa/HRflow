"use client";

import { FileBadge, UploadCloud, CheckCircle2, CopyIcon, Send, Clock, UserCheck } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// ─────────────────────────────────────────────────────────────────────────────
// Types & data
// ─────────────────────────────────────────────────────────────────────────────

interface Joiner {
    name: string;
    date: string;
    progress: number;
    active: boolean;
}

const JOINERS: Joiner[] = [
    { name: "Rahul Sharma", date: "15 Apr", progress: 80, active: true },
    { name: "Anjali Singh", date: "18 Apr", progress: 100, active: false },
    { name: "Karan Patel", date: "22 Apr", progress: 25, active: false },
];

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components (module scope)
// ─────────────────────────────────────────────────────────────────────────────

function JoinerRow({ joiner }: { joiner: Joiner }) {
    return (
        <div
            className={`cursor-pointer border-l-2 p-4 transition-colors ${
                joiner.active
                    ? "border-l-[#0066FF] bg-[#1A2A3A]/50"
                    : "border-l-transparent hover:bg-[#1A2A3A]/30"
            }`}
        >
            <h4 className="mb-1 text-sm font-bold text-white">{joiner.name}</h4>
            <div className="mb-2 flex items-center justify-between">
                <p className="flex items-center gap-1.5 text-xs text-[#8899AA]">
                    <Clock size={12} aria-hidden="true" /> Joining: {joiner.date}
                </p>
                <p
                    className={`text-[10px] font-bold ${
                        joiner.progress === 100 ? "text-[#00E5A0]" : "text-[#FFB800]"
                    }`}
                >
                    {joiner.progress}% Complete
                </p>
            </div>
            <div
                className="h-1 w-full overflow-hidden rounded-full bg-[#060B14]"
                role="progressbar"
                aria-valuenow={joiner.progress}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${joiner.name} onboarding progress`}
            >
                <div
                    className="h-full bg-gradient-to-r from-[#0066FF] to-[#00E5A0]"
                    style={{ width: `${joiner.progress}%` }}
                />
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function JoiningFormalities() {
    return (
        <Page
            title="Pre-Joining Formalities"
            subtitle="Track document submissions and statutory form fillings for new hires"
            breadcrumbs={[
                { label: "Recruitment", href: "/recruitment/dashboard" },
                { label: "Onboarding" },
                { label: "Formalities" },
            ]}
            maxWidth="1200px"
        >
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Candidate List */}
                <Card padding="none" className="flex h-[600px] flex-col">
                    <div className="border-b border-[#1A2A3A] bg-[#0A1420] p-4">
                        <h3 className="text-sm font-semibold text-white">
                            Upcoming Joiners ({JOINERS.length})
                        </h3>
                    </div>
                    <div className="flex-1 divide-y divide-[#1A2A3A] overflow-y-auto">
                        {JOINERS.map((j) => (
                            <JoinerRow key={j.name} joiner={j} />
                        ))}
                    </div>
                </Card>

                {/* Details Tracker */}
                <div className="space-y-6 lg:col-span-2">
                    {/* Header Info */}
                    <Card padding="lg">
                        <div className="mb-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div
                                    aria-hidden="true"
                                    className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1A2A3A] text-xl font-bold text-white"
                                >
                                    RS
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white">Rahul Sharma</h2>
                                    <p className="text-sm text-[#8899AA]">
                                        Senior Frontend Engineer · Joining 15 April 2025
                                    </p>
                                </div>
                            </div>
                            <Button
                                variant="secondary"
                                size="sm"
                                icon={<Send size={14} aria-hidden="true" />}
                            >
                                Send Reminder
                            </Button>
                        </div>
                        <div className="mt-6 flex gap-6 rounded-xl border border-[#2A3A4A] bg-[#0A1420] p-4">
                            <div className="flex-1">
                                <p className="mb-1 text-[10px] font-bold uppercase text-[#8899AA]">
                                    Portal Link Sent on
                                </p>
                                <p className="text-sm font-medium text-white">16 Mar 2025</p>
                            </div>
                            <div className="flex-1">
                                <p className="mb-1 text-[10px] font-bold uppercase text-[#8899AA]">
                                    Magic Link Config
                                </p>
                                <button
                                    type="button"
                                    className="flex cursor-pointer items-center gap-1 text-sm font-medium text-[#0066FF] hover:underline"
                                >
                                    <CopyIcon size={12} aria-hidden="true" /> Copy Candidate URL
                                </button>
                            </div>
                        </div>
                    </Card>

                    {/* Document Checklist */}
                    <Card padding="lg">
                        <h3 className="mb-6 border-b border-[#1A2A3A] pb-4 text-[15px] font-semibold text-white">
                            Required Documents Tracking
                        </h3>
                        <div className="space-y-4">
                            {/* Verified */}
                            <div className="relative flex items-center justify-between overflow-hidden rounded-xl border border-[#00E5A0]/30 bg-[#0A1420] p-4">
                                <div className="absolute right-0 top-0 flex items-center gap-1 rounded-bl-xl bg-[#00E5A0]/10 p-1.5 text-[10px] font-bold text-[#00E5A0]">
                                    <CheckCircle2 size={12} aria-hidden="true" /> Verified
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#00E5A0]/10 text-[#00E5A0]">
                                        <FileBadge size={18} aria-hidden="true" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-white">ID Proof (Aadhar &amp; PAN)</h4>
                                        <p className="mt-1 text-xs text-[#8899AA]">
                                            Uploaded &amp; verified successfully.
                                        </p>
                                    </div>
                                </div>
                                <Button variant="ghost" size="sm">View Files</Button>
                            </div>

                            {/* Needs Review */}
                            <div className="flex items-center justify-between rounded-xl border border-[#FFB800]/50 bg-[#0A1420] p-4">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#1A2A3A] text-[#8899AA]">
                                        <UploadCloud size={18} aria-hidden="true" />
                                    </div>
                                    <div>
                                        <h4 className="flex items-center gap-2 text-sm font-bold text-white">
                                            Previous Employment Relieving{" "}
                                            <Badge variant="warning">Needs Review</Badge>
                                        </h4>
                                        <p className="mt-1 text-xs text-[#8899AA]">
                                            Candidate uploaded doc yesterday.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="primary" size="sm">Approve</Button>
                                    <Button variant="secondary" size="sm">Reject</Button>
                                </div>
                            </div>

                            {/* Missing */}
                            <div className="flex items-center justify-between rounded-xl border border-l-4 border-[#1A2A3A] border-l-[#FF4444] bg-[#0A1420] p-4">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#1A2A3A] text-[#8899AA]">
                                        <UserCheck size={18} aria-hidden="true" />
                                    </div>
                                    <div>
                                        <h4 className="flex items-center gap-2 text-sm font-bold text-white">
                                            Statutory Details (Bank/UAN){" "}
                                            <Badge variant="danger">Missing</Badge>
                                        </h4>
                                        <p className="mt-1 text-xs text-[#8899AA]">
                                            Candidate has not filled payroll information.
                                        </p>
                                    </div>
                                </div>
                                <Button variant="danger" size="sm">Nudge</Button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
