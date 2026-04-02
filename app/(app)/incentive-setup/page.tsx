"use client";

import React from "react";
import { Zap, GitMerge, Users, Filter, ArrowRight, CheckCircle2 } from "lucide-react";

export default function IncentiveSetupPage() {
    return (
        <div className="min-h-screen bg-[#060B14] text-white p-6 font-sans">
            <div className="max-w-[1000px] mx-auto space-y-6">

                {/* Page Header */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent flex items-center gap-2">
                            <Zap className="w-6 h-6 text-[#FFB800]" /> One-Time Incentive Builder
                        </h2>
                        <p className="text-gray-400 text-sm mt-1">Configure project bonuses, spot awards, or ad-hoc milestone incentives.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Left Panel: Basics & Eligibility */}
                    <div className="space-y-6 flex flex-col">

                        <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-6">
                            <h3 className="text-lg font-semibold text-white mb-5 flex items-center gap-2"><div className="w-1.5 h-4 bg-[#FFB800] rounded-sm"></div> Incentive Blueprint</h3>

                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Incentive Name</label>
                                    <input type="text" defaultValue="Q3 Delivery Fast-Track Bonus" className="w-full bg-[#060B14] border border-[#1A2A3A] text-white rounded-lg px-4 py-3 outline-none focus:border-[#FFB800] font-medium" />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Payout Type</label>
                                        <select className="w-full bg-[#060B14] border border-[#1A2A3A] text-white rounded-lg px-4 py-3 outline-none focus:border-[#FFB800]">
                                            <option>Fixed Amount (₹)</option>
                                            <option>% of Basic</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Value</label>
                                        <input type="number" defaultValue="25000" className="w-full bg-[#060B14] border border-[#1A2A3A] text-white rounded-lg px-4 py-3 outline-none focus:border-[#FFB800] font-mono" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Criteria / Conditions</label>
                                    <textarea
                                        rows={3}
                                        defaultValue="Paid to team members who successfully delivered the Project Phoenix integration 2 weeks ahead of the November 15th deadline."
                                        className="w-full bg-[#060B14] border border-[#1A2A3A] text-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#FFB800] text-sm resize-none custom-scrollbar"
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-6 flex-1">
                            <h3 className="text-lg font-semibold text-white mb-5 flex items-center gap-2"><Filter className="w-4 h-4 text-gray-400" /> Target Eligibility Filters</h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Department</label>
                                    <div className="flex gap-2 flex-wrap">
                                        <span className="bg-[#00E5A0]/10 border border-[#00E5A0]/20 text-[#00E5A0] px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1 cursor-pointer">Engineering &times;</span>
                                        <span className="bg-[#00E5A0]/10 border border-[#00E5A0]/20 text-[#00E5A0] px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1 cursor-pointer">Product &times;</span>
                                        <span className="bg-[#1A2A3A] text-gray-400 hover:text-white px-3 py-1.5 rounded-full text-sm font-medium border border-transparent cursor-pointer transition-colors">+ Add Dept</span>
                                    </div>
                                </div>

                                <div className="pt-2 border-t border-[#1A2A3A]">
                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 mt-2">Roles / Designations</label>
                                    <div className="flex gap-2 flex-wrap">
                                        <span className="bg-[#1A2A3A] text-gray-300 px-3 py-1.5 rounded-full text-sm font-medium border border-[#334155] flex items-center gap-1 cursor-pointer">All Engineering Roles &times;</span>
                                        <span className="bg-[#1A2A3A] text-gray-300 px-3 py-1.5 rounded-full text-sm font-medium border border-[#334155] flex items-center gap-1 cursor-pointer">Product Manager &times;</span>
                                    </div>
                                </div>

                                <div className="pt-4 flex items-center justify-between bg-[#060B14] p-3 rounded-lg border border-dashed border-[#334155]">
                                    <div className="flex items-center gap-2 text-gray-300">
                                        <Users className="w-4 h-4 text-[#00E5A0]" />
                                        <span className="text-sm font-medium">Eligible Population:</span>
                                    </div>
                                    <span className="text-lg font-bold text-white">45 Employees</span>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Right Panel: Workflow & Actions */}
                    <div className="space-y-6 flex flex-col">

                        <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-6">
                            <h3 className="text-lg font-semibold text-white mb-5 flex items-center gap-2"><GitMerge className="w-5 h-5 text-[#0066FF]" /> Approval Workflow</h3>

                            <div className="bg-[#060B14] border border-[#1A2A3A] rounded-lg p-5">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-8 h-8 rounded-full bg-[#1A2A3A] border border-[#334155] shadow flex items-center justify-center text-xs font-bold text-white z-10">1</div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-white">Line Manager</p>
                                        <p className="text-xs text-gray-500">Approves list of recipients & amounts</p>
                                    </div>
                                </div>

                                <div className="relative pl-4 -mt-8 mb-2">
                                    <div className="absolute left-[15px] top-0 bottom-0 w-0.5 bg-[#1A2A3A]"></div>
                                    <ArrowRight className="w-4 h-4 text-[#1A2A3A] ml-2 my-2 rotate-90" />
                                </div>

                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-8 h-8 rounded-full bg-[#1A2A3A] border border-[#334155] shadow flex items-center justify-center text-xs font-bold text-white z-10 relative">2</div>
                                    <div className="flex-1 relative">
                                        <select className="w-full bg-[#0A1420] border border-[#334155] text-white rounded text-sm px-3 py-1.5 outline-none hover:border-gray-400 transition-colors">
                                            <option>Department Head</option>
                                            <option>HR Head</option>
                                            <option>Finance Controller</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="relative pl-4 -mt-8 mb-2">
                                    <div className="absolute left-[15px] top-0 bottom-0 w-0.5 bg-[#1A2A3A]"></div>
                                    <ArrowRight className="w-4 h-4 text-[#1A2A3A] ml-2 my-2 rotate-90" />
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-full bg-[#00E5A0]/20 border border-[#00E5A0]/50 shadow flex items-center justify-center text-xs font-bold text-[#00E5A0] z-10 relative"><CheckCircle2 className="w-4 h-4" /></div>
                                    <div className="flex-1">
                                        <p className="text-sm font-bold text-[#00E5A0]">Pushed to Payroll</p>
                                        <p className="text-xs text-[#00E5A0]/60">Auto-processed in next cycle</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-[#1A2A3A] to-[#0A1420] border border-[#334155] rounded-xl p-6 flex-1 flex flex-col justify-end shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Zap className="w-32 h-32" />
                            </div>

                            <div className="relative z-10 mb-6">
                                <p className="text-sm text-gray-300 mb-1">Estimated Total Budget Required:</p>
                                <h3 className="text-4xl font-black text-white">₹11,25,000</h3>
                                <p className="text-xs text-[#FFB800] mt-2 font-medium bg-[#FFB800]/10 border border-[#FFB800]/20 px-2 py-1 rounded inline-block">Draft Status</p>
                            </div>

                            <div className="flex gap-3 relative z-10 mt-auto">
                                <button className="flex-1 py-3 bg-transparent border border-gray-500 hover:border-white hover:text-white text-gray-300 rounded-lg text-sm font-bold transition-all">Save as Draft</button>
                                <button className="flex-[2] py-3 bg-[#FFB800] hover:bg-[#FFB800]/90 text-black shadow-lg shadow-[#FFB800]/20 rounded-lg text-sm font-bold transition-all">Create & Initialize Nominations</button>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}
