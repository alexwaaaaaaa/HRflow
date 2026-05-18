"use client";

import Page from "@/components/ui/Page";

import React, { useState } from "react";
import { Search, Download, Filter, User, Settings, Lock, CheckCircle2 } from "lucide-react";

const AUDIT_LOGS = [
    { id: "AL-8891", user: "Priya Mehta", role: "HR Admin", action: "Edited Attendance Policy", module: "Settings", ip: "103.45.67.89", time: "07 Mar, 11:32 AM", severity: "Medium" },
    { id: "AL-8890", user: "System Auto", role: "System", action: "LOP Applied – Vikram Singh", module: "Automation", ip: "—", time: "07 Mar, 09:00 AM", severity: "High" },
    { id: "AL-8889", user: "Priya Mehta", role: "HR Admin", action: "Approved Regularization REQ-2401", module: "Regularization", ip: "103.45.67.89", time: "06 Mar, 04:18 PM", severity: "Low" },
    { id: "AL-8888", user: "Ravi Kumar", role: "Manager", action: "Approved WFH – Rohan Desai", module: "WFH", ip: "202.16.45.11", time: "06 Mar, 10:05 AM", severity: "Low" },
    { id: "AL-8887", user: "Priya Mehta", role: "HR Admin", action: "Added Biometric Device ZK-2024-00223", module: "Biometric", ip: "103.45.67.89", time: "05 Mar, 03:44 PM", severity: "Medium" },
    { id: "AL-8886", user: "System Auto", role: "System", action: "Daily Attendance Report Emailed", module: "Reports", ip: "—", time: "05 Mar, 08:00 AM", severity: "Low" },
    { id: "AL-8885", user: "Priya Mehta", role: "HR Admin", action: "Rejected Regularization REQ-2375", module: "Regularization", ip: "103.45.67.89", time: "04 Mar, 02:10 PM", severity: "Medium" },
    { id: "AL-8884", user: "System Auto", role: "System", action: "IP Restriction Blocked 12 Attempts", module: "Security", ip: "—", time: "04 Mar, 01:00 PM", severity: "High" },
    { id: "AL-8883", user: "Priya Mehta", role: "HR Admin", action: "Updated Overtime Policy", module: "Settings", ip: "103.45.67.89", time: "03 Mar, 11:20 AM", severity: "Medium" },
    { id: "AL-8882", user: "Ravi Kumar", role: "Manager", action: "Manually Marked Present – Amit Kumar", module: "Manual Entry", ip: "202.16.45.11", time: "03 Mar, 09:55 AM", severity: "High" },
];

const SEV: Record<string, string> = {
    Low: "bg-[#00E5A0]/10 text-[#00E5A0]",
    Medium: "bg-[#FFB800]/10 text-[#FFB800]",
    High: "bg-[#FF4444]/10 text-[#FF4444]",
};

const MOD_ICON: Record<string, React.ReactNode> = {
    Settings: <Settings className="w-3.5 h-3.5" />,
    Regularization: <CheckCircle2 className="w-3.5 h-3.5" />,
    Security: <Lock className="w-3.5 h-3.5" />,
    "Manual Entry": <User className="w-3.5 h-3.5" />,
};

