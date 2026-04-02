"use client";
import React from 'react';
import { Search, ShieldAlert, FileSearch, ArrowRightCircle, CheckCircle, AlertOctagon } from 'lucide-react';

export default function TimesheetAuditScreen() {
    return (
        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="text-rose-400 text-xs font-bold uppercase tracking-wider mb-1">Compliance & Risk</div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><FileSearch size={24} className="text-rose-400" /> Timesheet Fraud Audit</h1>
                    <p className="text-[#8899AA] text-sm mt-1">AI-powered detection of phantom hours, overlapping entries, and anomalous work patterns.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-rose-500/20 to-rose-500/5 border border-rose-500/30 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-center text-center">
                    <ShieldAlert size={32} className="text-rose-400 mb-3 mx-auto" />
                    <div className="text-3xl font-black text-rose-400 mb-1">12</div>
                    <div className="text-rose-200/80 text-xs font-bold uppercase tracking-wider">High Risk Flags</div>
                </div>
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 flex flex-col justify-center text-center">
                    <div className="text-3xl font-black text-amber-500 mb-1 font-mono">34</div>
                    <div className="text-[#8899AA] text-xs font-bold uppercase tracking-wider">Overlapping Entries</div>
                </div>
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 flex flex-col justify-center text-center">
                    <div className="text-3xl font-black text-white mb-1 font-mono">1.2%</div>
                    <div className="text-[#8899AA] text-xs font-bold uppercase tracking-wider">Edit After Approval</div>
                </div>
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 flex flex-col justify-center text-center">
                    <div className="text-3xl font-black text-white mb-1 font-mono">45</div>
                    <div className="text-[#8899AA] text-xs font-bold uppercase tracking-wider">Weekend/Holiday OT</div>
                </div>
            </div>

            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl overflow-hidden shadow-xl mt-6">
                <div className="p-4 border-b border-[#1A2A3A] bg-[#060D1A] flex justify-between items-center">
                    <h3 className="text-white font-bold flex items-center gap-2"><AlertOctagon size={16} className="text-rose-400" /> Anomaly Detection Queue</h3>
                    <div className="flex gap-2">
                        <button className="bg-[#131B2B] hover:bg-[#1A2A3A] text-white px-3 py-1.5 rounded-lg text-xs font-bold border border-[#2A3A4A] transition-colors">Export Log</button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-[#131B2B] text-[#556677] text-xs uppercase tracking-wider font-bold border-b border-[#2A3A4A]">
                                <th className="p-4 py-3">Employee / ID</th>
                                <th className="p-4 py-3">Anomaly Type</th>
                                <th className="p-4 py-3">Details</th>
                                <th className="p-4 py-3">Risk Level</th>
                                <th className="p-4 py-3 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            <tr className="border-b border-[#1A2A3A] hover:bg-[#131B2B]/40 transition-colors">
                                <td className="p-4">
                                    <div className="font-bold text-white mb-0.5">Michael Chang</div>
                                    <div className="text-[#556677] text-xs font-mono">E-4921</div>
                                </td>
                                <td className="p-4">
                                    <div className="text-[#AABBCC] font-bold">Impossible Hours</div>
                                </td>
                                <td className="p-4 text-xs">
                                    <div className="text-[#8899AA] max-w-sm">Logged 26 hours within a single 24-hour period on Oct 22 across 3 different projects.</div>
                                </td>
                                <td className="p-4">
                                    <span className="text-[10px] uppercase font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">Critical</span>
                                </td>
                                <td className="p-4 text-right">
                                    <button className="text-sky-400 hover:text-sky-300 font-bold text-xs flex items-center justify-end gap-1 w-full"><ArrowRightCircle size={14} /> Investigate</button>
                                </td>
                            </tr>

                            <tr className="border-b border-[#1A2A3A] hover:bg-[#131B2B]/40 transition-colors">
                                <td className="p-4">
                                    <div className="font-bold text-white mb-0.5">External Vendor (Acme)</div>
                                    <div className="text-[#556677] text-xs font-mono">V-8812</div>
                                </td>
                                <td className="p-4">
                                    <div className="text-[#AABBCC] font-bold">Post-Approval Edit</div>
                                </td>
                                <td className="p-4 text-xs">
                                    <div className="text-[#8899AA] max-w-sm">Timesheet from Sep was altered by an admin account increasing billable amount by $4,500 after client signature.</div>
                                </td>
                                <td className="p-4">
                                    <span className="text-[10px] uppercase font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">Critical</span>
                                </td>
                                <td className="p-4 text-right">
                                    <button className="text-sky-400 hover:text-sky-300 font-bold text-xs flex items-center justify-end gap-1 w-full"><ArrowRightCircle size={14} /> Investigate</button>
                                </td>
                            </tr>

                            <tr className="border-b border-[#1A2A3A] hover:bg-[#131B2B]/40 transition-colors">
                                <td className="p-4">
                                    <div className="font-bold text-white mb-0.5">Sarah Jenkins</div>
                                    <div className="text-[#556677] text-xs font-mono">E-1044</div>
                                </td>
                                <td className="p-4">
                                    <div className="text-[#AABBCC] font-bold">Pattern Deviation</div>
                                </td>
                                <td className="p-4 text-xs">
                                    <div className="text-[#8899AA] max-w-sm">Submitted exactly 8.0 hours every single day including weekends for 3 weeks straight. Highly automated pattern detected.</div>
                                </td>
                                <td className="p-4">
                                    <span className="text-[10px] uppercase font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">Warning</span>
                                </td>
                                <td className="p-4 text-right">
                                    <button className="text-sky-400 hover:text-sky-300 font-bold text-xs flex items-center justify-end gap-1 w-full"><ArrowRightCircle size={14} /> Investigate</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
