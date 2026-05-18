"use client";

import { AlertTriangle, Calendar, CreditCard, Download } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

// ─────────────────────────────────────────────────────────────────────────────
// Types & static data
// ─────────────────────────────────────────────────────────────────────────────

type LOPStatus = "Pending Deduction" | "Processed (Oct)";

interface LOPRow {
    id: string;
    name: string;
    dept: string;
    dates: string;
    days: number;
    reason: string;
    amount: string;
    status: LOPStatus;
}

const LOP_DATA: LOPRow[] = [
    { id: "EMP044", name: "Aditi Jain", dept: "Design", dates: "12 Nov - 14 Nov", days: 3, reason: "Leave balance exhausted", amount: "₹4,500", status: "Pending Deduction" },
    { id: "EMP108", name: "Suresh Kumar", dept: "Engineering", dates: "24 Oct", days: 1, reason: "Unapproved absence leading to LOP", amount: "₹1,500", status: "Processed (Oct)" },
    { id: "EMP212", name: "Vikram Singh", dept: "Sales", dates: "05 Nov - 08 Nov", days: 4, reason: "Extended unapproved leave", amount: "₹6,000", status: "Pending Deduction" },
];

const STATUS_VARIANT: Record<LOPStatus, "warning" | "success"> = {
    "Pending Deduction": "warning",
    "Processed (Oct)": "success",
};

const SUMMARY_CARDS = [
    { label: "Total LOP Days (YTD)", value: "42 Days", variant: "danger" as const },
    { label: "Pending Deductions", value: "12 Cases", variant: "warning" as const },
    { label: "Estimated Recovery", value: "₹1.2L", variant: "neutral" as const },
    { label: "Processed (Last Month)", value: "₹85K", variant: "success" as const },
];

// ─────────────────────────────────────────────────────────────────────────────
// Cell components (module scope)
// ─────────────────────────────────────────────────────────────────────────────

function EmployeeCell({ row }: { row: LOPRow }) {
    return (
        <div>
            <p className="text-base font-bold text-white">{row.name}</p>
            <p className="text-xs text-[#8899AA]">{row.id} · {row.dept}</p>
        </div>
    );
}

function DatesCell({ row }: { row: LOPRow }) {
    return (
        <div className="flex items-center gap-2 font-bold text-white">
            <Calendar size={14} className="text-[#0066FF]" aria-hidden="true" />
            {row.dates}
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Columns
// ─────────────────────────────────────────────────────────────────────────────

const COLUMNS: Column<LOPRow>[] = [
    {
        key: "employee",
        label: "Employee",
        render: (r) => <EmployeeCell row={r} />,
        sortable: true,
        sortValue: (r) => r.name,
    },
    {
        key: "dates",
        label: "LOP Dates",
        render: (r) => <DatesCell row={r} />,
    },
    {
        key: "days",
        label: "Days",
        align: "center",
        render: (r) => <span className="text-lg font-black text-[#FF4444]">{r.days}</span>,
        sortable: true,
        sortValue: (r) => r.days,
    },
    {
        key: "reason",
        label: "Reason",
        render: (r) => (
            <span className="max-w-[200px] truncate text-sm text-[#8899AA]" title={r.reason}>
                {r.reason}
            </span>
        ),
    },
    {
        key: "amount",
        label: "Deduction Amount",
        align: "right",
        render: (r) => <span className="font-black text-white">{r.amount}</span>,
        sortable: true,
        sortValue: (r) => r.amount,
    },
    {
        key: "status",
        label: "Status",
        render: (r) => <Badge variant={STATUS_VARIANT[r.status]}>{r.status}</Badge>,
    },
];

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function LOPDetailPage() {
    return (
        <Page
            title="Loss of Pay (LOP) Details"
            subtitle="Track and manage salary deductions due to unapproved absences or exhausted leave balances"
            breadcrumbs={[
                { label: "Leave", href: "/leave/dashboard" },
                { label: "Reports", href: "/leave/reports" },
                { label: "LOP" },
            ]}
            maxWidth="1200px"
            actions={
                <>
                    <Button variant="secondary" icon={<Download size={14} aria-hidden="true" />}>
                        Export Data
                    </Button>
                    <Button icon={<CreditCard size={14} aria-hidden="true" />}>
                        Sync with Payroll
                    </Button>
                </>
            }
        >
            <div className="space-y-6">
                {/* Summary cards */}
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                    {SUMMARY_CARDS.map((c) => (
                        <Card key={c.label} padding="md">
                            <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8899AA]">
                                {c.variant === "danger" && <AlertTriangle size={14} aria-hidden="true" />}
                                {c.label}
                            </div>
                            <Badge variant={c.variant} className="text-2xl font-black">{c.value}</Badge>
                        </Card>
                    ))}
                </div>

                {/* Data table */}
                <Card padding="none">
                    <DataTable<LOPRow>
                        data={LOP_DATA}
                        columns={COLUMNS}
                        rowKey={(r) => r.id}
                        searchable
                        searchPlaceholder="Search by name, ID, or reason…"
                        aria-label="Loss of pay records"
                        emptyTitle="No LOP records"
                        emptyDescription="No loss of pay instances found for the selected period."
                    />
                </Card>
            </div>
        </Page>
    );
}
