"use client";

import React, { useState } from "react";
import {
    AlertTriangle,
    RefreshCw,
    Download,
    FileArchive,
    ArrowRight,
    ShieldCheck,
    CheckCircle2,
    Database,
} from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// ── Sub-components (module-scope) ─────────────────────────────────────────────
function StepHeader({
    num,
    title,
    active,
    current,
}: {
    num: number;
    title: string;
    active: boolean;
    current: boolean;
}) {
    return (
        <div
            className={`p-4 flex flex-col items-center justify-center text-center ${
                current ? "bg-[#1A2A3A]/40 border-b-2 border-[#FFB800]" : "border-b-2 border-transparent opacity-50"
            }`}
        >
            <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mb-2 ${
                    active ? "bg-[#FFB800] text-[#060B14]" : "bg-[#1A2A3A] text-[#8899AA]"
                }`}
                aria-current={current ? "step" : undefined}
            >
                {num}
            </div>
            <div className={`text-sm font-bold ${active ? "text-white" : "text-[#8899AA]"}`}>{title}</div>
        </div>
    );
}

export default function RevisedReturn24QScreen() {
    const [step, setStep] = useState(1);

    return (
        <Page
            title="Revised TDS Return (Form 24Q)"
            subtitle="File a correction statement for previously filed quarterly returns."
            breadcrumbs={[
                { label: "Tax", href: "/tax/dashboard" },
                { label: "24Q Returns", href: "/tax/returns-24q" },
                { label: "Revised Return" },
            ]}
            maxWidth="900px"
        >
            <div className="space-y-6">
                {/* Info Banner */}
                <Card padding="md" className="border border-[#FFB800]/20 bg-[#FFB800]/10 flex items-start gap-3">
                    <AlertTriangle size={20} className="text-[#FFB800] mt-0.5 shrink-0" aria-hidden="true" />
                    <div className="text-sm">
                        <h4 className="font-bold text-[#FFB800] mb-1">When to file a revised return?</h4>
                        <p className="text-[#8899AA]">
                            Revised returns (correction statements) are needed if there are incorrect PANs, challan mismatches, or
                            omitted entries in the original filing. You will need the Consolidated File from the TRACES portal to
                            begin this process.
                        </p>
                    </div>
                </Card>

                {/* Stepper Card */}
                <Card padding="none">
                    {/* Steps Header */}
                    <ol className="grid grid-cols-3 border-b border-[#1A2A3A] bg-[#0A1420]" aria-label="Revised return steps">
                        <StepHeader num={1} title="Import Conso File" active={step >= 1} current={step === 1} />
                        <StepHeader num={2} title="Review & Correct" active={step >= 2} current={step === 2} />
                        <StepHeader num={3} title="Generate FVU" active={step >= 3} current={step === 3} />
                    </ol>

                    <div className="p-8">
                        {step === 1 && (
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-2">Upload Consolidated (Conso) File</h3>
                                    <p className="text-sm text-[#8899AA] mb-6">
                                        Download the required Conso file (.tds) for the specific quarter from TRACES and upload it
                                        here.
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="fy-select" className="text-xs font-semibold text-[#8899AA] uppercase tracking-wider block mb-2">
                                            Financial Year
                                        </label>
                                        <select
                                            id="fy-select"
                                            className="w-full bg-[#060B14] border border-[#2A3A4A] rounded-lg py-2.5 px-3 text-sm text-white focus:outline-none focus:border-[#FFB800]"
                                        >
                                            <option>2024-25</option>
                                            <option>2023-24</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="quarter-select" className="text-xs font-semibold text-[#8899AA] uppercase tracking-wider block mb-2">
                                            Quarter
                                        </label>
                                        <select
                                            id="quarter-select"
                                            className="w-full bg-[#060B14] border border-[#2A3A4A] rounded-lg py-2.5 px-3 text-sm text-white focus:outline-none focus:border-[#FFB800]"
                                        >
                                            <option>Q1</option>
                                            <option>Q2</option>
                                        </select>
                                    </div>
                                </div>

                                <label
                                    htmlFor="conso-upload"
                                    className="border-2 border-dashed border-[#2A3A4A] rounded-xl bg-[#060B14] p-8 text-center hover:bg-[#1A2A3A]/50 transition-colors cursor-pointer group flex flex-col items-center"
                                >
                                    <div className="w-16 h-16 bg-[#1A2A3A] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform text-[#FFB800]">
                                        <Database size={24} aria-hidden="true" />
                                    </div>
                                    <div className="text-base font-bold text-white mb-1">
                                        Click to browse or drag .tds file here
                                    </div>
                                    <div className="text-xs text-[#8899AA]">
                                        Password protected file from TRACES (usually TAN_REQID)
                                    </div>
                                    <input id="conso-upload" type="file" accept=".tds" className="sr-only" />
                                </label>

                                <div className="flex justify-end pt-4 border-t border-[#1A2A3A]">
                                    <Button onClick={() => setStep(2)} iconRight={<ArrowRight size={16} />}>
                                        Process File
                                    </Button>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                                        <CheckCircle2 size={20} className="text-[#00E5A0]" aria-hidden="true" />
                                        File Parsed Successfully
                                    </h3>
                                    <p className="text-sm text-[#8899AA]">
                                        Q2 2024-25 • PRN: 0001004122390 • Original Return
                                    </p>
                                </div>

                                <Card padding="none">
                                    <div className="p-4 border-b border-[#1A2A3A] bg-[#0A1420]">
                                        <h4 className="font-bold text-white text-sm">Select Correction Type</h4>
                                    </div>
                                    <div className="divide-y divide-[#1A2A3A]">
                                        {[
                                            {
                                                id: "c1",
                                                value: "C1",
                                                title: "C1: Update Challan Details",
                                                desc: "Correct BSR code, date, challan serial number",
                                            },
                                            {
                                                id: "c2",
                                                value: "C2",
                                                title: "C2: Update Deductee Details",
                                                desc: "Correct PAN, amount paid, TDS amount",
                                                badge: "Auto-mapping available",
                                                defaultChecked: true,
                                            },
                                            {
                                                id: "c9",
                                                value: "C9",
                                                title: "C9: Replace/Delete Challan",
                                                desc: "Map unmatched challans to deductees",
                                            },
                                        ].map((opt) => (
                                            <label key={opt.id} className="flex items-center p-4 hover:bg-[#1A2A3A]/40 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="ctype"
                                                    className="accent-[#FFB800] w-4 h-4 mr-4"
                                                    defaultChecked={opt.defaultChecked}
                                                />
                                                <div>
                                                    <div className="text-sm font-bold text-white flex items-center gap-2">
                                                        {opt.title}
                                                        {opt.badge && <Badge variant="info">{opt.badge}</Badge>}
                                                    </div>
                                                    <div className="text-xs text-[#8899AA]">{opt.desc}</div>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </Card>

                                <Card padding="md" className="border border-[#0066FF]/20 bg-[#0066FF]/10 flex items-start gap-3">
                                    <RefreshCw size={18} className="text-[#0066FF] mt-0.5 shrink-0" aria-hidden="true" />
                                    <div>
                                        <strong className="text-white block mb-1">HRFlow Auto-Correction matches found!</strong>
                                        <span className="text-sm text-[#8899AA]">
                                            Based on HRFlow&apos;s database, we found <strong>2 instances</strong> where PAN was later
                                            updated. We can auto-apply these C2 corrections to the Conso file.
                                        </span>
                                    </div>
                                </Card>

                                <div className="flex justify-between pt-4 border-t border-[#1A2A3A]">
                                    <Button variant="ghost" onClick={() => setStep(1)}>Back</Button>
                                    <Button onClick={() => setStep(3)} iconRight={<ArrowRight size={16} />}>
                                        Review Changes &amp; Next
                                    </Button>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="flex flex-col items-center justify-center p-8 border border-[#1A2A3A] rounded-2xl bg-[#060B14] mt-4">
                                <div className="w-20 h-20 bg-[#00E5A0]/10 rounded-full flex items-center justify-center mb-6 relative border border-[#00E5A0]/20">
                                    <FileArchive size={32} className="text-[#00E5A0]" aria-hidden="true" />
                                    <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-[#060B14] border flex items-center justify-center border-[#00E5A0]">
                                        <ShieldCheck size={16} className="text-[#00E5A0]" aria-hidden="true" />
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-white text-center mb-2">Correction File Ready</h3>
                                <p className="text-sm text-[#8899AA] text-center mb-6 max-w-[320px]">
                                    2 deductee PAN corrections applied successfully. The revised file is ready for FVU validation.
                                </p>

                                <Button className="w-full max-w-xs mb-4" icon={<Download size={18} />}>
                                    Download Revised TXT
                                </Button>

                                <Button variant="ghost" size="sm">Download Summary Report PDF</Button>
                            </div>
                        )}
                    </div>
                </Card>
            </div>
        </Page>
    );
}
