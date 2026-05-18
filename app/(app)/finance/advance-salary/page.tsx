"use client";

import { CheckCircle2, AlertTriangle } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

interface AdvanceRequest {
    id: string;
    emp: string;
    dept: string;
    amount: number;
    reason: string;
    date: string;
}

interface Disbursement {
    id: string;
    emp: string;
    date: string;
    amount: string;
    plan: string;
    status: "recovering" | "active";
}

const PENDING_ADVANCES: AdvanceRequest[] = [
    { id: "ADV-001", emp: "Ravi Kumar", dept: "Engineering", amount: 150000, reason: "Medical Emergency", date: "Oct 12, 2025" },
    { id: "ADV-002", emp: "Sneha Rao", dept: "Marketing", amount: 50000, reason: "Security Deposit", date: "Oct 14, 2025" },
];

const DISBURSEMENTS: Disbursement[] = [
    { id: "D-001", emp: "Aisha Gupta", date: "Oct 01, 2025", amount: "₹25,000", plan: "1 installment", status: "recovering" },
    { id: "D-002", emp: "Raj Singh", date: "Sep 15, 2025", amount: "₹1,00,000", plan: "4 installments", status: "active" },
];

const DISBURSEMENT_COLUMNS: Column<Disbursement>[] = [
    { key: "emp", label: "Employee", render: (r) => <span className="text-white font-medium">{r.emp}</span> },
    { key: "date", label: "Date", render: (r) => <span className="text-[#8899AA]">{r.date}</span> },
    { key: "amount", label: "Amount", render: (r) => <span className="font-medium text-white">{r.amount}</span> },
    { key: "plan", label: "Recovery Plan", render: (r) => <span className="text-[#8899AA]">{r.plan}</span> },
    {
        key: "status", label: "Status", render: (r) => (
            r.status === "recovering"
                ? <Badge variant="warning">Recovering Next Payroll</Badge>
                : <Badge variant="info">Active (₹25k left)</Badge>
        ),
    },
];

const POLICY_POINTS = [
    "Max allowable advance is 1.5x of monthly Net Salary.",
    "Maximum repayment tenure is 6 months.",
    "Employee must complete probation (6mo) to be eligible.",
];

export default function AdvanceSalaryPage() {
    return (
        <Page
            title="Advance Salary Manager"
            subtitle="Process and track zero-interest salary advances to employees"
            breadcrumbs={[
                { label: "Finance", href: "/finance/dashboard" },
                { label: "Advance Salary" },
            ]}
            maxWidth="1200px"
        >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {/* Pending Requests */}
                    <Card padding="lg">
                        <h2 className="text-lg font-bold text-white mb-6">Pending Requests</h2>
                        {PENDING_ADVANCES.length > 0 ? (
                            <div className="space-y-4">
                                {PENDING_ADVANCES.map((req) => (
                                    <div key={req.id} className="p-5 border border-[#1A2A3A] rounded-xl bg-[#1A2A3A]/20">
                                        <div className="flex flex-col md:flex-row justify-between gap-4">
                                            <div className="flex gap-4">
                                                <div
                                                    className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0 text-white font-bold text-lg"
                                                    aria-hidden="true"
                                                >
                                                    {req.emp.charAt(0)}
                                                </div>
                                                <div>
                                                    <h3 className="text-base font-semibold text-white">{req.emp}</h3>
                                                    <p className="text-xs text-[#8899AA]">{req.dept} · {req.id}</p>
                                                    <p className="mt-2 text-sm text-white">
                                                        <span className="text-[#8899AA]">Reason:</span> {req.reason}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end justify-between">
                                                <div className="text-right">
                                                    <p className="text-sm text-[#8899AA] mb-1">Requested Amount</p>
                                                    <h4 className="text-xl font-bold text-emerald-400">₹{req.amount.toLocaleString()}</h4>
                                                </div>
                                                <div className="flex gap-2 mt-4">
                                                    <Button variant="danger" size="sm">Reject</Button>
                                                    <Button variant="primary" size="sm">Approve &amp; Disburse</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center p-12 text-[#8899AA] bg-[#1A2A3A]/20 rounded-xl border border-dashed border-[#2A3A4A]">
                                <CheckCircle2 size={48} className="mb-3 text-[#2A3A4A]" aria-hidden="true" />
                                <p>No pending advance salary requests.</p>
                            </div>
                        )}
                    </Card>

                    {/* Recent Disbursements */}
                    <Card padding="none">
                        <div className="p-6 border-b border-[#1A2A3A]">
                            <h2 className="text-lg font-bold text-white">Recent Disbursements</h2>
                        </div>
                        <div className="p-4">
                            <DataTable<Disbursement>
                                data={DISBURSEMENTS}
                                columns={DISBURSEMENT_COLUMNS}
                                rowKey={(r) => r.id}
                                aria-label="Recent disbursements"
                                emptyTitle="No disbursements yet"
                            />
                        </div>
                    </Card>
                </div>

                {/* Policy Sidebar */}
                <div className="lg:col-span-1">
                    <Card padding="lg" className="border-indigo-500/20 bg-gradient-to-br from-indigo-500/10 to-blue-500/5">
                        <div className="flex items-center gap-3 mb-4">
                            <AlertTriangle size={24} className="text-indigo-400" aria-hidden="true" />
                            <h2 className="text-lg font-bold text-white">Policy Summary</h2>
                        </div>
                        <ul className="text-sm text-[#8899AA] space-y-3 mb-6">
                            {POLICY_POINTS.map((point) => (
                                <li key={point} className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 mt-1.5 rounded-full bg-indigo-400 flex-shrink-0" aria-hidden="true" />
                                    {point}
                                </li>
                            ))}
                        </ul>
                        <Button variant="secondary" className="w-full">Edit Policy Guidelines</Button>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
