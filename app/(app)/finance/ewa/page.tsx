"use client";

import Link from "next/link";
import { History, Info, AlertCircle, ArrowRight } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";
import ChartWrapper from "@/components/ui/ChartWrapper";

interface Withdrawal {
    id: string;
    date: string;
    cycle: string;
    amount: number;
    fee: number;
    status: "Completed" | "Recovered";
}

const WITHDRAWAL_HISTORY: Withdrawal[] = [
    { id: "WTH-9291", date: "2025-10-12", amount: 15000, fee: 150, status: "Completed", cycle: "Oct 2025" },
    { id: "WTH-9102", date: "2025-09-05", amount: 8000, fee: 80, status: "Recovered", cycle: "Sep 2025" },
    { id: "WTH-8854", date: "2025-07-20", amount: 25000, fee: 250, status: "Recovered", cycle: "Jul 2025" },
];

const PAYCYCLE_PROJECTION = [
    { day: "1st", earned: 5000, available: 2500 },
    { day: "5th", earned: 25000, available: 12500 },
    { day: "10th", earned: 50000, available: 25000 },
    { day: "15th", earned: 75000, available: 37500 },
    { day: "20th", earned: 100000, available: 50000 },
    { day: "25th", earned: 125000, available: 62500 },
];

const COLUMNS: Column<Withdrawal>[] = [
    { key: "id", label: "Transaction ID", render: (w) => <span className="font-mono text-[#00E5FF]">{w.id}</span> },
    { key: "date", label: "Date", render: (w) => <span className="text-white font-medium">{w.date}</span> },
    { key: "cycle", label: "Pay Cycle", render: (w) => <span className="text-[#8899AA]">{w.cycle}</span> },
    { key: "amount", label: "Amount", align: "right", render: (w) => <span className="text-white font-medium">₹{w.amount.toLocaleString()}</span> },
    { key: "fee", label: "Fee Deducted", align: "right", render: (w) => <span className="text-pink-400 font-medium">₹{w.fee.toLocaleString()}</span> },
    {
        key: "status", label: "Recovery Status", align: "center",
        render: (w) => w.status === "Completed"
            ? <Badge variant="warning">Pending Auto-Deduction</Badge>
            : <Badge variant="success">Recovered in Payroll</Badge>,
    },
];

export default function EWADashboardPage() {
    return (
        <Page
            title="My On-Demand Salary"
            subtitle="Access your earned salary before payday. Flat fee of 1% per transaction."
            breadcrumbs={[
                { label: "Finance", href: "/finance/dashboard" },
                { label: "Earned Wage Access" },
            ]}
            maxWidth="1200px"
            actions={
                <Button icon={<ArrowRight size={14} />} iconRight href="/finance/ewa/withdraw">Withdraw Salary</Button>
            }
        >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Available Balance Card */}
                <Card padding="lg" className="lg:col-span-1 relative overflow-hidden flex flex-col justify-between">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-[#00E5FF] opacity-10 rounded-full blur-3xl -mr-20 -mt-20" aria-hidden="true" />
                    <div>
                        <div className="flex justify-between items-start mb-2">
                            <p className="text-[#8899AA] text-sm font-medium">Available to Withdraw Now</p>
                            <Badge variant="info">Oct Pay Cycle</Badge>
                        </div>
                        <h2 className="text-5xl font-black text-white tracking-tight mb-2">₹37,500</h2>
                        <p className="text-sm text-[#8899AA] flex items-center gap-1">
                            <Info size={16} aria-hidden="true" />
                            Based on 15 days of work (50% cap limit)
                        </p>
                    </div>
                    <div className="mt-8 pt-6 border-t border-[#1A2A3A]">
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-[#8899AA]">Total Salary Earned</span>
                            <span className="text-white font-medium">₹75,000</span>
                        </div>
                        <div className="w-full bg-[#1A2A3A] rounded-full h-2" role="progressbar" aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} aria-label="Salary accrual progress">
                            <div className="bg-[#00E5FF] h-2 rounded-full w-1/2 shadow-[0_0_10px_rgba(0,229,255,0.5)]" />
                        </div>
                    </div>
                </Card>

                {/* Accrual Chart */}
                <Card padding="lg" className="lg:col-span-2">
                    <h3 className="text-lg font-bold text-white mb-1">Salary Accrual Projection</h3>
                    <p className="text-xs text-[#8899AA] mb-6">See how your available withdrawal limit grows daily.</p>
                    <div className="h-64">
                        <ChartWrapper height="h-full">
                            <AreaChart data={PAYCYCLE_PROJECTION} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorAvail" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#00E5FF" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" vertical={false} />
                                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#8899AA", fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#8899AA", fontSize: 12 }} tickFormatter={(val) => `₹${val / 1000}k`} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: "#1A2A3A", border: "none", borderRadius: "8px", color: "#fff" }}
                                    formatter={(value: any) => [`₹${value?.toLocaleString?.() ?? value}`, "Amount"]}
                                />
                                <Area type="monotone" dataKey="available" name="Available Limit" stroke="#00E5FF" strokeWidth={3} fillOpacity={1} fill="url(#colorAvail)" />
                            </AreaChart>
                        </ChartWrapper>
                    </div>
                    <div className="flex items-center gap-2 mt-4 text-xs text-amber-500 bg-amber-500/10 p-3 rounded-lg border border-amber-500/20" role="status">
                        <AlertCircle size={16} className="shrink-0" aria-hidden="true" />
                        Next payday is 1st of November. Any amounts withdrawn will be automatically deducted from your net pay.
                    </div>
                </Card>
            </div>

            {/* Recent Withdrawals */}
            <Card padding="none">
                <div className="p-6 border-b border-[#1A2A3A] flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <History size={20} className="text-[#8899AA]" aria-hidden="true" />
                        Recent Withdrawals
                    </h3>
                    <Link href="/finance/ewa/history" className="text-sm font-medium text-[#00E5FF] hover:underline">View All</Link>
                </div>
                <div className="p-4">
                    <DataTable<Withdrawal>
                        data={WITHDRAWAL_HISTORY}
                        columns={COLUMNS}
                        rowKey={(w) => w.id}
                        aria-label="Recent EWA withdrawals"
                        emptyTitle="No withdrawals yet"
                    />
                </div>
            </Card>
        </Page>
    );
}
