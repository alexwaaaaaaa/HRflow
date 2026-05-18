"use client";

import {
    History, RefreshCcw, AlertTriangle, MessageSquare, FileText, Briefcase, ShieldCheck,
} from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface RevisionPriority {
    label: string;
    active: boolean;
}

const REVISION_PRIORITIES: RevisionPriority[] = [
    { label: "Routine", active: false },
    { label: "Urgent", active: true },
    { label: "Immediate", active: false },
];

interface LockedField {
    label: string;
    original: string;
    icon: typeof FileText;
}

const LOCKED_FIELDS: LockedField[] = [
    { label: "Leave Encashment", original: "82,500", icon: FileText },
    { label: "Notice Recovery", original: "48,000", icon: Briefcase },
    { label: "Statutory Dues", original: "2,15,400", icon: ShieldCheck },
];

export default function FnFRevision() {
    return (
        <Page
            title="Case Revision"
            subtitle="Revisit and modify finalized settlement for correction."
            breadcrumbs={[
                { label: "FnF", href: "/fnf/dashboard" },
                { label: "Revision" },
            ]}
            maxWidth="1400px"
            actions={
                <Button variant="secondary" icon={<History size={16} aria-hidden="true" />}>
                    Revision History
                </Button>
            }
        >
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                {/* Left: Revision Details */}
                <div className="space-y-6 lg:col-span-3">
                    <Card padding="lg">
                        <div className="space-y-8">
                            {/* Employee Header */}
                            <div className="flex items-center gap-6 border-b border-[#1A2A3A] pb-6">
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-500/20 bg-gradient-to-br from-[#1A2A3A] to-[#0D1928] text-2xl font-black text-blue-500">
                                    AD
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-xl font-black tracking-tight text-white">Arnab Das</h2>
                                    <p className="text-xs font-bold uppercase tracking-widest text-[#445566]">
                                        Original settlement: ₹3,25,202.00 · 24 Mar 24
                                    </p>
                                </div>
                                <Badge variant="warning">Post-Audit Revision</Badge>
                            </div>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <label htmlFor="revision-reason" className="text-[10px] font-bold uppercase tracking-widest text-[#445566]">
                                        Primary Revision Reason
                                    </label>
                                    <select
                                        id="revision-reason"
                                        className="w-full rounded-xl border border-[#1A2A3A] bg-[#060B14] px-4 py-4 text-sm font-bold text-white outline-none focus:border-[#00e5a0]"
                                    >
                                        <option>Discrepancy in Leave Balance</option>
                                        <option>Incorrect TDS Calculation</option>
                                        <option>Missed Expense Reimbursement</option>
                                        <option>Late Asset Recovery Adjustment</option>
                                        <option>Legal / Dispute Order</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#445566]">
                                        Revision Priority
                                    </p>
                                    <div className="flex gap-3" role="radiogroup" aria-label="Revision priority">
                                        {REVISION_PRIORITIES.map((p) => (
                                            <label
                                                key={p.label}
                                                className={`flex flex-1 cursor-pointer items-center justify-center rounded-xl border-2 py-4 text-[10px] font-black uppercase tracking-widest transition-all ${
                                                    p.active
                                                        ? "border-amber-500 bg-amber-500/10 text-amber-500"
                                                        : "border-[#1A2A3A] bg-[#060B14] text-[#445566]"
                                                }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name="revision-priority"
                                                    value={p.label}
                                                    defaultChecked={p.active}
                                                    className="sr-only"
                                                />
                                                {p.label}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label htmlFor="revision-summary" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#445566]">
                                    <MessageSquare size={14} className="text-blue-500" aria-hidden="true" />
                                    Executive Summary of the Correction
                                </label>
                                <textarea
                                    id="revision-summary"
                                    placeholder="Explain exactly what is being revised and the justification for this outlier change..."
                                    rows={6}
                                    className="w-full resize-none rounded-2xl border border-[#1A2A3A] bg-[#060B14] p-5 text-sm leading-relaxed text-[#8899AA] outline-none focus:border-[#00e5a0]"
                                />
                            </div>

                            <div className="flex items-start gap-4 rounded-xl border border-rose-500/20 bg-rose-500/5 p-4">
                                <AlertTriangle size={20} className="mt-0.5 shrink-0 text-rose-500" aria-hidden="true" />
                                <p className="text-xs leading-relaxed text-[#445566]">
                                    Warning: Revision case will trigger a notification to the employee and internal audit
                                    team. This will create a secondary settlement statement (v2.0).
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Right: Revision Scope */}
                <div className="space-y-6">
                    <Card padding="lg">
                        <h3 className="mb-6 border-b border-[#1A2A3A] pb-4 text-center text-[10px] font-bold uppercase tracking-widest text-[#445566]">
                            Locked Fields Adjustment
                        </h3>
                        <div className="space-y-4">
                            {LOCKED_FIELDS.map((field) => {
                                const Icon = field.icon;
                                return (
                                    <div key={field.label} className="space-y-2">
                                        <div className="flex justify-between text-[10px] font-bold uppercase tracking-tight text-[#445566]">
                                            <span>{field.label}</span>
                                            <span className="text-blue-500">Edit</span>
                                        </div>
                                        <div className="flex items-center gap-3 rounded-xl border border-[#1A2A3A] bg-[#060B14] p-3 transition-colors hover:border-amber-500/30">
                                            <Icon size={14} className="text-[#445566]" aria-hidden="true" />
                                            <label htmlFor={`field-${field.label}`} className="sr-only">
                                                {field.label}
                                            </label>
                                            <input
                                                id={`field-${field.label}`}
                                                type="text"
                                                defaultValue={field.original}
                                                className="w-full bg-transparent text-sm font-black text-white outline-none"
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <Button
                            variant="primary"
                            icon={<RefreshCcw size={18} aria-hidden="true" />}
                            className="mt-6 w-full"
                        >
                            Initiate Revision
                        </Button>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
