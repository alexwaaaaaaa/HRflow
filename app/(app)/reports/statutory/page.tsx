"use client";

import { useState } from "react";
import { BookCheck, FileText, Download, Calendar } from "lucide-react";

import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

// ─── Static data (module scope) ───────────────────────────────────────────────

const ACTS = [
    "Factories Act, 1948",
    "Shops & Establishments",
    "Payment of Wages Act",
    "Minimum Wages Act",
    "Contract Labour (R&A)",
    "Maternity Benefit Act",
] as const;

type Act = (typeof ACTS)[number];

interface Register {
    name: string;
    desc: string;
}

const REGISTERS: Register[] = [
    { name: "Form 12 - Register of Adult Workers", desc: "Rule 104 - Complete list of active workers" },
    { name: "Form 14 - Register of Leave with Wages", desc: "Rule 110 - Annual leave tracking ledger" },
    { name: "Form 15 - Leave Book", desc: "Employee-wise leave booklet format" },
    { name: "Form 20 - Muster Roll", desc: "Rule 120 - Daily attendance records" },
    { name: "Form 21 - Register of Overtime", desc: "Rule 121 - OT hours and payment details" },
    { name: "Half Yearly Return (Form 22)", desc: "Rule 122 - Submissions concluding Jun 30" },
];

// ─── Sub-component (module scope) ─────────────────────────────────────────────

function RegisterRow({ reg }: { reg: Register }) {
    return (
        <div className="p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-[#1A2A3A]/30 transition-colors border-b border-[#1A2A3A] last:border-b-0">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#1A2A3A] rounded-lg flex items-center justify-center border border-[#2A3A4A] shrink-0">
                    <FileText size={18} className="text-emerald-400" aria-hidden="true" />
                </div>
                <div>
                    <h3 className="text-white font-medium text-sm">{reg.name}</h3>
                    <p className="text-xs text-[#8899AA]">{reg.desc}</p>
                </div>
            </div>
            <div className="flex gap-2 shrink-0">
                <Button variant="secondary" size="sm">
                    Preview
                </Button>
                <Button size="sm" icon={<Download size={12} aria-hidden="true" />}>
                    PDF
                </Button>
                <Button variant="outline" size="sm" icon={<Download size={12} aria-hidden="true" />}>
                    Excel
                </Button>
            </div>
        </div>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function StatutoryReportsPage() {
    const [activeAct, setActiveAct] = useState<Act>("Factories Act, 1948");

    return (
        <Page
            title="Statutory Registers & Reports"
            subtitle="Generate state-specific labour law registers in prescribed formats."
            breadcrumbs={[
                { label: "Reports", href: "/reports/dashboard" },
                { label: "Statutory Registers" },
            ]}
            maxWidth="1280px"
            actions={
                <div className="flex items-center gap-2">
                    <BookCheck size={18} className="text-emerald-400" aria-hidden="true" />
                    <span className="text-sm text-[#8899AA]">Auto-generated from live data</span>
                </div>
            }
        >
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Acts sidebar */}
                <Card padding="none" className="lg:col-span-1">
                    <div className="p-4 border-b border-[#1A2A3A] bg-[#1A2A3A]/20">
                        <h2 className="text-sm font-bold text-white">Acts &amp; Categories</h2>
                    </div>
                    <nav aria-label="Statutory acts">
                        <ul>
                            {ACTS.map((act) => {
                                const isActive = act === activeAct;
                                return (
                                    <li key={act}>
                                        <button
                                            type="button"
                                            onClick={() => setActiveAct(act)}
                                            className={`w-full text-left p-4 border-l-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#00e5a0] ${
                                                isActive
                                                    ? "border-emerald-400 bg-[#1A2A3A]/30 text-emerald-400 font-medium"
                                                    : "border-transparent text-[#8899AA] hover:bg-[#1A2A3A]/20 hover:text-white"
                                            }`}
                                            aria-current={isActive ? "page" : undefined}
                                        >
                                            {act}
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                </Card>

                {/* Main content */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                    {/* Filters */}
                    <Card padding="md">
                        <div className="flex flex-col md:flex-row gap-4 items-end">
                            <div className="flex-1">
                                <label htmlFor="state-filter" className="block text-xs text-[#8899AA] mb-1">
                                    State / Region
                                </label>
                                <select
                                    id="state-filter"
                                    className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500"
                                >
                                    <option>Karnataka</option>
                                    <option>Maharashtra</option>
                                    <option>Tamil Nadu</option>
                                </select>
                            </div>
                            <div className="flex-1">
                                <label htmlFor="period-filter" className="block text-xs text-[#8899AA] mb-1">
                                    Period (Month/Year)
                                </label>
                                <div className="relative">
                                    <Calendar
                                        size={14}
                                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8899AA]"
                                        aria-hidden="true"
                                    />
                                    <input
                                        id="period-filter"
                                        type="month"
                                        defaultValue="2026-03"
                                        className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white text-sm rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:border-emerald-500"
                                    />
                                </div>
                            </div>
                            <Button variant="secondary">Apply</Button>
                        </div>
                    </Card>

                    {/* Registers list */}
                    <Card padding="none">
                        <div className="p-4 border-b border-[#1A2A3A] bg-[#1A2A3A]/20">
                            <h2 className="text-sm font-bold text-white">
                                Registers: {activeAct} (Karnataka)
                            </h2>
                        </div>
                        <div>
                            {REGISTERS.map((reg) => (
                                <RegisterRow key={reg.name} reg={reg} />
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
