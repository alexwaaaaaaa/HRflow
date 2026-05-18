"use client";

import Link from "next/link";
import { UserMinus, Calculator, CheckCircle2, ArrowRight, HandCoins } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

interface FnfRow {
    emp: string;
    id: string;
    exitDate: string;
    exitType: "Resignation" | "Termination" | "End of Contract";
    clearance: number;
    status: string;
}

const FNF_ROWS: FnfRow[] = [
    { emp: "Neha Gupta", id: "EMP-410", exitDate: "30 Oct 2024", exitType: "Resignation", clearance: 100, status: "Ready" },
    { emp: "Rajeev Singh", id: "EMP-502", exitDate: "15 Oct 2024", exitType: "Termination", clearance: 100, status: "Ready" },
    { emp: "Anita Desai", id: "EMP-315", exitDate: "10 Nov 2024", exitType: "Resignation", clearance: 75, status: "Pending IT Clearance" },
    { emp: "Suresh Pillai", id: "EMP-288", exitDate: "05 Nov 2024", exitType: "End of Contract", clearance: 50, status: "Pending Manager Clearance" },
];

const EXIT_TYPE_VARIANT = {
    Resignation: "neutral",
    Termination: "danger",
    "End of Contract": "info",
} as const;

const COLUMNS: Column<FnfRow>[] = [
    {
        key: "employee",
        label: "Employee",
        render: (r) => (
            <div>
                <p className="font-semibold text-white">{r.emp}</p>
                <p className="text-xs text-[#8899AA]">{r.id}</p>
            </div>
        ),
        sortable: true,
        sortValue: (r) => r.emp,
    },
    {
        key: "exit",
        label: "Exit Date & Type",
        render: (r) => (
            <div>
                <p className="text-sm text-white">{r.exitDate}</p>
                <Badge variant={EXIT_TYPE_VARIANT[r.exitType]}>{r.exitType}</Badge>
            </div>
        ),
    },
    {
        key: "clearance",
        label: "Clearance Status",
        render: (r) => (
            <div>
                <div className="mb-1.5 flex items-center gap-2">
                    <div className="h-1.5 flex-1 rounded-full bg-[#1A2A3A]">
                        <div
                            className="h-1.5 rounded-full transition-all"
                            style={{
                                width: `${r.clearance}%`,
                                background: r.clearance === 100 ? "#00E5A0" : "#FFB800",
                            }}
                        />
                    </div>
                    <span className={`text-xs font-semibold ${r.clearance === 100 ? "text-[#00E5A0]" : "text-[#FFB800]"}`}>
                        {r.clearance}%
                    </span>
                </div>
                <p className="text-xs text-[#8899AA]">{r.status}</p>
            </div>
        ),
    },
    {
        key: "action",
        label: "Action",
        render: (r) => (
            r.clearance === 100 ? (
                <Link href="/payroll/fnf/process">
                    <Button variant="outline" size="sm" iconRight={<ArrowRight size={12} aria-hidden="true" />}>
                        Process F&amp;F
                    </Button>
                </Link>
            ) : (
                <Button size="sm" disabled>
                    Awaiting Clearance
                </Button>
            )
        ),
    },
];

export default function FnfSettlement() {
    return (
        <Page
            title="Full & Final (F&F) Settlement"
            subtitle="Initiate and manage terminal payouts for exited employees."
            breadcrumbs={[
                { label: "Payroll", href: "/payroll" },
                { label: "F&F Settlement" },
            ]}
            maxWidth="1000px"
            actions={
                <Button icon={<UserMinus size={16} aria-hidden="true" />} href="/payroll/fnf/process">Initiate New F&amp;F</Button>
            }
        >
            <div className="space-y-6">
                {/* KPI Cards */}
                <div className="grid gap-6 sm:grid-cols-2">
                    <Card>
                        <div className="flex items-center gap-5">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[rgba(255,184,0,0.1)]">
                                <Calculator size={24} className="text-[#FFB800]" aria-hidden="true" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-white">4</p>
                                <p className="text-sm text-[#8899AA]">Pending F&amp;F Processing</p>
                            </div>
                        </div>
                    </Card>
                    <Card>
                        <div className="flex items-center gap-5">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[rgba(0,229,160,0.1)]">
                                <CheckCircle2 size={24} className="text-[#00E5A0]" aria-hidden="true" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-white">12</p>
                                <p className="text-sm text-[#8899AA]">F&amp;F Processed This Fiscal Year</p>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Pending Settlements Table */}
                <Card padding="none" aria-labelledby="pending-fnf-heading">
                    <div className="border-b border-[#1A2A3A] px-6 py-4">
                        <h2 id="pending-fnf-heading" className="text-base font-semibold text-white">
                            Pending Settlements
                        </h2>
                    </div>
                    <DataTable<FnfRow>
                        data={FNF_ROWS}
                        columns={COLUMNS}
                        rowKey={(r) => r.id}
                        searchable
                        searchPlaceholder="Search exited employee…"
                        aria-label="Pending F&F settlements"
                        emptyTitle="No pending settlements"
                        emptyDescription="All F&F settlements have been processed."
                    />
                </Card>

                {/* Info Banner */}
                <Card
                    variant="bare"
                    className="rounded-2xl border border-dashed border-[rgba(0,102,255,0.3)] bg-[rgba(0,102,255,0.05)] p-6"
                >
                    <div className="flex items-start gap-4">
                        <HandCoins size={24} className="shrink-0 text-[#0066FF]" aria-hidden="true" />
                        <div>
                            <p className="mb-1 text-sm font-semibold text-white">Standard F&amp;F Inclusions</p>
                            <p className="text-sm leading-relaxed text-[#8899AA]">
                                The system automatically calculates Gratuity (if tenure &gt; 5 years), Leave Encashment balance, Notice Pay recovery/payout, and pending variables. Make sure Exit Clearances from Admin and IT are completed.
                            </p>
                        </div>
                    </div>
                </Card>
            </div>
        </Page>
    );
}
