"use client";

import Page from "@/components/ui/Page";

import React from "react";
import Link from "next/link";
import {
    Award, ChevronRight, Search, Plus, MoreVertical, Edit, Users, Navigation
} from "lucide-react";

export default function DesignationListScreen() {
    return (
        <Page
            title="Designation Master"
            breadcrumbs={[{ label: "Org Chart", href: "/org-chart" }, { label: "Designations" }]}
            maxWidth="1200px"
        >

        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-2">
                        <Link href="/dashboard" className="hover:text-white transition-colors">Org & Structure</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-white">Master Data</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <div className="p-2 bg-pink-500/10 rounded-xl border border-pink-500/20">
                            <Award className="w-6 h-6 text-pink-500" />
                        </div>
                        Designation Master
                    </h1>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#8899AA]" />
                        <input
                            type="text"
                            placeholder="Search designations..."
                            className="bg-[#1A2A3A] border border-[#2A3A4A] text-white text-sm rounded-lg pl-9 pr-4 py-2 w-64 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all placeholder-[#4A5A6A]"
                        />
                    </div>
                    <Link href="/org-chart/designations/edit">
                        <button className="flex items-center gap-2 px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white text-sm font-semibold rounded-lg transition-colors shadow-[0_4px_15px_rgba(236,72,153,0.3)]">
                            <Plus className="w-4 h-4" /> Add Designation
                        </button>
                    </Link>
                </div>
            </div>

            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden shadow-lg">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#1A2A3A]/40 border-b border-[#1A2A3A]">
                                <th className="p-4 text-xs font-medium text-[#8899AA] uppercase tracking-wider">Designation / Title</th>
                                <th className="p-4 text-xs font-medium text-[#8899AA] uppercase tracking-wider">Auto Grade Mapping</th>
                                <th className="p-4 text-xs font-medium text-[#8899AA] uppercase tracking-wider">Track / Level</th>
                                <th className="p-4 text-xs font-medium text-[#8899AA] uppercase tracking-wider">Active Emp Count</th>
                                <th className="p-4 text-xs font-medium text-[#8899AA] uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">
                            {[
                                { title: "Software Engineer I", grade: "L2", track: "Individual Contributor", count: 145 },
                                { title: "Software Engineer II", grade: "L3", track: "Individual Contributor", count: 210 },
                                { title: "Senior Software Engineer", grade: "L4", track: "Individual Contributor", count: 180 },
                                { title: "Engineering Manager", grade: "M1", track: "Management", count: 42 },
                                { title: "Senior Eng Manager", grade: "M2", track: "Management", count: 18 },
                                { title: "Director of Engineering", grade: "D1", track: "Executive", count: 8 },
                                { title: "Product Manager", grade: "L4", track: "Individual Contributor", count: 35 },
                                { title: "Data Scientist", grade: "L3", track: "Individual Contributor", count: 22 },
                            ].map((role, index) => (
                                <tr key={index} className="hover:bg-[#1A2A3A]/20 transition-colors group cursor-pointer">
                                    <td className="p-4">
                                        <div className="text-sm font-bold text-white mb-0.5">{role.title}</div>
                                        <div className="text-[10px] text-[#8899AA] font-mono">DESG-10{index + 1}</div>
                                    </td>
                                    <td className="p-4">
                                        <span className="px-2.5 py-1 bg-[#1A2A3A] border border-[#2A3A4A] rounded text-[#8899AA] text-xs font-mono font-bold">
                                            {role.grade}
                                        </span>
                                    </td>
                                    <td className="p-4 text-sm text-[#8899AA]">
                                        <div className="flex items-center gap-2">
                                            <Navigation className={`w-3 h-3 ${role.track === 'Management' ? 'text-amber-500' : role.track === 'Executive' ? 'text-pink-500' : 'text-indigo-400'}`} />
                                            {role.track}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2 text-sm text-[#8899AA]">
                                            <Users className="w-4 h-4" /> {role.count}
                                        </div>
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Link href={`/org-chart/designations/edit`}>
                                                <button className="p-2 hover:bg-[#1A2A3A] rounded-lg text-[#8899AA] hover:text-pink-500 transition-colors" title="Edit">
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                            </Link>
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
    
        </Page>
    );
}
