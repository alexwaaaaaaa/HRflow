"use client";
import React, { useState } from "react";
import { Star, Download, Eye, Lock, CheckCircle2, Loader2 } from "lucide-react";

const EMPLOYEES = [
    { id: 1, name: "Anjali Singh", avatar: "AS", dept: "Sales", role: "Sales Executive", kra: 4.8, comp: 4.6, final: 4.7, band: "E", increment: "18%", totalComp: "₹18.2L" },
    { id: 2, name: "Rahul Sharma", avatar: "RS", dept: "Eng", role: "Software Engineer", kra: 4.2, comp: 4.0, final: 4.1, band: "EE", increment: "12%", totalComp: "₹15.8L" },
    { id: 3, name: "Priya Kapoor", avatar: "PK", dept: "Mktg", role: "Marketing Lead", kra: 4.5, comp: 4.3, final: 4.4, band: "EE", increment: "14%", totalComp: "₹17.6L" },
    { id: 4, name: "Deepak Mehta", avatar: "DM", dept: "Finance", role: "Finance Analyst", kra: 3.6, comp: 3.4, final: 3.5, band: "ME", increment: "8%", totalComp: "₹11.2L" },
    { id: 5, name: "Vikas Sharma", avatar: "VS", dept: "Sales", role: "Account Manager", kra: 2.4, comp: 2.6, final: 2.5, band: "NI", increment: "0%", totalComp: "₹8.4L" },
];

const BAND_MAP = {
    E: { label: "Exceptional", color: "#00E5A0" },
    EE: { label: "Exceeds Exp.", color: "#0066FF" },
    ME: { label: "Meets Exp.", color: "#FFB800" },
    NI: { label: "Needs Improvement", color: "#FF8C00" },
    U: { label: "Unsatisfactory", color: "#FF4444" },
};

export default function FinalRating() {
    const [locked, setLocked] = useState(false);
    const [locking, setLocking] = useState(false);
    const [selected, setSelected] = useState<typeof EMPLOYEES[0] | null>(null);

    function handleLock() {
        setLocking(true);
        setTimeout(() => { setLocking(false); setLocked(true); }, 2000);
    }

    return (
        <div className="p-6 md:p-8 max-w-[1200px] mx-auto text-white">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-1">Final Ratings</h1>
                    <p className="text-sm text-[#8899AA]">Post-calibration final performance ratings · FY 2024–25</p>
                </div>
                <div className="flex gap-3">
                    <button className="h-10 px-4 bg-[#1A2A3A] text-sm rounded-xl hover:bg-[#243040] flex items-center gap-2 transition-colors">
                        <Download size={14} /> Export
                    </button>
                    <button onClick={handleLock} disabled={locked || locking}
                        className={`h-10 px-5 text-sm font-bold rounded-xl flex items-center gap-2 transition-all ${locked ? "bg-[#00E5A0]/15 text-[#00E5A0] border border-[#00E5A0]/30" : "bg-[#9B59B6] text-white hover:bg-[#8e4da4]"}`}>
                        {locking ? <><Loader2 size={14} className="animate-spin" /> Locking...</> : locked ? <><Lock size={14} /> Ratings Locked</> : <><Lock size={14} /> Lock & Publish</>}
                    </button>
                </div>
            </div>

            {locked && (
                <div className="mb-6 flex items-center gap-3 px-4 py-3 bg-[#00E5A0]/10 border border-[#00E5A0]/30 rounded-xl">
                    <CheckCircle2 size={16} className="text-[#00E5A0]" />
                    <p className="text-sm text-[#00E5A0]">Final ratings locked and published. Letters can now be generated.</p>
                </div>
            )}

            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-[#0A1420]">
                        <tr className="text-xs text-[#8899AA]">
                            <th className="px-5 py-4 text-left">Employee</th>
                            <th className="px-4 py-4 text-center">KRA Score</th>
                            <th className="px-4 py-4 text-center">Competency</th>
                            <th className="px-4 py-4 text-center">Final Rating</th>
                            <th className="px-4 py-4 text-center">Band</th>
                            <th className="px-4 py-4 text-center">Increment</th>
                            <th className="px-4 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#0A1420]">
                        {EMPLOYEES.map(emp => {
                            const band = BAND_MAP[emp.band as keyof typeof BAND_MAP];
                            return (
                                <tr key={emp.id} className="hover:bg-[#1A2A3A]/20 transition-colors">
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-[#1A2A3A] flex items-center justify-center text-[10px] font-bold text-[#8899AA]">{emp.avatar}</div>
                                            <div>
                                                <p className="font-medium text-white">{emp.name}</p>
                                                <p className="text-[11px] text-[#445566]">{emp.role}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-center">
                                        <span className="text-white font-semibold">{emp.kra.toFixed(1)}</span>
                                        <span className="text-[#445566] text-xs">/5</span>
                                    </td>
                                    <td className="px-4 py-4 text-center">
                                        <span className="text-white font-semibold">{emp.comp.toFixed(1)}</span>
                                        <span className="text-[#445566] text-xs">/5</span>
                                    </td>
                                    <td className="px-4 py-4 text-center">
                                        <div className="flex items-center justify-center gap-1">
                                            <Star size={14} style={{ color: "#FFB800", fill: "#FFB800" }} />
                                            <span className="font-bold text-white">{emp.final.toFixed(1)}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-center">
                                        <span className="text-[11px] px-2.5 py-1 rounded-full font-medium" style={{ background: band.color + "15", color: band.color }}>{emp.band} · {band.label}</span>
                                    </td>
                                    <td className="px-4 py-4 text-center">
                                        <span className={`font-bold ${+emp.increment.replace("%", "") > 0 ? "text-[#00E5A0]" : "text-[#FF4444]"}`}>↑ {emp.increment}</span>
                                    </td>
                                    <td className="px-4 py-4 text-right">
                                        <button onClick={() => setSelected(emp === selected ? null : emp)}
                                            className="h-8 px-3 bg-[#1A2A3A] text-xs rounded-lg hover:bg-[#243040] flex items-center gap-1.5 ml-auto transition-colors">
                                            <Eye size={11} /> View
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Detail panel */}
            {selected && (
                <div className="mt-5 bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="font-semibold mb-4">{selected.name} — Rating Breakdown</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {[
                            { label: "KRA Score", value: `${selected.kra.toFixed(1)} / 5` },
                            { label: "Competency", value: `${selected.comp.toFixed(1)} / 5` },
                            { label: "Final Rating", value: `${selected.final.toFixed(1)} / 5` },
                            { label: "Increment", value: selected.increment },
                        ].map(d => (
                            <div key={d.label} className="bg-[#0A1420] rounded-xl p-4 text-center">
                                <p className="text-lg font-bold text-white">{d.value}</p>
                                <p className="text-xs text-[#8899AA]">{d.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
