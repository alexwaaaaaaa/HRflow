"use client";
import React, { useState } from "react";
import { Plus, Target, CheckCircle2, Clock, Edit2, Trash2, ChevronDown, ChevronUp } from "lucide-react";

interface Goal {
    id: number; title: string; metric: string; target: string;
    current: string; weight: number; status: "on-track" | "at-risk" | "completed" | "draft";
    dueDate: string; progress: number;
}

const INITIAL_GOALS: Goal[] = [
    { id: 1, title: "Increase quarterly revenue by 15%", metric: "Revenue ($)", target: "₹1.2 Cr", current: "₹0.9 Cr", weight: 30, status: "on-track", dueDate: "31 Mar 2025", progress: 75 },
    { id: 2, title: "Achieve 95% CSAT score in customer support", metric: "CSAT Score (%)", target: "95%", current: "89%", weight: 25, status: "at-risk", dueDate: "31 Mar 2025", progress: 50 },
    { id: 3, title: "Complete AWS Solutions Architect certification", metric: "Certification", target: "1 cert", current: "In progress", weight: 20, status: "on-track", dueDate: "28 Feb 2025", progress: 80 },
    { id: 4, title: "Mentor 2 junior team members", metric: "Count", target: "2", current: "2", weight: 15, status: "completed", dueDate: "15 Jan 2025", progress: 100 },
    { id: 5, title: "Reduce ticket response time to < 4 hours", metric: "Avg Hours", target: "4 hrs", current: "6.2 hrs", weight: 10, status: "at-risk", dueDate: "31 Mar 2025", progress: 35 },
];

const STATUS_MAP = {
    "on-track": { label: "On Track", color: "#00E5A0", bg: "rgba(0,229,160,0.1)" },
    "at-risk": { label: "At Risk", color: "#FFB800", bg: "rgba(255,184,0,0.1)" },
    "completed": { label: "Completed", color: "#0066FF", bg: "rgba(0,102,255,0.1)" },
    "draft": { label: "Draft", color: "#8899AA", bg: "rgba(136,153,170,0.1)" },
};

