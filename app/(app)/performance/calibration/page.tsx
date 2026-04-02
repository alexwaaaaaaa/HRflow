"use client";
import React, { useState } from "react";
import {
    Users, Star, TrendingUp, AlertTriangle, CheckCircle2, Loader2,
    ChevronRight, ArrowUpDown, Minus
} from "lucide-react";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Cell, ZAxis, ResponsiveContainer } from 'recharts';
import { Tooltip as RechartsTooltip } from "recharts";
import { ChartWrapper } from "@/components/ui/chart-wrapper";
import ClientOnly from "@/components/ui/ClientOnly";

interface Employee {
    id: number; name: string; avatar: string; dept: string; role: string;
    selfRating: number; managerRating: number; proposedRating: number; calibratedRating: number | null;
    bell: "E" | "EE" | "ME" | "NI" | "U";
}

const EMPLOYEES: Employee[] = [
    { id: 1, name: "Anjali Singh", avatar: "AS", dept: "Sales", role: "Sales Exec", selfRating: 4.5, managerRating: 4.8, proposedRating: 4.8, calibratedRating: null, bell: "E" },
    { id: 2, name: "Rahul Sharma", avatar: "RS", dept: "Eng", role: "SWE", selfRating: 3.8, managerRating: 4.2, proposedRating: 4.2, calibratedRating: null, bell: "EE" },
    { id: 3, name: "Priya Kapoor", avatar: "PK", dept: "Mktg", role: "Mktg Lead", selfRating: 4.2, managerRating: 4.5, proposedRating: 4.5, calibratedRating: null, bell: "EE" },
    { id: 4, name: "Deepak Mehta", avatar: "DM", dept: "Fin", role: "Finance Analyst", selfRating: 3.2, managerRating: 3.6, proposedRating: 3.6, calibratedRating: null, bell: "ME" },
    { id: 5, name: "Suresh Rao", avatar: "SR", dept: "Ops", role: "Ops Manager", selfRating: 3.5, managerRating: 3.8, proposedRating: 3.8, calibratedRating: null, bell: "ME" },
    { id: 6, name: "Meena Reddy", avatar: "MR", dept: "HR", role: "HR BP", selfRating: 4.0, managerRating: 3.9, proposedRating: 3.9, calibratedRating: null, bell: "ME" },
    { id: 7, name: "Vikas Sharma", avatar: "VS", dept: "Sales", role: "Account Mgr", selfRating: 2.8, managerRating: 2.5, proposedRating: 2.5, calibratedRating: null, bell: "NI" },
    { id: 8, name: "Pooja Nair", avatar: "PN", dept: "Eng", role: "QA Lead", selfRating: 3.0, managerRating: 3.2, proposedRating: 3.2, calibratedRating: null, bell: "ME" },
];

const BELL_CONFIG = {
    E: { label: "Exceptional", color: "#00E5A0", target: "10%" },
    EE: { label: "Exceeds Exp.", color: "#0066FF", target: "20%" },
    ME: { label: "Meets Exp.", color: "#FFB800", target: "40%" },
    NI: { label: "Needs Improvement", color: "#FF8C00", target: "20%" },
    U: { label: "Unsatisfactory", color: "#FF4444", target: "10%" },
};

