"use client";

import React from "react";
import Link from "next/link";
import {
    BarChart, ChevronRight, Save, X, ShieldAlert
} from "lucide-react";

export default function AddEditGradeScreen() {
    return (
        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans">
            <div className="max-w-2xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-2">
                            <Link href="/org-chart/grades" className="hover:text-white transition-colors">Grades</Link>
                            <ChevronRight className="w-4 h-4" />
                            <span className="text-white">New Grade Band</span>
                        </div>
                        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                            <div className="p-2 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                                <BarChart className="w-5 h-5 text-emerald-400" />
                            </div>
                            Create Grade Band
                        </h1>
                    </div>
                </div>

                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl shadow-lg overflow-hidden">
                    <div className="p-8 space-y-6">

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs text-[#8899AA] mb-2 font-medium">Grade Code <span className="text-pink-500">*</span></label>
                                <input
                                    type="text"
                                    className="w-full bg-[#0B1221] border border-[#2A3A4A] text-white rounded-lg px-4 py-2.5 text-sm uppercase focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none transition-all"
                                    placeholder="e.g. L3"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-[#8899AA] mb-2 font-medium">Hierarchy Rank (1-100) <span className="text-pink-500">*</span></label>
                                <input
                                    type="number"
                                    className="w-full bg-[#0B1221] border border-[#2A3A4A] text-white rounded-lg px-4 py-2.5 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none transition-all"
                                    placeholder="Lower number = deeper level"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs text-[#8899AA] mb-2 font-medium">Level Description <span className="text-pink-500">*</span></label>
                            <input
                                type="text"
                                className="w-full bg-[#0B1221] border border-[#2A3A4A] text-white rounded-lg px-4 py-2.5 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none transition-all"
                                placeholder="e.g. Senior Independent Contributor"
                            />
                        </div>

                        <div className="pt-4 border-t border-[#1A2A3A]">
                            <h4 className="text-sm font-bold text-white mb-4">Financial Controls</h4>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs text-[#8899AA] mb-2 font-medium">Minimum Base Pay</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8899AA] text-sm font-mono">₹</span>
                                        <input type="number" className="w-full bg-[#0B1221] border border-[#2A3A4A] text-white rounded-lg pl-8 pr-4 py-2.5 text-sm focus:border-emerald-500 focus:outline-none" placeholder="0.00" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs text-[#8899AA] mb-2 font-medium">Maximum Base Pay</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8899AA] text-sm font-mono">₹</span>
                                        <input type="number" className="w-full bg-[#0B1221] border border-[#2A3A4A] text-white rounded-lg pl-8 pr-4 py-2.5 text-sm focus:border-emerald-500 focus:outline-none" placeholder="0.00" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-start gap-3">
                            <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                            <div>
                                <h4 className="text-sm font-bold text-amber-500">Comp-Ratio Enforced</h4>
                                <p className="text-xs text-[#8899AA] mt-1">Hiring outside this pay band will require Level 2 approval from CFO or CHRO.</p>
                            </div>
                        </div>

                    </div>

                    <div className="p-6 border-t border-[#1A2A3A] bg-[#1A2A3A]/20 flex items-center justify-end gap-4">
                        <Link href="/org-chart/grades">
                            <button className="px-6 py-2 border border-[#2A3A4A] text-white text-sm font-medium rounded-lg hover:bg-[#1A2A3A] transition-colors flex items-center gap-2">
                                <X className="w-4 h-4" /> Cancel
                            </button>
                        </Link>
                        <button className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-bold rounded-lg transition-colors shadow-[0_4px_15px_rgba(16,185,129,0.3)] flex items-center gap-2">
                            <Save className="w-4 h-4" /> Save Grade Band
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
