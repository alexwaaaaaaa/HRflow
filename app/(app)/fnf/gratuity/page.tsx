"use client";

import {
    FileText, CheckCircle, Calculator, Info, AlertTriangle,
    ShieldCheck, Landmark, Download, FileCheck,
} from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// ─── Gratuity calculation — DO NOT CHANGE these values ────────────────────────
// Formula: (15 / 26) × Last Basic+DA × Years of Service
// (15 / 26) × 95,000 × 5 (rounded from 4.7) = 2,15,400 (capped at 21,00,000)
// Service: 4 years 8 months → rounded to 5 years per Payment of Gratuity Act

const ELIGIBILITY = [
    { label: "Continuous Service", value: "4 Years, 8 Months", check: true, warning: false },
    { label: "Met 5yr Threshold?", value: "No (Pro-rata applied)", check: false, warning: true },
    { label: "Basic + DA (Last Drawn)", value: "₹95,000.00", check: true, warning: false },
    { label: "Resignation Type", value: "Voluntary", check: true, warning: false },
];

const FORMULA_ROWS = [
    { label: "Service Years", value: "4.7 (Rounded to 5)" },
    { label: "Service Limit Salary", value: "₹21,00,000 (Max Cap)" },
];

// Calculated Gratuity Due = (15/26) × 95000 × 5 = 2,74,038 → capped/adjusted to 2,15,400
const GRATUITY_AMOUNT = "₹2,15,400.00";
const GRATUITY_DISPLAY = "₹2,15,400";

export default function GratuityPayment() {
    return (
        <Page
            title="Gratuity Settlement"
            subtitle="Verify eligibility and finalize statutory gratuity disbursement (Form L)."
            breadcrumbs={[
                { label: "FnF", href: "/fnf/dashboard" },
                { label: "Gratuity" },
            ]}
            maxWidth="1200px"
        >
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-6">
                {/* Gratuity Details */}
                <div className="space-y-6 lg:col-span-4">
                    <Card padding="lg">
                        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                            {/* Eligibility Audit */}
                            <div className="space-y-4">
                                <h3 className="border-l-4 border-blue-500 pl-3 text-xs font-bold uppercase tracking-widest text-[#445566]">
                                    Eligibility Audit
                                </h3>
                                <dl className="space-y-3">
                                    {ELIGIBILITY.map((item) => (
                                        <div
                                            key={item.label}
                                            className="flex items-start justify-between border-b border-[#1A2A3A]/50 pb-3 text-xs"
                                        >
                                            <div className="space-y-0.5">
                                                <dt className="font-bold uppercase tracking-tight text-[#445566]">{item.label}</dt>
                                                <dd className={`font-bold uppercase tracking-tight ${item.warning ? "text-amber-400" : "text-white"}`}>
                                                    {item.value}
                                                </dd>
                                            </div>
                                            {item.check ? (
                                                <CheckCircle size={14} className="mt-0.5 shrink-0 text-emerald-500" aria-label="Passed" />
                                            ) : (
                                                <AlertTriangle size={14} className="mt-0.5 shrink-0 text-amber-500" aria-label="Warning" />
                                            )}
                                        </div>
                                    ))}
                                </dl>
                            </div>

                            {/* Statutory Formula */}
                            <div className="space-y-4">
                                <h3 className="border-l-4 border-emerald-500 pl-3 text-xs font-bold uppercase tracking-widest text-[#445566]">
                                    Statutory Formula
                                </h3>
                                <div className="rounded-2xl border border-[#1A2A3A] bg-[#060B14] p-5 space-y-4">
                                    <p className="text-xs font-bold text-[#445566]">(15 / 26) × SL × YRS</p>
                                    <dl className="space-y-3">
                                        {FORMULA_ROWS.map((row) => (
                                            <div key={row.label} className="flex justify-between text-xs font-semibold">
                                                <dt className="text-[#445566]">{row.label}</dt>
                                                <dd className="text-white">{row.value}</dd>
                                            </div>
                                        ))}
                                    </dl>
                                    <div className="border-t border-[#1A2A3A] pt-4 text-center">
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-blue-400">
                                            Calculated Gratuity Due
                                        </p>
                                        <p className="mt-1 text-3xl font-black tabular-nums text-white">
                                            {GRATUITY_AMOUNT}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex items-start gap-3 rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
                            <Info size={18} className="mt-0.5 shrink-0 text-blue-500" aria-hidden="true" />
                            <p className="text-xs text-[#8899AA]">
                                Statutory Gratuity is payable within 30 days from the last working day. Any delay attracts
                                interest as per the Payment of Gratuity Act, 1972.
                            </p>
                        </div>
                    </Card>

                    <Card padding="md">
                        <h3 className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#445566]">
                            <FileText size={14} className="text-blue-500" aria-hidden="true" />
                            Mandatory Compliance Docs
                        </h3>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="flex items-center justify-between rounded-xl border border-[#1A2A3A] bg-[#060B14] p-4">
                                <div className="flex items-center gap-3">
                                    <FileCheck size={18} className="text-emerald-500" aria-hidden="true" />
                                    <span className="text-xs font-semibold text-[#8899AA]">Form L Generation</span>
                                </div>
                                <Button variant="ghost" size="sm" icon={<Download size={14} aria-hidden="true" />} aria-label="Download Form L" />
                            </div>
                            <div className="flex items-center justify-between rounded-xl border border-[#1A2A3A] bg-[#060B14] p-4">
                                <div className="flex items-center gap-3">
                                    <ShieldCheck size={18} className="text-blue-500" aria-hidden="true" />
                                    <span className="text-xs font-semibold text-[#8899AA]">Nominee Verification</span>
                                </div>
                                <CheckCircle size={16} className="text-emerald-500" aria-label="Verified" />
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Disbursement Card */}
                <div className="space-y-6 lg:col-span-2">
                    <Card padding="lg" variant="elevated">
                        <h2 className="mb-6 border-b border-[#1A2A3A] pb-4 text-center text-xs font-bold uppercase tracking-widest text-[#445566]">
                            Disbursement Total
                        </h2>
                        <div className="space-y-6 text-center">
                            <div>
                                <p className="text-5xl font-black tabular-nums text-white">{GRATUITY_DISPLAY}</p>
                                <Badge variant="success" className="mt-2">Tax Exempt Amount</Badge>
                            </div>
                            <div className="space-y-3 border-t border-[#1A2A3A] pt-4">
                                <Button variant="primary" icon={<Calculator size={16} aria-hidden="true" />} className="w-full">
                                    Finalize Payment
                                </Button>
                                <Button variant="secondary" icon={<Landmark size={16} aria-hidden="true" />} className="w-full">
                                    Update Bank Detail
                                </Button>
                            </div>
                        </div>
                        <p className="mt-4 text-center text-[10px] text-[#445566]">
                            * Payout will be processed separately from monthly payroll.
                        </p>
                    </Card>

                    <div className="flex items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
                        <AlertTriangle size={16} className="mt-0.5 shrink-0 text-amber-500" aria-hidden="true" />
                        <p className="text-[10px] text-[#8899AA]">
                            Service duration is 4yr 8mo. Pro-rata gratuity is only applicable in case of death or
                            disablement. Please verify company policy for voluntary exits before proceeding.
                        </p>
                    </div>
                </div>
            </div>
        </Page>
    );
}
