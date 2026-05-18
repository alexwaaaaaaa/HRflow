"use client";

import Page from "@/components/ui/Page";

import React, { useState } from "react";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

const ANOMALIES = [
    { id: 1, type: "Double Punch", employee: "Priya Mehta", emp: "EMP-0091", dept: "Eng", date: "12 Nov", details: "3 punches detected: 09:02, 09:04, 09:05", severity: "Low", status: "Pending" },
    { id: 2, type: "Early Checkout", employee: "Vikram Singh", emp: "EMP-0567", dept: "Sales", date: "11 Nov", details: "Checkout at 02:15 PM (shift ends 06:00 PM)", severity: "Medium", status: "Pending" },
    { id: 3, type: "Impossible Commute", employee: "Rohan Desai", emp: "EMP-0234", dept: "Eng", date: "08 Nov", details: "Punched Mumbai at 09:00, Pune at 09:15 (2h drive)", severity: "High", status: "Pending" },
    { id: 4, type: "Proxy Attendance", employee: "Amit Kumar", emp: "EMP-0723", dept: "Ops", date: "07 Nov", details: "Face not matched during QR scan verification", severity: "High", status: "Pending" },
    { id: 5, type: "Backdated Record", employee: "Sneha Rao", emp: "EMP-0145", dept: "Mktg", date: "05 Nov", details: "Attendance added 6 days after event", severity: "Medium", status: "Resolved" },
];

const SEV_CFG: Record<string, string> = {
    Low: "bg-[#00E5A0]/10 text-[#00E5A0] border border-[#00E5A0]/30",
    Medium: "bg-[#FFB800]/10 text-[#FFB800] border border-[#FFB800]/30",
    High: "bg-[#FF4444]/10 text-[#FF4444] border border-[#FF4444]/30",
};

export default function AnomalyAlerts() {
    const [anomalies, setAnomalies] = useState(ANOMALIES);
    const [filter, setFilter] = useState("All");

    const resolve = (id: number) => setAnomalies(a => a.map(x => x.id === id ? { ...x, status: "Resolved" } : x));
    const dismiss = (id: number) => setAnomalies(a => a.filter(x => x.id !== id));

    const filtered = anomalies.filter(a => filter === "All" || a.severity === filter || (filter === "Resolved" && a.status === "Resolved"));
    const pending = anomalies.filter(a => a.status === "Pending").length;

    return (
        <Page
            title="Attendance Anomalies"
            breadcrumbs={[{ label: "Attendance", href: "/attendance/dashboard" }, { label: "Anomalies" }]}
            maxWidth="1200px"
        >

        <div className="p-6 md:p-8 max-w-[1200px] mx-auto text-white">
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                        Attendance Anomalies
                        {pending > 0 && <span className="bg-[#FF4444]/20 text-[#FF4444] text-sm px-2.5 py-0.5 rounded-full">{pending} unresolved</span>}
                    </h2>
                    <p className="text-sm text-[#8899AA] mt-1">AI-flagged irregularities for HR review</p>
                </div>
            </div>

            {/* KPI */}
            <div className="grid grid-cols-4 gap-4 mb-6">
                {[
                    { label: "Total Anomalies", val: anomalies.length, color: "#FFFFFF" },
                    { label: "High Severity", val: anomalies.filter(a => a.severity === "High" && a.status === "Pending").length, color: "#FF4444" },
                    { label: "Medium", val: anomalies.filter(a => a.severity === "Medium" && a.status === "Pending").length, color: "#FFB800" },
                    { label: "Resolved", val: anomalies.filter(a => a.status === "Resolved").length, color: "#00E5A0" },
                ].map((k, i) => (
                    <div key={i} className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5">
                        <p className="text-xs text-[#8899AA] mb-1">{k.label}</p>
                        <p className="text-2xl font-bold" style={{ color: k.color }}>{k.val}</p>
                    </div>
                ))}
            </div>

            {/* FILTER */}
            <div className="flex gap-1 bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-1 w-fit mb-5">
                {["All", "High", "Medium", "Low", "Resolved"].map(f => (
                    <button key={f} onClick={() => setFilter(f)}
                        className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${filter === f ? "bg-[#00E5A0] text-[#060B14] font-semibold" : "text-[#8899AA] hover:text-white"}`}>{f}</button>
                ))}
            </div>

            {/* CARDS */}
            <div className="space-y-4">
                {filtered.map(a => (
                    <div key={a.id} className={`bg-[#0D1928] border rounded-2xl p-5 ${a.severity === "High" && a.status === "Pending" ? "border-[#FF4444]/30" : "border-[#1A2A3A]"}`}>
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${a.severity === "High" ? "bg-[#FF4444]/20" : a.severity === "Medium" ? "bg-[#FFB800]/20" : "bg-[#00E5A0]/20"}`}>
                                    <AlertTriangle className={`w-4 h-4 ${a.severity === "High" ? "text-[#FF4444]" : a.severity === "Medium" ? "text-[#FFB800]" : "text-[#00E5A0]"}`} />
                                </div>
                                <div>
                                    <p className="font-semibold">{a.type}</p>
                                    <p className="text-xs text-[#8899AA]">{a.employee} • {a.emp} • {a.dept} • {a.date}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className={`text-xs px-2 py-0.5 rounded-full ${SEV_CFG[a.severity]}`}>{a.severity}</span>
                                {a.status === "Resolved" && <span className="text-xs text-[#00E5A0] flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" />Resolved</span>}
                            </div>
                        </div>
                        <div className="bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 py-3 mb-3">
                            <p className="text-sm text-[#8899AA]">🤖 {a.details}</p>
                        </div>
                        {a.status === "Pending" && (
                            <div className="flex gap-2">
                                <button onClick={() => resolve(a.id)} className="px-3 py-1.5 text-xs font-semibold bg-[#00E5A0]/10 text-[#00E5A0] border border-[#00E5A0]/30 rounded-lg hover:bg-[#00E5A0]/20">Mark Resolved</button>
                                <button className="px-3 py-1.5 text-xs font-semibold bg-[#0066FF]/10 text-[#0066FF] border border-[#0066FF]/30 rounded-lg hover:bg-[#0066FF]/20">Investigate</button>
                                <button onClick={() => dismiss(a.id)} className="px-3 py-1.5 text-xs text-[#8899AA] border border-[#1A2A3A] rounded-lg hover:bg-[#1A2A3A]">Dismiss</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    
        </Page>
        );
}
