"use client";
import ChartWrapper from "@/components/ui/ChartWrapper";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, Legend } from "recharts";
import { Download, Filter, Calendar, Star } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import DataTable, { type Column } from "@/components/ui/DataTable";

const VOLUME_DATA = [
    { name: "Mon", it: 45, hr: 22 },
    { name: "Tue", it: 52, hr: 28 },
    { name: "Wed", it: 38, hr: 18 },
    { name: "Thu", it: 65, hr: 24 },
    { name: "Fri", it: 48, hr: 20 },
];

const TYPE_DATA = [
    { name: "Access Requests", value: 400, color: "#33E6FF" },
    { name: "Hardware", value: 300, color: "#9D00FF" },
    { name: "Payroll", value: 200, color: "#FFB020" },
    { name: "Other", value: 100, color: "#00E5A0" },
];

const KPI_CARDS = [
    { label: "Total Tickets Created", value: "1,245", delta: "+12% vs last month", positive: false },
    { label: "Resolution Rate", value: "94%", delta: "+2% vs last month", positive: true },
    { label: "Avg Resolution Time", value: "4h 12m", delta: "-45m vs last month", positive: true },
    { label: "SLA Compliance", value: "98.2%", delta: "+0.5% vs last month", positive: true },
] as const;

interface Agent {
    name: string;
    avatar: string;
    handled: number;
    time: string;
    breach: string;
    csat: number;
}

const AGENTS: Agent[] = [
    { name: "Amit Verma", avatar: "AV", handled: 145, time: "45m", breach: "1.2%", csat: 4.9 },
    { name: "Priya Singh", avatar: "PS", handled: 120, time: "1h 15m", breach: "2.5%", csat: 4.7 },
    { name: "Rahul Deshmukh", avatar: "RD", handled: 98, time: "2h 30m", breach: "5.0%", csat: 4.4 },
    { name: "Sneha Rao", avatar: "SR", handled: 110, time: "1h 50m", breach: "3.1%", csat: 4.8 },
];

const agentColumns: Column<Agent>[] = [
    {
        key: "name",
        label: "Agent Name",
        render: (row) => (
            <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#2A3A4A] bg-[#1A2A3A] text-xs font-bold">
                    {row.avatar}
                </div>
                <span className="font-semibold">{row.name}</span>
            </div>
        ),
    },
    {
        key: "handled",
        label: "Tickets Handled",
        render: (row) => <span className="font-mono text-[#8899AA]">{row.handled}</span>,
    },
    {
        key: "time",
        label: "Avg Res Time",
        render: (row) => <span className="text-[#8899AA]">{row.time}</span>,
    },
    {
        key: "breach",
        label: "SLA Breach %",
        render: (row) => (
            <span className={`font-bold ${parseFloat(row.breach) > 3 ? "text-[#FF4444]" : "text-[#00E5A0]"}`}>
                {row.breach}
            </span>
        ),
    },
    {
        key: "csat",
        label: "CSAT Score",
        render: (row) => (
            <div className="flex items-center gap-1.5 text-[#FFB020]">
                <Star size={14} fill="currentColor" aria-hidden="true" />
                <span className="font-bold text-white">{row.csat}</span>
            </div>
        ),
    },
];

export default function HelpdeskReportsPage() {
    return (
        <Page
            title="Helpdesk Analytics & Reports"
            subtitle="Deep dive into ticketing metrics, agent workload, and SLA compliance."
            breadcrumbs={[
                { label: "Helpdesk", href: "/helpdesk/dashboard" },
                { label: "Reports" },
            ]}
            maxWidth="1400px"
            actions={
                <>
                    <Button variant="secondary" icon={<Calendar size={16} aria-hidden="true" />}>
                        Last 30 Days
                    </Button>
                    <Button icon={<Download size={16} aria-hidden="true" />}>
                        Export CSV
                    </Button>
                </>
            }
        >
            <div className="space-y-8">
                {/* KPI Cards */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {KPI_CARDS.map((card) => (
                        <Card key={card.label} padding="lg">
                            <h3 className="mb-2 text-sm font-medium text-[#8899AA]">{card.label}</h3>
                            <div className="flex items-end gap-3">
                                <span className="text-3xl font-bold text-white">{card.value}</span>
                                <span
                                    className={`mb-1 text-xs font-bold ${
                                        card.positive ? "text-[#00E5A0]" : "text-[#FF4444]"
                                    }`}
                                >
                                    {card.delta}
                                </span>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    <Card padding="lg">
                        <div className="mb-6 flex items-center justify-between">
                            <h3 className="text-lg font-bold text-white">Ticket Volume (IT vs HR)</h3>
                            <button
                                type="button"
                                aria-label="Filter chart"
                                className="text-[#8899AA] transition-colors hover:text-white"
                            >
                                <Filter size={16} aria-hidden="true" />
                            </button>
                        </div>
                        <div className="h-[300px]">
                            <ChartWrapper height="h-full">
                                <BarChart
                                    data={VOLUME_DATA}
                                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" vertical={false} />
                                    <XAxis
                                        dataKey="name"
                                        stroke="#445566"
                                        tick={{ fill: "#8899AA", fontSize: 12 }}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <YAxis
                                        stroke="#445566"
                                        tick={{ fill: "#8899AA", fontSize: 12 }}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "#0A1420",
                                            borderColor: "#1A2A3A",
                                            borderRadius: "8px",
                                        }}
                                        itemStyle={{ color: "#fff" }}
                                        cursor={{ fill: "#1A2A3A", opacity: 0.4 }}
                                    />
                                    <Legend
                                        wrapperStyle={{ paddingTop: "20px", fontSize: "12px", color: "#8899AA" }}
                                    />
                                    <Bar dataKey="it" name="IT Support" fill="#33E6FF" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="hr" name="HR Ops" fill="#9D00FF" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ChartWrapper>
                        </div>
                    </Card>

                    <Card padding="lg">
                        <div className="mb-6 flex items-center justify-between">
                            <h3 className="text-lg font-bold text-white">
                                Ticket Distribution by Category
                            </h3>
                            <button
                                type="button"
                                aria-label="Filter chart"
                                className="text-[#8899AA] transition-colors hover:text-white"
                            >
                                <Filter size={16} aria-hidden="true" />
                            </button>
                        </div>
                        <div className="flex h-[300px] items-center">
                            <ChartWrapper height="h-full">
                                <PieChart>
                                    <Pie
                                        data={TYPE_DATA}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={80}
                                        outerRadius={110}
                                        paddingAngle={5}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {TYPE_DATA.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "#0A1420",
                                            borderColor: "#1A2A3A",
                                            borderRadius: "8px",
                                            color: "#fff",
                                        }}
                                    />
                                    <Legend
                                        verticalAlign="middle"
                                        align="right"
                                        layout="vertical"
                                        iconType="circle"
                                        wrapperStyle={{ fontSize: "12px", color: "#8899AA" }}
                                    />
                                </PieChart>
                            </ChartWrapper>
                        </div>
                    </Card>
                </div>

                {/* Agent Performance Table */}
                <Card padding="none">
                    <div className="border-b border-[#1A2A3A] p-6">
                        <h3 className="text-lg font-bold text-white">Agent Performance Index</h3>
                    </div>
                    <DataTable<Agent>
                        data={AGENTS}
                        columns={agentColumns}
                        rowKey={(row) => row.name}
                        aria-label="Agent performance index"
                    />
                </Card>
            </div>
        </Page>
    );
}
