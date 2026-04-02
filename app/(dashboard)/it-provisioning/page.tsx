"use client";

import { useState } from "react";
import {
    Monitor, Laptop, Smartphone, Cpu, AlertTriangle,
    CheckCircle2, Server, Download, Plus, Clock, ShieldCheck
} from "lucide-react";
import Button from "@/components/ui/Button";

// --- Types & Interfaces ---
interface DashboardMetric {
    label: string;
    value: string;
    trend: string;
    icon: React.ElementType;
    color: string;
}

interface AssetDistribution {
    type: string;
    count: number;
    pct: number;
    icon: React.ElementType;
    color: string;
}

interface ActivityLog {
    id: string;
    title: string;
    type: "Assignment" | "Software Request" | "Maintenance" | "Security" | "Procurement";
    time: string;
    icon: React.ElementType;
    color: string;
}

// --- Mock Data ---
const METRICS_DATA: DashboardMetric[] = [
    { label: "Total Assets", value: "1,245", trend: "+12", icon: Monitor, color: "#00E5A0" },
    { label: "Assigned", value: "980", trend: "+8", icon: CheckCircle2, color: "#0066FF" },
    { label: "In Stock", value: "215", trend: "-2", icon: Server, color: "#8899AA" },
    { label: "Maintenance Needed", value: "50", trend: "+5", icon: AlertTriangle, color: "#FF4444" },
];

const DISTRIBUTION_DATA: AssetDistribution[] = [
    { type: "Laptops", count: 850, pct: 68, icon: Laptop, color: "#0066FF" },
    { type: "Monitors", count: 210, pct: 17, icon: Monitor, color: "#00E5A0" },
    { type: "Mobile Devices", count: 120, pct: 10, icon: Smartphone, color: "#FFB800" },
    { type: "Other Hardware", count: 65, pct: 5, icon: Cpu, color: "#8899AA" },
];

const RECENT_ACTIVITIES: ActivityLog[] = [
    { id: "log-1", title: "MacBook Pro M2 assigned to Sarah Connor", type: "Assignment", time: "2 hours ago", icon: CheckCircle2, color: "#00E5A0" },
    { id: "log-2", title: "Adobe Creative Cloud requested by Marketing", type: "Software Request", time: "4 hours ago", icon: Clock, color: "#FFB800" },
    { id: "log-3", title: "Dell XPS 15 marked for maintenance", type: "Maintenance", time: "Yesterday", icon: AlertTriangle, color: "#FF4444" },
    { id: "log-4", title: "Access revoked for exiting employee (John Doe)", type: "Security", time: "Yesterday", icon: ShieldCheck, color: "#0066FF" },
    { id: "log-5", title: "New batch of monitors added to stock", type: "Procurement", time: "2 days ago", icon: Server, color: "#8899AA" }
];

// --- Sub-Components (Modular Architecture) ---

function MetricCard({ metric }: { metric: DashboardMetric }) {
    const Icon = metric.icon;
    const isPositive = metric.trend.startsWith('+');

    return (
        <article className="bg-[#0D1928] border border-[#1A2A3A] p-6 rounded-2xl relative overflow-hidden group hover:border-[#334455] transition-colors flex flex-col justify-between h-full">
            <div className="absolute top-0 right-0 p-4 opacity-10 filter blur-[2px] transform group-hover:scale-110 transition-transform pointer-events-none">
                <Icon size={64} color={metric.color} aria-hidden="true" />
            </div>
            <header className="flex items-center gap-3 mb-4 relative z-10 w-full">
                <div className="p-2 rounded-lg bg-[#060B14] border border-[#1A2A3A] flex-shrink-0">
                    <Icon size={20} color={metric.color} aria-hidden="true" />
                </div>
                <h3 className="text-sm font-semibold text-[#8899AA] uppercase tracking-wider truncate" title={metric.label}>
                    {metric.label}
                </h3>
            </header>
            <div className="flex items-end gap-3 relative z-10 w-full">
                <div className="text-4xl font-bold text-white leading-none tracking-tight">{metric.value}</div>
                <div
                    className={`text-sm font-medium mb-1 whitespace-nowrap ${isPositive ? 'text-[#00E5A0]' : 'text-[#FF4444]'}`}
                    aria-label={`Trend: ${metric.trend} this month`}
                >
                    {metric.trend} <span className="sr-only">this month</span>
                </div>
            </div>
        </article>
    );
}

