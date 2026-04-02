"use client";
import React from 'react';
import { Globe, MapPin, CheckCircle2, AlertTriangle, Info, TrendingUp } from 'lucide-react';

export default function LivingWageScreen() {
    return (
        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><Globe size={24} className="text-emerald-400" /> Global Living Wage Tracker</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Ensure compliance with global living wage standards and internal CSR commitments.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden flex flex-col justify-center text-center shadow-lg">
                    <div className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-2">Global Compliance Rate</div>
                    <div className="text-4xl font-black text-emerald-400 mb-2">99.2%</div>
                    <div className="text-emerald-200/60 text-xs font-bold">Of total workforce</div>
                </div>
                <div className="bg-[#0A1420] border border-rose-500/30 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-center text-center group cursor-pointer hover:border-rose-500/50 transition-colors">
                    <div className="text-rose-400 text-xs font-bold uppercase tracking-wider mb-2">Employees Below Living Wage</div>
                    <div className="text-4xl font-black text-rose-400 mb-2">14</div>
                    <div className="text-[#8899AA] text-xs underline decoration-dashed group-hover:text-white transition-colors">Identify Flagged Employees</div>
                </div>
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden flex flex-col justify-center">
                    <h3 className="text-white text-sm font-bold mb-3">Model Integrations</h3>
                    <div className="space-y-2 text-xs font-bold text-[#AABBCC]">
                        <div className="flex items-center justify-between bg-[#131B2B] p-2 rounded-lg border border-[#2A3A4A]">
                            <span>MIT Living Wage Calculator</span>
                            <span className="text-emerald-400"><CheckCircle2 size={14} /></span>
                        </div>
                        <div className="flex items-center justify-between bg-[#131B2B] p-2 rounded-lg border border-[#2A3A4A]">
                            <span>Living Wage Foundation (UK)</span>
                            <span className="text-emerald-400"><CheckCircle2 size={14} /></span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl overflow-hidden mt-6">
                <div className="p-5 border-b border-[#1A2A3A] bg-[#060D1A] flex justify-between items-center">
                    <h3 className="text-white font-bold flex items-center gap-2"><MapPin size={18} className="text-[#556677]" /> Regional Assessment Map</h3>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-[#131B2B] text-[#8899AA] text-xs uppercase tracking-wider font-bold border-b border-[#2A3A4A]">
                                <th className="p-4 py-3">Location HQ</th>
                                <th className="p-4 py-3">Established Living Wage</th>
                                <th className="p-4 py-3">Minimum Internal Wage</th>
                                <th className="p-4 py-3">Compliance Status</th>
                                <th className="p-4 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            <tr className="border-b border-rose-500/20 bg-rose-500/5 hover:bg-rose-500/10 transition-colors">
                                <td className="p-4">
                                    <div className="font-bold text-white mb-0.5">Austin, Texas, USA</div>
                                    <div className="text-[#8899AA] text-xs">280 Employees</div>
                                </td>
                                <td className="p-4 text-[#AABBCC] font-mono">$22.42 / hr</td>
                                <td className="p-4 text-rose-400 font-bold font-mono">$21.50 / hr</td>
                                <td className="p-4">
                                    <span className="flex items-center gap-1 text-[10px] uppercase font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20 w-fit">
                                        <AlertTriangle size={12} /> 14 At Risk
                                    </span>
                                </td>
                                <td className="p-4 text-right">
                                    <button className="text-indigo-400 font-bold hover:text-white transition-colors text-xs flex items-center gap-1 justify-end ml-auto">
                                        Remediate <TrendingUp size={14} />
                                    </button>
                                </td>
                            </tr>

                            <tr className="border-b border-[#1A2A3A] hover:bg-[#131B2B]/50 transition-colors">
                                <td className="p-4">
                                    <div className="font-bold text-white mb-0.5">London, UK</div>
                                    <div className="text-[#8899AA] text-xs">145 Employees</div>
                                </td>
                                <td className="p-4 text-[#AABBCC] font-mono">£13.15 / hr</td>
                                <td className="p-4 text-emerald-400 font-bold font-mono">£15.00 / hr</td>
                                <td className="p-4">
                                    <span className="flex items-center gap-1 text-[10px] uppercase font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 w-fit">
                                        <CheckCircle2 size={12} /> Compliant
                                    </span>
                                </td>
                                <td className="p-4 text-right text-[#556677]">
                                    —
                                </td>
                            </tr>

                            <tr className="border-b border-[#1A2A3A] hover:bg-[#131B2B]/50 transition-colors">
                                <td className="p-4">
                                    <div className="font-bold text-white mb-0.5">Bangalore, India</div>
                                    <div className="text-[#8899AA] text-xs">420 Employees</div>
                                </td>
                                <td className="p-4 text-[#AABBCC] font-mono">₹28,500 / mo</td>
                                <td className="p-4 text-emerald-400 font-bold font-mono">₹45,000 / mo</td>
                                <td className="p-4">
                                    <span className="flex items-center gap-1 text-[10px] uppercase font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 w-fit">
                                        <CheckCircle2 size={12} /> Compliant
                                    </span>
                                </td>
                                <td className="p-4 text-right text-[#556677]">
                                    —
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="p-4 bg-[#060D1A] flex gap-2 text-xs text-[#8899AA] border-t border-[#1A2A3A]">
                    <Info size={16} className="text-sky-400 shrink-0" />
                    <p>Living wage estimates are dynamic and reflect the cost of basic necessities in a given locale. Local inflation data automatically updates thresholds quarterly via the integrated external APIs.</p>
                </div>
            </div>
        </div>
    );
}
