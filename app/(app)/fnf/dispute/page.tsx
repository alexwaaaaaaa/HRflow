"use client";

import {
    ShieldAlert, Send, CheckCircle, XCircle, MoreVertical, Paperclip, Scale, Clock,
} from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const AUDIT_ROWS = [
    { label: "Settlement Status", val: "Disbursed", variant: "success" as const },
    { label: "Recovery Pending", val: "No", variant: "neutral" as const },
    { label: "LWD Verification", val: "Manual Match", variant: "info" as const },
];

export default function FnFDispute() {
    return (
        <Page
            title="Dispute Resolution"
            subtitle="Manage and resolve financial or document-based disagreements."
            breadcrumbs={[
                { label: "FnF", href: "/fnf/dashboard" },
                { label: "Dispute" },
            ]}
            maxWidth="1200px"
        >
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                {/* Dispute Chat Console */}
                <div className="space-y-6 lg:col-span-8">
                    <Card padding="none">
                        <div className="flex items-center justify-between border-b border-[#1A2A3A] px-6 py-4">
                            <div className="flex items-center gap-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-rose-500/20 bg-rose-500/10 text-rose-500">
                                    <ShieldAlert size={18} aria-hidden="true" />
                                </div>
                                <div>
                                    <h2 className="text-sm font-black uppercase tracking-tight text-white">
                                        Claim #DISP-99212
                                    </h2>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#445566]">
                                        Raised by Arnab Das (Ex-Emp) · 2 hrs ago
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Badge variant="danger">High Priority</Badge>
                                <Button variant="ghost" size="sm" icon={<MoreVertical size={14} aria-hidden="true" />} aria-label="More options" />
                            </div>
                        </div>

                        {/* Chat messages */}
                        <div className="min-h-[400px] space-y-6 overflow-y-auto p-6">
                            <div className="flex max-w-[80%] gap-3">
                                <div
                                    aria-hidden="true"
                                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#060B14] text-[10px] font-bold text-[#445566]"
                                >
                                    AD
                                </div>
                                <div>
                                    <div className="rounded-2xl rounded-tl-none border border-[#1A2A3A] bg-[#1A2A3A] p-4 text-xs text-[#8899AA]">
                                        "I noticed that my leave encashment was calculated for 15 days instead of 18 days.
                                        My dashboard shows 18 approved leaves as of my LWD."
                                    </div>
                                    <p className="ml-1 mt-1 text-[9px] font-bold uppercase tracking-widest text-[#445566]">
                                        Sent 10:42 AM
                                    </p>
                                </div>
                            </div>

                            <div className="ml-auto flex max-w-[80%] flex-row-reverse gap-3">
                                <div
                                    aria-hidden="true"
                                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white"
                                >
                                    HR
                                </div>
                                <div className="text-right">
                                    <div className="rounded-2xl rounded-tr-none border border-blue-600/20 bg-blue-600/10 p-4 text-xs text-blue-100">
                                        "We've received your query. Our finance auditor is cross-verifying the LWP (Leave
                                        Without Pay) deductions which might have impacted the balance. Please hold."
                                    </div>
                                    <p className="mr-1 mt-1 text-[9px] font-bold uppercase tracking-widest text-blue-500/50">
                                        Seen · 11:15 AM
                                    </p>
                                </div>
                            </div>

                            <div className="flex justify-center">
                                <span className="rounded-full border border-[#1A2A3A] bg-[#060B14] px-4 py-1.5 text-[9px] font-black uppercase tracking-widest text-[#445566]">
                                    Internal Activity: Payroll Ledger Accessed
                                </span>
                            </div>
                        </div>

                        {/* Reply bar */}
                        <div className="border-t border-[#1A2A3A] bg-[#060B14]/50 p-4">
                            <div className="flex gap-3">
                                <Button variant="secondary" size="sm" icon={<Paperclip size={16} aria-hidden="true" />} aria-label="Attach file" />
                                <label htmlFor="dispute-reply" className="sr-only">Type response</label>
                                <input
                                    id="dispute-reply"
                                    type="text"
                                    placeholder="Type response to colleague or system log..."
                                    className="flex-1 rounded-xl border border-[#1A2A3A] bg-[#060B14] px-4 text-xs text-white outline-none focus:border-[#00e5a0]"
                                />
                                <Button icon={<Send size={14} aria-hidden="true" />}>Send Message</Button>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Case Metadata */}
                <div className="space-y-6 lg:col-span-4">
                    <Card padding="md">
                        <h3 className="mb-4 border-b border-[#1A2A3A] pb-4 text-xs font-bold uppercase tracking-widest text-[#445566]">
                            Dispute Intelligence
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between rounded-xl border border-[#1A2A3A] bg-[#060B14] p-4">
                                <div className="flex items-center gap-3">
                                    <Clock size={16} className="text-blue-500" aria-hidden="true" />
                                    <span className="text-xs font-bold uppercase tracking-tight text-white">Resolution SLA</span>
                                </div>
                                <Badge variant="success">22h Remaining</Badge>
                            </div>

                            <div className="space-y-2">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-[#445566]">Categorization</p>
                                <div className="flex items-center justify-between rounded-xl border border-rose-500/20 bg-[#060B14] p-4">
                                    <span className="text-xs font-black uppercase text-rose-400">Leave Discrepancy</span>
                                    <Button variant="ghost" size="sm">Change</Button>
                                </div>
                            </div>

                            <div className="space-y-3 border-t border-[#1A2A3A] pt-4">
                                <Button
                                    variant="outline"
                                    icon={<CheckCircle size={14} aria-hidden="true" />}
                                    className="w-full border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
                                >
                                    Resolve Case
                                </Button>
                                <Button
                                    variant="danger"
                                    icon={<XCircle size={14} aria-hidden="true" />}
                                    className="w-full"
                                >
                                    Escalate to Finance
                                </Button>
                            </div>
                        </div>
                    </Card>

                    <Card padding="md">
                        <h3 className="mb-4 text-[10px] font-bold uppercase tracking-widest text-[#445566]">
                            Quick Audit Context
                        </h3>
                        <dl className="space-y-3">
                            {AUDIT_ROWS.map((row) => (
                                <div key={row.label} className="flex justify-between border-b border-[#1A2A3A]/50 pb-2 text-[10px]">
                                    <dt className="font-bold uppercase tracking-tight text-[#445566]">{row.label}</dt>
                                    <dd>
                                        <Badge variant={row.variant}>{row.val}</Badge>
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </Card>

                    <div className="flex items-center gap-2 rounded-xl border border-[#1A2A3A] bg-[#0D1928] p-4">
                        <Scale size={16} className="shrink-0 text-rose-500" aria-hidden="true" />
                        <p className="text-xs text-[#8899AA]">Dispute resolution SLA: 24 hours from submission.</p>
                    </div>
                </div>
            </div>
        </Page>
    );
}
