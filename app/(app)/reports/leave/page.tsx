"use client";

import { Download, Filter, CalendarCheck, UserX, Palmtree } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import DataTable, { type Column } from "@/components/ui/DataTable";
import ChartWrapper from "@/components/ui/ChartWrapper";

// ─── Static data ──────────────────────────────────────────────────────────────

const LEAVE_DATA = [
    { dept: "Engineering", "Annual Leave": 450, "Sick Leave": 120, Unpaid: 15 },
    { dept: "Sales", "Annual Leave": 320, "Sick Leave": 90, Unpaid: 25 },
    { dept: "Marketing", "Annual Leave": 180, "Sick Leave": 40, Unpaid: 5 },
    { dept: "HR", "Annual Leave": 80, "Sick Leave": 20, Unpaid: 0 },
];

interface HighBalanceRow {
    id: string;
    name: string;
    dept: string;
    balance: string;
    liability: string;
}

const HIGH_BALANCE: HighBalanceRow[] = [
    { id: "hb1", name: "Ramesh K", dept: "Engineering", balance: "42 Days", liability: "₹1,85,000" },
    { id: "hb2", name: "Swati Desai", dept: "Sales", balance: "38 Days", liability: "₹2,10,000" },
];

const HIGH_BALANCE_COLUMNS: Column<HighBalanceRow>[] = [
    {
        key: "name",
        label: "Employee",
        render: (r) => <span className="font-medium text-white">{r.name}</span>,
        sortable: true,
        sortValue: (r) => r.name,
    },
    {
        key: "dept",
        label: "Department",
        render: (r) => <span className="text-[#8899AA]">{r.dept}</span>,
    },
    {
        key: "balance",
        label: "Annual Leave Balance",
        render: (r) => <span className="text-amber-500 font-bold">{r.balance}</span>,
        sortable: true,
        sortValue: (r) => parseInt(r.balance),
    },
    {
        key: "liability",
        label: "Estimated Liability Value",
        align: "right",
        render: (r) => <span className="text-white">{r.liability}</span>,
    },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LeaveUtilizationReportPage() {
    return (
        <Page
            title="Leave Utilization Report"
            subtitle="Analyze time-off trends, accrued liabilities, and absenteeism."
            breadcrumbs={[
                { label: "Reports", href: "/reports/dashboard" },
                { label: "Leave Utilization" },
            ]}
            maxWidth="1280px"
            actions={
                <>
                    <Button variant="secondary" icon={<Filter size={14} aria-hidden="true" />}>
                        YTD (Jan – Mar)
                    </Button>
                    <Button icon={<Download size={14} aria-hidden="true" />}>Export Report</Button>
                </>
            }
        >
            <div className="space-y-6">
                {/* KPI cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card padding="lg" className="relative overflow-hidden">
                        <CalendarCheck
                            size={96}
                            className="absolute -right-4 -bottom-4 text-white opacity-5"
                            aria-hidden="true"
                        />
                        <p className="text-[#8899AA] text-sm font-medium mb-2">Total Leave Days Taken</p>
                        <p className="text-3xl font-bold text-white mb-1">1,450</p>
                        <p className="text-xs text-[#8899AA]">YTD across all types</p>
                    </Card>
                    <Card padding="lg" className="relative overflow-hidden">
                        <UserX
                            size={96}
                            className="absolute -right-4 -bottom-4 text-emerald-400 opacity-5"
                            aria-hidden="true"
                        />
                        <p className="text-[#8899AA] text-sm font-medium mb-2">Avg. Sick Days/Emp</p>
                        <p className="text-3xl font-bold text-emerald-400 mb-1">1.8</p>
                        <p className="text-xs text-[#8899AA]">Within normal limits (benchmark: 2.1)</p>
                    </Card>
                    <Card padding="lg" className="relative overflow-hidden">
                        <Palmtree
                            size={96}
                            className="absolute -right-4 -bottom-4 text-amber-500 opacity-5"
                            aria-hidden="true"
                        />
                        <p className="text-[#8899AA] text-sm font-medium mb-2">Accrued Leave Liability</p>
                        <p className="text-3xl font-bold text-amber-500 mb-1">₹4.2M</p>
                        <p className="text-xs text-[#8899AA]">Equivalent cost of unavailed leaves</p>
                    </Card>
                    <Card padding="lg" className="relative overflow-hidden">
                        <UserX
                            size={96}
                            className="absolute -right-4 -bottom-4 text-pink-400 opacity-5"
                            aria-hidden="true"
                        />
                        <p className="text-[#8899AA] text-sm font-medium mb-2">High Absenteeism Rate</p>
                        <p className="text-3xl font-bold text-pink-400 mb-1">2.4%</p>
                        <p className="text-xs text-[#8899AA]">Unplanned leave rate</p>
                    </Card>
                </div>

                {/* Chart */}
                <Card padding="lg">
                    <h2 className="text-lg font-bold text-white mb-6">Leave Consumption by Department</h2>
                    <div className="h-[400px] w-full">
                        <ChartWrapper height="h-full">
                            <BarChart
                                data={LEAVE_DATA}
                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" vertical={false} />
                                <XAxis dataKey="dept" stroke="#8899AA" fontSize={12} />
                                <YAxis stroke="#8899AA" fontSize={12} />
                                <Tooltip
                                    cursor={{ fill: "#1A2A3A" }}
                                    contentStyle={{
                                        backgroundColor: "#0B1221",
                                        border: "1px solid #2A3A4A",
                                        borderRadius: "8px",
                                    }}
                                />
                                <Legend wrapperStyle={{ paddingTop: "20px" }} />
                                <Bar
                                    dataKey="Annual Leave"
                                    stackId="a"
                                    fill="#10B981"
                                    radius={[0, 0, 4, 4]}
                                    barSize={40}
                                />
                                <Bar dataKey="Sick Leave" stackId="a" fill="#F59E0B" />
                                <Bar dataKey="Unpaid" stackId="a" fill="#EC4899" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ChartWrapper>
                    </div>
                </Card>

                {/* High balance table */}
                <Card padding="none">
                    <div className="p-4 border-b border-[#1A2A3A] flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                        <h2 className="text-sm font-bold text-white">
                            High Balance Alerts (&gt; 25 Days Unavailed)
                        </h2>
                        <span className="text-xs text-[#8899AA] px-2 py-1 bg-[#1A2A3A] rounded border border-[#2A3A4A]">
                            Encourage mandatory block leaves
                        </span>
                    </div>
                    <DataTable<HighBalanceRow>
                        data={HIGH_BALANCE}
                        columns={HIGH_BALANCE_COLUMNS}
                        rowKey={(r) => r.id}
                        emptyTitle="No high balance alerts"
                        aria-label="High leave balance alerts"
                    />
                </Card>
            </div>
        </Page>
    );
}
