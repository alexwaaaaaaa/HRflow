"use client";

import Page from "@/components/ui/Page";
import React from 'react';
import { AlertOctagon, TrendingDown, EyeOff, Search, FileText } from 'lucide-react';

export default function KeyPersonRiskScreen() {
    return (
        <Page
            title="Key Person Risk Assessment"
            subtitle="Identify individuals whose departure would pose severe operational, financial, or strategic risk to the business."
            breadcrumbs={[{ label: "Succession", href: "/succession" }, { label: "Key Person Risk" }]}
            maxWidth="1400px"
        >

        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><AlertOctagon size={24} className="text-rose-500" /> Key Person Risk Assessment</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Identify individuals whose departure would pose severe operational, financial, or strategic risk to the business.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-[#0A1420] border border-rose-500/40 shadow-[0_0_20px_rgba(244,63,94,0.1)] rounded-2xl p-6 relative overflow-hidden flex flex-col justify-center">
                    <div className="text-rose-400 text-xs font-bold uppercase tracking-wider mb-2">Severe Risk Instances</div>
                    <div className="text-4xl font-black text-white mb-2">3</div>
                    <div className="text-[#8899AA] text-xs">Single-point-of-failure identified</div>
                </div>
                <div className="md:col-span-3 bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="text-white font-bold text-sm mb-4">Risk Categorization (Top 50 Critical Roles)</h3>
                    <div className="flex gap-1 h-8 rounded-full overflow-hidden w-full bg-[#131B2B]" title="Risk Distribution">
                        <div className="bg-emerald-500 h-full flex items-center justify-center text-[10px] font-bold text-[#0A1420]" style={{ width: '60%' }}>30 Low</div>
                        <div className="bg-amber-500 h-full flex items-center justify-center text-[10px] font-bold text-[#0A1420]" style={{ width: '34%' }}>17 Moderate</div>
                        <div className="bg-rose-500 h-full flex items-center justify-center text-[10px] font-bold text-white shadow-inner" style={{ width: '6%' }}>3 Sev.</div>
                    </div>
                </div>
            </div>

            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl overflow-hidden flex flex-col">
                <div className="p-4 border-b border-[#1A2A3A] flex flex-wrap gap-4 items-center justify-between bg-[#060D1A]">
                    <h3 className="text-white font-bold px-2">High Risk Individuals List</h3>
                    <div className="relative w-full md:w-64">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]" />
                        <input type="text" placeholder="Search Risk Database..."
                            className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-lg pl-9 pr-3 py-2 text-white text-sm focus:border-rose-500 outline-none" />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-[#131B2B] text-[#8899AA] text-xs uppercase tracking-wider font-bold border-b border-[#2A3A4A]">
                                <th className="p-4 py-3">Key Individual / Role</th>
                                <th className="p-4 py-3">Primary Risk Factor</th>
                                <th className="p-4 py-3">Estimated Impact</th>
                                <th className="p-4 py-3">Succession Depth</th>
                                <th className="p-4 py-3 text-right">Mitigation</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm border-b border-[#1A2A3A]">
                            <tr className="hover:bg-rose-500/5 transition-colors group cursor-pointer border-b border-[#1A2A3A]">
                                <td className="p-4">
                                    <div className="font-bold text-white mb-0.5">Marcus Johnson</div>
                                    <div className="text-[#8899AA] text-xs">Principal Eng, Core Ledger</div>
                                </td>
                                <td className="p-4">
                                    <span className="flex items-center gap-1 text-xs text-rose-400 font-bold bg-rose-500/10 px-2 py-1 rounded w-fit border border-rose-500/20">
                                        <EyeOff size={12} /> Undocumented Knowledge
                                    </span>
                                </td>
                                <td className="p-4 text-xs text-[#AABBCC] max-w-xs leading-relaxed">
                                    Core architecture not fully documented. Departure could block primary transaction engine Q3 deliverables unconditionally.
                                </td>
                                <td className="p-4 text-rose-400 font-bold text-xs uppercase">
                                    0 Ready Successors
                                </td>
                                <td className="p-4 text-right">
                                    <button className="text-[#556677] hover:text-white transition-colors"><FileText size={18} /></button>
                                </td>
                            </tr>
                            <tr className="hover:bg-rose-500/5 transition-colors group cursor-pointer border-b border-[#1A2A3A]">
                                <td className="p-4">
                                    <div className="font-bold text-white mb-0.5">Sarah Jenkins</div>
                                    <div className="text-[#8899AA] text-xs">Chief Technology Officer</div>
                                </td>
                                <td className="p-4">
                                    <span className="flex items-center gap-1 text-xs text-amber-400 font-bold bg-amber-500/10 px-2 py-1 rounded w-fit border border-amber-500/20">
                                        <TrendingDown size={12} /> High Flight Risk (Burnout)
                                    </span>
                                </td>
                                <td className="p-4 text-xs text-[#AABBCC] max-w-xs leading-relaxed">
                                    Critical client relationships tied directly to incumbent. Major IPO roadmap disruption if exited.
                                </td>
                                <td className="p-4 text-amber-400 font-bold text-xs uppercase">
                                    1 ready (2-3 Yrs)
                                </td>
                                <td className="p-4 text-right">
                                    <button className="text-[#556677] hover:text-white transition-colors"><FileText size={18} /></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    
        </Page>
    );
}
