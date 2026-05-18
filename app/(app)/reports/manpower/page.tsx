"use client";

import { Download } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import DataTable, { type Column } from "@/components/ui/DataTable";
import ChartWrapper from "@/components/ui/ChartWrapper";

// ─── Static data ──────────────────────────────────────────────────────────────

const MANPOWER_DATA = [
    { grade: "L1 (Entry)", budgeted: 150, actual: 140 },
    { grade: "L2 (Mid)", budgeted: 100, actual: 105 },
    { grade: "L3 (Senior)", budgeted: 40, actual: 38 },
    { grade: "L4 (Lead)", budgeted: 15, actual: 15 },
    { grade: "L5 (Exec)", budgeted: 5, actual: 5 },
];

type VarianceSign = "under" | "over" | "equal";

const VARIANCE_CLASS: Record<VarianceSign, string> = {
    under: "text-emerald-400",
    over: "text-pink-400",
    equal: "text-[#8899AA]",
};

interface DeptRow {
    id: string;
    dept: string;
    budget: number;
    actual: number;
    variance: string;
    sign: VarianceSign;
}

const DEPT_ROWS: DeptRow[] = [
    { id: "eng", dept: "Engineering", budget: 150, actual: 145, variance: "-5", sign: "under" },
    { id: "sal", dept: "Sales", budget: 80, actual: 85, variance: "+5 (Over)", sign: "over" },
    { id: "hr", dept: "HR & Admin", budget: 15, actual: 15, variance: "0", sign: "equal" },
];

const DEPT_COLUMNS: Column<DeptRow>[] = [
    {
        key: "dept",
        label: "Department",
        render: (r) => <span className="text-white">{r.dept}</span>,
        sortable: true,
        sortValue: (r) => r.dept,
    },
    {
        key: "budget",
        label: "Budget",
        align: "center",
        render: (r) => <span className="text-[#8899AA]">{r.budget}</span>,
    },
    {
        key: "actual",
        label: "Actual",
        align: "center",
        render: (r) => <span className="font-medium text-white">{r.actual}</span>,
    },
    {
        key: "variance",
        label: "Variance",
        align: "center",
        render: (r) => <span className={VARIANCE_CLASS[r.sign]}>{r.variance}</span>,
    },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ManpowerReportPage() {
    return (
        <Page
            title="Manpower vs Budget"
            subtitle="Compare actual headcount against approved Annual Operating Plan (AOP)."
            breadcrumbs={[
                { label: "Reports", href: "/reports/dashboard" },
                { label: "Manpower Planning" },
            ]}
            maxWidth="1280px"
            actions={
                <Button icon={<Download size={14} aria-hidden="true" />}>Export Report</Button>
            }
        >
            <div className="space-y-6">
                {/* AOP summary */}
                <Card padding="lg">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div className="flex flex-wrap items-center gap-8">
                            <div>
                                <p className="text-[#8899AA] text-sm mb-1">AOP Budget (FY26)</p>
                                <p className="text-3xl font-bold text-white">310</p>
                            </div>
                            <div className="hidden md:block w-px h-12 bg-[#2A3A4A]" aria-hidden="true" />
                            <div>
                                <p className="text-[#8899AA] text-sm mb-1">Actual Headcount</p>
                                <p className="text-3xl font-bold text-indigo-400">303</p>
                            </div>
                            <div className="hidden md:block w-px h-12 bg-[#2A3A4A]" aria-hidden="true" />
                            <div>
                                <p className="text-[#8899AA] text-sm mb-1">Variance</p>
                                <p className="text-3xl font-bold text-emerald-400">-7 (Under)</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-[#8899AA] mb-1">Remaining Budget Utilisation</p>
                            <p className="text-xl font-bold text-amber-500">97.7%</p>
                        </div>
                    </div>
                </Card>

                {/* Chart + table */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card padding="lg">
                        <h2 className="text-lg font-bold text-white mb-6">Budget vs Actual by Level</h2>
                        <div className="h-[300px] w-full">
                            <ChartWrapper height="h-full">
                                <BarChart
                                    data={MANPOWER_DATA}
                                    margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" vertical={false} />
                                    <XAxis dataKey="grade" stroke="#8899AA" fontSize={12} />
                                    <YAxis stroke="#8899AA" fontSize={12} />
                                    <Tooltip
                                        cursor={{ fill: "#1A2A3A" }}
                                        contentStyle={{
                                            backgroundColor: "#0B1221",
                                            border: "1px solid #2A3A4A",
                                            borderRadius: "8px",
                                        }}
                                    />
                                    <Bar
                                        dataKey="budgeted"
                                        name="Budgeted AOP"
                                        fill="#1A2A3A"
                                        stroke="#8899AA"
                                        radius={[4, 4, 0, 0]}
                                    />
                                    <Bar
                                        dataKey="actual"
                                        name="Actual Filled"
                                        fill="#F59E0B"
                                        radius={[4, 4, 0, 0]}
                                    />
                                </BarChart>
                            </ChartWrapper>
                        </div>
                    </Card>

                    <Card padding="none">
                        <div className="p-4 border-b border-[#1A2A3A]">
                            <h2 className="text-sm font-bold text-white">Department Variance Grid</h2>
                        </div>
                        <DataTable<DeptRow>
                            data={DEPT_ROWS}
                            columns={DEPT_COLUMNS}
                            rowKey={(r) => r.id}
                            emptyTitle="No department data"
                            aria-label="Department variance grid"
                        />
                    </Card>
                </div>
            </div>
        </Page>
    );
}
