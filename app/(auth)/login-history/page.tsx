"use client";

import { useState } from "react";
import { History, Calendar, Monitor, Download, TrendingUp, AlertTriangle, MapPin } from "lucide-react";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import DataTable, { type Column } from "@/components/ui/DataTable";

type Status = "Success" | "Failed" | "Suspicious";
interface LoginEntry {
    date: string;
    device: string;
    browser: string;
    location: string;
    ip: string;
    status: Status;
}

const ALL_DATA: LoginEntry[] = [
    { date: "12/11/2024 09:45 AM", device: "MacBook Pro", browser: "Chrome 120", location: "Mumbai, MH", ip: "103.21.xx.xx", status: "Success" },
    { date: "11/11/2024 06:30 PM", device: "iPhone 14", browser: "Safari", location: "Pune, MH", ip: "49.37.xx.xx", status: "Success" },
    { date: "11/11/2024 06:28 PM", device: "Unknown", browser: "Chrome", location: "Delhi, DL", ip: "182.68.xx.xx", status: "Failed" },
    { date: "10/11/2024 10:00 AM", device: "iPad Pro", browser: "Safari", location: "Mumbai, MH", ip: "103.21.xx.xx", status: "Success" },
    { date: "09/11/2024 08:45 AM", device: "MacBook Pro", browser: "Chrome", location: "Mumbai, MH", ip: "103.21.xx.xx", status: "Suspicious" },
    { date: "08/11/2024 11:30 AM", device: "MacBook Pro", browser: "Chrome 120", location: "Mumbai, MH", ip: "103.21.xx.xx", status: "Success" },
    { date: "07/11/2024 09:15 AM", device: "iPhone 14", browser: "Safari", location: "Pune, MH", ip: "49.37.xx.xx", status: "Success" },
    { date: "06/11/2024 05:20 PM", device: "Windows PC", browser: "Edge", location: "Hyderabad, TS", ip: "136.23.xx.xx", status: "Failed" },
    { date: "05/11/2024 08:50 AM", device: "MacBook Pro", browser: "Chrome 120", location: "Mumbai, MH", ip: "103.21.xx.xx", status: "Success" },
    { date: "04/11/2024 04:10 PM", device: "Android", browser: "Chrome", location: "Chennai, TN", ip: "49.205.xx.xx", status: "Success" },
    { date: "03/11/2024 10:00 AM", device: "MacBook Pro", browser: "Firefox", location: "Mumbai, MH", ip: "103.21.xx.xx", status: "Success" },
    { date: "02/11/2024 07:30 AM", device: "iPhone 14", browser: "Safari", location: "Pune, MH", ip: "49.37.xx.xx", status: "Success" },
    { date: "01/11/2024 09:00 AM", device: "MacBook Pro", browser: "Chrome 120", location: "Mumbai, MH", ip: "103.21.xx.xx", status: "Success" },
    { date: "31/10/2024 06:00 PM", device: "Unknown", browser: "Chrome", location: "Bengaluru, KA", ip: "49.91.xx.xx", status: "Suspicious" },
    { date: "30/10/2024 11:00 AM", device: "MacBook Pro", browser: "Chrome 120", location: "Mumbai, MH", ip: "103.21.xx.xx", status: "Success" },
];

const STATUS_BADGE: Record<Status, "success" | "danger" | "warning"> = {
    Success: "success",
    Failed: "danger",
    Suspicious: "warning",
};

type Filter = "All" | Status;
const FILTERS: Filter[] = ["All", "Success", "Failed", "Suspicious"];

const COLUMNS: Column<LoginEntry>[] = [
    { key: "date", label: "Date & Time", render: (r) => <span className="text-sm text-[#8899AA]">{r.date}</span> },
    { key: "device", label: "Device", render: (r) => <span className="text-sm text-white">{r.device}</span> },
    { key: "browser", label: "Browser", render: (r) => <span className="text-sm text-white">{r.browser}</span> },
    { key: "location", label: "Location", render: (r) => <span className="text-sm text-white">{r.location}</span> },
    { key: "ip", label: "IP Address", render: (r) => <span className="text-sm text-[#8899AA] font-mono">{r.ip}</span> },
    {
        key: "status", label: "Status",
        render: (r) => (
            <div className="flex items-center gap-2">
                <Badge variant={STATUS_BADGE[r.status]}>{r.status}</Badge>
                <a href="/security/access-logs" className="text-xs text-[#0066FF] hover:underline whitespace-nowrap">View Details</a>
            </div>
        ),
    },
];

