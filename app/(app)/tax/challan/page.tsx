"use client";

import React from "react";
import { Plus, Download, CheckCircle2, CalendarDays } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import DataTable, { type Column } from "@/components/ui/DataTable";

interface ChallanEntry {
    id: string;
    month: string;
    dueNote?: string;
    amount: string;
    date: string;
    bsr: string;
    sno: string;
    status: "Deposited" | "Pending";
}

const CHALLANS: ChallanEntry[] = [
    { id: "feb-2025", month: "Feb 2025", dueNote: "Due: 07 Mar", amount: "₹4,12,500", date: "—", bsr: "—", sno: "—", status: "Pending" },
    { id: "jan-2025", month: "Jan 2025", amount: "₹3,95,000", date: "05 Feb 2025", bsr: "0241051", sno: "12457", status: "Deposited" },
    { id: "dec-2024", month: "Dec 2024", amount: "₹3,88,200", date: "04 Jan 2025", bsr: "0241051", sno: "58992", status: "Deposited" },
    { id: "nov-2024", month: "Nov 2024", amount: "₹3,88,200", date: "06 Dec 2024", bsr: "6910243", sno: "00145", status: "Deposited" },
    { id: "oct-2024", month: "Oct 2024", amount: "₹3,92,100", date: "05 Nov 2024", bsr: "0241051", sno: "33412", status: "Deposited" },
    { id: "sep-2024", month: "Sep 2024", amount: "₹3,80,000", date: "07 Oct 2024", bsr: "0241051", sno: "41098", status: "Deposited" },
];

const COLUMNS: Column<ChallanEntry>[] = [
    {
        key: "month",
        label: "Month",
        render: (r) => (
            <div>
                <p className="text-sm font-semibold text-[#c8d8e8]">{r.month}</p>
                {r.dueNote && <p className="text-[10px] text-[#FFB800]">{r.dueNote}</p>}
            </div>
        ),
        sortable: true,
        sortValue: (r) => r.month,
    },
    { key: "amount", label: "Amount", render: (r) => <span className="text-sm font-medium text-white">{r.amount}</span> },
    {
        key: "date",
        label: "Date of Deposit",
        render: (r) => r.date === "—" ? (
            <span className="text-sm text-[#445566]">—</span>
        ) : (
            <div className="flex items-center gap-1.5 text-sm text-[#c8d8e8]">
                <CalendarDays size={14} className="text-[#8899AA]" aria-hidden="true" /> {r.date}
            </div>
        ),
    },
    {
        key: "bsr",
        label: "BSR Code",
        render: (r) => r.bsr === "—" ? (
            <span className="text-sm text-[#445566]">—</span>
        ) : (
            <span className="font-mono text-xs text-[#00E5A0] bg-[#00E5A0]/10 px-2 py-1 rounded">{r.bsr}</span>
        ),
    },
    {
        key: "sno",
        label: "Challan S.No.",
        render: (r) => r.sno === "—" ? (
            <span className="text-sm text-[#445566]">—</span>
        ) : (
            <span className="font-mono text-xs text-[#0066FF] bg-[#0066FF]/10 px-2 py-1 rounded border border-[#0066FF]/20">{r.sno}</span>
        ),
    },
    {
        key: "status",
        label: "Status",
        render: (r) => r.status === "Deposited" ? (
            <div className="flex items-center gap-1 text-xs font-bold text-[#00E5A0]">
                <CheckCircle2 size={14} aria-hidden="true" /> Deposited
            </div>
        ) : (
            <Button variant="secondary" size="sm">Update Challan</Button>
        ),
    },
];

export default function TDSChallanScreen() {
    return (
        <Page
            title="TDS Challans (Form 281)"
            subtitle="Manage and link your monthly TDS deposit challans for FY 2024-25."
            breadcrumbs={[
                { label: "Tax", href: "/tax/dashboard" },
                { label: "TDS Challans" },
            ]}
            maxWidth="1200px"
            actions={
                <>
                    <Button variant="secondary" icon={<Download size={16} />}>Export Log</Button>
                    <Button icon={<Plus size={16} />}>New Challan</Button>
                </>
            }
        >
            <div className="space-y-6">
                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card padding="md" className="flex items-center justify-between">
                        <div>
                            <p className="text-xs text-[#8899AA] uppercase tracking-wider font-bold mb-1">Total TDS Deposited</p>
                            <p className="text-2xl font-black text-white">₹38,45,200</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-[#00E5A0] font-bold">10 Months</p>
                            <p className="text-xs text-[#8899AA]">FY 24-25</p>
                        </div>
                    </Card>
                    <Card padding="md" className="flex items-center justify-between">
                        <div>
                            <p className="text-xs text-[#8899AA] uppercase tracking-wider font-bold mb-1">Pending Liability</p>
                            <p className="text-2xl font-black text-[#FFB800]">₹4,12,500</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-[#FFB800] font-bold">Feb 2025</p>
                            <p className="text-xs text-[#8899AA]">Due: Mar 7</p>
                        </div>
                    </Card>
                    <Card padding="md" className="flex items-center justify-between">
                        <div>
                            <p className="text-xs text-[#8899AA] uppercase tracking-wider font-bold mb-1">Compliance Status</p>
                            <div className="flex items-center gap-2 text-xl font-bold text-[#00E5A0]">
                                <CheckCircle2 size={20} aria-hidden="true" /> Up to date
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Table */}
                <Card padding="none">
                    <div className="flex justify-between items-center px-6 py-4 border-b border-[#1A2A3A]">
                        <div className="flex gap-3">
                            <select className="bg-[#060B14] border border-[#1A2A3A] text-sm text-white px-3 py-1.5 rounded-lg outline-none cursor-pointer" aria-label="Select financial year">
                                <option>FY 2024-25</option>
                                <option>FY 2023-24</option>
                            </select>
                        </div>
                    </div>
                    <DataTable<ChallanEntry>
                        data={CHALLANS}
                        columns={COLUMNS}
                        rowKey={(r) => r.id}
                        searchable
                        searchPlaceholder="Search BSR or Challan No..."
                        aria-label="TDS Challans"
                        emptyTitle="No challans found"
                    />
                </Card>
            </div>
        </Page>
    );
}
