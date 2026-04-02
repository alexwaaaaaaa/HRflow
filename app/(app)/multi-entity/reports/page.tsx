"use client";
import React, { useState } from 'react';
import { BarChart, Search, Filter, Download, Briefcase, IndianRupee, PieChart, Layers } from 'lucide-react';

export default function ConsolidatedReportsScreen() {
    const [reportType, setReportType] = useState('headcount');

    return (
        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><BarChart size={24} className="text-indigo-400" /> Group Consolidated Reports</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Generate multi-entity analytics for Headcount, Payroll Cost, and Attrition.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-colors flex items-center gap-2">
                        <Filter size={16} /> Filters
                    </button>
                    <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors flex items-center gap-2">
                        <Download size={16} /> Export Excel
                    </button>
                </div>
            </div>

            <div className="flex gap-2 p-1 bg-[#0A1420] border border-[#1A2A3A] rounded-xl w-fit">
                {[
                    { id: 'headcount', label: 'Headcount Distribution', icon: Briefcase },
                    { id: 'cost', label: 'Payroll Cost', icon: IndianRupee },
                    { id: 'attrition', label: 'Attrition Rate', icon: PieChart },
                ].map(t => {
                    const Icon = t.icon;
                    return (
                        <button key={t.id} onClick={() => setReportType(t.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-colors ${reportType === t.id ? 'bg-[#131B2B] text-white border border-[#2A3A4A] shadow-sm' : 'text-[#8899AA] hover:text-white'}`}>
                            <Icon size={16} className={reportType === t.id ? 'text-indigo-400' : ''} /> {t.label}
                        </button>
                    )
                })}
            </div>

            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-[#1A2A3A] flex items-center justify-between bg-[#060D1A]">
                    <div className="flex items-center gap-4">
                        <span className="text-white font-bold flex items-center gap-2"><Layers size={18} className="text-indigo-400" /> By Entity Breakdown</span>
                        <span className="text-[#556677] text-xs">As of Oct 2025</span>
                    </div>
                    <div className="relative w-64">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]" />
                        <input type="text" placeholder="Search entity..."
                            className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-lg pl-9 pr-3 py-1.5 text-white text-xs focus:border-indigo-500 outline-none" />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#131B2B] text-[#8899AA] text-xs uppercase tracking-wider font-bold border-b border-[#2A3A4A]">
                                <th className="p-4 py-3">Entity Name</th>
                                <th className="p-4 py-3 text-right">Active HC</th>
                                <th className="p-4 py-3 text-right">M-o-M Change</th>
                                <th className="p-4 py-3 text-right">% of Group</th>
                                <th className="p-4 py-3">Top Department</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {[
                                { entity: 'Acme Technologies (Parent)', hc: 342, mom: '+12', pct: '60.3%', dept: 'Engineering' },
                                { entity: 'Acme Retail Solutions', hc: 128, mom: '-2', pct: '22.6%', dept: 'Sales' },
                                { entity: 'Acme Logistics India', hc: 85, mom: '+5', pct: '15.0%', dept: 'Operations' },
                                { entity: 'Acme Global Ventures', hc: 12, mom: '0', pct: '2.1%', dept: 'Leadership' },
                            ].map((row, i) => (
                                <tr key={i} className={`border-b border-[#1A2A3A] hover:bg-[#131B2B]/50 transition-colors ${i === 3 ? 'border-b-0' : ''}`}>
                                    <td className="p-4 font-bold text-white">{row.entity}</td>
                                    <td className="p-4 text-right font-medium text-white">{row.hc}</td>
                                    <td className={`p-4 text-right font-bold ${row.mom.startsWith('+') ? 'text-emerald-400' : row.mom.startsWith('-') ? 'text-rose-400' : 'text-[#8899AA]'}`}>{row.mom}</td>
                                    <td className="p-4 text-right text-[#AABBCC]">
                                        <div className="flex items-center justify-end gap-2">
                                            {row.pct}
                                            <div className="w-16 h-1.5 bg-[#1A2A3A] rounded-full overflow-hidden">
                                                <div className="h-full bg-indigo-500" style={{ width: row.pct }}></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 text-[#8899AA]">{row.dept}</td>
                                </tr>
                            ))}
                            <tr className="bg-[#1A2A3A] text-white font-bold border-t-2 border-[#2A3A4A]">
                                <td className="p-4">Group Total</td>
                                <td className="p-4 text-right">567</td>
                                <td className="p-4 text-right text-emerald-400">+15</td>
                                <td className="p-4 text-right">100%</td>
                                <td className="p-4 text-[#8899AA]">-</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
