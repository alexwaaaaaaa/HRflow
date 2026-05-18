"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, AlertTriangle, FileText, ShieldCheck, Users } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
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

const DOWNLOAD_REPORTS = [
    { icon: FileText, color: "text-[#0066FF]", label: "Final Payroll Register (Excel)" },
    { icon: FileText, color: "text-[#FFB800]", label: "EPF & ESI Return File" },
    { icon: FileText, color: "text-[#00E5A0]", label: "TDS Deduction Report" },
] as const;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ApprovePayroll() {
    const [agreed, setAgreed] = useState(false);

    return (
        <Page
            title="Run payroll"
            subtitle="Step 7 of 8 — final approval"
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Payroll", href: "/payroll" },
                { label: "Approve" },
            ]}
            maxWidth="1200px"
        >
            <div className="space-y-6">
                {/* Wizard stepper */}
                <Card padding="md">
                    <Stepper steps={STEPS} current={6} ariaLabel="Payroll run progress" />
                </Card>

                <h2 className="text-xl font-semibold text-white">Step 7: Final Approval</h2>
                <p className="text-sm text-[#8899AA]">
                    Review the final payroll summary and authorize it for disbursement. Once approved, payslips will be generated.
                </p>

                <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
                    {/* Left: Summary & Approval Workflow */}
                    <div className="space-y-6">
                        {/* Summary Card */}
                        <Card padding="lg">
                            <h3 className="mb-6 text-center text-lg font-semibold text-white">
                                November 2024 Payroll Summary
                            </h3>

                            <div className="mb-4 flex items-center justify-between border-b border-[#1A2A3A] pb-4">
                                <span className="text-sm text-[#8899AA]">Total Employees Processed</span>
                                <span className="flex items-center gap-2 text-base font-semibold text-white">
                                    <Users size={15} className="text-[#8899AA]" aria-hidden="true" /> 844
                                </span>
                            </div>

                            <div className="mb-4 flex items-center justify-between border-b border-[#1A2A3A] pb-4">
                                <span className="text-sm text-[#8899AA]">Total Gross Earnings</span>
                                <span className="text-base font-semibold text-white">₹4,24,50,000</span>
                            </div>

                            <div className="mb-4 flex items-start justify-between border-b border-[#1A2A3A] pb-4">
                                <div>
                                    <span className="text-sm text-[#8899AA]">Total Deductions</span>
                                    <p className="text-xs text-[#445566]">Includes TDS, EPF, PT, Recoveries</p>
                                </div>
                                <span className="text-base font-semibold text-red-400">- ₹42,45,000</span>
                            </div>

                            <div className="flex items-center justify-between rounded-xl border border-[rgba(0,229,160,0.3)] bg-[rgba(0,229,160,0.05)] p-4">
                                <span className="text-base font-semibold text-white">Total Net Payout</span>
                                <span className="text-2xl font-bold text-[#00E5A0]">₹3,82,05,000</span>
                            </div>
                        </Card>

                        {/* Approval Workflow */}
                        <Card padding="lg">
                            <h3 className="mb-4 text-base font-semibold text-white">Approval Workflow</h3>
                            <ol className="space-y-4" role="list">
                                <li className="flex gap-4">
                                    <div className="flex flex-col items-center">
                                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#00E5A0]">
                                            <CheckCircle2 size={14} className="text-[#060B14]" aria-hidden="true" />
                                        </div>
                                        <div className="mt-1 h-10 w-0.5 bg-[#00E5A0]" aria-hidden="true" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-white">Prepared By</p>
                                        <p className="text-xs text-[#8899AA]">Priya Mehta (HR Exec) · Nov 25, 11:30 AM</p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#00E5A0] bg-[rgba(0,229,160,0.2)]">
                                        <div className="h-2 w-2 rounded-full bg-[#00E5A0]" aria-hidden="true" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-white">Final Approval</p>
                                        <p className="text-xs text-[#8899AA]">Waiting for your approval (Finance Head)</p>
                                    </div>
                                </li>
                            </ol>
                        </Card>
                    </div>

                    {/* Right: Downloads & Authorization */}
                    <div className="space-y-6">
                        {/* Download Reports */}
                        <Card padding="lg">
                            <h3 className="mb-4 text-base font-semibold text-white">Download Reports</h3>
                            <div className="flex flex-col gap-3">
                                {DOWNLOAD_REPORTS.map((r) => (
                                    <Button
                                        key={r.label}
                                        variant="secondary"
                                        className="w-full justify-start"
                                        icon={<r.icon size={18} className={r.color} aria-hidden="true" />}
                                    >
                                        {r.label}
                                    </Button>
                                ))}
                            </div>
                        </Card>

                        {/* Authorization */}
                        <Card padding="lg">
                            <h3 className="mb-4 text-base font-semibold text-white">Authorization</h3>

                            <Card
                                variant="bare"
                                className="mb-5 rounded-xl border border-dashed border-[rgba(255,184,0,0.3)] bg-[rgba(255,184,0,0.05)] p-4"
                            >
                                <div className="flex items-start gap-3">
                                    <AlertTriangle size={18} className="mt-0.5 shrink-0 text-[#FFB800]" aria-hidden="true" />
                                    <p className="text-sm leading-relaxed text-white">
                                        This action will{" "}
                                        <strong className="text-[#FFB800]">lock the payroll permanently</strong> for
                                        November 2024. Payslips will be generated and made available on employee portals
                                        under &quot;Draft&quot; state until disbursed.
                                    </p>
                                </div>
                            </Card>

                            <label className="mb-6 flex cursor-pointer items-start gap-3">
                                <input
                                    type="checkbox"
                                    checked={agreed}
                                    onChange={(e) => setAgreed(e.target.checked)}
                                    className="mt-1 h-4 w-4 accent-[#00E5A0]"
                                />
                                <span className="text-sm leading-relaxed text-[#8899AA]">
                                    I, Ajiit (Finance Head), hereby confirm that I have reviewed the payroll register
                                    and authorize the processing of ₹3.82 Cr for November 2024.
                                </span>
                            </label>

                            <div className="flex flex-col gap-3">
                                <Link href="/payroll/run/disburse" className={agreed ? "" : "pointer-events-none"}>
                                    <Button
                                        disabled={!agreed}
                                        className="w-full"
                                        icon={<ShieldCheck size={18} aria-hidden="true" />}
                                    >
                                        Approve & Lock Payroll
                                    </Button>
                                </Link>
                                <Button variant="danger" className="w-full">
                                    Reject & Send Back
                                </Button>
                            </div>
                        </Card>
                    </div>
                </div>

                {/* Bottom nav */}
                <div className="border-t border-[#1A2A3A] pt-6">
                    <Button variant="outline" size="lg" href="/payroll/run/review-net">Back</Button>
                </div>
            </div>
        </Page>
    );
}
