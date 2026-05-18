"use client";

import { FileSpreadsheet, Search, FileJson, ChevronDown, LayoutGrid, List, FileText } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

interface LedgerRow {
    id: string;
    name: string;
    earn: string;
    ded: string;
    net: string;
    ref: string;
    status: "Passed" | "Flagged" | "Pending";
}

const STATUS_VARIANT: Record<LedgerRow["status"], "success" | "danger" | "warning"> = {
    Passed: "success",
    Flagged: "danger",
    Pending: "warning",
};

const LEDGER_ROWS: LedgerRow[] = [
    { id: "TXN-98212", name: "Arnab Das", earn: "4,75,102", ded: "1,49,900", net: "3,25,202", ref: "IMPS-00921", status: "Passed" },
    { id: "TXN-98213", name: "Rahul Nair", earn: "2,10,000", ded: "45,000", net: "1,65,000", ref: "NEFT-8821", status: "Flagged" },
    { id: "TXN-98214", name: "Sonia Gill", earn: "8,42,000", ded: "2,10,000", net: "6,32,000", ref: "BANK-0091", status: "Passed" },
    { id: "TXN-98215", name: "Priya Iyer", earn: "1,25,000", ded: "12,000", net: "1,13,000", ref: "IMPS-7721", status: "Passed" },
    { id: "TXN-98216", name: "Anil Das", earn: "3,10,200", ded: "88,000", net: "2,22,200", ref: "CHQ-0012", status: "Pending" },
];

const COLUMNS: Column<LedgerRow>[] = [
    {
        key: "id",
        label: "Transaction ID",
        render: (r) => <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400">{r.id}</span>,
        sortable: true,
        sortValue: (r) => r.id,
    },
    {
        key: "name",
        label: "Employee Name",
        render: (r) => <span className="text-xs font-bold uppercase tracking-tight text-white">{r.name}</span>,
        sortable: true,
        sortValue: (r) => r.name,
    },
    {
        key: "earn",
        label: "Earnings (₹)",
        render: (r) => <span className="text-xs font-bold text-[#8899AA]">₹{r.earn}</span>,
    },
    {
        key: "ded",
        label: "Deductions (₹)",
        render: (r) => <span className="text-xs font-bold text-rose-400">₹{r.ded}</span>,
    },
    {
        key: "net",
        label: "Net Paid (₹)",
        render: (r) => <span className="text-xs font-bold text-emerald-400">₹{r.net}</span>,
    },
    {
        key: "ref",
        label: "Payment Ref",
        render: (r) => <span className="text-[10px] font-bold uppercase text-[#445566]">{r.ref}</span>,
        hideOnMobile: true,
    },
    {
        key: "status",
        label: "Audit Status",
        render: (r) => <Badge variant={STATUS_VARIANT[r.status]}>{r.status}</Badge>,
    },
    {
        key: "ledger",
        label: "Ledger",
        align: "right",
        render: () => (
            <Button variant="ghost" size="sm" icon={<FileText size={16} aria-hidden="true" />} aria-label="View ledger" />
        ),
    },
];

const FILTER_LABELS = ["Dept", "Reason", "Dues Range", "Stage"] as const;

export default function FnFDetailedReports() {
    return (
        <Page
            title="Data Explorer"
            subtitle="Granular settlement ledger for audit and compliance reporting."
            breadcrumbs={[
                { label: "FnF", href: "/fnf/dashboard" },
                { label: "Reports", href: "/fnf/reports" },
                { label: "Detailed" },
            ]}
            maxWidth="1400px"
            actions={
                <>
                    <Button
                        variant="secondary"
                        icon={<FileSpreadsheet size={14} aria-hidden="true" />}
                    >
                        Export .XLSX
                    </Button>
                    <Button
                        icon={<FileJson size={14} aria-hidden="true" />}
                    >
                        Export .JSON
                    </Button>
                </>
            }
        >
            <div className="space-y-6">
                {/* Filters */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex gap-3">
                        <div className="relative">
                            <Search
                                size={14}
                                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#445566]"
                                aria-hidden="true"
                            />
                            <label htmlFor="global-filter" className="sr-only">Global filter</label>
                            <input
                                id="global-filter"
                                type="search"
                                placeholder="Global filter..."
                                className="w-64 rounded-xl border border-[#1A2A3A] bg-[#0D1928] py-2.5 pl-10 pr-4 text-xs text-white outline-none focus:border-[#00e5a0]"
                            />
                        </div>
                        <div className="flex rounded-xl border border-[#1A2A3A] bg-[#0D1928] p-0.5" role="group" aria-label="View mode">
                            <button
                                type="button"
                                aria-pressed={true}
                                aria-label="List view"
                                className="rounded-lg bg-[#1A2A3A] p-2.5 text-blue-500"
                            >
                                <List size={16} aria-hidden="true" />
                            </button>
                            <button
                                type="button"
                                aria-pressed={false}
                                aria-label="Grid view"
                                className="p-2.5 text-[#445566] transition-colors hover:text-white"
                            >
                                <LayoutGrid size={16} aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {FILTER_LABELS.map((filter) => (
                            <button
                                key={filter}
                                type="button"
                                className="flex items-center gap-2 rounded-xl border border-[#1A2A3A] bg-[#0D1928] px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-[#445566] transition-colors hover:text-white"
                            >
                                {filter} <ChevronDown size={12} aria-hidden="true" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Data Grid */}
                <Card padding="none">
                    <div className="p-4">
                        <DataTable<LedgerRow>
                            data={LEDGER_ROWS}
                            columns={COLUMNS}
                            rowKey={(r) => r.id}
                            searchable
                            searchPlaceholder="Search by name, ID, or reference…"
                            aria-label="FnF settlement ledger"
                        />
                    </div>
                </Card>

                {/* Pagination footer */}
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-[#445566]">
                    <span>Showing 1 – 25 of 142 records</span>
                    <nav aria-label="Pagination" className="flex gap-2">
                        {["1", "2", "3", "...", "Last"].map((p) => (
                            <button
                                key={p}
                                type="button"
                                aria-current={p === "1" ? "page" : undefined}
                                className={`rounded border border-[#1A2A3A] px-3 py-1 transition-colors hover:bg-[#1A2A3A] ${
                                    p === "1" ? "bg-[#1A2A3A] text-white" : ""
                                }`}
                            >
                                {p}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>
        </Page>
    );
}
