"use client";

import Page from "@/components/ui/Page";

import React, { useState } from "react";
import Link from "next/link";
import {
    GitMerge, ChevronRight, Settings, Download, Briefcase, ArrowRight
} from "lucide-react";

export default function WorkforcePlanningScreen() {
    const [activeTab, setActiveTab] = useState("skills");

    return (
        <Page
            title="Workforce Planning (Strategic)"
            subtitle="Require immediate pipeline"
            breadcrumbs={[{ label: "Org Chart", href: "/org-chart" }, { label: "Planning", href: "/org-chart/planning" }, { label: "Workforce" }]}
            maxWidth="1200px"
        >

        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-2">
                        <Link href="/dashboard" className="hover:text-white transition-colors">Org & Structure</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-white">Workforce</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <div className="p-2 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                            <GitMerge className="w-6 h-6 text-emerald-400" />
                        </div>
                        Workforce Planning (Strategic)
                    </h1>
                </div>

                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-[#1A2A3A] border border-[#2A3A4A] hover:bg-[#2A3A4A] text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2">
                        <Download className="w-4 h-4" /> Export Plan
                    </button>
                    <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-lg transition-colors flex items-center gap-2 shadow-[0_4px_15px_rgba(16,185,129,0.3)]">
                        <Settings className="w-4 h-4" /> Configure Scenarios
                    </button>
                </div>
            </div>

            <div className="flex border-b border-[#1A2A3A] mb-8">
                <button
                    onClick={() => setActiveTab("skills")}
                    className={`px-6 py-3 text-sm font-medium border-b-2 flex items-center gap-2 ${activeTab === 'skills' ? 'border-emerald-500 text-emerald-400 bg-emerald-500/5' : 'border-transparent text-[#8899AA] hover:text-white'}`}
                >
                    <Briefcase className="w-4 h-4" /> Skills Gap Analysis
                </button>
                <button
                    onClick={() => setActiveTab("succession")}
                    className={`px-6 py-3 text-sm font-medium border-b-2 flex items-center gap-2 ${activeTab === 'succession' ? 'border-emerald-500 text-emerald-400 bg-emerald-500/5' : 'border-transparent text-[#8899AA] hover:text-white'}`}
                >
                    <ArrowRight className="w-4 h-4" /> Succession & Movement
                </button>
            </div>

            {activeTab === 'skills' && (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                            <h3 className="text-[#8899AA] text-sm font-medium mb-1">Critical Roles with High Risk</h3>
                            <div className="text-3xl font-bold text-pink-500 mb-2">14</div>
                            <p className="text-xs text-[#8899AA]">Require immediate pipeline</p>
                        </div>
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                            <h3 className="text-[#8899AA] text-sm font-medium mb-1">Target Internal Mobility</h3>
                            <div className="text-3xl font-bold text-white mb-2">25%</div>
                            <p className="text-xs text-emerald-400">Current actual: 18%</p>
                        </div>
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                            <h3 className="text-[#8899AA] text-sm font-medium mb-1">Future Skills Deficit</h3>
                            <div className="text-3xl font-bold text-amber-500 mb-2">AI/ML</div>
                            <p className="text-xs text-[#8899AA]">Highest projected demand gap</p>
                        </div>
                    </div>

                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden shadow-lg">
                        <div className="p-5 border-b border-[#1A2A3A] flex justify-between items-center bg-[#1A2A3A]/20">
                            <h3 className="text-sm font-bold text-white">Future Skill Requirements vs Availability</h3>
                            <div className="flex gap-2">
                                <span className="px-3 py-1 bg-[#1A2A3A] border border-[#2A3A4A] rounded text-xs text-[#8899AA]">Horizon: 12-18 Months</span>
                            </div>
                        </div>
                        <table className="w-full text-left">
                            <thead className="bg-[#1A2A3A]/40 text-[#8899AA] text-xs">
                                <tr>
                                    <th className="p-4 font-medium border-b border-[#2A3A4A]">Skill Capability / Job Family</th>
                                    <th className="p-4 font-medium border-b border-[#2A3A4A] text-center">Current HC</th>
                                    <th className="p-4 font-medium border-b border-[#2A3A4A] text-center">Projected Demand</th>
                                    <th className="p-4 font-medium border-b border-[#2A3A4A] text-center">Gap Status</th>
                                    <th className="p-4 font-medium border-b border-[#2A3A4A]">Strategic Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#1A2A3A]">
                                {[
                                    { skill: "Machine Learning / AI", curr: 12, req: 45, gap: -33, action: "Build & Buy", color: "pink" },
                                    { skill: "Cloud Architecture", curr: 25, req: 40, gap: -15, action: "Train Internally", color: "amber" },
                                    { skill: "Legacy System Maint.", curr: 85, req: 40, gap: 45, action: "Redeploy / Transition", color: "emerald" },
                                    { skill: "Data Engineering", curr: 18, req: 30, gap: -12, action: "Hire Externally", color: "amber" },
                                    { skill: "Full Stack Dev (React/Node)", curr: 150, req: 180, gap: -30, action: "Continuous Hiring", color: "white" },
                                ].map((row, idx) => (
                                    <tr key={idx} className="hover:bg-[#1A2A3A]/20 transition-colors">
                                        <td className="p-4 text-sm font-bold text-white">{row.skill}</td>
                                        <td className="p-4 text-sm text-[#8899AA] text-center">{row.curr}</td>
                                        <td className="p-4 text-sm font-bold text-white text-center">{row.req}</td>
                                        <td className="p-4 text-center">
                                            <span className={`px-2.5 py-1 rounded text-xs font-bold font-mono ${row.gap < -20 ? 'bg-pink-500/10 text-pink-500 border border-pink-500/20' :
                                                    row.gap > 0 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                                        'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                                                }`}>
                                                {row.gap > 0 ? '+' : ''}{row.gap}
                                            </span>
                                        </td>
                                        <td className="p-4 text-sm text-[#8899AA]">{row.action}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'succession' && (
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl flex items-center justify-center p-12 text-center h-64">
                    <div>
                        <ArrowRight className="w-12 h-12 text-[#8899AA] mx-auto mb-4 opacity-50" />
                        <h3 className="text-lg font-bold text-white mb-2">Succession Planning Module</h3>
                        <p className="text-[#8899AA] text-sm max-w-sm">Detailed 9-box grid and succession pipeline visualization will be integrated here.</p>
                    </div>
                </div>
            )}
        </div>
    
        </Page>
    );
}
