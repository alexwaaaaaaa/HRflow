"use client";

import Page from "@/components/ui/Page";

import React from "react";
import Link from "next/link";
import {
    Briefcase, ChevronRight, Search, Plus, MoreVertical, Filter, ArrowRight
} from "lucide-react";

export default function OpenPositionsScreen() {
    return (
        <Page
            title="Open Positions"
            subtitle="Across all departments"
            breadcrumbs={[{ label: "Org Chart", href: "/org-chart" }, { label: "Positions", href: "/org-chart/positions" }, { label: "Open" }]}
            maxWidth="1200px"
        >

        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-2">
                        <Link href="/dashboard" className="hover:text-white transition-colors">Org & Structure</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-white">Positions</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <div className="p-2 bg-pink-500/10 rounded-xl border border-pink-500/20">
                            <Briefcase className="w-6 h-6 text-pink-500" />
                        </div>
                        Open Positions
                    </h1>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#8899AA]" />
                        <input
                            type="text"
                            placeholder="Search requisitions..."
                            className="bg-[#1A2A3A] border border-[#2A3A4A] text-white text-sm rounded-lg pl-9 pr-4 py-2 w-64 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all placeholder-[#4A5A6A]"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#1A2A3A] hover:bg-[#2A3A4A] border border-[#2A3A4A] text-white rounded-lg transition-colors text-sm font-medium">
                        <Filter className="w-4 h-4" /> Filter
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white text-sm font-semibold rounded-lg transition-colors shadow-[0_4px_15px_rgba(236,72,153,0.3)]">
                        <Plus className="w-4 h-4" /> New Requisition
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="text-[#8899AA] text-sm font-medium mb-1">Total Open Reqs</h3>
                    <div className="text-3xl font-bold text-white mb-2">84</div>
                    <p className="text-xs text-[#8899AA]">Across all departments</p>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="text-[#8899AA] text-sm font-medium mb-1">Critical / High Priority</h3>
                    <div className="text-3xl font-bold text-pink-500 mb-2">18</div>
                    <p className="text-xs text-[#8899AA]">SLA &lt; 30 days remaining</p>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="text-[#8899AA] text-sm font-medium mb-1">Aging Reqs (&gt;60 days)</h3>
                    <div className="text-3xl font-bold text-amber-500 mb-2">12</div>
                    <p className="text-xs text-[#8899AA]">Require immediate attention</p>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="text-[#8899AA] text-sm font-medium mb-1">Avg Time to Fill (TTF)</h3>
                    <div className="text-3xl font-bold text-white mb-2">42<span className="text-xl font-normal text-[#8899AA]">d</span></div>
                    <p className="text-xs text-emerald-400">-3 days vs last quarter</p>
                </div>
            </div>

            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden shadow-lg">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#1A2A3A]/40 border-b border-[#1A2A3A]">
                                <th className="p-4 text-xs font-medium text-[#8899AA] uppercase tracking-wider">Req ID & Job Title</th>
                                <th className="p-4 text-xs font-medium text-[#8899AA] uppercase tracking-wider">Department</th>
                                <th className="p-4 text-xs font-medium text-[#8899AA] uppercase tracking-wider">Type / Level</th>
                                <th className="p-4 text-xs font-medium text-[#8899AA] uppercase tracking-wider">Aging</th>
                                <th className="p-4 text-xs font-medium text-[#8899AA] uppercase tracking-wider">Status</th>
                                <th className="p-4 text-xs font-medium text-[#8899AA] uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">
                            {[
                                { id: "REQ-2051", title: "Senior AI Engineer", dept: "Engineering", type: "Replacement", level: "L4", aging: 65, priority: "High", status: "Sourcing" },
                                { id: "REQ-2082", title: "Product Marketing Mgr", dept: "Marketing", type: "New Headcount", level: "L3", aging: 22, priority: "Medium", status: "Interviewing" },
                                { id: "REQ-2095", title: "Director of Sales (APAC)", dept: "Sales & Rev", type: "New Headcount", level: "D1", aging: 45, priority: "High", status: "Final Round" },
                                { id: "REQ-2104", title: "HR Business Partner", dept: "Human Resources", type: "Replacement", level: "M1", aging: 12, priority: "Medium", status: "Sourcing" },
                                { id: "REQ-2110", title: "QA Automation Tester", dept: "Engineering", type: "New Headcount", level: "L2", aging: 5, priority: "Low", status: "Approval Pending" },
                            ].map((req, index) => (
                                <tr key={index} className="hover:bg-[#1A2A3A]/20 transition-colors group cursor-pointer">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-2 h-10 rounded-full ${req.priority === 'High' ? 'bg-pink-500' : req.priority === 'Medium' ? 'bg-amber-500' : 'bg-emerald-500'}`}></div>
                                            <div>
                                                <Link href={`/org-chart/positions/open/${req.id}`}>
                                                    <div className="text-sm font-bold text-white mb-0.5 hover:text-pink-400 transition-colors">{req.title}</div>
                                                </Link>
                                                <div className="text-[10px] text-[#8899AA] font-mono">{req.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 text-sm text-[#8899AA]">{req.dept}</td>
                                    <td className="p-4 text-sm">
                                        <div className="text-white">{req.type}</div>
                                        <div className="text-[10px] text-[#8899AA] font-mono mt-0.5">{req.level}</div>
                                    </td>
                                    <td className="p-4">
                                        <div className={`text-sm font-bold flex items-center gap-1.5 ${req.aging > 60 ? 'text-pink-500' : req.aging > 30 ? 'text-amber-500' : 'text-emerald-400'}`}>
                                            {req.aging} days
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2.5 py-1 rounded-md text-xs font-medium border ${req.status === 'Interviewing' || req.status === 'Final Round'
                                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                                : req.status === 'Sourcing'
                                                    ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                                                    : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                                            }`}>
                                            {req.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Link href={`/org-chart/positions/open/${req.id}`}>
                                                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1A2A3A] hover:bg-[#2A3A4A] border border-[#2A3A4A] text-white rounded text-xs transition-colors">
                                                    View <ArrowRight className="w-3 h-3" />
                                                </button>
                                            </Link>
                                            <button className="p-1.5 hover:bg-[#1A2A3A] rounded text-[#8899AA] hover:text-white transition-colors">
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
    
        </Page>
    );
}
