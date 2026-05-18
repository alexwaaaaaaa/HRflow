"use client";

import { Check, Edit2, List, Plus, Settings, Trash2 } from "lucide-react";
import Page from "@/components/ui/Page";
import Card, { CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

// ─────────────────────────────────────────────────────────────────────────────
// Types & static data
// ─────────────────────────────────────────────────────────────────────────────

interface LeaveType {
    id: string;
    name: string;
    code: string;
    days: number;
    paid: boolean;
    gender: string;
    active: boolean;
}

const LEAVE_TYPES: LeaveType[] = [
    { id: "EL", name: "Privilege / Earned Leave", code: "EL", days: 15, paid: true, gender: "All", active: true },
    { id: "SL", name: "Sick Leave", code: "SL", days: 12, paid: true, gender: "All", active: true },
    { id: "CL", name: "Casual Leave", code: "CL", days: 7, paid: true, gender: "All", active: true },
    { id: "ML", name: "Maternity Leave", code: "ML", days: 180, paid: true, gender: "Female", active: true },
    { id: "PL", name: "Paternity Leave", code: "PL", days: 5, paid: true, gender: "Male", active: true },
    { id: "LWP", name: "Leave Without Pay", code: "LWP", days: 0, paid: false, gender: "All", active: true },
];

// ─────────────────────────────────────────────────────────────────────────────
// Cell components (module scope)
// ─────────────────────────────────────────────────────────────────────────────

function LeaveInfoCell({ row }: { row: LeaveType }) {
    return (
        <div>
            <p className="text-base font-bold text-white">{row.name}</p>
            {row.active && (
                <p className="mt-1 flex items-center gap-1 text-[10px] text-[#00E5A0]">
                    <Check size={10} aria-hidden="true" /> Active
                </p>
            )}
        </div>
    );
}

function CodeCell({ row }: { row: LeaveType }) {
    return (
        <span className="rounded border border-[#2A3A4A] bg-[#1A2A3A] px-2 py-1 font-mono text-xs font-bold text-white">
            {row.code}
        </span>
    );
}

function QuotaCell({ row }: { row: LeaveType }) {
    return row.days > 0 ? (
        <span className="text-lg font-black text-white">
            {row.days} <span className="text-xs font-bold text-[#8899AA]">days</span>
        </span>
    ) : (
        <span className="text-lg font-black capitalize text-[#556677]">N/A</span>
    );
}

function PaidCell({ row }: { row: LeaveType }) {
    return <Badge variant={row.paid ? "success" : "danger"}>{row.paid ? "Paid" : "Unpaid"}</Badge>;
}

function GenderCell({ row }: { row: LeaveType }) {
    return (
        <span className={`text-sm font-semibold ${row.gender === "All" ? "text-slate-300" : "text-[#0066FF]"}`}>
            {row.gender}
        </span>
    );
}

function ActionsCell() {
    return (
        <div className="flex justify-end gap-2">
            <Button
                variant="ghost"
                size="sm"
                icon={<Settings size={16} aria-hidden="true" />}
                aria-label="Configure leave type"
            />
            <Button
                variant="ghost"
                size="sm"
                icon={<Edit2 size={16} aria-hidden="true" />}
                aria-label="Edit leave type"
            />
            <Button
                variant="danger"
                size="sm"
                icon={<Trash2 size={16} aria-hidden="true" />}
                aria-label="Delete leave type"
            />
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Columns
// ─────────────────────────────────────────────────────────────────────────────

const COLUMNS: Column<LeaveType>[] = [
    {
        key: "info",
        label: "Leave Info",
        render: (r) => <LeaveInfoCell row={r} />,
        sortable: true,
        sortValue: (r) => r.name,
    },
    {
        key: "code",
        label: "Code",
        render: (r) => <CodeCell row={r} />,
    },
    {
        key: "quota",
        label: "Yearly Quota",
        align: "center",
        render: (r) => <QuotaCell row={r} />,
        sortable: true,
        sortValue: (r) => r.days,
    },
    {
        key: "paid",
        label: "Paid Status",
        render: (r) => <PaidCell row={r} />,
    },
    {
        key: "gender",
        label: "Applicable For",
        render: (r) => <GenderCell row={r} />,
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

export default function LeaveTypesPage() {
    return (
        <Page
            title="Leave Types"
            subtitle="Manage different categories of leaves available to employees in your organization"
            breadcrumbs={[
                { label: "Leave", href: "/leave/dashboard" },
                { label: "Settings" },
                { label: "Leave Types" },
            ]}
            maxWidth="1200px"
            actions={
                <Button icon={<Plus size={14} aria-hidden="true" />}>
                    Add Leave Type
                </Button>
            }
        >
            <Card padding="none">
                <CardHeader className="border-b border-[#1A2A3A] bg-[#0A1420] p-4">
                    <CardTitle className="flex items-center gap-2">
                        <List size={16} className="text-[#8899AA]" aria-hidden="true" />
                        Configured Leave Types ({LEAVE_TYPES.length})
                    </CardTitle>
                </CardHeader>
                <DataTable<LeaveType>
                    data={LEAVE_TYPES}
                    columns={COLUMNS}
                    rowKey={(r) => r.id}
                    aria-label="Leave types configuration"
                    emptyTitle="No leave types configured"
                    emptyDescription="Add your first leave type to get started."
                />
            </Card>
        </Page>
    );
}
