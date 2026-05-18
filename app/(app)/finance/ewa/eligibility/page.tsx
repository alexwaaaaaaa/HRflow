"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, Filter } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

interface Employee {
    id: string;
    name: string;
    dept: string;
    tenure: string;
    status: "Eligible" | "Not Eligible" | "Blocked";
    reason?: string;
    limit: string;
    policy: string;
}

const EMPLOYEES: Employee[] = [
    { id: "EMP-042", name: "Ananya Sharma", dept: "Engineering", tenure: "2.5 yrs", status: "Eligible", limit: "₹45,000", policy: "Standard FTE" },
    { id: "EMP-091", name: "Rahul Kumar", dept: "Design", tenure: "3 mos", status: "Not Eligible", reason: "Probation", limit: "N/A", policy: "Probationers / Interns" },
    { id: "EMP-112", name: "Sneha Rao", dept: "HR", tenure: "4 yrs", status: "Eligible", limit: "₹85,000", policy: "Tenured Leaders" },
    { id: "EMP-210", name: "Amit Verma", dept: "Sales", tenure: "1.2 yrs", status: "Blocked", reason: "Notice Period", limit: "₹0", policy: "Standard FTE" },
    { id: "EMP-305", name: "Priya Menon", dept: "Engineering", tenure: "11 mos", status: "Eligible", limit: "₹35,000", policy: "Standard FTE" },
];

const KPI_TILES = [
    { label: "Total Eligible Workforce", value: "85%", sub: "1,024 of 1,200 employees", valueColor: "text-emerald-400" },
    { label: "In Probation", value: "10%", sub: "120 employees blocked", valueColor: "text-white" },
    { label: "Notice / Absconding Blocked", value: "56", sub: "Auto-blocked from App", valueColor: "text-pink-400" },
    { label: "Total Potential Exposure", value: "₹4.5 Cr", sub: "If everyone withdraws max", valueColor: "text-[#00E5FF]" },
] as const;

const COLUMNS: Column<Employee>[] = [
    {
        key: "name", label: "Employee", render: (e) => (
            <div>
                <div className="text-white font-medium">{e.name}</div>
                <div className="text-[#8899AA] text-xs mt-0.5">{e.id} · {e.dept}</div>
            </div>
        ), sortable: true, sortValue: (e) => e.name,
    },
    { key: "tenure", label: "Tenure", render: (e) => <span className="text-[#8899AA]">{e.tenure}</span> },
    {
        key: "policy", label: "Policy Tier", render: (e) => (
            <span className="bg-[#1A2A3A] border border-[#2A3A4A] px-2 py-1 rounded text-xs text-white">{e.policy}</span>
        ),
    },
    { key: "limit", label: "Max Limit (Base)", align: "right", render: (e) => <span className="font-mono font-bold text-[#00E5FF]">{e.limit}</span> },
    {
        key: "status", label: "Eligibility / Status", align: "center",
        render: (e) => {
            if (e.status === "Eligible") return <Badge variant="success"><CheckCircle2 size={12} className="inline mr-1" aria-hidden="true" />Eligible</Badge>;
            if (e.status === "Not Eligible") return (
                <div className="flex flex-col items-center gap-1">
                    <Badge variant="neutral">Not Eligible</Badge>
                    {e.reason && <span className="text-[10px] text-[#8899AA] uppercase tracking-wider">{e.reason}</span>}
                </div>
            );
            return (
                <div className="flex flex-col items-center gap-1">
                    <Badge variant="danger"><XCircle size={12} className="inline mr-1" aria-hidden="true" />Auto-Blocked</Badge>
                    {e.reason && <span className="text-[10px] text-[#8899AA] uppercase tracking-wider">{e.reason}</span>}
                </div>
            );
        },
    },
    {
        key: "action", label: "Action", align: "center",
        render: () => <Button variant="ghost" size="sm">Override</Button>,
    },
];

export default function EWAEligibilityPage() {
    const [search, setSearch] = useState("");

    const filtered = search
        ? EMPLOYEES.filter((e) =>
            e.name.toLowerCase().includes(search.toLowerCase()) ||
            e.id.toLowerCase().includes(search.toLowerCase()) ||
            e.dept.toLowerCase().includes(search.toLowerCase())
        )
        : EMPLOYEES;

    return (
        <Page
            title="Eligibility Register"
            subtitle="Review system-calculated eligibility and dynamic withdrawal limits per employee"
            breadcrumbs={[
                { label: "Finance", href: "/finance/dashboard" },
                { label: "EWA", href: "/finance/ewa" },
                { label: "Eligibility Register" },
            ]}
            maxWidth="1300px"
        >
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
                {KPI_TILES.map((tile) => (
                    <Card key={tile.label} padding="lg">
                        <p className="text-[#8899AA] text-sm font-medium mb-1">{tile.label}</p>
                        <h3 className={`text-2xl font-bold mb-1 ${tile.valueColor}`}>{tile.value}</h3>
                        <p className="text-xs text-[#8899AA]">{tile.sub}</p>
                    </Card>
                ))}
            </div>

            <Card padding="none">
                <div className="p-4 border-b border-[#1A2A3A] flex flex-col md:flex-row justify-between items-center gap-4">
                    <input
                        type="search"
                        placeholder="Search by name, ID, or department..."
                        aria-label="Search employees"
                        className="w-full md:w-96 bg-[#1A2A3A] border border-[#2A3A4A] text-white text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-emerald-400 transition-colors"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Button variant="secondary" icon={<Filter size={14} />}>Status Filter</Button>
                </div>
                <div className="p-4">
                    <DataTable<Employee>
                        data={filtered}
                        columns={COLUMNS}
                        rowKey={(e) => e.id}
                        aria-label="EWA eligibility register"
                        emptyTitle="No employees found"
                        emptyDescription="Try adjusting your search."
                    />
                </div>
            </Card>
        </Page>
    );
}
