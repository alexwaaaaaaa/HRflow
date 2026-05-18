"use client";

import { GitCompare, Download, TrendingUp, TrendingDown, Minus } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import DataTable, { type Column } from "@/components/ui/DataTable";

// migrated: immersive-ui

interface VarianceItem {
    item: string;
    current: number;
    previous: number;
    var: number;
    pct: number;
    r: string;
}

const VARIANCES: VarianceItem[] = [
    { item: "Basic Salary", current: 21050000, previous: 20800000, var: 250000, pct: 1.2, r: "Increments & New Joinees" },
    { item: "HRA", current: 9550000, previous: 9400000, var: 150000, pct: 1.6, r: "Increments & New Joinees" },
    { item: "Special Allowance", current: 18000000, previous: 17800000, var: 200000, pct: 1.1, r: "Restructuring" },
    { item: "Performance Bonus", current: 3900000, previous: 1200000, var: 2700000, pct: 225.0, r: "Quarterly Payout Cycle" },
    { item: "Leave Encashment", current: 0, previous: 850000, var: -850000, pct: -100.0, r: "Annual event completed in Feb" },
    { item: "TDS Deduction", current: -7100000, previous: -6800000, var: -300000, pct: 4.4, r: "Due to higher bonus payouts" },
];

const COLUMNS: Column<VarianceItem>[] = [
    {
        key: "item",
        label: "Component",
        render: (v) => <span className="font-semibold text-white">{v.item}</span>,
        sortable: true,
        sortValue: (v) => v.item,
    },
    {
        key: "previous",
        label: "Feb 2026",
        align: "right",
        render: (v) => <span className="text-[#c8d8e8]">₹{v.previous.toLocaleString()}</span>,
        hideOnMobile: true,
    },
    {
        key: "current",
        label: "Mar 2026",
        align: "right",
        render: (v) => <span className="text-[#c8d8e8]">₹{v.current.toLocaleString()}</span>,
    },
    {
        key: "var",
        label: "Variance (₹)",
        align: "right",
        render: (v) => (
            <span className="text-white font-bold tracking-wide">
                {v.var > 0 ? "+" : ""}{v.var.toLocaleString()}
            </span>
        ),
        sortable: true,
        sortValue: (v) => v.var,
    },
    {
        key: "pct",
        label: "Var (%)",
        align: "center",
        render: (v) => (
            <div className={`flex items-center justify-center gap-1 font-bold ${v.pct > 0 ? "text-pink-400" : v.pct < 0 ? "text-emerald-400" : "text-[#8899AA]"}`}>
                {v.pct > 0 ? <TrendingUp size={11} aria-hidden="true" /> : v.pct < 0 ? <TrendingDown size={11} aria-hidden="true" /> : <Minus size={11} aria-hidden="true" />}
                {Math.abs(v.pct).toFixed(1)}%
            </div>
        ),
    },
    {
        key: "r",
        label: "Remarks / Primary Driver",
        render: (v) => <span className="text-[#8899AA] text-xs">{v.r}</span>,
        hideOnMobile: true,
    },
];

export default function VarianceReportScreen() {
    return (
        <Page
            title="Payroll Variance Report"
            subtitle="Compare March 2026 payroll vs February 2026 payroll to audit changes"
            breadcrumbs={[
                { label: "Payroll", href: "/payroll/dashboard" },
                { label: "Reports", href: "/payroll-reports" },
                { label: "Variance" },
            ]}
            maxWidth="1100px"
            actions={
                <Button icon={<Download size={14} aria-hidden="true" />}>Export Excel</Button>
            }
        >
            {/* Summary Banner */}
            <Card padding="lg">
                <div className="flex flex-col md:flex-row justify-between items-center text-center gap-6">
                    <div className="flex-1">
                        <div className="text-[#8899AA] text-sm font-bold mb-1">Previous (Feb 2026)</div>
                        <div className="text-xl font-bold text-white">₹4,32,00,000</div>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-[#1A2A3A] flex items-center justify-center text-[#8899AA] font-black italic shrink-0" aria-hidden="true">VS</div>
                    <div className="flex-1">
                        <div className="text-[#8899AA] text-sm font-bold mb-1">Current (Mar 2026)</div>
                        <div className="text-xl font-bold text-white">₹4,52,50,000</div>
                    </div>
                    <div className="flex-1 border-t md:border-t-0 md:border-l border-[#1A2A3A] pt-4 md:pt-0 md:pl-8 text-left">
                        <div className="text-[#8899AA] text-sm font-bold mb-1">Net Variance</div>
                        <div className="flex items-center gap-2 text-2xl font-black text-pink-400">
                            <TrendingUp size={22} aria-hidden="true" /> ₹20,50,000
                            <span className="text-sm px-2 py-0.5 bg-pink-500/10 rounded-lg">+4.7%</span>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Variance Table */}
            <Card padding="none">
                <div className="flex items-center gap-2 p-4 border-b border-[#1A2A3A] bg-[#060D1A]">
                    <GitCompare size={16} className="text-pink-400" aria-hidden="true" />
                    <span className="text-white font-bold text-sm">Component-wise Variance</span>
                </div>
                <DataTable<VarianceItem>
                    data={VARIANCES}
                    columns={COLUMNS}
                    rowKey={(v) => v.item}
                    aria-label="Payroll component variance report"
                />
            </Card>
        </Page>
    );
}
