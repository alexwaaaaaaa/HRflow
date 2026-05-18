"use client";

import {
    ShieldCheck, Eye, CheckCircle, Printer, History, AlertCircle, FileText,
} from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface VerificationItem {
    label: string;
    checked: boolean;
}

const VERIFICATION_ITEMS: VerificationItem[] = [
    { label: "Bank details verified", checked: true },
    { label: "Asset clearance confirmed", checked: true },
    { label: "IT credentials revoked", checked: false },
    { label: "Gratuity calculation audit", checked: true },
];

interface EmployeeDetail {
    k: string;
    v: string;
}

const EMPLOYEE_DETAILS: EmployeeDetail[] = [
    { k: "Name", v: "Arnab Das" },
    { k: "Emp ID", v: "EMP-771" },
    { k: "Department", v: "Engineering" },
    { k: "LWD", v: "24 Apr 2024" },
];

interface PaymentDetail {
    k: string;
    v: string;
}

const PAYMENT_DETAILS: PaymentDetail[] = [
    { k: "Gross Earnings", v: "₹4,75,102.00" },
    { k: "Total Recoveries", v: "₹1,49,900.00" },
    { k: "Payment Mode", v: "Bank Transfer" },
    { k: "Account No", v: "XXXX-9821" },
];

export default function FnFReview() {
    return (
        <Page
            title="Final Settlement Review"
            subtitle="Internal Audit & Verification Mode"
            breadcrumbs={[
                { label: "FnF", href: "/fnf/dashboard" },
                { label: "Review" },
            ]}
            maxWidth="1400px"
            actions={
                <>
                    <Button variant="ghost" size="sm" icon={<Printer size={18} aria-hidden="true" />} aria-label="Print" />
                    <Button variant="ghost" size="sm" icon={<History size={18} aria-hidden="true" />} aria-label="Revision history" />
                </>
            }
        >
            <div className="space-y-6">
                {/* Status Bar */}
                <Card padding="md">
                    <div className="flex items-center gap-4">
                        <div className="rounded-xl bg-amber-500/10 p-2 text-amber-500">
                            <Eye size={20} aria-hidden="true" />
                        </div>
                        <div className="flex-1">
                            <p className="text-xs font-bold uppercase tracking-widest text-amber-500">
                                Awaiting Final HR Approval
                            </p>
                            <p className="mt-1 text-sm font-bold text-[#445566]">
                                Last edited by <span className="text-blue-500">Finance Team</span> today at 11:42 AM
                            </p>
                        </div>
                        <Badge variant="warning">Pending</Badge>
                    </div>
                </Card>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Settlement Slip Preview */}
                    <div className="lg:col-span-2">
                        <div className="relative overflow-hidden rounded-3xl border-2 border-[#1A2A3A] bg-[#111827] p-10">
                            {/* Watermark */}
                            <div
                                className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-[25deg] select-none opacity-[0.03]"
                                aria-hidden="true"
                            >
                                <FileText size={400} />
                            </div>

                            <div className="relative z-10 space-y-10">
                                <div className="flex items-start justify-between border-b border-[#1A2A3A] pb-8">
                                    <div className="space-y-3">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-xl font-black text-white">
                                            HF
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-black text-white">Full &amp; Final Settlement Statement</h2>
                                            <p className="mt-1 text-sm font-bold uppercase tracking-widest text-[#445566]">
                                                Draft Version 1.0.2
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs font-bold uppercase text-[#445566]">Statement Date</p>
                                        <p className="text-sm font-bold text-white">24 Mar 2024</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
                                    <div className="space-y-4">
                                        <h3 className="border-l-2 border-blue-500 pl-3 text-[10px] font-bold uppercase tracking-widest text-blue-500">
                                            Employee Details
                                        </h3>
                                        <dl className="space-y-2">
                                            {EMPLOYEE_DETAILS.map((row) => (
                                                <div key={row.k} className="flex justify-between border-b border-[#1A2A3A]/50 pb-2 text-xs">
                                                    <dt className="font-bold text-[#445566]">{row.k}</dt>
                                                    <dd className="font-black text-white">{row.v}</dd>
                                                </div>
                                            ))}
                                        </dl>
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="border-l-2 border-emerald-500 pl-3 text-[10px] font-bold uppercase tracking-widest text-emerald-500">
                                            Payment Summary
                                        </h3>
                                        <dl className="space-y-2">
                                            {PAYMENT_DETAILS.map((row) => (
                                                <div key={row.k} className="flex justify-between border-b border-[#1A2A3A]/50 pb-2 text-xs">
                                                    <dt className="font-bold text-[#445566]">{row.k}</dt>
                                                    <dd className="font-black text-white">{row.v}</dd>
                                                </div>
                                            ))}
                                        </dl>
                                    </div>
                                </div>

                                <div className="rounded-2xl border border-blue-500/10 bg-blue-500/5 p-6 text-center">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-blue-400">
                                        Net Payable (INR)
                                    </p>
                                    <p className="mt-2 text-2xl font-black text-white">
                                        THREE LAKH TWENTY FIVE THOUSAND TWO HUNDRED TWO
                                    </p>
                                </div>

                                <div className="flex items-center justify-between border-t border-[#1A2A3A] pt-6">
                                    <p className="text-[10px] text-[#445566]">
                                        * Computer generated statement. No physical signature required.
                                    </p>
                                    <div className="flex gap-3">
                                        <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-500">
                                            <ShieldCheck size={16} aria-hidden="true" />
                                        </div>
                                        <div className="rounded-lg bg-blue-500/10 p-2 text-blue-500">
                                            <Printer size={16} aria-hidden="true" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Review Actions & Verification */}
                    <div className="space-y-6">
                        <Card padding="lg">
                            <h3 className="mb-6 border-b border-[#1A2A3A] pb-4 text-xs font-bold uppercase tracking-widest text-[#445566]">
                                Verification Checklist
                            </h3>
                            <ul className="space-y-4" role="list">
                                {VERIFICATION_ITEMS.map((item) => (
                                    <li key={item.label} className="flex cursor-pointer items-center gap-3">
                                        <div
                                            className={`flex h-5 w-5 items-center justify-center rounded-md transition-all ${
                                                item.checked
                                                    ? "bg-emerald-500"
                                                    : "border-2 border-[#1A2A3A]"
                                            }`}
                                            aria-hidden="true"
                                        >
                                            {item.checked && <CheckCircle size={12} className="text-white" />}
                                        </div>
                                        <span
                                            className={`text-xs font-bold ${
                                                item.checked ? "text-[#8899AA]" : "text-[#445566]"
                                            }`}
                                        >
                                            {item.label}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-6 space-y-2">
                                <label htmlFor="review-feedback" className="text-[10px] font-bold uppercase tracking-widest text-[#445566]">
                                    Feedback / Observations
                                </label>
                                <textarea
                                    id="review-feedback"
                                    placeholder="Add any internal comments for audit trail..."
                                    rows={4}
                                    className="w-full resize-none rounded-xl border border-[#1A2A3A] bg-[#060B14] p-4 text-xs leading-relaxed text-white outline-none focus:border-[#00e5a0]"
                                />
                            </div>

                            <div className="mt-6 space-y-3 border-t border-[#1A2A3A] pt-4">
                                <Button
                                    variant="primary"
                                    icon={<CheckCircle size={18} aria-hidden="true" />}
                                    className="w-full"
                                >
                                    Approve &amp; Finalize
                                </Button>
                                <Button
                                    variant="danger"
                                    icon={<History size={16} aria-hidden="true" />}
                                    className="w-full"
                                >
                                    Revert to Finance
                                </Button>
                            </div>
                        </Card>

                        <div className="flex gap-3 rounded-2xl border border-blue-500/10 bg-blue-500/5 p-4">
                            <AlertCircle size={18} className="mt-0.5 shrink-0 text-blue-500" aria-hidden="true" />
                            <p className="text-[10px] font-bold leading-relaxed text-[#445566]">
                                Approving this statement will lock the financial records for the current auditing period.
                                Any subsequent changes will require a revision case.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Page>
    );
}
