"use client";

import { Download, Filter, Award } from "lucide-react";

import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

// ─── Static data (module scope) ───────────────────────────────────────────────

type TrainingStatus = "Completed" | "In Progress" | "Pending";

const STATUS_VARIANT: Record<TrainingStatus, "success" | "info" | "warning"> = {
    Completed: "success",
    "In Progress": "info",
    Pending: "warning",
};

interface TrainingRow {
    id: string;
    employee: string;
    dept: string;
    module: string;
    status: TrainingStatus;
    score: string;
}

const TRAINING_ROWS: TrainingRow[] = [
    {
        id: "t1",
        employee: "Rahul Verma",
        dept: "Engineering",
        module: "POSH 2026",
        status: "Completed",
        score: "100%",
    },
    {
        id: "t2",
        employee: "Aditi Iyer",
        dept: "Sales",
        module: "Code of Conduct",
        status: "Pending",
        score: "—",
    },
    {
        id: "t3",
        employee: "Priya Nair",
        dept: "Marketing",
        module: "Information Security Basics",
        status: "Completed",
        score: "92%",
    },
    {
        id: "t4",
        employee: "Karan Mehta",
        dept: "HR",
        module: "Leadership Dynamics",
        status: "In Progress",
        score: "—",
    },
];

const TRAINING_COLUMNS: Column<TrainingRow>[] = [
    {
        key: "employee",
        label: "Employee",
        render: (r) => <span className="font-medium text-white">{r.employee}</span>,
        sortable: true,
        sortValue: (r) => r.employee,
    },
    {
        key: "dept",
        label: "Department",
        render: (r) => <span className="text-[#8899AA]">{r.dept}</span>,
        hideOnMobile: true,
    },
    {
        key: "module",
        label: "Module Name",
        render: (r) => <span className="font-medium text-white">{r.module}</span>,
        sortable: true,
        sortValue: (r) => r.module,
    },
    {
        key: "status",
        label: "Status",
        render: (r) => <Badge variant={STATUS_VARIANT[r.status]}>{r.status}</Badge>,
    },
    {
        key: "score",
        label: "Score",
        align: "right",
        render: (r) => <span className="text-white">{r.score}</span>,
    },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TrainingReportPage() {
    return (
        <Page
            title="Training & Compliance"
            subtitle="Monitor mandatory training completions across all departments."
            breadcrumbs={[
                { label: "Reports", href: "/reports/dashboard" },
                { label: "Training Completion" },
            ]}
            maxWidth="1280px"
            actions={
                <>
                    <Button variant="secondary" icon={<Filter size={14} aria-hidden="true" />}>
                        Q1 2026
                    </Button>
                    <Button icon={<Download size={14} aria-hidden="true" />}>Export Report</Button>
                </>
            }
        >
            <div className="space-y-6">
                {/* KPI strip */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card padding="lg">
                        <p className="text-[#8899AA] text-sm font-medium mb-2">Overall Compliance</p>
                        <p className="text-3xl font-bold text-emerald-400 mb-4">88%</p>
                        <div
                            className="w-full bg-[#1A2A3A] rounded-full h-1.5"
                            role="progressbar"
                            aria-valuenow={88}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-label="Overall compliance 88%"
                        >
                            <div className="bg-emerald-400 h-1.5 rounded-full w-[88%]" />
                        </div>
                    </Card>
                    <Card padding="lg">
                        <p className="text-[#8899AA] text-sm font-medium mb-2">Pending Certifications</p>
                        <p className="text-3xl font-bold text-amber-500 mb-1">142</p>
                        <p className="text-xs text-[#8899AA]">Due within 15 days</p>
                    </Card>
                    <Card padding="lg">
                        <p className="text-[#8899AA] text-sm font-medium mb-2">Average Score</p>
                        <p className="text-3xl font-bold text-indigo-400 mb-1">94/100</p>
                        <p className="text-xs text-[#8899AA]">Across mandatory assessments</p>
                    </Card>
                </div>

                {/* Training table */}
                <Card padding="none">
                    <div className="p-4 border-b border-[#1A2A3A] flex flex-col md:flex-row justify-between items-start md:items-center gap-3 bg-[#1A2A3A]/20">
                        <h2 className="text-sm font-bold text-white flex items-center gap-2">
                            <Award size={16} className="text-indigo-400" aria-hidden="true" />
                            POSH &amp; Code of Conduct Tracker
                        </h2>
                        <div>
                            <label htmlFor="training-status-filter" className="sr-only">
                                Filter by status
                            </label>
                            <select
                                id="training-status-filter"
                                className="bg-[#0B1221] border border-[#2A3A4A] text-[#8899AA] text-xs rounded px-2 py-1 focus:outline-none focus:border-[#00e5a0]"
                            >
                                <option>Status: All</option>
                                <option>Status: Pending</option>
                                <option>Status: Completed</option>
                            </select>
                        </div>
                    </div>
                    <DataTable<TrainingRow>
                        data={TRAINING_ROWS}
                        columns={TRAINING_COLUMNS}
                        rowKey={(r) => r.id}
                        searchable
                        searchPlaceholder="Search employees, modules…"
                        emptyTitle="No training records"
                        emptyDescription="No records match the current filters."
                        aria-label="Training completion tracker"
                    />
                </Card>
            </div>
        </Page>
    );
}
