"use client";

import { FileText, ShieldCheck, Download, Calendar, AlertTriangle, Printer, History } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const PARTS = [
    {
        title: "Part A (TRACES Generated)",
        desc: "Quarterly TDS details and summary authenticated by TRACES.",
        status: "Ready" as const,
        date: "Generated 12 Mar 24",
    },
    {
        title: "Part B (Annexure to Form 16)",
        desc: "Detailed breakdown of salary, deductions, and tax calculation.",
        status: "Final Review" as const,
        date: "Last Updated 24 Mar 24",
    },
];

const TDS_HISTORY = [
    { q: "Quarter 3", period: "Oct - Dec 23", status: "Filed", amount: "₹1,42,881" },
    { q: "Quarter 2", period: "Jul - Sep 23", status: "Filed", amount: "₹1,38,202" },
];

export default function FnFForm16() {
    return (
        <Page
            title="Tax Certificate (Form 16)"
            subtitle="Generate statutory Part A & B for the exit financial year."
            breadcrumbs={[
                { label: "FnF", href: "/fnf/dashboard" },
                { label: "Form 16" },
            ]}
            maxWidth="1200px"
            actions={
                <Button variant="secondary" icon={<Download size={14} aria-hidden="true" />}>
                    Download Combined
                </Button>
            }
        >
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                {/* Part A/B Selection */}
                <div className="space-y-6 lg:col-span-8">
                    <Card padding="none">
                        <div className="flex items-center justify-between border-b border-[#1A2A3A] px-6 py-4">
                            <h2 className="flex items-center gap-2 text-base font-bold text-white">
                                <FileText size={18} className="text-blue-500" aria-hidden="true" />
                                Statutory Components
                            </h2>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#445566]">FY 2023-24</span>
                        </div>
                        <ul role="list">
                            {PARTS.map((part) => (
                                <li
                                    key={part.title}
                                    className="flex items-start gap-6 border-b border-[#1A2A3A] p-6 last:border-0 transition-colors hover:bg-[#1A2A3A]/20"
                                >
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#1A2A3A] bg-[#060B14] text-blue-500">
                                        <ShieldCheck size={22} aria-hidden="true" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="mb-2 flex items-center justify-between">
                                            <h3 className="text-sm font-black uppercase tracking-tight text-white">
                                                {part.title}
                                            </h3>
                                            <Badge variant={part.status === "Ready" ? "success" : "warning"}>
                                                {part.status}
                                            </Badge>
                                        </div>
                                        <p className="mb-3 text-xs text-[#445566]">{part.desc}</p>
                                        <div className="flex items-center gap-6">
                                            <span className="flex items-center gap-1 text-[10px] font-bold uppercase text-[#445566]">
                                                <Calendar size={12} aria-hidden="true" /> {part.date}
                                            </span>
                                            <Button variant="ghost" size="sm" icon={<Download size={12} aria-hidden="true" />}>
                                                Individual Download
                                            </Button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </Card>

                    <Card padding="md">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white">
                                <History size={16} className="text-blue-500" aria-hidden="true" />
                                TDS Filing History
                            </h3>
                        </div>
                        <ul className="space-y-3" role="list">
                            {TDS_HISTORY.map((q) => (
                                <li
                                    key={q.q}
                                    className="flex cursor-pointer items-center justify-between rounded-xl border border-[#1A2A3A] bg-[#060B14] p-3 transition-colors hover:border-blue-500/30"
                                >
                                    <div>
                                        <p className="text-xs font-black uppercase tracking-tight text-white">{q.q}</p>
                                        <p className="text-[9px] font-bold uppercase text-[#445566]">{q.period}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-black text-white">{q.amount}</p>
                                        <Badge variant="success">{q.status}</Badge>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </Card>
                </div>

                {/* Tax Summary */}
                <div className="space-y-6 lg:col-span-4">
                    <Card padding="lg" variant="elevated">
                        <h2 className="mb-6 border-b border-[#1A2A3A] pb-4 text-center text-xs font-bold uppercase tracking-widest text-[#445566]">
                            Tax Computation Balance
                        </h2>
                        <div className="space-y-6 text-center">
                            <div>
                                <p className="text-4xl font-black tabular-nums text-white">₹5,12,201.00</p>
                                <Badge variant="warning" className="mt-2">Total Tax Deduction (MTD)</Badge>
                            </div>
                            <dl className="space-y-3 border-t border-[#1A2A3A] pt-4">
                                <div className="flex justify-between text-xs font-semibold">
                                    <dt className="text-[#445566]">Taxable Income</dt>
                                    <dd className="tabular-nums text-white">₹24,82,000.00</dd>
                                </div>
                                <div className="flex justify-between text-xs font-semibold">
                                    <dt className="text-[#445566]">Exemptions</dt>
                                    <dd className="tabular-nums text-emerald-400">(-₹6,44,000)</dd>
                                </div>
                            </dl>
                            <Button
                                variant="secondary"
                                icon={<Printer size={16} aria-hidden="true" />}
                                className="w-full"
                            >
                                Print Form 16
                            </Button>
                        </div>
                    </Card>

                    <div className="flex items-start gap-3 rounded-2xl border border-rose-500/10 bg-rose-500/5 p-4">
                        <AlertTriangle size={16} className="mt-0.5 shrink-0 text-rose-500" aria-hidden="true" />
                        <p className="text-[10px] font-bold uppercase tracking-tight text-[#445566]">
                            Form 16 is issued post Quarter 4 filing (May/June). For mid-year exits, TDS certificates may
                            only include details up to the exit month. Provide Part B manually if required for new employer.
                        </p>
                    </div>
                </div>
            </div>
        </Page>
    );
}
