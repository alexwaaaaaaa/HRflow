"use client";
import React, { useState } from "react";
import { CheckCircle2, XCircle, Clock, MessageSquare, ChevronRight, Filter, Search } from "lucide-react";

interface GoalRequest {
    id: number; emp: string; avatar: string; dept: string; goals: number;
    totalWeight: number; submittedOn: string; status: "pending" | "approved" | "rejected";
    flagged: boolean;
}

const REQUESTS: GoalRequest[] = [
    { id: 1, emp: "Anjali Singh", avatar: "AS", dept: "Sales", goals: 5, totalWeight: 100, submittedOn: "01 Apr 2025", status: "pending", flagged: false },
    { id: 2, emp: "Rahul Sharma", avatar: "RS", dept: "Engineering", goals: 4, totalWeight: 95, submittedOn: "01 Apr 2025", status: "pending", flagged: true },
    { id: 3, emp: "Priya Kapoor", avatar: "PK", dept: "Marketing", goals: 5, totalWeight: 100, submittedOn: "02 Apr 2025", status: "approved", flagged: false },
    { id: 4, emp: "Vikas Sharma", avatar: "VS", dept: "Sales", goals: 3, totalWeight: 80, submittedOn: "02 Apr 2025", status: "pending", flagged: true },
    { id: 5, emp: "Meena Reddy", avatar: "MR", dept: "HR", goals: 4, totalWeight: 100, submittedOn: "03 Apr 2025", status: "rejected", flagged: false },
    { id: 6, emp: "Deepak Mehta", avatar: "DM", dept: "Finance", goals: 5, totalWeight: 100, submittedOn: "03 Apr 2025", status: "pending", flagged: false },
];

const STATUS_MAP = {
    pending: { label: "Pending Review", color: "#FFB800", bg: "rgba(255,184,0,0.1)" },
    approved: { label: "Approved", color: "#00E5A0", bg: "rgba(0,229,160,0.1)" },
    rejected: { label: "Rejected", color: "#FF4444", bg: "rgba(255,68,68,0.1)" },
};

export default function GoalApprovalManager() {
    const [requests, setRequests] = useState(REQUESTS);
    const [filter, setFilter] = useState("pending");
    const [search, setSearch] = useState("");
    const [activeId, setActiveId] = useState<number | null>(null);
    const [comment, setComment] = useState("");

    function decide(id: number, action: "approved" | "rejected") {
        setRequests(prev => prev.map(r => r.id === id ? { ...r, status: action } : r));
        setActiveId(null);
        setComment("");
    }

    const filtered = requests.filter(r =>
        (filter === "all" || r.status === filter) &&
        r.emp.toLowerCase().includes(search.toLowerCase())
    );

    const pending = requests.filter(r => r.status === "pending").length;

    return (
        <div className="p-6 md:p-8 max-w-[900px] mx-auto text-white">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-1">Goal Approvals</h1>
                    <p className="text-sm text-[#8899AA]">Review and approve team goals for FY 2024–25</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-[#FFB800]/10 border border-[#FFB800]/30 rounded-xl">
                    <Clock size={14} className="text-[#FFB800]" />
                    <span className="text-sm font-bold text-[#FFB800]">{pending} pending</span>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="relative flex-1">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#445566]" />
                    <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search employee..."
                        className="w-full h-10 bg-[#0D1928] border border-[#1A2A3A] rounded-xl pl-9 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#00E5A0]" />
                </div>
                <div className="flex gap-2">
                    {["all", "pending", "approved", "rejected"].map(s => (
                        <button key={s} onClick={() => setFilter(s)}
                            className={`h-10 px-3 text-xs capitalize rounded-xl transition-all ${filter === s ? "bg-[#0066FF] text-white" : "bg-[#1A2A3A] text-[#8899AA] hover:text-white"}`}>
                            {s === "all" ? `All (${requests.length})` : `${s.charAt(0).toUpperCase() + s.slice(1)} (${requests.filter(r => r.status === s).length})`}
                        </button>
                    ))}
                </div>
            </div>

            {/* Request cards */}
            <div className="space-y-4">
                {filtered.map(req => {
                    const cfg = STATUS_MAP[req.status];
                    const isOpen = activeId === req.id;
                    return (
                        <div key={req.id} className={`bg-[#0D1928] border rounded-2xl overflow-hidden transition-all ${req.flagged ? "border-[#FFB800]/30" : "border-[#1A2A3A]"}`}>
                            <div className="p-5 flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-[#1A2A3A] flex items-center justify-center text-xs font-bold text-[#8899AA] shrink-0">{req.avatar}</div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-0.5">
                                        <p className="font-semibold text-white">{req.emp}</p>
                                        {req.flagged && <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#FFB800]/10 text-[#FFB800] font-medium">⚠ Weight ≠ 100%</span>}
                                    </div>
                                    <p className="text-xs text-[#8899AA]">{req.dept} · {req.goals} goals · Total weight: {req.totalWeight}% · Submitted {req.submittedOn}</p>
                                </div>
                                <span className="text-[11px] px-2.5 py-1 rounded-full font-medium shrink-0" style={{ background: cfg.bg, color: cfg.color }}>{cfg.label}</span>
                                {req.status === "pending" && (
                                    <button onClick={() => setActiveId(isOpen ? null : req.id)}
                                        className="h-9 px-4 bg-[#1A2A3A] text-sm text-white rounded-xl hover:bg-[#243040] transition-colors flex items-center gap-1.5 shrink-0">
                                        Review <ChevronRight size={14} />
                                    </button>
                                )}
                                {req.status !== "pending" && (
                                    <button className="h-9 px-4 bg-[#1A2A3A] text-sm text-[#8899AA] rounded-xl flex items-center gap-1.5 shrink-0">
                                        View <ChevronRight size={14} />
                                    </button>
                                )}
                            </div>
                            {isOpen && (
                                <div className="px-5 pb-5 pt-0 border-t border-[#1A2A3A]">
                                    <div className="bg-[#0A1420] rounded-xl p-4 mb-4 mt-3">
                                        <p className="text-xs text-[#8899AA] mb-2">Sample Goal from {req.emp}</p>
                                        <div className="space-y-2">
                                            {["Achieve ₹1.2 Cr quarterly revenue (W: 30%)", "Maintain CSAT > 95% (W: 25%)", "Complete AWS certification (W: 20%)"].map(g => (
                                                <div key={g} className="flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-[#0066FF] shrink-0" />
                                                    <p className="text-xs text-white">{g}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="block text-xs text-[#8899AA] mb-1.5">Comment (optional)</label>
                                        <textarea value={comment} onChange={e => setComment(e.target.value)} rows={2} placeholder="Add feedback for the employee..."
                                            className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl px-3 py-2 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#00E5A0] resize-none" />
                                    </div>
                                    <div className="flex gap-3">
                                        <button onClick={() => decide(req.id, "rejected")}
                                            className="flex-1 h-10 bg-[#FF4444]/10 text-[#FF4444] border border-[#FF4444]/30 text-sm font-semibold rounded-xl hover:bg-[#FF4444]/20 flex items-center justify-center gap-2">
                                            <XCircle size={15} /> Request Revision
                                        </button>
                                        <button onClick={() => decide(req.id, "approved")}
                                            className="flex-1 h-10 bg-[#00E5A0] text-[#060B14] text-sm font-semibold rounded-xl hover:bg-[#00c98d] flex items-center justify-center gap-2">
                                            <CheckCircle2 size={15} /> Approve Goals
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
                {filtered.length === 0 && <div className="text-center py-12 text-[#445566]">No requests found</div>}
            </div>
        </div>
    );
}
