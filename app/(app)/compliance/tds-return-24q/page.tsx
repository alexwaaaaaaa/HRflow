"use client";

import { useState } from "react";
import {
    FileSpreadsheet,
    Download,
    CheckCircle,
    AlertTriangle,
    Info,
    ArrowRight,
    RefreshCw,
    Upload,
    Eye,
    Shield,
} from "lucide-react";

import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge, type BadgeVariant } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

// ─── Static palette ───────────────────────────────────────────────────────────
type DeducteeStatus = "OK" | "PAN Error";

const STATUS_BADGE: Record<DeducteeStatus, BadgeVariant> = {
    OK: "success",
    "PAN Error": "danger",
};

// ─── Data ─────────────────────────────────────────────────────────────────────
interface Deductee {
    id: string;
    name: string;
    pan: string;
    section: string;
    taxDeducted: string;
    taxPaid: string;
    status: DeducteeStatus;
}

const DEDUCTEES: Deductee[] = [
    { id: "d1", name: "Rahul Kumar Sharma", pan: "AAXPS1234C", section: "192", taxDeducted: "1,08,000", taxPaid: "1,08,000", status: "OK" },
    { id: "d2", name: "Priya Mehta", pan: "BXZPM5678F", section: "192", taxDeducted: "78,000", taxPaid: "78,000", status: "OK" },
    { id: "d3", name: "Arjun Nair", pan: "CPMNA9012G", section: "192", taxDeducted: "1,44,000", taxPaid: "1,44,000", status: "OK" },
    { id: "d4", name: "Sunita Patel", pan: "INVALID", section: "192", taxDeducted: "36,000", taxPaid: "36,000", status: "PAN Error" },
    { id: "d5", name: "Vijay Reddy", pan: "EPXVR3456H", section: "192A", taxDeducted: "12,500", taxPaid: "12,500", status: "OK" },
];

const QUARTERS = ["Q1 (Apr–Jun 23)", "Q2 (Jul–Sep 23)", "Q3 (Oct–Dec 23)", "Q4 (Jan–Mar 24)"];

const COLUMNS: Column<Deductee>[] = [
    {
        key: "employee",
        label: "Employee / PAN",
        render: (r) => (
            <div>
                <div className="text-xs font-bold text-white">{r.name}</div>
                <div className={`font-mono text-[10px] ${r.status !== "OK" ? "text-rose-400" : "text-slate-500"}`}>{r.pan}</div>
            </div>
        ),
        sortable: true,
        sortValue: (r) => r.name,
    },
    {
        key: "section",
        label: "Section",
        render: (r) => <span className="text-xs font-bold text-slate-400">{r.section}</span>,
    },
    {
        key: "taxDeducted",
        label: "Tax Deducted (₹)",
        align: "right",
        render: (r) => <span className="text-xs font-bold tabular-nums text-slate-300">{r.taxDeducted}</span>,
    },
    {
        key: "taxPaid",
        label: "Tax Paid (₹)",
        align: "right",
        render: (r) => <span className="text-xs font-bold tabular-nums text-slate-300">{r.taxPaid}</span>,
    },
    {
        key: "status",
        label: "Status",
        render: (r) => (
            <Badge variant={STATUS_BADGE[r.status]}>
                {r.status === "OK" ? <CheckCircle size={8} aria-hidden="true" /> : <AlertTriangle size={8} aria-hidden="true" />}
                {r.status}
            </Badge>
        ),
    },
];

type Step = "review" | "validate" | "generate";

