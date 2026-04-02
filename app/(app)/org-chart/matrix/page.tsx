"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    Grid3X3, ChevronRight, Search, Download, Users, Briefcase
} from "lucide-react";

export default function MatrixOrgChartScreen() {
    return (
        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans flex flex-col h-screen overflow-hidden">
            <div className="flex items-center justify-between mb-8 flex-shrink-0">
                <div>
                    <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-2">
                        <Link href="/dashboard" className="hover:text-white transition-colors">Org & Structure</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-white">Matrix Structure</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <div className="p-2 bg-pink-500/10 rounded-xl border border-pink-500/20">
                            <Grid3X3 className="w-6 h-6 text-pink-500" />
                        </div>
                        Cross-Functional Matrix
                    </h1>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex bg-[#1A2A3A] p-1 rounded-lg border border-[#2A3A4A]">
                        <button className="px-4 py-1.5 rounded-md text-xs font-medium bg-[#2A3A4A] text-white shadow-sm transition-colors">By Product</button>
                        <button className="px-4 py-1.5 rounded-md text-xs font-medium text-[#8899AA] hover:text-white transition-colors">By Region</button>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white text-sm font-semibold rounded-lg transition-colors shadow-[0_4px_15px_rgba(236,72,153,0.3)]">
                        <Download className="w-4 h-4" /> Export Matrix
                    </button>
                </div>
            </div>

            <div className="flex-1 bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden shadow-lg flex flex-col">
                <div className="p-4 border-b border-[#1A2A3A] flex justify-between items-center bg-[#1A2A3A]/20">
                    <h2 className="text-sm font-bold text-white">Project Teams vs Functional Departments</h2>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 text-xs text-[#8899AA]">
                            <div className="w-2 h-2 rounded-full bg-emerald-400"></div> Direct Report (Solid)
                        </div>
                        <div className="flex items-center gap-2 text-xs text-[#8899AA]">
                            <div className="w-2 h-2 border border-pink-400 border-dashed rounded-full"></div> Project Lead (Dotted)
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-auto custom-scrollbar p-6 bg-[#0B1221]">
                    <div className="min-w-max">
                        {/* Header Row (Functional Departments) */}
                        <div className="flex gap-4 mb-4 ml-64">
                            {['Engineering', 'Design & UX', 'Product Mgt', 'Marketing', 'Data Science'].map(dept => (
                                <div key={dept} className="w-48 flex-shrink-0 bg-[#1A2A3A]/60 border border-[#2A3A4A] rounded-xl p-3 text-center">
                                    <div className="w-8 h-8 bg-[#0B1221] rounded-lg mx-auto mb-2 flex items-center justify-center text-[#8899AA]">
                                        <Briefcase className="w-4 h-4" />
                                    </div>
                                    <h3 className="text-xs font-bold text-white tracking-wider uppercase">{dept}</h3>
                                    <p className="text-[10px] text-[#8899AA] mt-1">Head: {dept.substring(0, 2)} Leader</p>
                                </div>
                            ))}
                        </div>

                        {/* Matrix Grid */}
                        <div className="space-y-4">
                            {/* Project Row 1 */}
                            <div className="flex gap-4">
                                <div className="w-64 flex-shrink-0 bg-gradient-to-r from-[#1A2A3A] to-[#0D1928] border border-[#2A3A4A] rounded-xl p-4 flex flex-col justify-center sticky left-0 z-10 shadow-[10px_0_15px_-3px_rgba(0,0,0,0.3)]">
                                    <span className="text-[10px] font-bold text-pink-500 uppercase tracking-widest mb-1">Squad Alpha</span>
                                    <h3 className="text-base font-bold text-white mb-2 cursor-pointer hover:underline">Consumer FinTech App</h3>
                                    <div className="flex items-center justify-between text-xs text-[#8899AA]">
                                        <span className="flex items-center gap-1"><Users className="w-3 h-3" /> 14 Members</span>
                                        <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded border border-emerald-500/20">Active</span>
                                    </div>
                                </div>

                                {/* Engineering Cells */}
                                <div className="w-48 flex-shrink-0 bg-[#1A2A3A]/30 border border-[#1A2A3A] rounded-xl p-3 hover:bg-[#1A2A3A]/80 transition-colors">
                                    <div className="space-y-2">
                                        <div className="bg-[#0B1221] border border-emerald-500/30 p-2 rounded-lg flex items-center gap-2 cursor-pointer shadow-[0_0_10px_rgba(16,185,129,0.05)]">
                                            <img src="https://i.pravatar.cc/150?u=11" className="w-6 h-6 rounded-full" alt="avatar" />
                                            <div>
                                                <p className="text-xs font-medium text-white">Rahul K.</p>
                                                <p className="text-[9px] text-emerald-400">Tech Lead</p>
                                            </div>
                                        </div>
                                        <div className="bg-[#0B1221] border border-pink-500/30 p-2 rounded-lg flex items-center gap-2 border-dashed opacity-80 cursor-pointer hover:opacity-100">
                                            <img src="https://i.pravatar.cc/150?u=12" className="w-6 h-6 rounded-full" alt="avatar" />
                                            <div>
                                                <p className="text-xs font-medium text-white">Anita R.</p>
                                                <p className="text-[9px] text-[#8899AA]">Senior Dev</p>
                                            </div>
                                        </div>
                                        <div className="bg-[#0B1221] border border-[#2A3A4A] p-2 rounded-lg flex items-center gap-2 justify-center text-[#8899AA] hover:text-white cursor-pointer transition-colors">
                                            <span className="text-[10px]">+2 more</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Design Cells */}
                                <div className="w-48 flex-shrink-0 bg-[#1A2A3A]/30 border border-[#1A2A3A] rounded-xl p-3 hover:bg-[#1A2A3A]/80 transition-colors">
                                    <div className="space-y-2">
                                        <div className="bg-[#0B1221] border border-pink-500/30 p-2 rounded-lg flex items-center gap-2 border-dashed cursor-pointer">
                                            <img src="https://i.pravatar.cc/150?u=13" className="w-6 h-6 rounded-full" alt="avatar" />
                                            <div>
                                                <p className="text-xs font-medium text-white">John D.</p>
                                                <p className="text-[9px] text-[#8899AA]">UI/UX Lead</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Product Cells */}
                                <div className="w-48 flex-shrink-0 bg-[#1A2A3A]/30 border border-[#1A2A3A] rounded-xl p-3 hover:bg-[#1A2A3A]/80 transition-colors">
                                    <div className="space-y-2">
                                        <div className="bg-[#0B1221] border-2 border-amber-500/50 p-2 rounded-lg flex items-center gap-2 cursor-pointer shadow-[0_0_10px_rgba(245,158,11,0.1)]">
                                            <img src="https://i.pravatar.cc/150?u=14" className="w-6 h-6 rounded-full" alt="avatar" />
                                            <div>
                                                <p className="text-xs font-bold text-white">Sanjay M.</p>
                                                <p className="text-[9px] text-amber-500 font-bold">Squad Lead (PM)</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Empty cells for spacing to match header */}
                                <div className="w-48 flex-shrink-0 bg-[#0B1221]/50 border border-transparent rounded-xl flex items-center justify-center">
                                    <span className="text-xs text-[#2A3A4A] font-mono">--</span>
                                </div>
                                <div className="w-48 flex-shrink-0 bg-[#1A2A3A]/30 border border-[#1A2A3A] rounded-xl p-3 hover:bg-[#1A2A3A]/80 transition-colors">
                                    <div className="space-y-2">
                                        <div className="bg-[#0B1221] border border-pink-500/30 p-2 rounded-lg flex items-center gap-2 border-dashed cursor-pointer">
                                            <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-white text-[10px] font-bold">AS</div>
                                            <div>
                                                <p className="text-xs font-medium text-white">Alice S.</p>
                                                <p className="text-[9px] text-[#8899AA]">Data Analyst</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Project Row 2 */}
                            <div className="flex gap-4">
                                <div className="w-64 flex-shrink-0 bg-gradient-to-r from-[#1A2A3A] to-[#0D1928] border border-[#2A3A4A] rounded-xl p-4 flex flex-col justify-center sticky left-0 z-10 shadow-[10px_0_15px_-3px_rgba(0,0,0,0.3)]">
                                    <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mb-1">Tiger Team</span>
                                    <h3 className="text-base font-bold text-white mb-2 cursor-pointer hover:underline">Legacy System Migration</h3>
                                    <div className="flex items-center justify-between text-xs text-[#8899AA]">
                                        <span className="flex items-center gap-1"><Users className="w-3 h-3" /> 8 Members</span>
                                        <span className="px-2 py-0.5 bg-amber-500/10 text-amber-500 rounded border border-amber-500/20">Critical</span>
                                    </div>
                                </div>

                                {/* Engineering Cells */}
                                <div className="w-48 flex-shrink-0 bg-[#1A2A3A]/30 border border-[#1A2A3A] rounded-xl p-3 hover:bg-[#1A2A3A]/80 transition-colors">
                                    <div className="space-y-2">
                                        <div className="bg-[#0B1221] border border-pink-500/30 p-2 rounded-lg flex items-center gap-2 border-dashed cursor-pointer shadow-[0_0_10px_rgba(236,72,153,0.05)]">
                                            <img src="https://i.pravatar.cc/150?u=21" className="w-6 h-6 rounded-full" alt="avatar" />
                                            <div>
                                                <p className="text-xs font-medium text-white">Mohan K.</p>
                                                <p className="text-[9px] text-[#8899AA]">DBA Architect</p>
                                            </div>
                                        </div>
                                        <div className="bg-[#0B1221] border border-pink-500/30 p-2 rounded-lg flex items-center gap-2 border-dashed cursor-pointer">
                                            <img src="https://i.pravatar.cc/150?u=22" className="w-6 h-6 rounded-full" alt="avatar" />
                                            <div>
                                                <p className="text-xs font-medium text-white">Sara V.</p>
                                                <p className="text-[9px] text-[#8899AA]">Backend Dev</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Design Cells */}
                                <div className="w-48 flex-shrink-0 bg-[#0B1221]/50 border border-transparent rounded-xl flex items-center justify-center">
                                    <span className="text-xs text-[#2A3A4A] font-mono">--</span>
                                </div>

                                {/* Product Cells */}
                                <div className="w-48 flex-shrink-0 bg-[#0B1221]/50 border border-transparent rounded-xl flex items-center justify-center">
                                    <span className="text-xs text-[#2A3A4A] font-mono">--</span>
                                </div>

                                <div className="w-48 flex-shrink-0 bg-[#0B1221]/50 border border-transparent rounded-xl flex items-center justify-center">
                                    <span className="text-xs text-[#2A3A4A] font-mono">--</span>
                                </div>

                                <div className="w-48 flex-shrink-0 bg-[#1A2A3A]/30 border border-[#1A2A3A] rounded-xl p-3 hover:bg-[#1A2A3A]/80 transition-colors">
                                    <div className="space-y-2">
                                        <div className="bg-[#0B1221] border-2 border-amber-500/50 p-2 rounded-lg flex items-center gap-2 cursor-pointer shadow-[0_0_10px_rgba(245,158,11,0.1)]">
                                            <div className="w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center text-white text-[10px] font-bold">DR</div>
                                            <div>
                                                <p className="text-xs font-bold text-white">Dr. Rajiv</p>
                                                <p className="text-[9px] text-amber-500 font-bold">Squad Lead</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
