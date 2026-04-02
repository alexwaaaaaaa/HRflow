"use client";
import React, { useState } from 'react';
import { Activity, Search, AlertCircle, ArrowUpRight, ArrowDownRight, Download, SlidersHorizontal } from 'lucide-react';

export default function UtilizationScreen() {
    const [view, setView] = useState('team');

    return (
        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="text-purple-400 text-xs font-bold uppercase tracking-wider mb-1">Resource Capacity</div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><Activity size={24} className="text-purple-400" /> Utilization Heatmap</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Identify over-allocated resources, bench strength, and optimize billable targets.</p>
                </div>
                <div className="flex gap-2">
                    <button className="bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white px-4 py-2 rounded-xl text-sm font-bold transition-colors flex items-center gap-2">
                        <SlidersHorizontal size={16} /> Filter Dept
                    </button>
                    <button className="bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white px-4 py-2 rounded-xl text-sm font-bold transition-colors flex items-center gap-2">
                        <Download size={16} /> Export CSV
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden flex flex-col justify-center">
                    <div className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-2">Company Util Rate</div>
                    <div className="text-3xl font-black text-white mb-2">78.5%</div>
                    <div className="text-emerald-400 text-xs font-bold flex items-center gap-1"><ArrowUpRight size={14} /> 2.5% vs Prev Month</div>
                </div>

                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden flex flex-col justify-center">
                    <div className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-2">Total Bench Cost</div>
                    <div className="text-3xl font-black text-white mb-2">$145k</div>
                    <div className="text-rose-400 text-xs font-bold flex items-center gap-1"><ArrowUpRight size={14} /> Wasted Capacity MT</div>
                </div>

                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden flex flex-col justify-center">
                    <div className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-2">Over-allocated Staff</div>
                    <div className="text-3xl font-black text-amber-500 mb-2">14</div>
                    <div className="text-[#556677] text-xs font-bold">&gt;110% Target Capacity</div>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 rounded-2xl p-6 relative overflow-hidden flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
                        <AlertCircle size={24} />
                    </div>
                    <div>
                        <h3 className="text-white font-bold text-sm mb-1">Burnout Risk Alert</h3>
                        <p className="text-rose-200/70 text-xs">Engineering dept has sustained &gt;95% util for 4 consecutive weeks.</p>
                    </div>
                </div>
            </div>

            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl overflow-hidden shadow-xl mt-6">
                <div className="p-4 border-b border-[#1A2A3A] bg-[#060D1A] flex flex-wrap gap-4 items-center justify-between">
                    <div className="flex gap-2 p-1 bg-[#131B2B] border border-[#2A3A4A] rounded-xl">
                        {['team', 'department', 'project'].map(v => (
                            <button key={v} onClick={() => setView(v)} className={`px-4 py-1.5 rounded-lg text-sm font-bold uppercase tracking-wider transition-colors ${view === v ? 'bg-[#2A3A4A] text-white shadow-sm' : 'text-[#556677] hover:text-[#8899AA]'}`}>
                                {v}
                            </button>
                        ))}
                    </div>

                    <div className="text-[#8899AA] text-xs font-bold tracking-wider pt-2">4-WEEK FORECAST (WO Oct 20 - Nov 10)</div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#131B2B] text-[#8899AA] text-xs uppercase tracking-wider font-bold border-b border-[#2A3A4A]">
                                <th className="p-4 py-3 border-r border-[#2A3A4A] w-1/4">Resource / Role</th>
                                <th className="p-4 py-3 border-r border-[#2A3A4A] text-center w-24">Target</th>
                                <th className="p-4 py-3 border-r border-[#2A3A4A] text-center w-32">WO Oct 20</th>
                                <th className="p-4 py-3 border-r border-[#2A3A4A] text-center w-32">WO Oct 27</th>
                                <th className="p-4 py-3 border-r border-[#2A3A4A] text-center w-32">WO Nov 03</th>
                                <th className="p-4 py-3 text-center w-32">WO Nov 10</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {[
                                { name: 'Sarah Jenkins', role: 'Sr Architect', target: 80, w1: 115, w2: 110, w3: 100, w4: 85 },
                                { name: 'David Palmer', role: 'Project Manager', target: 70, w1: 85, w2: 85, w3: 75, w4: 70 },
                                { name: 'Maya Lin', role: 'Software Engineer', target: 85, w1: 95, w2: 95, w3: 90, w4: 85 },
                                { name: 'James Doe', role: 'QA Automation', target: 80, w1: 65, w2: 50, w3: 40, w4: 20 },
                                { name: 'Elena Rost', role: 'UX Designer', target: 75, w1: 10, w2: 0, w3: 0, w4: 0 },
                            ].map((row, i) => (
                                <tr key={i} className="border-b border-[#1A2A3A] hover:bg-[#131B2B]/40 transition-colors">
                                    <td className="p-3 border-r border-[#1A2A3A]">
                                        <div className="font-bold text-white mb-0.5">{row.name}</div>
                                        <div className="text-[#8899AA] text-xs">{row.role}</div>
                                    </td>
                                    <td className="p-3 border-r border-[#1A2A3A] text-center text-[#556677] font-bold">{row.target}%</td>

                                    {[row.w1, row.w2, row.w3, row.w4].map((val, idx) => (
                                        <td key={idx} className="p-2 border-r border-[#1A2A3A] last:border-0 relative group cursor-pointer">
                                            <div className={`w-full py-2 rounded text-center text-xs font-black
                             ${val >= 110 ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                                                    val >= 90 ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                                                        val >= 70 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                                                            val >= 40 ? 'bg-[#2A3A4A] text-[#AABBCC]' :
                                                                'bg-sky-500/10 text-sky-400 border border-sky-500/20 border-dashed'
                                                }
                           `}>
                                                {val}%
                                            </div>

                                            {/* Hover tooltip for breakdown */}
                                            <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity mt-2 left-1/2 -translate-x-1/2 z-10 w-48 bg-[#131B2B] border border-[#2A3A4A] rounded-xl p-3 shadow-2xl pointer-events-none">
                                                <div className="text-white text-xs font-bold mb-2 border-b border-[#2A3A4A] pb-1">Allocation Breakdown</div>
                                                {val > 0 ? (
                                                    <div className="space-y-1">
                                                        <div className="flex justify-between text-[10px] text-[#AABBCC]"><span>PRJ-809</span><span>{val - 10 > 0 ? val - 10 : val} hrs</span></div>
                                                        {val > 10 && <div className="flex justify-between text-[10px] text-[#AABBCC]"><span>Internal</span><span>10 hrs</span></div>}
                                                    </div>
                                                ) : (
                                                    <div className="text-[10px] text-sky-400 font-bold uppercase tracking-wider text-center">On Bench</div>
                                                )}
                                            </div>
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
