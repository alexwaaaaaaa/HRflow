"use client";
import { XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area } from "recharts";
import {
    Ticket, Clock, Star, ArrowUpRight, ArrowDownRight,
    Filter, Download, AlertCircle, ChevronRight,
} from "lucide-react";
import Link from "next/link";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";
import ChartWrapper from "@/components/ui/ChartWrapper";

const TICKET_VOLUME = [
    { time: "08:00", it: 12, hr: 5 },
    { time: "10:00", it: 28, hr: 15 },
    { time: "12:00", it: 15, hr: 8 },
    { time: "14:00", it: 45, hr: 22 },
    { time: "16:00", it: 30, hr: 18 },
    { time: "18:00", it: 10, hr: 4 },
];

const SLA_RISK = [
    { id: "TKT-4401", title: "Laptop keyboard not typing 'E'", time: "Due in 15m", breached: false },
    { id: "TKT-4412", title: "Payroll mismatch query", time: "Due in 45m", breached: false },
    { id: "TKT-4420", title: "Office Wi-Fi down in sector 4", time: "Breached", breached: true },
];

interface Agent {
    name: string;
    dept: string;
    resolved: number;
    time: string;
    csat: number;
    initials: string;
}

const AGENTS: Agent[] = [
    { name: "Amit Verma", dept: "IT Support", resolved: 24, time: "45m", csat: 4.9, initials: "AV" },
    { name: "Priya Singh", dept: "HR Ops", resolved: 18, time: "1h 20m", csat: 4.7, initials: "PS" },
    { name: "Rahul Deshmukh", dept: "Facilities", resolved: 12, time: "2h 10m", csat: 4.5, initials: "RD" },
];

const agentColumns: Column<Agent>[] = [
    {
        key: "name",
        label: "Agent",
        render: (row) => (
            <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#2A3A4A] bg-[#1A2A3A] text-xs font-bold">
                    {row.initials}
                </div>
                <span className="font-semibold">{row.name}</span>
            </div>
        ),
    },
    {
        key: "dept",
        label: "Department",
        render: (row) => <span className="text-[#8899AA]">{row.dept}</span>,
    },
    {
        key: "resolved",
        label: "Resolved (Today)",
        render: (row) => <span className="font-mono font-medium">{row.resolved}</span>,
    },
    {
        key: "time",
        label: "Avg Resolution Time",
        render: (row) => <span className="text-[#8899AA]">{row.time}</span>,
    },
    {
        key: "csat",
        label: "CSAT",
        render: (row) => (
            <div className="flex items-center gap-1.5 text-[#00E5A0]">
                <Star size={14} fill="currentColor" aria-hidden="true" />
                <span className="font-bold">{row.csat}</span>
            </div>
        ),
    },
];