export default function AuditLogs() {
    const [search, setSearch] = useState("");
    const [sev, setSev] = useState("All");
    const [mod, setMod] = useState("All");

    const modules = ["All", ...Array.from(new Set(AUDIT_LOGS.map(l => l.module)))];
    const filtered = AUDIT_LOGS.filter(l =>
        (sev === "All" || l.severity === sev) &&
        (mod === "All" || l.module === mod) &&
        (l.user.toLowerCase().includes(search.toLowerCase()) ||
            l.action.toLowerCase().includes(search.toLowerCase()) ||
            l.id.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <Page
            title="Audit Logs"
            breadcrumbs={[{ label: "Attendance", href: "/attendance/dashboard" }, { label: "Settings", href: "/attendance/settings" }, { label: "Audit Logs" }]}
            maxWidth="900px"
        >

        <div className="p-6 md:p-8 max-w-[1200px] mx-auto text-white">
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2"><Lock className="w-6 h-6 text-[#8B5CF6]" /> Audit Logs</h2>
                    <p className="text-sm text-[#8899AA] mt-1">Track all changes, approvals, and system actions in Attendance module</p>
                </div>
                <button className="px-4 py-2 bg-[#1A2A3A] text-sm text-white rounded-xl flex items-center gap-2 hover:bg-[#2A3A4A]">
                    <Download className="w-4 h-4" /> Export Logs
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                    { label: "Total Actions (30d)", val: "284", color: "#FFFFFF" },
                    { label: "High Severity", val: AUDIT_LOGS.filter(l => l.severity === "High").length, color: "#FF4444" },
                    { label: "System Actions", val: AUDIT_LOGS.filter(l => l.role === "System").length, color: "#8B5CF6" },
                ].map((k, i) => (
                    <div key={i} className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5">
                        <p className="text-xs text-[#8899AA] mb-1">{k.label}</p>
                        <p className="text-2xl font-bold" style={{ color: k.color }}>{k.val}</p>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="flex gap-3 mb-5 flex-wrap">
                <div className="relative">
                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#445566]" />
                    <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search logs..."
                        className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#00E5A0] w-56" />
                </div>
                <div className="flex gap-1 bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-1">
                    {["All", "High", "Medium", "Low"].map(s => (
                        <button key={s} onClick={() => setSev(s)}
                            className={`px-3 py-1.5 text-xs rounded-lg ${sev === s ? "bg-[#00E5A0] text-[#060B14] font-semibold" : "text-[#8899AA] hover:text-white"}`}>{s}</button>
                    ))}
                </div>
                <div className="flex gap-1 bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-1 overflow-x-auto">
                    {modules.slice(0, 6).map(m => (
                        <button key={m} onClick={() => setMod(m)}
                            className={`px-3 py-1.5 text-xs rounded-lg whitespace-nowrap ${mod === m ? "bg-[#00E5A0] text-[#060B14] font-semibold" : "text-[#8899AA] hover:text-white"}`}>{m}</button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-[#0A1420] text-[#8899AA] text-xs">
                            <tr>
                                <th className="px-5 py-3 text-left">Log ID</th>
                                <th className="px-5 py-3 text-left">User</th>
                                <th className="px-5 py-3 text-left">Action</th>
                                <th className="px-5 py-3 text-center">Module</th>
                                <th className="px-5 py-3 text-center">IP</th>
                                <th className="px-5 py-3 text-right">Time</th>
                                <th className="px-5 py-3 text-center">Severity</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">
                            {filtered.map((row, i) => (
                                <tr key={i} className={`hover:bg-[#1A2A3A]/50 transition-colors ${row.severity === "High" ? "border-l-2 border-l-[#FF4444]" : "border-l-2 border-l-transparent"}`}>
                                    <td className="px-5 py-3 font-mono text-xs text-[#8B5CF6]">{row.id}</td>
                                    <td className="px-5 py-3">
                                        <p className="font-medium">{row.user}</p>
                                        <p className="text-xs text-[#445566]">{row.role}</p>
                                    </td>
                                    <td className="px-5 py-3 text-[#8899AA] max-w-[220px]">{row.action}</td>
                                    <td className="px-5 py-3 text-center">
                                        <span className="text-xs bg-[#1A2A3A] text-[#8899AA] px-2 py-0.5 rounded-full flex items-center justify-center gap-1 w-fit mx-auto">
                                            {MOD_ICON[row.module] || <Filter className="w-3 h-3" />} {row.module}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3 text-center font-mono text-xs text-[#445566]">{row.ip}</td>
                                    <td className="px-5 py-3 text-right text-xs text-[#445566]">{row.time}</td>
                                    <td className="px-5 py-3 text-center">
                                        <span className={`text-xs px-2.5 py-0.5 rounded-full ${SEV[row.severity]}`}>{row.severity}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="px-5 py-3 border-t border-[#1A2A3A] text-xs text-[#445566]">
                    {filtered.length} logs shown
                </div>
            </div>
        </div>
    
        </Page>
        );
}
