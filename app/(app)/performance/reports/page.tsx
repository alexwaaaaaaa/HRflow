"use client";
import React, { useState } from "react";
import { Download, Filter, BarChart2, FileText, TrendingUp } from "lucide-react";

const REPORTS = [
    { id: "dept-summary", title: "Department Rating Summary", desc: "Average ratings per dept, bell curve distribution", rows: 12, category: "Ratings" },
    { id: "emp-ratings", title: "Employee Final Ratings Export", desc: "All employee ratings with band and increment", rows: 512, category: "Ratings" },
    { id: "goal-completion", title: "Goal Completion Analysis", desc: "Goal achievement rate by dept and employee", rows: 420, category: "Goals" },
    { id: "pip-tracker", title: "PIP Tracker Report", desc: "Active/closed PIPs, durations, outcomes", rows: 4, category: "PIP" },
    { id: "promotions", title: "Promotion Summary", desc: "Approved promotions by dept and level jump", rows: 18, category: "Promo" },
    { id: "calibration-log", title: "Calibration Audit Log", desc: "Pre/post calibration rating changes with reasons", rows: 89, category: "Audit" },
    { id: "increment-dist", title: "Increment Distribution", desc: "Increment % distribution across pay grades & depts", rows: 512, category: "Comp" },
    { id: "cycle-completion", title: "Cycle Completion Rate", desc: "% employees who completed each review stage", rows: 1, category: "Cycle" },
];

const CATS = ["All", ...Array.from(new Set(REPORTS.map(r => r.category)))];

export default function PMSReports() {
    const [filterCat, setFilterCat] = useState("All");
    const [downloading, setDownloading] = useState<string | null>(null);
    const [done, setDone] = useState<string[]>([]);

    function download(id: string) {
        setDownloading(id);
        setTimeout(() => { setDownloading(null); setDone(p => [...p, id]); }, 1500);
    }

    const filtered = filterCat === "All" ? REPORTS : REPORTS.filter(r => r.category === filterCat);

    return (
        <div className="p-6 md:p-8 max-w-[1000px] mx-auto text-white">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-1">PMS Reports</h1>
                    <p className="text-sm text-[#8899AA]">Export performance data for analysis and compliance</p>
                </div>
                <button className="h-10 px-4 bg-[#1A2A3A] text-sm rounded-xl hover:bg-[#243040] flex items-center gap-2 transition-colors">
                    <Download size={14} /> Export All
                </button>
            </div>

            <div className="flex gap-2 mb-5 flex-wrap">
                {CATS.map(c => (
                    <button key={c} onClick={() => setFilterCat(c)}
                        className={`h-9 px-3 text-xs rounded-xl transition-all ${filterCat === c ? "bg-[#0066FF] text-white" : "bg-[#1A2A3A] text-[#8899AA] hover:text-white"}`}>{c}</button>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filtered.map(r => {
                    const isDone = done.includes(r.id);
                    const isLoading = downloading === r.id;
                    return (
                        <div key={r.id} className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5 hover:border-[#2A3A4A] transition-all">
                            <div className="flex items-start gap-3 mb-3">
                                <div className="w-9 h-9 rounded-xl bg-[#1A2A3A] flex items-center justify-center shrink-0">
                                    <FileText size={15} className="text-[#8899AA]" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-white">{r.title}</p>
                                    <p className="text-[11px] text-[#8899AA] mt-0.5">{r.desc}</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#1A2A3A] text-[#8899AA]">{r.category}</span>
                                    <span className="text-[10px] text-[#445566]">{r.rows} rows</span>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => download(r.id)} disabled={isLoading}
                                        className={`h-8 px-3 text-xs rounded-lg flex items-center gap-1.5 font-medium transition-all ${isDone ? "bg-[#00E5A0]/15 text-[#00E5A0] border border-[#00E5A0]/30" : "bg-[#0066FF] text-white hover:bg-[#0052cc]"}`}>
                                        {isLoading ? <span className="w-3 h-3 border border-white/30 border-t-white rounded-full animate-spin" />
                                            : isDone ? "✓ Downloaded" : <><Download size={11} /> CSV</>}
                                    </button>
                                    <button className="h-8 px-3 bg-[#1A2A3A] text-xs text-[#8899AA] rounded-lg hover:bg-[#243040] transition-colors">XLSX</button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
