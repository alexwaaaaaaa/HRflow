"use client";

import Page from "@/components/ui/Page";
import React, { useState } from 'react';
import { GitBranch, Save, Plus, BarChart2, Zap } from 'lucide-react';

export default function ScenarioPlanningScreen() {
    const [scenario, setScenario] = useState('base');

    return (
        <Page
            title="Scenario Modeling"
            subtitle="Simulate what-if situations to see impacts on headcount, budget, and capacity."
            breadcrumbs={[{ label: "Workforce Analytics", href: "/workforce-analytics" }, { label: "Scenarios" }]}
            maxWidth="1400px"
        >

        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><GitBranch size={24} className="text-purple-400" /> Scenario Modeling</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Simulate "what-if" situations to see impacts on headcount, budget, and capacity.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors flex items-center gap-2">
                        <Save size={16} /> Save Simulation as Plan
                    </button>
                </div>
            </div>

            <div className="flex gap-2 p-1 bg-[#060D1A] border border-[#1A2A3A] rounded-xl w-fit">
                {[
                    { id: 'base', label: 'Base Case (Active Plan)' },
                    { id: 'aggressive', label: 'Scenario A: Aggressive Growth' },
                    { id: 'conservative', label: 'Scenario B: 10% Budget Cut' },
                ].map(s => (
                    <button key={s.id} onClick={() => setScenario(s.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-colors ${scenario === s.id ? 'bg-[#131B2B] text-white border border-[#2A3A4A] shadow-sm' : 'text-[#8899AA] hover:text-white'}`}>
                        {s.label}
                    </button>
                ))}
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold text-purple-400 hover:bg-purple-500/10 transition-colors">
                    <Plus size={16} /> New Scenario
                </button>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Input Parameters */}
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 h-fit">
                    <div className="flex items-center justify-between border-b border-[#1A2A3A] pb-3 mb-6">
                        <h3 className="text-white font-bold">Simulation Parameters</h3>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between items-end mb-2">
                                <label className="text-sm font-bold text-[#8899AA]">Annual Merit Increment %</label>
                                <span className="text-white font-mono bg-[#1A2A3A] px-2 py-0.5 rounded text-xs">8.5%</span>
                            </div>
                            <input type="range" min="0" max="20" step="0.5" defaultValue="8.5" className="w-full h-2 bg-[#1A2A3A] rounded-lg appearance-none cursor-pointer accent-purple-500" />
                        </div>

                        <div>
                            <div className="flex justify-between items-end mb-2">
                                <label className="text-sm font-bold text-[#8899AA]">Net New Hires (FY26)</label>
                                <span className="text-white font-mono bg-[#1A2A3A] px-2 py-0.5 rounded text-xs">120 roles</span>
                            </div>
                            <input type="range" min="0" max="300" step="5" defaultValue="120" className="w-full h-2 bg-[#1A2A3A] rounded-lg appearance-none cursor-pointer accent-purple-500" />
                        </div>

                        <div>
                            <div className="flex justify-between items-end mb-2">
                                <label className="text-sm font-bold text-[#8899AA]">Projected Attrition Rate</label>
                                <span className="text-white font-mono bg-[#1A2A3A] px-2 py-0.5 rounded text-xs">14.0%</span>
                            </div>
                            <input type="range" min="5" max="30" step="0.5" defaultValue="14" className="w-full h-2 bg-[#1A2A3A] rounded-lg appearance-none cursor-pointer accent-purple-500" />
                        </div>

                        <div className="pt-4 border-t border-[#1A2A3A]">
                            <button className="w-full bg-[#131B2B] border border-[#2A3A4A] hover:border-purple-500/50 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
                                <Zap size={16} className="text-purple-400" /> Run Simulation
                            </button>
                        </div>
                    </div>
                </div>

                {/* Outputs view */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className={`p-5 rounded-2xl border ${scenario === 'aggressive' ? 'bg-rose-500/10 border-rose-500/30' : scenario === 'conservative' ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-[#131B2B] border-[#2A3A4A]'}`}>
                            <div className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-2">Simulated Year-End Cost</div>
                            <div className={`text-3xl font-black mb-1 ${scenario === 'aggressive' ? 'text-rose-400' : scenario === 'conservative' ? 'text-emerald-400' : 'text-white'}`}>
                                {scenario === 'aggressive' ? '₹48.2 Cr' : scenario === 'conservative' ? '₹38.5 Cr' : '₹42.8 Cr'}
                            </div>
                            <div className="text-[#556677] text-xs">
                                {scenario === 'aggressive' ? '+5.4 Cr vs Base' : scenario === 'conservative' ? '-4.3 Cr vs Base' : 'Current Baseline'}
                            </div>
                        </div>
                        <div className={`p-5 rounded-2xl border ${scenario === 'aggressive' ? 'bg-emerald-500/10 border-emerald-500/30' : scenario === 'conservative' ? 'bg-rose-500/10 border-rose-500/30' : 'bg-[#131B2B] border-[#2A3A4A]'}`}>
                            <div className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-2">Simulated Year-End Headcount</div>
                            <div className={`text-3xl font-black mb-1 ${scenario === 'aggressive' ? 'text-emerald-400' : scenario === 'conservative' ? 'text-rose-400' : 'text-white'}`}>
                                {scenario === 'aggressive' ? '650' : scenario === 'conservative' ? '490' : '550'}
                            </div>
                            <div className="text-[#556677] text-xs">
                                {scenario === 'aggressive' ? '+100 additions vs Base' : scenario === 'conservative' ? '-60 additions vs Base' : 'Current Baseline'}
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6">
                        <div className="flex items-center justify-between border-b border-[#1A2A3A] pb-4 mb-6">
                            <h3 className="text-white font-bold flex items-center gap-2"><BarChart2 size={18} className="text-purple-400" /> Compare "Base" vs Selected Scenario</h3>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="text-[#8899AA] text-xs uppercase tracking-wider font-bold border-b border-[#2A3A4A]">
                                        <th className="pb-3 pr-4">Metric</th>
                                        <th className="pb-3 px-4">Base Case</th>
                                        <th className="pb-3 px-4">Simulated</th>
                                        <th className="pb-3 pl-4 text-right">Delta (%)</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {[
                                        { m: 'Ending Headcount', base: '550', sim: scenario === 'aggressive' ? '650' : scenario === 'conservative' ? '490' : '550', diff: scenario === 'aggressive' ? '+18.1%' : scenario === 'conservative' ? '-10.9%' : '0%', good: scenario !== 'conservative' },
                                        { m: 'Gross Cost Matrix', base: '₹42.8 Cr', sim: scenario === 'aggressive' ? '₹48.2 Cr' : scenario === 'conservative' ? '₹38.5 Cr' : '₹42.8 Cr', diff: scenario === 'aggressive' ? '+12.6%' : scenario === 'conservative' ? '-10.0%' : '0%', good: scenario !== 'aggressive' },
                                        { m: 'C-Level Approvals Req', base: '12', sim: scenario === 'aggressive' ? '28' : scenario === 'conservative' ? '5' : '12', diff: scenario === 'aggressive' ? '+133%' : scenario === 'conservative' ? '-58%' : '0%', good: scenario !== 'aggressive' },
                                    ].map((row, i) => (
                                        <tr key={i} className="border-b border-[#1A2A3A] hover:bg-[#131B2B]/50">
                                            <td className="py-4 pr-4 font-bold text-[#AABBCC]">{row.m}</td>
                                            <td className="py-4 px-4 text-white font-mono">{row.base}</td>
                                            <td className="py-4 px-4 font-mono text-purple-300 bg-purple-500/5">{row.sim}</td>
                                            <td className={`py-4 pl-4 text-right font-bold ${row.diff === '0%' ? 'text-[#556677]' : row.good ? 'text-emerald-400' : 'text-rose-400'}`}>{row.diff}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
        </Page>
    );
}
