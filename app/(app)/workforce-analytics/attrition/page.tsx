"use client";
import React from 'react';
import { UserMinus, AlertTriangle, TrendingDown, Eye, Download } from 'lucide-react';
import Link from 'next/link';

export default function AttritionForecastScreen() {
    return (
        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><UserMinus size={24} className="text-rose-400" /> Attrition Risk Forecast</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Machine Learning model predicting flight risk based on compensation, tenure, and engagement signals.</p>
                </div>
                <button className="bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-colors flex items-center gap-2">
                    <Download size={16} /> Export Risk Report
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#0A1420] border border-rose-500/20 rounded-2xl p-6 relative overflow-hidden">
                    <div className="text-rose-200 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2"><AlertTriangle size={14} /> High Risk Employees</div>
                    <div className="text-3xl font-black text-rose-400 mb-2">24</div>
                    <div className="text-[#8899AA] text-xs font-bold">~5% of total headcount</div>
                </div>

                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden">
                    <div className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-2">Predicted Annual Attrition</div>
                    <div className="text-3xl font-black text-white mb-2">14.2%</div>
                    <div className="text-rose-400 text-xs font-bold flex items-center gap-1"><TrendingDown size={14} /> +1.5% vs Industry Avg</div>
                </div>

                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden">
                    <div className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-2">Top Drivers for Risk</div>
                    <div className="space-y-1.5 mt-3">
                        <div className="flex justify-between text-xs text-white"><span className="text-[#AABBCC]">Compa-ratio &lt; 0.85</span> <span>42%</span></div>
                        <div className="flex justify-between text-xs text-white"><span className="text-[#AABBCC]">Tenure &gt; 3 yrs, 0 promos</span> <span>35%</span></div>
                        <div className="flex justify-between text-xs text-white"><span className="text-[#AABBCC]">Manager Change</span> <span>23%</span></div>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl overflow-hidden flex flex-col h-full">
                        <div className="p-4 border-b border-[#1A2A3A] bg-[#060D1A] flex items-center justify-between">
                            <h3 className="text-white font-bold">Individuals at Risk (AI Identified)</h3>
                            <div className="text-xs text-[#556677]">Sorted by Risk Score (Desc)</div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-[#131B2B] text-[#8899AA] text-xs uppercase tracking-wider font-bold border-b border-[#2A3A4A]">
                                        <th className="p-4 py-3">Employee</th>
                                        <th className="p-4 py-3">Department</th>
                                        <th className="p-4 py-3">Risk Score</th>
                                        <th className="p-4 py-3">Key Drivers</th>
                                        <th className="p-4 py-3 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {[
                                        { name: 'Sarah Jenkins', role: 'Senior Product Designer', dept: 'Design', score: 92, drivers: 'Low Compa-ratio (0.81)', color: 'rose' },
                                        { name: 'Marcus Cole', role: 'Engineering Manager', dept: 'Engineering', score: 88, drivers: 'Stagnant (4yrs in role)', color: 'rose' },
                                        { name: 'Priya Patel', role: 'Content Writer', dept: 'Marketing', score: 75, drivers: 'Commute distance', color: 'amber' },
                                        { name: 'David Kim', role: 'DevOps Engineer', dept: 'Engineering', score: 72, drivers: 'High PTO balance (Burnout)', color: 'amber' },
                                    ].map((row, i) => (
                                        <tr key={i} className="border-b border-[#1A2A3A] hover:bg-[#131B2B]/50 transition-colors group">
                                            <td className="p-4">
                                                <div className="font-bold text-white">{row.name}</div>
                                                <div className="text-[#556677] text-xs">{row.role}</div>
                                            </td>
                                            <td className="p-4 text-[#AABBCC]">{row.dept}</td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2">
                                                    <div className={`text-${row.color}-400 font-bold font-mono`}>{row.score}/100</div>
                                                    <div className="w-16 h-1 bg-[#1A2A3A] rounded-full overflow-hidden">
                                                        <div className={`h-full bg-${row.color}-500`} style={{ width: `${row.score}%` }}></div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4 text-[#8899AA] text-xs">{row.drivers}</td>
                                            <td className="p-4 text-right">
                                                <button className="p-2 hover:bg-[#1A2A3A] rounded-lg text-[#8899AA] hover:text-white transition-colors" title="View Profile">
                                                    <Eye size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6">
                        <h3 className="text-white font-bold border-b border-[#1A2A3A] pb-3 mb-4">Risk by Department</h3>

                        <div className="space-y-5 pt-2">
                            {[
                                { d: 'Engineering', active: 180, risk: 14, pct: 7.8, color: 'rose' },
                                { d: 'Design', active: 25, risk: 4, pct: 16.0, color: 'rose' },
                                { d: 'Sales', active: 85, risk: 4, pct: 4.7, color: 'amber' },
                                { d: 'G&A', active: 30, risk: 2, pct: 6.6, color: 'amber' },
                            ].map((dept, i) => (
                                <div key={i}>
                                    <div className="flex justify-between text-sm mb-1.5 font-bold">
                                        <span className="text-white">{dept.d}</span>
                                        <span className={`text-${dept.color}-400`}>{dept.risk} at risk ({dept.pct}%)</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-[#131B2B] rounded-full overflow-hidden relative">
                                        <div className={`absolute left-0 top-0 bottom-0 bg-${dept.color}-500`} style={{ width: `${(dept.risk / dept.active) * 100}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6">
                        <h3 className="text-white font-bold border-b border-[#1A2A3A] pb-3 mb-4">Recommended Interventions</h3>
                        <div className="space-y-3">
                            <div className="p-3 bg-[#131B2B] border border-[#2A3A4A] rounded-xl hover:border-indigo-500/50 transition-colors cursor-pointer">
                                <h4 className="text-indigo-400 font-bold text-sm mb-1">Market Salary Review</h4>
                                <p className="text-[#8899AA] text-xs">Run a compa-ratio analysis for Engineering. 60% of their risk is compensation-driven.</p>
                            </div>
                            <div className="p-3 bg-[#131B2B] border border-[#2A3A4A] rounded-xl hover:border-indigo-500/50 transition-colors cursor-pointer">
                                <h4 className="text-indigo-400 font-bold text-sm mb-1">Manager Training</h4>
                                <p className="text-[#8899AA] text-xs">Design department has 2 managers with unusually high team flight risk scores.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
