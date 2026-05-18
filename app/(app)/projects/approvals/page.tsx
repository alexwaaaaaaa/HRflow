"use client";

import Page from "@/components/ui/Page";
import React, { useState } from 'react';
import { Check, X, Filter, ShieldCheck, AlertTriangle } from 'lucide-react';

export default function ApprovalsScreen() {
    const [activeTab, setActiveTab] = useState('timesheets');

    return (
        <Page
            title="Approvals Inbox"
            subtitle="Review and approve timesheets, expenses, and time-off prior to payroll/billing cycles."
            breadcrumbs={[{ label: "Projects", href: "/projects" }, { label: "Approvals" }]}
            maxWidth="1400px"
        >

        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="text-sky-400 text-xs font-bold uppercase tracking-wider mb-1">Manager Workflow</div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><ShieldCheck size={24} className="text-sky-400" /> Approvals Inbox</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Review and approve timesheets, expenses, and time-off prior to payroll/billing cycles.</p>
                </div>
            </div>

            <div className="flex gap-2 mb-6 border-b border-[#1A2A3A] pb-4">
                {[
                    { id: 'timesheets', label: 'Timesheets', count: 12 },
                    { id: 'expenses', label: 'Project Expenses', count: 4 },
                    { id: 'timeoff', label: 'Time Off', count: null },
                ].map(t => (
                    <button key={t.id} onClick={() => setActiveTab(t.id)} className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors flex items-center gap-2 ${activeTab === t.id ? 'bg-[#131B2B] text-white border border-[#2A3A4A]' : 'text-[#556677] hover:text-[#8899AA]'}`}>
                        {t.label}
                        {t.count && <span className={`px-1.5 py-0.5 rounded text-[10px] ${activeTab === t.id ? 'bg-sky-500 text-[#0A1420]' : 'bg-[#1A2A3A] text-[#8899AA]'}`}>{t.count}</span>}
                    </button>
                ))}
            </div>

            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl overflow-hidden shadow-xl">
                <div className="p-4 border-b border-[#1A2A3A] bg-[#060D1A] flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <button className="bg-sky-600 hover:bg-sky-500 text-white font-bold py-1.5 px-4 rounded-lg text-xs transition-colors shadow">Bulk Approve All (12)</button>
                        <span className="text-[#556677] text-xs">For week ending Oct 26</span>
                    </div>
                    <button className="text-[#8899AA] hover:text-white flex items-center gap-2 text-sm font-bold border border-[#2A3A4A] bg-[#131B2B] px-3 py-1.5 rounded-lg transition-colors"><Filter size={14} /> Filter</button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-[#131B2B] text-[#556677] text-xs uppercase tracking-wider font-bold border-b border-[#2A3A4A]">
                                <th className="p-4 py-3 w-12 text-center"><input type="checkbox" className="accent-sky-500" /></th>
                                <th className="p-4 py-3">Employee</th>
                                <th className="p-4 py-3">Total Hrs</th>
                                <th className="p-4 py-3">Billable Split</th>
                                <th className="p-4 py-3">Project Mapped</th>
                                <th className="p-4 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {/* Item 1 - Normal */}
                            <tr className="border-b border-[#1A2A3A] hover:bg-[#131B2B]/40 transition-colors">
                                <td className="p-4 text-center"><input type="checkbox" className="accent-sky-500" /></td>
                                <td className="p-4">
                                    <div className="font-bold text-white mb-0.5">Maya Lin</div>
                                    <div className="text-[#8899AA] text-xs">Software Engineer</div>
                                </td>
                                <td className="p-4">
                                    <div className="font-bold text-white font-mono">40.0</div>
                                </td>
                                <td className="p-4">
                                    <div className="flex flex-col gap-1 w-32">
                                        <div className="w-full h-1.5 rounded-full bg-[#131B2B] overflow-hidden">
                                            <div className="bg-emerald-500 h-full w-[100%]"></div>
                                        </div>
                                        <span className="text-emerald-400 text-[10px] uppercase font-bold text-right">100% Billable</span>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="text-xs bg-[#1A2A3A] border border-[#2A3A4A] text-[#AABBCC] px-2 py-1 rounded inline-block font-mono">PRJ-809</div>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center justify-end gap-2">
                                        <button className="w-8 h-8 rounded-full border border-rose-500/30 text-rose-400 flex items-center justify-center hover:bg-rose-500/10 transition-colors"><X size={16} /></button>
                                        <button className="w-8 h-8 rounded-full border border-emerald-500/30 text-emerald-400 flex items-center justify-center hover:bg-emerald-500/10 transition-colors"><Check size={16} /></button>
                                    </div>
                                </td>
                            </tr>

                            {/* Item 2 - Warning Overtime */}
                            <tr className="border-b border-amber-500/10 bg-amber-500/5 hover:bg-amber-500/10 transition-colors">
                                <td className="p-4 text-center"><input type="checkbox" className="accent-sky-500" /></td>
                                <td className="p-4">
                                    <div className="font-bold text-white mb-0.5">David Chang</div>
                                    <div className="text-amber-400/70 text-xs flex items-center gap-1"><AlertTriangle size={12} /> Overtime Trigger</div>
                                </td>
                                <td className="p-4">
                                    <div className="font-bold text-amber-400 font-mono">48.5</div>
                                    <div className="text-[#556677] text-[10px]">+8.5h OT</div>
                                </td>
                                <td className="p-4">
                                    <div className="flex flex-col gap-1 w-32">
                                        <div className="w-full h-1.5 rounded-full bg-[#131B2B] overflow-hidden">
                                            <div className="bg-emerald-500 h-full w-[85%]"></div>
                                        </div>
                                        <span className="text-[#8899AA] text-[10px] uppercase font-bold text-right">85% Billable</span>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="text-xs bg-[#1A2A3A] border border-[#2A3A4A] text-[#AABBCC] px-2 py-1 rounded inline-block font-mono">PRJ-812</div>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center justify-end gap-2">
                                        <button className="w-8 h-8 rounded-full border border-rose-500/30 text-rose-400 flex items-center justify-center hover:bg-rose-500/10 transition-colors"><X size={16} /></button>
                                        <button className="w-8 h-8 rounded-full border border-emerald-500/30 text-emerald-400 flex items-center justify-center hover:bg-emerald-500/10 transition-colors"><Check size={16} /></button>
                                    </div>
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
