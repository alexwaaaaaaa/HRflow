"use client";

import Page from "@/components/ui/Page";

import React, { useState } from "react";
import Link from "next/link";
import {
    Calendar, ChevronRight, Plus, MapPin, Search, Edit2, Trash2, CalendarDays
} from "lucide-react";

export default function HolidayCalendarScreen() {
    const [selectedYear, setSelectedYear] = useState("2025");
    const [selectedLocation, setSelectedLocation] = useState("India - All Levels");

    const HOLIDAYS = [
        { name: "New Year's Day", date: "Jan 1, 2025", day: "Wednesday", type: "Mandatory", locations: ["Global"] },
        { name: "Republic Day", date: "Jan 26, 2025", day: "Sunday", type: "Mandatory", locations: ["India"] },
        { name: "Holi", date: "Mar 14, 2025", day: "Friday", type: "Restricted", locations: ["India (North)"] },
        { name: "Good Friday", date: "Apr 18, 2025", day: "Friday", type: "Mandatory", locations: ["Global", "India"] },
        { name: "Labour Day", date: "May 1, 2025", day: "Thursday", type: "Mandatory", locations: ["India", "Europe"] },
        { name: "Independence Day", date: "Aug 15, 2025", day: "Friday", type: "Mandatory", locations: ["India"] },
        { name: "Mahatma Gandhi Jayanti", date: "Oct 2, 2025", day: "Thursday", type: "Mandatory", locations: ["India"] },
        { name: "Dussehra", date: "Oct 2, 2025", day: "Thursday", type: "Restricted", locations: ["India"] },
        { name: "Diwali", date: "Oct 20, 2025", day: "Monday", type: "Mandatory", locations: ["India"] },
        { name: "Christmas Day", date: "Dec 25, 2025", day: "Thursday", type: "Mandatory", locations: ["Global"] },
    ];

    return (
        <Page
            title="Holiday Calendar"
            breadcrumbs={[{ label: "Org Chart", href: "/org-chart" }, { label: "Calendar", href: "/org-chart/calendar" }, { label: "Holiday" }]}
            maxWidth="1200px"
        >

        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-2">
                        <Link href="/dashboard" className="hover:text-white transition-colors">Org & Structure</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-white">Calendar Settings</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <div className="p-2 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                            <CalendarDays className="w-6 h-6 text-emerald-400" />
                        </div>
                        Holiday Calendar
                    </h1>
                </div>

                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 border border-[#2A3A4A] hover:bg-[#1A2A3A] text-white text-sm font-medium rounded-lg transition-colors">
                        Import / Templates
                    </button>
                    <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-lg transition-colors flex items-center gap-2 shadow-[0_4px_15px_rgba(16,185,129,0.3)]">
                        <Plus className="w-4 h-4" /> Add Holiday
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
                {/* Sidebar Controls */}
                <div className="col-span-1 space-y-4">
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5">
                        <h3 className="text-sm font-bold text-white mb-4">Calendar Context</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs text-[#8899AA] mb-1.5 uppercase font-medium tracking-wider">Financial / Leave Year</label>
                                <select
                                    className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded-lg px-4 py-2.5 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
                                    value={selectedYear}
                                    onChange={(e) => setSelectedYear(e.target.value)}
                                >
                                    <option value="2024">2024</option>
                                    <option value="2025">2025</option>
                                    <option value="2026">2026</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs text-[#8899AA] mb-1.5 uppercase font-medium tracking-wider">Location / Group</label>
                                <select
                                    className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded-lg px-4 py-2.5 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
                                    value={selectedLocation}
                                    onChange={(e) => setSelectedLocation(e.target.value)}
                                >
                                    <option value="Global">Global HQ</option>
                                    <option value="India - All Levels">India - All Levels</option>
                                    <option value="US - East Coast">US - East Coast</option>
                                    <option value="EMEA Hub">EMEA Hub</option>
                                </select>
                            </div>
                        </div>

                        <div className="mt-6 pt-5 border-t border-[#1A2A3A]">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm text-[#8899AA]">Total Holidays:</span>
                                <span className="text-lg font-bold text-white">12</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-[#8899AA]">Mandatory:</span>
                                <span className="text-sm font-bold text-emerald-400">10</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-[#8899AA]">Restricted (Optional):</span>
                                <span className="text-sm font-bold text-amber-500">2</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="col-span-3">
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden shadow-lg">
                        <div className="p-4 border-b border-[#1A2A3A] flex justify-between items-center bg-[#1A2A3A]/20">
                            <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-emerald-400" /> Holidays for {selectedLocation} ({selectedYear})
                            </h3>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-[#8899AA]" />
                                <input
                                    type="text"
                                    placeholder="Search holidays..."
                                    className="bg-[#0B1221] border border-[#2A3A4A] text-white text-xs rounded-lg pl-8 pr-3 py-1.5 w-48 focus:outline-none focus:border-emerald-500 transition-colors"
                                />
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-[#1A2A3A]/40 text-[#8899AA] text-xs">
                                    <tr>
                                        <th className="p-4 font-medium border-b border-[#2A3A4A]">Holiday Name</th>
                                        <th className="p-4 font-medium border-b border-[#2A3A4A]">Date</th>
                                        <th className="p-4 font-medium border-b border-[#2A3A4A]">Day</th>
                                        <th className="p-4 font-medium border-b border-[#2A3A4A]">Type</th>
                                        <th className="p-4 font-medium border-b border-[#2A3A4A]">Applicability</th>
                                        <th className="p-4 font-medium border-b border-[#2A3A4A] text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#1A2A3A]">
                                    {HOLIDAYS.map((holiday, idx) => (
                                        <tr key={idx} className="hover:bg-[#1A2A3A]/20 transition-colors group">
                                            <td className="p-4">
                                                <div className="font-bold text-white text-sm">{holiday.name}</div>
                                            </td>
                                            <td className="p-4 text-sm font-medium text-white">{holiday.date}</td>
                                            <td className="p-4 text-sm text-[#8899AA]">{holiday.day}</td>
                                            <td className="p-4">
                                                <span className={`px-2.5 py-1 rounded text-xs font-semibold ${holiday.type === 'Mandatory'
                                                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                                        : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                                                    }`}>
                                                    {holiday.type}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex flex-wrap gap-1">
                                                    {holiday.locations.map((loc, lidx) => (
                                                        <span key={lidx} className="flex items-center gap-1 text-[10px] bg-[#1A2A3A] px-2 py-0.5 rounded-full border border-[#2A3A4A] text-[#8899AA]">
                                                            <MapPin className="w-2.5 h-2.5" /> {loc}
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="p-4 text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button className="p-1.5 hover:bg-[#1A2A3A] rounded text-[#8899AA] hover:text-emerald-400 transition-colors" title="Edit">
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                    <button className="p-1.5 hover:bg-[#1A2A3A] rounded text-[#8899AA] hover:text-pink-500 transition-colors" title="Delete">
                                                        <Trash2 className="w-4 h-4" />
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
            </div>
        </div>
    
        </Page>
    );
}
