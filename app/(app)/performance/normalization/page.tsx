"use client";
import React, { useState } from "react";
import { Sliders, CheckCircle2, Loader2, AlertTriangle, BarChart2 } from "lucide-react";

interface Employee {
    id: number; name: string; dept: string; rawRating: number; normalizedRating: number; band: string;
}

const EMPLOYEES: Employee[] = [
    { id: 1, name: "Anjali Singh", dept: "Sales", rawRating: 4.8, normalizedRating: 4.7, band: "E" },
    { id: 2, name: "Rahul Sharma", dept: "Eng", rawRating: 4.2, normalizedRating: 4.1, band: "EE" },
    { id: 3, name: "Priya Kapoor", dept: "Mktg", rawRating: 4.5, normalizedRating: 4.4, band: "EE" },
    { id: 4, name: "Deepak Mehta", dept: "Finance", rawRating: 3.8, normalizedRating: 3.6, band: "ME" },
    { id: 5, name: "Vikas Sharma", dept: "Sales", rawRating: 2.5, normalizedRating: 2.5, band: "NI" },
    { id: 6, name: "Meena Reddy", dept: "HR", rawRating: 4.0, normalizedRating: 3.9, band: "ME" },
];

const BAND_COLOR: Record<string, string> = { E: "#00E5A0", EE: "#0066FF", ME: "#FFB800", NI: "#FF8C00", U: "#FF4444" };

export default function RatingNormalization() {
    const [emps, setEmps] = useState(EMPLOYEES);
    const [factor, setFactor] = useState(0); // shift factor in points
    const [dept, setDept] = useState("All");
    const [applied, setApplied] = useState(false);
    const [loading, setLoading] = useState(false);

    const depts = ["All", ...Array.from(new Set(EMPLOYEES.map(e => e.dept)))];

    function applyNorm() {
        setLoading(true);
        setTimeout(() => {
            setEmps(prev => prev.map(e => {
                if (dept !== "All" && e.dept !== dept) return e;
                const nr = Math.min(5, Math.max(1, parseFloat((e.rawRating + factor).toFixed(1))));
                const band = nr >= 4.5 ? "E" : nr >= 3.8 ? "EE" : nr >= 2.8 ? "ME" : nr >= 2.0 ? "NI" : "U";
                return { ...e, normalizedRating: nr, band };
            }));
            setLoading(false); setApplied(true);
        }, 1500);
    }

    return (
        <div className="p-6 md:p-8 max-w-[1000px] mx-auto text-white">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-1">Rating Normalization</h1>
                <p className="text-sm text-[#8899AA]">Apply statistical adjustments to align ratings across departments</p>
            </div>

            {/* Controls */}
            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 mb-6">
                <h3 className="font-semibold mb-4 text-sm">Normalization Controls</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-xs text-[#8899AA] mb-2">Department</label>
                        <select value={dept} onChange={e => setDept(e.target.value)}
                            className="w-full h-10 bg-[#060B14] border border-[#1A2A3A] rounded-xl px-3 text-sm text-white focus:outline-none focus:border-[#00E5A0]">
                            {depts.map(d => <option key={d}>{d}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs text-[#8899AA] mb-2">Adjustment Factor: {factor > 0 ? `+${factor}` : factor}</label>
                        <input type="range" min={-0.5} max={0.5} step={0.05} value={factor} onChange={e => setFactor(+e.target.value)}
                            className="w-full accent-[#00E5A0]" />
                        <div className="flex justify-between text-[10px] text-[#445566] mt-1"><span>-0.5</span><span>0</span><span>+0.5</span></div>
                    </div>
                    <div className="flex items-end">
                        <button onClick={applyNorm} disabled={loading}
                            className="w-full h-10 bg-[#0066FF] text-white text-sm font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-[#0052cc] disabled:opacity-60 transition-all">
                            {loading ? <><Loader2 size={14} className="animate-spin" /> Applying...</> : <><Sliders size={14} /> Apply Normalization</>}
                        </button>
                    </div>
                </div>
                {applied && <div className="mt-3 flex items-center gap-2 text-xs text-[#00E5A0]"><CheckCircle2 size={13} /> Normalization applied — verify changes below before saving</div>}
            </div>

            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-[#0A1420]">
                        <tr className="text-xs text-[#8899AA]">
                            <th className="px-5 py-3 text-left">Employee</th>
                            <th className="px-4 py-3 text-center">Raw Rating</th>
                            <th className="px-4 py-3 text-center">Normalized</th>
                            <th className="px-4 py-3 text-center">Change</th>
                            <th className="px-4 py-3 text-center">Band</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#0A1420]">
                        {emps.map(emp => {
                            const delta = emp.normalizedRating - emp.rawRating;
                            return (
                                <tr key={emp.id} className="hover:bg-[#1A2A3A]/20 transition-colors">
                                    <td className="px-5 py-3">
                                        <p className="font-medium text-white">{emp.name}</p>
                                        <p className="text-[11px] text-[#445566]">{emp.dept}</p>
                                    </td>
                                    <td className="px-4 py-3 text-center text-white">{emp.rawRating.toFixed(1)}</td>
                                    <td className="px-4 py-3 text-center font-bold text-white">{emp.normalizedRating.toFixed(1)}</td>
                                    <td className="px-4 py-3 text-center text-xs font-semibold" style={{ color: delta > 0 ? "#00E5A0" : delta < 0 ? "#FF4444" : "#445566" }}>
                                        {delta > 0 ? `+${delta.toFixed(2)}` : delta < 0 ? delta.toFixed(2) : "—"}
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: BAND_COLOR[emp.band] + "15", color: BAND_COLOR[emp.band] }}>{emp.band}</span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
