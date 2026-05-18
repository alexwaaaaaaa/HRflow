"use client";

import { useState } from "react";
import { ChevronRight, UserPlus, UserMinus, AlertTriangle, ArrowRight, Save, Download } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";
import Stepper, { type StepItem } from "@/components/ui/Stepper";

// ─── Static config ────────────────────────────────────────────────────────────

const STEPS: readonly StepItem[] = [
    { id: "select-month", label: "Select Month" },
    { id: "attendance-lock", label: "Attendance Lock" },
    { id: "employee-summary", label: "Employee Summary" },
    { id: "review-gross", label: "Review Gross" },
    { id: "review-deductions", label: "Review Deductions" },
    { id: "review-net", label: "Review Net" },
    { id: "approve", label: "Approve" },
    { id: "disburse", label: "Disburse" },
] as const;

interface EmpRow {
    id: string;
    name: string;
    dept: string;
    type: "Regular" | "New Joiner" | "Exit";
    status: string;
    lwp: number;
    remarks: string;
}

const EMPLOYEES: EmpRow[] = [
    { id: "EMP-042", name: "Ravi Shankar", dept: "Engineering", type: "Regular", status: "Active", lwp: 0, remarks: "—" },
    { id: "EMP-045", name: "Sneha Patil", dept: "Sales", type: "Regular", status: "Active", lwp: 2, remarks: "Auto LOP (2 days)" },
    { id: "EMP-821", name: "Anil Desai", dept: "Operations", type: "New Joiner", status: "Joined 12 Nov", lwp: 0, remarks: "Pro-rata (19 days)" },
    { id: "EMP-824", name: "Pooja Sharma", dept: "HR", type: "New Joiner", status: "Joined 18 Nov", lwp: 0, remarks: "Pro-rata (13 days)" },
    { id: "EMP-018", name: "Vikram Singh", dept: "Engineering", type: "Exit", status: "Last Working: 05 Nov", lwp: 0, remarks: "FnF Process Flow" },
];

const TYPE_VARIANT = {
    Regular: "neutral",
    "New Joiner": "info",
    Exit: "danger",
} as const;

// ─── Module-scope subcomponents ───────────────────────────────────────────────

function EmployeeCell({ row }: { row: EmpRow }) {
    return (
        <div>
            <p className="text-sm font-medium text-white">{row.name}</p>
            <p className="text-xs text-[#8899AA]">{row.id} · {row.dept}</p>
        </div>
    );
}

function CategoryCell({ row }: { row: EmpRow }) {
    return <Badge variant={TYPE_VARIANT[row.type]}>{row.type}</Badge>;
}

function StatusCell({ row }: { row: EmpRow }) {
    return (
        <span className={`text-sm ${row.status === "Active" ? "text-[#00E5A0]" : "text-[#FFB800]"}`}>
            {row.status}
        </span>
    );
}

function LwpCell({ row, editLWP, setEditLWP }: { row: EmpRow; editLWP: string | null; setEditLWP: (id: string | null) => void }) {
    if (editLWP === row.id) {
        return (
            <div className="flex items-center gap-2">
                <input
                    type="number"
                    defaultValue={row.lwp}
                    aria-label={`LWP days for ${row.name}`}
                    className="h-8 w-16 rounded border border-[#00E5A0] bg-[#060B14] px-2 text-sm text-white outline-none"
                    autoFocus
                />
                <Button
                    variant="ghost"
                    size="sm"
                    icon={<Save size={14} aria-hidden="true" />}
                    aria-label="Save LWP"
                    onClick={() => setEditLWP(null)}
                />
            </div>
        );
    }
    return (
        <div className="flex items-center gap-2">
            <span className={`text-sm ${row.lwp > 0 ? "font-semibold text-red-400" : "text-white"}`}>
                {row.lwp} days
            </span>
            {row.type !== "Exit" && (
                <Button variant="ghost" size="sm" onClick={() => setEditLWP(row.id)}>
                    Edit
                </Button>
            )}
        </div>
    );
}

