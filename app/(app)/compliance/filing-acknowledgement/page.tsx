"use client";

import {
    Download,
    Filter,
    FileCheck,
    ExternalLink,
    Calendar,
} from "lucide-react";

import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import DataTable, { type Column } from "@/components/ui/DataTable";

// ─── Static palette ───────────────────────────────────────────────────────────
type FilingCategory = "EPFO" | "ESIC" | "Tax";

const CATEGORY_BG: Record<FilingCategory, string> = {
    EPFO: "bg-blue-500/10 text-blue-500",
    ESIC: "bg-orange-500/10 text-orange-500",
    Tax: "bg-rose-500/10 text-rose-500",
};

// ─── Data ─────────────────────────────────────────────────────────────────────
interface FilingRow {
    id: string;
    category: FilingCategory;
    type: string;
    portal: string;
    period: string;
    ackNo: string;
    filingDate: string;
    hasExternal?: boolean;
}

const FILINGS: FilingRow[] = [
    { id: "f1", category: "EPFO", type: "EPF Monthly Return (ECR)", portal: "EPFO Portal", period: "Feb 2024", ackNo: "1052403014992", filingDate: "12 Mar 2024" },
    { id: "f2", category: "ESIC", type: "ESIC Contribution", portal: "ESIC Portal", period: "Feb 2024", ackNo: "20001882910001001", filingDate: "15 Mar 2024" },
    { id: "f3", category: "Tax", type: "TDS Details (Form 24Q)", portal: "Income Tax Dept", period: "Q3 FY 23-24", ackNo: "AA12993881Z", filingDate: "31 Jan 2024", hasExternal: true },
];

const COLUMNS: Column<FilingRow>[] = [
    {
        key: "type",
        label: "Filing Type / Category",
        render: (r) => (
            <div className="flex items-center gap-3">
                <div className={`rounded-lg p-2 ${CATEGORY_BG[r.category]}`}>
                    <FileCheck size={16} aria-hidden="true" />
                </div>
                <div>
                    <div className="text-sm font-bold text-white">{r.type}</div>
                    <div className="mt-0.5 text-[10px] text-slate-500">{r.portal}</div>
                </div>
            </div>
        ),
        sortable: true,
        sortValue: (r) => r.type,
    },
    {
        key: "period",
        label: "Period",
        render: (r) => (
            <span className="text-slate-400">
                <Calendar size={12} className="mr-1 mb-0.5 inline text-slate-500" aria-hidden="true" />
                {r.period}
            </span>
        ),
    },
    {
        key: "ackNo",
        label: "TRRN / Ack Number",
        render: (r) => <span className="font-mono text-sm text-white">{r.ackNo}</span>,
    },
    {
        key: "filingDate",
        label: "Filing Date",
        render: (r) => <span className="text-sm text-slate-300">{r.filingDate}</span>,
    },
    {
        key: "receipt",
        label: "Receipt",
        align: "right",
        render: (r) => (
            <div className="inline-flex items-center gap-1">
                {r.hasExternal && (
                    <Button
                        variant="ghost"
                        size="sm"
                        aria-label="View on TRACES"
                        icon={<ExternalLink size={16} aria-hidden="true" />}
                    />
                )}
                <Button
                    variant="ghost"
                    size="sm"
                    aria-label="Download receipt"
                    icon={<Download size={16} aria-hidden="true" />}
                />
            </div>
        ),
    },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function FilingAcknowledgement() {
    return (
        <Page
            title="Filing Acknowledgements"
            subtitle="Central repository for all statutory return receipts, TRRNs, and challans."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Compliance", href: "/compliance/dashboard" },
                { label: "Filing Acknowledgements" },
            ]}
            maxWidth="1280px"
        >
            <Card padding="none">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1A2A3A] bg-[#060B14]/50 p-4">
                    <div className="flex gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                        <Button variant="secondary" size="sm">All Forms</Button>
                        <Button variant="ghost" size="sm">EPFO (PF)</Button>
                        <Button variant="ghost" size="sm">ESIC</Button>
                        <Button variant="ghost" size="sm">Tax (TDS/PT)</Button>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        icon={<Filter size={14} aria-hidden="true" />}
                    >
                        Filter
                    </Button>
                </div>
                <div className="p-4">
                    <DataTable<FilingRow>
                        data={FILINGS}
                        columns={COLUMNS}
                        rowKey={(r) => r.id}
                        searchable
                        searchPlaceholder="Search TRRN or Ack No..."
                        aria-label="Filing acknowledgements"
                        emptyTitle="No filings found"
                    />
                </div>
            </Card>
        </Page>
    );
}
