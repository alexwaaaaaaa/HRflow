"use client";

import { FileText, Download, CheckCircle2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";
import ChartWrapper from "@/components/ui/ChartWrapper";

interface RecoveryData {
    period: string;
    expected: number;
    recovered: number;
    unrecovered: number;
}

interface Deduction {
    id: string;
    emp: string;
    empId: string;
    type: string;
    amount: number;
    fee: number;
    total: number;
    payroll_status: string;
}

const RECOVERY_DATA: RecoveryData[] = [
    { period: "May 2025", expected: 450000, recovered: 450000, unrecovered: 0 },
    { period: "Jun 2025", expected: 485000, recovered: 480000, unrecovered: 5000 },
    { period: "Jul 2025", expected: 510000, recovered: 510000, unrecovered: 0 },
    { period: "Aug 2025", expected: 490000, recovered: 475000, unrecovered: 15000 },
    { period: "Sep 2025", expected: 550000, recovered: 540000, unrecovered: 10000 },
];

const PENDING_DEDUCTIONS: Deduction[] = [
    { id: "D-001", emp: "Ananya S", empId: "EMP-042", type: "EWA", amount: 15000, fee: 150, total: 15150, payroll_status: "Queued for OCT-2025" },
    { id: "D-002", emp: "Rahul K", empId: "EMP-091", type: "EWA", amount: 5000, fee: 50, total: 5050, payroll_status: "Queued for OCT-2025" },
    { id: "D-003", emp: "Sneha R", empId: "EMP-112", type: "Loan EMI", amount: 25000, fee: 0, total: 25000, payroll_status: "Queued for OCT-2025" },
];

const DEDUCTION_COLUMNS: Column<Deduction>[] = [
    {
        key: "emp", label: "Employee", render: (d) => (
            <div>
                <div className="text-white font-medium">{d.emp}</div>
                <div className="text-[#8899AA] text-xs mt-0.5 font-mono">{d.empId}</div>
            </div>
        ),
    },
    { key: "type", label: "Type", render: (d) => <span className="text-[#8899AA]">{d.type}</span> },
    { key: "amount", label: "Principal", align: "right", render: (d) => <span className="text-white">₹{d.amount.toLocaleString()}</span> },
    { key: "fee", label: "Fee / Interest", align: "right", render: (d) => <span className="text-pink-400">₹{d.fee.toLocaleString()}</span> },
    { key: "total", label: "Total Deduction", align: "right", render: (d) => <span className="text-emerald-400 font-bold">₹{d.total.toLocaleString()}</span> },
    { key: "payroll_status", label: "Payroll Status", align: "center", render: (d) => <Badge variant="warning">{d.payroll_status}</Badge> },
];

export default function EWARecoveryPage() {
    return (
        <Page
            title="Repayment & Recovery"
            subtitle="Manage automated deductions from payroll for EWA and Loans"
            breadcrumbs={[
                { label: "Finance", href: "/finance/dashboard" },
                { label: "EWA", href: "/finance/ewa" },
                { label: "Recovery Management" },
            ]}
            maxWidth="1300px"
            actions={
                <>
                    <Button variant="secondary" icon={<Download size={14} />}>Export Deduction Master</Button>
                    <Button>Sync to Payroll Engine</Button>
                </>
            }
        >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Collection Efficiency Chart */}
                <Card padding="lg" className="lg:col-span-2">
                    <h2 className="text-lg font-bold text-white mb-1">Collection Efficiency</h2>
                    <p className="text-xs text-[#8899AA] mb-6">Historical view of Expected vs Recovered amounts across payroll cycles</p>
                    <div className="h-64">
                        <ChartWrapper height="h-full">
                            <BarChart data={RECOVERY_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" vertical={false} />
                                <XAxis dataKey="period" axisLine={false} tickLine={false} tick={{ fill: "#8899AA", fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#8899AA", fontSize: 12 }} tickFormatter={(val) => `₹${val / 1000}k`} />
                                <Tooltip
                                    cursor={{ fill: "transparent" }}
                                    contentStyle={{ backgroundColor: "#1A2A3A", border: "none", borderRadius: "8px", color: "#fff" }}
                                    formatter={(value: any) => [`₹${value?.toLocaleString?.() ?? value}`, "Amount"]}
                                />
                                <Bar dataKey="recovered" name="Recovered" stackId="a" fill="#10B981" radius={[0, 0, 4, 4]} barSize={32} />
                                <Bar dataKey="unrecovered" name="Unrecovered (FFS/Abscond)" stackId="a" fill="#EC4899" radius={[4, 4, 0, 0]} barSize={32} />
                            </BarChart>
                        </ChartWrapper>
                    </div>
                </Card>

                {/* Upcoming Payroll Summary */}
                <Card padding="lg">
                    <h2 className="text-lg font-bold text-white mb-6">Upcoming Payroll (Oct &apos;25)</h2>
                    <div className="space-y-4 mb-8">
                        <div className="flex justify-between text-sm">
                            <span className="text-[#8899AA]">Total EWA Deductions</span>
                            <span className="text-white font-bold">₹4,15,500</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-[#8899AA]">Total Loan EMIs</span>
                            <span className="text-white font-bold">₹1,25,000</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-[#8899AA]">Total Processing Fees</span>
                            <span className="text-amber-400 font-bold">₹4,155</span>
                        </div>
                        <div className="pt-4 border-t border-[#1A2A3A]">
                            <div className="flex justify-between text-lg">
                                <span className="text-white font-bold">Total Recovery</span>
                                <span className="text-emerald-400 font-bold">₹5,44,655</span>
                            </div>
                            <p className="text-xs text-[#8899AA] mt-1 text-right">Across 112 employees</p>
                        </div>
                    </div>
                    <div className="bg-[#1A2A3A]/40 rounded-xl p-4 border border-[#2A3A4A] flex items-start gap-3">
                        <CheckCircle2 size={20} className="text-emerald-400 mt-0.5" aria-hidden="true" />
                        <div>
                            <h4 className="text-sm font-semibold text-white">Payroll Sync Status</h4>
                            <p className="text-xs text-[#8899AA] mt-1">Deduction master is ready to be pulled by the Payroll Engine for October processing.</p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Line-level Deductions */}
            <Card padding="none">
                <div className="p-4 border-b border-[#1A2A3A] flex items-center gap-2">
                    <FileText size={20} className="text-[#8899AA]" aria-hidden="true" />
                    <h2 className="text-lg font-bold text-white">Line-level Deductions (Oct &apos;25)</h2>
                </div>
                <div className="p-4">
                    <DataTable<Deduction>
                        data={PENDING_DEDUCTIONS}
                        columns={DEDUCTION_COLUMNS}
                        rowKey={(d) => d.id}
                        aria-label="Line-level payroll deductions"
                        emptyTitle="No deductions scheduled"
                    />
                </div>
            </Card>
        </Page>
    );
}
