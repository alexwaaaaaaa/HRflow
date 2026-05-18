"use client";

import { FileText, ArrowUpRight, Plus, Download } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

interface ContractorRow {
    id: string;
    name: string;
    type: string;
    invoiceNo: string;
    date: string;
    amount: number;
    tdsRate: number;
    tdsAmt: number;
    net: number;
    status: "Pending Payment" | "Paid" | "Draft";
}

const CONTRACTORS: ContractorRow[] = [
    { id: "C-101", name: "Global Tech Services", type: "Agency", invoiceNo: "INV-2024-118", date: "25 Nov 2024", amount: 125000, tdsRate: 2, tdsAmt: 2500, net: 122500, status: "Pending Payment" },
    { id: "C-142", name: "Ravi Kumar", type: "Freelancer", invoiceNo: "RK-11-2024", date: "28 Nov 2024", amount: 45000, tdsRate: 10, tdsAmt: 4500, net: 40500, status: "Paid" },
    { id: "C-089", name: "DesignPros Agency", type: "Agency", invoiceNo: "DP-88912", date: "15 Nov 2024", amount: 280000, tdsRate: 2, tdsAmt: 5600, net: 274400, status: "Paid" },
    { id: "C-115", name: "Anita Sharma (Legal)", type: "Consultant", invoiceNo: "AS-CONS-09", date: "30 Nov 2024", amount: 65000, tdsRate: 10, tdsAmt: 6500, net: 58500, status: "Draft" },
];

const STATUS_VARIANT = {
    Paid: "success",
    "Pending Payment": "warning",
    Draft: "neutral",
} as const;

const COLUMNS: Column<ContractorRow>[] = [
    {
        key: "contractor",
        label: "Contractor / Vendor",
        render: (c) => (
            <div>
                <p className="font-semibold text-white">{c.name}</p>
                <p className="text-xs text-[#8899AA]">{c.id} · {c.type}</p>
            </div>
        ),
        sortable: true,
        sortValue: (c) => c.name,
    },
    {
        key: "invoice",
        label: "Invoice Details",
        render: (c) => (
            <div>
                <div className="flex items-center gap-1.5 text-sm text-white">
                    <FileText size={13} className="text-[#8899AA]" aria-hidden="true" /> {c.invoiceNo}
                </div>
                <p className="text-xs text-[#8899AA]">Dated: {c.date}</p>
            </div>
        ),
    },
    {
        key: "amount",
        label: "Gross Amount",
        align: "right",
        render: (c) => <span className="text-sm text-white">₹{c.amount.toLocaleString()}</span>,
        sortable: true,
        sortValue: (c) => c.amount,
    },
    {
        key: "tds",
        label: "TDS Deducted",
        align: "right",
        render: (c) => (
            <div className="text-right">
                <p className="text-sm text-red-400">- ₹{c.tdsAmt.toLocaleString()}</p>
                <p className="text-xs text-[#8899AA]">@ {c.tdsRate}% Rate</p>
            </div>
        ),
    },
    {
        key: "net",
        label: "Net Payable",
        align: "right",
        render: (c) => <span className="font-bold text-[#00E5A0]">₹{c.net.toLocaleString()}</span>,
    },
    {
        key: "status",
        label: "Status",
        render: (c) => <Badge variant={STATUS_VARIANT[c.status]}>{c.status}</Badge>,
    },
    {
        key: "action",
        label: "",
        align: "right",
        render: () => (
            <Button variant="secondary" size="sm" iconRight={<ArrowUpRight size={12} aria-hidden="true" />}>
                Pay
            </Button>
        ),
    },
];

const totalPayout = CONTRACTORS.reduce((s, c) => s + c.amount, 0);
const pendingPayout = CONTRACTORS.filter((c) => c.status === "Pending Payment").reduce((s, c) => s + c.amount, 0);
const totalTds = CONTRACTORS.reduce((s, c) => s + c.tdsAmt, 0);

export default function ContractorPayment() {
    return (
        <Page
            title="Contractor & Consultant Payments"
            subtitle="Process vendor invoices and manage TDS deduction (Sec 194C / 194J)."
            breadcrumbs={[
                { label: "Payroll", href: "/payroll" },
                { label: "Contractors" },
            ]}
            maxWidth="1200px"
            actions={
                <>
                    <Button variant="secondary" icon={<Download size={14} aria-hidden="true" />}>
                        Export Bank File
                    </Button>
                    <Button icon={<Plus size={16} aria-hidden="true" />}>
                        Add Invoice
                    </Button>
                </>
            }
        >
            <div className="space-y-6">
                {/* KPI Cards */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <p className="text-sm text-[#8899AA]">Total Consultant Payout (Nov)</p>
                        <p className="mt-2 text-2xl font-bold text-white">₹{totalPayout.toLocaleString()}</p>
                    </Card>
                    <Card>
                        <p className="text-sm text-[#8899AA]">Pending Invoices</p>
                        <p className="mt-2 text-2xl font-bold text-[#FFB800]">₹{pendingPayout.toLocaleString()}</p>
                        <p className="mt-1 text-xs text-[#8899AA]">Across 2 vendors</p>
                    </Card>
                    <Card>
                        <p className="text-sm text-[#8899AA]">TDS Deducted (Sec 194C/J)</p>
                        <p className="mt-2 text-2xl font-bold text-red-400">₹{totalTds.toLocaleString()}</p>
                    </Card>
                    <Card
                        variant="bare"
                        className="rounded-2xl border border-dashed border-[rgba(0,229,160,0.3)] bg-[rgba(0,229,160,0.05)] p-5"
                    >
                        <h3 className="mb-2 text-base font-semibold text-white">TDS Certificate Sync</h3>
                        <p className="text-sm leading-relaxed text-[#8899AA]">
                            Upload Form 16A quarterly to distribute automatically to all registered contractors.
                        </p>
                    </Card>
                </div>

                {/* Contractors Table */}
                <Card padding="none">
                    <DataTable<ContractorRow>
                        data={CONTRACTORS}
                        columns={COLUMNS}
                        rowKey={(c) => c.id}
                        searchable
                        searchPlaceholder="Search vendor or invoice…"
                        aria-label="Contractor and consultant payments"
                        emptyTitle="No invoices found"
                        emptyDescription="Add a new invoice to get started."
                    />
                </Card>
            </div>
        </Page>
    );
}
