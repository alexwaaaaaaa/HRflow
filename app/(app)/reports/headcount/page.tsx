"use client";

import { Download, Filter, TrendingUp, PieChart as PieChartIcon, MapPin } from "lucide-react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line,
} from "recharts";

import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import DataTable, { type Column } from "@/components/ui/DataTable";
import ChartWrapper from "@/components/ui/ChartWrapper";

// ─── Static data ──────────────────────────────────────────────────────────────

const DEPT_DATA = [
    { name: "Engineering", headcount: 145 },
    { name: "Sales", headcount: 85 },
    { name: "Marketing", headcount: 40 },
    { name: "HR & Admin", headcount: 15 },
    { name: "Finance", headcount: 20 },
];

const GENDER_DATA = [
    { name: "Male", value: 180 },
    { name: "Female", value: 115 },
    { name: "Non-Binary", value: 10 },
];

const TENURE_DATA = [
    { month: "Jan", value: 285 },
    { month: "Feb", value: 290 },
    { month: "Mar", value: 298 },
    { month: "Apr", value: 305 },
];

// Static color array — no template literals
const PIE_COLORS = ["#00E5FF", "#8B5CF6", "#F59E0B"] as const;

interface LocationRow {
    id: string;
    location: string;
    headcount: number;
    pct: string;
}

const LOCATIONS: LocationRow[] = [
    { id: "blr", location: "Bengaluru (HQ)", headcount: 180, pct: "59%" },
    { id: "mum", location: "Mumbai", headcount: 85, pct: "28%" },
    { id: "rem", location: "Remote (India)", headcount: 40, pct: "13%" },
];

