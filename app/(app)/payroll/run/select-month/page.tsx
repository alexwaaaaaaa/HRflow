"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Calendar, AlertTriangle, CheckCircle2 } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Stepper, { type StepItem } from "@/components/ui/Stepper";

// ─────────────────────────────────────────────────────────────────────────────
// Static config
// ─────────────────────────────────────────────────────────────────────────────

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

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] as const;

const PAYROLL_TYPES = [
    { id: "regular", label: "Regular Monthly Payroll" },
    { id: "offcycle", label: "Off-cycle Payroll (supplementary)" },
    { id: "contractor", label: "Contractor Payroll only" },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// Module-scope subcomponents (defined outside the page render fn to satisfy
// react/no-unstable-nested-components and to keep referential identity stable).
// ─────────────────────────────────────────────────────────────────────────────

interface SummaryRowProps {
    label: string;
    value: string;
    valueClassName?: string;
    bold?: boolean;
}

function SummaryRow({ label, value, valueClassName, bold }: SummaryRowProps) {
    return (
        <div
            className={`flex justify-between text-sm text-[#8899AA] ${
                bold ? "font-semibold" : ""
            }`}
        >
            <span>{label}</span>
            <span className={valueClassName ?? "text-white"}>{value}</span>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function SelectMonth() {
    const [month, setMonth] = useState("Nov");
    const [type, setType] = useState("regular");
    const [scope, setScope] = useState({ all: true, new: true, notice: true, lop: false });

    const monthNum = month === "Nov" ? "11" : "10";

    return (
        <Page
            title="Run payroll"
            subtitle="Step 1 of 8 — select period"
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Payroll", href: "/payroll" },
                { label: "Select month" },
            ]}
            maxWidth="1200px"
        >
            <div className="space-y-6">
                {/* Wizard stepper */}
                <Card padding="md">
                    <Stepper steps={STEPS} current={0} ariaLabel="Payroll run progress" />
                </Card>

                {/* Main grid */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
                    {/* Left form column */}
                    <div className="flex flex-col gap-4">
                        {/* Period card */}
                        <Card padding="lg">
                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="text-base font-semibold text-white">
                                    Payroll Period *
                                </h3>
                                <div className="flex items-center gap-3 text-sm text-white">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        aria-label="Previous year"
                                        icon={<ChevronLeft size={14} aria-hidden="true" />}
                                    >
                                        <span className="sr-only">Previous year</span>
                                    </Button>
                                    <span aria-live="polite">2024</span>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        aria-label="Next year"
                                        icon={<ChevronRight size={14} aria-hidden="true" />}
                                    >
                                        <span className="sr-only">Next year</span>
                                    </Button>
                                </div>
                            </div>

                            <div
                                role="radiogroup"
                                aria-label="Payroll month"
                                className="mb-6 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6"
                            >
                                {MONTHS.map((m) => (
                                    <Button
                                        key={m}
                                        type="button"
                                        role="radio"
                                        aria-checked={month === m}
                                        variant={month === m ? "primary" : "outline"}
                                        size="md"
                                        onClick={() => setMonth(m)}
                                        className="w-full"
                                    >
                                        {m}
                                    </Button>
                                ))}
                            </div>

                            <div className="mb-6">
                                <span className="mb-3 block text-xs font-semibold uppercase tracking-wider text-[#8899AA]">
                                    Payroll Type *
                                </span>
                                <div className="flex flex-col gap-3">
                                    {PAYROLL_TYPES.map((t) => (
                                        <label
                                            key={t.id}
                                            className="flex cursor-pointer items-center gap-2.5"
                                        >
                                            <input
                                                type="radio"
                                                name="type"
                                                value={t.id}
                                                checked={type === t.id}
                                                onChange={() => setType(t.id)}
                                                className="accent-[#00e5a0]"
                                            />
                                            <span className="text-sm text-white">{t.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label
                                        htmlFor="effective-from"
                                        className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#8899AA]"
                                    >
                                        Effective From
                                    </label>
                                    <input
                                        id="effective-from"
                                        type="text"
                                        readOnly
                                        value={`01/${monthNum}/2024`}
                                        className="h-10 w-full rounded-lg border border-[#1A2A3A] bg-[#060B14] px-3.5 text-sm text-[#8899AA] outline-none"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="effective-to"
                                        className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#8899AA]"
                                    >
                                        Effective To
                                    </label>
                                    <input
                                        id="effective-to"
                                        type="text"
                                        readOnly
                                        value={`30/${monthNum}/2024`}
                                        className="h-10 w-full rounded-lg border border-[#1A2A3A] bg-[#060B14] px-3.5 text-sm text-[#8899AA] outline-none"
                                    />
                                </div>
                            </div>
                        </Card>

                        {/* Scope card */}
                        <Card padding="md">
                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="text-base font-semibold text-white">
                                    Employee Scope
                                </h3>
                                <Button variant="ghost" size="sm">
                                    Exclude specific employees?
                                </Button>
                            </div>
                            <div className="flex flex-col gap-3">
                                <label className="flex cursor-pointer items-center gap-2.5">
                                    <input
                                        type="checkbox"
                                        checked={scope.all}
                                        onChange={(e) =>
                                            setScope({ ...scope, all: e.target.checked })
                                        }
                                        className="accent-[#00e5a0]"
                                    />
                                    <span className="text-sm text-white">
                                        All active employees (847)
                                    </span>
                                </label>
                                <label className="ml-6 flex cursor-pointer items-center gap-2.5">
                                    <input
                                        type="checkbox"
                                        checked={scope.new}
                                        onChange={(e) =>
                                            setScope({ ...scope, new: e.target.checked })
                                        }
                                        disabled={!scope.all}
                                        className="accent-[#00e5a0]"
                                    />
                                    <span
                                        className={`text-sm ${
                                            scope.all ? "text-white" : "text-[#445566]"
                                        }`}
                                    >
                                        New joiners this month (12 — pro-rata)
                                    </span>
                                </label>
                                <label className="ml-6 flex cursor-pointer items-center gap-2.5">
                                    <input
                                        type="checkbox"
                                        checked={scope.notice}
                                        onChange={(e) =>
                                            setScope({ ...scope, notice: e.target.checked })
                                        }
                                        disabled={!scope.all}
                                        className="accent-[#00e5a0]"
                                    />
                                    <span
                                        className={`text-sm ${
                                            scope.all ? "text-white" : "text-[#445566]"
                                        }`}
                                    >
                                        Employees on notice period (8)
                                    </span>
                                </label>
                                <label className="ml-6 flex cursor-pointer items-center gap-2.5">
                                    <input
                                        type="checkbox"
                                        checked={scope.lop}
                                        onChange={(e) =>
                                            setScope({ ...scope, lop: e.target.checked })
                                        }
                                        disabled={!scope.all}
                                        className="accent-[#00e5a0]"
                                    />
                                    <span
                                        className={`text-sm ${
                                            scope.all ? "text-white" : "text-[#445566]"
                                        }`}
                                    >
                                        Employees on LOP (will include with deduction)
                                    </span>
                                </label>
                            </div>
                        </Card>

                        {/* Pre-run checklist card */}
                        <Card padding="md">
                            <h3 className="mb-4 text-base font-semibold text-white">
                                Pre-run Checklist
                            </h3>
                            <ul role="list" className="flex flex-col gap-3.5">
                                <li className="flex items-center gap-2.5 text-sm text-white">
                                    <CheckCircle2
                                        size={18}
                                        className="shrink-0 text-[#00e5a0]"
                                        aria-hidden="true"
                                    />
                                    Attendance locked for {month} 2024 (08/{monthNum}/2024)
                                </li>
                                <li className="flex items-center gap-2.5 text-sm text-white">
                                    <CheckCircle2
                                        size={18}
                                        className="shrink-0 text-[#00e5a0]"
                                        aria-hidden="true"
                                    />
                                    Salary structures updated
                                </li>
                                <li className="flex items-center justify-between gap-2.5 text-sm text-white">
                                    <div className="flex items-center gap-2.5">
                                        <AlertTriangle
                                            size={18}
                                            className="shrink-0 text-[#FFB800]"
                                            aria-hidden="true"
                                        />
                                        16 employees have unverified banks (831/847)
                                    </div>
                                    <Button variant="ghost" size="sm">
                                        Resolve
                                    </Button>
                                </li>
                                <li className="flex items-center gap-2.5 text-sm text-white">
                                    <CheckCircle2
                                        size={18}
                                        className="shrink-0 text-[#00e5a0]"
                                        aria-hidden="true"
                                    />
                                    Previous month payroll disbursed
                                </li>
                                <li className="flex items-center gap-2.5 text-sm text-white">
                                    <CheckCircle2
                                        size={18}
                                        className="shrink-0 text-[#00e5a0]"
                                        aria-hidden="true"
                                    />
                                    No pending salary revisions
                                </li>
                                <li className="flex items-center justify-between gap-2.5 text-sm text-white">
                                    <div className="flex items-center gap-2.5">
                                        <AlertTriangle
                                            size={18}
                                            className="shrink-0 text-[#FFB800]"
                                            aria-hidden="true"
                                        />
                                        3 anomalies from last month unresolved
                                    </div>
                                    <Button variant="ghost" size="sm">
                                        View
                                    </Button>
                                </li>
                            </ul>
                        </Card>
                    </div>

                    {/* Right preview column */}
                    <div className="flex flex-col gap-4">
                        <Card padding="md">
                            <h3 className="mb-5 text-base font-semibold text-white">
                                Expected Payroll Summary
                            </h3>

                            <div className="mb-4 text-sm text-white">
                                Month: {month === "Nov" ? "November" : month} 2024
                            </div>
                            <div className="mb-4 h-px bg-[#1A2A3A]" />

                            <div className="mb-4 flex flex-col gap-3">
                                <SummaryRow
                                    label="Total Employees"
                                    value={String(scope.all ? 847 : 0)}
                                />
                                <SummaryRow
                                    label="New Joiners (pro-rata)"
                                    value={String(scope.new ? 12 : 0)}
                                />
                                <SummaryRow label="Exits (FnF separate)" value="3" />
                            </div>
                            <div className="mb-4 h-px bg-[#1A2A3A]" />

                            <div className="mb-4 flex flex-col gap-3">
                                <SummaryRow label="Expected Gross" value="~₹4.24 Cr" />
                                <SummaryRow label="Expected Deductions" value="~₹42 L" />
                                <SummaryRow
                                    label="Expected Net"
                                    value="~₹3.82 Cr"
                                    valueClassName="text-[#00e5a0]"
                                    bold
                                />
                            </div>
                            <div className="mb-4 h-px bg-[#1A2A3A]" />

                            <div className="mb-4 flex flex-col gap-3">
                                <SummaryRow label="Employer PF" value="~₹18.4 L" />
                                <SummaryRow label="Employer ESI" value="~₹2.8 L" />
                                <SummaryRow label="Gratuity Provision" value="~₹8.1 L" />
                            </div>
                            <div className="mb-4 h-px bg-[#1A2A3A]" />

                            <div className="mb-4">
                                <SummaryRow
                                    label="Total Cost to Company"
                                    value="~₹4.93 Cr"
                                    bold
                                />
                            </div>

                            <p className="text-center text-xs italic text-[#445566]">
                                These are estimates. Actuals depend on attendance data.
                            </p>
                        </Card>

                        <Card
                            variant="bare"
                            className="border border-[rgba(0,229,160,0.3)] bg-[rgba(0,229,160,0.05)] p-4"
                        >
                            <div className="mb-2 flex items-center gap-2.5 text-sm font-semibold text-[#00e5a0]">
                                <Calendar size={18} aria-hidden="true" />
                                Disbursement scheduled: 30/11/2024
                            </div>
                            <p className="pl-7 text-sm text-[#8899AA]">
                                Working days in November: 21
                            </p>
                        </Card>
                    </div>
                </div>

                {/* Bottom nav */}
                <div className="flex flex-col-reverse gap-3 border-t border-[#1A2A3A] pt-6 sm:flex-row sm:justify-between">
                    <Link href="/payroll">
                        <Button
                            variant="outline"
                            size="lg"
                            icon={<ChevronLeft size={16} aria-hidden="true" />}
                        >
                            Back to Payroll Dashboard
                        </Button>
                    </Link>
                    <Link href="/payroll/run/attendance-lock">
                        <Button
                            variant="primary"
                            size="lg"
                            iconRight={<ChevronRight size={16} aria-hidden="true" />}
                        >
                            Next: Lock Attendance Check
                        </Button>
                    </Link>
                </div>
            </div>
        </Page>
    );
}
