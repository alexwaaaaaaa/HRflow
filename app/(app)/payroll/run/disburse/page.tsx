"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, FileText, Download, Building2, UploadCloud, RefreshCw } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
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

interface BankOption {
    id: string;
    name: string;
    acc: string;
    bal: string;
    tag: string;
}

const BANKS: BankOption[] = [
    { id: "icici", name: "ICICI Bank - Current A/C", acc: "•••• 4521", bal: "₹4,50,20,000", tag: "Primary" },
    { id: "hdfc", name: "HDFC Bank - Current A/C", acc: "•••• 9882", bal: "₹1,20,00,000", tag: "" },
];

const POST_ACTIONS = [
    { id: "payslips", label: "Publish Payslips immediately", desc: "Employees can view and download their Nov 2024 payslip on their portal.", defaultChecked: true },
    { id: "email", label: "Send Email Notification", desc: "Send automated email to employees with payslip attached (password protected).", defaultChecked: true },
    { id: "whatsapp", label: "Send WhatsApp Notification", desc: "Notify employees via HRFlow WhatsApp bot. (Add-on required)", defaultChecked: false },
] as const;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DisbursePayroll() {
    const [selectedBank, setSelectedBank] = useState("icici");

    return (
        <Page
            title="Run payroll"
            subtitle="Step 8 of 8 — initiate disbursement"
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Payroll", href: "/payroll" },
                { label: "Disburse" },
            ]}
            maxWidth="1200px"
        >
            <div className="space-y-6">
                {/* Wizard stepper */}
                <Card padding="md">
                    <Stepper steps={STEPS} current={7} ariaLabel="Payroll run progress" />
                </Card>

                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h2 className="text-xl font-semibold text-white">Step 8: Initiate Disbursement</h2>
                        <p className="mt-1 text-sm text-[#8899AA]">
                            Payroll is approved. Proceed to disburse ₹3.81 Cr via bank transfer.
                        </p>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg border border-[rgba(0,229,160,0.2)] bg-[rgba(0,229,160,0.1)] px-4 py-2">
                        <CheckCircle2 size={18} className="text-[#00E5A0]" aria-hidden="true" />
                        <span className="text-sm font-semibold text-[#00E5A0]">Payroll Locked</span>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Left: Bank Selection & Disbursement Methods */}
                    <div className="space-y-6">
                        {/* Bank Selection */}
                        <Card padding="lg">
                            <h3 className="mb-4 text-base font-semibold text-white">Select Corporate Bank Account</h3>
                            <fieldset role="radiogroup" aria-label="Corporate bank account">
                                <legend className="sr-only">Select bank account</legend>
                                <div className="flex flex-col gap-4">
                                    {BANKS.map((bank) => (
                                        <label
                                            key={bank.id}
                                            className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition-colors ${
                                                selectedBank === bank.id
                                                    ? "border-[#00E5A0] bg-[rgba(0,229,160,0.05)]"
                                                    : "border-[#1A2A3A] bg-[#060B14] hover:border-[#2A3A4A]"
                                            }`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <input
                                                    type="radio"
                                                    name="bank"
                                                    value={bank.id}
                                                    checked={selectedBank === bank.id}
                                                    onChange={() => setSelectedBank(bank.id)}
                                                    className="h-4 w-4 accent-[#00E5A0]"
                                                />
                                                <div>
                                                    <div className="flex items-center gap-2 text-sm font-semibold text-white">
                                                        {bank.name}
                                                        {bank.tag && (
                                                            <Badge variant="neutral">{bank.tag}</Badge>
                                                        )}
                                                    </div>
                                                    <p className="text-xs text-[#8899AA]">
                                                        A/C: {bank.acc} · Balance:{" "}
                                                        <span className="text-[#00E5A0]">{bank.bal}</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <Building2
                                                size={24}
                                                className={selectedBank === bank.id ? "text-[#00E5A0]" : "text-[#445566]"}
                                                aria-hidden="true"
                                            />
                                        </label>
                                    ))}
                                </div>
                            </fieldset>
                        </Card>

                        {/* Disbursement Methods */}
                        <Card padding="lg">
                            <h3 className="mb-4 text-base font-semibold text-white">Disbursement Methods</h3>

                            {/* Direct Integration */}
                            <div className={`mb-4 flex gap-4 rounded-xl border border-[#1A2A3A] bg-[#060B14] p-5 ${selectedBank !== "icici" ? "opacity-50" : ""}`}>
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[rgba(0,102,255,0.1)]">
                                    <RefreshCw size={20} className="text-[#0066FF]" aria-hidden="true" />
                                </div>
                                <div className="flex-1">
                                    <p className="mb-1 text-sm font-semibold text-white">Direct Bank Integration</p>
                                    <p className="mb-4 text-xs leading-relaxed text-[#8899AA]">
                                        Push payouts directly to ICICI CIB portal without downloading files. Requires
                                        maker-checker at bank portal.
                                    </p>
                                    <Link href="/payroll/run/neft-confirm">
                                        <Button disabled={selectedBank !== "icici"} size="sm">
                                            Push to ICICI Portal
                                        </Button>
                                    </Link>
                                </div>
                            </div>

                            {/* File Download */}
                            <div className="flex gap-4 rounded-xl border border-[#00E5A0] bg-[#060B14] p-5">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[rgba(0,229,160,0.1)]">
                                    <Download size={20} className="text-[#00E5A0]" aria-hidden="true" />
                                </div>
                                <div className="flex-1">
                                    <p className="mb-1 text-sm font-semibold text-white">Manual File Download</p>
                                    <p className="mb-4 text-xs leading-relaxed text-[#8899AA]">
                                        Generate bank-specific format file (TXT/CSV) to upload manually.
                                    </p>
                                    <Link href="/payroll/run/bank-file">
                                        <Button variant="outline" size="sm" icon={<FileText size={15} aria-hidden="true" />}>
                                            Generate {selectedBank === "icici" ? "ICICI" : "HDFC"} Format File
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Right: Post-Disbursement Actions */}
                    <div className="space-y-6">
                        <Card padding="lg">
                            <h3 className="mb-4 text-base font-semibold text-white">Post-Disbursement Actions</h3>
                            <div className="flex flex-col gap-4">
                                {POST_ACTIONS.map((action) => (
                                    <label key={action.id} className="flex cursor-pointer items-start gap-3">
                                        <input
                                            type="checkbox"
                                            defaultChecked={action.defaultChecked}
                                            className="mt-1 h-4 w-4 accent-[#00E5A0]"
                                        />
                                        <div>
                                            <p className="text-sm font-medium text-white">{action.label}</p>
                                            <p className="text-xs text-[#8899AA]">{action.desc}</p>
                                        </div>
                                    </label>
                                ))}
                            </div>

                            <div className="mt-6 border-t border-[#1A2A3A] pt-5">
                                <Button variant="secondary" className="w-full" icon={<UploadCloud size={18} aria-hidden="true" />}>
                                    Execute Post-Payout Actions
                                </Button>
                                <p className="mt-3 text-center text-xs text-[#445566]">
                                    Only click after bank transfer is successfully completed.
                                </p>
                            </div>
                        </Card>

                        <Card
                            variant="bare"
                            className="rounded-2xl border border-dashed border-[rgba(0,102,255,0.3)] bg-[rgba(0,102,255,0.05)] p-6 text-center"
                        >
                            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(0,102,255,0.1)]">
                                <FileText size={24} className="text-[#0066FF]" aria-hidden="true" />
                            </div>
                            <h3 className="mb-2 text-sm font-semibold text-white">Need Accounting Journal?</h3>
                            <p className="mb-4 text-xs leading-relaxed text-[#8899AA]">
                                Download the payroll journal voucher file to import into Tally, Zoho Books, or Quickbooks.
                            </p>
                            <Button variant="outline" size="sm">Generate JV File</Button>
                        </Card>
                    </div>
                </div>

                {/* Bottom nav */}
                <div className="flex flex-col-reverse gap-3 border-t border-[#1A2A3A] pt-6 sm:flex-row sm:justify-between">
                    <Button variant="outline" size="lg" href="/payroll/run/approve">Back</Button>
                    <Button variant="secondary" size="lg" href="/payroll">Exit Wizard</Button>
                </div>
            </div>
        </Page>
    );
}
