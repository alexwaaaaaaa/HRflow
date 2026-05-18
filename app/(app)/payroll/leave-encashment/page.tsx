"use client";

import { Coins, TrendingDown, BookOpen, AlertCircle, ArrowRight } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

interface EncashmentRow {
    id: string;
    name: string;
    type: string;
    days: number;
    per: number;
    gross: number;
    exempt: number;
    tax: number;
    tds: number;
    st: string;
}

const ROWS: EncashmentRow[] = [
    { id: "EMP001", name: "Rajesh Kumar", type: "PL", days: 10, per: 1538, gross: 15380, exempt: 0, tax: 15380, tds: 3076, st: "Service" },
    { id: "EMP002", name: "Priya Sharma", type: "PL", days: 30, per: 1077, gross: 32308, exempt: 25000, tax: 7308, tds: 1462, st: "Retirement" },
    { id: "EMP093", name: "Amit Verma", type: "EL", days: 15, per: 1346, gross: 20192, exempt: 0, tax: 20192, tds: 4038, st: "Service" },
    { id: "EMP014", name: "Vikram Mehta", type: "PL", days: 45, per: 1731, gross: 77885, exempt: 77885, tax: 0, tds: 0, st: "Resignation" },
    { id: "EMP112", name: "Neha Singh", type: "PL", days: 5, per: 962, gross: 4808, exempt: 0, tax: 4808, tds: 481, st: "Service" },
    { id: "EMP205", name: "Ravi Shankar", type: "EL", days: 12, per: 1154, gross: 13846, exempt: 0, tax: 13846, tds: 1385, st: "Service" },
    { id: "EMP268", name: "Anita Desai", type: "PL", days: 20, per: 1231, gross: 24615, exempt: 0, tax: 24615, tds: 2462, st: "Service" },
    { id: "EMP342", name: "Suresh Babu", type: "PL", days: 60, per: 2558, gross: 153462, exempt: 153462, tax: 0, tds: 0, st: "Retirement" },
];

const COLUMNS: Column<EncashmentRow>[] = [
    {
        key: "employee",
        label: "Employee",
        render: (r) => (
            <div>
                <p className="font-medium text-white">{r.name}</p>
                <p className="text-xs text-[#8899AA]">{r.id} · {r.st}</p>
            </div>
        ),
        sortable: true,
        sortValue: (r) => r.name,
    },
    {
        key: "type",
        label: "Type",
        render: (r) => <Badge variant="neutral">{r.type}</Badge>,
    },
    {
        key: "days",
        label: "Days",
        align: "center",
        render: (r) => <span className="font-semibold text-white">{r.days}</span>,
    },
    {
        key: "per",
        label: "Per Day (₹)",
        align: "right",
        render: (r) => <span className="text-sm text-[#8899AA]">{r.per.toLocaleString()}</span>,
        hideOnMobile: true,
    },
    {
        key: "gross",
        label: "Gross (₹)",
        align: "right",
        render: (r) => <span className="font-medium text-white">{r.gross.toLocaleString()}</span>,
    },
    {
        key: "exempt",
        label: "Sec 10(10AA) Exempt (₹)",
        align: "right",
        render: (r) => (
            <span className={r.exempt > 0 ? "text-[#FFB800]" : "text-[#8899AA]"}>
                {r.exempt.toLocaleString()}
            </span>
        ),
        hideOnMobile: true,
    },
    {
        key: "tds",
        label: "TDS (₹)",
        align: "right",
        render: (r) => (
            <span className={r.tds > 0 ? "text-red-400" : "text-[#8899AA]"}>
                -{r.tds.toLocaleString()}
            </span>
        ),
    },
    {
        key: "net",
        label: "Net Payout (₹)",
        align: "right",
        render: (r) => <span className="font-semibold text-[#00E5A0]">{(r.gross - r.tds).toLocaleString()}</span>,
    },
];

const totalTds = ROWS.reduce((s, r) => s + r.tds, 0);
const totalNet = ROWS.reduce((s, r) => s + (r.gross - r.tds), 0);
const totalGross = ROWS.reduce((s, r) => s + r.gross, 0);

export default function LeaveEncashmentPage() {
    return (
        <Page
            title="Leave Encashment — Payroll Processing"
            subtitle="March 2025 · Process approved leave encashment requests with automatic Section 10(10AA) tax exemption."
            breadcrumbs={[
                { label: "Payroll", href: "/payroll" },
                { label: "Leave Encashment" },
            ]}
            maxWidth="1200px"
            actions={
                <Button iconRight={<ArrowRight size={14} aria-hidden="true" />}>
                    Include in March 2025 Payroll
                </Button>
            }
        >
            <div className="space-y-6">
                {/* KPI Cards */}
                <div className="grid gap-4 sm:grid-cols-3">
                    <Card>
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#1A2A3A]">
                                <BookOpen size={22} className="text-[#8899AA]" aria-hidden="true" />
                            </div>
                            <div>
                                <p className="text-sm text-[#8899AA]">Approved Requests</p>
                                <p className="mt-1 text-2xl font-semibold text-white">8</p>
                            </div>
                        </div>
                    </Card>
                    <Card>
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[rgba(255,184,0,0.1)]">
                                <TrendingDown size={22} className="text-[#FFB800]" aria-hidden="true" />
                            </div>
                            <div>
                                <p className="text-sm text-[#8899AA]">Total Tax Deducted (TDS)</p>
                                <p className="mt-1 text-2xl font-semibold text-white">₹{totalTds.toLocaleString()}</p>
                            </div>
                        </div>
                    </Card>
                    <Card>
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[rgba(0,229,160,0.1)]">
                                <Coins size={22} className="text-[#00E5A0]" aria-hidden="true" />
                            </div>
                            <div>
                                <p className="text-sm text-[#8899AA]">Total Net Payout</p>
                                <p className="mt-1 text-2xl font-semibold text-[#00E5A0]">₹{totalNet.toLocaleString()}</p>
                                <p className="text-xs text-[#8899AA]">Gross: ₹{totalGross.toLocaleString()}</p>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Exemption Note */}
                <Card
                    variant="bare"
                    className="rounded-2xl border-l-4 border-[#00E5A0] bg-[#1A2A3A] p-5"
                >
                    <div className="flex items-start gap-3">
                        <AlertCircle size={20} className="mt-0.5 shrink-0 text-[#00E5A0]" aria-hidden="true" />
                        <div>
                            <h4 className="mb-1.5 text-sm font-semibold text-white">
                                Section 10(10AA) Income Tax Exemption
                            </h4>
                            <p className="text-sm leading-relaxed text-[#8899AA]">
                                The maximum limit for leave encashment exemption for non-government employees is ₹25,00,000 (lifetime cap). Per-day salary calculation formula used is:{" "}
                                <strong className="text-white">Monthly Basic ÷ 26 Days</strong>. Leave encashment during employment (i.e. not at retirement) is fully taxable in the hands of the employee.
                            </p>
                        </div>
                    </div>
                </Card>

                {/* Table */}
                <Card padding="none">
                    <DataTable<EncashmentRow>
                        data={ROWS}
                        columns={COLUMNS}
                        rowKey={(r) => r.id}
                        aria-label="Leave encashment processing"
                        emptyTitle="No encashment requests"
                        emptyDescription="No approved leave encashment requests found."
                    />
                </Card>
            </div>
        </Page>
    );
}
