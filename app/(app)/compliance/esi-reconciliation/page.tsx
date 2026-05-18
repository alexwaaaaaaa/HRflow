"use client";

import {
    CheckCircle,
    AlertTriangle,
    FileSpreadsheet,
    RotateCcw,
} from "lucide-react";

import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge, type BadgeVariant } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

// ─── Static palette ───────────────────────────────────────────────────────────
type ReconcileStatus = "Matched" | "Wage Mismatch" | "Mid-Cycle Exemption";

const STATUS_BADGE: Record<ReconcileStatus, BadgeVariant> = {
    Matched: "success",
    "Wage Mismatch": "danger",
    "Mid-Cycle Exemption": "warning",
};

// ─── Data ─────────────────────────────────────────────────────────────────────
interface ReconcileRow {
    id: string;
    ip: string;
    name: string;
    month: string;
    hr: string;
    esi: string;
    diff: string;
    status: ReconcileStatus;
}

const ROWS: ReconcileRow[] = [
    { id: "r1", ip: "6700142388", name: "Alok Nath", month: "Mar 2024", hr: "18500", esi: "16000", diff: "+2500", status: "Wage Mismatch" },
    { id: "r2", ip: "6700142389", name: "Reena Roy", month: "Mar 2024", hr: "22000", esi: "0", diff: "+22000", status: "Mid-Cycle Exemption" },
    { id: "r3", ip: "6700142390", name: "Jatin Das", month: "Feb 2024", hr: "15000", esi: "17000", diff: "-2000", status: "Wage Mismatch" },
    { id: "r4", ip: "6700142391", name: "Priya Sen", month: "Jan 2024", hr: "16500", esi: "16500", diff: "0", status: "Matched" },
];

const COLUMNS: Column<ReconcileRow>[] = [
    {
        key: "employee",
        label: "Employee / IP No",
        render: (r) => (
            <div>
                <div className="text-xs font-black text-white">{r.name}</div>
                <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-500">IP: {r.ip}</div>
            </div>
        ),
        sortable: true,
        sortValue: (r) => r.name,
    },
    {
        key: "month",
        label: "Month",
        render: (r) => <span className="text-xs font-bold text-slate-400">{r.month}</span>,
    },
    {
        key: "hr",
        label: "Payroll Gross (₹)",
        align: "right",
        render: (r) => <span className="text-xs font-bold tabular-nums text-slate-300">{r.hr}</span>,
    },
    {
        key: "esi",
        label: "ESIC Reported (₹)",
        align: "right",
        render: (r) => <span className="text-xs font-bold tabular-nums text-slate-300">{r.esi}</span>,
    },
    {
        key: "diff",
        label: "Variance (₹)",
        align: "right",
        render: (r) => (
            <span className={`text-xs font-black tabular-nums ${r.diff === "0" ? "text-slate-600" : "text-rose-500"}`}>
                {r.diff}
            </span>
        ),
    },
    {
        key: "status",
        label: "Issue Type",
        render: (r) => (
            <Badge variant={STATUS_BADGE[r.status]}>
                {r.status === "Matched" ? <CheckCircle size={10} aria-hidden="true" /> : <AlertTriangle size={10} aria-hidden="true" />}
                {r.status}
            </Badge>
        ),
    },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ESIReconciliation() {
    return (
        <Page
            title="ESIC Reconciliation"
            subtitle="Reconcile ESIC gross wages vs payroll earned wages to prevent Inspector notices."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Compliance", href: "/compliance/dashboard" },
                { label: "ESI Reconciliation" },
            ]}
            maxWidth="1280px"
            actions={
                <>
                    <Button variant="outline" size="sm">FY 2023-24</Button>
                    <Button
                        variant="primary"
                        icon={<RotateCcw size={16} aria-hidden="true" />}
                    >
                        Run Auto-Match
                    </Button>
                </>
            }
        >
            <div className="space-y-6">
                {/* KPI strip */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <Card padding="md" className="border-emerald-500/20">
                        <h3 className="mb-2 text-[10px] font-black uppercase tracking-widest text-slate-500">Perfect Matches</h3>
                        <div className="text-3xl font-black tabular-nums text-emerald-500">1,620</div>
                        <div className="mt-2 text-[10px] font-bold italic text-slate-400">Wage components match between systems</div>
                    </Card>
                    <Card padding="md" className="border-rose-500/30">
                        <h3 className="mb-2 text-[10px] font-black uppercase tracking-widest text-slate-500">Wage Variances</h3>
                        <div className="text-3xl font-black tabular-nums text-rose-500">14</div>
                        <div className="mt-2 text-[10px] font-bold italic text-rose-400">ESIC gross differs from Payroll gross</div>
                    </Card>
                    <Card padding="md" className="border-amber-500/20">
                        <h3 className="mb-2 text-[10px] font-black uppercase tracking-widest text-slate-500">Mid-Cycle Exemptions</h3>
                        <div className="text-3xl font-black tabular-nums text-amber-500">08</div>
                        <div className="mt-2 text-[10px] font-bold italic text-slate-400">Crossed ₹21k limit mid-contribution period</div>
                    </Card>
                </div>

                {/* Data grid */}
                <Card padding="none">
                    <div className="flex items-center justify-between border-b border-[#1A2A3A] bg-[#060B14]/50 p-4">
                        <div className="flex gap-4">
                            <Button variant="secondary" size="sm">Show Variances Only (22)</Button>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            icon={<FileSpreadsheet size={14} aria-hidden="true" />}
                            aria-label="Export to spreadsheet"
                        />
                    </div>
                    <div className="p-4">
                        <DataTable<ReconcileRow>
                            data={ROWS}
                            columns={COLUMNS}
                            rowKey={(r) => r.id}
                            searchable
                            searchPlaceholder="Search IP Number..."
                            aria-label="ESI reconciliation records"
                            emptyTitle="No reconciliation records"
                        />
                    </div>
                </Card>
            </div>
        </Page>
    );
}
