"use client";

import { AlertTriangle, FileText, CheckCircle2 } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

interface EMIItem {
    id: string;
    emp: string;
    loanId: string;
    instalment: string;
    principal: number;
    interest: number;
    total: number;
    status: "Queued" | "Shortfall (LOP)";
}

const EMI_ITEMS: EMIItem[] = [
    { id: "E-001", emp: "Ananya S", loanId: "LN-8812", instalment: "9 of 24", principal: 9500, interest: 2000, total: 11500, status: "Queued" },
    { id: "E-002", emp: "Rahul K", loanId: "LN-8809", instalment: "13 of 36", principal: 12000, interest: 4000, total: 16000, status: "Queued" },
    { id: "E-003", emp: "Vikram R", loanId: "LN-8750", instalment: "19 of 60", principal: 12500, interest: 4000, total: 16500, status: "Shortfall (LOP)" },
];

const COLUMNS: Column<EMIItem>[] = [
    {
        key: "emp", label: "Loan ID / Employee", render: (e) => (
            <div>
                <div className="text-white font-medium">{e.emp}</div>
                <div className="text-xs text-[#8899AA] font-mono mt-0.5">{e.loanId}</div>
            </div>
        ),
    },
    { key: "instalment", label: "Instalment", align: "center", render: (e) => <span className="text-white">{e.instalment}</span> },
    { key: "principal", label: "Principal Bal", align: "right", render: (e) => <span className="text-[#8899AA]">₹{e.principal.toLocaleString()}</span> },
    { key: "interest", label: "Interest EMI", align: "right", render: (e) => <span className="text-[#8899AA]">₹{e.interest.toLocaleString()}</span> },
    {
        key: "total", label: "Total EMI", align: "right",
        render: (e) => <span className={`font-bold ${e.status === "Shortfall (LOP)" ? "text-amber-500" : "text-white"}`}>₹{e.total.toLocaleString()}</span>,
    },
    {
        key: "status", label: "Payroll Status", align: "center",
        render: (e) => e.status === "Queued"
            ? <Badge variant="success"><CheckCircle2 size={12} className="inline mr-1" aria-hidden="true" />Queued</Badge>
            : <Badge variant="warning">{e.status}</Badge>,
    },
];

export default function LoanRepaymentPage() {
    return (
        <Page
            title="Repayment Tracking"
            subtitle="Monitor expected payroll recoveries vs actual collections for loan EMIs."
            breadcrumbs={[
                { label: "Finance", href: "/finance/dashboard" },
                { label: "Loans", href: "/finance/loans" },
                { label: "Repayment Master" },
            ]}
            maxWidth="1300px"
            actions={
                <Button>Sync with Payroll</Button>
            }
        >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <Card padding="lg" className="lg:col-span-2">
                    <h2 className="text-lg font-bold text-white mb-6">Current Payroll Cycle (Oct 2025)</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="border border-[#1A2A3A] rounded-xl p-4 bg-[#1A2A3A]/30">
                            <p className="text-[#8899AA] text-xs font-medium mb-1">Expected Recovery</p>
                            <h3 className="text-xl font-bold text-white">₹18,54,320</h3>
                            <p className="text-xs text-[#8899AA] mt-1">Across 142 EMIs</p>
                        </div>
                        <div className="border border-[#1A2A3A] rounded-xl p-4 bg-emerald-500/5">
                            <p className="text-[#8899AA] text-xs font-medium mb-1">Queued successfully</p>
                            <h3 className="text-xl font-bold text-emerald-400">₹18,10,000</h3>
                            <p className="text-[10px] text-emerald-400/80 mt-1 uppercase tracking-widest">Matched w/ Payslips</p>
                        </div>
                        <div className="border border-[#1A2A3A] rounded-xl p-4 bg-pink-500/5">
                            <p className="text-[#8899AA] text-xs font-medium mb-1">Shortfalls / Blocked</p>
                            <h3 className="text-xl font-bold text-pink-400">₹44,320</h3>
                            <p className="text-[10px] text-pink-400/80 mt-1 uppercase tracking-widest">3 Exceptions Found</p>
                        </div>
                    </div>
                </Card>

                <Card padding="lg" className="flex flex-col justify-center">
                    <div className="text-center mb-4">
                        <AlertTriangle size={32} className="text-amber-500 mx-auto mb-2" aria-hidden="true" />
                        <h3 className="text-lg font-bold text-white">Manual Intervention Required</h3>
                        <p className="text-sm text-[#8899AA] mt-1">3 employees have shortfalls delaying closure.</p>
                    </div>
                    <Button variant="secondary" className="w-full text-amber-500">Review Exceptions</Button>
                </Card>
            </div>

            <Card padding="none">
                <div className="p-4 border-b border-[#1A2A3A] flex flex-col md:flex-row justify-between items-center gap-4">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                        <FileText size={20} className="text-[#8899AA]" aria-hidden="true" />
                        EMI Schedule Line Items
                    </h2>
                    <input
                        type="search"
                        placeholder="Search employee..."
                        aria-label="Search EMI schedule"
                        className="w-full md:w-64 bg-[#1A2A3A] border border-[#2A3A4A] text-white text-sm rounded-lg px-4 py-2 focus:outline-none focus:border-emerald-400 transition-colors"
                    />
                </div>
                <div className="p-4">
                    <DataTable<EMIItem>
                        data={EMI_ITEMS}
                        columns={COLUMNS}
                        rowKey={(e) => e.id}
                        aria-label="EMI schedule line items"
                        emptyTitle="No EMI items"
                    />
                </div>
            </Card>
        </Page>
    );
}
