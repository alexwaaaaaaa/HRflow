"use client";

import { Activity, Download, Filter } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

// migrated: immersive-ui

const EARNINGS = [
    { label: "Basic Pay", value: "₹2.10 Cr" },
    { label: "HRA", value: "₹0.95 Cr" },
    { label: "Special Allowance", value: "₹1.80 Cr" },
    { label: "Bonus / Arrears", value: "₹0.39 Cr" },
] as const;

const DEDUCTIONS = [
    { label: "TDS (Income Tax)", value: "₹0.71 Cr" },
    { label: "PF (Employee)", value: "₹0.11 Cr" },
    { label: "Professional Tax", value: "₹0.02 Cr" },
    { label: "LWF / Escrow", value: "₹0.01 Cr" },
] as const;

export default function GrossToNetScreen() {
    return (
        <Page
            title="Gross to Net Report"
            subtitle="Detailed variance of earnings, deductions, and net pay across payroll months."
            breadcrumbs={[
                { label: "Payroll", href: "/payroll/dashboard" },
                { label: "Reports", href: "/payroll-reports" },
                { label: "Gross to Net" },
            ]}
            maxWidth="1100px"
            actions={
                <>
                    <label htmlFor="gtn-month" className="sr-only">Select month</label>
                    <select
                        id="gtn-month"
                        className="bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-2.5 text-white text-sm focus:border-indigo-500 outline-none"
                    >
                        <option>March 2026</option>
                        <option>February 2026</option>
                        <option>January 2026</option>
                    </select>
                    <Button variant="secondary" icon={<Filter size={14} aria-hidden="true" />}>Filter</Button>
                    <Button icon={<Download size={14} aria-hidden="true" />}>Export Output</Button>
                </>
            }
        >
            {/* Flow Diagram */}
            <Card padding="lg">
                <h3 className="text-white font-bold text-center mb-8">March 2026 — Organization Wide Rollup</h3>

                {/* Summary Flow */}
                <div className="flex justify-between w-full max-w-4xl mx-auto items-stretch gap-4 mb-12">
                    <div
                        className="flex flex-col justify-center items-center bg-indigo-500/10 border border-indigo-500/30 rounded-2xl px-6 py-8 flex-1"
                        role="figure"
                        aria-label="Gross Earnings: ₹5.24 Cr"
                    >
                        <span className="text-indigo-400 font-black text-2xl">₹5.24 Cr</span>
                        <span className="text-[#8899AA] text-xs font-bold uppercase mt-1">Gross Earnings</span>
                    </div>

                    <div className="flex flex-col justify-center items-center px-4">
                        <div className="flex flex-col items-center">
                            <span className="text-red-400 font-bold text-lg">₹0.85 Cr</span>
                            <span className="text-[#8899AA] text-[10px] uppercase font-bold mt-1">Total Deductions</span>
                            <div className="w-px h-8 bg-red-400/30 mt-2" aria-hidden="true" />
                        </div>
                    </div>

                    <div
                        className="flex flex-col justify-center items-center bg-emerald-500/10 border border-emerald-500/30 rounded-2xl px-6 py-8 flex-1"
                        role="figure"
                        aria-label="Net Payable: ₹4.39 Cr"
                    >
                        <span className="text-emerald-400 font-black text-2xl">₹4.39 Cr</span>
                        <span className="text-[#8899AA] text-xs font-bold uppercase mt-1">Net Payable</span>
                    </div>
                </div>

                {/* Breakdown Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-12">
                    <div>
                        <div className="text-indigo-300 text-sm font-bold border-b border-[#1A2A3A] pb-2 mb-3">Earnings Breakdown</div>
                        <dl className="space-y-2 text-sm">
                            {EARNINGS.map((e) => (
                                <div key={e.label} className="flex justify-between text-[#8899AA]">
                                    <dt>{e.label}</dt>
                                    <dd className="text-white">{e.value}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                    <div>
                        <div className="text-red-300 text-sm font-bold border-b border-[#1A2A3A] pb-2 mb-3">Deductions Breakdown</div>
                        <dl className="space-y-2 text-sm">
                            {DEDUCTIONS.map((d) => (
                                <div key={d.label} className="flex justify-between text-[#8899AA]">
                                    <dt>{d.label}</dt>
                                    <dd className="text-white">{d.value}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </Card>

            {/* Summary KPI */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card padding="md" className="text-center">
                    <div className="text-[#8899AA] text-xs font-bold uppercase mb-1">Gross Earnings</div>
                    <div className="text-2xl font-black text-indigo-400">₹5.24 Cr</div>
                </Card>
                <Card padding="md" className="text-center">
                    <div className="text-[#8899AA] text-xs font-bold uppercase mb-1">Total Deductions</div>
                    <div className="text-2xl font-black text-red-400">₹0.85 Cr</div>
                </Card>
                <Card padding="md" className="text-center">
                    <div className="text-[#8899AA] text-xs font-bold uppercase mb-1">Net Payable</div>
                    <div className="text-2xl font-black text-emerald-400">₹4.39 Cr</div>
                    <div className="flex items-center justify-center gap-1 mt-1">
                        <Activity size={12} className="text-[#8899AA]" aria-hidden="true" />
                        <span className="text-xs text-[#8899AA]">83.8% of gross</span>
                    </div>
                </Card>
            </div>
        </Page>
    );
}
