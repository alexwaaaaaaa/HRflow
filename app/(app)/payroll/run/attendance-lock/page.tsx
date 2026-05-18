"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, AlertTriangle, ChevronRight, ExternalLink } from "lucide-react";
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

interface SummaryRow {
    dept: string;
    emp: number;
    present: string;
    lop: number;
    ot: string;
    issues: number;
}

interface IssueRow {
    id: number;
    name: string;
    dept: string;
    issue: string;
    action: string;
}

const SUMMARY_DATA: SummaryRow[] = [
    { dept: "Engineering", emp: 320, present: "94.2%", lop: 42, ot: "186 hrs", issues: 2 },
    { dept: "Sales", emp: 180, present: "88.4%", lop: 28, ot: "0 hrs", issues: 5 },
    { dept: "Operations", emp: 172, present: "91.8%", lop: 31, ot: "94 hrs", issues: 0 },
    { dept: "Marketing", emp: 95, present: "96.1%", lop: 8, ot: "0 hrs", issues: 0 },
    { dept: "HR", emp: 42, present: "97.6%", lop: 2, ot: "0 hrs", issues: 0 },
    { dept: "Finance", emp: 38, present: "95.2%", lop: 4, ot: "0 hrs", issues: 0 },
];

const ISSUES: IssueRow[] = [
    { id: 1, name: "Amit Kumar", dept: "Sales", issue: "3 days absent, no leave applied", action: "View" },
    { id: 2, name: "Pradeep Singh", dept: "Engineering", issue: "Regularization pending (08/11)", action: "Resolve" },
    { id: 3, name: "Kavya Iyer", dept: "Engineering", issue: "OT hours not approved", action: "Approve" },
    { id: 4, name: "Rahul Sharma", dept: "Sales", issue: "Comp-off request pending", action: "Review" },
    { id: 5, name: "Priya Nair", dept: "Sales", issue: "Missing punch-out (02/11)", action: "Resolve" },
    { id: 6, name: "Vikram Reddy", dept: "Sales", issue: "Missing punch-out (03/11)", action: "Resolve" },
    { id: 7, name: "Sneha Rao", dept: "Sales", issue: "Missing punch-out (05/11)", action: "Resolve" },
];

// ─── Module-scope subcomponents ───────────────────────────────────────────────

function IssueCell({ row }: { row: IssueRow }) {
    return (
        <div>
            <div className="flex items-center gap-1.5 text-sm font-medium text-white">
                <AlertTriangle size={13} className="shrink-0 text-[#FFB800]" aria-hidden="true" />
                {row.name}
                <span className="text-xs text-[#445566]">({row.dept})</span>
            </div>
            <p className="mt-0.5 pl-5 text-xs text-[#8899AA]">{row.issue}</p>
        </div>
    );
}

function IssueActionCell({ row }: { row: IssueRow }) {
    return (
        <Button variant="ghost" size="sm" href="/attendance/reports">{row.action}</Button>
    );
}

const SUMMARY_COLUMNS: Column<SummaryRow>[] = [
    {
        key: "dept",
        label: "Department",
        render: (r) => <span className="text-sm font-medium text-white">{r.dept}</span>,
    },
    {
        key: "emp",
        label: "Employees",
        render: (r) => <span className="text-sm text-[#8899AA]">{r.emp}</span>,
    },
    {
        key: "present",
        label: "Avg Present %",
        render: (r) => <span className="text-sm text-white">{r.present}</span>,
    },
    {
        key: "lop",
        label: "LOP Days",
        render: (r) => (
            <span className={`text-sm font-medium ${r.lop > 10 ? "text-red-400" : "text-white"}`}>
                {r.lop}
            </span>
        ),
    },
    {
        key: "ot",
        label: "OT Hours",
        render: (r) => <span className="text-sm text-[#8899AA]">{r.ot}</span>,
    },
    {
        key: "issues",
        label: "Issues",
        render: (r) => (
            r.issues > 0 ? (
                <span className="flex items-center gap-1.5 text-sm font-semibold text-[#FFB800]">
                    <AlertTriangle size={13} aria-hidden="true" /> {r.issues} pending
                </span>
            ) : (
                <span className="text-sm text-[#00E5A0]">0</span>
            )
        ),
    },
];

