"use client";
import React, { useState } from 'react';
import { IndianRupee, Download, TrendingUp, AlertCircle, PieChart } from 'lucide-react';

export default function CostForecastScreen() {
    const [view, setView] = useState('quarterly');

    return (
        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><IndianRupee size={24} className="text-amber-400" /> Payroll & Benefits Cost Forecast</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Projected compensation expenses based on current headcount, planned hires, and anticipated increments.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-colors flex items-center gap-2">
                        <Download size={16} /> Export Financial Submissions
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden">
                    <div className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-2">FY26 Projected Total</div>
                    <div className="text-3xl font-black text-white mb-2">₹42.8 Cr</div>
                    <div className="text-emerald-400 text-xs font-bold">Within ±2% of Approved Budget</div>
                </div>

                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden">
                    <div className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-2">Run Rate (Current Month)</div>
                    <div className="text-3xl font-black text-white mb-2">₹3.4 Cr</div>
                </div>

                <div className="bg-[#0A1420] border border-amber-500/20 rounded-2xl p-6 relative overflow-hidden">
                    <div className="text-amber-200 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2"><AlertCircle size={14} /> Projected Deficit (Q4)</div>
                    <div className="text-3xl font-black text-amber-400 mb-2">₹1.2 Cr</div>
                    <div className="text-[#8899AA] text-xs font-bold">Driven by unplanned Sales hires</div>
                </div>

                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden">
                    <div className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-2">Avg Cost per Employee</div>
                    <div className="text-3xl font-black text-white mb-2">₹8.5 L</div>
                    <div className="text-rose-400 text-xs font-bold flex items-center gap-1"><TrendingUp size={14} /> +4.2% YoY (Inflation context)</div>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6">
                        <div className="flex items-center justify-between border-b border-[#1A2A3A] pb-4 mb-6">
                            <h3 className="text-white font-bold">Cost Trajectory vs Budget Limit</h3>
                            <div className="flex bg-[#131B2B] border border-[#2A3A4A] rounded-lg p-1">
                                <button onClick={() => setView('monthly')} className={`px-3 py-1 text-xs font-bold rounded ${view === 'monthly' ? 'bg-[#2A3A4A] text-white' : 'text-[#8899AA] hover:text-white'}`}>Monthly</button>
                                <button onClick={() => setView('quarterly')} className={`px-3 py-1 text-xs font-bold rounded ${view === 'quarterly' ? 'bg-[#2A3A4A] text-white' : 'text-[#8899AA] hover:text-white'}`}>Quarterly</button>
                            </div>
                        </div>

                        <div className="h-64 flex items-end gap-4 pt-10 relative">
                            {/* Budget line (mocked as absolute overlay) */}
                            <div className="absolute left-0 right-0 border-b-2 border-dashed border-emerald-500/50 z-20 flex justify-end" style={{ bottom: '75%' }}>
                                <span className="text-emerald-400 text-[10px] font-bold -mt-4 bg-[#0A1420] px-1">Budget Topline</span>
                            </div>

                            {view === 'quarterly' ? [
                                { q: 'Q1', act: 60, proj: 0, val: '₹9.4 Cr' },
                                { q: 'Q2', act: 65, proj: 0, val: '₹10.1 Cr' },
                                { q: 'Q3', act: 0, proj: 72, val: '₹11.2 Cr', active: true },
                                { q: 'Q4', act: 0, proj: 82, val: '₹12.1 Cr' },
                            ].map((d, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center group relative z-10">
                                    <div className="absolute -top-8 bg-[#1A2A3A] border border-[#2A3A4A] text-white text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-20">
                                        {d.val}
                                    </div>
                                    <div className={`w-full max-w-24 rounded-t-lg transition-all ${d.act > 0 ? 'bg-indigo-600' : 'bg-ambient-500 bg-[repeating-linear-gradient(45deg,theme(colors.amber.500/30),theme(colors.amber.500/30)_5px,theme(colors.amber.600/30)_5px,theme(colors.amber.600/30)_10px)] border-t border-r border-amber-500/50'}`} style={{ height: `${d.act || d.proj}%` }}></div>
                                    <div className={`text-xs mt-2 font-bold ${d.active ? 'text-amber-400' : 'text-[#8899AA]'}`}>{d.q} {d.act > 0 ? '(Actual)' : '(Proj)'}</div>
                                </div>
                            )) : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((m, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center">
                                    <div className={`w-full max-w-10 rounded-t border-t border-r border-amber-500/50 ${i < 4 ? 'bg-indigo-600 border-none' : 'bg-[repeating-linear-gradient(45deg,theme(colors.amber.500/30),theme(colors.amber.500/30)_5px,theme(colors.amber.600/30)_5px,theme(colors.amber.600/30)_10px)]'}`} style={{ height: `${40 + (i * 3)}%` }}></div>
                                    <div className="text-[10px] uppercase mt-2 text-[#556677]">M{m}</div>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-center gap-6 mt-6 pt-4 border-t border-[#1A2A3A]">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded bg-indigo-600"></div> <span className="text-xs text-[#8899AA]">Realized Cost</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded bg-[repeating-linear-gradient(45deg,theme(colors.amber.500/30),theme(colors.amber.500/30)_3px,theme(colors.amber.600/30)_3px,theme(colors.amber.600/30)_6px)] border border-amber-500/50"></div> <span className="text-xs text-[#8899AA]">Forecasted Cost (Headcount model)</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6">
                        <h3 className="text-white font-bold border-b border-[#1A2A3A] pb-3 mb-4 flex items-center gap-2">
                            <PieChart size={18} className="text-amber-400" /> Cost Drivers (FY26)
                        </h3>

                        <div className="space-y-4">
                            {[
                                { label: 'Base Salaries', pct: 72, val: '₹30.8 Cr', color: 'bg-indigo-500' },
                                { label: 'Employer Taxes & PF', pct: 12, val: '₹5.1 Cr', color: 'bg-blue-500' },
                                { label: 'Variable Pay & Bonuses', pct: 8, val: '₹3.4 Cr', color: 'bg-emerald-500' },
                                { label: 'Benefits & Insurance', pct: 6, val: '₹2.5 Cr', color: 'bg-purple-500' },
                                { label: 'Planned Merit Increments', pct: 2, val: '₹1.0 Cr', color: 'bg-amber-500' },
                            ].map((d, i) => (
                                <div key={i}>
                                    <div className="flex justify-between text-xs mb-1.5 font-bold">
                                        <span className="text-[#AABBCC] flex items-center gap-2"><div className={`w-2 h-2 rounded-full ${d.color}`}></div> {d.label}</span>
                                        <span className="text-white">{d.val}</span>
                                    </div>
                                    <div className="w-full h-1 bg-[#131B2B] rounded-full overflow-hidden">
                                        <div className={`h-full ${d.color}`} style={{ width: `${d.pct}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
