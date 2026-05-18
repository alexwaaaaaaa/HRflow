"use client";

import Link from "next/link";
import { Download, Users, Calendar, HandCoins } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

interface JoinerRow {
    emp: string;
    id: string;
    doj: string;
    baseDays: number;
    payDays: number;
    ctc: number;
    monthlyGross: number;
    proRata: number;
}

const JOINERS: JoinerRow[] = [
    { emp: "Neha Gupta", id: "EMP-450", doj: "15 Nov 2024", baseDays: 30, payDays: 16, ctc: 1200000, monthlyGross: 100000, proRata: 53333.33 },
    { emp: "Rajeev Kumar", id: "EMP-451", doj: "05 Nov 2024", baseDays: 30, payDays: 26, ctc: 800000, monthlyGross: 66666.67, proRata: 57777.78 },
    { emp: "Anita Desai", id: "EMP-452", doj: "25 Nov 2024", baseDays: 30, payDays: 6, ctc: 1500000, monthlyGross: 125000, proRata: 25000.00 },
];

function PayableDaysCell({ row }: { row: JoinerRow }) {
    return (
        <Badge variant="success">
            {row.payDays} / {row.baseDays}
        </Badge>
    );
}

function DojCell({ row }: { row: JoinerRow }) {
    return (
        <div className="flex items-center gap-1.5 text-sm text-white">
            <Calendar size={13} className="text-[#8899AA]" aria-hidden="true" /> {row.doj}
        </div>
    );
}

const COLUMNS: Column<JoinerRow>[] = [
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
        key: "doj",
        label: "Date of Joining",
        render: (r) => <DojCell row={r} />,
    },
    {
        key: "payDays",
        label: "Payable Days",
        align: "center",
        render: (r) => <PayableDaysCell row={r} />,
    },
    {
        key: "gross",
        label: "Standard Gross",
        align: "right",
        render: (r) => <span className="text-sm text-[#8899AA]">₹{r.monthlyGross.toLocaleString()}</span>,
        hideOnMobile: true,
    },
    {
        key: "proRata",
        label: "Pro-Rated Gross",
        align: "right",
        render: (r) => <span className="text-sm font-bold text-white">₹{r.proRata.toFixed(2)}</span>,
        sortable: true,
        sortValue: (r) => r.proRata,
    },
    {
        key: "action",
        label: "",
        align: "right",
        render: () => (
            <Button variant="secondary" size="sm">View Breakup</Button>
        ),
    },
];

export default function MidMonthJoinerPreview() {
    return (
        <Page
            title="Mid-Month Joiners & Leavers"
            subtitle="Verify pro-rata salary logic for new hires and exited employees in Nov 2024 cycle."
            breadcrumbs={[
                { label: "Payroll", href: "/payroll" },
                { label: "Reports" },
                { label: "Joiners" },
            ]}
            maxWidth="1200px"
            actions={
                <Button variant="secondary" icon={<Download size={14} aria-hidden="true" />}>
                    Export Preview
                </Button>
            }
        >
            <div className="space-y-6">
                {/* KPI Cards */}
                <div className="grid gap-4 sm:grid-cols-3">
                    <Card>
                        <div className="mb-2 flex items-center gap-2">
                            <Users size={16} className="text-[#00E5A0]" aria-hidden="true" />
                            <p className="text-sm text-[#8899AA]">New Joiners (Pro-Rata)</p>
                        </div>
                        <p className="text-2xl font-bold text-white">12</p>
                    </Card>
                    <Card>
                        <div className="mb-2 flex items-center gap-2">
                            <Users size={16} className="text-[#FFB800]" aria-hidden="true" />
                            <p className="text-sm text-[#8899AA]">Exited Employees</p>
                        </div>
                        <p className="text-2xl font-bold text-white">4</p>
                    </Card>
                    <Card
                        variant="bare"
                        className="rounded-2xl border border-[rgba(0,102,255,0.2)] bg-[rgba(0,102,255,0.05)] p-5"
                    >
                        <div className="mb-2 flex items-center gap-2">
                            <HandCoins size={16} className="text-[#0066FF]" aria-hidden="true" />
                            <p className="text-sm text-[#8899AA]">Pro-Rata Strategy</p>
                        </div>
                        <p className="text-base font-semibold text-white">Actual Days (30 in Nov)</p>
                        <Link href="/payroll-settings/pro-rata" className="mt-1 block text-xs text-[#0066FF] hover:underline">
                            Change Settings →
                        </Link>
                    </Card>
                </div>

                {/* Joiners Table */}
                <Card padding="none">
                    <DataTable<JoinerRow>
                        data={JOINERS}
                        columns={COLUMNS}
                        rowKey={(r) => r.id}
                        searchable
                        searchPlaceholder="Search employee…"
                        aria-label="Mid-month joiners and leavers"
                        emptyTitle="No joiners found"
                        emptyDescription="No mid-month joiners or leavers for this cycle."
                    />
                </Card>
            </div>
        </Page>
    );
}
