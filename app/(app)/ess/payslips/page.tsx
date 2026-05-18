"use client";

import { useState } from "react";
import { FileText, Download, Lock } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

interface Payslip {
    month: string;
    paidOn: string;
    gross: number;
    tds: number;
    pf: number;
    net: number;
}

const PAYSLIPS: Payslip[] = [
    { month: "March 2026", paidOn: "31 Mar 2026", gross: 219000, tds: 34500, pf: 10250, net: 174250 },
    { month: "February 2026", paidOn: "28 Feb 2026", gross: 219000, tds: 34500, pf: 10250, net: 174250 },
    { month: "January 2026", paidOn: "31 Jan 2026", gross: 219000, tds: 34500, pf: 10250, net: 174250 },
    { month: "December 2025", paidOn: "31 Dec 2025", gross: 219000, tds: 34500, pf: 10250, net: 174250 },
];

const EARNINGS: Array<[string, number]> = [
    ["Basic Salary", 78400],
    ["House Rent Allowance (HRA)", 39200],
    ["Special Allowance", 101400],
];

const DEDUCTIONS: Array<[string, number]> = [
    ["Income Tax (TDS)", 34500],
    ["Provident Fund (EE)", 10250],
];

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export default function MyPayslipsPage() {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const slip = PAYSLIPS[selectedIndex] ?? PAYSLIPS[0]!;
    const totalDeductions = slip.tds + slip.pf;

    return (
        <Page
            title="My payslips"
            subtitle="View, verify, and download your monthly salary slips"
            breadcrumbs={[
                { label: "Self-Service", href: "/ess/dashboard" },
                { label: "My Payslips" },
            ]}
            maxWidth="1200px"
            actions={
                <Button variant="primary" size="md" icon={<Download size={14} />}>
                    Download (PDF)
                </Button>
            }
        >
            <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
                {/* Archive */}
                <Card padding="none" aria-label="Payslip archive">
                    <header className="border-b border-[#1A2A3A] bg-[#070d18] px-4 py-3">
                        <h2 className="flex items-center gap-2 text-sm font-semibold text-white">
                            <FileText size={14} className="text-[#3b82f6]" aria-hidden="true" />
                            Payslip archive
                        </h2>
                    </header>
                    <ul className="max-h-[500px] divide-y divide-[#1A2A3A] overflow-y-auto">
                        {PAYSLIPS.map((p, i) => {
                            const active = selectedIndex === i;
                            return (
                                <li key={p.month}>
                                    <button
                                        type="button"
                                        onClick={() => setSelectedIndex(i)}
                                        aria-pressed={active}
                                        className={`flex w-full flex-col items-start gap-1 border-l-4 px-4 py-3 text-left transition-colors ${
                                            active
                                                ? "border-[#3b82f6] bg-[#131B2B]"
                                                : "border-transparent hover:bg-[#131B2B]"
                                        }`}
                                    >
                                        <span className="text-sm font-semibold text-white">
                                            {p.month}
                                        </span>
                                        <span className="flex w-full justify-between text-xs">
                                            <span className="text-[#7a8fa6]">
                                                Paid: {p.paidOn}
                                            </span>
                                            <span className="font-semibold text-[#00e5a0]">
                                                ₹{(p.net / 1000).toFixed(0)}k
                                            </span>
                                        </span>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </Card>

                {/* Payslip preview */}
                <article
                    aria-label={`Payslip for ${slip.month}`}
                    className="relative overflow-hidden rounded-2xl bg-white p-6 text-slate-900 shadow-xl md:p-8"
                >
                    <div className="absolute left-0 top-0 h-2 w-full bg-indigo-600" aria-hidden="true" />

                    <header className="mt-4 flex flex-col gap-3 border-b border-slate-200 pb-6 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight text-indigo-900">
                                Acme Corporation Ltd.
                            </h2>
                            <p className="mt-1 text-sm text-slate-600">
                                Payslip for{" "}
                                <strong className="text-slate-700">{slip.month}</strong>
                            </p>
                        </div>
                        <div className="text-left sm:text-right">
                            <p className="text-sm text-slate-600">Net pay</p>
                            <p className="text-3xl font-bold text-emerald-600 tabular-nums">
                                {inr(slip.net)}
                            </p>
                            <p className="mt-1 inline-flex items-center gap-1 rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                                <Lock size={10} aria-hidden="true" />
                                Password-protected PDF
                            </p>
                        </div>
                    </header>

                    <dl className="mt-6 grid gap-x-8 gap-y-2 rounded-xl border border-slate-100 bg-slate-50 p-4 text-sm sm:grid-cols-2">
                        <Row label="Employee Name" value="Anita Kulkarni" />
                        <Row label="Bank Name" value="HDFC Bank" />
                        <Row label="Employee ID" value="EMP-001" />
                        <Row label="Bank A/C No" value="XXXXXX4521" />
                        <Row label="Designation" value="Senior Engineer" />
                        <Row label="UAN" value="10098453210" />
                        <Row label="Days Paid" value="31.0" />
                        <Row label="PAN" value="ABCDE1234F" />
                    </dl>

                    <div className="mt-8 grid gap-6 sm:grid-cols-2">
                        <Section title="Earnings">
                            <Lines lines={EARNINGS} />
                            <Total
                                label="Total Earnings (A)"
                                value={slip.gross}
                                tone="indigo"
                            />
                        </Section>
                        <Section title="Deductions">
                            <Lines lines={DEDUCTIONS} negative />
                            <Total
                                label="Total Deductions (B)"
                                value={totalDeductions}
                                tone="rose"
                            />
                        </Section>
                    </div>

                    <p className="mt-8 text-center text-xs text-slate-600">
                        This is a computer-generated document. No signature is required.
                    </p>
                </article>
            </div>
        </Page>
    );
}

function Row({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex justify-between border-b border-slate-200/50 pb-1">
            <dt className="text-slate-600">{label}</dt>
            <dd className="font-semibold">{value}</dd>
        </div>
    );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div>
            <h3 className="rounded-t-lg border-b border-slate-200 bg-slate-100 px-3 py-1.5 text-sm font-semibold text-slate-800">
                {title}
            </h3>
            <div className="rounded-b-lg border border-t-0 border-slate-100">{children}</div>
        </div>
    );
}

function Lines({ lines, negative }: { lines: Array<[string, number]>; negative?: boolean }) {
    return (
        <>
            {lines.map(([label, amt]) => (
                <div
                    key={label}
                    className="flex justify-between border-b border-slate-100 px-3 py-2 text-sm last:border-0 hover:bg-slate-50"
                >
                    <span className="text-slate-700">{label}</span>
                    <span
                        className={`font-medium tabular-nums ${
                            negative ? "text-red-600" : ""
                        }`}
                    >
                        {inr(amt)}
                    </span>
                </div>
            ))}
        </>
    );
}

function Total({
    label,
    value,
    tone,
}: {
    label: string;
    value: number;
    tone: "indigo" | "rose";
}) {
    const toneClass =
        tone === "indigo" ? "text-indigo-600" : "text-red-600";
    return (
        <div className="flex justify-between rounded-b-lg bg-slate-50 px-3 py-2 text-sm font-bold">
            <span className="text-slate-800">{label}</span>
            <span className={`text-base tabular-nums ${toneClass}`}>{inr(value)}</span>
        </div>
    );
}
