"use client";

import { TrendingUp, AlertTriangle, Info, Download, Filter, CheckCircle2, ChevronRight, PieChart } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

// migrated: immersive-ui

type BenchmarkStatus = "good" | "warning" | "danger";

interface BenchmarkRow {
    id: number;
    role: string;
    grade: string;
    internalMedian: string;
    p25: string;
    p50: string;
    p75: string;
    position: string;
    gap: string;
    status: BenchmarkStatus;
}

const BENCHMARK_DATA: BenchmarkRow[] = [
    { id: 1, role: "Sr. Software Eng.", grade: "L5", internalMedian: "₹14,00,000", p25: "₹11,00,000", p50: "₹13,00,000", p75: "₹16,00,000", position: "58th pctile", gap: "+₹1,00,000 vs median", status: "good" },
    { id: 2, role: "HR Business Partner", grade: "L4", internalMedian: "₹9,00,000", p25: "₹8,50,000", p50: "₹10,50,000", p75: "₹13,00,000", position: "38th pctile", gap: "-₹1,50,000 vs median", status: "warning" },
    { id: 3, role: "Data Analyst", grade: "L3", internalMedian: "₹7,20,000", p25: "₹7,50,000", p50: "₹9,00,000", p75: "₹11,00,000", position: "33rd pctile", gap: "-₹1,80,000 vs median", status: "danger" },
    { id: 4, role: "Sales Executive", grade: "L2", internalMedian: "₹5,40,000", p25: "₹4,80,000", p50: "₹5,80,000", p75: "₹7,00,000", position: "42nd pctile", gap: "-₹40,000 vs median", status: "warning" },
    { id: 5, role: "Engineering Manager", grade: "L6", internalMedian: "₹28,00,000", p25: "₹22,00,000", p50: "₹26,00,000", p75: "₹32,00,000", position: "65th pctile", gap: "+₹2,00,000 vs median", status: "good" },
];

const STATUS_BADGE: Record<BenchmarkStatus, "success" | "warning" | "danger"> = {
    good: "success",
    warning: "warning",
    danger: "danger",
};

const LEVEL_SCORES = [
    { label: "Entry Level", score: 68, note: "Slightly below market", color: "bg-amber-500" },
    { label: "Mid Level", score: 74, note: "At market", color: "bg-[#00E5A0]" },
    { label: "Senior Level", score: 81, note: "Above market", color: "bg-[#00E5A0]" },
] as const;

const COLUMNS: Column<BenchmarkRow>[] = [
    {
        key: "role",
        label: "Role",
        render: (r) => <span className="font-medium text-white">{r.role}</span>,
        sortable: true,
        sortValue: (r) => r.role,
    },
    {
        key: "grade",
        label: "Grade",
        render: (r) => <span className="text-[#8899AA]">{r.grade}</span>,
    },
    {
        key: "internalMedian",
        label: "Internal Median",
        render: (r) => <span className="font-semibold text-white">{r.internalMedian}</span>,
    },
    {
        key: "p25",
        label: "P25 Market",
        render: (r) => <span className="text-[#8899AA]">{r.p25}</span>,
        hideOnMobile: true,
    },
    {
        key: "p50",
        label: "P50 Market",
        render: (r) => <span className="text-[#8899AA]">{r.p50}</span>,
        hideOnMobile: true,
    },
    {
        key: "p75",
        label: "P75 Market",
        render: (r) => <span className="text-[#8899AA]">{r.p75}</span>,
        hideOnMobile: true,
    },
    {
        key: "position",
        label: "Position",
        align: "center",
        render: (r) => (
            <Badge variant={STATUS_BADGE[r.status]}>
                {r.status === "good" && <CheckCircle2 size={11} className="mr-1" aria-hidden="true" />}
                {r.status !== "good" && <AlertTriangle size={11} className="mr-1" aria-hidden="true" />}
                {r.position}
            </Badge>
        ),
    },
    {
        key: "gap",
        label: "Gap",
        render: (r) => (
            <span className={r.status === "good" ? "text-[#c8d8e8]" : "text-[#FF4444]"}>
                {r.gap}
            </span>
        ),
    },
];

const PRIORITY_ROLES = ["Data Analyst", "HR BP", "Sales Exec"] as const;

