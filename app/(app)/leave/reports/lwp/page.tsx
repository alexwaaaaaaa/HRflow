"use client";

import { AlertTriangle, Calendar, ChevronRight, Download } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

// ─────────────────────────────────────────────────────────────────────────────
// Types & static data
// ─────────────────────────────────────────────────────────────────────────────

type LWPStatus = "Deducted in Nov Payroll" | "Pending Deduction";

interface LWPRow {
    id: string;
    name: string;
    dept: string;
    dates: string;
    days: number;
    reason: string;
    status: LWPStatus;
}

const LWP_DATA: LWPRow[] = [
    { id: "EMP044", name: "Aditi Jain", dept: "Design", dates: "12 Nov - 14 Nov", days: 3, reason: "Sick leave exhausted.", status: "Deducted in Nov Payroll" },
    { id: "EMP108", name: "Suresh Kumar", dept: "Engineering", dates: "24 Oct", days: 1, reason: "Unapproved absence.", status: "Pending Deduction" },
];

const STATUS_VARIANT: Record<LWPStatus, "success" | "warning"> = {
    "Deducted in Nov Payroll": "success",
    "Pending Deduction": "warning",
};

const SUMMARY_CARDS = [
    { label: "Total LWP Days (MTD)", value: "18 Days", variant: "danger" as const },
    { label: "Affected Employees", value: "7 People", variant: "neutral" as const },
    { label: "Pending Deductions", value: "4 Cases", variant: "warning" as const },
];

// ─────────────────────────────────────────────────────────────────────────────
// Cell components (module scope)
// ─────────────────────────────────────────────────────────────────────────────

function EmployeeCell({ row }: { row: LWPRow }) {
    return (
        <div>
            <p className="text-base font-bold text-white">{row.name}</p>
            <p className="text-xs text-[#8899AA]">{row.id} · {row.dept}</p>
        </div>
    );
}

function DatesCell({ row }: { row: LWPRow }) {
    return (
        <div className="flex items-center gap-2 font-bold text-white">
            <Calendar size={14} className="text-[#0066FF]" aria-hidden="true" />
            {row.dates}
        </div>
    );
}

function ActionsCell() {
    return (
        <Button
            variant="ghost"
            size="sm"
            iconRight={<ChevronRight size={16} aria-hidden="true" />}
        >
            View Details
        </Button>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Columns
// ─────────────────────────────────────────────────────────────────────────────

const COLUMNS: Column<LWPRow>[] = [
    {
        key: "employee",
        label: "Employee",
        render: (r) => <EmployeeCell row={r} />,
        sortable: true,
        sortValue: (r) => r.name,
    },
    {
        key: "dates",
        label: "LWP Dates",
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
        label: "Reason / Origin",
        render: (r) => (
            <span className="max-w-[200px] truncate text-sm text-[#8899AA]" title={r.reason}>
                {r.reason}
            </span>
        ),
    },
    {
        key: "status",
        label: "Payroll Status",
        render: (r) => <Badge variant={STATUS_VARIANT[r.status]}>{r.status}</Badge>,
    },
    {
        key: "actions",
        label: "",
        align: "right",
        render: () => <ActionsCell />,
    },
];

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function LWPDetailPage() {
    return (
        <Page
            title="Leave Without Pay (LWP) Details"
            subtitle="Track absences that result in pay deduction and ensure they are synced with payroll"
            breadcrumbs={[
                { label: "Leave", href: "/leave/dashboard" },
                { label: "Reports", href: "/leave/reports" },
                { label: "LWP" },
            ]}
            maxWidth="1200px"
            actions={
                <Button variant="secondary" icon={<Download size={14} aria-hidden="true" />}>
                    Export LWP Data
                </Button>
            }
        >
            <div className="space-y-6">
                {/* Summary cards */}
                <div className="grid gap-4 sm:grid-cols-3">
                    {SUMMARY_CARDS.map((c) => (
                        <Card key={c.label} padding="md">
                            <div className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#8899AA]">
                                {c.variant === "danger" && <AlertTriangle size={14} aria-hidden="true" />}
                                {c.label}
                            </div>
                            <p className="text-4xl font-black text-white">{c.value}</p>
                        </Card>
                    ))}
                </div>

                {/* Data table */}
                <Card padding="none">
                    <DataTable<LWPRow>
                        data={LWP_DATA}
                        columns={COLUMNS}
                        rowKey={(r) => r.id}
                        searchable
                        searchPlaceholder="Search employee…"
                        aria-label="Leave without pay records"
                        emptyTitle="No LWP records"
                        emptyDescription="No leave without pay instances found for the selected period."
                    />
                </Card>
            </div>
        </Page>
    );
}