export default function LoginHistoryPage() {
    const [filter, setFilter] = useState<Filter>("All");

    const filtered = filter === "All" ? ALL_DATA : ALL_DATA.filter((e) => e.status === filter);

    const stats = [
        { count: 40, label: "Successful Logins", variant: "success" as const, icon: <TrendingUp size={16} aria-hidden="true" />, note: "+12% vs last month" },
        { count: 3, label: "Failed Attempts", variant: "danger" as const, icon: <AlertTriangle size={16} aria-hidden="true" />, note: "2 this week" },
        { count: 2, label: "New Devices", variant: "warning" as const, icon: <Monitor size={16} aria-hidden="true" />, note: "Unrecognized" },
        { count: 5, label: "Locations", variant: "info" as const, icon: <MapPin size={16} aria-hidden="true" />, note: "Cities" },
    ];

    const STAT_COLORS: Record<string, string> = {
        success: "#00E5A0",
        danger: "#FF4444",
        warning: "#FFB800",
        info: "#0066FF",
    };

    return (
        <div className="min-h-screen p-8 bg-[#060B14]">
            <div className="max-w-[1200px] mx-auto">
                {/* Breadcrumb */}
                <p className="text-xs text-[#445566] mb-2">Settings &gt; Security &gt; Login History</p>

                {/* Title */}
                <div className="flex items-center gap-3 mb-2">
                    <History size={26} color="#00E5A0" aria-hidden="true" />
                    <h1 className="text-[28px] font-bold text-white m-0">Login History</h1>
                </div>

                {/* Filters row */}
                <div className="flex items-center gap-4 mt-6 mb-6 flex-wrap">
                    {/* Date range */}
                    <div className="flex items-center gap-2 px-4 h-10 rounded-lg bg-[#0D1928] border border-[#1A2A3A] text-sm text-white cursor-pointer">
                        <Calendar size={14} color="#8899AA" aria-hidden="true" /> Last 30 days
                    </div>
                    {/* Status filter */}
                    <div className="flex rounded-lg overflow-hidden border border-[#1A2A3A]" role="group" aria-label="Filter by status">
                        {FILTERS.map((f) => (
                            <Button
                                key={f}
                                variant={filter === f ? "primary" : "secondary"}
                                size="sm"
                                onClick={() => setFilter(f)}
                                className="rounded-none border-0 border-r border-[#1A2A3A] last:border-r-0"
                                aria-pressed={filter === f}
                            >
                                {f}
                            </Button>
                        ))}
                    </div>
                    {/* Device */}
                    <div className="flex items-center gap-2 px-4 h-10 rounded-lg bg-[#0D1928] border border-[#1A2A3A] text-sm text-white cursor-pointer">
                        <Monitor size={14} color="#8899AA" aria-hidden="true" /> All Devices
                    </div>
                    {/* Export */}
                    <Button variant="secondary" size="md" className="ml-auto flex items-center gap-2">
                        <Download size={14} aria-hidden="true" /> Export CSV
                    </Button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {stats.map((s) => (
                        <Card key={s.label} variant="default" padding="md">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[28px] font-bold" style={{ color: STAT_COLORS[s.variant] }}>{s.count}</span>
                                <span style={{ color: STAT_COLORS[s.variant] }}>{s.icon}</span>
                            </div>
                            <div className="text-sm text-white font-medium">{s.label}</div>
                            <div className="text-xs text-[#445566] mt-0.5">{s.note}</div>
                        </Card>
                    ))}
                </div>

                {/* Table */}
                <DataTable<LoginEntry>
                    data={filtered}
                    columns={COLUMNS}
                    rowKey={(r) => `${r.date}-${r.ip}`}
                    aria-label="Login history"
                    emptyTitle="No login records"
                    emptyDescription="No login records match the selected filter."
                />
            </div>
        </div>
    );
}
