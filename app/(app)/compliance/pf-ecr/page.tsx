"use client";

import { useState } from "react";
import {
    FileSpreadsheet,
    Download,
    ShieldAlert,
} from "lucide-react";

import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// ─── Data ─────────────────────────────────────────────────────────────────────
const ALERTS = [
    { emp: "EMP-210 (Karan)", type: "UAN Validation Failed", msg: "Name mismatch in Aadhar/UAN." },
    { emp: "EMP-304 (Pooja)", type: "Inactive UAN", msg: "UAN not linked to current establishment." },
    { emp: "EMP-112 (Rahul)", type: "High Contribution Warning", msg: "VPF contribution > Gross Wages." },
];

const STEPS = [
    { step: "1", text: "Login to unifiedportal-emp.epfindia.gov.in" },
    { step: "2", text: "Payments > ECR/Return Filing" },
    { step: "3", text: "Upload the downloaded TXT file" },
    { step: "4", text: "Verify Output & Generate Challan" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function PFECRFile() {
    const [dragActive, setDragActive] = useState(false);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    return (
        <Page
            title="ECR Statement Generation"
            subtitle="Electronic Challan cum Return (ECR) text file compilation."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Compliance", href: "/compliance/dashboard" },
                { label: "PF ECR" },
            ]}
            maxWidth="1280px"
            actions={
                <Button variant="outline" size="sm">Format Specs</Button>
            }
        >
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {/* File generation area */}
                <div className="space-y-6 lg:col-span-2">
                    <Card padding="lg">
                        <div className="mb-4 flex items-center justify-between border-b border-[#1A2A3A] pb-4">
                            <h2 className="text-xs font-black uppercase tracking-widest text-white">Step 1: Generate TXT File</h2>
                            <Badge variant="success">System Auto-Gen Ready</Badge>
                        </div>

                        <div
                            className={`flex w-full flex-col items-center justify-center rounded-3xl border-2 border-dashed p-12 text-center transition-all duration-300 ${
                                dragActive ? "border-emerald-500 bg-emerald-500/5" : "border-[#1A2A3A] bg-[#060B14]"
                            }`}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={(e) => { e.preventDefault(); setDragActive(false); }}
                            role="region"
                            aria-label="ECR file upload area"
                        >
                            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-[#1A2A3A] bg-[#0D1928] shadow-xl">
                                <FileSpreadsheet size={32} className="text-emerald-500" aria-hidden="true" />
                            </div>
                            <h3 className="mb-2 text-lg font-black text-white">ECR Data Ready for March 2024</h3>
                            <p className="mb-8 max-w-sm text-xs font-medium italic leading-relaxed text-slate-500">
                                The system has compiled the UAN, wages, and contribution data for 245 active employees based on
                                finalized payroll.
                            </p>
                            <Button
                                variant="primary"
                                size="lg"
                                icon={<Download size={18} aria-hidden="true" />}
                            >
                                Download ECR Text File
                            </Button>
                            <div className="mt-8 flex w-full max-w-sm items-center justify-between border-t border-[#1A2A3A] pt-6 text-[10px] font-black uppercase tracking-widest text-slate-500">
                                <span>Or upload modified TXT</span>
                                <Button variant="outline" size="sm">Browse</Button>
                            </div>
                        </div>
                    </Card>

                    {/* Pre-validation report */}
                    <Card padding="md">
                        <h3 className="mb-6 text-xs font-black uppercase tracking-widest text-white">Pre-Validation Report</h3>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="rounded-xl border border-[#1A2A3A] bg-[#060B14] p-4 text-center">
                                <div className="text-2xl font-black tabular-nums text-emerald-500">245</div>
                                <div className="mt-1 text-[9px] font-black uppercase tracking-widest text-slate-500">Valid Entries</div>
                            </div>
                            <div className="rounded-xl border border-rose-500/20 bg-[#060B14] p-4 text-center">
                                <div className="text-2xl font-black tabular-nums text-rose-500">02</div>
                                <div className="mt-1 text-[9px] font-black uppercase tracking-widest text-slate-500">UAN Mismatch</div>
                            </div>
                            <div className="rounded-xl border border-amber-500/20 bg-[#060B14] p-4 text-center">
                                <div className="text-2xl font-black tabular-nums text-amber-500">01</div>
                                <div className="mt-1 text-[9px] font-black uppercase tracking-widest text-slate-500">Wage Limit Flag</div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Fixes & guide */}
                <div className="space-y-6">
                    <Card padding="md" className="flex h-[400px] flex-col border-t-4 border-t-rose-500 border-rose-500/30">
                        <h3 className="mb-4 flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-rose-500">
                            <ShieldAlert size={14} aria-hidden="true" /> Critical Fixes Required
                        </h3>
                        <div className="flex-1 space-y-3 overflow-y-auto pr-2">
                            {ALERTS.map((alert) => (
                                <div key={alert.emp} className="rounded-xl border border-[#1A2A3A] bg-[#060B14] p-4 transition-colors hover:border-slate-700">
                                    <div className="mb-1 text-[10px] font-black uppercase tracking-widest text-slate-300">{alert.emp}</div>
                                    <div className="mb-1 text-xs font-bold text-rose-400">{alert.type}</div>
                                    <p className="text-[10px] font-medium italic leading-relaxed text-slate-500">{alert.msg}</p>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Card padding="md">
                        <h3 className="mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">EPFO Portal Flow</h3>
                        <ol role="list" className="relative space-y-4 before:absolute before:inset-0 before:ml-2 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[#1A2A3A] before:to-transparent">
                            {STEPS.map((s) => (
                                <li key={s.step} className="relative z-10 flex items-center gap-4">
                                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#1A2A3A] bg-[#060B14] text-[9px] font-black text-slate-400">
                                        {s.step}
                                    </div>
                                    <span className="text-[10px] font-medium leading-relaxed text-slate-300">{s.text}</span>
                                </li>
                            ))}
                        </ol>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
