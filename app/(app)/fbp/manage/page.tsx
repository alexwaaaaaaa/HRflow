"use client";
import React, { useState } from 'react';
import { Users, Search, Eye, CheckCircle2, Clock } from 'lucide-react';
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

const EMPS = [
    { name: 'Anita Kulkarni', dept: 'Engineering', pool: 480000, declared: 480000, status: 'Submitted', date: '02 Apr 2026' },
    { name: 'Rahul Sharma', dept: 'Sales', pool: 360000, declared: 360000, status: 'Submitted', date: '01 Apr 2026' },
    { name: 'Meena Joshi', dept: 'Finance', pool: 400000, declared: 380000, status: 'Draft', date: '—' },
    { name: 'Karan Singh', dept: 'Sales', pool: 320000, declared: 0, status: 'Pending', date: '—' },
    { name: 'Vijay Kumar', dept: 'HR', pool: 360000, declared: 360000, status: 'Submitted', date: '03 Apr 2026' },
    { name: 'Deepa Agrawal', dept: 'Finance', pool: 440000, declared: 0, status: 'Pending', date: '—' },
    { name: 'Priya Reddy', dept: 'Marketing', pool: 380000, declared: 380000, status: 'Submitted', date: '31 Mar 2026' },
];

type Emp = typeof EMPS[number];

const STATUS_VARIANT: Record<string, "success" | "warning" | "neutral"> = {
    Submitted: 'success',
    Draft: 'warning',
    Pending: 'neutral',
};

const COLUMNS: Column<Emp>[] = [
    {
        key: 'employee',
        label: 'Employee',
        render: (emp) => (
            <div>
                <div className="text-white font-semibold text-xs">{emp.name}</div>
                <div className="text-[#556677] text-[10px]">{emp.dept}</div>
            </div>
        ),
    },
    {
        key: 'pool',
        label: 'FBP Pool',
        render: (emp) => <span className="text-[#AABBCC] text-xs">₹{emp.pool.toLocaleString()}</span>,
    },
    {
        key: 'declared',
        label: 'Declared',
        render: (emp) =>
            emp.declared > 0 ? (
                <span className="text-white text-xs font-semibold">₹{emp.declared.toLocaleString()}</span>
            ) : (
                <span className="text-[#445566] text-xs">—</span>
            ),
    },
    {
        key: 'status',
        label: 'Status',
        render: (emp) => (
            <Badge variant={STATUS_VARIANT[emp.status] ?? 'neutral'}>{emp.status}</Badge>
        ),
    },
    {
        key: 'date',
        label: 'Submitted On',
        render: (emp) => <span className="text-[#556677] text-xs">{emp.date}</span>,
    },
    {
        key: 'action',
        label: 'Action',
        align: 'right',
        render: () => (
            <Button variant="ghost" size="sm" aria-label="View declaration">
                <Eye size={12} aria-hidden="true" /> View
            </Button>
        ),
    },
];

export default function FBPDeclarationManagement() {
    const [search, setSearch] = useState('');
    const filtered = EMPS.filter(e => !search || e.name.toLowerCase().includes(search.toLowerCase()));
    const submitted = EMPS.filter(e => e.status === 'Submitted').length;

    const statCards = [
        { label: 'Submitted', value: submitted, icon: CheckCircle2, color: 'text-emerald-400' },
        { label: 'Pending / Draft', value: EMPS.length - submitted, icon: Clock, color: 'text-amber-400' },
        { label: 'Total Employees', value: EMPS.length, icon: Users, color: 'text-purple-400' },
    ];

    return (
        <Page
            title="FBP Declaration Management"
            subtitle="Track and manage employee FBP declarations across the organization"
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "FBP", href: "/fbp/dashboard" },
                { label: "Manage", href: "/fbp/manage" },
            ]}
        >
            <div className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                    {statCards.map(s => {
                        const Icon = s.icon;
                        return (
                            <Card key={s.label} padding="md" className="flex items-center gap-4">
                                <Icon size={24} className={s.color} aria-hidden="true" />
                                <div>
                                    <div className={`text-3xl font-black ${s.color}`}>{s.value}</div>
                                    <div className="text-xs text-[#8899AA] font-bold">{s.label}</div>
                                </div>
                            </Card>
                        );
                    })}
                </div>

                <div className="relative">
                    <label htmlFor="fbp-search" className="sr-only">Search employees</label>
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]" aria-hidden="true" />
                    <input
                        id="fbp-search"
                        type="text"
                        placeholder="Search employee or department..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        aria-label="Search employees"
                        className="w-full bg-[#0A1420] border border-[#1A2A3A] rounded-xl pl-10 pr-4 py-2.5 text-white text-sm focus:border-purple-500 outline-none transition-colors"
                    />
                </div>

                <DataTable
                    data={filtered}
                    columns={COLUMNS}
                    rowKey={(emp) => emp.name}
                    aria-label="FBP Declarations"
                />
            </div>
        </Page>
    );
}
