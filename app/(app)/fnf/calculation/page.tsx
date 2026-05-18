"use client";

import { Coins, Calculator, Download, AlertTriangle } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

// ─── Calculation data — DO NOT CHANGE these values ────────────────────────────
// Gratuity = (15/26) × last salary × years of service
// Leave encashment = leave balance × (gross / 26)
// Notice pay buyout = shortfall days × (basic / 26)

interface EarningRow {
    id: string;
    item: string;
    basis: string;
    amount: string;
    highlight?: boolean;
}

interface DeductionRow {
    id: string;
    item: string;
    basis: string;
    amount: string;
}

const EARNINGS: EarningRow[] = [
    { id: "e1", item: "Unpaid Monthly Salary", basis: "24 Days Worked", amount: "1,20,000.00" },
    { id: "e2", item: "Leave Encashment", basis: "18 Days Bal @ Gross", amount: "82,500.00" },
    { id: "e3", item: "Notice Pay Buyout (Credit)", basis: "Negotiated Waiver", amount: "45,000.00" },
    { id: "e4", item: "Statutory Gratuity", basis: "3.2 Years Service", amount: "2,15,400.00", highlight: true },
    { id: "e5", item: "Pending Expense Claims", basis: "Verified Receipts", amount: "12,201.00" },
];

const DEDUCTIONS: DeductionRow[] = [
    { id: "d1", item: "Notice Shortfall Recovery", basis: "12 Days @ Basic", amount: "48,000.00" },
    { id: "d2", item: "Unreturned Assets Penalty", basis: "MacBook Charger Pen.", amount: "8,500.00" },
    { id: "d3", item: "Pending Loan Recovery", basis: "Furniture Advance", amount: "25,000.00" },
    { id: "d4", item: "Income Tax (TDS)", basis: "Estimated Projection", amount: "68,400.00" },
];

const REVIEW_POINTS = [
    { label: "Gratuity Eligibility", check: true, msg: "Met 3+ yr criteria" },
    { label: "Unused LWP", check: false, msg: "Missing attendance logs" },
    { label: "Bonus Accrual", check: true, msg: "Pro-rata applied" },
];

const EARNING_COLUMNS: Column<EarningRow>[] = [
    {
        key: "item",
        label: "Component",
        render: (r) => <span className="text-sm font-semibold text-white">{r.item}</span>,
    },
    {
        key: "basis",
        label: "Calculation Basis",
        render: (r) => <span className="text-xs text-[#445566]">{r.basis}</span>,
    },
    {
        key: "amount",
        label: "Amount (₹)",
        align: "right",
        render: (r) => <span className="text-sm font-bold text-white">₹{r.amount}</span>,
    },
];

const DEDUCTION_COLUMNS: Column<DeductionRow>[] = [
    {
        key: "item",
        label: "Component",
        render: (r) => <span className="text-sm font-semibold text-white">{r.item}</span>,
    },
    {
        key: "basis",
        label: "Policy Rule",
        render: (r) => <span className="text-xs text-[#445566]">{r.basis}</span>,
    },
    {
        key: "amount",
        label: "Amount (₹)",
        align: "right",
        render: (r) => <span className="text-sm font-bold text-rose-400">₹{r.amount}</span>,
    },
];

export default function FnFCalculation() {
    return (
        <Page
            title="Full & Final Calculation"
            subtitle="Employee: Arnab Das · ID: EMP-771"
            breadcrumbs={[
                { label: "FnF", href: "/fnf/dashboard" },
                { label: "Calculation" },
            ]}
            maxWidth="1400px"
            actions={
                <>
                    <Button variant="secondary" icon={<Download size={14} aria-hidden="true" />}>
                        Export Worksheet
                    </Button>
                    <Button>Generate Final Slip</Button>
                </>
            }
        >
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                {/* Earnings & Deductions */}
                <div className="space-y-6 lg:col-span-8">
                    <Card padding="none">
                        <div className="flex items-center justify-between border-b border-[#1A2A3A] px-6 py-4">
                            <h2 className="flex items-center gap-2 text-base font-bold text-white">
                                <Coins size={18} className="text-emerald-500" aria-hidden="true" />
                                Earnings &amp; Dues
                            </h2>
                            <Badge variant="success">+ Credits</Badge>
                        </div>
                        <div className="p-4">
                            <DataTable<EarningRow>
                                data={EARNINGS}
                                columns={EARNING_COLUMNS}
                                rowKey={(r) => r.id}
                                aria-label="Earnings and dues"
                            />
                        </div>
                    </Card>

                    <Card padding="none">
                        <div className="flex items-center justify-between border-b border-[#1A2A3A] px-6 py-4">
                            <h2 className="flex items-center gap-2 text-base font-bold text-white">
                                <Calculator size={18} className="text-rose-500" aria-hidden="true" />
                                Deductions &amp; Recoveries
                            </h2>
                            <Badge variant="danger">- Debits</Badge>
                        </div>
                        <div className="p-4">
                            <DataTable<DeductionRow>
                                data={DEDUCTIONS}
                                columns={DEDUCTION_COLUMNS}
                                rowKey={(r) => r.id}
                                aria-label="Deductions and recoveries"
                            />
                        </div>
                    </Card>
                </div>

                {/* Summary Card */}
                <div className="space-y-6 lg:col-span-4">
                    <Card padding="lg" variant="elevated">
                        <h2 className="mb-6 text-center text-xs font-bold uppercase tracking-widest text-[#445566]">
                            Net Settlement Balance
                        </h2>
                        <div className="space-y-6">
                            <div className="text-center">
                                <p className="text-4xl font-black tabular-nums text-white">₹3,25,202.00</p>
                                <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-[#445566]">
                                    Payable to Employee
                                </p>
                            </div>
                            <dl className="space-y-2 rounded-xl border border-[#1A2A3A] bg-[#060B14] p-4">
                                <div className="flex justify-between text-xs font-semibold">
                                    <dt className="text-[#8899AA]">Total Earnings</dt>
                                    <dd className="font-bold text-emerald-400">₹4,75,102.00</dd>
                                </div>
                                <div className="flex justify-between text-xs font-semibold">
                                    <dt className="text-[#8899AA]">Total Deductions</dt>
                                    <dd className="font-bold text-rose-400">₹1,49,900.00</dd>
                                </div>
                                <div className="my-2 h-px bg-[#1A2A3A]" />
                                <div className="flex justify-between text-sm font-black">
                                    <dt className="uppercase tracking-tight text-white">Effective Pay</dt>
                                    <dd className="text-yellow-300">₹3.25 L</dd>
                                </div>
                            </dl>
                        </div>
                        <Button variant="primary" className="mt-6 w-full">
                            Finalize Worksheet
                        </Button>
                        <p className="mt-2 text-center text-[10px] text-[#445566]">
                            Worksheet is auto-saved. Revision history active.
                        </p>
                    </Card>

                    <Card padding="md">
                        <h3 className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#445566]">
                            <AlertTriangle size={14} className="text-amber-500" aria-hidden="true" />
                            Critical Review Points
                        </h3>
                        <ul className="space-y-3" role="list">
                            {REVIEW_POINTS.map((pt) => (
                                <li key={pt.label} className="flex gap-3">
                                    <Badge variant={pt.check ? "success" : "warning"} dot />
                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs font-bold uppercase tracking-tight text-white">{pt.label}</p>
                                        <p className="text-[10px] text-[#445566]">{pt.msg}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
