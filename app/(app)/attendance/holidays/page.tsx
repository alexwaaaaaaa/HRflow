"use client";

import React, { useState } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";

interface Holiday { date: string; name: string; type: "national" | "regional" | "optional"; day: string; wday: string; }

const HOLIDAYS_2024: Holiday[] = [
    { date: "26 Jan", name: "Republic Day", type: "national", day: "26", wday: "Fri" },
    { date: "14 Apr", name: "Dr. Ambedkar Jayanti", type: "national", day: "14", wday: "Sun" },
    { date: "17 Apr", name: "Good Friday", type: "national", day: "17", wday: "Fri" },
    { date: "01 May", name: "Maharashtra Day", type: "regional", day: "01", wday: "Wed" },
    { date: "15 Aug", name: "Independence Day", type: "national", day: "15", wday: "Thu" },
    { date: "02 Oct", name: "Gandhi Jayanti", type: "national", day: "02", wday: "Wed" },
    { date: "02 Nov", name: "Diwali (Naraka Chaturdashi):", type: "national", day: "02", wday: "Sat" },
    { date: "06 Nov", name: "Diwali (Laxmi Puja)", type: "national", day: "06", wday: "Wed" },
    { date: "07 Nov", name: "Diwali (Govardhan Puja)", type: "optional", day: "07", wday: "Thu" },
    { date: "15 Nov", name: "Guru Nanak Jayanti", type: "optional", day: "15", wday: "Fri" },
    { date: "25 Dec", name: "Christmas Day", type: "national", day: "25", wday: "Wed" },
];

const TYPE_CFG: Record<string, { cls: string; label: string }> = {
    national: { cls: "bg-[#00E5A0]/10 text-[#00E5A0] border border-[#00E5A0]/30", label: "National" },
    regional: { cls: "bg-[#0066FF]/10 text-[#0066FF] border border-[#0066FF]/30", label: "Regional" },
    optional: { cls: "bg-[#FFB800]/10 text-[#FFB800] border border-[#FFB800]/30", label: "Optional" },
};

export default function HolidayCalendar() {
    const [holidays, setHolidays] = useState(HOLIDAYS_2024);

    return (
        <div className="p-6 md:p-8 max-w-[1200px] mx-auto text-white">
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                <div>
                    <h2 className="text-2xl font-bold">Holiday Calendar 2024–25</h2>
                    <p className="text-sm text-[#8899AA]">{holidays.length} holidays • Maharashtra region</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 border border-[#1A2A3A] text-sm text-[#8899AA] rounded-xl hover:bg-[#1A2A3A]">Import from Template</button>
                    <button className="px-4 py-2 bg-[#00E5A0] text-[#060B14] text-sm font-bold rounded-xl hover:bg-[#00c98d] flex items-center gap-2">
                        <Plus className="w-4 h-4" /> Add Holiday
                    </button>
                </div>
            </div>

            {/* STATE SELECTOR */}
            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5 mb-6">
                <div className="flex flex-wrap gap-6 items-center">
                    <div>
                        <label className="text-xs text-[#8899AA] block mb-1">Applicable State</label>
                        <select className="bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#00E5A0]">
                            <option>Maharashtra</option><option>Karnataka</option><option>Delhi</option><option>Tamil Nadu</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-xs text-[#8899AA] block mb-1">Year</label>
                        <select className="bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#00E5A0]">
                            <option>2024–25</option><option>2025–26</option>
                        </select>
                    </div>
                    <div className="flex gap-4 flex-wrap">
                        {Object.entries(TYPE_CFG).map(([k, v]) => (
                            <span key={k} className="flex items-center gap-1.5 text-xs text-[#8899AA]">
                                <span className={`w-3 h-3 rounded ${v.cls.split(" ")[0]}`}></span>{v.label}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* CALENDAR MONTH VIEW */}
                <div className="flex-1 bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="font-semibold mb-4">November 2024</h3>
                    <div className="grid grid-cols-7 gap-1 text-center text-xs text-[#445566] mb-2">
                        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => <div key={i}>{d}</div>)}
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                        {[...Array(4)].map((_, i) => <div key={i} />)}
                        {Array.from({ length: 30 }, (_, i) => i + 1).map(d => {
                            const holiday = holidays.find(h => parseInt(h.day) === d && h.date.includes("Nov"));
                            const isWeekend = (d + 4) % 7 === 5 || (d + 4) % 7 === 6;
                            return (
                                <div key={d} className={`aspect-square rounded-lg flex flex-col items-center justify-center text-xs transition-all ${holiday ? TYPE_CFG[holiday.type].cls : isWeekend ? "bg-[#1A2A3A]/40 text-[#445566]" : "hover:bg-[#1A2A3A] text-[#8899AA] cursor-pointer"
                                    }`}>
                                    <span className="font-semibold">{d}</span>
                                    {holiday && <span className="text-[8px] leading-tight text-center px-0.5 mt-0.5 truncate max-w-full">🎉</span>}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* TABLE */}
                <div className="flex-1 bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-[#0A1420] text-[#8899AA] text-xs">
                                <tr>
                                    <th className="px-4 py-3 text-left">Date</th>
                                    <th className="px-4 py-3 text-left">Holiday</th>
                                    <th className="px-4 py-3 text-center">Type</th>
                                    <th className="px-4 py-3 text-center">Day</th>
                                    <th className="px-4 py-3 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#1A2A3A]">
                                {holidays.map((h, i) => (
                                    <tr key={i} className="hover:bg-[#1A2A3A]/50 transition-colors">
                                        <td className="px-4 py-3 font-medium">{h.date}</td>
                                        <td className="px-4 py-3">{h.name}</td>
                                        <td className="px-4 py-3 text-center">
                                            <span className={`text-xs px-2 py-0.5 rounded-full ${TYPE_CFG[h.type].cls}`}>{TYPE_CFG[h.type].label}</span>
                                        </td>
                                        <td className="px-4 py-3 text-center text-[#8899AA]">{h.wday}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex gap-1 justify-center">
                                                <button className="p-1 hover:bg-[#1A2A3A] rounded"><Edit2 className="w-3 h-3 text-[#8899AA]" /></button>
                                                <button onClick={() => setHolidays(list => list.filter((_, j) => j !== i))}
                                                    className="p-1 hover:bg-[#FF4444]/10 rounded"><Trash2 className="w-3 h-3 text-[#FF4444]" /></button>
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
    );
}