const ISSUE_COLUMNS: Column<IssueRow>[] = [
    {
        key: "issue",
        label: "Issue",
        render: (r) => <IssueCell row={r} />,
    },
    {
        key: "action",
        label: "",
        align: "right",
        render: (r) => <IssueActionCell row={r} />,
    },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AttendanceLock() {
    const [locked, setLocked] = useState(true);

    return (
        <Page
            title="Run payroll"
            subtitle="Step 2 of 8 — attendance lock verification"
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Payroll", href: "/payroll" },
                { label: "Attendance Lock" },
            ]}
            maxWidth="1200px"
        >
            <div className="space-y-6">
                {/* Wizard stepper */}
                <Card padding="md">
                    <Stepper steps={STEPS} current={1} ariaLabel="Payroll run progress" />
                </Card>

                <h2 className="text-xl font-semibold text-white">Step 2: Attendance Lock Verification</h2>
                <p className="text-sm text-[#8899AA]">Confirm attendance data is final before payroll computation</p>

                {/* Lock status banner */}
                {locked ? (
                    <Card
                        variant="bare"
                        className="rounded-2xl border border-[rgba(0,229,160,0.3)] bg-[rgba(0,229,160,0.05)] p-5"
                    >
                        <div className="flex items-center gap-4">
                            <CheckCircle2 size={32} className="shrink-0 text-[#00E5A0]" aria-hidden="true" />
                            <div>
                                <p className="text-base font-semibold text-white">Attendance Locked for November 2024</p>
                                <p className="text-sm text-[#8899AA]">
                                    Locked by: Priya Mehta on 08/11/2024 at 11:30 AM · 847 employees&apos; attendance data frozen
                                </p>
                            </div>
                        </div>
                    </Card>
                ) : (
                    <Card
                        variant="bare"
                        className="rounded-2xl border border-red-500/30 bg-red-500/5 p-5"
                    >
                        <div className="flex flex-wrap items-center gap-4">
                            <AlertTriangle size={32} className="shrink-0 text-red-400" aria-hidden="true" />
                            <div className="flex-1">
                                <p className="text-base font-semibold text-red-400">Attendance NOT locked for November 2024</p>
                                <p className="text-sm text-[#8899AA]">Payroll calculations may change if attendance is modified.</p>
                            </div>
                            <Button variant="danger" onClick={() => setLocked(true)}>
                                Lock Attendance Now
                            </Button>
                        </div>
                    </Card>
                )}

                <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
                    {/* Left: Summary Table */}
                    <div className="space-y-4">
                        <h3 className="text-base font-semibold text-white">Attendance Summary — November 2024</h3>
                        <Card padding="none">
                            <DataTable<SummaryRow>
                                data={SUMMARY_DATA}
                                columns={SUMMARY_COLUMNS}
                                rowKey={(r) => r.dept}
                                aria-label="Attendance summary by department"
                                emptyTitle="No attendance data"
                            />
                            <div className="border-t border-[#1A2A3A] bg-[#0A1420] px-6 py-3">
                                <div className="grid grid-cols-6 gap-4 text-sm font-bold text-white">
                                    <span>TOTAL</span>
                                    <span>847</span>
                                    <span className="text-[#00E5A0]">92.6%</span>
                                    <span className="text-red-400">115</span>
                                    <span>280 hrs</span>
                                    <span className="text-[#FFB800]">7 issues</span>
                                </div>
                            </div>
                        </Card>

                        <Link
                            href="/attendance/reports"
                            className="inline-flex items-center gap-1.5 text-sm text-[#0066FF] hover:underline"
                        >
                            View detailed attendance <ExternalLink size={13} aria-hidden="true" />
                        </Link>

                        <Card padding="md">
                            <h3 className="mb-3 text-sm font-semibold text-white">LOP Deduction Impact</h3>
                            <div className="flex flex-wrap items-end justify-between gap-3">
                                <div>
                                    <p className="text-sm text-white">115 LOP days across 47 employees</p>
                                    <p className="text-xs text-[#445566]">LOP will be auto-deducted in salary computation</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-[#8899AA]">Estimated LOP deduction:</p>
                                    <p className="text-lg font-bold text-red-400">₹4,82,000</p>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Right: Issues & OT */}
                    <div className="space-y-4">
                        <Card padding="lg">
                            <h3 className="mb-4 text-sm font-semibold text-white">Unresolved Issues (7)</h3>
                            <div className="max-h-72 overflow-y-auto">
                                <DataTable<IssueRow>
                                    data={ISSUES}
                                    columns={ISSUE_COLUMNS}
                                    rowKey={(r) => r.id}
                                    aria-label="Unresolved attendance issues"
                                    emptyTitle="No issues"
                                    emptyDescription="All attendance issues resolved."
                                />
                            </div>
                            <p className="mt-3 text-center text-xs text-[#445566]">
                                These issues won&apos;t block payroll but will be noted
                            </p>
                            <div className="mt-4 flex flex-col gap-2">
                                <Button variant="outline" className="w-full" href="/payroll/run/employee-summary">Resolve All Issues First</Button>
                                <Button variant="ghost" className="w-full text-[#FFB800]" href="/payroll/run/employee-summary">Proceed Anyway</Button>
                            </div>
                        </Card>

                        <Card padding="lg">
                            <h3 className="mb-4 text-sm font-semibold text-white">OT Hours Summary</h3>
                            <div className="flex justify-between text-sm">
                                <span className="text-white">Total OT hours:</span>
                                <span className="font-semibold text-white">
                                    280 hrs <span className="text-xs font-normal text-[#8899AA]">(64 emp)</span>
                                </span>
                            </div>
                            <div className="mt-3 flex justify-between border-b border-[#1A2A3A] pb-4 text-sm">
                                <span className="text-white">Estimated OT payout:</span>
                                <span className="font-semibold text-[#00E5A0]">₹1,82,400</span>
                            </div>
                            <div className="mt-4 flex items-center justify-between">
                                <Badge variant="info">OT computed at 1.5x rate</Badge>
                                <Link href="/attendance/reports" className="text-sm text-[#0066FF] hover:underline">
                                    Review OT details →
                                </Link>
                            </div>
                        </Card>
                    </div>
                </div>

                {/* Bottom nav */}
                <div className="flex flex-col-reverse gap-3 border-t border-[#1A2A3A] pt-6 sm:flex-row sm:justify-between">
                    <Button variant="outline" size="lg" href="/payroll/run/select-month">Back</Button>
                    <Link href="/payroll/run/employee-summary">
                        <Button size="lg" iconRight={<ChevronRight size={16} aria-hidden="true" />}>
                            Next: Employee Summary
                        </Button>
                    </Link>
                </div>
            </div>
        </Page>
    );
}
