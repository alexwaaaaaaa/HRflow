"use client";

import { useState } from "react";
import { Download, Filter } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

// migrated: immersive-ui

type RunStatus = "Generated" | "Paid";

interface PaymentRun {
    id: string;
    month: string;
    type: string;
    totalAmount: number;
    employees: number;
    status: RunStatus;
    date: string;
}

const RUNS: PaymentRun[] = [
    { id: "PAY-Mar-26-R1", month: "March 2026", type: "Regular Payroll", totalAmount: 42500000, employees: 342, status: "Generated", date: "28 Mar 2026" },
    { id: "REIMB-Mar-26", month: "March 2026", type: "Reimbursements", totalAmount: 1840000, employees: 86, status: "Paid", date: "15 Mar 2026" },
    { id: "F&F-Feb-26", month: "February 2026", type: "Full & Final", totalAmount: 1250000, employees: 3, status: "Paid", date: "10 Mar 2026" },
    { id: "PAY-Feb-26-R1", month: "February 2026", type: "Regular Payroll", totalAmount: 41800000, employees: 338, status: "Paid", date: "28 Feb 2026" },
];

const STATUS_BADGE: Record<RunStatus, "success" | "warning"> = {
    Paid: "success",
    Generated: "warning",
};

const COLUMNS: Column<PaymentRun>[] = [
    {
        key: "runDetails",
        label: "Run Details",
        render: (r) => (
            <div>
                <div className="text-[#00E5A0] font-bold text-xs">{r.id}</div>
                <div className="text-[#8899AA] text-[10px] mt-0.5">Created: {r.date}</div>
            </div>
        ),
        sortable: true,
        sortValue: (r) => r.id,
    },
    {
        key: "month",
        label: "Month / Type",
        render: (r) => (
            <div>
                <div className="text-white font-semibold text-xs">{r.month}</div>
                <div className="text-[#8899AA] text-[10px] mt-0.5">{r.type}</div>
            </div>
        ),
    },
    {
        key: "employees",
        label: "Employees",
        align: "right",
        render: (r) => <span className="text-white font-semibold">{r.employees}</span>,
    },
    {
        key: "totalAmount",
        label: "Total Transfer",
        align: "right",
        render: (r) => <span className="font-black text-white text-base">₹{(r.totalAmount / 100000).toFixed(2)}L</span>,
        sortable: true,
        sortValue: (r) => r.totalAmount,
    },
    {
        key: "status",
        label: "Status",
        align: "center",
        render: (r) => <Badge variant={STATUS_BADGE[r.status]}>{r.status}</Badge>,
    },
    {
        key: "actions",
        label: "Actions",
        align: "right",
        render: () => (
            <div className="flex flex-col items-end gap-1">
                <Button size="sm" icon={<Download size={13} aria-hidden="true" />}>Bank File</Button>
                <button
                    type="button"
                    className="text-[10px] text-[#8899AA] hover:text-white transition-colors"
                >
                    Download Excel Summary
                </button>
            </div>
        ),
    },
];

export default function BankAdviceScreen() {
    const [search, setSearch] = useState("");

    const filtered = RUNS.filter(
        (r) =>
            !search ||
            r.id.toLowerCase().includes(search.toLowerCase()) ||
            r.month.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Page
            title="Bank Advice"
            subtitle="Generate NEFT/RTGS upload files for your corporate bank portal"
            breadcrumbs={[
                { label: "Payroll", href: "/payroll/dashboard" },
                { label: "Reports", href: "/payroll-reports" },
                { label: "Bank Advice" },
            ]}
            maxWidth="1100px"
            actions={
                <div className="flex items-center gap-3">
                    <label htmlFor="bank-select" className="sr-only">Select bank format</label>
                    <select
                        id="bank-select"
                        className="bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-2.5 text-white text-sm focus:border-[#00E5A0] outline-none"
                    >
                        <option>HDFC Corporate (Primary)</option>
                        <option>ICICI CMS (Secondary)</option>
                        <option>Standard Format (.txt)</option>
                    </select>
                </div>
            }
        >
            <Card padding="none">
                <div className="p-4 border-b border-[#1A2A3A] flex items-center justify-between bg-[#060D1A]">
                    <span className="text-white font-bold text-sm">Payment Runs</span>
                    <div className="flex items-center gap-3">
                        <Button variant="ghost" size="sm" aria-label="Filter runs">
                            <Filter size={15} aria-hidden="true" />
                        </Button>
                        <div className="relative w-64">
                            <label htmlFor="run-search" className="sr-only">Search payment runs</label>
                            <input
                                id="run-search"
                                type="search"
                                placeholder="Search by run ID or month..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-lg pl-3 pr-3 py-1.5 text-white text-xs focus:border-[#00E5A0] outline-none"
                            />
                        </div>
                    </div>
                </div>
                <DataTable<PaymentRun>
                    data={filtered}
                    columns={COLUMNS}
                    rowKey={(r) => r.id}
                    aria-label="Payment runs for bank advice"
                    emptyTitle="No payment runs found"
                    emptyDescription="Try adjusting your search."
                />
            </Card>
        </Page>
    );
}
