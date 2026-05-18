"use client";

import { Plus, UploadCloud, TrendingUp } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

interface BonusBatch {
    id: string;
    name: string;
    type: string;
    amount: string;
    emps: number;
    month: string;
    status: "Paid" | "Pending Approval" | "Draft";
}

const BONUSES: BonusBatch[] = [
    { id: "BON-01", name: "Diwali Bonus 2024", type: "Flat Percentage", amount: "₹45,50,000", emps: 840, month: "Oct 2024", status: "Paid" },
    { id: "BON-02", name: "Q3 Performance Bonus", type: "Performance Linked", amount: "₹12,40,000", emps: 45, month: "Nov 2024", status: "Pending Approval" },
    { id: "BON-03", name: "Referral Bonus (Q3)", type: "Fixed Amount", amount: "₹1,50,000", emps: 3, month: "Nov 2024", status: "Draft" },
];

const STATUS_VARIANT = {
    Paid: "success",
    "Pending Approval": "warning",
    Draft: "neutral",
} as const;

const COLUMNS: Column<BonusBatch>[] = [
    {
        key: "name",
        label: "Batch Name",
        render: (b) => (
            <div>
                <p className="font-semibold text-white">{b.name}</p>
                <p className="text-xs text-[#8899AA]">{b.id} · {b.emps} Employees</p>
            </div>
        ),
        sortable: true,
        sortValue: (b) => b.name,
    },
    {
        key: "type",
        label: "Calculation Type",
        render: (b) => <span className="text-sm text-[#E5E7EB]">{b.type}</span>,
    },
    {
        key: "month",
        label: "Target Month",
        render: (b) => <span className="text-sm text-[#E5E7EB]">{b.month}</span>,
    },
    {
        key: "amount",
        label: "Total Amount",
        align: "right",
        render: (b) => <span className="font-bold text-white">{b.amount}</span>,
    },
    {
        key: "status",
        label: "Status",
        render: (b) => <Badge variant={STATUS_VARIANT[b.status]}>{b.status}</Badge>,
    },
    {
        key: "action",
        label: "",
        align: "right",
        render: () => (
            <Button variant="secondary" size="sm">View Details</Button>
        ),
    },
];

export default function BonusPayout() {
    return (
        <Page
            title="Bonus & Off-Cycle Payouts"
            subtitle="Manage festive bonuses, performance incentives, and referral payouts."
            breadcrumbs={[
                { label: "Payroll", href: "/payroll" },
                { label: "Bonus" },
            ]}
            maxWidth="1200px"
            actions={
                <>
                    <Button variant="secondary" icon={<UploadCloud size={14} aria-hidden="true" />}>
                        Import Bulk
                    </Button>
                    <Button icon={<Plus size={16} aria-hidden="true" />}>
                        Create Bonus Batch
                    </Button>
                </>
            }
        >
            <div className="space-y-6">
                {/* KPI Cards */}
                <div className="grid gap-4 sm:grid-cols-3">
                    <Card>
                        <p className="text-sm text-[#8899AA]">Total Bonus Disbursed (YTD)</p>
                        <p className="mt-2 text-3xl font-bold text-white">₹64,20,000</p>
                        <p className="mt-1 flex items-center gap-1 text-xs text-[#00E5A0]">
                            <TrendingUp size={12} aria-hidden="true" /> +12% from last year
                        </p>
                    </Card>
                    <Card>
                        <p className="text-sm text-[#8899AA]">Upcoming Payouts (Nov)</p>
                        <p className="mt-2 text-3xl font-bold text-[#FFB800]">₹13,90,000</p>
                        <p className="mt-1 text-xs text-[#8899AA]">Across 2 batches</p>
                    </Card>
                    <Card
                        variant="bare"
                        className="rounded-2xl border border-dashed border-[rgba(0,102,255,0.3)] bg-[rgba(0,102,255,0.05)] p-5"
                    >
                        <h3 className="mb-2 text-base font-semibold text-white">TDS on Bonus</h3>
                        <p className="text-sm leading-relaxed text-[#8899AA]">
                            By default, bonuses are taxed strictly in the month they are paid. You can configure TDS spacing across remaining months in settings.
                        </p>
                    </Card>
                </div>

                {/* Bonus Batches Table */}
                <Card padding="none">
                    <DataTable<BonusBatch>
                        data={BONUSES}
                        columns={COLUMNS}
                        rowKey={(b) => b.id}
                        searchable
                        searchPlaceholder="Search batch name…"
                        aria-label="Bonus batches"
                        emptyTitle="No bonus batches"
                        emptyDescription="Create a new bonus batch to get started."
                    />
                </Card>
            </div>
        </Page>
    );
}