export default function GoalSetting() {
    const [goals, setGoals] = useState<Goal[]>(INITIAL_GOALS);
    const [showAdd, setShowAdd] = useState(false);
    const [newGoal, setNewGoal] = useState({ title: "", metric: "", target: "", weight: 10, dueDate: "" });
    const [submitted, setSubmitted] = useState(false);
    const [expandedId, setExpandedId] = useState<number | null>(null);

    const totalWeight = goals.reduce((s, g) => s + g.weight, 0);

    function addGoal() {
        if (!newGoal.title) return;
        setGoals(prev => [...prev, { id: Date.now(), ...newGoal, current: "0", status: "draft", progress: 0 }]);
        setNewGoal({ title: "", metric: "", target: "", weight: 10, dueDate: "" });
        setShowAdd(false);
    }

    function submitForApproval() {
        setSubmitted(true);
    }

    return (
        <div className="p-6 md:p-8 max-w-[900px] mx-auto text-white">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-1">My Goals</h1>
                    <p className="text-sm text-[#8899AA]">FY 2024–25 · Set & track your performance goals</p>
                </div>
                <div className="flex gap-3">
                    <button onClick={() => setShowAdd(v => !v)} className="h-10 px-4 bg-[#1A2A3A] text-sm rounded-xl hover:bg-[#243040] flex items-center gap-2 transition-colors">
                        <Plus size={14} /> Add Goal
                    </button>
                    <button onClick={submitForApproval} disabled={submitted}
                        className={`h-10 px-5 text-sm font-semibold rounded-xl flex items-center gap-2 transition-all ${submitted ? "bg-[#00E5A0]/20 text-[#00E5A0] border border-[#00E5A0]/30" : "bg-[#00E5A0] text-[#060B14] hover:bg-[#00c98d]"}`}>
                        {submitted ? <><CheckCircle2 size={14} />Submitted for Approval</> : "Submit for Approval"}
                    </button>
                </div>
            </div>

            {/* Weight meter */}
            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-4 mb-6 flex items-center gap-4">
                <div className="flex-1">
                    <div className="flex justify-between mb-1.5">
                        <span className="text-xs text-[#8899AA]">Total Goal Weightage</span>
                        <span className={`text-xs font-bold ${totalWeight === 100 ? "text-[#00E5A0]" : "text-[#FFB800]"}`}>{totalWeight}% of 100%</span>
                    </div>
                    <div className="h-2 bg-[#1A2A3A] rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all" style={{ width: `${Math.min(totalWeight, 100)}%`, background: totalWeight === 100 ? "#00E5A0" : totalWeight > 100 ? "#FF4444" : "#FFB800" }} />
                    </div>
                </div>
                {totalWeight !== 100 && <span className="text-xs text-[#FFB800] shrink-0">⚠ Must total 100%</span>}
            </div>

            {/* Add Goal Form */}
            {showAdd && (
                <div className="bg-[#0D1928] border border-[#00E5A0]/30 rounded-2xl p-5 mb-6">
                    <h3 className="text-sm font-semibold mb-4">New Goal</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                        <div className="sm:col-span-2">
                            <label className="block text-xs text-[#8899AA] mb-1">Goal Title *</label>
                            <input value={newGoal.title} onChange={e => setNewGoal(p => ({ ...p, title: e.target.value }))} placeholder="e.g. Increase monthly revenue by 20%"
                                className="w-full h-10 bg-[#060B14] border border-[#1A2A3A] rounded-xl px-3 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#00E5A0]" />
                        </div>
                        <div>
                            <label className="block text-xs text-[#8899AA] mb-1">Metric / KPI</label>
                            <input value={newGoal.metric} onChange={e => setNewGoal(p => ({ ...p, metric: e.target.value }))} placeholder="Revenue (₹), Score (%), Count..."
                                className="w-full h-10 bg-[#060B14] border border-[#1A2A3A] rounded-xl px-3 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#00E5A0]" />
                        </div>
                        <div>
                            <label className="block text-xs text-[#8899AA] mb-1">Target Value</label>
                            <input value={newGoal.target} onChange={e => setNewGoal(p => ({ ...p, target: e.target.value }))} placeholder="₹1.2 Cr / 95% / 5 units"
                                className="w-full h-10 bg-[#060B14] border border-[#1A2A3A] rounded-xl px-3 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#00E5A0]" />
                        </div>
                        <div>
                            <label className="block text-xs text-[#8899AA] mb-1">Weightage (%)</label>
                            <input type="number" min={1} max={100} value={newGoal.weight} onChange={e => setNewGoal(p => ({ ...p, weight: +e.target.value }))}
                                className="w-full h-10 bg-[#060B14] border border-[#1A2A3A] rounded-xl px-3 text-sm text-white focus:outline-none focus:border-[#00E5A0]" />
                        </div>
                        <div>
                            <label className="block text-xs text-[#8899AA] mb-1">Due Date</label>
                            <input type="date" value={newGoal.dueDate} onChange={e => setNewGoal(p => ({ ...p, dueDate: e.target.value }))}
                                className="w-full h-10 bg-[#060B14] border border-[#1A2A3A] rounded-xl px-3 text-sm text-white focus:outline-none focus:border-[#00E5A0]" />
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button onClick={() => setShowAdd(false)} className="h-9 px-4 bg-transparent border border-[#1A2A3A] text-sm text-white rounded-xl hover:bg-[#1A2A3A]">Cancel</button>
                        <button onClick={addGoal} className="h-9 px-5 bg-[#00E5A0] text-[#060B14] text-sm font-semibold rounded-xl hover:bg-[#00c98d]">Add Goal</button>
                    </div>
                </div>
            )}

            {/* Goals list */}
            <div className="space-y-3">
                {goals.map(goal => {
                    const cfg = STATUS_MAP[goal.status];
                    const expanded = expandedId === goal.id;
                    return (
                        <div key={goal.id} className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden hover:border-[#2A3A4A] transition-all">
                            <div className="p-4 flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-[#1A2A3A] flex items-center justify-center shrink-0">
                                    <Target size={16} className="text-[#8899AA]" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2 mb-1">
                                        <p className="text-sm font-medium text-white leading-snug">{goal.title}</p>
                                        <span className="text-[10px] px-2 py-0.5 rounded-full shrink-0 font-medium" style={{ background: cfg.bg, color: cfg.color }}>{cfg.label}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-[11px] text-[#8899AA] mb-2">
                                        <span>{goal.metric}</span>
                                        <span>→ {goal.target}</span>
                                        <span>Now: {goal.current}</span>
                                        <span className="ml-auto text-[#445566]">Due: {goal.dueDate}</span>
                                    </div>
                                    {/* Progress bar */}
                                    <div className="flex items-center gap-3">
                                        <div className="flex-1 h-1.5 bg-[#1A2A3A] rounded-full">
                                            <div className="h-full rounded-full transition-all" style={{ width: `${goal.progress}%`, background: cfg.color }} />
                                        </div>
                                        <span className="text-[11px] font-bold min-w-[30px] text-right" style={{ color: cfg.color }}>{goal.progress}%</span>
                                        <span className="text-[10px] text-[#445566]">W: {goal.weight}%</span>
                                    </div>
                                </div>
                                <div className="flex gap-1 shrink-0">
                                    <button className="p-1.5 hover:bg-[#1A2A3A] rounded-lg text-[#445566] hover:text-white transition-colors"><Edit2 size={13} /></button>
                                    <button onClick={() => setGoals(prev => prev.filter(g => g.id !== goal.id))} className="p-1.5 hover:bg-[#FF4444]/10 rounded-lg text-[#445566] hover:text-[#FF4444] transition-colors"><Trash2 size={13} /></button>
                                    <button onClick={() => setExpandedId(expanded ? null : goal.id)} className="p-1.5 hover:bg-[#1A2A3A] rounded-lg text-[#445566] hover:text-white transition-colors">
                                        {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
