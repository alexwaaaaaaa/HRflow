"use client";

import Page from "@/components/ui/Page";
import React, { useState } from 'react';
import { Briefcase, Search, Plus, Users, Clock, DollarSign } from 'lucide-react';

export default function ProjectListScreen() {
    const [filter, setFilter] = useState('active');

    return (
        <Page
            title="Client Projects"
            subtitle="Manage billable projects, track aggregate hours, and monitor resource utilization."
            breadcrumbs={[{ label: "Projects" }]}
            maxWidth="1400px"
        >

        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">Portfolio Management</div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><Briefcase size={24} className="text-indigo-400" /> Client Projects</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Manage billable projects, track aggregate hours, and monitor resource utilization.</p>
                </div>
                <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors shadow-[0_0_15px_rgba(99,102,241,0.3)] flex items-center gap-2">
                    <Plus size={16} /> New Project
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden flex flex-col justify-center">
                    <div className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2"><Briefcase size={14} /> Active Projects</div>
                    <div className="text-3xl font-black text-white mb-2">42</div>
                    <div className="text-indigo-400 text-xs font-bold flex items-center gap-1">+3 this month</div>
                </div>

                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden flex flex-col justify-center">
                    <div className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2"><Clock size={14} /> Total Logged Hours</div>
                    <div className="text-3xl font-black text-white mb-2">8,450</div>
                    <div className="text-[#556677] text-xs font-bold">MTD across all projects</div>
                </div>

                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden flex flex-col justify-center">
                    <div className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2"><DollarSign size={14} /> Billable Ratio</div>
                    <div className="text-3xl font-black text-emerald-400 mb-2">76%</div>
                    <div className="text-[#556677] text-xs font-bold">Target: 80%</div>
                </div>

                <div className="bg-gradient-to-br from-indigo-500/10 to-[#0A1420] border border-indigo-500/30 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-center group cursor-pointer hover:border-indigo-500/50 transition-colors">
                    <h3 className="text-indigo-400 text-sm font-bold mb-1">Utilization Report</h3>
                    <p className="text-indigo-200/70 text-xs mb-3">12 resources are severely under-utilized this week.</p>
                    <div className="text-white text-xs font-bold flex items-center gap-1 group-hover:gap-2 transition-all">View Analytics &rarr;</div>
                </div>
            </div>

            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl overflow-hidden shadow-lg mt-6">
                <div className="p-4 border-b border-[#1A2A3A] bg-[#060D1A] flex flex-wrap gap-4 items-center justify-between">
                    <div className="flex gap-2 p-1 bg-[#131B2B] border border-[#2A3A4A] rounded-xl">
                        {['active', 'completed', 'internal'].map(f => (
                            <button key={f} onClick={() => setFilter(f)} className={`px-4 py-1.5 rounded-lg text-sm font-bold uppercase tracking-wider transition-colors ${filter === f ? 'bg-[#2A3A4A] text-white shadow-sm' : 'text-[#556677] hover:text-[#8899AA]'}`}>
                                {f}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full md:w-64">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]" />
                        <input type="text" placeholder="Search project or client..." className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-lg pl-9 pr-3 py-2 text-white text-sm focus:border-indigo-500 outline-none" />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-[#131B2B] text-[#8899AA] text-xs uppercase tracking-wider font-bold border-b border-[#2A3A4A]">
                                <th className="p-4 py-3">Project & Client</th>
                                <th className="p-4 py-3">Team Size</th>
                                <th className="p-4 py-3">Timeline</th>
                                <th className="p-4 py-3">Budget Burn</th>
                                <th className="p-4 py-3 text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {[
                                { code: 'PRJ-809', name: 'Cloud Migration (Phase 2)', client: 'Acme Corp', team: 6, end: 'Dec 15, 2025', burn: 45, status: 'On Track', color: 'bg-emerald-500' },
                                { code: 'PRJ-812', name: 'Mobile App Redesign', client: 'Fintech Solutions', team: 4, end: 'Nov 30, 2025', burn: 88, status: 'At Risk', color: 'bg-rose-500' },
                                { code: 'PRJ-815', name: 'AI chatbot Integration', client: 'Retail Plus', team: 3, end: 'Jan 20, 2026', burn: 20, status: 'On Track', color: 'bg-emerald-500' },
                                { code: 'PRJ-820', name: 'Data Pipeline Overhaul', client: 'HealthTech Inc', team: 8, end: 'Oct 31, 2025', burn: 95, status: 'Warning', color: 'bg-amber-500' },
                            ].map((row, i) => (
                                <tr key={i} className="border-b border-[#1A2A3A] hover:bg-[#131B2B]/50 transition-colors cursor-pointer group">
                                    <td className="p-4">
                                        <div className="font-bold text-white mb-0.5 group-hover:text-indigo-400 transition-colors flex items-center gap-2">
                                            <span className="text-[10px] uppercase font-mono bg-[#1A2A3A] px-1.5 py-0.5 rounded text-[#8899AA]">{row.code}</span>
                                            {row.name}
                                        </div>
                                        <div className="text-[#8899AA] text-xs">{row.client}</div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-1 text-[#AABBCC]">
                                            <Users size={14} className="text-[#556677]" /> {row.team} Members
                                        </div>
                                    </td>
                                    <td className="p-4 text-[#AABBCC] text-xs font-mono">
                                        Due: {row.end}
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 h-1.5 bg-[#131B2B] rounded-full overflow-hidden w-24">
                                                <div className={`${row.color} h-full`} style={{ width: `${row.burn}%` }}></div>
                                            </div>
                                            <span className="text-xs font-bold font-mono text-white">{row.burn}%</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-right">
                                        <span className={`inline-flex items-center gap-1 text-[10px] uppercase font-bold px-2 py-0.5 rounded border 
                           ${row.status === 'On Track' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' :
                                                row.status === 'At Risk' ? 'text-rose-400 bg-rose-500/10 border-rose-500/20' :
                                                    'text-amber-400 bg-amber-500/10 border-amber-500/20'}`}>
                                            {row.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    
        </Page>
    );
}
