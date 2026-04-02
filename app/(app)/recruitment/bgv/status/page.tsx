"use client";
import React, { useState } from "react";
import { Search, Filter, ShieldAlert, ShieldCheck, Download, ExternalLink, RefreshCw } from "lucide-react";

export default function BGVStatus() {
    const [search, setSearch] = useState("");

    return (
        <div className="p-6 md:p-8 max-w-[1200px] mx-auto text-white">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-1">BGV Status Dashboard</h1>
                    <p className="text-sm text-[#8899AA]">Track real-time progress of background verification checks</p>
                </div>
                <button className="h-10 px-4 bg-[#0D1928] border border-[#1A2A3A] text-white text-sm font-medium rounded-xl hover:bg-[#1A2A3A] transition-colors flex items-center gap-2">
                    <RefreshCw size={14} /> Sync Vendor Data
                </button>
            </div>

            <div className="flex gap-4 mb-6">
                <div className="relative flex-1 max-w-sm">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#445566]" />
                    <input
                        value={search} onChange={e => setSearch(e.target.value)}
                        placeholder="Search candidate or BGV Ref ID..." className="w-full h-10 bg-[#0D1928] border border-[#1A2A3A] rounded-xl pl-9 px-3 text-sm text-white focus:outline-none focus:border-[#0066FF]" />
                </div>
                <select className="h-10 bg-[#0D1928] border border-[#1A2A3A] rounded-xl px-4 text-sm text-white focus:outline-none min-w-[150px]">
                    <option>Status: All</option><option>Cleared (Green)</option><option>Discrepancy (Red)</option><option>In Progress (Yellow)</option>
                </select>
            </div>

            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-[#0A1420] text-[#8899AA] text-xs">
                        <tr>
                            <th className="px-6 py-4 font-medium w-3/12">Candidate & Role</th>
                            <th className="px-6 py-4 font-medium">BGV Ref / Vendor</th>
                            <th className="px-6 py-4 font-medium">Initiated On</th>
                            <th className="px-6 py-4 font-medium text-center">Checks Breakdown</th>
                            <th className="px-6 py-4 font-medium text-center">Overall Status</th>
                            <th className="px-6 py-4 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1A2A3A]">
                        {/* Red Discrepancy */}
                        <tr className="hover:bg-[#1A2A3A]/30 transition-colors group">
                            <td className="px-6 py-4">
                                <p className="font-bold text-white mb-0.5">Vikram Reddy</p>
                                <p className="text-[10px] text-[#8899AA]">Account Executive</p>
                            </td>
                            <td className="px-6 py-4">
                                <p className="font-mono text-xs text-white mb-0.5">AB-88902-IN</p>
                                <p className="text-[10px] text-[#445566]">AuthBridge Solutions</p>
                            </td>
                            <td className="px-6 py-4 text-[#8899AA] text-xs">01 Mar 2025</td>
                            <td className="px-6 py-4">
                                <div className="flex items-center justify-center gap-1.5">
                                    <div className="w-4 h-4 rounded-full bg-[#00E5A0] border border-[#00c98d] flex items-center justify-center" title="Identity: Clear"><ShieldCheck size={10} className="text-[#060B14]" /></div>
                                    <div className="w-4 h-4 rounded-full bg-[#FF4444] border border-[#cc0000] flex items-center justify-center" title="Employment: Discrepancy Found"><ShieldAlert size={10} className="text-[#060B14]" /></div>
                                    <div className="w-4 h-4 rounded-full bg-[#00E5A0] border border-[#00c98d] flex items-center justify-center" title="Criminal: Clear"><ShieldCheck size={10} className="text-[#060B14]" /></div>
                                    <div className="w-4 h-4 rounded-full bg-[#1A2A3A] border border-[#2A3A4A]" title="Academic: Pending"></div>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-center">
                                <span className="bg-[#FF4444]/10 text-[#FF4444] px-2 py-1 rounded text-[10px] font-bold uppercase border border-[#FF4444]/20 shadow-[0_0_10px_rgba(255,68,68,0.2)]">Discrepancy (Red)</span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                    <button className="h-8 px-3 bg-[#FF4444]/10 text-[#FF4444] text-[11px] font-bold rounded-lg hover:bg-[#FF4444]/20 transition-colors">View Details</button>
                                </div>
                            </td>
                        </tr>

                        {/* Yellow Progress */}
                        <tr className="hover:bg-[#1A2A3A]/30 transition-colors group">
                            <td className="px-6 py-4">
                                <p className="font-bold text-white mb-0.5">Neha Gupta</p>
                                <p className="text-[10px] text-[#8899AA]">HR Business Partner</p>
                            </td>
                            <td className="px-6 py-4">
                                <p className="font-mono text-xs text-white mb-0.5">FA-441-2025</p>
                                <p className="text-[10px] text-[#445566]">FirstAdvantage</p>
                            </td>
                            <td className="px-6 py-4 text-[#8899AA] text-xs">10 Mar 2025</td>
                            <td className="px-6 py-4">
                                <div className="flex items-center justify-center gap-1.5">
                                    <div className="w-4 h-4 rounded-full bg-[#00E5A0]" title="Identity: Clear"></div>
                                    <div className="w-4 h-4 rounded-full bg-[#FFB800] border border-[#cc9900] animate-pulse" title="Employment: In Progress"></div>
                                    <div className="w-4 h-4 rounded-full bg-[#1A2A3A]" title="Criminal: Pending"></div>
                                    <div className="w-4 h-4 rounded-full bg-[#1A2A3A]" title="Academic: Pending"></div>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-center">
                                <span className="bg-[#FFB800]/10 text-[#FFB800] px-2 py-1 rounded text-[10px] font-bold uppercase border border-[#FFB800]/20">In Progress (Yellow)</span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                    <button className="h-8 w-8 flex items-center justify-center text-[#8899AA] hover:text-white"><ExternalLink size={14} /></button>
                                </div>
                            </td>
                        </tr>

                        {/* Green Cleared */}
                        <tr className="hover:bg-[#1A2A3A]/30 transition-colors group">
                            <td className="px-6 py-4">
                                <p className="font-bold text-white mb-0.5">Amit Patel</p>
                                <p className="text-[10px] text-[#8899AA]">Backend Engineer (Go)</p>
                            </td>
                            <td className="px-6 py-4">
                                <p className="font-mono text-xs text-white mb-0.5">AB-99211-IN</p>
                                <p className="text-[10px] text-[#445566]">AuthBridge Solutions</p>
                            </td>
                            <td className="px-6 py-4 text-[#8899AA] text-xs">28 Feb 2025</td>
                            <td className="px-6 py-4">
                                <div className="flex items-center justify-center gap-1.5">
                                    <div className="w-4 h-4 rounded-full bg-[#00E5A0]"></div>
                                    <div className="w-4 h-4 rounded-full bg-[#00E5A0]"></div>
                                    <div className="w-4 h-4 rounded-full bg-[#00E5A0]"></div>
                                    <div className="w-4 h-4 rounded-full bg-[#00E5A0]"></div>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-center">
                                <span className="bg-[#00E5A0]/10 text-[#00E5A0] px-2 py-1 rounded text-[10px] font-bold uppercase border border-[#00E5A0]/20">Cleared (Green)</span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                    <button className="h-8 px-3 bg-[#1A2A3A] text-white text-[11px] font-bold rounded-lg hover:bg-[#2A3A4A] transition-colors flex items-center gap-1.5"><Download size={12} /> Report PDF</button>
                                </div>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
    );
}