function ActionCell({ row }: { row: EmpRow }) {
    if (row.type === "Exit") {
        return (
            <Button variant="danger" size="sm" href="/payroll/fnf">Go to FnF</Button>
        );
    }
    return (
        <Button variant="ghost" size="sm" iconRight={<ArrowRight size={13} aria-hidden="true" />} className="text-red-400">
            Exclude
        </Button>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function EmployeeSummary() {
    const [editLWP, setEditLWP] = useState<string | null>(null);

    const columns: Column<EmpRow>[] = [
        {
            key: "employee",
            label: "Employee Info",
            render: (r) => <EmployeeCell row={r} />,
            sortable: true,
            sortValue: (r) => r.name,
        },
        {
            key: "category",
            label: "Category",
            render: (r) => <CategoryCell row={r} />,
        },
        {
            key: "status",
            label: "Status for Nov",
            render: (r) => <StatusCell row={r} />,
        },
        {
            key: "lwp",
            label: "LWP / LOP Days",
            render: (r) => <LwpCell row={r} editLWP={editLWP} setEditLWP={setEditLWP} />,
        },
        {
            key: "remarks",
            label: "Remarks",
            render: (r) => <span className="text-sm text-[#8899AA]">{r.remarks}</span>,
            hideOnMobile: true,
        },
        {
            key: "actions",
            label: "",
            align: "right",
            render: (r) => <ActionCell row={r} />,
        },
    ];

    return (
        <Page
            title="Run payroll"
            subtitle="Step 3 of 8 — employee count & LWP summary"
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Payroll", href: "/payroll" },
                { label: "Employee Summary" },
            ]}
            maxWidth="1200px"
        >
            <div className="space-y-6">
                {/* Wizard stepper */}
                <Card padding="md">
                    <Stepper steps={STEPS} current={2} ariaLabel="Payroll run progress" />
                </Card>

                <h2 className="text-xl font-semibold text-white">Step 3: Employee Count & LWP Summary</h2>
                <p className="text-sm text-[#8899AA]">Review the final list of employees to be processed for November 2024.</p>

                {/* KPI Cards */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <p className="text-sm text-[#8899AA]">Total for Processing</p>
                        <p className="mt-2 text-2xl font-bold text-white">847</p>
                        <p className="mt-1 flex items-center gap-1 text-xs text-[#00E5A0]">
                            <UserPlus size={13} aria-hidden="true" /> 12 new vs last month
                        </p>
                    </Card>
                    <Card>
                        <p className="text-sm text-[#8899AA]">Mid-month Joiners</p>
                        <p className="mt-2 text-2xl font-bold text-white">12</p>
                        <p className="mt-1 flex items-center gap-1 text-xs text-[#FFB800]">
                            <AlertTriangle size={13} aria-hidden="true" /> Subject to Pro-rata
                        </p>
                    </Card>
                    <Card>
                        <p className="text-sm text-[#8899AA]">Exits (Not Processed)</p>
                        <p className="mt-2 text-2xl font-bold text-white">3</p>
                        <p className="mt-1 flex items-center gap-1 text-xs text-[#8899AA]">
                            <UserMinus size={13} aria-hidden="true" /> Processed via FnF Module
                        </p>
                    </Card>
                    <Card>
                        <p className="text-sm text-[#8899AA]">Total LWP/LOP Days</p>
                        <p className="mt-2 text-2xl font-bold text-red-400">115</p>
                        <p className="mt-1 flex items-center gap-1 text-xs text-[#8899AA]">
                            <AlertTriangle size={13} className="text-red-400" aria-hidden="true" /> Over 47 employees
                        </p>
                    </Card>
                </div>

                {/* Employee Table */}
                <Card padding="none">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1A2A3A] px-6 py-4">
                        <div className="flex gap-2">
                            <Badge variant="neutral">All (847)</Badge>
                            <Badge variant="info">New Joiners (12)</Badge>
                            <Badge variant="warning">With LOP (47)</Badge>
                        </div>
                        <Button variant="secondary" size="sm" icon={<Download size={12} aria-hidden="true" />}>
                            Export List
                        </Button>
                    </div>
                    <DataTable<EmpRow>
                        data={EMPLOYEES}
                        columns={columns}
                        rowKey={(r) => r.id}
                        searchable
                        searchPlaceholder="Search by name or ID…"
                        aria-label="Employee summary for payroll"
                        emptyTitle="No employees found"
                        emptyDescription="No employees match your search."
                    />
                    <div className="flex items-center justify-between border-t border-[#1A2A3A] bg-[#0A1420] px-6 py-3 text-sm text-[#8899AA]">
                        <span>Showing 1–5 of 847 employees</span>
                    </div>
                </Card>

                {/* Bottom nav */}
                <div className="flex flex-col-reverse gap-3 border-t border-[#1A2A3A] pt-6 sm:flex-row sm:justify-between">
                    <Button variant="outline" size="lg" href="/payroll/run/attendance-lock">Back</Button>
                    <div className="flex gap-3">
                        <Button variant="secondary" size="lg" icon={<Save size={16} aria-hidden="true" />}>
                            Save Draft
                        </Button>
                        <Button size="lg" iconRight={<ChevronRight size={16} aria-hidden="true" />} href="/payroll/run/review-gross">
                            Next: Review Gross Salary
                        </Button>
                    </div>
                </div>
            </div>
        </Page>
    );
}
