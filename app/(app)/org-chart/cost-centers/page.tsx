"use client";

import React from "react";
import Link from "next/link";
import {
    Wallet, ChevronRight, Search, Plus, MoreVertical, Edit, FolderInput
} from "lucide-react";

export default function CostCenterListScreen() {
    return (
        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-2">
                        <Link href="/dashboard" className="hover:text-white transition-colors">Org & Structure</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-white">Finance</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <div className="p-2 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                            <Wallet className="w-6 h-6 text-indigo-400" />
                        </div>
                        Cost Centers
                    </h1>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#8899AA]" />
                        <input
                            type="text"
                            placeholder="Search cost centers..."
                            className="bg-[#1A2A3A] border border-[#2A3A4A] text-white text-sm rounded-lg pl-9 pr-4 py-2 w-64 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder-[#4A5A6A]"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#1A2A3A] hover:bg-[#2A3A4A] border border-[#2A3A4A] text-white text-sm font-semibold rounded-lg transition-colors">
                        <FolderInput className="w-4 h-4" /> Import CSV
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-semibold rounded-lg transition-colors shadow-[0_4px_15px_rgba(99,102,241,0.3)]">
                        <Plus className="w-4 h-4" /> Add Cost Center
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="text-[#8899AA] text-sm font-medium mb-1">Total Active CCs</h3>
                    <div className="text-3xl font-bold text-white mb-2">24</div>
                    <p className="text-xs text-[#8899AA]">Across 5 entity codes</p>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="text-[#8899AA] text-sm font-medium mb-1">Total Annual Budget Alloc.</h3>
                    <div className="text-3xl font-bold text-white mb-2">₹185.2 Cr</div>
                    <p className="text-xs text-amber-500">76% utilization YTD</p>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="text-[#8899AA] text-sm font-medium mb-1">Orphaned Headcount</h3>
                    <div className="text-3xl font-bold text-pink-500 mb-2">12</div>
                    <p className="text-xs text-[#8899AA]">Need CC assignment</p>
                </div>
            </div>

            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden shadow-lg">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#1A2A3A]/40 border-b border-[#1A2A3A]">
                                <th className="p-4 text-xs font-medium text-[#8899AA] uppercase tracking-wider">CC Code & Name</th>
                                <th className="p-4 text-xs font-medium text-[#8899AA] uppercase tracking-wider">Owner / Approver</th>
                                <th className="p-4 text-xs font-medium text-[#8899AA] uppercase tracking-wider">Allocated HC</th>
                                <th className="p-4 text-xs font-medium text-[#8899AA] uppercase tracking-wider">Annual Budget</th>
                                <th className="p-4 text-xs font-medium text-[#8899AA] uppercase tracking-wider">Status</th>
                                <th className="p-4 text-xs font-medium text-[#8899AA] uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">
                            {[
                                { code: "CC-9001", name: "Corporate HQ", owner: "Arun Nair (CFO)", hc: 85, budget: "₹12.5 Cr", status: "Active" },
                                { code: "CC-1021", name: "R&D Software BLR", owner: "Maya Patel (CTO)", hc: 310, budget: "₹38.2 Cr", status: "Active" },
                                { code: "CC-1022", name: "R&D Hardware", owner: "Maya Patel (CTO)", hc: 122, budget: "₹18.0 Cr", status: "Active" },
                                { code: "CC-2031", name: "Sales North", owner: "Rohit K.", hc: 85, budget: "₹15.4 Cr", status: "Active" },
                                { code: "CC-2032", name: "Sales South", owner: "Rohit K.", hc: 130, budget: "₹22.1 Cr", status: "Active" },
                                { code: "CC-9900", name: "Discontinued Ops", owner: "--", hc: 0, budget: "₹0.0 Cr", status: "Frozen" },
                            ].map((cc, index) => (
                                <tr key={index} className="hover:bg-[#1A2A3A]/20 transition-colors group cursor-pointer">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-[#1A2A3A] border border-[#2A3A4A] flex items-center justify-center text-indigo-400 font-bold font-mono text-xs">
                                                {cc.code.substring(3)}
                                            </div>
                                            <div>
                                                <Link href={`/org-chart/cost-centers/${cc.code}`}>
                                                    <div className="text-sm font-bold text-white mb-0.5 hover:text-indigo-400 transition-colors">{cc.name}</div>
                                                </Link>
                                                <div className="text-[10px] text-[#8899AA] font-mono">{cc.code}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 text-sm text-[#8899AA]">{cc.owner}</td>
                                    <td className="p-4 font-medium text-white">{cc.hc}</td>
                                    <td className="p-4 text-sm text-[#8899AA]">{cc.budget}</td>
                                    <td className="p-4 text-sm">
                                        <span className={`px-2 py-0.5 rounded text-xs border ${cc.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                                'bg-pink-500/10 text-pink-500 border-pink-500/20'
                                            }`}>{cc.status}</span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 hover:bg-[#1A2A3A] rounded-lg text-[#8899AA] hover:text-indigo-400 transition-colors" title="Edit">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 hover:bg-[#1A2A3A] rounded-lg text-[#8899AA] hover:text-white transition-colors" title="More">
                                                <MoreVertical className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
