"use client";

import { RefreshCw, ArrowUpRight } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

interface CommissionRow {
    id: string;
    emp: string;
    role: string;
    deals: number;
    revenue: number;
    rate: number;
    payout: number;
    status: "Calculated" | "Approved" | "Draft";
}

const COMMISSIONS: CommissionRow[] = [
    { id: "COM-11", emp: "Neha Gupta", role: "Account Executive", deals: 12, revenue: 1250000, rate: 5, payout: 62500, status: "Calculated" },
    { id: "COM-12", emp: "Rajeev Singh", role: "Sales Director", deals: 45, revenue: 8500000, rate: 2, payout: 170000, status: "Approved" },
    { id: "COM-13", emp: "Anita Desai", role: "SDR", deals: 28, revenue: 450000, rate: 10, payout: 45000, status: "Calculated" },
    { id: "COM-14", emp: "Suresh Pillai", role: "Account Executive", deals: 8, revenue: 680000, rate: 5, payout: 34000, status: "Draft" },
];

const STATUS_VARIANT = {
    Approved: "success",
    Calculated: "neutral",
    Draft: "neutral",
} as const;

const COLUMNS: Column<CommissionRow>[] = [
    {
        key: "rep",
        label: "Rep Name",
        render: (c) => (
            <div>
                <p className="font-semibold text-white">{c.emp}</p>
                <p className="text-xs text-[#8899AA]">{c.role}</p>
            </div>
        ),
        sortable: true,
        sortValue: (c) => c.emp,
    },
    {
        key: "deals",
        label: "Deals Closed",
        render: (c) => <span className="text-sm text-[#E5E7EB]">{c.deals} Deals</span>,
    },
    {
        key: "revenue",
        label: "Eligible Revenue",
        render: (c) => <span className="text-sm text-[#E5E7EB]">₹{c.revenue.toLocaleString()}</span>,
    },
    {
        key: "rate",
        label: "Comm. Rate",
        render: (c) => <span className="text-sm text-[#00E5A0]">{c.rate}%</span>,
    },
    {
        key: "payout",
        label: "Final Payout",
        align: "right",
        render: (c) => <span className="font-bold text-white">₹{c.payout.toLocaleString()}</span>,
        sortable: true,
        sortValue: (c) => c.payout,
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
                View Deals
            </Button>
        ),
    },
];

export default function CommissionPayout() {
    return (
        <Page
            title="Sales Commissions (Nov 2024)"
            subtitle="Manage revenue-based incentive payouts for the sales and SDR teams."
            breadcrumbs={[
                { label: "Payroll", href: "/payroll" },
                { label: "Commissions" },
            ]}
            maxWidth="1200px"
            actions={
                <>
                    <Button variant="secondary" icon={<RefreshCw size={14} className="text-[#0066FF]" aria-hidden="true" />}>
                        Sync with CRM (Salesforce)
                    </Button>
                    <Button variant="secondary">Approve Batch</Button>
                </>
            }
        >
            <div className="space-y-6">
                {/* KPI Cards */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <p className="text-sm text-[#8899AA]">Total Revenue Closed</p>
                        <p className="mt-2 text-2xl font-bold text-white">₹2.45 Cr</p>
                    </Card>
                    <Card>
                        <p className="text-sm text-[#8899AA]">Total Commission Value</p>
                        <p className="mt-2 text-2xl font-bold text-[#00E5A0]">₹8,45,500</p>
                        <p className="mt-1 text-xs text-[#8899AA]">3.4% Blended Rate</p>
                    </Card>
                    <Card>
                        <p className="text-sm text-[#8899AA]">Eligible Reps</p>
                        <p className="mt-2 text-2xl font-bold text-white">38</p>
                    </Card>
                    <Card>
                        <p className="text-sm text-[#8899AA]">Synced Deals</p>
                        <p className="mt-2 text-2xl font-bold text-[#0066FF]">214</p>
                    </Card>
                </div>

                {/* Commissions Table */}
                <Card padding="none">
                    <DataTable<CommissionRow>
                        data={COMMISSIONS}
                        columns={COLUMNS}
                        rowKey={(c) => c.id}
                        searchable
                        searchPlaceholder="Search sales rep…"
                        aria-label="Sales commissions"
                        emptyTitle="No commission records"
                        emptyDescription="Sync with CRM to load commission data."
                    />
                </Card>
            </div>
        </Page>
    );
}
