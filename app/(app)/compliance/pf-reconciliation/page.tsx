"use client";

import {
    CheckCircle,
    AlertTriangle,
    Filter,
    FileSpreadsheet,
    SearchSlash,
    RotateCcw,
} from "lucide-react";

import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge, type BadgeVariant } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

// ─── Static palette ───────────────────────────────────────────────────────────
type ReconcileStatus = "Matched" | "Mismatch" | "Missing in EPFO";

const STATUS_BADGE: Record<ReconcileStatus, BadgeVariant> = {
    Matched: "success",
    Mismatch: "danger",
    "Missing in EPFO": "warning",
};

// ─── Data ─────────────────────────────────────────────────────────────────────
interface ReconcileRow {
    id: string;
    uan: string;
    name: string;
    month: string;
    hr: string;
    epf: string;
    diff: string;
    status: ReconcileStatus;
}

const ROWS: ReconcileRow[] = [
    { id: "r1", uan: "100456789012", name: "Arnab Das", month: "Mar 2024", hr: "3600", epf: "1800", diff: "+1800", status: "Mismatch" },
    { id: "r2", uan: "100456789013", name: "Rahul Nair", month: "Mar 2024", hr: "1800", epf: "1800", diff: "0", status: "Matched" },
    { id: "r3", uan: "100456789014", name: "Sonia Gill", month: "Feb 2024", hr: "3600", epf: "0", diff: "+3600", status: "Missing in EPFO" },
    { id: "r4", uan: "100456789015", name: "Priya Iyer", month: "Feb 2024", hr: "1800", epf: "2400", diff: "-600", status: "Mismatch" },
    { id: "r5", uan: "100456789016", name: "Anil Gupta", month: "Jan 2024", hr: "1800", epf: "1800", diff: "0", status: "Matched" },
];

const COLUMNS: Column<ReconcileRow>[] = [
    {
        key: "employee",
        label: "UAN / Employee",
        render: (r) => (
            <div>
                <div className="text-xs font-black text-white">{r.name}</div>
                <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-500">{r.uan}</div>
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
        label: "HRFlow Payroll (₹)",
        align: "right",
        render: (r) => <span className="text-xs font-bold tabular-nums text-slate-300">{r.hr}</span>,
    },
    {
        key: "epf",
        label: "EPFO Portal (₹)",
        align: "right",
        render: (r) => <span className="text-xs font-bold tabular-nums text-slate-300">{r.epf}</span>,
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
        label: "Status",
        render: (r) => (
            <Badge variant={STATUS_BADGE[r.status]}>
                {r.status === "Matched" ? <CheckCircle size={10} aria-hidden="true" /> :
                    r.status === "Missing in EPFO" ? <SearchSlash size={10} aria-hidden="true" /> :
                        <AlertTriangle size={10} aria-hidden="true" />}
                {r.status}
            </Badge>
        ),
    },
    {
        key: "action",
        label: "Action",
        align: "center",
        render: (r) => (
            r.diff !== "0" ? (
                <Button variant="ghost" size="sm">Resolve</Button>
            ) : (
                <span className="text-slate-600">-</span>
            )
        ),
    },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function PFReconciliation() {
    return (
        <Page
            title="PF Reconciliation"
            subtitle="Match HRFlow payroll data against EPFO portal records."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Compliance", href: "/compliance/dashboard" },
                { label: "PF Reconciliation" },
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
                    <Card padding="md" className="relative overflow-hidden border-emerald-500/20">
                        <h3 className="mb-2 text-[10px] font-black uppercase tracking-widest text-slate-500">Perfect Matches</h3>
                        <div className="text-3xl font-black tabular-nums text-emerald-500">2,410</div>
                        <div className="mt-2 text-[10px] font-bold italic text-slate-400">Records exactly matched by UAN & Amount</div>
                    </Card>
                    <Card padding="md" className="relative overflow-hidden border-rose-500/30">
                        <h3 className="mb-2 text-[10px] font-black uppercase tracking-widest text-slate-500">Variances Detected</h3>
                        <div className="text-3xl font-black tabular-nums text-rose-500">18</div>
                        <div className="mt-2 text-[10px] font-bold italic text-rose-400">Requires manual investigation</div>
                    </Card>
                    <Card padding="md" className="relative overflow-hidden border-amber-500/20">
                        <h3 className="mb-2 text-[10px] font-black uppercase tracking-widest text-slate-500">Missing from Portal</h3>
                        <div className="text-3xl font-black tabular-nums text-amber-500">05</div>
                        <div className="mt-2 text-[10px] font-bold italic text-slate-400">Present in Payroll, missing in EPFO TRRN</div>
                    </Card>
                </div>

                {/* Data grid */}
                <Card padding="none">
                    <div className="flex items-center justify-between border-b border-[#1A2A3A] bg-[#060B14]/50 p-4">
                        <div className="flex gap-4">
                            <Button variant="secondary" size="sm">Show Variances Only (18)</Button>
                            <Button variant="ghost" size="sm">Show All Records</Button>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                aria-label="Filter records"
                                icon={<Filter size={14} aria-hidden="true" />}
                            />
                            <Button
                                variant="ghost"
                                size="sm"
                                aria-label="Export to spreadsheet"
                                icon={<FileSpreadsheet size={14} aria-hidden="true" />}
                            />
                        </div>
                    </div>
                    <div className="p-4">
                        <DataTable<ReconcileRow>
                            data={ROWS}
                            columns={COLUMNS}
                            rowKey={(r) => r.id}
                            searchable
                            searchPlaceholder="Search UAN..."
                            aria-label="PF reconciliation records"
                            emptyTitle="No reconciliation records"
                        />
                    </div>
                    <div className="border-t border-[#1A2A3A] bg-[#060B14]/50 p-4 text-center text-[10px] font-bold italic uppercase tracking-widest text-slate-500">
                        Showing 1-5 of 23 records flagged for review
                    </div>
                </Card>
            </div>
        </Page>
    );
}
