"use client";

import React from "react";
import {
    CheckCircle2,
    AlertCircle,
    Upload,
    Building2,
    Calendar,
    IndianRupee,
} from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

// ── Sub-components (module-scope) ─────────────────────────────────────────────
function AmountInput({ label, highlight, id }: { label: string; highlight?: boolean; id: string }) {
    return (
        <div>
            <label
                htmlFor={id}
                className={`text-xs font-semibold uppercase tracking-wider block mb-2 ${
                    highlight ? "text-[#FFB800]" : "text-[#8899AA]"
                }`}
            >
                {label}
            </label>
            <div className="relative">
                <IndianRupee
                    size={16}
                    className={`absolute left-3 top-3 ${highlight ? "text-[#FFB800]/70" : "text-[#445566]"}`}
                    aria-hidden="true"
                />
                <input
                    id={id}
                    type="number"
                    className={`w-full bg-[#060B14] border rounded-lg py-2.5 pl-9 pr-4 text-sm text-white focus:outline-none ${
                        highlight
                            ? "border-[#FFB800]/50 focus:border-[#FFB800]"
                            : "border-[#2A3A4A] focus:border-[#00E5A0]"
                    }`}
                    placeholder="0"
                />
            </div>
        </div>
    );
}

export default function Form12BScreen() {
    return (
        <Page
            title="Form 12B (Previous Employer Income)"
            subtitle="Declare income and TDS from your previous employer(s) for the current financial year."
            breadcrumbs={[
                { label: "Tax", href: "/tax" },
                { label: "Form 12B" },
            ]}
            maxWidth="900px"
            actions={
                <span className="bg-[#1A2A3A] border border-[#2A3A4A] px-3 py-1 rounded-lg text-xs font-bold text-[#8899AA]">
                    FY 2024-25
                </span>
            }
        >
            <div className="space-y-6">
                <Card padding="md" className="border border-[#FFB800]/20 bg-[#FFB800]/10 flex items-start gap-3">
                    <AlertCircle size={20} className="text-[#FFB800] mt-0.5 shrink-0" aria-hidden="true" />
                    <div className="text-sm">
                        <h4 className="font-bold text-[#FFB800] mb-1">Mandatory for Mid-Year Joiners</h4>
                        <p className="text-[#8899AA]">
                            Failure to declare previous income may result in short deduction of TDS and subsequent interest penalty
                            under section 234B/C by the Income Tax Department.
                        </p>
                    </div>
                </Card>

                <Card padding="none">
                    <div className="px-6 py-4 border-b border-[#1A2A3A] flex justify-between items-center bg-[#0A1420]">
                        <h3 className="font-bold text-white">Employer Details</h3>
                        <div className="flex space-x-2" aria-hidden="true">
                            <span className="w-2 h-2 rounded-full bg-[#00E5A0]" />
                            <span className="w-2 h-2 rounded-full bg-[#1A2A3A]" />
                        </div>
                    </div>

                    <div className="p-6 space-y-8">
                        {/* Employer Info */}
                        <div className="grid grid-cols-2 gap-6">
                            <div className="col-span-2 md:col-span-1">
                                <label htmlFor="prev-employer-name" className="text-xs font-semibold text-[#8899AA] uppercase tracking-wider block mb-2">
                                    Previous Employer Name
                                </label>
                                <div className="relative">
                                    <Building2 size={16} className="absolute left-3 top-3 text-[#445566]" aria-hidden="true" />
                                    <input
                                        id="prev-employer-name"
                                        type="text"
                                        className="w-full bg-[#060B14] border border-[#2A3A4A] rounded-lg py-2.5 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-[#FFB800]"
                                        placeholder="e.g. Acme Corp Pvt Ltd"
                                    />
                                </div>
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <label htmlFor="employer-tan" className="text-xs font-semibold text-[#8899AA] uppercase tracking-wider block mb-2">
                                    Employer TAN
                                </label>
                                <input
                                    id="employer-tan"
                                    type="text"
                                    className="w-full bg-[#060B14] border border-[#2A3A4A] rounded-lg py-2.5 px-4 text-sm text-white focus:outline-none focus:border-[#FFB800] uppercase font-mono"
                                    placeholder="e.g. BLRA12345E"
                                />
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <label htmlFor="worked-from" className="text-xs font-semibold text-[#8899AA] uppercase tracking-wider block mb-2">
                                    Worked From
                                </label>
                                <div className="relative">
                                    <Calendar size={16} className="absolute left-3 top-3 text-[#445566]" aria-hidden="true" />
                                    <input
                                        id="worked-from"
                                        type="date"
                                        className="w-full bg-[#060B14] border border-[#2A3A4A] rounded-lg py-2.5 pl-9 pr-4 text-sm text-[#c8d8e8] focus:outline-none focus:border-[#FFB800]"
                                    />
                                </div>
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <label htmlFor="worked-till" className="text-xs font-semibold text-[#8899AA] uppercase tracking-wider block mb-2">
                                    Worked Till (Leaving Date)
                                </label>
                                <div className="relative">
                                    <Calendar size={16} className="absolute left-3 top-3 text-[#445566]" aria-hidden="true" />
                                    <input
                                        id="worked-till"
                                        type="date"
                                        className="w-full bg-[#060B14] border border-[#2A3A4A] rounded-lg py-2.5 pl-9 pr-4 text-sm text-[#c8d8e8] focus:outline-none focus:border-[#FFB800]"
                                    />
                                </div>
                            </div>
                        </div>

                        <hr className="border-[#1A2A3A]" />

                        {/* Income Details */}
                        <div>
                            <h4 className="text-sm font-bold text-white mb-4">Income &amp; Deduction Details</h4>
                            <div className="grid grid-cols-2 gap-6">
                                <AmountInput id="gross-salary" label="Gross Salary Received" />
                                <AmountInput id="tds-deducted" label="Total Tax Deducted (TDS)" highlight />
                                <AmountInput id="prof-tax" label="Professional Tax Deducted" />
                                <AmountInput id="epf-deducted" label="Provident Fund (EPF) Deducted" />

                                <div className="col-span-2 mt-2">
                                    <label htmlFor="form16-upload" className="text-xs font-semibold text-[#8899AA] uppercase tracking-wider block mb-2">
                                        Upload Form 16 / Full &amp; Final Settlement Letter
                                    </label>
                                    <label
                                        htmlFor="form16-upload"
                                        className="border border-dashed border-[#2A3A4A] rounded-xl bg-[#060B14] p-6 text-center hover:bg-[#1A2A3A]/50 transition-colors cursor-pointer group flex flex-col items-center"
                                    >
                                        <div className="w-12 h-12 bg-[#1A2A3A] rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                                            <Upload size={20} className="text-[#00E5A0]" aria-hidden="true" />
                                        </div>
                                        <div className="text-sm font-bold text-white">
                                            Click to upload document or drag and drop
                                        </div>
                                        <div className="text-xs text-[#8899AA] mt-1">PDF, JPG or PNG (max 5MB)</div>
                                        <input id="form16-upload" type="file" accept=".pdf,.jpg,.jpeg,.png" className="sr-only" />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="px-6 py-4 border-t border-[#1A2A3A] bg-[#0A1420] flex justify-between items-center">
                        <div className="text-xs text-[#8899AA] flex items-center gap-1.5">
                            <CheckCircle2 size={14} aria-hidden="true" /> Auto-saves draft
                        </div>
                        <Button>Save and Continue</Button>
                    </div>
                </Card>
            </div>
        </Page>
    );
}
