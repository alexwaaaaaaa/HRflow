"use client";

import { Play, CheckCircle2, Calculator, Info, PieChart, Download } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// ─── Types & static data ──────────────────────────────────────────────────────

type RunState = "Ready" | "Processing" | "Pending Input";

interface EntityRun {
    name: string;
    eid: string;
    state: RunState;
    pct: number;
    emp: number;
    amt: number;
}

const ENTITIES: EntityRun[] = [
    { name: "Acme Technologies Pvt Ltd", eid: "ENT-001", state: "Ready", pct: 100, emp: 342, amt: 24500000 },
    { name: "Acme Retail Solutions", eid: "ENT-002", state: "Processing", pct: 45, emp: 128, amt: 8400000 },
    { name: "Acme Logistics India", eid: "ENT-003", state: "Pending Input", pct: 0, emp: 85, amt: 0 },
];

const STATE_BADGE: Record<RunState, "success" | "info" | "neutral"> = {
    Ready: "success",
    Processing: "info",
    "Pending Input": "neutral",
};

const STATE_BAR_CLS: Record<RunState, string> = {
    Ready: "bg-emerald-500",
    Processing: "bg-blue-500",
    "Pending Input": "bg-[#8899AA]",
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function StateIcon({ state }: { state: RunState }) {
    if (state === "Ready") return <CheckCircle2 size={18} className="text-emerald-500" aria-hidden="true" />;
    if (state === "Processing") return <Calculator size={18} className="animate-pulse text-blue-500" aria-hidden="true" />;
    return <Info size={18} className="text-[#8899AA]" aria-hidden="true" />;
}

function EntityRunCard({ entity }: { entity: EntityRun }) {
    const amtLabel =
        entity.amt > 0 ? `₹${(entity.amt / 100000).toFixed(2)}L` : "—";

    return (
        <div className="rounded-xl border border-[#2A3A4A] bg-[#0D1928] p-4">
            <div className="mb-3 flex items-start justify-between">
                <div>
                    <p className="flex items-center gap-3 font-bold text-white">
                        <StateIcon state={entity.state} />
                        {entity.name}
                    </p>
                    <p className="ml-7 mt-1 font-mono text-xs text-[#556677]">
                        {entity.eid} • {entity.emp} Employees
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#556677]">Est. Payout</p>
                    <p className="font-bold text-white">{amtLabel}</p>
                </div>
            </div>

            <div className="ml-7 flex items-center gap-4">
                <div
                    className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#1A2A3A]"
                    role="progressbar"
                    aria-valuenow={entity.pct}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${entity.name} payroll progress: ${entity.pct}%`}
                >
                    <div
                        className={`h-full transition-all ${STATE_BAR_CLS[entity.state]}`}
                        style={{ width: `${entity.pct}%` }}
                    />
                </div>
                <Badge variant={STATE_BADGE[entity.state]}>{entity.state}</Badge>
            </div>
        </div>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ConsolidatedPayrollPage() {
    return (
        <Page
            title="Consolidated Payroll Run"
            subtitle="Execute payroll simultaneously across all group entities for the month"
            breadcrumbs={[
                { label: "Multi-Entity", href: "/multi-entity/list" },
                { label: "Payroll" },
            ]}
            maxWidth="1200px"
            actions={
                <div className="flex items-center gap-3 rounded-xl border border-[#2A3A4A] bg-[#0D1928] px-4 py-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#8899AA]">Target Cycle</span>
                    <span className="rounded border border-[#2A3A4A] bg-[#1A2A3A] px-3 py-1 text-sm font-bold text-white">
                        March 2026
                    </span>
                </div>
            }
        >
            <div className="grid gap-6 md:grid-cols-3">
                {/* Run status */}
                <div className="space-y-6 md:col-span-2">
                    <Card padding="lg">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-white">Global Run Status</h2>
                            <Button icon={<Play size={12} className="fill-current" />}>
                                Run All Pending
                            </Button>
                        </div>

                        <div className="space-y-4">
                            {ENTITIES.map((entity) => (
                                <EntityRunCard key={entity.eid} entity={entity} />
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Liability sidebar */}
                <div className="space-y-6">
                    <Card padding="lg">
                        <h2 className="mb-4 flex items-center gap-2 border-b border-[#1A2A3A] pb-3 text-sm font-bold text-white">
                            <PieChart size={16} className="text-[#556677]" aria-hidden="true" />
                            Liability Overview
                        </h2>

                        <div className="space-y-6 pt-2 text-center">
                            <div>
                                <p className="mb-1 text-xs font-bold uppercase tracking-wider text-[#8899AA]">
                                    Total Processed Gross
                                </p>
                                <p className="text-3xl font-black text-white">₹3.29 Cr</p>
                                <p className="mt-1 text-[10px] text-[#556677]">From 2 of 3 entities</p>
                            </div>

                            <div className="flex gap-4 rounded-xl border border-[#2A3A4A] bg-[#0D1928] p-4">
                                <div className="flex-1 border-r border-[#2A3A4A]">
                                    <p className="mb-1 text-[10px] uppercase text-[#8899AA]">Net Pay</p>
                                    <p className="font-bold text-emerald-400">₹2.81 Cr</p>
                                </div>
                                <div className="flex-1">
                                    <p className="mb-1 text-[10px] uppercase text-[#8899AA]">Taxes (TDS)</p>
                                    <p className="font-bold text-red-400">₹0.48 Cr</p>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Button
                        variant="secondary"
                        icon={<Download size={16} className="text-purple-400" />}
                        className="w-full justify-center"
                    >
                        Download Consolidated Bank File
                    </Button>
                </div>
            </div>
        </Page>
    );
}
