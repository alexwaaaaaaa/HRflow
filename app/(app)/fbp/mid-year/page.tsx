"use client";
import React, { useState } from 'react';
import { Calendar, ArrowLeft, CheckCircle2, AlertTriangle, Users, Save } from 'lucide-react';
import Link from 'next/link';

const REVISIONS = [
    { emp: 'Anita Kulkarni', dept: 'Engineering', oldHra: 156000, newHra: 180000, oldLta: 50000, newLta: 26000, status: 'Pending Approval' },
    { emp: 'Rahul Sharma', dept: 'Sales', oldHra: 120000, newHra: 120000, oldLta: 50000, newLta: 0, status: 'Approved' },
    { emp: 'Meena Joshi', dept: 'Finance', oldHra: 180000, newHra: 180000, oldLta: 50000, newLta: 50000, status: 'Pending Approval' },
];

export default function FBPMidYearRevisionScreen() {
    const [windowOpen, setWindowOpen] = useState(false);

    return (
        <div className="min-h-screen p-6 max-w-5xl mx-auto space-y-6">
            <Link href="/fbp/dashboard" className="text-[#556677] hover:text-white text-sm font-bold flex items-center gap-1 mb-2"><ArrowLeft size={14} /> FBP Dashboard</Link>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><Calendar size={22} className="text-amber-400" /> Mid-Year FBP Revision</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Allow employees to revise their component declarations for the remainder of the fiscal year</p>
                </div>
            </div>

            {/* Control Panel */}
            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 flex items-center justify-between">
                <div>
                    <h3 className="text-white font-bold text-lg mb-1">Revision Window Status</h3>
                    <div className="flex items-center gap-2">
                        <span className={`w-3 h-3 rounded-full ${windowOpen ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
                        <span className={`font-bold ${windowOpen ? 'text-emerald-400' : 'text-red-400'}`}>{windowOpen ? 'OPEN' : 'CLOSED'}</span>
                    </div>
                    <p className="text-[#8899AA] text-sm mt-2 max-w-md">Opening the window allows employees to log in and change their FBP allocations. Changes will apply from the next payroll run.</p>
                </div>
                <div className="text-right space-y-3">
                    <div className="text-sm font-bold text-[#556677]">Scheduled for: <span className="text-white">Oct 1 - Oct 15, 2026</span></div>
                    <button onClick={() => setWindowOpen(!windowOpen)} className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-colors ${windowOpen ? 'bg-red-600 hover:bg-red-500 text-white' : 'bg-emerald-600 hover:bg-emerald-500 text-white'}`}>
                        {windowOpen ? 'Close Revision Window' : 'Open Revision Window Now'}
                    </button>
                </div>
            </div>

            {/* Warnings */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-5 flex gap-3">
                    <AlertTriangle size={20} className="text-amber-400 shrink-0" />
                    <div>
                        <div className="text-amber-400 font-bold text-sm">Tax Recalculation</div>
                        <div className="text-[#AABBCC] text-xs mt-1">Changing FBP components mid-year will trigger a TDS recalculation. Emps may see a spike or drop in their net take-home pay to adjust for past months.</div>
                    </div>
                </div>
                <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-2xl p-5 flex gap-3">
                    <Users size={20} className="text-indigo-400 shrink-0" />
                    <div>
                        <div className="text-indigo-400 font-bold text-sm">Approval Workflow</div>
                        <div className="text-[#AABBCC] text-xs mt-1">All revisions require HR approval before taking effect. Once approved, the payroll engine will automatically use the new structure.</div>
                    </div>
                </div>
            </div>

            {/* Review Revisions */}
            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-[#1A2A3A] text-white font-bold text-sm flex items-center justify-between">
                    <span>Pending Revisions</span>
                    <span className="text-amber-400 text-xs bg-amber-500/10 px-2 py-1 rounded">2 Requests</span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-[#060D1A] text-[#8899AA] text-xs uppercase tracking-wider">
                            <tr>
                                <th className="px-5 py-4 text-left font-bold border-b border-[#1A2A3A]">Employee</th>
                                <th className="px-5 py-4 text-left font-bold border-b border-[#1A2A3A]">HRA Change</th>
                                <th className="px-5 py-4 text-left font-bold border-b border-[#1A2A3A]">LTA Change</th>
                                <th className="px-5 py-4 text-left font-bold border-b border-[#1A2A3A]">Status</th>
                                <th className="px-5 py-4 text-right font-bold border-b border-[#1A2A3A]">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">
                            {REVISIONS.map((rev, i) => (
                                <tr key={i} className="hover:bg-[#131B2B] transition-colors">
                                    <td className="px-5 py-4">
                                        <div className="text-white font-semibold text-xs">{rev.emp}</div>
                                        <div className="text-[#556677] text-[10px]">{rev.dept}</div>
                                    </td>
                                    <td className="px-5 py-4">
                                        <div className="text-[#8899AA] text-xs line-through">₹{rev.oldHra.toLocaleString()}</div>
                                        <div className="text-amber-400 font-bold text-sm">₹{rev.newHra.toLocaleString()}</div>
                                    </td>
                                    <td className="px-5 py-4">
                                        <div className="text-[#8899AA] text-xs line-through">₹{rev.oldLta.toLocaleString()}</div>
                                        <div className="text-amber-400 font-bold text-sm">₹{rev.newLta.toLocaleString()}</div>
                                    </td>
                                    <td className="px-5 py-4">
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${rev.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
                                            {rev.status}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4 text-right">
                                        {rev.status === 'Pending Approval' ? (
                                            <button className="text-emerald-400 hover:text-emerald-300 text-xs font-bold flex items-center gap-1 justify-end ml-auto transition-colors">
                                                <CheckCircle2 size={14} /> Approve
                                            </button>
                                        ) : (
                                            <span className="text-[#556677] text-xs">Processed</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="p-4 border-t border-[#1A2A3A] bg-[#060D1A] flex justify-end">
                    <button className="bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white font-bold px-4 py-2 rounded-xl text-sm transition-colors flex items-center gap-2">
                        <Save size={14} /> Approve All Pensding
                    </button>
                </div>
            </div>
        </div>
    );
}