function DistributionChartItem({ item }: { item: AssetDistribution }) {
    const Icon = item.icon;
    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                    <Icon size={16} color={item.color} aria-hidden="true" />
                    <span className="text-sm font-medium text-[#8899AA]">{item.type}</span>
                </div>
                <div className="text-sm font-bold text-white">{item.count}</div>
            </div>
            <div
                className="w-full bg-[#060B14] h-2 rounded-full overflow-hidden"
                role="progressbar"
                aria-valuenow={item.pct}
                aria-valuemin={0}
                aria-valuemax={100}
            >
                <div
                    className="h-full rounded-full transition-all duration-700 ease-in-out"
                    style={{ width: `${item.pct}%`, backgroundColor: item.color }}
                />
            </div>
        </div>
    );
}

function ActivityLogItem({ log }: { log: ActivityLog }) {
    const Icon = log.icon;
    return (
        <div className="flex items-center justify-between p-4 hover:bg-[#1A2A3A] rounded-xl transition-colors cursor-pointer group focus-within:ring-2 focus-within:ring-[#0066FF] outline-none" role="row">
            <div className="flex items-center gap-4">
                <div
                    className="w-10 h-10 rounded-lg bg-[#060B14] border border-[#1A2A3A] flex items-center justify-center flex-shrink-0"
                    style={{ color: log.color }}
                >
                    <Icon size={18} aria-hidden="true" />
                </div>
                <div>
                    <div className="text-sm font-medium text-white group-hover:text-[#00E5A0] transition-colors">
                        {log.title}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-[#1A2A3A] text-[#8899AA]">
                            {log.type}
                        </span>
                        <span className="text-xs text-[#445566]">{log.time}</span>
                    </div>
                </div>
            </div>
            <Button variant="secondary" className="h-8 opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100">
                View Details
            </Button>
        </div>
    );
}

// --- Main Page Component ---
export default function ITAssetsDashboard() {
    // Example of state management for FAANG-level interactivity
    const [isExporting, setIsExporting] = useState(false);

    const handleExport = () => {
        setIsExporting(true);
        // Simulate API call for export
        setTimeout(() => setIsExporting(false), 1500);
    };

    return (
        <main className="px-8 py-6 pb-16 animate-fade-in relative max-w-7xl mx-auto min-h-screen">

            {/* Page Header */}
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white m-0 tracking-tight">IT Assets Dashboard</h1>
                    <p className="text-sm text-[#8899AA] mt-1.5">Overview of company hardware, software, and provisioning operations</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button
                        variant="secondary"
                        icon={isExporting ? <Clock size={16} className="animate-spin" /> : <Download size={16} />}
                        onClick={handleExport}
                        disabled={isExporting}
                    >
                        {isExporting ? 'Exporting...' : 'Export Report'}
                    </Button>
                    <Button variant="primary" icon={<Plus size={16} />}>
                        Add Asset
                    </Button>
                </div>
            </header>

            {/* Top Level Metrics */}
            <section aria-label="Key Metrics" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {METRICS_DATA.map((stat, i) => (
                    <MetricCard key={i} metric={stat} />
                ))}
            </section>

            {/* Detailed Widgets Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

                {/* Hardware Distribution Component */}
                <section className="col-span-1 bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 shadow-sm h-full flex flex-col" aria-label="Hardware Distribution">
                    <header className="mb-6">
                        <h2 className="text-lg font-bold text-white m-0">Asset Distribution</h2>
                    </header>
                    <div className="space-y-6 flex-grow flex flex-col justify-center">
                        {DISTRIBUTION_DATA.map((item, i) => (
                            <DistributionChartItem key={i} item={item} />
                        ))}
                    </div>
                </section>

                {/* Recent Activities Component */}
                <section className="col-span-1 lg:col-span-2 bg-[#0D1928] border border-[#1A2A3A] rounded-2xl flex flex-col shadow-sm" aria-label="Recent IT Activities">
                    <header className="p-6 border-b border-[#1A2A3A] flex justify-between items-center">
                        <h2 className="text-lg font-bold text-white m-0">Recent IT Activities</h2>
                        <Button variant="secondary" className="text-xs h-8">View All Logs</Button>
                    </header>
                    <div className="p-2 flex-grow overflow-y-auto" role="table" aria-label="Activity Logs">
                        {RECENT_ACTIVITIES.map((log) => (
                            <ActivityLogItem key={log.id} log={log} />
                        ))}
                    </div>
                </section>

            </div>
        </main>
    );
}
