"use client";

import React from "react";
import Link from "next/link";
import {
    MapPin, ChevronRight, Search, Plus, MoreVertical, Edit, Globe
} from "lucide-react";

export default function LocationBranchListScreen() {
    return (
        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-2">
                        <Link href="/dashboard" className="hover:text-white transition-colors">Org & Structure</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-white">Master Data</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <div className="p-2 bg-orange-500/10 rounded-xl border border-orange-500/20">
                            <MapPin className="w-6 h-6 text-orange-500" />
                        </div>
                        Locations & Branches
                    </h1>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#8899AA]" />
                        <input
                            type="text"
                            placeholder="Search locations..."
                            className="bg-[#1A2A3A] border border-[#2A3A4A] text-white text-sm rounded-lg pl-9 pr-4 py-2 w-64 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all placeholder-[#4A5A6A]"
                        />
                    </div>
                    <Link href="/org-chart/locations/edit">
                        <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-lg transition-colors shadow-[0_4px_15px_rgba(249,115,22,0.3)]">
                            <Plus className="w-4 h-4" /> Add Location
                        </button>
                    </Link>
                </div>
            </div>

            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden shadow-lg">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#1A2A3A]/40 border-b border-[#1A2A3A]">
                                <th className="p-4 text-xs font-medium text-[#8899AA] uppercase tracking-wider">Location Code & Name</th>
                                <th className="p-4 text-xs font-medium text-[#8899AA] uppercase tracking-wider">Type</th>
                                <th className="p-4 text-xs font-medium text-[#8899AA] uppercase tracking-wider">City / Region</th>
                                <th className="p-4 text-xs font-medium text-[#8899AA] uppercase tracking-wider">Timezone</th>
                                <th className="p-4 text-xs font-medium text-[#8899AA] uppercase tracking-wider">Active Employees</th>
                                <th className="p-4 text-xs font-medium text-[#8899AA] uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">
                            {[
                                { code: "BLR-H1", name: "Koramangala HQ", type: "Headquarters", city: "Bangalore", tz: "Asia/Kolkata (IST)", count: 680 },
                                { code: "MUM-B1", name: "BKC Sales Office", type: "Branch", city: "Mumbai", tz: "Asia/Kolkata (IST)", count: 124 },
                                { code: "DEL-O1", name: "Gurgaon Hub", type: "Regional Office", city: "Delhi NCR", tz: "Asia/Kolkata (IST)", count: 215 },
                                { code: "HYD-T1", name: "HITEC City Dev Center", type: "R&D Center", city: "Hyderabad", tz: "Asia/Kolkata (IST)", count: 320 },
                                { code: "DXB-M1", name: "MENA Sales", type: "Global Branch", city: "Dubai", tz: "Asia/Dubai (+04)", count: 42 },
                                { code: "SGP-A1", name: "APAC Hub", type: "Global Hub", city: "Singapore", tz: "Asia/Singapore (+08)", count: 85 },
                                { code: "W-FH00", name: "Remote (India)", type: "Virtual", city: "Pan India", tz: "Asia/Kolkata (IST)", count: 412 },
                            ].map((loc, index) => (
                                <tr key={index} className="hover:bg-[#1A2A3A]/20 transition-colors group cursor-pointer">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-[#1A2A3A] border border-[#2A3A4A] flex items-center justify-center text-white font-bold font-mono">
                                                {loc.code.substring(0, 3)}
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-white mb-0.5 group-hover:text-orange-400 transition-colors">{loc.name}</div>
                                                <div className="text-[10px] text-[#8899AA] font-mono">{loc.code}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 text-sm text-white">
                                        <span className={`px-2 py-0.5 rounded text-[10px] border ${loc.type === 'Headquarters' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' :
                                                loc.type === 'Virtual' ? 'bg-[#1A2A3A] text-[#8899AA] border-[#2A3A4A]' :
                                                    'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                            }`}>{loc.type}</span>
                                    </td>
                                    <td className="p-4 text-sm text-[#8899AA]">{loc.city}</td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2 text-xs text-[#8899AA] font-mono truncate max-w-[150px]">
                                            <Globe className="w-3 h-3 shrink-0" /> {loc.tz}
                                        </div>
                                    </td>
                                    <td className="p-4 font-bold text-white">{loc.count}</td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Link href={`/org-chart/locations/edit`}>
                                                <button className="p-2 hover:bg-[#1A2A3A] rounded-lg text-[#8899AA] hover:text-orange-400 transition-colors" title="Edit">
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
    );
}
