"use client";

import React, { useState } from "react";
import {
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    Maximize2,
    FileText,
    Check,
    ShieldCheck,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// ─── Sub-components (module-scope) ────────────────────────────────────────────

interface FieldRowProps {
    label: string;
    value: string;
    status: "high" | "medium";
    matchMsg?: string;
}

function FieldRow({ label, value, status, matchMsg }: FieldRowProps) {
    return (
        <div>
            <div className="mb-1 flex justify-between">
                <label className="block text-xs text-[#8899AA]">{label}</label>
                {matchMsg && (
                    <span className="flex items-center text-[10px] text-[#00E5A0]">
                        <CheckCircle2 size={10} className="mr-1" aria-hidden="true" />
                        {matchMsg}
                    </span>
                )}
            </div>
            <div className="relative">
                <input
                    type="text"
                    defaultValue={value}
                    aria-label={label}
                    className={`w-full bg-transparent border-b py-2 pr-8 text-sm font-medium focus:outline-none transition-colors ${
                        status === "high"
                            ? "border-[#2A3A4A] text-white focus:border-[#00E5A0]"
                            : "border-[#FFB800] border-dashed text-white"
                    }`}
                />
                {status === "high" && (
                    <div
                        className="absolute right-0 top-3"
                        title="High confidence extraction"
                        aria-label="High confidence"
                    >
                        <div className="h-1.5 w-1.5 rounded-full bg-[#00E5A0]" />
                    </div>
                )}
            </div>
        </div>
    );
}

function ChevronDownIcon() {
    return (
        <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[#8899AA]"
            aria-hidden="true"
        >
            <polyline points="6 9 12 15 18 9" />
        </svg>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function OCRPreviewPage() {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);

    const documentData = {
        type: "PPF Statement",
        fileName: "PPF_Statement_SBI_2024.pdf",
        confidence: 94,
        timeTaken: "2.3 seconds",
        extracted: {
            name: { value: "Arjun Mehta", confidence: "high" as const, match: true },
            accountNo: { value: "SBPPF00001234", confidence: "high" as const, match: null },
            bankBranch: { value: "SBI Bhopal Main", confidence: "medium" as const, match: null },
            amount: { value: "50000", confidence: "high" as const, match: true },
            fy: { value: "2024-25", confidence: "high" as const, match: true },
            section: { value: "80C - PPF", confidence: "high" as const, match: null },
        },
    };

    const handleConfirm = () => {
        setSubmitting(true);
        setTimeout(() => {
            router.push("/tax/proofs/upload");
        }, 1000);
    };

    return (
        <Page
            title="OCR data extraction — review"
            subtitle="AI has extracted data from your document. Review and confirm."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Tax", href: "/tax/dashboard" },
                { label: "Proof upload", href: "/tax/proofs/upload" },
                { label: "OCR review" },
            ]}
            maxWidth="1400px"
            actions={
                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        size="sm"
                        icon={<ChevronLeft size={16} aria-hidden="true" />}
                        onClick={() => router.push("/tax/proofs/upload")}
                    >
                        Back
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        iconRight={<ChevronRight size={16} aria-hidden="true" />}
                        aria-disabled="true"
                        className="cursor-not-allowed opacity-60"
                    >
                        Next document
                    </Button>
                </div>
            }
        >
            {/* OCR Status Bar */}
            <Card padding="sm" className="mb-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-6">
                        <div className="flex items-center gap-2">
                            <FileText size={18} className="text-[#8899AA]" aria-hidden="true" />
                            <span className="text-sm font-medium text-white">
                                {documentData.fileName}
                            </span>
                            <span className="text-xs text-[#8899AA]">(1 page)</span>
                        </div>
                        <div className="flex items-center gap-2 rounded-full border border-[#00E5A0]/20 bg-[#00E5A0]/10 px-3 py-1">
                            <ShieldCheck size={14} className="text-[#00E5A0]" aria-hidden="true" />
                            <span className="text-xs font-bold text-[#00E5A0]">
                                OCR Confidence: {documentData.confidence}%
                            </span>
                        </div>
                        <span className="text-xs text-[#445566]">
                            Time taken: {documentData.timeTaken}
                        </span>
                    </div>
                    <Badge variant="success">High accuracy</Badge>
                </div>
            </Card>

            {/* Main two-panel layout */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[600px_1fr]">

                {/* Left Panel — Document Viewer */}
                <Card padding="none" className="flex flex-col overflow-hidden">
                    {/* Toolbar */}
                    <div className="flex h-12 items-center justify-between border-b border-[#1A2A3A] bg-[#0A1420] px-4">
                        <div className="flex items-center gap-3 text-xs text-[#8899AA]">
                            <button
                                type="button"
                                className="hover:text-white transition-colors"
                                aria-label="Zoom out"
                            >
                                −
                            </button>
                            <span>100%</span>
                            <button
                                type="button"
                                className="hover:text-white transition-colors"
                                aria-label="Zoom in"
                            >
                                +
                            </button>
                            <button
                                type="button"
                                className="ml-2 hover:text-white transition-colors"
                                aria-label="Fit to width"
                            >
                                <Maximize2 size={14} aria-hidden="true" />
                            </button>
                        </div>
                        <div className="rounded-md bg-[#1A2A3A] px-3 py-1 text-xs font-medium text-white">
                            Page 1 of 1
                        </div>
                    </div>

                    {/* Document mock */}
                    <div className="flex flex-1 justify-center overflow-auto bg-[#060B14] p-8">
                        <div className="relative h-[700px] w-[500px] bg-white shadow-lg">
                            <div className="pointer-events-none absolute inset-0 flex flex-col space-y-6 p-8 opacity-80">
                                <div className="flex items-end justify-between border-b-2 border-slate-300 pb-4">
                                    <h2 className="font-serif text-2xl font-bold tracking-tight text-slate-800">
                                        State Bank of India
                                    </h2>
                                    <span className="font-sans text-sm text-slate-500">
                                        PPF Account Statement
                                    </span>
                                </div>

                                <div className="space-y-4 font-mono text-xs text-slate-700">
                                    <div className="flex">
                                        <span className="w-40 font-bold">Account Holder:</span>
                                        <span className="relative">
                                            Arjun Mehta
                                            <div className="absolute -inset-1 z-10 rounded border-2 border-[#00E5A0] bg-[#00E5A0]/10" />
                                        </span>
                                    </div>
                                    <div className="flex">
                                        <span className="w-40 font-bold">Account Number:</span>
                                        <span className="relative">
                                            SBPPF00001234
                                            <div className="absolute -inset-1 z-10 rounded border-2 border-[#00E5A0] bg-[#00E5A0]/10" />
                                        </span>
                                    </div>
                                    <div className="flex">
                                        <span className="w-40 font-bold">Branch:</span>
                                        <span className="relative">
                                            SBI Bhopal Main
                                            <div className="absolute -inset-1 z-10 rounded border-2 border-[#FFB800] bg-[#FFB800]/10" />
                                        </span>
                                    </div>
                                    <div className="flex">
                                        <span className="w-40 font-bold">Financial Year:</span>
                                        <span className="relative">
                                            2024-25
                                            <div className="absolute -inset-1 z-10 rounded border-2 border-[#00E5A0] bg-[#00E5A0]/10" />
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-8 border border-slate-300">
                                    <div className="flex border-b border-slate-300 bg-slate-100 p-2 text-xs font-bold text-slate-700">
                                        <div className="w-24">Date</div>
                                        <div className="flex-1">Particulars</div>
                                        <div className="w-32 text-right">Deposit</div>
                                        <div className="w-32 text-right">Balance</div>
                                    </div>
                                    <div className="space-y-2 p-2 font-mono text-xs text-slate-600">
                                        <div className="flex border-b border-slate-100 pb-2">
                                            <div className="w-24">05/04/2024</div>
                                            <div className="flex-1">UPI/TRANSFER</div>
                                            <div className="w-32 text-right">10,000.00</div>
                                            <div className="w-32 text-right">10,000.00</div>
                                        </div>
                                        <div className="flex border-b border-slate-100 pb-2">
                                            <div className="w-24">12/07/2024</div>
                                            <div className="flex-1">NEFT REMITTANCE</div>
                                            <div className="w-32 text-right">25,000.00</div>
                                            <div className="w-32 text-right">35,000.00</div>
                                        </div>
                                        <div className="flex pb-2">
                                            <div className="w-24">20/12/2024</div>
                                            <div className="flex-1">ONLINE XFR</div>
                                            <div className="w-32 text-right">15,000.00</div>
                                            <div className="w-32 text-right">50,000.00</div>
                                        </div>
                                    </div>
                                    <div className="flex border-t border-slate-300 bg-slate-50 p-3 text-sm font-bold text-slate-800">
                                        <div className="flex-1 text-right">
                                            TOTAL DEPOSITS (FY 24-25):
                                        </div>
                                        <div className="relative w-40 text-right">
                                            ₹50,000.00
                                            <div className="absolute -inset-1 z-10 rounded border-2 border-[#00E5A0] bg-[#00E5A0]/10" />
                                        </div>
                                    </div>
                                </div>

                                <div className="relative ml-auto mt-12 h-32 w-32 opacity-50">
                                    <div className="flex h-24 w-24 rotate-[-15deg] items-center justify-center rounded-full border-4 border-blue-800 text-xl font-bold text-blue-800">
                                        SBI
                                    </div>
                                    <div className="absolute inset-0 z-10 rounded border-2 border-dashed border-[#FF4444] bg-[#FF4444]/10" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Legend */}
                    <div className="flex h-10 items-center gap-6 border-t border-[#1A2A3A] bg-[#0A1420] px-4 text-xs text-[#8899AA]">
                        <div className="flex items-center gap-2">
                            <span className="h-3 w-3 border border-[#00E5A0] bg-[#00E5A0]/20" aria-hidden="true" />
                            High confidence
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="h-3 w-3 border border-[#FFB800] bg-[#FFB800]/20" aria-hidden="true" />
                            Review needed
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="h-3 w-3 border border-dashed border-[#FF4444] bg-[#FF4444]/20" aria-hidden="true" />
                            Unreadable / ignored
                        </div>
                    </div>
                </Card>

                {/* Right Panel — Extracted Data */}
                <Card padding="none" className="flex flex-col overflow-hidden">
                    <div className="border-b border-[#1A2A3A] bg-[#0A1420] px-6 py-4">
                        <h3 className="text-lg font-bold text-white">Extracted information</h3>
                        <p className="mt-1 text-xs text-[#8899AA]">
                            Verify the extracted fields below before confirming.
                        </p>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6">
                        <div className="space-y-6">
                            {/* Document type mapping */}
                            <div className="rounded-lg border border-[#2A3A4A] bg-[#1A2A3A]/40 p-4">
                                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#8899AA]">
                                    Document type mapping
                                </label>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label
                                            htmlFor="detected-type"
                                            className="mb-1 block text-xs text-[#8899AA]"
                                        >
                                            Detected type
                                        </label>
                                        <div
                                            id="detected-type"
                                            className="flex w-full items-center justify-between rounded-lg border border-[#1A2A3A] bg-[#060B14] px-3 py-2 text-sm text-white"
                                        >
                                            <span>PPF Statement</span>
                                            <ChevronDownIcon />
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="tax-section"
                                            className="mb-1 block text-xs text-[#8899AA]"
                                        >
                                            Tax section
                                        </label>
                                        <div
                                            id="tax-section"
                                            className="flex w-full items-center justify-between rounded-lg border border-[#1A2A3A] bg-[#060B14] px-3 py-2 text-sm text-white"
                                        >
                                            <span>80C — PPF</span>
                                            <ChevronDownIcon />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Editable fields */}
                            <div className="space-y-4">
                                <FieldRow
                                    label="Account holder name"
                                    value={documentData.extracted.name.value}
                                    status={documentData.extracted.name.confidence}
                                    matchMsg="Matches employee record"
                                />

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label
                                            htmlFor="input-account-no"
                                            className="mb-1 block text-xs text-[#8899AA]"
                                        >
                                            Account number
                                        </label>
                                        <input
                                            id="input-account-no"
                                            type="text"
                                            defaultValue={documentData.extracted.accountNo.value}
                                            className="w-full border-b border-[#2A3A4A] bg-transparent py-2 text-sm text-white transition-colors focus:border-[#00E5A0] focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="input-bank-branch"
                                            className="mb-1 block text-xs text-[#8899AA]"
                                        >
                                            Bank / Branch ⚠
                                        </label>
                                        <input
                                            id="input-bank-branch"
                                            type="text"
                                            defaultValue={documentData.extracted.bankBranch.value}
                                            className="w-full border-b border-[#FFB800] bg-transparent py-2 text-sm text-white transition-colors focus:outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label
                                            htmlFor="input-fy"
                                            className="mb-1 block text-xs text-[#8899AA]"
                                        >
                                            Financial year
                                        </label>
                                        <input
                                            id="input-fy"
                                            type="text"
                                            defaultValue={documentData.extracted.fy.value}
                                            className="w-full border-b border-[#2A3A4A] bg-transparent py-2 text-sm font-bold text-[#00E5A0] transition-colors focus:border-[#00E5A0] focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="input-amount"
                                            className="mb-1 block text-xs text-[#8899AA]"
                                        >
                                            Amount invested
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-0 top-2 text-sm font-bold text-[#8899AA]">
                                                ₹
                                            </span>
                                            <input
                                                id="input-amount"
                                                type="text"
                                                defaultValue={Number(
                                                    documentData.extracted.amount.value,
                                                ).toLocaleString("en-IN")}
                                                className="w-full border-b border-[#00E5A0] bg-transparent py-2 pl-4 text-sm font-bold text-white transition-colors focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Match confirmation */}
                            <div className="flex items-start gap-3 rounded-lg border border-[#00E5A0]/20 bg-[#00E5A0]/5 p-4">
                                <CheckCircle2
                                    size={18}
                                    className="mt-0.5 shrink-0 text-[#00E5A0]"
                                    aria-hidden="true"
                                />
                                <div>
                                    <h4 className="text-sm font-bold text-[#00E5A0]">
                                        Declared amount matches
                                    </h4>
                                    <p className="mt-1 text-xs text-[#8899AA]">
                                        You previously declared ₹50,000 for PPF under 80C. Extracted
                                        amount perfectly matches the declared value.
                                    </p>
                                </div>
                            </div>

                            {/* Additional details */}
                            <div className="rounded-lg border border-dashed border-[#2A3A4A] bg-[#1A2A3A] p-4">
                                <h4 className="mb-3 text-sm font-bold text-white">
                                    Additional details needed
                                </h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label
                                            htmlFor="input-deposit-date"
                                            className="mb-1 block text-xs text-[#8899AA]"
                                        >
                                            Date of latest deposit
                                        </label>
                                        <input
                                            id="input-deposit-date"
                                            type="date"
                                            className="w-full rounded border border-[#2A3A4A] bg-[#0D1928] px-3 py-2 text-sm text-[#8899AA] focus:border-[#00E5A0] focus:outline-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action bar */}
                    <div className="flex items-center justify-between border-t border-[#1A2A3A] bg-[#0A1420] p-4">
                        <Button variant="ghost" size="sm" className="text-[#8899AA] hover:text-[#FF4444]">
                            Reject OCR — manual entry
                        </Button>
                        <div className="flex gap-3">
                            <Button variant="outline" size="sm">
                                Edit &amp; confirm
                            </Button>
                            <Button
                                variant="primary"
                                size="sm"
                                onClick={handleConfirm}
                                isLoading={submitting}
                                loadingText="Saving…"
                                icon={<Check size={16} aria-hidden="true" />}
                            >
                                Confirm auto-fill
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
        </Page>
    );
}
