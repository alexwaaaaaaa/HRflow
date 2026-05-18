"use client";

import { useState } from "react";
import { ArrowUpRight, ArrowDownRight, Calendar, Filter, Download } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

type EntryType = "Credit" | "Debit";
type EntryStatus = "Completed" | "Pending";

interface LedgerEntry {
    id: string;
    date: string;
    time: string;
    account: string;
    type: EntryType;
    amount: number;
    balance: number;
    description: string;
    status: EntryStatus;
}

const LEDGER_ENTRIES: LedgerEntry[] = [
    { id: "TXN-849201", date: "2025-06-15", time: "14:30", account: "EWA Disbursal", type: "Debit", amount: 15000, balance: 485000, description: "EWA to Emp #142 (Ravi K)", status: "Completed" },
    { id: "TXN-849202", date: "2025-06-15", time: "16:45", account: "Loan Repayment", type: "Credit", amount: 25000, balance: 510000, description: "EMI deduction for Emp #089 (Sneha R)", status: "Completed" },
    { id: "TXN-849203", date: "2025-06-16", time: "09:15", account: "Insurance Premium", type: "Debit", amount: 450000, balance: 60000, description: "Group Health Renewal - Policy Q3", status: "Completed" },
    { id: "TXN-849204", date: "2025-06-16", time: "11:20", account: "Advance Salary", type: "Debit", amount: 50000, balance: 10000, description: "Emergency Advance - Emp #210 (Amit S)", status: "Pending" },
    { id: "TXN-849205", date: "2025-06-17", time: "10:00", account: "Operating Fund", type: "Credit", amount: 1000000, balance: 1010000, description: "Monthly Corporate Allocation", status: "Completed" },
    { id: "TXN-849206", date: "2025-06-17", time: "15:10", account: "EWA Disbursal", type: "Debit", amount: 8500, balance: 1001500, description: "EWA to Emp #112 (Priya M)", status: "Completed" },
];

interface KpiTile {
    label: string;
    value: string;
    valueColor?: string;
    delta?: string;
    deltaColor?: string;
    sub?: string;
}

const KPI_TILES: KpiTile[] = [
    { label: "Total Debits (MTD)", value: "₹6,28,500", delta: "+12%", deltaColor: "text-emerald-400" },
    { label: "Total Credits (MTD)", value: "₹10,25,000", delta: "-4%", deltaColor: "text-pink-400" },
    { label: "Real-time Fund Balance", value: "₹10,01,500", sub: "Fully Reconciled as of today", valueColor: "text-[#00E5FF]" },
];

const COLUMNS: Column<LedgerEntry>[] = [
    { key: "id", label: "Transaction ID", render: (e) => <span className="font-mono text-[#00E5FF]">{e.id}</span> },
    {
        key: "date", label: "Date & Time", render: (e) => (
            <div>
                <div className="text-white">{e.date}</div>
                <div className="text-xs text-[#8899AA] mt-0.5">{e.time}</div>
            </div>
        ), sortable: true, sortValue: (e) => e.date,
    },
    {
        key: "account", label: "Account / Description", render: (e) => (
            <div>
                <div className="text-white font-medium">{e.account}</div>
                <div className="text-xs text-[#8899AA] mt-0.5 w-48 truncate">{e.description}</div>
            </div>
        ),
    },
    {
        key: "type", label: "Type", render: (e) => (
            <Badge variant={e.type === "Credit" ? "success" : "danger"}>
                {e.type === "Credit"
                    ? <ArrowDownRight size={12} className="inline mr-1" aria-hidden="true" />
                    : <ArrowUpRight size={12} className="inline mr-1" aria-hidden="true" />
                }
                {e.type}
            </Badge>
        ),
    },
    {
        key: "amount", label: "Amount", align: "right",
        render: (e) => (
            <span className={`font-medium ${e.type === "Credit" ? "text-emerald-400" : "text-pink-400"}`}>
                {e.type === "Credit" ? "+" : "-"}₹{e.amount.toLocaleString()}
            </span>
        ),
    },
    { key: "balance", label: "Running Balance", align: "right", render: (e) => <span className="text-white font-mono">₹{e.balance.toLocaleString()}</span> },
    {
        key: "status", label: "Status", align: "center",
        render: (e) => e.status === "Completed"
            ? <Badge variant="success">Completed</Badge>
            : <Badge variant="warning">Pending</Badge>,
    },
];

export default function DoubleEntryLedgerPage() {
    const [search, setSearch] = useState("");

    const filtered = search
        ? LEDGER_ENTRIES.filter((e) =>
            e.id.toLowerCase().includes(search.toLowerCase()) ||
            e.account.toLowerCase().includes(search.toLowerCase()) ||
            e.description.toLowerCase().includes(search.toLowerCase())
        )
        : LEDGER_ENTRIES;

    return (
        <Page
            title="Double Entry Ledger"
            subtitle="Real-time accounting log for all embedded finance transactions"
            breadcrumbs={[
                { label: "Finance", href: "/finance/dashboard" },
                { label: "General Ledger" },
            ]}
            maxWidth="1300px"
            actions={
                <>
                    <Button variant="secondary" icon={<Calendar size={14} />}>Date Range</Button>
                    <Button variant="secondary" icon={<Filter size={14} />}>Filter</Button>
                    <Button icon={<Download size={14} />}>Export CSV</Button>
                </>
            }
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {KPI_TILES.map((tile) => (
                    <Card key={tile.label} padding="lg">
                        <p className="text-[#8899AA] text-sm font-medium mb-1">{tile.label}</p>
                        <h3 className={`text-2xl font-bold mb-2 ${tile.valueColor ?? "text-white"}`}>{tile.value}</h3>
                        {"delta" in tile && tile.delta && (
                            <div className={`flex items-center gap-1 text-xs ${tile.deltaColor}`}>
                                <ArrowUpRight size={12} aria-hidden="true" />
                                <span>{tile.delta}</span>
                                <span className="text-[#8899AA]">vs last month</span>
                            </div>
                        )}
                        {"sub" in tile && tile.sub && <p className="text-xs text-[#8899AA]">{tile.sub}</p>}
                    </Card>
                ))}
            </div>

            <Card padding="none">
                <div className="p-4 border-b border-[#1A2A3A] flex flex-col md:flex-row justify-between gap-4">
                    <input
                        type="search"
                        placeholder="Search transactions, IDs, names..."
                        aria-label="Search ledger entries"
                        className="w-full md:w-96 bg-[#1A2A3A] border border-[#2A3A4A] text-white text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#00E5FF] transition-colors"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="p-4">
                    <DataTable<LedgerEntry>
                        data={filtered}
                        columns={COLUMNS}
                        rowKey={(e) => e.id}
                        aria-label="General ledger entries"
                        emptyTitle="No entries found"
                        emptyDescription="Try adjusting your search."
                    />
                </div>
                <div className="p-4 border-t border-[#1A2A3A] flex items-center justify-between text-sm text-[#8899AA]">
                    <div>Showing 1 to 6 of 1,204 entries</div>
                    <div className="flex gap-2">
                        <Button variant="secondary" size="sm" disabled>Prev</Button>
                        <Button variant="primary" size="sm">1</Button>
                        <Button variant="secondary" size="sm">2</Button>
                        <Button variant="secondary" size="sm">Next</Button>
                    </div>
                </div>
            </Card>
        </Page>
    );
}
