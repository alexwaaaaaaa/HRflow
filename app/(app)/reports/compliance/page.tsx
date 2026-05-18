"use client";

import { Download, CheckCircle2, AlertTriangle } from "lucide-react";

import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

// ─── Static data ──────────────────────────────────────────────────────────────

type FilingStatus = "Completed" | "Due Soon" | "Partial" | "N/A";

const STATUS_VARIANT: Record<FilingStatus, "success" | "warning" | "warning" | "neutral"> = {
    Completed: "success",
    "Due Soon": "warning",
    Partial: "warning",
    "N/A": "neutral",
};

interface FilingRow {
    id: string;
    act: string;
    subtitle: string;
    applicability: string;
    dueDate: string;
    status: FilingStatus;
    statusLabel: string;
    challan: string;
}

const FILINGS: FilingRow[] = [
    {
        id: "epf",
        act: "EPF (Provident Fund)",
        subtitle: "Monthly ECR & Payment",
        applicability: "Pan India",
        dueDate: "15 Apr 2026",
        status: "Completed",
        statusLabel: "Completed On Time",
        challan: "TRRN-99827110",
    },
    {
        id: "esic",
        act: "ESIC",
        subtitle: "Monthly Contribution",
        applicability: "Pan India",
        dueDate: "15 Apr 2026",
        status: "Completed",
        statusLabel: "Completed On Time",
        challan: "ESI-CH-122904",
    },
    {
        id: "tds",
        act: "TDS (Tax Deducted at Source)",
        subtitle: "Section 192 (Salary)",
        applicability: "Pan India",
        dueDate: "07 Apr 2026",
        status: "Due Soon",
        statusLabel: "Due Soon",
        challan: "—",
    },
    {
        id: "pt",
        act: "Professional Tax (PT)",
        subtitle: "Monthly Return & Payment",
        applicability: "Maharashtra, Karnataka",
        dueDate: "Various (Apr 2026)",
        status: "Partial",
        statusLabel: "Partially Paid (KA Pending)",
        challan: "MH-PT-8812A",
    },
    {
        id: "lwf",
        act: "Labour Welfare Fund (LWF)",
        subtitle: "Half-yearly Contribution",
        applicability: "Maharashtra (June/Dec)",
        dueDate: "N/A for March",
        status: "N/A",
        statusLabel: "Not Applicable this month",
        challan: "—",
    },
];

const FILING_COLUMNS: Column<FilingRow>[] = [
    {
        key: "act",
        label: "Act / Compliance",
        render: (r) => (
            <div>
                <p className="font-bold text-white">{r.act}</p>
                <p className="text-xs text-[#8899AA]">{r.subtitle}</p>
            </div>
        ),
        sortable: true,
        sortValue: (r) => r.act,
    },
    {
        key: "applicability",
        label: "Applicability",
        render: (r) => <span className="text-[#8899AA]">{r.applicability}</span>,
        hideOnMobile: true,
    },
    {
        key: "dueDate",
        label: "Due Date",
        render: (r) => <span className="text-white">{r.dueDate}</span>,
    },
    {
        key: "status",
        label: "Filing Status",
        render: (r) => (
            <span className="inline-flex items-center gap-1.5">
                {r.status === "Completed" ? (
                    <CheckCircle2 size={12} className="text-emerald-400" aria-hidden="true" />
                ) : r.status === "Due Soon" || r.status === "Partial" ? (
                    <AlertTriangle size={12} className="text-amber-500" aria-hidden="true" />
                ) : null}
                <Badge variant={STATUS_VARIANT[r.status]}>{r.statusLabel}</Badge>
            </span>
        ),
    },
    {
        key: "challan",
        label: "Challan / Ref No.",
        render: (r) => <span className="font-mono text-xs text-[#8899AA]">{r.challan}</span>,
        hideOnMobile: true,
    },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ComplianceStatusReportPage() {
    return (
        <Page
            title="Compliance Status Report"
            subtitle="Real-time tracker for statutory filings, challans, and labor law health."
            breadcrumbs={[
                { label: "Reports", href: "/reports/dashboard" },
                { label: "Compliance Status" },
            ]}
            maxWidth="1280px"
            actions={
                <Button icon={<Download size={14} aria-hidden="true" />}>Download Certificate</Button>
            }
        >
            <div className="space-y-6">
                {/* KPI strip */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card padding="lg" className="border-emerald-500/30 relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-emerald-500 text-[#0B1221] text-[10px] font-bold px-3 py-1 rounded-bl-lg">
                            Excellent
                        </div>
                        <p className="text-[#8899AA] text-sm font-medium mb-2">Organization Risk Score</p>
                        <p className="text-4xl font-black text-emerald-400 mb-1">
                            96<span className="text-lg text-[#8899AA] font-medium">/100</span>
                        </p>
                        <p className="text-xs text-[#8899AA] mt-2">All major central filings are up to date.</p>
                    </Card>
                    <Card padding="lg">
                        <p className="text-[#8899AA] text-sm font-medium mb-2">Pending Due Dates (Next 7 Days)</p>
                        <p className="text-4xl font-black text-amber-500 mb-1">2</p>
                        <p className="text-xs text-[#8899AA] mt-2">TDS Payment, PT (Maharashtra)</p>
                    </Card>
                    <Card padding="lg">
                        <p className="text-[#8899AA] text-sm font-medium mb-2">Overdue Notices</p>
                        <p className="text-4xl font-black text-white mb-1">0</p>
                        <p className="text-xs text-emerald-400 mt-2 flex items-center gap-1">
                            <CheckCircle2 size={12} aria-hidden="true" /> No pending department notices
                        </p>
                    </Card>
                </div>

                {/* Filings table */}
                <Card padding="none">
                    <div className="p-4 border-b border-[#1A2A3A] flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                        <h2 className="text-sm font-bold text-white">
                            Statutory Filings Ledger (March 2026)
                        </h2>
                    </div>
                    <DataTable<FilingRow>
                        data={FILINGS}
                        columns={FILING_COLUMNS}
                        rowKey={(r) => r.id}
                        searchable
                        searchPlaceholder="Search acts, regions…"
                        emptyTitle="No filings found"
                        aria-label="Statutory filings ledger"
                    />
                </Card>
            </div>
        </Page>
    );
}
