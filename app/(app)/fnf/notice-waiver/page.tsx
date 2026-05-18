"use client";

import { FileText, CheckCircle, XCircle, MessageSquare, ShieldAlert } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const APPROVAL_CHAIN = [
    { role: "Reporting Manager", name: "Kabir Bakshi", status: "Approved" as const, active: true },
    { role: "Department Head", name: "Neha Sharma", status: "Pending" as const, active: true },
    { role: "HR Director", name: "Rohit Verma", status: "Awaiting" as const, active: false },
];

const STATUS_VARIANT: Record<"Approved" | "Pending" | "Awaiting", "success" | "warning" | "neutral"> = {
    Approved: "success",
    Pending: "warning",
    Awaiting: "neutral",
};

const EVIDENCE_FILES = ["Relocation_Offer.pdf", "KT_Report_V1.pdf"];

export default function NoticePeriodWaiver() {
    return (
        <Page
            title="Notice Period Waiver"
            subtitle="Request ID: WVR-44102"
            breadcrumbs={[
                { label: "FnF", href: "/fnf/dashboard" },
                { label: "Notice Waiver" },
            ]}
            maxWidth="1100px"
        >
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-6">
                {/* Main Request */}
                <div className="space-y-6 lg:col-span-4">
                    <Card padding="lg">
                        <div className="mb-6 flex items-center gap-4 border-b border-[#1A2A3A] pb-6">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-rose-500/30 bg-[#1A2A3A] text-xl font-black text-rose-400">
                                SG
                            </div>
                            <div className="flex-1">
                                <h2 className="text-lg font-black uppercase tracking-tight text-white">Sanya Gupta</h2>
                                <p className="text-xs font-bold uppercase tracking-widest text-[#445566]">
                                    EMP-892 · Product Manager
                                </p>
                            </div>
                            <Badge variant="warning">Pending HOD Review</Badge>
                        </div>

                        <div className="mb-6 grid grid-cols-2 gap-6">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-[#445566]">Shortfall Days</p>
                                <p className="mt-1 text-4xl font-black tabular-nums text-white">
                                    45 <span className="text-sm font-semibold text-[#445566]">Days</span>
                                </p>
                            </div>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-[#445566]">Proposed LWD</p>
                                <p className="mt-1 text-4xl font-black text-white">15 Mar 24</p>
                            </div>
                        </div>

                        <div className="mb-6 space-y-2">
                            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#445566]">
                                <MessageSquare size={14} className="text-blue-500" aria-hidden="true" />
                                Justification for Waiver
                            </p>
                            <blockquote className="rounded-xl border border-[#1A2A3A] border-l-4 border-l-amber-500/50 bg-amber-500/5 p-4 text-sm text-[#8899AA]">
                                "The employee is relocating overseas for higher studies. Team legacy handover completed
                                successfully. No critical pending deployments. HOD has cleared the backfill strategy."
                            </blockquote>
                        </div>

                        <div className="flex gap-4 border-t border-[#1A2A3A] pt-6">
                            <Button
                                variant="primary"
                                icon={<CheckCircle size={16} aria-hidden="true" />}
                                className="flex-1"
                            >
                                Approve Waiver
                            </Button>
                            <Button
                                variant="danger"
                                icon={<XCircle size={16} aria-hidden="true" />}
                            >
                                Reject
                            </Button>
                        </div>
                    </Card>

                    <Card padding="md">
                        <h3 className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#445566]">
                            <FileText size={14} className="text-blue-500" aria-hidden="true" />
                            Attached Evidence
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {EVIDENCE_FILES.map((file) => (
                                <button
                                    key={file}
                                    type="button"
                                    className="flex items-center gap-2 rounded-xl border border-[#1A2A3A] bg-[#060B14] px-3 py-2 text-[10px] font-semibold text-[#445566] transition-colors hover:border-blue-500/30 hover:text-white"
                                >
                                    <FileText size={14} className="text-[#445566]" aria-hidden="true" />
                                    {file}
                                </button>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Policy & Risk */}
                <div className="space-y-6 lg:col-span-2">
                    <Card padding="md">
                        <h3 className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-rose-400">
                            <ShieldAlert size={14} aria-hidden="true" />
                            Recovery Risk Analysis
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <p className="text-[10px] font-bold uppercase text-[#445566]">Notice Pay Recovery</p>
                                <p className="mt-1 text-xl font-black text-rose-400">₹1,45,000</p>
                                <p className="text-[9px] font-bold uppercase text-[#445566]">Applicable if waiver is rejected</p>
                            </div>
                            <div className="h-px bg-rose-500/10" />
                            <div>
                                <p className="text-[10px] font-bold uppercase text-[#445566]">Financial Impact</p>
                                <p className="mt-1 text-lg font-black text-white">Full Waiver</p>
                                <p className="text-[9px] font-bold uppercase text-[#445566]">Cost to company: ₹1.45L</p>
                            </div>
                        </div>
                    </Card>

                    <Card padding="md">
                        <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-[#445566]">
                            Approval Chain
                        </h3>
                        <ol className="relative ml-2 space-y-6" role="list">
                            {APPROVAL_CHAIN.map((s, i) => (
                                <li
                                    key={s.role}
                                    className={`relative pl-8 pb-6 last:pb-0 ${s.active ? "opacity-100" : "opacity-30"}`}
                                >
                                    <div
                                        className={`absolute left-0 top-1 h-3 w-3 rounded-full border-2 ${
                                            s.status === "Approved"
                                                ? "border-emerald-500 bg-emerald-500"
                                                : "border-[#1A2A3A] bg-[#060B14]"
                                        }`}
                                        aria-hidden="true"
                                    />
                                    {i < APPROVAL_CHAIN.length - 1 && (
                                        <div
                                            className="absolute left-1.5 top-4 h-[calc(100%-12px)] w-px bg-[#1A2A3A]"
                                            aria-hidden="true"
                                        />
                                    )}
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#445566]">{s.role}</p>
                                    <p className="text-xs font-bold text-white">{s.name}</p>
                                    <Badge variant={STATUS_VARIANT[s.status]} className="mt-1">{s.status}</Badge>
                                </li>
                            ))}
                        </ol>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
