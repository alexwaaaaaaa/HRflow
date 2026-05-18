"use client";

import Link from "next/link";
import {
    TrendingUp, TrendingDown, Download,
    CheckCircle2, X, ChevronRight,
} from "lucide-react";
import { useState } from "react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

interface Anomaly {
    id: string;
    name: string;
    dept: string;
    type: string;
    metric: string;
    prev: number;
    current: number;
    variance: number;
    reason: string;
    severity: "High" | "Medium" | "Low";
    status: "Unresolved" | "Resolved";
}

const ANOMALIES: Anomaly[] = [
    { id: "EMP-045", name: "Sneha Patil", dept: "Sales", type: "Spike", metric: "Gross Pay", prev: 85500, current: 110500, variance: 29.2, reason: "Sales Bonus (Q3) ₹25,000 added", severity: "Medium", status: "Unresolved" },
    { id: "EMP-821", name: "Anil Desai", dept: "Operations", type: "Drop", metric: "Net Pay", prev: 74200, current: 46475, variance: -37.3, reason: "Pro-rata processing (Joined 12 Nov)", severity: "Low", status: "Resolved" },
    { id: "EMP-204", name: "Vikram Reddy", dept: "Engineering", type: "Compliance", metric: "TDS", prev: 12000, current: 28500, variance: 137.5, reason: "Investment declaration missing. Switch to old regime default.", severity: "High", status: "Unresolved" },
    { id: "EMP-312", name: "Kiran Sharma", dept: "HR", type: "Spike", metric: "OT Hours", prev: 0, current: 48, variance: 100, reason: "48 hours OT logged in single month. Needs HR Head approval.", severity: "High", status: "Unresolved" },
    { id: "EMP-415", name: "Amit Kumar", dept: "Marketing", type: "Drop", metric: "Net Pay", prev: 65000, current: 32000, variance: -50.7, reason: "14 days LOP deducted", severity: "Medium", status: "Unresolved" },
];

const inr = (n: number) =>
    n < 1000
        ? String(n)
        : new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

const SEVERITY_VARIANT = {
    High: "danger",
    Medium: "warning",
    Low: "neutral",
} as const;

