"use client";

import Page from "@/components/ui/Page";

import React from "react";
import Link from "next/link";
import {
    BarChart, ChevronRight, Search, Plus, MoreVertical, Edit
} from "lucide-react";

export default function GradeBandListScreen() {
    return (
        <Page
            title="Grades & Bands"
            breadcrumbs={[{ label: "Org Chart", href: "/org-chart" }, { label: "Grades" }]}
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
                        <div className="p-2 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                            <BarChart className="w-6 h-6 text-emerald-400" />
                        </div>
                        Grades & Bands
                    </h1>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#8899AA]" />
                        <input
                            type="text"
                            placeholder="Search grades..."
                            className="bg-[#1A2A3A] border border-[#2A3A4A] text-white text-sm rounded-lg pl-9 pr-4 py-2 w-64 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder-[#4A5A6A]"
                        />
                    </div>
                    <Link href="/org-chart/grades/edit">
                        <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-lg transition-colors shadow-[0_4px_15px_rgba(16,185,129,0.3)]">
                            <Plus className="w-4 h-4" /> Add Grade Band
                        </button>
                    </Link>
                </div>
            </div>

            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden shadow-lg">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#1A2A3A]/40 border-b border-[#1A2A3A]">
                                <th className="p-4 text-xs font-medium text-[#8899AA] uppercase tracking-wider">Grade Code</th>
                                <th className="p-4 text-xs font-medium text-[#8899AA] uppercase tracking-wider">Level Description</th>
                                <th className="p-4 text-xs font-medium text-[#8899AA] uppercase tracking-wider">Hierarchy Rank</th>
                                <th className="p-4 text-xs font-medium text-[#8899AA] uppercase tracking-wider">Default Comp Band</th>
                                <th className="p-4 text-xs font-medium text-[#8899AA] uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">
                            {[
                                { code: "L1", desc: "Entry Level / Trainee", rank: 1, band: "₹3L - ₹6L" },
                                { code: "L2", desc: "Associate Specialist", rank: 2, band: "₹6L - ₹12L" },
                                { code: "L3", desc: "Specialist / Mid-Level", rank: 3, band: "₹12L - ₹24L" },
                                { code: "L4", desc: "Senior Specialist / Team Lead", rank: 4, band: "₹24L - ₹45L" },
                                { code: "M1", desc: "Manager", rank: 5, band: "₹35L - ₹65L" },
                                { code: "M2", desc: "Senior Manager", rank: 6, band: "₹50L - ₹90L" },
                                { code: "D1", desc: "Director / Head", rank: 7, band: "₹80L - ₹1.5Cr" },
                                { code: "E1", desc: "Executive / VP", rank: 8, band: "₹1.2Cr - Custom" },
                            ].map((grade, index) => (
                                <tr key={index} className="hover:bg-[#1A2A3A]/20 transition-colors group cursor-pointer">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-[#1A2A3A] border border-[#2A3A4A] flex items-center justify-center text-white font-bold font-mono">
                                                {grade.code}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 text-sm font-medium text-white">{grade.desc}</td>
                                    <td className="p-4 text-sm text-[#8899AA]">Level {grade.rank}</td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2 text-sm text-[#8899AA]">
                                            <span className="px-2 py-1 bg-[#1A2A3A] border border-[#2A3A4A] rounded text-emerald-400 font-mono text-xs">
                                                {grade.band}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Link href={`/org-chart/grades/edit`}>
                                                <button className="p-2 hover:bg-[#1A2A3A] rounded-lg text-[#8899AA] hover:text-emerald-400 transition-colors" title="Edit">
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
