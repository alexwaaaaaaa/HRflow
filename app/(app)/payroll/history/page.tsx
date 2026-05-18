"use client";

import { Download, Calendar, FileText, CheckCircle2, AlertTriangle, TrendingUp } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

interface HistoryRun {
    id: string;
    month: string;
    date: string;
    type: string;
    emps: number;
    gross: string;
    net: string;
    status: "Completed";
    by: string;
}

const HISTORY: HistoryRun[] = [
    { id: "RUN-001", month: "October 2024", date: "28 Oct 2024", type: "Regular Payroll", emps: 840, gross: "₹4,12,50,000", net: "₹3,75,00,000", status: "Completed", by: "Priya Mehta" },
    { id: "RUN-002", month: "October 2024", date: "15 Oct 2024", type: "Diwali Bonus", emps: 835, gross: "₹42,00,000", net: "₹42,00,000", status: "Completed", by: "Ajiit Finance" },
    { id: "RUN-003", month: "September 2024", date: "28 Sep 2024", type: "Regular Payroll", emps: 825, gross: "₹3,95,00,000", net: "₹3,60,00,000", status: "Completed", by: "Priya Mehta" },
    { id: "RUN-004", month: "August 2024", date: "28 Aug 2024", type: "Regular Payroll", emps: 810, gross: "₹3,88,00,000", net: "₹3,52,00,000", status: "Completed", by: "Priya Mehta" },
    { id: "RUN-005", month: "July 2024", date: "28 Jul 2024", type: "Regular Payroll", emps: 805, gross: "₹3,85,00,000", net: "₹3,48,00,000", status: "Completed", by: "Priya Mehta" },
];

const COLUMNS: Column<HistoryRun>[] = [
    {
        key: "month",
        label: "Payroll Month",
        render: (r) => (
            <div>
                <div className="flex items-center gap-1.5 font-semibold text-white">
                    <Calendar size={13} className="text-[#8899AA]" aria-hidden="true" /> {r.month}
                </div>
                <p className="text-xs text-[#8899AA]">Processed: {r.date}</p>
            </div>
        ),
        sortable: true,
        sortValue: (r) => r.month,
    },
    {
        key: "type",
        label: "Run Details",
        render: (r) => (
            <div>
                <p className="text-sm text-[#E5E7EB]">{r.type}</p>
                <p className="text-xs text-[#8899AA]">By: {r.by}</p>
            </div>
        ),
    },
    {
        key: "emps",
        label: "Employees",
        render: (r) => <span className="text-sm text-[#E5E7EB]">{r.emps}</span>,
    },
    {
        key: "gross",
        label: "Gross Amount",
        render: (r) => <span className="text-sm text-white">{r.gross}</span>,
    },
    {
        key: "net",
        label: "Net Amount",
        render: (r) => <span className="font-bold text-[#00E5A0]">{r.net}</span>,
    },
    {
        key: "status",
        label: "Status",
        render: () => (
            <Badge variant="success">
                <CheckCircle2 size={11} className="mr-1 inline" aria-hidden="true" /> Completed
            </Badge>
        ),
    },
    {
        key: "actions",
        label: "",
        align: "right",
        render: () => (
            <div className="flex items-center justify-end gap-2">
                <Button variant="secondary" size="sm" icon={<FileText size={12} aria-hidden="true" />} href="/payroll/reports/variance">
                    Register
                </Button>
                <Button
                    variant="secondary"
                    size="sm"
                    aria-label="View audit log"
                    icon={<AlertTriangle size={12} aria-hidden="true" />}
                    href="/payroll/audit"
                />
            </div>
        ),
    },
];

export default function PayrollHistory() {
    return (
        <Page
            title="Payroll History & Archives"
            subtitle="Access past payroll runs, download registers, and audit logs."
            breadcrumbs={[
                { label: "Payroll", href: "/payroll" },
                { label: "History" },
            ]}
            maxWidth="1200px"
            actions={
                <>
                    <Button variant="secondary" icon={<TrendingUp size={14} aria-hidden="true" />} href="/payroll/reports/variance">
                        Month Variance Report
                    </Button>
                    <Button icon={<Download size={14} aria-hidden="true" />} href="/payroll/reports/variance">
                        Export Consolidated YTD
                    </Button>
                </>
            }
        >
            <div className="space-y-4">
                {/* Filters */}
                <div className="flex flex-wrap gap-3">
                    <select
                        aria-label="Filter by fiscal year"
                        className="h-10 rounded-lg border border-[#1A2A3A] bg-[#0D1928] px-4 text-sm text-white outline-none"
                    >
                        <option>FY: 2024-2025</option>
                        <option>FY: 2023-2024</option>
                    </select>
                </div>

                <Card padding="none">
                    <DataTable<HistoryRun>
                        data={HISTORY}
                        columns={COLUMNS}
                        rowKey={(r) => r.id}
                        searchable
                        searchPlaceholder="Search by month or type…"
                        aria-label="Payroll history"
                        emptyTitle="No payroll history found"
                        emptyDescription="No records match your current filters."
                    />
                    <div className="border-t border-[#1A2A3A] px-4 py-3 text-right text-sm text-[#8899AA]">
                        Showing past 5 payroll records
                    </div>
                </Card>
            </div>
        </Page>
    );
}