export default function AnomalyAlerts() {
    const [resolved, setResolved] = useState<string[]>(["EMP-821"]);

    const toggleResolve = (id: string) => {
        setResolved((prev) =>
            prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
        );
    };

    const COLUMNS: Column<Anomaly>[] = [
        {
            key: "employee",
            label: "Employee",
            render: (a) => (
                <div>
                    <p className="font-semibold text-white">{a.name}</p>
                    <p className="text-xs text-[#8899AA]">{a.id} · {a.dept}</p>
                </div>
            ),
            sortable: true,
            sortValue: (a) => a.name,
        },
        {
            key: "metric",
            label: "Metric",
            render: (a) => (
                <div>
                    <p className="text-sm text-white">{a.metric}</p>
                    <p className="text-xs text-[#8899AA]">{a.type}</p>
                </div>
            ),
        },
        {
            key: "prev",
            label: "Oct",
            align: "right",
            render: (a) => <span className="text-[#8899AA]">{inr(a.prev)}{a.metric === "OT Hours" ? " hrs" : ""}</span>,
        },
        {
            key: "current",
            label: "Nov",
            align: "right",
            render: (a) => <span className="font-medium text-white">{inr(a.current)}{a.metric === "OT Hours" ? " hrs" : ""}</span>,
        },
        {
            key: "variance",
            label: "Variance",
            align: "center",
            render: (a) => (
                <span className={`inline-flex items-center gap-1 rounded-xl px-2.5 py-1 text-xs font-semibold ${a.variance > 0 ? "bg-[rgba(255,184,0,0.1)] text-[#FFB800]" : "bg-[rgba(136,153,170,0.1)] text-[#8899AA]"}`}>
                    {a.variance > 0 ? <TrendingUp size={12} aria-hidden="true" /> : <TrendingDown size={12} aria-hidden="true" />}
                    {Math.abs(a.variance)}%
                </span>
            ),
        },
        {
            key: "severity",
            label: "Severity",
            render: (a) => (
                resolved.includes(a.id)
                    ? <Badge variant="success">Resolved</Badge>
                    : <Badge variant={SEVERITY_VARIANT[a.severity]}>{a.severity}</Badge>
            ),
        },
        {
            key: "reason",
            label: "Reason",
            render: (a) => <span className="text-xs text-[#8899AA]">{a.reason}</span>,
            hideOnMobile: true,
        },
        {
            key: "actions",
            label: "",
            align: "right",
            render: (a) => {
                const isRes = resolved.includes(a.id);
                return (
                    <div className="flex items-center gap-2">
                        <Button variant="secondary" size="sm" href="/payroll/payslips/bulk">View Payslip</Button>
                        <Button
                            variant={isRes ? "outline" : "secondary"}
                            size="sm"
                            icon={isRes ? <X size={12} aria-hidden="true" /> : <CheckCircle2 size={12} aria-hidden="true" />}
                            onClick={() => toggleResolve(a.id)}
                        >
                            {isRes ? "Unresolve" : "Mark Reviewed"}
                        </Button>
                    </div>
                );
            },
        },
    ];

    const unresolvedCount = ANOMALIES.filter((a) => !resolved.includes(a.id)).length;

    return (
        <Page
            title="Payroll Anomalies"
            subtitle="November 2024 · 18 potential issues detected that require your review."
            breadcrumbs={[
                { label: "Payroll", href: "/payroll" },
                { label: "Anomaly Alerts" },
            ]}
            maxWidth="1200px"
            actions={
                <Button variant="secondary" icon={<Download size={14} aria-hidden="true" />}>
                    Export Report
                </Button>
            }
        >
            <div className="space-y-6">
                {/* KPI Cards */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <p className="text-sm text-[#8899AA]">Total Anomalies</p>
                        <p className="mt-2 text-3xl font-bold text-white">18</p>
                        <p className="mt-1 text-sm text-[#00E5A0]">{unresolvedCount} unresolved</p>
                    </Card>
                    <Card>
                        <p className="text-sm text-[#8899AA]">High Severity</p>
                        <p className="mt-2 text-3xl font-bold text-red-400">3</p>
                        <p className="mt-1 text-sm text-red-400">Requires immediate action</p>
                    </Card>
                    <Card>
                        <p className="text-sm text-[#8899AA]">Salary Spikes (&gt;15%)</p>
                        <p className="mt-2 text-3xl font-bold text-[#FFB800]">8</p>
                        <p className="mt-1 text-sm text-[#8899AA]">Bonus / Sales Incentives</p>
                    </Card>
                    <Card>
                        <p className="text-sm text-[#8899AA]">Salary Drops (&lt;-15%)</p>
                        <p className="mt-2 text-3xl font-bold text-[#8899AA]">7</p>
                        <p className="mt-1 text-sm text-[#8899AA]">LOP / Pro-rata</p>
                    </Card>
                </div>

                {/* Anomalies Table */}
                <Card padding="none">
                    <DataTable<Anomaly>
                        data={ANOMALIES}
                        columns={COLUMNS}
                        rowKey={(a) => a.id}
                        searchable
                        searchPlaceholder="Search employee, metric, reason…"
                        aria-label="Payroll anomalies"
                        emptyTitle="No anomalies found"
                        emptyDescription="All payroll data looks normal."
                    />
                </Card>

                {/* Bottom Actions */}
                <div className="flex justify-center">
                    <Link href="/payroll/run/review-net">
                        <Button iconRight={<ChevronRight size={16} aria-hidden="true" />}>
                            Return to Payroll Wizard
                        </Button>
                    </Link>
                </div>
            </div>
        </Page>
    );
}
