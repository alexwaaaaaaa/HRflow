"use client";
import React from 'react';
import { UserPlus, Calendar, Clock, Download, CheckCircle2, ChevronRight, BarChart } from 'lucide-react';
import Link from 'next/link';

export default function HiringPlanScreen() {
    return (
        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><UserPlus size={24} className="text-emerald-400" /> Hiring Plan & Funnel Velocity</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Track recruitment pacing against the active operating plan.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-colors flex items-center gap-2">
                        <Download size={16} /> Export Status
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden text-center md:text-left">
                    <div className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-2">Q3 Hiring Target</div>
                    <div className="text-3xl font-black text-white mb-2">45 Roles</div>
                </div>

                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden text-center md:text-left">
                    <div className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-2">Offers Accepted</div>
                    <div className="text-3xl font-black text-emerald-400 mb-2">18</div>
                    <div className="text-[#556677] text-xs font-bold">40% of target met</div>
                </div>

                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden text-center md:text-left">
                    <div className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-2">Avg Time to Fill</div>
                    <div className="text-3xl font-black text-white mb-2">42 Days</div>
                    <div className="text-[#556677] text-xs font-bold">Historical benchmark: 45d</div>
                </div>

                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden text-center md:text-left">
                    <div className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-2">Cost / Hire</div>
                    <div className="text-3xl font-black text-white mb-2">₹45k</div>
                    <div className="text-amber-400 text-xs font-bold">Running over budget by 5%</div>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                        <div className="p-4 border-b border-[#1A2A3A] bg-[#060D1A] flex items-center justify-between">
                            <h3 className="text-white font-bold">Open Requisitions Pacing</h3>
                            <div className="text-xs text-[#556677]">Filtered by: Q3 FY26</div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-[#131B2B] text-[#8899AA] text-xs uppercase tracking-wider font-bold border-b border-[#2A3A4A]">
                                        <th className="p-4 py-3">Role / Dept</th>
                                        <th className="p-4 py-3">Open Days</th>
                                        <th className="p-4 py-3">Funnel Status</th>
                                        <th className="p-4 py-3 text-right">Pacing</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {[
                                        { role: 'Senior Frontend Eng', dept: 'Engineering', days: 28, funnel: '3 at Onsite, 1 Offer', pace: 'On Track', color: 'emerald' },
                                        { role: 'Product Manager', dept: 'Product', days: 45, funnel: '15 Screen, 0 Onsite', pace: 'Lagging', color: 'rose' },
                                        { role: 'Account Executive (x4)', dept: 'Sales', days: 12, funnel: 'Sourcing Phase', pace: 'On Track', color: 'emerald' },
                                        { role: 'VP of Marketing', dept: 'Marketing', days: 65, funnel: 'Exec Interview', pace: 'Lagging', color: 'rose' },
                                    ].map((row, i) => (
                                        <tr key={i} className="border-b border-[#1A2A3A] hover:bg-[#131B2B]/50 transition-colors group cursor-pointer">
                                            <td className="p-4">
                                                <div className="font-bold text-white group-hover:text-emerald-400 transition-colors">{row.role}</div>
                                                <div className="text-[#556677] text-xs mt-0.5">{row.dept}</div>
                                            </td>
                                            <td className="p-4">
                                                <div className={`font-mono font-bold ${row.days > 45 ? 'text-rose-400' : 'text-white'}`}>{row.days}</div>
                                            </td>
                                            <td className="p-4 text-[#AABBCC] text-xs">{row.funnel}</td>
                                            <td className="p-4 text-right">
                                                <span className={`px-2.5 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider bg-${row.color}-500/10 text-${row.color}-400 border border-${row.color}-500/20`}>
                                                    {row.pace}
                                                </span>
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
                        <h3 className="text-white font-bold border-b border-[#1A2A3A] pb-3 mb-6 flex items-center justify-between">
                            Recruitment Funnel
                            <BarChart size={16} className="text-[#556677]" />
                        </h3>

                        <div className="space-y-2">
                            {[
                                { st: 'Total Applications', val: '2,450', w: '100%' },
                                { st: 'Recruiter Screen', val: '420', w: '60%' },
                                { st: 'Technical / Hiring Mgr', val: '145', w: '35%' },
                                { st: 'Onsite / Loop', val: '45', w: '15%' },
                                { st: 'Offers Extended', val: '22', w: '8%' },
                                { st: 'Offers Accepted', val: '18', w: '6%' },
                            ].map((f, i) => (
                                <div key={i} className="flex flex-col gap-1 items-center">
                                    <div className="w-full flex justify-between text-xs font-bold">
                                        <span className="text-[#AABBCC]">{f.st}</span>
                                        <span className="text-white font-mono">{f.val}</span>
                                    </div>
                                    <div className="w-full flex justify-center py-1">
                                        <div className="h-5 bg-emerald-500/20 border border-emerald-500/40 rounded transition-all flex items-center justify-center overflow-hidden" style={{ width: f.w }}>
                                            {i === 5 && <div className="w-full h-full bg-emerald-500/50 flex items-center justify-center animate-pulse"></div>}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 pt-4 border-t border-[#1A2A3A] text-center text-xs text-[#8899AA]">
                            Conversion Rate (App &rarr; Hire) = <strong className="text-white">0.73%</strong>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