const STEPS: { id: Step; label: string; icon: typeof Eye }[] = [
    { id: "review", label: "1. Review Deductees", icon: Eye },
    { id: "validate", label: "2. CSI Validation", icon: Shield },
    { id: "generate", label: "3. Generate FVU", icon: FileSpreadsheet },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function TDSReturn24Q() {
    const [quarter, setQuarter] = useState(3);
    const [step, setStep] = useState<Step>("review");

    return (
        <Page
            title="Form 24Q — Salary TDS Return"
            subtitle="Quarterly e-TDS statement for salary deductions. Generates NSDL FVU-compatible file."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Compliance", href: "/compliance/dashboard" },
                { label: "TDS Return 24Q" },
            ]}
            maxWidth="1280px"
            actions={
                <Button
                    variant="primary"
                    icon={<Download size={16} aria-hidden="true" />}
                >
                    Download FVU File
                </Button>
            }
        >
            <div className="space-y-6">
                {/* Quarter selector */}
                <div className="flex gap-3 overflow-x-auto pb-1">
                    {QUARTERS.map((q, i) => (
                        <Button
                            key={q}
                            variant={quarter === i ? "primary" : "outline"}
                            size="sm"
                            onClick={() => setQuarter(i)}
                        >
                            {q}
                        </Button>
                    ))}
                </div>

                {/* Progress steps */}
                <div className="flex items-center gap-4">
                    {STEPS.map((s, i) => {
                        const Icon = s.icon;
                        return (
                            <div key={s.id} className="flex items-center gap-4">
                                <Button
                                    variant={step === s.id ? "primary" : "outline"}
                                    size="sm"
                                    icon={<Icon size={14} aria-hidden="true" />}
                                    onClick={() => setStep(s.id)}
                                    aria-current={step === s.id ? "step" : undefined}
                                >
                                    {s.label}
                                </Button>
                                {i < STEPS.length - 1 && (
                                    <ArrowRight size={14} className="shrink-0 text-slate-600" aria-hidden="true" />
                                )}
                            </div>
                        );
                    })}
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Main content */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* KPI row */}
                        <div className="grid grid-cols-3 gap-4">
                            {[
                                { label: "Total Employees", val: "42", variant: "info" as BadgeVariant },
                                { label: "Total Tax Deducted", val: "₹43.5L", variant: "success" as BadgeVariant },
                                { label: "PAN Errors", val: "1", variant: "danger" as BadgeVariant },
                            ].map((k) => (
                                <Card key={k.label} padding="md" className="text-center">
                                    <div className="text-2xl font-black tabular-nums text-white">{k.val}</div>
                                    <div className="mt-1 text-[9px] font-black uppercase tracking-widest text-slate-500">{k.label}</div>
                                </Card>
                            ))}
                        </div>

                        {/* Deductee table */}
                        <Card padding="none">
                            <div className="flex items-center justify-between border-b border-[#1A2A3A] bg-[#060B14]/60 p-4">
                                <h2 className="text-xs font-black uppercase tracking-widest text-white">
                                    Deductee List — {QUARTERS[quarter]}
                                </h2>
                                <span className="text-[10px] font-bold text-slate-500">Showing 1–5 of 42</span>
                            </div>
                            <div className="p-4">
                                <DataTable<Deductee>
                                    data={DEDUCTEES}
                                    columns={COLUMNS}
                                    rowKey={(r) => r.id}
                                    aria-label="TDS 24Q deductee list"
                                    emptyTitle="No deductees found"
                                />
                            </div>
                        </Card>
                    </div>

                    {/* Right panel */}
                    <div className="space-y-6">
                        {/* Filing status */}
                        <Card padding="md">
                            <h3 className="mb-4 border-b border-[#1A2A3A] pb-3 text-[10px] font-black uppercase tracking-[0.2em] text-white">
                                Filing Status by Quarter
                            </h3>
                            <div className="space-y-3">
                                {["Q1", "Q2", "Q3", "Q4"].map((q, i) => (
                                    <div key={q} className="flex items-center justify-between">
                                        <span className="text-xs font-bold text-slate-400">{q} FY 2023-24</span>
                                        <Badge variant={i < 3 ? "success" : "warning"}>
                                            {i < 3 ? "Filed" : "Due: 31 May"}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* CSI validation */}
                        <Card padding="md" className="border-indigo-500/20">
                            <h3 className="mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">CSI Validation</h3>
                            <div className="space-y-3">
                                {[
                                    { label: "Challan Matched", val: "✓ 3/3", ok: true },
                                    { label: "BSR Codes", val: "✓ Valid", ok: true },
                                    { label: "PAN Validation", val: "✗ 1 Error", ok: false },
                                ].map((r) => (
                                    <div key={r.label} className="flex items-center justify-between text-xs">
                                        <span className="text-slate-500">{r.label}</span>
                                        <span className={`font-black ${r.ok ? "text-emerald-500" : "text-rose-500"}`}>{r.val}</span>
                                    </div>
                                ))}
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="mt-4 w-full"
                                icon={<RefreshCw size={12} aria-hidden="true" />}
                            >
                                Re-run Validation
                            </Button>
                        </Card>

                        {/* Upload */}
                        <Card padding="md">
                            <h3 className="mb-3 text-[10px] font-black uppercase tracking-[0.2em] text-white">Upload to TRACES</h3>
                            <p className="mb-4 text-[10px] leading-relaxed text-slate-500">Submit FVU file on TDS-CPC portal after generation.</p>
                            <Button
                                variant="outline"
                                size="sm"
                                className="w-full"
                                icon={<Upload size={13} aria-hidden="true" />}
                            >
                                Go to TDS-CPC Portal
                            </Button>
                        </Card>

                        <div className="flex gap-3 rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-4">
                            <Info size={16} className="mt-0.5 shrink-0 text-indigo-400" aria-hidden="true" />
                            <p className="text-[10px] leading-relaxed text-slate-400">
                                Form 24Q Q4 includes Annexure II (salary details for Form 16 issuance). Due: 31st May after FY end.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Page>
    );
}
