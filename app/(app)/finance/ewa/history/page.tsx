"use client";

import { Download, Filter, Calendar } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

type TxnStatus = "Success" | "Pending" | "Failed";

interface Transaction {
    id: string;
    emp: string;
    date: string;
    time: string;
    amount: number;
    fee: number;
    status: TxnStatus;
    method: string;
    utr: string;
}

const TXN_HISTORY: Transaction[] = [
    { id: "TXN-9428", emp: "Suraj P (EMP-182)", date: "2025-10-18", time: "09:42", amount: 10000, fee: 100, status: "Success", method: "IMPS", utr: "ICIC92817293" },
    { id: "TXN-9427", emp: "Ravi K (EMP-042)", date: "2025-10-18", time: "08:15", amount: 25000, fee: 250, status: "Pending", method: "NEFT", utr: "-" },
    { id: "TXN-9426", emp: "Neha S (EMP-310)", date: "2025-10-17", time: "19:22", amount: 8000, fee: 80, status: "Failed", method: "IMPS", utr: "-" },
    { id: "TXN-9425", emp: "Vikram R (EMP-011)", date: "2025-10-17", time: "14:10", amount: 35000, fee: 350, status: "Success", method: "IMPS", utr: "HDFC91827491" },
    { id: "TXN-9424", emp: "Priya M (EMP-305)", date: "2025-10-16", time: "11:05", amount: 15000, fee: 150, status: "Success", method: "IMPS", utr: "UTIB99182736" },
];

const STATUS_VARIANT: Record<TxnStatus, "success" | "warning" | "danger"> = {
    Success: "success",
    Pending: "warning",
    Failed: "danger",
};

const COLUMNS: Column<Transaction>[] = [
    {
        key: "id", label: "Txn ID / UTR", render: (t) => (
            <div>
                <div className="font-mono text-[#00E5FF] font-medium">{t.id}</div>
                <div className="text-[#8899AA] text-xs font-mono mt-0.5">{t.utr}</div>
            </div>
        ),
    },
    {
        key: "date", label: "Date & Time", render: (t) => (
            <div>
                <div className="text-white">{t.date}</div>
                <div className="text-[#8899AA] text-xs">{t.time}</div>
            </div>
        ), sortable: true, sortValue: (t) => t.date,
    },
    { key: "emp", label: "Employee", render: (t) => <span className="text-white font-medium">{t.emp}</span> },
    { key: "amount", label: "Amount Requested", align: "right", render: (t) => <span className="text-white font-bold">₹{t.amount.toLocaleString()}</span> },
    { key: "fee", label: "Fee Deducted", align: "right", render: (t) => <span className="text-pink-400 font-medium">₹{t.fee.toLocaleString()}</span> },
    {
        key: "status", label: "Status", align: "center",
        render: (t) => (
            <Badge variant={STATUS_VARIANT[t.status]}>
                {t.status === "Pending" ? `${t.status} (${t.method})` : t.status}
            </Badge>
        ),
    },
];

export default function EWATransactionHistoryPage() {
    return (
        <Page
            title="Transaction Master Log"
            subtitle="Global ledger of all EWA withdrawal attempts, successes, and failures."
            breadcrumbs={[
                { label: "Finance", href: "/finance/dashboard" },
                { label: "EWA", href: "/finance/ewa" },
                { label: "Transaction History" },
            ]}
            maxWidth="1300px"
            actions={
                <>
                    <Button variant="secondary" icon={<Calendar size={14} />}>This Month</Button>
                    <Button icon={<Download size={14} />}>Export Master</Button>
                </>
            }
        >
            <Card padding="none">
                <div className="p-4 border-b border-[#1A2A3A] flex flex-col md:flex-row justify-between items-center gap-4">
                    <input
                        type="search"
                        placeholder="Search by TXN, UTR, or Employee..."
                        aria-label="Search transactions"
                        className="w-full md:w-96 bg-[#1A2A3A] border border-[#2A3A4A] text-white text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#00E5FF] transition-colors"
                    />
                    <Button variant="secondary" icon={<Filter size={14} />}>Status: All</Button>
                </div>
                <div className="p-4">
                    <DataTable<Transaction>
                        data={TXN_HISTORY}
                        columns={COLUMNS}
                        rowKey={(t) => t.id}
                        aria-label="EWA transaction history"
                        emptyTitle="No transactions found"
                        emptyDescription="Try adjusting your filters."
                    />
                </div>
                <div className="p-4 border-t border-[#1A2A3A] flex justify-between items-center text-sm text-[#8899AA]">
                    <div>Showing 1 to 5 of 1,429 transactions</div>
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