export default function CalibrationScreen() {
    const [emps, setEmps] = useState(EMPLOYEES);
    const [saving, setSaving] = useState(false);
    const [done, setDone] = useState(false);

    function setBell(id: number, bell: Employee["bell"]) {
        setEmps(prev => prev.map(e => e.id === id ? { ...e, bell, calibratedRating: e.proposedRating } : e));
    }
    function setCalibratedRating(id: number, r: number) {
        setEmps(prev => prev.map(e => e.id === id ? { ...e, calibratedRating: r } : e));
    }

    function lockCalibration() {
        setSaving(true);
        setTimeout(() => { setSaving(false); setDone(true); }, 1800);
    }

    // Bell curve distribution
    const dist = Object.keys(BELL_CONFIG).map(k => ({
        key: k, count: emps.filter(e => e.bell === k).length, color: BELL_CONFIG[k as keyof typeof BELL_CONFIG].color,
        label: BELL_CONFIG[k as keyof typeof BELL_CONFIG].label, target: BELL_CONFIG[k as keyof typeof BELL_CONFIG].target,
    }));

    // Scatter data
    const scatterData = emps.map(e => ({ x: e.managerRating, y: e.selfRating, z: 100, name: e.name, bell: e.bell }));

    return (
        <div className="p-6 md:p-8 max-w-[1200px] mx-auto text-white">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-1">Rating Calibration</h1>
                    <p className="text-sm text-[#8899AA]">HR-facilitated calibration session · FY 2024–25</p>
                </div>
                <button onClick={lockCalibration} disabled={saving || done}
                    className={`h-10 px-5 text-sm font-bold rounded-xl flex items-center gap-2 transition-all ${done ? "bg-[#00E5A0]/20 text-[#00E5A0] border border-[#00E5A0]/30" : "bg-[#FF4444] text-white hover:bg-[#e03030]"}`}>
                    {saving ? <><Loader2 size={14} className="animate-spin" /> Locking...</> : done ? <><CheckCircle2 size={14} /> Calibration Locked</> : "🔒 Lock Calibration"}
                </button>
            </div>

            {/* Bell curve distribution overview */}
            <div className="grid grid-cols-5 gap-3 mb-6">
                {dist.map(d => (
                    <div key={d.key} className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-white mb-0.5">{d.count}</div>
                        <div className="text-[10px] font-medium mb-1" style={{ color: d.color }}>{d.label}</div>
                        <div className="text-[9px] text-[#445566]">Target: {d.target}</div>
                        <div className="h-1 rounded-full mt-2 mx-auto" style={{ width: "60%", background: d.color + "60" }} />
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 mb-6">
                {/* Employee table */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-[#0A1420]">
                            <tr className="text-xs text-[#8899AA]">
                                <th className="px-4 py-3 text-left">Employee</th>
                                <th className="px-3 py-3 text-center">Self</th>
                                <th className="px-3 py-3 text-center">Manager</th>
                                <th className="px-3 py-3 text-center">Calibrated</th>
                                <th className="px-4 py-3 text-center">Bell Band</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#0A1420]">
                            {emps.map(emp => {
                                const bellCfg = BELL_CONFIG[emp.bell];
                                return (
                                    <tr key={emp.id} className="hover:bg-[#1A2A3A]/30 transition-colors">
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                <div className="w-7 h-7 rounded-full bg-[#1A2A3A] flex items-center justify-center text-[10px] font-bold text-[#8899AA]">{emp.avatar}</div>
                                                <div>
                                                    <p className="font-medium text-white text-xs">{emp.name}</p>
                                                    <p className="text-[10px] text-[#445566]">{emp.dept}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-3 py-3 text-center">
                                            <span className="text-xs font-semibold text-[#8899AA]">{emp.selfRating.toFixed(1)}</span>
                                        </td>
                                        <td className="px-3 py-3 text-center">
                                            <span className="text-xs font-semibold text-white">{emp.managerRating.toFixed(1)}</span>
                                        </td>
                                        <td className="px-3 py-3 text-center">
                                            <input type="number" min={1} max={5} step={0.1}
                                                defaultValue={emp.proposedRating.toFixed(1)}
                                                onChange={e => setCalibratedRating(emp.id, +e.target.value)}
                                                className={`w-16 h-7 bg-[#060B14] border rounded-lg text-center text-xs text-white focus:outline-none focus:border-[#00E5A0] ${emp.calibratedRating !== null && Math.abs(emp.calibratedRating - emp.managerRating) > 0.5 ? "border-[#FFB800]/50" : "border-[#1A2A3A]"}`} />
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <select value={emp.bell} onChange={e => setBell(emp.id, e.target.value as Employee["bell"])}
                                                className="h-7 bg-[#060B14] border border-[#1A2A3A] rounded-lg px-2 text-xs focus:outline-none focus:border-[#00E5A0]"
                                                style={{ color: bellCfg.color }}>
                                                {(Object.keys(BELL_CONFIG) as Array<keyof typeof BELL_CONFIG>).map(k => (
                                                    <option key={k} value={k}>{k}</option>
                                                ))}
                                            </select>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Scatter plot */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5">
                    <h3 className="text-sm font-semibold mb-3">Self vs Manager Rating</h3>
                    <div className="h-[250px]">
                        <ClientOnly>
                            <ChartWrapper height="h-[250px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <ScatterChart>
                                        <CartesianGrid strokeDasharray="2 2" stroke="#1A2A3A" />
                                        <XAxis type="number" dataKey="x" domain={[1, 5]} name="Manager" label={{ value: "Manager", position: "bottom", fill: "#8899AA", fontSize: 11 }} axisLine={false} tickLine={false} tick={{ fill: "#8899AA", fontSize: 10 }} />
                                        <YAxis type="number" dataKey="y" domain={[1, 5]} name="Self" label={{ value: "Self", angle: -90, position: "left", fill: "#8899AA", fontSize: 11 }} axisLine={false} tickLine={false} tick={{ fill: "#8899AA", fontSize: 10 }} />
                                        <ZAxis range={[60, 60]} />
                                        <RechartsTooltip contentStyle={{ background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8 }} formatter={(v, n) => [v, n]} />
                                        <Scatter data={scatterData}>
                                            {scatterData.map((d, i) => (
                                                <Cell key={i} fill={BELL_CONFIG[d.bell as keyof typeof BELL_CONFIG].color} />
                                            ))}
                                        </Scatter>
                                    </ScatterChart>
                                </ResponsiveContainer>
                            </ChartWrapper>
                        </ClientOnly>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {Object.entries(BELL_CONFIG).map(([k, v]) => (
                            <span key={k} className="flex items-center gap-1 text-[10px] text-[#8899AA]">
                                <span className="w-2 h-2 rounded-full" style={{ background: v.color }} />{k}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
