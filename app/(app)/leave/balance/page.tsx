"use client";

import { Download, Edit2, History, Plus } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import DataTable, { type Column } from "@/components/ui/DataTable";

// ─────────────────────────────────────────────────────────────────────────────
// Types & static data
// ─────────────────────────────────────────────────────────────────────────────

interface BalanceRow {
    id: string;
    name: string;
    dept: string;
    el: number;
    sl: number;
    cl: number;
    total: number;
}

const DATA: BalanceRow[] = [
    { id: "EMP042", name: "Arjun Mehta", dept: "Product", el: 14.5, sl: 8, cl: 5, total: 27.5 },
    { id: "EMP124", name: "Rohan Sharma", dept: "Engineering", el: 6, sl: 12, cl: 2, total: 20 },
    { id: "EMP089", name: "Priya Nair", dept: "HR", el: 22, sl: 4, cl: 7, total: 33 },
    { id: "EMP201", name: "David Chen", dept: "Sales", el: 1.5, sl: 0, cl: 1, total: 2.5 },
];

// ─────────────────────────────────────────────────────────────────────────────
// Cell components (module scope)
// ─────────────────────────────────────────────────────────────────────────────

function EmployeeCell({ row }: { row: BalanceRow }) {
    return (
        <div>
            <p className="font-bold text-white">{row.name}</p>
            <p className="text-xs text-[#8899AA]">{row.id} · {row.dept}</p>
        </div>
    );
}

function BalanceCell({ value, highlight }: { value: number; highlight?: boolean }) {
    return (
        <span className={`font-mono text-base font-bold ${highlight ? "text-[#00E5A0]" : value === 0 ? "text-[#FF4444]" : "text-white"}`}>
            {value}
        </span>
    );
}

function ActionsCell({ row }: { row: BalanceRow }) {
    return (
        <div className="flex justify-end gap-2">
            <Button
                variant="ghost"
                size="sm"
                icon={<Edit2 size={16} aria-hidden="true" />}
                aria-label={`Adjust balance for ${row.name}`}
            />
            <Button
                variant="ghost"
                size="sm"
                icon={<History size={16} aria-hidden="true" />}
                aria-label={`View history for ${row.name}`}
            />
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Columns
// ─────────────────────────────────────────────────────────────────────────────

const COLUMNS: Column<BalanceRow>[] = [
    {
        key: "employee",
        label: "Employee Details",
        render: (row) => <EmployeeCell row={row} />,
        sortable: true,
        sortValue: (row) => row.name,
    },
    {
        key: "el",
        label: "EL (Earned)",
        align: "center",
        render: (row) => <BalanceCell value={row.el} />,
        sortable: true,
        sortValue: (row) => row.el,
    },
    {
        key: "sl",
        label: "SL (Sick)",
        align: "center",
        render: (row) => <BalanceCell value={row.sl} />,
        sortable: true,
        sortValue: (row) => row.sl,
    },
    {
        key: "cl",
        label: "CL (Casual)",
        align: "center",
        render: (row) => <BalanceCell value={row.cl} />,
        sortable: true,
        sortValue: (row) => row.cl,
    },
    {
        key: "total",
        label: "Total Available",
        align: "center",
        render: (row) => <BalanceCell value={row.total} highlight />,
        sortable: true,
        sortValue: (row) => row.total,
    },
    {
        key: "actions",
        label: "Manage",
        align: "right",
        render: (row) => <ActionsCell row={row} />,
    },
];

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function LeaveBalancePage() {
    return (
        <Page
            title="Employee Leave Balances"
            subtitle="View and manage available leave balances across the organization"
            breadcrumbs={[
                { label: "Leave", href: "/leave/dashboard" },
                { label: "Balances" },
            ]}
            maxWidth="1400px"
            actions={
                <>
                    <Button variant="secondary" icon={<Download size={14} aria-hidden="true" />}>
                        Export Data
                    </Button>
                    <Button icon={<Plus size={14} aria-hidden="true" />}>
                        Bulk Adjust
                    </Button>
                </>
            }
        >
            <Card padding="none">
                <DataTable<BalanceRow>
                    data={DATA}
                    columns={COLUMNS}
                    rowKey={(r) => r.id}
                    searchable
                    searchPlaceholder="Search by name or employee ID…"
                    aria-label="Employee leave balances"
                    emptyTitle="No employees found"
                    emptyDescription="Try adjusting your search query."
                />
            </Card>
        </Page>
    );
}