export default function HelpdeskDashboardPage() {
    return (
        <Page
            title="Helpdesk Command Center"
            subtitle="Overview of ticket volumes, agent performance, and SLAs across all departments."
            breadcrumbs={[{ label: "Helpdesk", href: "/helpdesk/dashboard" }, { label: "Dashboard" }]}
            maxWidth="1400px"
            actions={
                <>
                    <Button variant="secondary" icon={<Filter size={16} aria-hidden="true" />}>
                        Filter: Today
                    </Button>
                    <Button icon={<Download size={16} aria-hidden="true" />}>
                        Export Report
                    </Button>
                </>
            }
        >
            <div className="space-y-8">
                {/* KPI Cards */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <Card padding="lg">
                        <div className="mb-4 flex items-start justify-between">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#2A3A4A] bg-[#1A2A3A] text-[#33E6FF]">
                                <Ticket size={20} aria-hidden="true" />
                            </div>
                            <Badge variant="danger">
                                <ArrowUpRight size={12} aria-hidden="true" /> 12%
                            </Badge>
                        </div>
                        <p className="text-3xl font-bold text-white">142</p>
                        <p className="mt-1 text-sm font-medium text-[#8899AA]">Unresolved Tickets</p>
                    </Card>

                    <Card padding="lg">
                        <div className="mb-4 flex items-start justify-between">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#2A3A4A] bg-[#1A2A3A] text-[#FFB020]">
                                <Clock size={20} aria-hidden="true" />
                            </div>
                            <Badge variant="success">
                                <ArrowDownRight size={12} aria-hidden="true" /> 5m
                            </Badge>
                        </div>
                        <p className="text-3xl font-bold text-white">1h 14m</p>
                        <p className="mt-1 text-sm font-medium text-[#8899AA]">Avg. First Response Time</p>
                    </Card>

                    <Card padding="lg">
                        <div className="mb-4 flex items-start justify-between">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#2A3A4A] bg-[#1A2A3A] text-[#FF4444]">
                                <AlertCircle size={20} aria-hidden="true" />
                            </div>
                            <Badge variant="danger">
                                <ArrowUpRight size={12} aria-hidden="true" /> 3%
                            </Badge>
                        </div>
                        <p className="text-3xl font-bold text-white">8%</p>
                        <p className="mt-1 text-sm font-medium text-[#8899AA]">SLA Breach Rate</p>
                    </Card>

                    <Card padding="lg">
                        <div className="mb-4 flex items-start justify-between">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#2A3A4A] bg-[#1A2A3A] text-[#00E5A0]">
                                <Star size={20} aria-hidden="true" />
                            </div>
                            <Badge variant="success">
                                <ArrowUpRight size={12} aria-hidden="true" /> 0.2
                            </Badge>
                        </div>
                        <p className="text-3xl font-bold text-white">4.8/5.0</p>
                        <p className="mt-1 text-sm font-medium text-[#8899AA]">Customer Satisfaction (CSAT)</p>
                    </Card>
                </div>

                {/* Chart + SLA Risk */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <Card padding="lg" className="lg:col-span-2">
                        <div className="mb-6 flex items-center justify-between">
                            <h3 className="text-lg font-bold text-white">Ticket Volume (Today)</h3>
                            <div className="flex items-center gap-4 text-xs font-medium text-[#8899AA]">
                                <span className="flex items-center gap-1.5">
                                    <div className="h-2 w-2 rounded-full bg-[#33E6FF]" aria-hidden="true" />
                                    IT Support
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <div className="h-2 w-2 rounded-full bg-[#9D00FF]" aria-hidden="true" />
                                    HR Ops
                                </span>
                            </div>
                        </div>
                        <div className="h-[300px] w-full">
                            <ChartWrapper height="h-full">
                                <AreaChart
                                    data={TICKET_VOLUME}
                                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                                >
                                    <defs>
                                        <linearGradient id="colorIt" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#33E6FF" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#33E6FF" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorHr" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#9D00FF" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#9D00FF" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" vertical={false} />
                                    <XAxis
                                        dataKey="time"
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
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="it"
                                        stroke="#33E6FF"
                                        fillOpacity={1}
                                        fill="url(#colorIt)"
                                        strokeWidth={3}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="hr"
                                        stroke="#9D00FF"
                                        fillOpacity={1}
                                        fill="url(#colorHr)"
                                        strokeWidth={3}
                                    />
                                </AreaChart>
                            </ChartWrapper>
                        </div>
                    </Card>

                    <Card padding="lg" className="flex flex-col">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="flex items-center gap-2 text-lg font-bold text-white">
                                <AlertCircle size={18} className="text-[#FF4444]" aria-hidden="true" />
                                SLA at Risk
                            </h2>
                            <Badge variant="danger">5 Tickets</Badge>
                        </div>
                        <div className="flex-1 space-y-3 overflow-y-auto pr-2">
                            {SLA_RISK.map((t) => (
                                <div
                                    key={t.id}
                                    className="cursor-pointer rounded-xl border border-[#2A3A4A] bg-[#1A2A3A] p-4 transition-colors hover:bg-[#2A3A4A]"
                                >
                                    <div className="mb-1 flex items-center justify-between">
                                        <span className="font-mono text-xs text-[#8899AA]">{t.id}</span>
                                        {t.breached ? (
                                            <Badge variant="danger">{t.time}</Badge>
                                        ) : (
                                            <Badge variant="warning">{t.time}</Badge>
                                        )}
                                    </div>
                                    <h4 className="truncate text-sm font-semibold text-white">{t.title}</h4>
                                </div>
                            ))}
                        </div>
                        <Link
                            href="/helpdesk/management"
                            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-[#2A3A4A] py-2 text-sm font-semibold text-[#8899AA] transition-colors hover:bg-[#1A2A3A] hover:text-white"
                        >
                            View All Tickets <ChevronRight size={16} aria-hidden="true" />
                        </Link>
                    </Card>
                </div>

                {/* Agent Performance Table */}
                <Card padding="none">
                    <div className="flex items-center justify-between border-b border-[#1A2A3A] p-6">
                        <h2 className="text-lg font-bold text-white">Top Performing Agents</h2>
                        <button
                            type="button"
                            className="text-sm font-semibold text-[#33E6FF] hover:underline"
                        >
                            View Team Report
                        </button>
                    </div>
                    <DataTable<Agent>
                        data={AGENTS}
                        columns={agentColumns}
                        rowKey={(row) => row.name}
                        aria-label="Top performing agents"
                    />
                </Card>
            </div>
        </Page>
    );
}
