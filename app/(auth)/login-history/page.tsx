"use client";

import { useState } from "react";
import { History, Calendar, Monitor, Download, TrendingUp, AlertTriangle, MapPin } from "lucide-react";
import Button from "@/components/ui/Button";

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

const STATUS_CONFIG: Record<Status, { label: string; color: string; bg: string; emoji: string }> = {
    Success: { label: "Success", color: "#00E5A0", bg: "rgba(0,229,160,0.12)", emoji: "✅" },
    Failed: { label: "Failed", color: "#FF4444", bg: "rgba(255,68,68,0.12)", emoji: "❌" },
    Suspicious: { label: "Suspicious", color: "#FFB800", bg: "rgba(255,184,0,0.12)", emoji: "⚠️" },
};

type Filter = "All" | Status;
const FILTERS: Filter[] = ["All", "Success", "Failed", "Suspicious"];

export default function LoginHistoryPage() {
    const [filter, setFilter] = useState<Filter>("All");
    const [page] = useState(1);

    const filtered = filter === "All" ? ALL_DATA : ALL_DATA.filter((e) => e.status === filter);

    const stats = [
        { count: 40, label: "Successful Logins", color: "#00E5A0", icon: <TrendingUp size={16} color="#00E5A0" />, note: "+12% vs last month" },
        { count: 3, label: "Failed Attempts", color: "#FF4444", icon: <AlertTriangle size={16} color="#FF4444" />, note: "2 this week" },
        { count: 2, label: "New Devices", color: "#FFB800", icon: <Monitor size={16} color="#FFB800" />, note: "Unrecognized" },
        { count: 5, label: "Locations", color: "#0066FF", icon: <MapPin size={16} color="#0066FF" />, note: "Cities" },
    ];

    return (
        <div className="min-h-screen p-8" style={{ background: "#060B14" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                {/* Breadcrumb */}
                <p style={{ fontSize: 12, color: "#445566", marginBottom: 8 }}>Settings &gt; Security &gt; Login History</p>

                {/* Title */}
                <div className="flex items-center gap-3 mb-2">
                    <History size={26} color="#00E5A0" />
                    <h1 style={{ fontSize: 28, fontWeight: 700, color: "#FFFFFF", margin: 0 }}>Login History</h1>
                </div>

                {/* Filters row */}
                <div className="flex items-center gap-4 mt-6 mb-6 flex-wrap">
                    {/* Date range */}
                    <div className="flex items-center gap-2 px-4 h-10 rounded-lg cursor-pointer" style={{ background: "#0D1928", border: "1px solid #1A2A3A", fontSize: 14, color: "#FFFFFF" }}>
                        <Calendar size={14} color="#8899AA" /> Last 30 days
                    </div>
                    {/* Status filter */}
                    <div className="flex rounded-lg overflow-hidden" style={{ border: "1px solid #1A2A3A" }}>
                        {FILTERS.map((f) => (
                            <button key={f} onClick={() => setFilter(f)}
                                style={{ padding: "6px 14px", fontSize: 13, background: filter === f ? "#00E5A0" : "#0D1928", color: filter === f ? "#060B14" : "#8899AA", border: "none", cursor: "pointer", fontWeight: filter === f ? 600 : 400, transition: "all 0.15s" }}>
                                {f}
                            </button>
                        ))}
                    </div>
                    {/* Device */}
                    <div className="flex items-center gap-2 px-4 h-10 rounded-lg cursor-pointer" style={{ background: "#0D1928", border: "1px solid #1A2A3A", fontSize: 14, color: "#FFFFFF" }}>
                        <Monitor size={14} color="#8899AA" /> All Devices
                    </div>
                    {/* Export */}
                    <Button variant="secondary" size="md" className="ml-auto flex items-center gap-2">
                        <Download size={14} /> Export CSV
                    </Button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                    {stats.map((s) => (
                        <div key={s.label} className="rounded-2xl p-5" style={{ background: "#0D1928", border: "1px solid #1A2A3A" }}>
                            <div className="flex items-center justify-between mb-2">
                                <span style={{ fontSize: 28, fontWeight: 700, color: s.color }}>{s.count}</span>
                                {s.icon}
                            </div>
                            <div style={{ fontSize: 14, color: "#FFFFFF", fontWeight: 500 }}>{s.label}</div>
                            <div style={{ fontSize: 12, color: "#445566", marginTop: 2 }}>{s.note}</div>
                        </div>
                    ))}
                </div>

                {/* Table */}
                <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #1A2A3A" }}>
                    {/* Header */}
                    <div className="grid grid-cols-6 gap-4 px-5 py-3" style={{ background: "#0A1420" }}>
                        {["Date & Time", "Device", "Browser", "Location", "IP Address", "Status"].map((h) => (
                            <div key={h} style={{ fontSize: 11, fontWeight: 500, color: "#8899AA", textTransform: "uppercase", letterSpacing: 1 }}>{h}</div>
                        ))}
                    </div>

                    {/* Rows */}
                    {filtered.map((entry, i) => {
                        const sc = STATUS_CONFIG[entry.status];
                        return (
                            <div key={i}
                                className="group grid grid-cols-6 gap-4 px-5 items-center transition-all duration-150"
                                style={{
                                    height: 52, background: entry.status === "Suspicious" ? "rgba(255,184,0,0.04)" : entry.status === "Failed" ? "rgba(255,68,68,0.04)" : "transparent",
                                    borderTop: "1px solid #1A2A3A", borderLeft: entry.status === "Suspicious" ? "3px solid #FFB800" : entry.status === "Failed" ? "3px solid transparent" : "3px solid transparent"
                                }}>
                                <div style={{ fontSize: 13, color: "#8899AA" }}>{entry.date}</div>
                                <div style={{ fontSize: 13, color: "#FFFFFF" }}>{entry.device}</div>
                                <div style={{ fontSize: 13, color: "#FFFFFF" }}>{entry.browser}</div>
                                <div style={{ fontSize: 13, color: "#FFFFFF" }}>{entry.location}</div>
                                <div style={{ fontSize: 13, color: "#8899AA", fontFamily: "monospace" }}>{entry.ip}</div>
                                <div className="flex items-center gap-2">
                                    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, background: sc.bg, color: sc.color, borderRadius: 20, padding: "3px 10px", fontSize: 12, fontWeight: 500 }}>
                                        {sc.emoji} {sc.label}
                                    </span>
                                    <a href="/security/access-logs" className="opacity-0 group-hover:opacity-100 transition-all duration-150 animate-slide-in-right" style={{ fontSize: 12, color: "#0066FF", whiteSpace: "nowrap" }}>View Details</a>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-4">
                    <p style={{ fontSize: 13, color: "#8899AA" }}>Showing 1-{filtered.length} of {filtered.length} entries</p>
                    <div className="flex gap-2">
                        <button className="w-8 h-8 rounded-lg text-sm font-medium" style={{ background: "#00E5A0", color: "#060B14", border: "none", cursor: "pointer" }}>1</button>
                        <button className="w-8 h-8 rounded-lg text-sm" style={{ background: "#1A2A3A", color: "#8899AA", border: "none", cursor: "pointer" }}>2</button>
                        <button className="w-8 h-8 rounded-lg text-sm" style={{ background: "#1A2A3A", color: "#8899AA", border: "none", cursor: "pointer" }}>3</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
