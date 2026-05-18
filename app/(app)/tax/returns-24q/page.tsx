"use client";

import React, { useState } from "react";
import {
    Download,
    FileArchive,
    CheckCircle2,
    FileJson,
    AlertCircle,
    CalendarRange,
    ArrowRight,
} from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// ── Types ─────────────────────────────────────────────────────────────────────
type QuarterStatus = "filed" | "ready" | "locked";

interface QuarterCardData {
    quarter: string;
    months: string;
    due: string;
    status: QuarterStatus;
    employees: number;
    tds: string;
}

// ── Constants ─────────────────────────────────────────────────────────────────
const QUARTERS: QuarterCardData[] = [
    { quarter: "Q1", months: "Apr - Jun", due: "31 Jul 2024", status: "filed", employees: 390, tds: "₹11,40,200" },
    { quarter: "Q2", months: "Jul - Sep", due: "31 Oct 2024", status: "filed", employees: 402, tds: "₹11,65,500" },
    { quarter: "Q3", months: "Oct - Dec", due: "31 Jan 2025", status: "ready", employees: 412, tds: "₹11,65,400" },
    { quarter: "Q4", months: "Jan - Mar", due: "31 May 2025", status: "locked", employees: 0, tds: "₹0" },
];

// ── Sub-components (module-scope) ─────────────────────────────────────────────
function QuarterCard({ data }: { data: QuarterCardData }) {
    const isFiled = data.status === "filed";
    const isReady = data.status === "ready";
    const isLocked = data.status === "locked";

    return (
        <Card
            padding="lg"
            className={`flex flex-col ${isReady ? "border-[#FFB800]/50 shadow-[0_0_15px_rgba(255,184,0,0.15)] -translate-y-1" : ""} ${isLocked ? "opacity-60" : ""}`}
        >
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-2">
                    <span className="text-lg font-black text-white">{data.quarter}</span>
                    <span className="text-xs font-semibold text-[#8899AA] bg-[#1A2A3A] px-2 py-0.5 rounded">{data.months}</span>
                </div>
            </div>

            <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                    <span className="text-[#8899AA]">Due Date</span>
                    <span className="font-semibold text-white flex items-center gap-1.5">
                        <CalendarRange size={14} className="text-[#445566]" aria-hidden="true" /> {data.due}
                    </span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-[#8899AA]">Employees</span>
                    <span className="font-semibold text-white">{data.employees}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-[#8899AA]">TDS Amount</span>
                    <span className="font-bold text-white">{data.tds}</span>
                </div>
            </div>

            <div className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                {isFiled && (
                    <Badge variant="success">
                        <CheckCircle2 size={12} className="mr-1 inline" aria-hidden="true" /> Filed
                    </Badge>
                )}
                {isReady && <Badge variant="warning">Action Required</Badge>}
                {isLocked && <Badge variant="neutral">Locked</Badge>}
            </div>
        </Card>
    );
}

function CheckItem({ label, pass }: { label: string; pass: boolean }) {
    return (
        <div className="flex items-center space-x-3 text-sm">
            {pass ? (
                <div className="w-5 h-5 rounded-full bg-[#00E5A0]/20 flex items-center justify-center shrink-0">
                    <CheckCircle2 size={12} className="text-[#00E5A0]" aria-hidden="true" />
                </div>
            ) : (
                <div className="w-5 h-5 rounded-full bg-[#FFB800]/20 flex items-center justify-center shrink-0">
                    <AlertCircle size={12} className="text-[#FFB800]" aria-hidden="true" />
                </div>
            )}
            <span className={pass ? "text-[#c8d8e8]" : "text-[#FFB800]"}>{label}</span>
        </div>
    );
}

export default function TDS24QReturnScreen() {
    const [generating, setGenerating] = useState(false);

    const handleGenerateFVU = () => {
        setGenerating(true);
        setTimeout(() => setGenerating(false), 3000);
    };

    return (
        <Page
            title="TDS Return (Form 24Q)"
            subtitle="Generate quarterly return files (FVU/TXT) for uploading to the IT portal."
            breadcrumbs={[
                { label: "Tax", href: "/tax/dashboard" },
                { label: "24Q Returns" },
            ]}
            maxWidth="1000px"
            actions={
                <select
                    aria-label="Select financial year"
                    className="bg-[#0D1928] border border-[#1A2A3A] text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#00E5A0]"
                >
                    <option>2024-25</option>
                    <option>2023-24</option>
                </select>
            }
        >
            <div className="space-y-6">
                {/* Quarter Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {QUARTERS.map((q) => (
                        <QuarterCard key={q.quarter} data={q} />
                    ))}
                </div>

                {/* Main Action Area for Q3 */}
                <Card padding="none">
                    <div className="px-6 py-4 border-b border-[#1A2A3A] bg-[#0A1420] flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-lg bg-[#0066FF] flex items-center justify-center text-white font-black text-sm">
                                Q3
                            </div>
                            <h2 className="text-lg font-bold text-white">Generate Quarter 3 Return</h2>
                        </div>
                        <Badge variant="warning">Due in 15 days</Badge>
                    </div>

                    <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Pre-checks */}
                        <div>
                            <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Validation Checks</h3>
                            <div className="space-y-4">
                                <CheckItem label="Challans mapped for Oct, Nov, Dec" pass={true} />
                                <CheckItem label="PAN Validation (All Employees)" pass={true} />
                                <CheckItem label="Lower Deduction Certificates updated" pass={true} />
                                <CheckItem label="BSR Codes format valid" pass={true} />
                                <CheckItem label="Company TAN/PAN Info valid" pass={true} />
                            </div>

                            <Card variant="bare" className="mt-6 p-4 bg-[#00E5A0]/5 border border-[#00E5A0]/20 rounded-xl flex items-start space-x-3">
                                <CheckCircle2 size={20} className="text-[#00E5A0] shrink-0" aria-hidden="true" />
                                <div>
                                    <h4 className="text-sm font-bold text-[#00E5A0]">Validation Passed</h4>
                                    <p className="text-xs text-[#8899AA] mt-1">
                                        Ready to generate FVU file. Ensure you process it via NSDL FVU utility before uploading to
                                        TRACES.
                                    </p>
                                </div>
                            </Card>
                        </div>

                        {/* Generate */}
                        <div className="flex flex-col justify-center items-center p-8 border-2 border-dashed border-[#2A3A4A] rounded-2xl bg-[#060B14]">
                            <div className="w-20 h-20 bg-[#1A2A3A] rounded-full flex items-center justify-center mb-6 relative">
                                <FileArchive size={32} className="text-[#0066FF]" aria-hidden="true" />
                                {generating && (
                                    <div className="absolute inset-0 rounded-full border-t-2 border-[#0066FF] animate-spin" aria-hidden="true" />
                                )}
                            </div>

                            <h3 className="text-xl font-bold text-white text-center mb-2">Generate Base File (.txt)</h3>
                            <p className="text-sm text-[#8899AA] text-center mb-8 max-w-[280px]">
                                Download the raw text file for Q3 to validate via FVU utility.
                            </p>

                            <Button
                                onClick={handleGenerateFVU}
                                disabled={generating}
                                isLoading={generating}
                                loadingText="Generating File..."
                                icon={<Download size={18} />}
                                className="w-full"
                            >
                                Download TXT File
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* FVU Utility Helper */}
                <Card padding="md" className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <FileJson size={24} className="text-[#8899AA]" aria-hidden="true" />
                        <div>
                            <h4 className="text-sm font-bold text-white">Need the latest NSDL FVU Utility?</h4>
                            <p className="text-xs text-[#8899AA] mt-0.5">Version 8.5 is required for Q3 FY 24-25.</p>
                        </div>
                    </div>
                    <Button variant="ghost" size="sm" iconRight={<ArrowRight size={16} />}>
                        Download Utility
                    </Button>
                </Card>
            </div>
        </Page>
    );
}
