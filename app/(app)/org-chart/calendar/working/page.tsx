"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    Clock, ChevronRight, Plus, Users, Save, CheckCircle
} from "lucide-react";

export default function WorkingCalendarScreen() {
    const SHIFTS = [
        { id: "S1", name: "General Shift", hours: "09:00 AM - 06:00 PM", days: "Mon-Fri", type: "Standard", assigned: 850 },
        { id: "S2", name: "Morning Shift (EMEA)", hours: "06:00 AM - 03:00 PM", days: "Mon-Fri", type: "Rotational", assigned: 120 },
        { id: "S3", name: "US East Shift", hours: "06:30 PM - 03:30 AM", days: "Mon-Fri", type: "Night", assigned: 230 },
        { id: "S4", name: "Support Rotating (Weekend)", hours: "08:00 AM - 08:00 PM", days: "Sat-Sun", type: "Weekend Only", assigned: 45 },
    ];

    const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const [selectedShift, setSelectedShift] = useState(SHIFTS[0]);

    return (
        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-2">
                        <Link href="/dashboard" className="hover:text-white transition-colors">Org & Structure</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-white">Calendar Settings</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <div className="p-2 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                            <Clock className="w-6 h-6 text-indigo-400" />
                        </div>
                        Working Hours / Shifts
                    </h1>
                </div>

                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-semibold rounded-lg transition-colors flex items-center gap-2 shadow-[0_4px_15px_rgba(99,102,241,0.3)]">
                        <Plus className="w-4 h-4" /> Create Shift Pattern
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* Available Shifts List */}
                <div className="col-span-1 lg:col-span-4 space-y-4">
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-4 h-full flex flex-col">
                        <div className="mb-4">
                            <h3 className="text-sm font-bold text-white">Shift Patterns</h3>
                            <p className="text-xs text-[#8899AA]">Manage default and custom working hours</p>
                        </div>

                        <div className="flex-1 space-y-3 overflow-y-auto custom-scrollbar pr-2">
                            {SHIFTS.map((shift) => (
                                <div
                                    key={shift.id}
                                    onClick={() => setSelectedShift(shift)}
                                    className={`p-4 rounded-xl border transition-all cursor-pointer ${selectedShift.id === shift.id
                                            ? 'bg-indigo-500/10 border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.15)] ring-1 ring-indigo-500/20'
                                            : 'bg-[#1A2A3A]/40 border-[#2A3A4A] hover:bg-[#1A2A3A]/60 hover:border-indigo-500/30'
                                        }`}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-bold text-sm text-white">{shift.name}</h4>
                                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${shift.type === 'Standard' ? 'bg-emerald-500/10 text-emerald-400' :
                                                shift.type === 'Night' ? 'bg-pink-500/10 text-pink-400' :
                                                    'bg-amber-500/10 text-amber-500'
                                            }`}>{shift.type}</span>
                                    </div>
                                    <div className="text-xs text-[#8899AA] mb-2 font-mono bg-[#0B1221] p-1.5 rounded inline-block border border-[#2A3A4A]">
                                        {shift.hours}
                                    </div>
                                    <div className="flex justify-between items-center mt-3 pt-3 border-t border-[#2A3A4A]/50">
                                        <span className="text-[11px] text-[#8899AA]">{shift.days}</span>
                                        <div className="flex items-center gap-1 text-xs font-medium text-white">
                                            <Users className="w-3.5 h-3.5 text-indigo-400" /> {shift.assigned} assigns
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Shift Configuration */}
                <div className="col-span-1 lg:col-span-8">
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl">
                        <div className="p-6 border-b border-[#1A2A3A] flex justify-between items-center">
                            <div>
                                <h2 className="text-xl font-bold text-white mb-1">Editing: {selectedShift.name}</h2>
                                <p className="text-sm text-[#8899AA]">Configure weekly schedule and attendance rules for this pattern.</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded bg-[#1A2A3A] border border-[#2A3A4A] text-emerald-400`}>
                                    <CheckCircle className="w-3.5 h-3.5" /> Default Assignable
                                </span>
                            </div>
                        </div>

                        <div className="p-6 space-y-8">

                            {/* General Settings */}
                            <div>
                                <h3 className="text-sm font-bold border-b border-[#2A3A4A] pb-2 mb-4">Pattern Configuration</h3>
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs text-[#8899AA] mb-1.5">Pattern Name</label>
                                        <input type="text" defaultValue={selectedShift.name} className="w-full bg-[#1A2A3A] border border-[#2A3A4A] rounded-lg px-4 py-2.5 text-sm text-white focus:border-indigo-500 outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-[#8899AA] mb-1.5">Shift Classification</label>
                                        <select className="w-full bg-[#1A2A3A] border border-[#2A3A4A] rounded-lg px-4 py-2.5 text-sm text-white focus:border-indigo-500 outline-none">
                                            <option>Standard Day Shift</option>
                                            <option>Rotational Shift</option>
                                            <option>Night Shift (Allowance Eligible)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Weekly Schedule */}
                            <div>
                                <h3 className="text-sm font-bold border-b border-[#2A3A4A] pb-2 mb-4">Weekly Schedule Builder</h3>
                                <div className="bg-[#0B1221] border border-[#1A2A3A] rounded-xl overflow-hidden">
                                    <table className="w-full text-left">
                                        <thead className="bg-[#1A2A3A]/60 text-xs font-semibold text-[#8899AA]">
                                            <tr>
                                                <th className="p-3">Day</th>
                                                <th className="p-3 text-center">Working Day</th>
                                                <th className="p-3">Start Time</th>
                                                <th className="p-3">End Time</th>
                                                <th className="p-3">Break (Mins)</th>
                                                <th className="p-3">Total Hours</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-[#1A2A3A]">
                                            {DAYS.map((day, idx) => {
                                                const isWeekendInDefault = (day === 'Saturday' || day === 'Sunday') && selectedShift.id !== 'S4';

                                                return (
                                                    <tr key={day} className={`hover:bg-[#1A2A3A]/20 ${isWeekendInDefault ? 'opacity-60' : ''}`}>
                                                        <td className="p-3 text-sm font-medium text-white w-28">{day}</td>
                                                        <td className="p-3 text-center">
                                                            <input type="checkbox" defaultChecked={!isWeekendInDefault} className="rounded border-[#2A3A4A] text-indigo-500 focus:ring-indigo-500 bg-[#1A2A3A]" />
                                                        </td>
                                                        <td className="p-3">
                                                            <select disabled={isWeekendInDefault} defaultValue={isWeekendInDefault ? "" : "09:00"} className="bg-[#1A2A3A] border border-[#2A3A4A] rounded text-xs text-white px-2 py-1.5 focus:border-indigo-500 outline-none disabled:opacity-50">
                                                                <option value="08:00">08:00 AM</option>
                                                                <option value="09:00">09:00 AM</option>
                                                                <option value="10:00">10:00 AM</option>
                                                                <option value="18:00">06:00 PM</option>
                                                                <option value="">-</option>
                                                            </select>
                                                        </td>
                                                        <td className="p-3">
                                                            <select disabled={isWeekendInDefault} defaultValue={isWeekendInDefault ? "" : "18:00"} className="bg-[#1A2A3A] border border-[#2A3A4A] rounded text-xs text-white px-2 py-1.5 focus:border-indigo-500 outline-none disabled:opacity-50">
                                                                <option value="17:00">05:00 PM</option>
                                                                <option value="18:00">06:00 PM</option>
                                                                <option value="19:00">07:00 PM</option>
                                                                <option value="03:00">03:00 AM</option>
                                                                <option value="">-</option>
                                                            </select>
                                                        </td>
                                                        <td className="p-3">
                                                            <input type="number" disabled={isWeekendInDefault} defaultValue={isWeekendInDefault ? "" : "60"} className="w-16 bg-[#1A2A3A] border border-[#2A3A4A] rounded text-xs text-center text-white px-2 py-1.5 focus:border-indigo-500 outline-none disabled:opacity-50" />
                                                        </td>
                                                        <td className="p-3 text-sm text-[#8899AA] font-mono">
                                                            {isWeekendInDefault ? '0h' : '8h'}
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="mt-3 flex justify-end">
                                    <div className="bg-[#1A2A3A] px-3 py-1.5 rounded border border-[#2A3A4A] text-xs">
                                        Weekly Target: <span className="font-bold text-white ml-1">40 Hours</span>
                                    </div>
                                </div>
                            </div>

                            {/* Rules */}
                            <div>
                                <h3 className="text-sm font-bold border-b border-[#2A3A4A] pb-2 mb-4">Attendance Rules</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex justify-between items-center p-3 border border-[#2A3A4A] rounded-lg bg-[#0B1221]">
                                        <div className="text-sm">Grace period for late arrival</div>
                                        <select className="bg-[#1A2A3A] border border-[#2A3A4A] rounded text-xs text-white px-2 py-1">
                                            <option>15 mins</option>
                                            <option>30 mins</option>
                                        </select>
                                    </div>
                                    <div className="flex justify-between items-center p-3 border border-[#2A3A4A] rounded-lg bg-[#0B1221]">
                                        <div className="text-sm">Half-day threshold</div>
                                        <select className="bg-[#1A2A3A] border border-[#2A3A4A] rounded text-xs text-white px-2 py-1">
                                            <option>4 hours</option>
                                            <option>4.5 hours</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="p-4 border-t border-[#1A2A3A] flex justify-end gap-3 bg-[#1A2A3A]/20">
                            <button className="px-4 py-2 border border-[#2A3A4A] hover:bg-[#1A2A3A] text-white text-sm font-medium rounded-lg transition-colors">
                                Cancel
                            </button>
                            <button className="px-5 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-semibold rounded-lg transition-colors shadow-lg">
                                Save Pattern configuration
                            </button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}
