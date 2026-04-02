"use client";

import React, { useState } from "react";
import {
    TrendingUp, Users, Clock, IndianRupee, Search, Filter,
    Download, ChevronRight, Loader2, CheckCircle2, BarChart3,
    AlertCircle, Plus, Upload
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell } from 'recharts';
import { Tooltip as RechartsTooltip } from "recharts";
import { ChartWrapper } from "@/components/ui/chart-wrapper";

interface Employee {
    name: string;
    avatar: string;
    emp: string;
    role: string;
    dept: string;
    target: number;
    achievement: number;
    status: "approved" | "pending" | "missing" | "rejected";
}

const EMPLOYEES: Employee[] = [
    { name: "Rajesh Khanna", avatar: "RK", emp: "EMP-001", role: "VP Sales", dept: "Sales", target: 200000, achievement: 112, status: "approved" },
    { name: "Priya Kapoor", avatar: "PK", emp: "EMP-002", role: "Sales Manager", dept: "Sales", target: 150000, achievement: 98, status: "pending" },
    { name: "Deepak Mehta", avatar: "DM", emp: "EMP-003", role: "Sr. Account Exec", dept: "Sales", target: 100000, achievement: 76, status: "pending" },
    { name: "Anjali Singh", avatar: "AS", emp: "EMP-004", role: "Business Dev", dept: "Sales", target: 80000, achievement: 130, status: "approved" },
    { name: "Vikas Sharma", avatar: "VS", emp: "EMP-005", role: "Account Exec", dept: "Sales", target: 80000, achievement: 55, status: "missing" },
    { name: "Neha Gupta", avatar: "NG", emp: "EMP-006", role: "Regional Manager", dept: "Business", target: 120000, achievement: 91, status: "approved" },
    { name: "Rahul Patel", avatar: "RP", emp: "EMP-007", role: "Solutions Arch", dept: "Tech Sales", target: 75000, achievement: 105, status: "pending" },
    { name: "Kavita Reddy", avatar: "KR", emp: "EMP-008", role: "Account Manager", dept: "Sales", target: 90000, achievement: 0, status: "missing" },
];

const DEPT_CHART = [
    { name: "Sales", achieved: 92 },
    { name: "Business", achieved: 91 },
    { name: "Tech Sales", achieved: 105 },
    { name: "Mktg", achieved: 78 },
];

const STATUS_MAP = {
    approved: { label: "Approved", bg: "rgba(0,229,160,0.1)", color: "#00E5A0" },
    pending: { label: "Pending Input", bg: "rgba(255,184,0,0.1)", color: "#FFB800" },
    missing: { label: "No Data", bg: "rgba(255,68,68,0.1)", color: "#FF4444" },
    rejected: { label: "Rejected", bg: "rgba(136,153,170,0.1)", color: "#8899AA" },
};

