"use client";

import { useState } from "react";
import { Download, Filter, Briefcase, IndianRupee, PieChart, Layers } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

// ─── Types & static data ──────────────────────────────────────────────────────

type ReportType = "headcount" | "cost" | "attrition";

interface ReportRow {
    id: string;
    entity: string;
    hc: number;
    mom: string;
    pct: string;
    dept: string;
}

const REPORT_DATA: ReportRow[] = [
    { id: "ENT-001", entity: "Acme Technologies (Parent)", hc: 342, mom: "+12", pct: "60.3%", dept: "Engineering" },
    { id: "ENT-002", entity: "Acme Retail Solutions", hc: 128, mom: "-2", pct: "22.6%", dept: "Sales" },
    { id: "ENT-003", entity: "Acme Logistics India", hc: 85, mom: "+5", pct: "15.0%", dept: "Operations" },
    { id: "ENT-004", entity: "Acme Global Ventures", hc: 12, mom: "0", pct: "2.1%", dept: "Leadership" },
];

function momVariant(mom: string): "success" | "danger" | "neutral" {
    if (mom.startsWith("+")) return "success";
    if (mom.startsWith("-")) return "danger";
    return "neutral";
}

const REPORT_TABS: { id: ReportType; label: string; icon: React.ElementType }[] = [
    { id: "headcount", label: "Headcount Distribution", icon: Briefcase },
    { id: "cost", label: "Payroll Cost", icon: IndianRupee },
    { id: "attrition", label: "Attrition Rate", icon: PieChart },
];

// ─── Columns ──────────────────────────────────────────────────────────────────

const COLUMNS: Column<ReportRow>[] = [
    {
        key: "entity",
        label: "Entity Name",
        render: (r) => <span className="font-bold text-white">{r.entity}</span>,
        sortable: true,
        sortValue: (r) => r.entity,
    },
    {
        key: "hc",
        label: "Active HC",
        align: "right",
        render: (r) => <span className="font-medium text-white">{r.hc}</span>,
        sortable: true,
        sortValue: (r) => r.hc,
    },
    {
        key: "mom",
        label: "M-o-M Change",
        align: "right",
        render: (r) => <Badge variant={momVariant(r.mom)}>{r.mom}</Badge>,
    },
    {
        key: "pct",
        label: "% of Group",
        align: "right",
        render: (r) => (
            <div className="flex items-center justify-end gap-2">
                <span className="text-[#AABBCC]">{r.pct}</span>
                <div
                    className="h-1.5 w-16 overflow-hidden rounded-full bg-[#1A2A3A]"
                    role="progressbar"
                    aria-valuenow={parseFloat(r.pct)}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${r.entity}: ${r.pct} of group`}
                >
                    <div className="h-full bg-[#4f46e5]" style={{ width: r.pct }} />
                </div>
            </div>
        ),
    },
    {
        key: "dept",
        label: "Top Department",
        render: (r) => <span className="text-[#8899AA]">{r.dept}</span>,
    },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ConsolidatedReportsPage() {
    const [reportType, setReportType] = useState<ReportType>("headcount");

    return (
        <Page
            title="Group Consolidated Reports"
            subtitle="Generate multi-entity analytics for Headcount, Payroll Cost, and Attrition"
            breadcrumbs={[
                { label: "Multi-Entity", href: "/multi-entity/list" },
                { label: "Reports" },
            ]}
            maxWidth="1400px"
            actions={
                <>
                    <Button variant="secondary" icon={<Filter size={14} />}>
                        Filters
                    </Button>
                    <Button icon={<Download size={14} />}>Export Excel</Button>
                </>
            }
        >
            {/* Report type tabs */}
            <div
                className="flex gap-1 rounded-xl border border-[#1A2A3A] bg-[#060D1A] p-1"
                role="tablist"
                aria-label="Report type"
            >
                {REPORT_TABS.map((tab) => {
                    const Icon = tab.icon;
                    const active = reportType === tab.id;
                    return (
                        <button
                            key={tab.id}
                            role="tab"
                            aria-selected={active}
                            onClick={() => setReportType(tab.id)}
                            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition-colors ${
                                active
                                    ? "border border-[#2A3A4A] bg-[#0D1928] text-white shadow-sm"
                                    : "text-[#8899AA] hover:text-white"
                            }`}
                        >
                            <Icon
                                size={16}
                                aria-hidden="true"
                                className={active ? "text-[#818cf8]" : ""}
                            />
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* Data table */}
            <Card padding="none">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1A2A3A] bg-[#060D1A] px-4 py-3">
                    <h2 className="flex items-center gap-2 text-sm font-bold text-white">
                        <Layers size={18} className="text-[#818cf8]" aria-hidden="true" />
                        By Entity Breakdown
                        <span className="text-xs font-normal text-[#556677]">As of Oct 2025</span>
                    </h2>
                </div>

                <div className="p-4">
                    <DataTable<ReportRow>
                        data={REPORT_DATA}
                        columns={COLUMNS}
                        rowKey={(r) => r.id}
                        searchable
                        searchPlaceholder="Search entity…"
                        aria-label="Group consolidated report by entity"
                        emptyTitle="No entities found"
                        emptyDescription="Try adjusting your search query."
                    />

                    {/* Group total footer */}
                    <div className="mt-2 flex items-center justify-between rounded-xl border border-[#2A3A4A] bg-[#1A2A3A] px-4 py-3 text-sm font-bold text-white">
                        <span>Group Total</span>
                        <div className="flex items-center gap-8">
                            <span>567</span>
                            <Badge variant="success">+15</Badge>
                            <span>100%</span>
                            <span className="text-[#8899AA]">—</span>
                        </div>
                    </div>
                </div>
            </Card>
        </Page>
    );
}
