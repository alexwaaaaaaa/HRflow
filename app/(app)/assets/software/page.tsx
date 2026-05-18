"use client";

import Page from "@/components/ui/Page";
import React, { useState } from 'react';
import { KeySquare, Download, Filter, Search, AlertCircle, ArrowUpRight } from 'lucide-react';

const SOFTWARE = [
    { id: 'SW-001', name: 'Google Workspace Enterprise', total: 500, used: 450, cost: '₹2,50,000', renew: 'Mar 31, 2026', owner: 'IT Dept', status: 'Healthy' },
    { id: 'SW-002', name: 'Slack Enterprise Grid', total: 500, used: 420, cost: '₹1,80,000', renew: 'Jun 15, 2026', owner: 'IT Dept', status: 'Healthy' },
    { id: 'SW-003', name: 'GitHub Copilot Business', total: 120, used: 120, cost: '₹95,000', renew: 'Nov 30, 2025', owner: 'Engineering', status: 'Maxed Out' },
    { id: 'SW-004', name: 'Adobe Creative Cloud', total: 15, used: 12, cost: '₹45,000', renew: 'Oct 15, 2025', owner: 'Design', status: 'Warning' },
    { id: 'SW-005', name: 'Figma Organization', total: 20, used: 18, cost: '₹35,000', renew: 'Jan 10, 2026', owner: 'Design', status: 'Healthy' },
];

export default function SoftwareLicensesScreen() {
    const [search, setSearch] = useState('');

    return (
        <Page
            title="Software & SaaS Licenses"
            subtitle="Manage vendor contracts, seat utilization, and upcoming renewals."
            breadcrumbs={[{ label: "Assets", href: "/assets" }, { label: "Software" }]}
            maxWidth="1400px"
        >

        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><KeySquare size={24} className="text-pink-400" /> Software & SaaS Licenses</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Manage vendor contracts, seat utilization, and upcoming renewals.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-colors flex items-center gap-2">
                        <Download size={16} /> Export Cost Report
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden">
                    <div className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-2">Total Monthly Spend</div>
                    <div className="text-3xl font-black text-white mb-2">₹8.45 L</div>
                    <div className="text-emerald-400 text-xs font-bold flex items-center gap-1"><ArrowUpRight size={14} /> 4.2% Optimization Achieved</div>
                </div>

                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden">
                    <div className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-2">Active SaaS Apps</div>
                    <div className="text-3xl font-black text-white mb-2">42</div>
                    <div className="text-[#556677] text-xs font-bold">Across 8 departments</div>
                </div>

                <div className="bg-gradient-to-r from-pink-900/40 to-rose-900/30 border border-pink-500/30 rounded-2xl p-6 relative overflow-hidden">
                    <div className="text-pink-200 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2"><AlertCircle size={14} /> Upcoming Renewals (30d)</div>
                    <div className="text-3xl font-black text-white mb-2">2</div>
                    <div className="text-pink-300 text-xs font-bold">Adobe CC, Copilot</div>
                </div>
            </div>

            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl overflow-hidden flex flex-col">
                <div className="p-4 border-b border-[#1A2A3A] flex flex-wrap gap-4 items-center justify-between bg-[#060D1A]">
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <button className="text-[#8899AA] hover:text-white transition-colors bg-[#131B2B] border border-[#2A3A4A] p-2 rounded-lg"><Filter size={16} /></button>
                        <div className="relative flex-1 md:w-64">
                            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]" />
                            <input type="text" placeholder="Search Application..." value={search} onChange={e => setSearch(e.target.value)}
                                className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-lg pl-9 pr-3 py-2 text-white text-sm focus:border-pink-500 outline-none" />
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#131B2B] text-[#8899AA] text-xs uppercase tracking-wider font-bold border-b border-[#2A3A4A]">
                                <th className="p-4 py-3">Application / Provider</th>
                                <th className="p-4 py-3">Seats (Utilized / Total)</th>
                                <th className="p-4 py-3">Monthly Cost</th>
                                <th className="p-4 py-3">Renewal Date</th>
                                <th className="p-4 py-3">Business Owner</th>
                                <th className="p-4 py-3 text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {SOFTWARE.filter(f => !search || f.name.toLowerCase().includes(search.toLowerCase())).map((row, i) => {
                                const utilization = (row.used / row.total) * 100;
                                return (


                                    <tr key={i} className="border-b border-[#1A2A3A] hover:bg-[#131B2B]/50 transition-colors group">
                                        <td className="p-4">
                                            <div className="font-bold text-white group-hover:text-pink-400 transition-colors cursor-pointer">{row.name}</div>
                                            <div className="text-[#556677] text-[10px] font-mono mt-1">{row.id}</div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center justify-between text-xs mb-1">
                                                <span className="text-white font-mono">{row.used} / {row.total}</span>
                                                <span className={`${utilization >= 90 ? 'text-amber-400' : 'text-[#8899AA]'}`}>{utilization.toFixed(0)}%</span>
                                            </div>
                                            <div className="w-full h-1.5 bg-[#1A2A3A] rounded-full overflow-hidden">
                                                <div className={`h-full ${utilization >= 100 ? 'bg-rose-500' : utilization >= 90 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${utilization}%` }}></div>
                                            </div>
                                        </td>
                                        <td className="p-4 font-mono text-[#AABBCC]">{row.cost}</td>
                                        <td className="p-4 text-[#8899AA]">{row.renew}</td>
                                        <td className="p-4 text-[#8899AA]">{row.owner}</td>
                                        <td className="p-4 text-right">
                                            <span className={`px-2.5 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider 
                       ${row.status === 'Healthy' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                                    row.status === 'Maxed Out' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                                                        'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
                                                {row.status}
                                            </span>
                                        </td>
                                    </tr>
                                
        
)
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    
        </Page>
    );
}