export default function CompensationBenchmarkingPage() {
    return (
        <Page
            title="Compensation Benchmarking"
            subtitle="Company pay positioning vs India market data (Mercer/Radford survey 2024)"
            breadcrumbs={[
                { label: "Payroll", href: "/payroll/dashboard" },
                { label: "Benchmarking" },
            ]}
            maxWidth="1300px"
            actions={
                <>
                    <Button variant="secondary" icon={<Filter size={14} aria-hidden="true" />}>Filter</Button>
                    <Button icon={<Download size={14} aria-hidden="true" />}>Export Report</Button>
                </>
            }
        >
            {/* Competitive Pay Index */}
            <Card padding="lg">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div
                        className="flex flex-col items-center justify-center p-4 bg-[#060B14] rounded-full w-48 h-48 border-8 border-[#00E5A0] shadow-[0_0_20px_rgba(0,229,160,0.2)] shrink-0"
                        role="meter"
                        aria-valuenow={72}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label="Competitive Pay Index: 72 out of 100"
                    >
                        <span className="text-5xl font-bold text-[#00E5A0]">72</span>
                        <span className="text-sm text-[#8899AA] mt-1">/ 100</span>
                        <span className="text-sm font-medium text-[#00E5A0] mt-2">Competitive</span>
                    </div>

                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
                        {LEVEL_SCORES.map((lvl) => (
                            <Card key={lvl.label} padding="md">
                                <p className="text-[#8899AA] text-sm font-medium">{lvl.label}</p>
                                <div className="flex items-end gap-3 mt-2">
                                    <span className="text-3xl font-bold text-white">{lvl.score}</span>
                                    <span className="text-sm text-[#8899AA] mb-1">{lvl.note}</span>
                                </div>
                                <div
                                    className="w-full h-1.5 bg-[#1A2A3A] rounded-full mt-4"
                                    role="progressbar"
                                    aria-valuenow={lvl.score}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                    aria-label={`${lvl.label} score: ${lvl.score}`}
                                >
                                    <div className={`h-full ${lvl.color} rounded-full`} style={{ width: `${lvl.score}%` }} />
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </Card>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Benchmarking Table */}
                <div className="lg:col-span-2 space-y-4">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                        <TrendingUp size={18} className="text-[#8899AA]" aria-hidden="true" /> Role-wise Benchmarking
                    </h3>
                    <Card padding="none">
                        <DataTable<BenchmarkRow>
                            data={BENCHMARK_DATA}
                            columns={COLUMNS}
                            rowKey={(r) => r.id}
                            aria-label="Role-wise compensation benchmarking"
                        />
                    </Card>
                </div>

                {/* Recommendations Sidebar */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                        <Info size={18} className="text-[#00E5A0]" aria-hidden="true" /> Recommendations
                    </h3>

                    <Card padding="md">
                        <div className="space-y-5">
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-[#FF4444]/10 rounded-lg shrink-0" aria-hidden="true">
                                    <AlertTriangle size={18} className="text-[#FF4444]" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-white mb-1">Retention Risk</h4>
                                    <p className="text-sm text-[#8899AA]">3 roles are currently below P25 of market rate, leading to high potential attrition.</p>
                                </div>
                            </div>

                            <div className="h-px bg-[#1A2A3A]" />

                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-[#FFB800]/10 rounded-lg shrink-0" aria-hidden="true">
                                    <PieChart size={18} className="text-[#FFB800]" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-white mb-1">Budget Required</h4>
                                    <div className="text-xl font-bold mt-1 text-white">₹42,00,000<span className="text-sm font-normal text-[#8899AA]">/year</span></div>
                                    <p className="text-sm text-[#8899AA] mt-1">Recommended budget to bring all below-market roles to P50 (median) level.</p>
                                </div>
                            </div>

                            <div className="h-px bg-[#1A2A3A]" />

                            <div>
                                <h4 className="font-medium text-white mb-3">Priority Roles to Fix</h4>
                                <ul className="space-y-1" role="list">
                                    {PRIORITY_ROLES.map((role) => (
                                        <li key={role}>
                                            <button
                                                type="button"
                                                className="w-full flex items-center justify-between p-2 -mx-2 rounded-lg hover:bg-[#1A2A3A]/50 transition-colors text-left"
                                                aria-label={`View details for ${role}`}
                                            >
                                                <span className="text-sm text-[#c8d8e8]">{role}</span>
                                                <ChevronRight size={14} className="text-[#8899AA]" aria-hidden="true" />
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <Button variant="secondary" className="w-full mt-4">
                                Initialize Salary Revision
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