const LOCATION_COLUMNS: Column<LocationRow>[] = [
    {
        key: "location",
        label: "Location",
        render: (r) => (
            <span className="flex items-center gap-3 text-white">
                <MapPin size={16} className="text-[#8899AA]" aria-hidden="true" />
                {r.location}
            </span>
        ),
        sortable: true,
        sortValue: (r) => r.location,
    },
    {
        key: "headcount",
        label: "Headcount",
        align: "right",
        render: (r) => <span className="text-white">{r.headcount}</span>,
        sortable: true,
        sortValue: (r) => r.headcount,
    },
    {
        key: "pct",
        label: "% of Total",
        align: "right",
        render: (r) => <span className="text-[#8899AA]">{r.pct}</span>,
    },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HeadcountReportPage() {
    return (
        <Page
            title="Headcount Analytics"
            subtitle="Real-time breakdown of employee distribution across dimensions."
            breadcrumbs={[
                { label: "Reports", href: "/reports/dashboard" },
                { label: "Headcount Report" },
            ]}
            maxWidth="1280px"
            actions={
                <>
                    <Button variant="secondary" icon={<Filter size={14} aria-hidden="true" />}>
                        Filter
                    </Button>
                    <Button icon={<Download size={14} aria-hidden="true" />}>Export CSV</Button>
                </>
            }
        >
            <div className="space-y-6">
                {/* KPI cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card padding="lg">
                        <p className="text-[#8899AA] text-sm font-medium mb-2">Total Headcount</p>
                        <p className="text-3xl font-bold text-white mb-1">305</p>
                        <p className="text-xs text-[#8899AA]">+7 since last month</p>
                    </Card>
                    <Card padding="lg">
                        <p className="text-[#8899AA] text-sm font-medium mb-2">Full-Time</p>
                        <p className="text-3xl font-bold text-indigo-400 mb-1">280</p>
                        <p className="text-xs text-[#8899AA]">91.8% of workforce</p>
                    </Card>
                    <Card padding="lg">
                        <p className="text-[#8899AA] text-sm font-medium mb-2">Contractors</p>
                        <p className="text-3xl font-bold text-amber-500 mb-1">25</p>
                        <p className="text-xs text-[#8899AA]">8.2% of workforce</p>
                    </Card>
                    <Card padding="lg">
                        <p className="text-[#8899AA] text-sm font-medium mb-2">Avg. Tenure</p>
                        <p className="text-3xl font-bold text-emerald-400 mb-1">3.2 Yrs</p>
                        <p className="text-xs text-[#8899AA]">Stable core team</p>
                    </Card>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card padding="lg">
                        <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                            <PieChartIcon size={18} className="text-indigo-400" aria-hidden="true" />
                            Distribution by Department
                        </h2>
                        <div className="h-[300px] w-full">
                            <ChartWrapper height="h-full">
                                <BarChart
                                    data={DEPT_DATA}
                                    layout="vertical"
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" horizontal={false} />
                                    <XAxis type="number" stroke="#8899AA" fontSize={12} />
                                    <YAxis
                                        dataKey="name"
                                        type="category"
                                        stroke="#8899AA"
                                        fontSize={12}
                                        width={80}
                                    />
                                    <Tooltip
                                        cursor={{ fill: "#1A2A3A" }}
                                        contentStyle={{
                                            backgroundColor: "#0B1221",
                                            border: "1px solid #2A3A4A",
                                            borderRadius: "8px",
                                        }}
                                    />
                                    <Bar dataKey="headcount" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={20} />
                                </BarChart>
                            </ChartWrapper>
                        </div>
                    </Card>

                    <Card padding="lg">
                        <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                            <TrendingUp size={18} className="text-emerald-400" aria-hidden="true" />
                            Headcount Growth (YTD)
                        </h2>
                        <div className="h-[300px] w-full">
                            <ChartWrapper height="h-full">
                                <LineChart
                                    data={TENURE_DATA}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" vertical={false} />
                                    <XAxis dataKey="month" stroke="#8899AA" fontSize={12} />
                                    <YAxis
                                        stroke="#8899AA"
                                        fontSize={12}
                                        domain={["dataMin - 10", "dataMax + 10"]}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "#0B1221",
                                            border: "1px solid #2A3A4A",
                                            borderRadius: "8px",
                                        }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#00E5FF"
                                        strokeWidth={3}
                                        dot={{ r: 4, fill: "#00E5FF", strokeWidth: 2, stroke: "#0B1221" }}
                                        activeDot={{ r: 6 }}
                                    />
                                </LineChart>
                            </ChartWrapper>
                        </div>
                    </Card>
                </div>

                {/* Diversity + Location */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Card padding="lg">
                        <h2 className="text-sm font-bold text-[#8899AA] mb-6 text-center uppercase tracking-wider">
                            Gender Diversity
                        </h2>
                        <div className="h-[200px] w-full flex justify-center">
                            <ChartWrapper height="h-full">
                                <PieChart>
                                    <Pie
                                        data={GENDER_DATA}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={2}
                                        dataKey="value"
                                    >
                                        {GENDER_DATA.map((_entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={PIE_COLORS[index % PIE_COLORS.length]}
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "#0B1221",
                                            border: "1px solid #2A3A4A",
                                            borderRadius: "8px",
                                        }}
                                    />
                                </PieChart>
                            </ChartWrapper>
                        </div>
                        <div className="flex justify-center flex-wrap gap-4 mt-2">
                            {GENDER_DATA.map((entry, index) => (
                                <div key={index} className="flex items-center gap-2 text-xs text-[#8899AA]">
                                    <span
                                        className="w-2 h-2 rounded-full"
                                        style={{ backgroundColor: PIE_COLORS[index % PIE_COLORS.length] }}
                                        aria-hidden="true"
                                    />
                                    {entry.name}:{" "}
                                    <span className="text-white font-medium">{entry.value}</span>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <div className="lg:col-span-2">
                        <Card padding="none">
                            <div className="p-4 border-b border-[#1A2A3A] flex justify-between items-center">
                                <h2 className="text-sm font-bold text-white">Location Breakdown</h2>
                            </div>
                            <DataTable<LocationRow>
                                data={LOCATIONS}
                                columns={LOCATION_COLUMNS}
                                rowKey={(r) => r.id}
                                emptyTitle="No locations"
                                aria-label="Headcount by location"
                            />
                        </Card>
                    </div>
                </div>
            </div>
        </Page>
    );
}
