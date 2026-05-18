"use client";

import { Download, Filter, ShieldAlert, BookUser } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

interface TaxRow {
    emp: string;
    id: string;
    regime: "New Regime" | "Old Regime";
    pf: number;
    pt: number;
    tds: number;
    esi: number;
    total: number;
    projected: number;
}

const TAX_DATA: TaxRow[] = [
    { emp: "Rahul Sharma", id: "EMP-001", regime: "New Regime", pf: 1800, pt: 200, tds: 15400, esi: 0, total: 17400, projected: 184800 },
    { emp: "Sneha Patil", id: "EMP-045", regime: "Old Regime", pf: 1800, pt: 200, tds: 4200, esi: 0, total: 6200, projected: 50400 },
    { emp: "Amit Kumar", id: "EMP-102", regime: "New Regime", pf: 1500, pt: 0, tds: 0, esi: 240, total: 1740, projected: 0 },
    { emp: "Vikram Reddy", id: "EMP-204", regime: "Old Regime", pf: 1800, pt: 200, tds: 32000, esi: 0, total: 34000, projected: 384000 },
];

const REGIME_VARIANT = {
    "New Regime": "info",
    "Old Regime": "neutral",
} as const;

const COLUMNS: Column<TaxRow>[] = [
    {
        key: "employee",
        label: "Employee",
        render: (r) => (
            <div>
                <p className="text-sm font-semibold text-white">{r.emp}</p>
                <p className="text-xs text-[#8899AA]">{r.id}</p>
            </div>
        ),
        sortable: true,
        sortValue: (r) => r.emp,
    },
    {
        key: "regime",
        label: "Tax Regime",
        render: (r) => <Badge variant={REGIME_VARIANT[r.regime]}>{r.regime}</Badge>,
    },
    {
        key: "pf",
        label: "PF (EE)",
        align: "right",
        render: (r) => <span className="text-sm text-red-400">{r.pf > 0 ? `-₹${r.pf}` : "-"}</span>,
    },
    {
        key: "pt",
        label: "PT",
        align: "right",
        render: (r) => <span className="text-sm text-red-400">{r.pt > 0 ? `-₹${r.pt}` : "-"}</span>,
        hideOnMobile: true,
    },
    {
        key: "tds",
        label: "TDS",
        align: "right",
        render: (r) => <span className="text-sm font-semibold text-red-400">{r.tds > 0 ? `-₹${r.tds}` : "-"}</span>,
    },
    {
        key: "total",
        label: "Total Deductions",
        align: "right",
        render: (r) => <span className="text-sm font-bold text-white">₹{r.total}</span>,
        sortable: true,
        sortValue: (r) => r.total,
    },
    {
        key: "action",
        label: "",
        align: "right",
        render: () => (
            <Button variant="secondary" size="sm">Tax Sheet</Button>
        ),
    },
];

export default function PayrollTaxOverview() {
    return (
        <Page
            title="Payroll Tax & Statutory Overview"
            subtitle="Review PF, PT, ESI, and TDS deductions for the Nov 2024 cycle."
            breadcrumbs={[
                { label: "Payroll", href: "/payroll" },
                { label: "Reports" },
                { label: "Tax" },
            ]}
            maxWidth="1200px"
            actions={
                <>
                    <Button variant="secondary" icon={<Download size={14} aria-hidden="true" />}>
                        Export TDS Register
                    </Button>
                    <Button icon={<ShieldAlert size={14} aria-hidden="true" />}>
                        Generate Challans
                    </Button>
                </>
            }
        >
            <div className="space-y-6">
                {/* KPI Cards */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <p className="text-sm text-[#8899AA]">Total TDS Deducted</p>
                        <p className="mt-2 text-2xl font-bold text-red-400">₹14,50,000</p>
                        <p className="mt-1 text-xs text-[#8899AA]">710 Employees</p>
                    </Card>
                    <Card>
                        <p className="text-sm text-[#8899AA]">Provident Fund (PF)</p>
                        <p className="mt-2 text-2xl font-bold text-red-400">₹15,12,000</p>
                        <p className="mt-1 text-xs text-[#8899AA]">Both EE & ER Share</p>
                    </Card>
                    <Card>
                        <p className="text-sm text-[#8899AA]">Professional Tax (PT)</p>
                        <p className="mt-2 text-2xl font-bold text-red-400">₹1,68,000</p>
                        <p className="mt-1 text-xs text-[#8899AA]">Across 14 States</p>
                    </Card>
                    <Card
                        variant="bare"
                        className="rounded-2xl border border-dashed border-[rgba(0,102,255,0.3)] bg-[rgba(0,102,255,0.05)] p-5"
                    >
                        <div className="mb-3 flex items-center gap-2">
                            <BookUser size={16} className="text-[#0066FF]" aria-hidden="true" />
                            <p className="text-sm font-medium text-white">Tax Regimes</p>
                        </div>
                        <div className="flex justify-between text-sm text-[#8899AA]">
                            <span>New Regime:</span>
                            <span className="font-semibold text-white">640</span>
                        </div>
                        <div className="mt-1 flex justify-between text-sm text-[#8899AA]">
                            <span>Old Regime:</span>
                            <span className="font-semibold text-white">202</span>
                        </div>
                    </Card>
                </div>

                {/* Filter bar */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <select
                        aria-label="Filter by state"
                        className="h-10 rounded-lg border border-[#1A2A3A] bg-[#0D1928] px-4 text-sm text-white outline-none"
                    >
                        <option>State: All</option>
                        <option>Maharashtra (MH)</option>
                        <option>Karnataka (KA)</option>
                    </select>
                    <Button variant="secondary" size="sm" icon={<Filter size={12} aria-hidden="true" />}>
                        Filters
                    </Button>
                </div>

                {/* Tax Table */}
                <Card padding="none">
                    <DataTable<TaxRow>
                        data={TAX_DATA}
                        columns={COLUMNS}
                        rowKey={(r) => r.id}
                        searchable
                        searchPlaceholder="Search employee…"
                        aria-label="Payroll tax and statutory overview"
                        emptyTitle="No tax records"
                        emptyDescription="No tax deduction records for this cycle."
                    />
                </Card>
            </div>
        </Page>
    );
}
