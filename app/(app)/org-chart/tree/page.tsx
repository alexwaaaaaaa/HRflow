"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
    Users, ChevronRight, Download, Filter, Share2,
    ZoomIn, ZoomOut, Target, UserPlus, MoreVertical,
    Network, Search, Plus, User
} from "lucide-react";
// In a real implementation we would use d3.js or react-d3-tree
// import Tree from 'react-d3-tree';

export default function OrgChartTreeScreen() {
    const [viewMode, setViewMode] = useState<"vertical" | "horizontal">("vertical");

    return (
        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans flex flex-col h-screen overflow-hidden">
            <div className="flex items-center justify-between mb-6 flex-shrink-0">
                <div>
                    <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-2">
                        <Link href="/dashboard" className="hover:text-white transition-colors">Org & Structure</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-white">Organization Tree</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <div className="p-2 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                            <Network className="w-6 h-6 text-indigo-400" />
                        </div>
                        Interactive Org Chart
                    </h1>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#8899AA]" />
                        <input
                            type="text"
                            placeholder="Search employee, title..."
                            className="bg-[#1A2A3A] border border-[#2A3A4A] text-white text-sm rounded-lg pl-9 pr-4 py-2 w-64 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder-[#4A5A6A]"
                        />
                    </div>
                    <div className="h-8 w-px bg-[#2A3A4A] mx-1"></div>
                    <div className="flex bg-[#1A2A3A] p-1 rounded-lg border border-[#2A3A4A]">
                        <button
                            onClick={() => setViewMode("vertical")}
                            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${viewMode === 'vertical' ? 'bg-[#2A3A4A] text-white shadow-sm' : 'text-[#8899AA] hover:text-white'}`}
                        >
                            Vertical
                        </button>
                        <button
                            onClick={() => setViewMode("horizontal")}
                            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${viewMode === 'horizontal' ? 'bg-[#2A3A4A] text-white shadow-sm' : 'text-[#8899AA] hover:text-white'}`}
                        >
                            Horizontal
                        </button>
                    </div>
                    <button className="flex items-center justify-center p-2 bg-[#1A2A3A] hover:bg-[#2A3A4A] border border-[#2A3A4A] text-white rounded-lg transition-colors">
                        <Filter className="w-4 h-4" />
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-semibold rounded-lg transition-colors shadow-[0_4px_15px_rgba(99,102,241,0.3)]">
                        <Download className="w-4 h-4" /> Export
                    </button>
                </div>
            </div>

            <div className="flex-1 bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden relative shadow-lg shadow-black/20 flex flex-col">

                {/* Floating Action Menu */}
                <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                    <button className="w-10 h-10 bg-[#1A2A3A] hover:bg-[#2A3A4A] border border-[#2A3A4A] rounded-full flex items-center justify-center text-white shadow-lg transition-transform hover:scale-105" title="Zoom In">
                        <Plus className="w-5 h-5" />
                    </button>
                    <button className="w-10 h-10 bg-[#1A2A3A] hover:bg-[#2A3A4A] border border-[#2A3A4A] rounded-full flex items-center justify-center text-white shadow-lg transition-transform hover:scale-105" title="Origin">
                        <Target className="w-5 h-5" />
                    </button>
                </div>

                {/* Legend */}
                <div className="absolute bottom-4 left-4 z-10 bg-[#0B1221]/90 backdrop-blur border border-[#1A2A3A] rounded-xl p-3 shadow-xl">
                    <h4 className="text-xs font-bold text-white mb-2 uppercase tracking-wider">Legend</h4>
                    <div className="space-y-2 text-xs text-[#8899AA]">
                        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-indigo-500"></div> Executive Team</div>
                        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-emerald-500"></div> Management</div>
                        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-[#2A3A4A]"></div> Individual Contributor</div>
                        <div className="flex items-center gap-2 mt-2 pt-2 border-t border-[#2A3A4A]"><Users className="w-3 h-3" /> External / Contractor</div>
                    </div>
                </div>

                {/* Simulated Chart Container - Using CSS grid to simulate a tree layout for this demo */}
                <div className="flex-1 overflow-auto custom-scrollbar p-10 bg-[radial-gradient(#1A2A3A_1px,transparent_1px)] [background-size:20px_20px] pb-32">

                    <div className={`flex ${viewMode === 'vertical' ? 'flex-col items-center' : 'flex-row items-center'} min-w-max min-h-max gap-12 pt-12`}>

                        {/* CEO Node */}
                        <div className="relative group flex flex-col items-center">
                            <div className="w-64 bg-[#0B1221] border-2 border-indigo-500 rounded-xl p-4 shadow-[0_0_20px_rgba(99,102,241,0.2)] hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] transition-all cursor-pointer transform hover:-translate-y-1 z-10">
                                <div className="flex gap-3 items-center">
                                    <div className="w-12 h-12 rounded-full bg-indigo-500/20 border-2 border-indigo-500 overflow-hidden">
                                        <img src="https://i.pravatar.cc/150?u=1" alt="CEO" className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-sm">Vikram Aditya</h3>
                                        <p className="text-indigo-400 text-xs font-medium">Chief Executive Officer</p>
                                    </div>
                                </div>
                                <div className="mt-3 pt-3 border-t border-[#1A2A3A] flex justify-between text-xs text-[#8899AA]">
                                    <span>Direct: 4</span>
                                    <span>Total: 1,245</span>
                                </div>
                            </div>

                            {/* Connecting Line from CEO */}
                            {viewMode === 'vertical' && <div className="w-0.5 h-12 bg-[#2A3A4A]"></div>}
                            {viewMode === 'horizontal' && <div className="w-12 h-0.5 bg-[#2A3A4A] absolute right-[-3rem] top-1/2"></div>}
                        </div>

                        {/* VPs Level line bridging */}
                        {viewMode === 'vertical' && (
                            <div className="relative w-[800px] flex justify-between">
                                <div className="absolute top-0 left-[10%] right-[10%] h-0.5 bg-[#2A3A4A]"></div>
                            </div>
                        )}

                        {/* Level 2 Nodes container */}
                        <div className={`flex ${viewMode === 'vertical' ? 'flex-row w-[1000px] justify-between' : 'flex-col ml-12 gap-12'}`}>

                            {/* CTO */}
                            <div className="relative flex flex-col items-center">
                                {viewMode === 'vertical' && <div className="w-0.5 h-6 bg-[#2A3A4A] absolute top-[-1.5rem]"></div>}
                                {viewMode === 'horizontal' && (
                                    <div className="absolute left-[-1.5rem] top-[-5rem] bottom-[-5rem] w-0.5 bg-[#2A3A4A]"></div>
                                )}
                                <div className="w-56 bg-[#0B1221] border-2 border-[#2A3A4A] rounded-xl p-3 shadow-lg hover:border-emerald-500 transition-all cursor-pointer z-10">
                                    <div className="flex gap-3 items-center">
                                        <div className="w-10 h-10 rounded-full bg-[#1A2A3A] border-2 border-[#2A3A4A] overflow-hidden">
                                            <img src="https://i.pravatar.cc/150?u=2" alt="CTO" className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-bold text-sm">Maya Patel</h3>
                                            <p className="text-emerald-400 text-xs font-medium">Chief Tech Officer</p>
                                        </div>
                                    </div>
                                    <div className="mt-2 pt-2 border-t border-[#1A2A3A] flex justify-between text-[10px] text-[#8899AA]">
                                        <span>Direct: 6</span>
                                        <span>Total: 432</span>
                                    </div>
                                    <button className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-[#1A2A3A] border border-[#2A3A4A] rounded-full flex items-center justify-center text-white hover:bg-[#2A3A4A] text-xs">+</button>
                                </div>
                                {viewMode === 'horizontal' && <div className="h-0.5 w-6 bg-[#2A3A4A] absolute left-[-1.5rem] top-1/2"></div>}
                            </div>

                            {/* CFO */}
                            <div className="relative flex flex-col items-center">
                                {viewMode === 'vertical' && <div className="w-0.5 h-6 bg-[#2A3A4A] absolute top-[-1.5rem]"></div>}
                                <div className="w-56 bg-[#0B1221] border-2 border-[#2A3A4A] rounded-xl p-3 shadow-lg hover:border-emerald-500 transition-all cursor-pointer z-10">
                                    <div className="flex gap-3 items-center">
                                        <div className="w-10 h-10 rounded-full bg-[#1A2A3A] border-2 border-[#2A3A4A] overflow-hidden flex items-center justify-center text-[#8899AA]">
                                            <User className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-bold text-sm">Open Role</h3>
                                            <p className="text-emerald-400 text-xs font-medium">Chief Finance Officer</p>
                                        </div>
                                    </div>
                                    <div className="mt-2 pt-2 border-t border-[#1A2A3A] flex justify-between text-[10px] text-[#8899AA]">
                                        <span>Direct: 0</span>
                                        <span className="text-amber-500">Req: #REQ-092</span>
                                    </div>
                                </div>
                                {viewMode === 'horizontal' && <div className="h-0.5 w-6 bg-[#2A3A4A] absolute left-[-1.5rem] top-1/2"></div>}
                            </div>

                            {/* CHRO */}
                            <div className="relative flex flex-col items-center">
                                {viewMode === 'vertical' && <div className="w-0.5 h-6 bg-[#2A3A4A] absolute top-[-1.5rem]"></div>}
                                <div className="w-56 bg-[#0B1221] border-2 border-emerald-500 rounded-xl p-3 shadow-lg hover:border-emerald-400 transition-all cursor-pointer z-10 ring-2 ring-emerald-500/20">
                                    <div className="absolute -top-2 -right-2 w-5 h-5 bg-pink-500 rounded-full text-white text-[10px] flex items-center justify-center font-bold">!</div>
                                    <div className="flex gap-3 items-center">
                                        <div className="w-10 h-10 rounded-full bg-[#1A2A3A] border-2 border-emerald-500 overflow-hidden">
                                            <img src="https://i.pravatar.cc/150?u=4" alt="CHRO" className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-bold text-sm">Priya Sharma</h3>
                                            <p className="text-emerald-400 text-xs font-medium">Chief HR Officer</p>
                                        </div>
                                    </div>
                                    <div className="mt-2 pt-2 border-t border-[#1A2A3A] flex justify-between text-[10px] text-[#8899AA]">
                                        <span>Direct: 5</span>
                                        <span>Total: 45</span>
                                    </div>
                                    <button className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-[#1A2A3A] border border-[#2A3A4A] rounded-full flex items-center justify-center text-white hover:bg-[#2A3A4A] text-xs">-</button>
                                </div>
                                {viewMode === 'horizontal' && <div className="h-0.5 w-6 bg-[#2A3A4A] absolute left-[-1.5rem] top-1/2"></div>}

                                {/* Level 3 for CHRO */}
                                {viewMode === 'vertical' && <div className="w-0.5 h-8 bg-[#2A3A4A]"></div>}
                                {viewMode === 'vertical' && (
                                    <div className="relative w-[300px] flex justify-between">
                                        <div className="absolute top-0 left-[20%] right-[20%] h-0.5 bg-[#2A3A4A]"></div>
                                    </div>
                                )}

                                <div className={`flex ${viewMode === 'vertical' ? 'flex-row gap-8 pt-6' : 'flex-col ml-12 gap-6 mt-6'}`}>
                                    {/* L3 Child 1 */}
                                    <div className="relative flex flex-col items-center">
                                        {viewMode === 'vertical' && <div className="w-0.5 h-6 bg-[#2A3A4A] absolute top-[-1.5rem]"></div>}
                                        {viewMode === 'horizontal' && <div className="absolute left-[-1.5rem] top-[-5rem] bottom-0 w-0.5 bg-[#2A3A4A]"></div>}
                                        <div className="w-48 bg-[#1A2A3A]/40 backdrop-blur-sm border border-[#2A3A4A] rounded-xl p-3 hover:bg-[#1A2A3A] transition-all cursor-pointer z-10">
                                            <h3 className="text-white font-medium text-xs">Arjun Reddy</h3>
                                            <p className="text-[#8899AA] text-[10px]">Head of Talent Acq.</p>
                                        </div>
                                        {viewMode === 'horizontal' && <div className="h-0.5 w-6 bg-[#2A3A4A] absolute left-[-1.5rem] top-1/2"></div>}
                                    </div>

                                    {/* L3 Child 2 */}
                                    <div className="relative flex flex-col items-center">
                                        {viewMode === 'vertical' && <div className="w-0.5 h-6 bg-[#2A3A4A] absolute top-[-1.5rem]"></div>}
                                        <div className="w-48 bg-[#1A2A3A]/40 backdrop-blur-sm border border-[#2A3A4A] rounded-xl p-3 hover:bg-[#1A2A3A] transition-all cursor-pointer z-10 flex items-center justify-between">
                                            <div>
                                                <h3 className="text-white font-medium text-xs">Sarah John</h3>
                                                <p className="text-[#8899AA] text-[10px]">Head of Payroll</p>
                                            </div>
                                            <div className="w-5 h-5 rounded bg-pink-500/10 text-pink-500 text-[10px] flex items-center justify-center font-bold">12</div>
                                        </div>
                                        {viewMode === 'horizontal' && <div className="h-0.5 w-6 bg-[#2A3A4A] absolute left-[-1.5rem] top-1/2"></div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Overlay Actions */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#0B1221] to-transparent flex justify-center pb-8">
                    <span className="px-4 py-2 bg-[#1A2A3A]/80 backdrop-blur border border-[#2A3A4A] text-[#8899AA] text-xs font-medium rounded-full flex items-center gap-2">
                        <kbd className="font-mono bg-[#0B1221] px-1.5 py-0.5 rounded border border-[#2A3A4A]">Cmd</kbd> + Scroll to Zoom • Click and drag to pan
                    </span>
                </div>
            </div>
        </div>
    );
}
