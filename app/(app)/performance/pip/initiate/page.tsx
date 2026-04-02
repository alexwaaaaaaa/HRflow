"use client";
import React, { useState } from "react";
import { AlertTriangle, Plus, CheckCircle2, Loader2, Calendar, Target, Users } from "lucide-react";

const TEMPLATES = [
    "Consistently missing project delivery timelines",
    "Below-expected quality of work",
    "Poor communication and collaboration",
    "Low CSAT / customer complaint escalations",
];

export default function PIPInitiation() {
    const [employee, setEmployee] = useState("");
    const [manager, setManager] = useState("");
    const [pipStartDate, setPipStartDate] = useState("");
    const [pipEndDate, setPipEndDate] = useState("");
    const [reasons, setReasons] = useState<string[]>([]);
    const [goals, setGoals] = useState([
        { goal: "", metric: "", target: "", by: "" }
    ]);
    const [saving, setSaving] = useState(false);
    const [done, setDone] = useState(false);

    function toggleReason(r: string) {
        setReasons(prev => prev.includes(r) ? prev.filter(p => p !== r) : [...prev, r]);
    }

    function addGoal() {
        setGoals(prev => [...prev, { goal: "", metric: "", target: "", by: "" }]);
    }

    function updateGoal(i: number, field: string, value: string) {
        setGoals(prev => prev.map((g, idx) => idx === i ? { ...g, [field]: value } : g));
    }

    function initiatePIP() {
        setSaving(true);
        setTimeout(() => { setSaving(false); setDone(true); }, 2000);
    }

    if (done) return (
        <div className="min-h-screen flex items-center justify-center p-8">
            <div className="text-center max-w-md">
                <div className="w-20 h-20 rounded-2xl bg-[#FFB800]/10 border border-[#FFB800]/30 flex items-center justify-center mx-auto mb-5">
                    <AlertTriangle size={36} className="text-[#FFB800]" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">PIP Initiated</h2>
                <p className="text-[#8899AA] text-sm">Performance Improvement Plan has been created and shared with {employee}. Weekly check-ins are now scheduled.</p>
                <div className="mt-6 p-4 bg-[#0D1928] border border-[#1A2A3A] rounded-xl text-xs text-[#8899AA] text-left space-y-1">
                    <p>📧 Email sent to: {employee}</p>
                    <p>👤 Notified: {manager}</p>
                    <p>📅 Duration: {pipStartDate} → {pipEndDate}</p>
                </div>
            </div>
        </div>
    );

    return (
        <div className="p-6 md:p-8 max-w-[900px] mx-auto text-white">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-1">Initiate PIP</h1>
                    <p className="text-sm text-[#8899AA]">Performance Improvement Plan initiation</p>
                </div>
            </div>

            {/* Warning banner */}
            <div className="mb-6 flex items-start gap-3 px-4 py-3 bg-[#FFB800]/10 border border-[#FFB800]/30 rounded-xl">
                <AlertTriangle size={16} className="text-[#FFB800] shrink-0 mt-0.5" />
                <p className="text-sm text-[#FFB800]">PIP is a serious HR action. Ensure all verbal counselling has been documented and manager is aligned before proceeding.</p>
            </div>

            <div className="space-y-5">
                {/* Basic Info */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h2 className="font-semibold mb-4 text-sm text-[#8899AA] uppercase tracking-wider">Employee Information</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs text-[#8899AA] mb-1.5">Employee Name *</label>
                            <input value={employee} onChange={e => setEmployee(e.target.value)} placeholder="Search employee..."
                                className="w-full h-10 bg-[#060B14] border border-[#1A2A3A] rounded-xl px-3 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#FF4444] transition-colors" />
                        </div>
                        <div>
                            <label className="block text-xs text-[#8899AA] mb-1.5">Reporting Manager</label>
                            <input value={manager} onChange={e => setManager(e.target.value)} placeholder="Manager name"
                                className="w-full h-10 bg-[#060B14] border border-[#1A2A3A] rounded-xl px-3 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#FF4444] transition-colors" />
                        </div>
                        <div>
                            <label className="block text-xs text-[#8899AA] mb-1.5">PIP Start Date</label>
                            <input type="date" value={pipStartDate} onChange={e => setPipStartDate(e.target.value)}
                                className="w-full h-10 bg-[#060B14] border border-[#1A2A3A] rounded-xl px-3 text-sm text-white focus:outline-none focus:border-[#FF4444]" />
                        </div>
                        <div>
                            <label className="block text-xs text-[#8899AA] mb-1.5">PIP End Date (typically 90 days)</label>
                            <input type="date" value={pipEndDate} onChange={e => setPipEndDate(e.target.value)}
                                className="w-full h-10 bg-[#060B14] border border-[#1A2A3A] rounded-xl px-3 text-sm text-white focus:outline-none focus:border-[#FF4444]" />
                        </div>
                    </div>
                </div>

                {/* Reason */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h2 className="font-semibold mb-4 text-sm text-[#8899AA] uppercase tracking-wider">Reason for PIP</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                        {TEMPLATES.map(t => (
                            <button key={t} onClick={() => toggleReason(t)}
                                className={`flex items-center gap-2 p-3 rounded-xl border text-left text-xs transition-all ${reasons.includes(t) ? "border-[#FF4444]/50 bg-[#FF4444]/10 text-white" : "border-[#1A2A3A] text-[#8899AA] hover:border-[#2A3A4A]"}`}>
                                <span className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${reasons.includes(t) ? "bg-[#FF4444] border-[#FF4444]" : "border-[#445566]"}`}>
                                    {reasons.includes(t) && <CheckCircle2 size={10} className="text-white" />}
                                </span>
                                {t}
                            </button>
                        ))}
                    </div>
                    <textarea rows={2} placeholder="Add additional context..."
                        className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl px-3 py-2.5 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#FF4444] resize-none" />
                </div>

                {/* Improvement Goals */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-semibold text-sm text-[#8899AA] uppercase tracking-wider">Improvement Goals</h2>
                        <button onClick={addGoal} className="flex items-center gap-1 text-xs text-[#00E5A0] hover:underline"><Plus size={12} /> Add Goal</button>
                    </div>
                    <div className="space-y-3">
                        {goals.map((g, i) => (
                            <div key={i} className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-[#0A1420] rounded-xl">
                                <input value={g.goal} onChange={e => updateGoal(i, "goal", e.target.value)} placeholder="Goal description" className="sm:col-span-2 h-9 bg-[#060B14] border border-[#1A2A3A] rounded-lg px-3 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#FF4444]" />
                                <input value={g.metric} onChange={e => updateGoal(i, "metric", e.target.value)} placeholder="Metric" className="h-9 bg-[#060B14] border border-[#1A2A3A] rounded-lg px-3 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#FF4444]" />
                                <input type="date" value={g.by} onChange={e => updateGoal(i, "by", e.target.value)} className="h-9 bg-[#060B14] border border-[#1A2A3A] rounded-lg px-3 text-sm text-white focus:outline-none focus:border-[#FF4444]" />
                            </div>
                        ))}
                    </div>
                </div>

                <button onClick={initiatePIP} disabled={saving || !employee}
                    className={`w-full h-12 text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-all ${!employee ? "bg-[#1A2A3A] text-[#445566]" : "bg-[#FF4444] text-white hover:bg-[#e03030]"}`}>
                    {saving ? <><Loader2 size={16} className="animate-spin" /> Initiating PIP...</> : "🚨 Initiate PIP"}
                </button>
            </div>
        </div>
    );
}
