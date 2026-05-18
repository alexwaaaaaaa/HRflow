"use client";
import React from 'react';
import { Download } from 'lucide-react';
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

const CHART_COLS = [
    { label: 'HRA', taxSaved: 24, total: 30, color: 'bg-indigo-500' },
    { label: 'LTA', taxSaved: 12, total: 16, color: 'bg-emerald-500' },
    { label: 'Medical', taxSaved: 8, total: 8, color: 'bg-rose-500' },
    { label: 'Vehicle', taxSaved: 15, total: 20, color: 'bg-amber-500' },
    { label: 'NPS', taxSaved: 18, total: 25, color: 'bg-blue-500' },
];

const EMPLOYEES = [
    { name: 'Anita Kulkarni', dept: 'Engineering', pool: 480000, nonTax: 280000, special: 200000, savings: 84000 },
    { name: 'Rahul Sharma', dept: 'Sales', pool: 360000, nonTax: 200000, special: 160000, savings: 60000 },
    { name: 'Vijay Kumar', dept: 'HR', pool: 360000, nonTax: 120000, special: 240000, savings: 36000 },
    { name: 'Meena Joshi', dept: 'Finance', pool: 400000, nonTax: 390000, special: 10000, savings: 117000 },
];

type EmpReport = typeof EMPLOYEES[number];

const COLUMNS: Column<EmpReport>[] = [
    {
        key: 'name',
        label: 'Employee Name',
        render: (emp) => (
            <div>
                <div className="text-white font-semibold">{emp.name}</div>
                <div className="text-[#556677] text-[10px]">{emp.dept}</div>
            </div>
        ),
    },
    {
        key: 'pool',
        label: 'FBP Pool',
        render: (emp) => <span className="text-[#AABBCC]">₹{emp.pool.toLocaleString()}</span>,
    },
    {
        key: 'nonTax',
        label: 'Non-Taxable Declared',
        render: (emp) => <span className="text-emerald-400 font-bold">₹{emp.nonTax.toLocaleString()}</span>,
    },
    {
        key: 'special',
        label: 'Special Allowance (Taxable)',
        render: (emp) => <span className="text-amber-400 font-semibold">₹{emp.special.toLocaleString()}</span>,
    },
    {
        key: 'savings',
        label: 'Est. Tax Savings',
        align: 'right',
        render: (emp) => (
            <Badge variant="success">₹{emp.savings.toLocaleString()}</Badge>
        ),
    },
];

export default function FBPAnnualReportScreen() {
    return (
        <Page
            title="FBP Annual Report"
            subtitle="Review the annual utilization and tax savings for the flexi-benefit plan (FY 2025-26)"
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "FBP", href: "/fbp/dashboard" },
                { label: "Annual Report", href: "/fbp/annual-report" },
            ]}
            actions={
                <Button variant="primary" size="md">
                    <Download size={16} aria-hidden="true" /> Export Consolidated
                </Button>
            }
        >
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Tax Savings Chart */}
                    <Card padding="lg" className="md:col-span-2">
                        <h3 className="text-white font-bold mb-6">Tax Savings Breakdown</h3>
                        <div className="flex items-end gap-6 h-48 border-b border-[#1A2A3A] pb-2 px-2">
                            {CHART_COLS.map(col => (
                                <div key={col.label} className="flex-1 flex flex-col items-center justify-end group">
                                    <span className="text-[10px] text-white opacity-0 group-hover:opacity-100 font-bold mb-1">₹{col.taxSaved}L Saved</span>
                                    <div className="w-16 bg-[#1A2A3A] rounded-t-lg relative" style={{ height: `${col.total * 3}px` }}>
                                        <div className={`absolute bottom-0 left-0 right-0 rounded-t-lg ${col.color}`} style={{ height: `${(col.taxSaved / col.total) * 100}%` }} />
                                    </div>
                                    <span className="text-xs text-[#8899AA] mt-3 font-semibold">{col.label}</span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 flex flex-wrap gap-4 text-xs text-[#556677]">
                            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-[#1A2A3A] rounded-sm" aria-hidden="true" /> Total Allocation</div>
                            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-purple-500 rounded-sm" aria-hidden="true" /> Actual Tax Savings Achieved</div>
                        </div>
                    </Card>

                    {/* Summary Stats */}
                    <Card padding="lg" className="flex flex-col justify-center text-center space-y-6">
                        <div>
                            <div className="text-4xl font-black text-emerald-400">₹77,00,000</div>
                            <div className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mt-2">Total Employee Tax Saved</div>
                            <div className="text-[#556677] text-[10px] mt-1">Due to Flexi-Benefit structuring in FY 25-26</div>
                        </div>
                        <div className="w-full h-px bg-[#1A2A3A]" />
                        <div>
                            <div className="text-3xl font-black text-white">92.4%</div>
                            <div className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mt-2">FBP Utilization Rate</div>
                            <div className="text-[#556677] text-[10px] mt-1">Employees who actively declared components</div>
                        </div>
                    </Card>
                </div>

                {/* Employee Report Table */}
                <div>
                    <h3 className="text-white font-bold text-sm mb-3">Employee Wise FBP Report</h3>
                    <DataTable
                        data={EMPLOYEES}
                        columns={COLUMNS}
                        rowKey={(emp) => emp.name}
                        aria-label="Employee FBP Report"
                    />
                </div>
            </div>
        </Page>
    );
}
