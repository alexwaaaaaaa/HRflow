"use client";

import { useState } from "react";
import { Download, TrendingUp } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import DataTable, { type Column } from "@/components/ui/DataTable";

// migrated: immersive-ui

interface Employee {
    id: string;
    name: string;
    dept: string;
    fixed: number;
    flexi: number;
    retiral: number;
    variable: number;
    totalCTC: number;
}

const EMPLOYEES: Employee[] = [
    { id: "EMP-001", name: "Anita Kulkarni", dept: "Engineering", fixed: 2400000, flexi: 480000, retiral: 156000, variable: 300000, totalCTC: 3336000 },
    { id: "EMP-042", name: "Rahul Sharma", dept: "Sales", fixed: 1200000, flexi: 240000, retiral: 78000, variable: 600000, totalCTC: 2118000 },
    { id: "EMP-089", name: "Meena Joshi", dept: "Finance", fixed: 1800000, flexi: 360000, retiral: 117000, variable: 150000, totalCTC: 2427000 },
    { id: "EMP-121", name: "Karan Singh", dept: "Sales", fixed: 900000, flexi: 180000, retiral: 58500, variable: 450000, totalCTC: 1588500 },
];

const CTC_BREAKDOWN = [
    { label: "Fixed Base", val: "65%", amt: "₹6.15 Cr" },
    { label: "Flexi (FBP)", val: "15%", amt: "₹1.42 Cr" },
    { label: "Retirals (PF/Gratuity)", val: "6%", amt: "₹0.56 Cr" },
    { label: "Variable / Bonus", val: "14%", amt: "₹1.33 Cr" },
] as const;

function TrendIndicator({ val }: { val: number }) {
    if (val > 2000000) return <TrendingUp size={12} className="text-emerald-500 inline ml-1" aria-label="High CTC" />;
    return null;
}

const COLUMNS: Column<Employee>[] = [
    {
        key: "employee",
        label: "Employee",
        render: (e) => (
            <div>
                <span className="text-white font-semibold text-sm">
                    {e.name}
                    <TrendIndicator val={e.totalCTC} />
                </span>
                <div className="text-[#8899AA] text-[10px] mt-0.5">{e.id} · {e.dept}</div>
            </div>
        ),
        sortable: true,
        sortValue: (e) => e.name,
    },
    {
        key: "fixed",
        label: "Fixed Base",
        align: "right",
        render: (e) => <span className="text-[#c8d8e8]">₹{e.fixed.toLocaleString()}</span>,
        sortable: true,
        sortValue: (e) => e.fixed,
    },
    {
        key: "flexi",
        label: "Flexi (FBP)",
        align: "right",
        render: (e) => <span className="text-[#c8d8e8]">₹{e.flexi.toLocaleString()}</span>,
        hideOnMobile: true,
    },
    {
        key: "retiral",
        label: "Retirals (ER)",
        align: "right",
        render: (e) => <span className="text-[#c8d8e8]">₹{e.retiral.toLocaleString()}</span>,
        hideOnMobile: true,
    },
    {
        key: "variable",
        label: "Variable/Bonus",
        align: "right",
        render: (e) => <span className="text-[#c8d8e8]">₹{e.variable.toLocaleString()}</span>,
        hideOnMobile: true,
    },
    {
        key: "totalCTC",
        label: "Total CTC (PA)",
        align: "right",
        render: (e) => <span className="text-blue-400 font-bold">₹{e.totalCTC.toLocaleString()}</span>,
        sortable: true,
        sortValue: (e) => e.totalCTC,
    },
];

export default function CTCReportScreen() {
    const [search, setSearch] = useState("");

    const filtered = EMPLOYEES.filter(
        (e) => !search || e.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Page
            title="CTC & Compensation Report"
            subtitle="Detailed breakdown of company liability (Fixed, Flexi, Retirals, and Variable)"
            breadcrumbs={[
                { label: "Payroll", href: "/payroll/dashboard" },
                { label: "Reports", href: "/payroll-reports" },
                { label: "CTC" },
            ]}
            maxWidth="1200px"
            actions={
                <Button icon={<Download size={14} aria-hidden="true" />}>Export to Excel</Button>
            }
        >
            {/* KPI Strip */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card padding="md">
                    <div className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-2">Total CTC (Annualized)</div>
                    <div className="text-3xl font-black text-blue-400">₹9.46 Cr</div>
                    <div className="text-xs text-[#8899AA] mt-1">Across 342 active employees</div>
                </Card>
                <Card padding="md" className="md:col-span-3">
                    <div className="flex items-center gap-8 flex-wrap">
                        {CTC_BREAKDOWN.map((c) => (
                            <div key={c.label} className="flex-1 min-w-[100px]">
                                <div className="flex justify-between items-baseline mb-1">
                                    <span className="text-white font-bold">{c.val}</span>
                                    <span className="text-[#8899AA] text-xs">{c.amt}</span>
                                </div>
                                <div
                                    className="h-1.5 bg-[#1A2A3A] rounded-full overflow-hidden mb-2"
                                    role="progressbar"
                                    aria-valuenow={parseInt(c.val)}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                    aria-label={`${c.label}: ${c.val}`}
                                >
                                    <div className="h-full bg-blue-500 rounded-full" style={{ width: c.val }} />
                                </div>
                                <div className="text-[10px] text-[#8899AA] uppercase tracking-wider font-bold">{c.label}</div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Employee Table */}
            <Card padding="none">
                <div className="p-4 border-b border-[#1A2A3A] flex items-center justify-between bg-[#060D1A]">
                    <span className="text-white font-bold text-sm">Employee CTC Breakdown</span>
                    <div className="relative w-72">
                        <label htmlFor="ctc-search" className="sr-only">Search employee</label>
                        <input
                            id="ctc-search"
                            type="search"
                            placeholder="Search employee..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-lg pl-3 pr-3 py-1.5 text-white text-xs focus:border-blue-500 outline-none"
                        />
                    </div>
                </div>
                <DataTable<Employee>
                    data={filtered}
                    columns={COLUMNS}
                    rowKey={(e) => e.id}
                    aria-label="Employee CTC breakdown"
                    emptyTitle="No employees found"
                />
            </Card>
        </Page>
    );
}
