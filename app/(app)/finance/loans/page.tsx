"use client";

import Link from "next/link";
import { Plus, Download, Filter, AlertCircle, Clock } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

interface Loan {
    id: string;
    emp: string;
    type: string;
    principal: number;
    tenure: number;
    emi: number;
    paid: number;
    balance: number;
    status: "Active";
    risk: "Low" | "Medium" | "High";
}

const ACTIVE_LOANS: Loan[] = [
    { id: "LN-8812", emp: "Ananya S", type: "Medical Emergency", principal: 250000, tenure: 24, emi: 11500, paid: 8, balance: 166666, status: "Active", risk: "Low" },
    { id: "LN-8809", emp: "Rahul K", type: "Marriage", principal: 500000, tenure: 36, emi: 16000, paid: 12, balance: 333333, status: "Active", risk: "Low" },
    { id: "LN-8790", emp: "Sneha R", type: "Home Renovation", principal: 300000, tenure: 24, emi: 14000, paid: 4, balance: 250000, status: "Active", risk: "Medium" },
    { id: "LN-8750", emp: "Vikram R", type: "Vehicle Loan", principal: 800000, tenure: 60, emi: 16500, paid: 18, balance: 560000, status: "Active", risk: "Low" },
];

interface KpiTile {
    label: string;
    value: string;
    sub: string;
    subColor?: string;
    valueColor?: string;
}

const KPI_TILES: KpiTile[] = [
    { label: "Total Portfolio Size", value: "₹4.2 Cr", sub: "Across 142 Active Loans", subColor: "text-emerald-400" },
    { label: "Monthly EMI Inflow", value: "₹18.5 L", sub: "Auto-deducted via Payroll", valueColor: "text-emerald-400" },
    { label: "Avg. Loan Ticket Size", value: "₹3.1 L", sub: "Mostly Medical/Marriage" },
    { label: "NPA / At Risk", value: "₹4.2 L", sub: "3 Employees on Notice / PIP", valueColor: "text-amber-500" },
];

const COLUMNS: Column<Loan>[] = [
    {
        key: "emp", label: "Loan ID / Employee", render: (l) => (
            <div>
                <div className="text-white font-medium">{l.emp}</div>
                <div className="font-mono text-indigo-400 text-xs mt-1">{l.id}</div>
            </div>
        ), sortable: true, sortValue: (l) => l.emp,
    },
    { key: "type", label: "Purpose", render: (l) => <span className="text-[#8899AA]">{l.type}</span> },
    { key: "principal", label: "Principal", align: "right", render: (l) => <span className="text-white font-medium">₹{l.principal.toLocaleString()}</span> },
    {
        key: "tenure", label: "Tenure/Paid", align: "center", render: (l) => (
            <div>
                <div className="text-white">{l.paid} / {l.tenure}</div>
                <div className="text-xs text-[#8899AA] mt-1">months</div>
            </div>
        ),
    },
    { key: "emi", label: "Monthly EMI", align: "right", render: (l) => <span className="text-white">₹{l.emi.toLocaleString()}</span> },
    { key: "balance", label: "Outstanding", align: "right", render: (l) => <span className="text-amber-400 font-bold">₹{l.balance.toLocaleString()}</span> },
    {
        key: "status", label: "Status", align: "center", render: (l) => (
            <div>
                <Badge variant="success">{l.status}</Badge>
                {l.risk !== "Low" && (
                    <div className="mt-1 flex items-center justify-center gap-1 text-xs text-amber-500">
                        <AlertCircle size={12} aria-hidden="true" /> {l.risk} Risk
                    </div>
                )}
            </div>
        ),
    },
    {
        key: "actions", label: "Actions", align: "center", render: (l) => (
            <div className="flex items-center justify-center gap-2">
                <Link href="/finance/loans/repay" className="text-xs text-indigo-400 hover:text-indigo-300 font-medium" aria-label={`Repay loan ${l.id}`}>Repay</Link>
                <span className="text-[#2A3A4A]">|</span>
                <Link href="/finance/loans/foreclosure" className="text-xs text-[#8899AA] hover:text-white font-medium" aria-label={`Closure for loan ${l.id}`}>Closure</Link>
            </div>
        ),
    },
];

export default function LoanManagementPage() {
    return (
        <Page
            title="Employee Loan Portfolio"
            subtitle="Manage active company loans, track repayments, and identify risks."
            breadcrumbs={[
                { label: "Finance", href: "/finance/dashboard" },
                { label: "Loan Management" },
            ]}
            maxWidth="1300px"
            actions={
                <>
                    <Button variant="secondary" icon={<Clock size={14} />} href="/finance/loans/queue">Approval Queue (3)</Button>
                    <Button icon={<Plus size={14} />} href="/finance/loans/apply">New Loan Request</Button>
                </>
            }
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {KPI_TILES.map((tile) => (
                    <Card key={tile.label} padding="lg">
                        <p className="text-[#8899AA] text-sm font-medium mb-1">{tile.label}</p>
                        <h3 className={`text-2xl font-bold mb-1 ${tile.valueColor ?? "text-white"}`}>{tile.value}</h3>
                        <p className={`text-xs ${tile.subColor ?? "text-[#8899AA]"}`}>{tile.sub}</p>
                    </Card>
                ))}
            </div>

            <Card padding="none">
                <div className="p-4 border-b border-[#1A2A3A] flex flex-col md:flex-row justify-between items-center gap-4">
                    <input
                        type="search"
                        placeholder="Search by Employee or Loan ID..."
                        aria-label="Search loans"
                        className="w-full md:w-96 bg-[#1A2A3A] border border-[#2A3A4A] text-white text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                    <div className="flex gap-2">
                        <Button variant="secondary" size="sm" icon={<Filter size={14} />}>Status: Active</Button>
                        <Button variant="secondary" size="sm" icon={<Download size={14} />}>Export</Button>
                    </div>
                </div>
                <div className="p-4">
                    <DataTable<Loan>
                        data={ACTIVE_LOANS}
                        columns={COLUMNS}
                        rowKey={(l) => l.id}
                        aria-label="Active employee loans"
                        emptyTitle="No active loans"
                        emptyDescription="No loans in the portfolio."
                    />
                </div>
            </Card>
        </Page>
    );
}
