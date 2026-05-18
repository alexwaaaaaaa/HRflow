"use client";

import Page from "@/components/ui/Page";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import {
    Building2, ChevronRight, Edit, Users, CreditCard, Crosshair, MapPin,
    ArrowUpRight, Activity, MoreVertical, LayoutGrid
} from "lucide-react";

export default function DepartmentDetailScreen() {
    return (
        <Page
            title="Engineering & Product Tech"
            subtitle="Core technology development and infrastructure team."
            breadcrumbs={[{ label: "Org Chart", href: "/org-chart" }, { label: "Departments", href: "/org-chart/departments" }, { label: "Id" }]}
            maxWidth="1200px"
        >

        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-2">
                        <Link href="/org-chart/departments" className="hover:text-white transition-colors">Departments</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-white">DEPT-001 (Engineering)</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex items-center justify-center text-indigo-400">
                            <Building2 className="w-7 h-7" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                                Engineering & Product Tech
                                <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded text-xs font-semibold tracking-wider uppercase">Active</span>
                            </h1>
                            <p className="text-sm text-[#8899AA] mt-1">Core technology development and infrastructure team.</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 border border-[#2A3A4A] hover:bg-[#1A2A3A] text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2">
                        <MoreVertical className="w-4 h-4" /> Options
                    </button>
                    <Link href="/org-chart/departments/edit?id=DEPT-001">
                        <button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-semibold rounded-lg transition-colors flex items-center gap-2 shadow-[0_4px_15px_rgba(99,102,241,0.3)]">
                            <Edit className="w-4 h-4" /> Edit Details
                        </button>
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

                {/* Left Column: Quick Stats & Hierarchy */}
                <div className="col-span-1 space-y-6">
                    {/* Head of Dept Card */}
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                        <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                            <Users className="w-4 h-4 text-emerald-400" /> Department Head
                        </h3>
                        <div className="flex gap-4 items-center bg-[#1A2A3A]/40 p-4 rounded-xl border border-[#2A3A4A]">
                            <Image src="https://i.pravatar.cc/150?u=2" alt="HOD" width={56} height={56} className="w-14 h-14 rounded-full border-2 border-[#2A3A4A]" />
                            <div>
                                <h4 className="text-white font-bold">Maya Patel</h4>
                                <p className="text-xs text-indigo-400 font-medium mb-1">Chief Tech Officer</p>
                                <p className="text-[10px] text-[#8899AA]">Appointed: Oct 12, 2023</p>
                            </div>
                        </div>
                    </div>

                    {/* Operational Metrics */}
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                        <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                            <Activity className="w-4 h-4 text-amber-500" /> Operational Metrics
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-[#8899AA]">Headcount Utilization</span>
                                    <span className="text-emerald-400 font-bold">94%</span>
                                </div>
                                <div className="h-1.5 w-full bg-[#1A2A3A] rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '94%' }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-[#8899AA]">Budget Utilized (YTD)</span>
                                    <span className="text-amber-500 font-bold">78%</span>
                                </div>
                                <div className="h-1.5 w-full bg-[#1A2A3A] rounded-full overflow-hidden">
                                    <div className="h-full bg-amber-500 rounded-full" style={{ width: '78%' }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-[#8899AA]">Attrition Rate (Rolling 12M)</span>
                                    <span className="text-pink-500 font-bold">12.4%</span>
                                </div>
                                <div className="h-1.5 w-full bg-[#1A2A3A] rounded-full overflow-hidden">
                                    <div className="h-full bg-pink-500 rounded-full" style={{ width: '12.4%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Cost Center Info */}
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                        <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                            <CreditCard className="w-4 h-4 text-pink-500" /> Master Data Links
                        </h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center py-2 border-b border-[#1A2A3A]">
                                <span className="text-xs text-[#8899AA]">Cost Center</span>
                                <Link href="/org-chart/departments" className="text-xs font-bold text-indigo-400 hover:underline flex items-center gap-1">CC-021 (Tech R&D) <ArrowUpRight className="w-3 h-3" /></Link>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-[#1A2A3A]">
                                <span className="text-xs text-[#8899AA]">Parent Dept</span>
                                <span className="text-xs text-white">Top Level (None)</span>
                            </div>
                            <div className="flex justify-between items-center py-2">
                                <span className="text-xs text-[#8899AA]">Primary Location</span>
                                <span className="text-xs text-white flex items-center gap-1"><MapPin className="w-3 h-3" /> BLR-Hub</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Sub-departments & Roles */}
                <div className="col-span-2 space-y-6">

                    {/* Top KPI row */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-4">
                            <p className="text-[#8899AA] text-xs font-medium mb-1">Total Headcount</p>
                            <h4 className="text-2xl font-bold text-white">432</h4>
                        </div>
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-4">
                            <p className="text-[#8899AA] text-xs font-medium mb-1">Open Positions</p>
                            <h4 className="text-2xl font-bold text-amber-500">24</h4>
                        </div>
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-4">
                            <p className="text-[#8899AA] text-xs font-medium mb-1">Annual Budget</p>
                            <h4 className="text-2xl font-bold text-white">₹45.5 Cr</h4>
                        </div>
                    </div>

                    {/* Sub-Departments */}
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                        <div className="p-5 border-b border-[#1A2A3A] flex justify-between items-center bg-[#1A2A3A]/20">
                            <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                <LayoutGrid className="w-4 h-4 text-indigo-400" /> Sub-Departments (Children)
                            </h3>
                            <button className="text-xs font-bold text-indigo-400 hover:text-indigo-300">View Org Tree</button>
                        </div>
                        <div className="p-5 grid grid-cols-2 gap-4">
                            {[
                                { name: "Frontend Engineering", headcount: 120, lead: "Amit K." },
                                { name: "Backend Systems", headcount: 145, lead: "Priya R." },
                                { name: "DevOps & Cloud", headcount: 65, lead: "Rohan G." },
                                { name: "QA / Automation", headcount: 85, lead: "Neha S." },
                            ].map((sub, idx) => (
                                <div key={idx} className="p-4 bg-[#1A2A3A]/40 border border-[#2A3A4A] rounded-xl hover:border-indigo-500/50 transition-colors cursor-pointer group">
                                    <h4 className="text-sm font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">{sub.name}</h4>
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <p className="text-[10px] text-[#8899AA] mb-0.5">Lead</p>
                                            <p className="text-xs text-white">{sub.lead}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] text-[#8899AA] mb-0.5">Headcount</p>
                                            <p className="text-xs font-bold text-emerald-400">{sub.headcount} <Users className="w-3 h-3 inline pb-0.5" /></p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Common Roles List */}
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                        <div className="p-5 border-b border-[#1A2A3A] flex justify-between items-center bg-[#1A2A3A]/20">
                            <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                <Crosshair className="w-4 h-4 text-pink-500" /> Top Roles Distribution
                            </h3>
                            <button className="text-xs font-bold text-indigo-400 hover:text-indigo-300">View All Roles</button>
                        </div>
                        <div className="p-0">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-[#1A2A3A]/40 text-[#8899AA] text-xs">
                                    <tr>
                                        <th className="p-4 font-medium border-b border-[#2A3A4A]">Designation</th>
                                        <th className="p-4 font-medium border-b border-[#2A3A4A]">Grade Code</th>
                                        <th className="p-4 font-medium border-b border-[#2A3A4A]">Headcount</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#1A2A3A]">
                                    {[
                                        { role: "Software Engineer II", grade: "L3", count: 185 },
                                        { role: "Senior Software Eng", grade: "L4", count: 95 },
                                        { role: "QA Automation Eng", grade: "L3", count: 65 },
                                        { role: "Engineering Manager", grade: "M1", count: 28 },
                                        { role: "Staff Engineer", grade: "L5", count: 15 },
                                    ].map((role, idx) => (
                                        <tr key={idx} className="hover:bg-[#1A2A3A]/20 transition-colors">
                                            <td className="p-4 font-medium text-white">{role.role}</td>
                                            <td className="p-4"><span className="px-2 py-1 bg-[#1A2A3A] border border-[#2A3A4A] rounded text-[#8899AA] text-[10px] font-mono">{role.grade}</span></td>
                                            <td className="p-4 text-[#8899AA]">{role.count}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    
        </Page>
    );
}
