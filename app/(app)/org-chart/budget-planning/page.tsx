"use client";

import Page from "@/components/ui/Page";

import React from "react";
import Link from "next/link";
import {
    PiggyBank, ChevronRight, Save, Calculator
} from "lucide-react";

export default function BudgetPlanningScreen() {
    return (
        <Page
            title="Workforce Budget Builder"
            subtitle="Base Run Rate (Existing)"
            breadcrumbs={[{ label: "Org Chart", href: "/org-chart" }, { label: "Budget Planning" }]}
            maxWidth="1100px"
        >

        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-2">
                            <Link href="/dashboard" className="hover:text-white transition-colors">Org & Structure</Link>
                            <ChevronRight className="w-4 h-4" />
                            <span className="text-white">Budget Planning</span>
                        </div>
                        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                            <div className="p-2 bg-amber-500/10 rounded-xl border border-amber-500/20">
                                <PiggyBank className="w-6 h-6 text-amber-500" />
                            </div>
                            Workforce Budget Builder
                        </h1>
                    </div>

                    <div className="flex items-center gap-3">
                        <select className="bg-[#1A2A3A] border border-[#2A3A4A] text-white text-sm rounded-lg px-4 py-2 outline-none focus:border-amber-500">
                            <option>Planning Cycle: FY 2026-27</option>
                            <option>Mid-Year Review: FY 2025-26</option>
                        </select>
                        <button className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold rounded-lg transition-colors flex items-center gap-2 shadow-[0_4px_15px_rgba(245,158,11,0.3)]">
                            <Save className="w-4 h-4" /> Save Scenario
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-6 mb-6">
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5">
                        <p className="text-[#8899AA] text-xs font-medium mb-1">Base Run Rate (Existing)</p>
                        <h4 className="text-xl font-bold text-white">₹117.5 Cr</h4>
                    </div>
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5 border-l-4 border-l-indigo-500">
                        <p className="text-[#8899AA] text-xs font-medium mb-1">Proposed Merit Increases</p>
                        <h4 className="text-xl font-bold text-indigo-400">+ ₹10.2 Cr</h4>
                        <p className="text-[10px] text-[#8899AA] mt-1">~8.5% avg increment</p>
                    </div>
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5 border-l-4 border-l-pink-500">
                        <p className="text-[#8899AA] text-xs font-medium mb-1">New Headcount Ask</p>
                        <h4 className="text-xl font-bold text-pink-500">+ ₹14.8 Cr</h4>
                        <p className="text-[10px] text-[#8899AA] mt-1">45 new reqs planned</p>
                    </div>
                    <div className="bg-[#1A2A3A] border border-amber-500/50 rounded-2xl p-5 relative overflow-hidden ring-1 ring-amber-500/20 shadow-[0_0_20px_rgba(245,158,11,0.1)]">
                        <p className="text-amber-400/80 text-xs font-bold uppercase tracking-wider mb-1">Total Proposed Budget</p>
                        <h4 className="text-2xl font-bold text-white">₹142.5 Cr</h4>
                        <p className="text-[10px] text-amber-500 mt-1">+21.3% vs previous year</p>
                    </div>
                </div>

                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden shadow-lg mb-6">
                    <div className="p-5 border-b border-[#1A2A3A] flex justify-between items-center bg-[#1A2A3A]/20">
                        <h3 className="text-sm font-bold text-white flex items-center gap-2">
                            <Calculator className="w-4 h-4 text-emerald-400" /> Bottom-up Department Planning
                        </h3>
                        <div className="flex bg-[#0B1221] rounded-lg border border-[#2A3A4A] p-0.5">
                            <button className="px-3 py-1 text-xs font-medium bg-[#2A3A4A] text-white rounded">By Dept</button>
                            <button className="px-3 py-1 text-xs font-medium text-[#8899AA] hover:text-white rounded">By Cost Center</button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-[#1A2A3A]/40 text-[#8899AA] text-xs">
                                <tr>
                                    <th className="p-4 font-medium border-b border-[#2A3A4A] w-64">Department / Unit</th>
                                    <th className="p-4 font-medium border-b border-[#2A3A4A] text-right">Current Run Rate</th>
                                    <th className="p-4 font-medium border-b border-[#2A3A4A] text-right">Merit % Input</th>
                                    <th className="p-4 font-medium border-b border-[#2A3A4A] text-right">New Headcount Cost</th>
                                    <th className="p-4 font-medium border-b border-[#2A3A4A] text-right">Proposed Output</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#1A2A3A]">
                                {[
                                    { dept: "Engineering", current: 42.1, merit: 10, newHc: 8.5 },
                                    { dept: "Sales & Rev", current: 30.5, merit: 8, newHc: 4.2 },
                                    { dept: "Marketing", current: 17.5, merit: 7, newHc: 1.5 },
                                    { dept: "Ops & Admin", current: 11.2, merit: 6, newHc: 0.0 },
                                    { dept: "HR & Legal", current: 16.2, merit: 8, newHc: 0.6 },
                                ].map((row, idx) => {
                                    const meritVal = row.current * (row.merit / 100);
                                    const total = row.current + meritVal + row.newHc;
                                    return (


                                        <tr key={idx} className="hover:bg-[#1A2A3A]/20 transition-colors">
                                            <td className="p-4 text-sm font-bold text-white">{row.dept}</td>
                                            <td className="p-4 text-sm text-[#8899AA] text-right font-mono">₹{row.current.toFixed(1)} Cr</td>
                                            <td className="p-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <input
                                                        type="number"
                                                        defaultValue={row.merit}
                                                        className="w-16 bg-[#0B1221] border border-[#2A3A4A] text-white text-center rounded px-2 py-1 text-xs focus:border-amber-500 focus:outline-none"
                                                    /> <span className="text-[#8899AA] text-xs">%</span>
                                                </div>
                                            </td>
                                            <td className="p-4 text-right">
                                                <div className="flex items-center justify-end gap-2 text-pink-500 text-sm font-mono">
                                                    + ₹{row.newHc.toFixed(1)} Cr
                                                </div>
                                            </td>
                                            <td className="p-4 text-right">
                                                <div className="bg-[#1A2A3A] border border-[#2A3A4A] px-3 py-1.5 rounded inline-block text-emerald-400 font-bold font-mono text-sm">
                                                    ₹{total.toFixed(2)} Cr
                                                </div>
                                            </td>
                                        </tr>
                                    
        
);
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    
        </Page>
    );
}