export default function VariablePayPage() {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const filtered = EMPLOYEES.filter(e =>
        (statusFilter === "all" || e.status === statusFilter) &&
        (e.name.toLowerCase().includes(search.toLowerCase()) || e.dept.toLowerCase().includes(search.toLowerCase()))
    );

    const totalTarget = EMPLOYEES.reduce((s, e) => s + e.target, 0);
    const totalEstPayout = EMPLOYEES.filter(e => e.achievement > 0)
        .reduce((s, e) => s + Math.round(e.target * Math.min(e.achievement, 100) / 100), 0);
    const avgAchievement = Math.round(EMPLOYEES.filter(e => e.achievement > 0).reduce((s, e) => s + e.achievement, 0) / EMPLOYEES.filter(e => e.achievement > 0).length);
    const pendingCount = EMPLOYEES.filter(e => e.status === "pending" || e.status === "missing").length;

    function handleSubmitToPayroll() {
        setSubmitting(true);
        setTimeout(() => { setSubmitting(false); setSubmitted(true); }, 2500);
    }

    return (
        <div className="p-6 md:p-8 max-w-[1200px] mx-auto text-white">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold mb-1">Variable Pay</h1>
                    <p className="text-sm text-[#8899AA]">Q4 FY 2024–25 · Performance-linked payout computation</p>
                </div>
                <div className="flex gap-3 flex-wrap">
                    <button className="flex items-center gap-2 h-10 px-4 bg-[#1A2A3A] text-sm rounded-xl hover:bg-[#243040] transition-colors">
                        <Upload size={15} /> Bulk Upload
                    </button>
                    <button className="flex items-center gap-2 h-10 px-4 bg-[#1A2A3A] text-sm rounded-xl hover:bg-[#243040] transition-colors">
                        <Download size={15} /> Export
                    </button>
                    <button
                        onClick={handleSubmitToPayroll}
                        disabled={submitting || submitted}
                        className={`flex items-center gap-2 h-10 px-5 text-sm font-semibold rounded-xl transition-all ${submitted ? "bg-[#00E5A0]/20 text-[#00E5A0] border border-[#00E5A0]/30" : "bg-[#00E5A0] text-[#060B14] hover:bg-[#00c98d]"}`}
                    >
                        {submitting ? <><Loader2 size={15} className="animate-spin" /> Submitting...</>
                            : submitted ? <><CheckCircle2 size={15} /> Submitted to Payroll</>
                                : <><TrendingUp size={15} /> Save & Submit to Payroll</>}
                    </button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                    { label: "Total Target Variable", value: `₹${(totalTarget / 100000).toFixed(1)}L`, sub: "Budgeted across all eligible", icon: IndianRupee, color: "#FFB800" },
                    { label: "Estimated Payout", value: `₹${(totalEstPayout / 100000).toFixed(2)}L`, sub: `Avg ${avgAchievement}% achievement`, icon: TrendingUp, color: "#00E5A0" },
                    { label: "Eligible Employees", value: String(EMPLOYEES.length), sub: "Q4 variable pay entitled", icon: Users, color: "#0066FF" },
                    { label: "Pending Inputs", value: String(pendingCount), sub: "Manager input required", icon: Clock, color: "#FF4444" },
                ].map(card => (
                    <div key={card.label} className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5">
                        <div className="flex items-start justify-between mb-3">
                            <p className="text-xs text-[#8899AA]">{card.label}</p>
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: card.color + "18" }}>
                                <card.icon size={15} style={{ color: card.color }} />
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-white mb-0.5">{card.value}</p>
                        <p className="text-[11px] text-[#8899AA]">{card.sub}</p>
                    </div>
                ))}
            </div>

            {/* Chart + breakdown side by side */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 mb-6">
                {/* Dept achievement chart */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-base font-semibold flex items-center gap-2"><BarChart3 size={16} className="text-[#0066FF]" /> Department Achievement %</h3>
                        <span className="text-xs text-[#8899AA]">Q4 FY 2024–25</span>
                    </div>
                    <div className="h-[160px]">
                        <ChartWrapper>
                            <ChartWrapper height="h-[200px]">
                                <BarChart data={DEPT_CHART} barSize={32}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" vertical={false} />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#8899AA", fontSize: 12 }} />
                                    <YAxis domain={[0, 130]} axisLine={false} tickLine={false} tick={{ fill: "#8899AA", fontSize: 11 }} />
                                    <RechartsTooltip contentStyle={{ background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8 }} itemStyle={{ color: "#fff" }} labelStyle={{ color: "#8899AA" }} formatter={(v) => [`${v}%`, "Achievement"]} />
                                    <Bar dataKey="achieved" radius={[6, 6, 0, 0]}>
                                        {DEPT_CHART.map(d => (
                                            <Cell key={d.name} fill={d.achieved >= 100 ? "#00E5A0" : d.achieved >= 85 ? "#FFB800" : "#FF4444"} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ChartWrapper>
                        </ChartWrapper>
                    </div>
                    <div className="flex gap-4 mt-2 text-xs text-[#8899AA]">
                        <span className="flex items-center gap-1"><span className="w-3 h-2 rounded bg-[#00E5A0]" /> ≥100%</span>
                        <span className="flex items-center gap-1"><span className="w-3 h-2 rounded bg-[#FFB800]" /> 85–99%</span>
                        <span className="flex items-center gap-1"><span className="w-3 h-2 rounded bg-[#FF4444]" /> &lt;85%</span>
                    </div>
                </div>

                {/* Pending alerts */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                        <AlertCircle size={16} className="text-[#FFB800]" /> Missing Inputs
                    </h3>
                    <div className="space-y-3">
                        {EMPLOYEES.filter(e => e.status === "missing").map(e => (
                            <div key={e.emp} className="flex items-center gap-3 p-3 bg-[#FF4444]/5 border border-[#FF4444]/15 rounded-xl">
                                <div className="w-8 h-8 rounded-full bg-[#1A2A3A] flex items-center justify-center text-[10px] font-bold text-[#8899AA]">{e.avatar}</div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-white truncate">{e.name}</p>
                                    <p className="text-[11px] text-[#8899AA]">{e.dept}</p>
                                </div>
                                <button className="text-xs text-[#0066FF] flex items-center hover:underline">
                                    Remind <ChevronRight size={12} />
                                </button>
                            </div>
                        ))}
                        {EMPLOYEES.filter(e => e.status === "missing").length === 0 && (
                            <p className="text-sm text-[#445566] text-center py-4">All data received ✓</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Table toolbar */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <div className="relative flex-1">
                    <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#445566]" />
                    <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search employee or department..."
                        className="w-full h-10 bg-[#0D1928] border border-[#1A2A3A] rounded-xl pl-9 pr-3 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#00E5A0] transition-colors" />
                </div>
                <div className="flex items-center gap-2">
                    <Filter size={14} className="text-[#445566]" />
                    {["all", "approved", "pending", "missing"].map(s => (
                        <button key={s} onClick={() => setStatusFilter(s)}
                            className={`h-9 px-3 text-xs rounded-lg capitalize transition-all ${statusFilter === s ? "bg-[#0066FF] text-white" : "bg-[#1A2A3A] text-[#8899AA] hover:text-white"}`}>
                            {s === "all" ? "All" : STATUS_MAP[s as keyof typeof STATUS_MAP]?.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-[#0A1420]">
                        <tr className="text-xs text-[#8899AA]">
                            <th className="px-5 py-3.5 text-left font-medium">Employee</th>
                            <th className="px-5 py-3.5 text-left font-medium">Role</th>
                            <th className="px-5 py-3.5 text-right font-medium">Target Variable (₹)</th>
                            <th className="px-5 py-3.5 text-center font-medium">Achievement %</th>
                            <th className="px-5 py-3.5 text-right font-medium">Est. Payout (₹)</th>
                            <th className="px-5 py-3.5 text-left font-medium">Status</th>
                            <th className="px-5 py-3.5 text-center font-medium">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#0A1420]">
                        {filtered.map(emp => {
                            const cfg = STATUS_MAP[emp.status];
                            const payout = emp.achievement > 0 ? Math.round(emp.target * Math.min(emp.achievement, 100) / 100) : 0;
                            const achieveColor = emp.achievement >= 100 ? "#00E5A0" : emp.achievement >= 85 ? "#FFB800" : emp.achievement > 0 ? "#FF4444" : "#445566";
                            return (
                                <tr key={emp.emp} className="hover:bg-[#1A2A3A]/40 transition-colors">
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-[#1A2A3A] flex items-center justify-center text-[10px] font-bold text-[#8899AA]">{emp.avatar}</div>
                                            <div>
                                                <p className="font-medium text-white">{emp.name}</p>
                                                <p className="text-[11px] text-[#445566]">{emp.emp}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4 text-[#8899AA]">{emp.role}<br /><span className="text-[11px] text-[#445566]">{emp.dept}</span></td>
                                    <td className="px-5 py-4 text-right font-medium text-white">₹{emp.target.toLocaleString("en-IN")}</td>
                                    <td className="px-5 py-4">
                                        {emp.achievement > 0 ? (
                                            <div className="flex flex-col items-center gap-1">
                                                <span className="font-semibold text-sm" style={{ color: achieveColor }}>{emp.achievement}%</span>
                                                <div className="w-full max-w-[80px] bg-[#1A2A3A] rounded-full h-1.5">
                                                    <div className="h-1.5 rounded-full transition-all" style={{ width: `${Math.min(emp.achievement, 100)}%`, background: achieveColor }} />
                                                </div>
                                            </div>
                                        ) : <span className="text-[#445566] text-xs">No data</span>}
                                    </td>
                                    <td className="px-5 py-4 text-right">
                                        {payout > 0 ? <span className="font-semibold text-[#00E5A0]">₹{payout.toLocaleString("en-IN")}</span> : <span className="text-[#445566]">—</span>}
                                    </td>
                                    <td className="px-5 py-4">
                                        <span className="text-[11px] font-medium px-2.5 py-1 rounded-full whitespace-nowrap" style={{ background: cfg.bg, color: cfg.color }}>{cfg.label}</span>
                                    </td>
                                    <td className="px-5 py-4 text-center">
                                        {emp.status === "pending" || emp.status === "missing"
                                            ? <button className="text-xs text-[#0066FF] hover:underline flex items-center mx-auto gap-1"><Plus size={11} /> Enter</button>
                                            : <button className="text-xs text-[#8899AA] hover:text-white transition-colors flex items-center mx-auto gap-1">View <ChevronRight size={11} /></button>}
                                    </td>
                                </tr>
                            );
                        })}
                        {filtered.length === 0 && (
                            <tr><td colSpan={7} className="px-5 py-12 text-center text-[#445566]">No employees found</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
