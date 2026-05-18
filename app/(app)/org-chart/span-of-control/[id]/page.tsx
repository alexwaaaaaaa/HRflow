"use client";

import Page from "@/components/ui/Page";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { ChevronRight, Users, AlertTriangle, ArrowLeftRight
} from "lucide-react";

export default function SpanOfControlDetailScreen() {
    return (
        <Page
            title="Manager Analysis: Rahul Sharma"
            subtitle="Role & Department"
            breadcrumbs={[{ label: "Org Chart", href: "/org-chart" }, { label: "Span Of Control", href: "/org-chart/span-of-control" }, { label: "Id" }]}
            maxWidth="1200px"
        >

        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans flex flex-col h-screen overflow-hidden">
            <div className="flex items-center justify-between mb-8 flex-shrink-0">
                <div>
                    <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-2">
                        <Link href="/org-chart/span-of-control" className="hover:text-white transition-colors">Span Analysis</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-white">Rahul Sharma</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <Image src="https://i.pravatar.cc/150?u=mgr0" width={40} height={40} className="w-10 h-10 rounded-full border-2 border-pink-500" alt="mgr" />
                        Manager Analysis: Rahul Sharma
                    </h1>
                </div>

                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-semibold rounded-lg transition-colors shadow-[0_4px_15px_rgba(99,102,241,0.3)]">
                        <ArrowLeftRight className="w-4 h-4" /> Initiate Reorganization
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 flex-shrink-0">
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <p className="text-[#8899AA] text-xs font-medium mb-1 uppercase">Role & Department</p>
                    <div className="text-lg font-bold text-white">VP Sales</div>
                    <p className="text-xs text-indigo-400">Sales & Revenue</p>
                </div>
                <div className="bg-[#1A2A3A] border border-pink-500/50 rounded-2xl p-6 relative overflow-hidden ring-1 ring-pink-500/20 shadow-[0_0_20px_rgba(236,72,153,0.1)]">
                    <div className="flex justify-between items-start mb-1">
                        <p className="text-pink-400/80 text-xs font-bold uppercase">Current Direct Reports</p>
                        <AlertTriangle className="w-5 h-5 text-pink-500" />
                    </div>
                    <div className="text-4xl font-bold text-white mb-1">24</div>
                    <p className="text-[10px] text-pink-400">Critical Exception (&gt;15 limit)</p>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <p className="text-[#8899AA] text-xs font-medium mb-1 uppercase">Total Team Size (Rollup)</p>
                    <div className="text-3xl font-bold text-white mb-2">145</div>
                    <p className="text-xs text-[#8899AA]">Deep hierarchy detected</p>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <p className="text-[#8899AA] text-xs font-medium mb-1 uppercase">Team Attrition Rate</p>
                    <div className="text-3xl font-bold text-amber-500 mb-2">18.5%</div>
                    <p className="text-xs text-[#8899AA]">Higher than org avg (14.6%)</p>
                </div>
            </div>

            <div className="flex-1 bg-[#0D1928] border border-[#1A2A3A] rounded-2xl flex flex-col min-h-0 overflow-hidden">
                <div className="p-5 border-b border-[#1A2A3A] flex justify-between items-center bg-[#1A2A3A]/20">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                        <Users className="w-4 h-4 text-emerald-400" /> Direct Reports Breakdown (24 Total)
                    </h3>
                    <div className="bg-[#0B1221] p-1 rounded-lg border border-[#2A3A4A] flex text-xs">
                        <button className="px-3 py-1 bg-[#2A3A4A] text-white rounded">List View</button>
                        <button className="px-3 py-1 text-[#8899AA] hover:text-white rounded">Chart View</button>
                    </div>
                </div>

                <div className="flex-1 overflow-auto custom-scrollbar p-6">
                    <div className="grid grid-cols-3 gap-4">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 bg-[#1A2A3A]/40 border border-[#2A3A4A] rounded-xl hover:border-indigo-500/30 transition-colors">
                                <Image src={`https://i.pravatar.cc/150?u=rep${i}`} width={40} height={40} className="w-10 h-10 rounded-full" alt="dr" />
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm font-bold text-white truncate">Report Name {i + 1}</div>
                                    <div className="text-[10px] text-[#8899AA] truncate">Regional Sales Manager {i % 3 === 0 ? '(IC)' : '(Mgr)'}</div>
                                </div>
                                {i % 3 !== 0 && (
                                    <div className="flex flex-col items-center justify-center p-1.5 bg-[#0B1221] rounded-md border border-[#2A3A4A]" title="Direct Reports of this employee">
                                        <Users className="w-3 h-3 text-indigo-400 mb-0.5" />
                                        <span className="text-[10px] font-bold text-white">{i * 2 + 3}</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 p-6 bg-indigo-500/5 border border-indigo-500/20 rounded-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <ArrowLeftRight className="w-24 h-24 text-indigo-500" />
                        </div>
                        <h4 className="text-sm font-bold text-indigo-400 mb-2 relative z-10">AI Reorganization Suggestion</h4>
                        <p className="text-sm text-gray-300 max-w-2xl relative z-10 leading-relaxed mb-4">
                            Rahul currently manages 24 direct reports, consisting of 8 Regional Managers and 16 Individual Contributors (Key Account Executives).
                            To reduce span to optimal levels (1:8), consider promoting 2 Regional Managers to "Director of Regional Sales", each taking on 8 Account Executives under them.
                        </p>
                        <button className="px-4 py-2 bg-[#1A2A3A] hover:bg-[#2A3A4A] border border-[#2A3A4A] text-white rounded-lg transition-colors text-xs font-semibold relative z-10 shadow transition-colors">
                            Preview AI Suggestion in Org Chart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    
        </Page>
    );
}
