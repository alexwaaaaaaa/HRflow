"use client";

import Page from "@/components/ui/Page";

import React from 'react';
import {
    Clock, Sun, Moon, ChevronLeft, Save,
    Coffee
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ShiftConfiguration() {
    const _router = useRouter();

    return (
        <Page
            title="Create Shift Policy"
            subtitle="Define working hours, breaks, half-day rules and late tracking thresholds."
            breadcrumbs={[{ label: "Attendance", href: "/attendance/dashboard" }, { label: "Settings", href: "/attendance/settings" }, { label: "Shifts", href: "/attendance/settings/shifts" }, { label: "New" }]}
            maxWidth="900px"
        >

        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200 flex flex-col h-screen">
            <div className="max-w-4xl mx-auto w-full flex flex-col flex-1">

                {/* Header */}
                <div className="flex justify-between items-center mb-6 shrink-0">
                    <div className="flex items-center space-x-4">
                        <button
                            className="p-2 bg-[#0D1928] border border-[#1A2A3A] rounded-lg text-[#8899AA] hover:text-white transition-colors"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold text-white mb-1">Create Shift Policy</h1>
                            <p className="text-sm text-[#8899AA]">Define working hours, breaks, half-day rules and late tracking thresholds.</p>
                        </div>
                    </div>
                    <button className="px-5 py-2.5 bg-[#0066FF] text-white font-bold text-sm rounded-lg hover:bg-[#0052cc] transition-colors flex items-center shadow-[0_0_15px_rgba(0,102,255,0.3)]">
                        <Save size={16} className="mr-2" /> Save Shift
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto pr-2 space-y-6 pb-12">

                    {/* Basic Info */}
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-6">
                        <h2 className="text-lg font-bold text-white mb-6 border-b border-[#1A2A3A] pb-4">Basic Details</h2>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-[#8899AA] mb-2">Shift Name</label>
                                <input
                                    type="text"
                                    placeholder="e.g. General Shift (09 to 06)"
                                    className="w-full bg-[#060B14] border border-[#2A3A4A] text-white rounded-lg p-3 outline-none focus:border-[#0066FF] transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-[#8899AA] mb-2">Shift Type</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <label className="flex items-center justify-center space-x-2 bg-[#1A2A3A] border border-[#0066FF] rounded-lg p-3 cursor-pointer text-[#0066FF] bg-[#0066FF]/5">
                                        <input type="radio" name="shiftType" className="sr-only" defaultChecked />
                                        <Sun size={18} /> <span className="text-sm font-bold">Day Shift</span>
                                    </label>
                                    <label className="flex items-center justify-center space-x-2 bg-[#060B14] border border-[#2A3A4A] rounded-lg p-3 cursor-pointer text-[#8899AA] hover:text-white hover:border-[#1A2A3A]">
                                        <input type="radio" name="shiftType" className="sr-only" />
                                        <Moon size={18} /> <span className="text-sm font-bold">Night Shift</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Timings & Breaks */}
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-6 relative overflow-hidden">
                        <h2 className="text-lg font-bold text-white mb-6 border-b border-[#1A2A3A] pb-4">Timings & Gross Hours</h2>

                        <div className="grid grid-cols-12 gap-6">
                            <div className="col-span-4">
                                <label className="block text-sm font-bold text-[#8899AA] mb-2">Shift Start Time</label>
                                <div className="relative">
                                    <Clock size={16} className="absolute left-3 top-3.5 text-[#556677]" />
                                    <input
                                        type="time"
                                        defaultValue="09:00"
                                        className="w-full bg-[#060B14] border border-[#2A3A4A] text-white font-mono text-lg font-bold rounded-lg pl-10 pr-3 py-3 outline-none focus:border-[#0066FF] transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="col-span-4 flex items-center justify-center mt-6">
                                <div className="h-px bg-[#2A3A4A] w-full relative">
                                    <div className="absolute left-1/2 -top-3 -translate-x-1/2 bg-[#060B14] px-3 py-1 text-[10px] text-[#00E5A0] font-bold border border-[#00E5A0]/30 rounded uppercase tracking-widest">
                                        9h 00m
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-4">
                                <label className="block text-sm font-bold text-[#8899AA] mb-2">Shift End Time</label>
                                <div className="relative">
                                    <Clock size={16} className="absolute left-3 top-3.5 text-[#556677]" />
                                    <input
                                        type="time"
                                        defaultValue="18:00"
                                        className="w-full bg-[#060B14] border border-[#2A3A4A] text-white font-mono text-lg font-bold rounded-lg pl-10 pr-3 py-3 outline-none focus:border-[#0066FF] transition-colors"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 p-4 bg-[#060B14] border border-[#1A2A3A] rounded-xl flex items-center justify-between">
                            <div>
                                <h3 className="text-sm font-bold text-white flex items-center mb-1"><Coffee size={16} className="mr-2 text-[#8899AA]" /> Break Duration</h3>
                                <p className="text-xs text-[#8899AA]">Excluded from active working hours computation.</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <input type="number" defaultValue={60} className="w-16 bg-[#1A2A3A] border border-[#2A3A4A] text-center text-white font-bold rounded p-2 outline-none focus:border-[#0066FF]" />
                                <span className="text-sm font-bold text-[#556677]">mins</span>
                            </div>
                        </div>
                    </div>

                    {/* Strict Tracking Rules */}
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-6">
                        <h2 className="text-lg font-bold text-white mb-6 border-b border-[#1A2A3A] pb-4">Late Arrivals & Half-Days</h2>

                        <div className="space-y-6">

                            {/* Grace Period */}
                            <div className="flex items-start justify-between">
                                <div className="flex-1 pr-12">
                                    <h3 className="text-sm font-bold text-white mb-1">Grace Period (Late Arrival)</h3>
                                    <p className="text-xs text-[#8899AA] leading-relaxed">Minutes allowed after Start Time before an employee is marked as 'Late'. E.g. 15 mins means 09:16 AM is late.</p>
                                </div>
                                <div className="flex items-center space-x-2 w-32 border-l border-[#1A2A3A] pl-6">
                                    <input type="number" defaultValue={15} className="w-16 bg-[#060B14] border border-[#2A3A4A] text-center text-white font-bold rounded p-2 outline-none focus:border-[#FFB800]" />
                                    <span className="text-xs font-bold text-[#556677]">mins</span>
                                </div>
                            </div>

                            <hr className="border-[#1A2A3A]" />

                            {/* Half Day Rule */}
                            <div className="flex items-start justify-between">
                                <div className="flex-1 pr-12">
                                    <h3 className="text-sm font-bold text-white mb-1">Half Day Tolerance limit</h3>
                                    <p className="text-xs text-[#8899AA] leading-relaxed">If employee is late beyond this period, the system will automatically mark half-day leave or LOP.</p>
                                </div>
                                <div className="flex items-center space-x-2 w-32 border-l border-[#1A2A3A] pl-6">
                                    <input type="number" defaultValue={120} className="w-16 bg-[#060B14] border border-[#2A3A4A] text-center text-white font-bold rounded p-2 outline-none focus:border-[#FF4444]" />
                                    <span className="text-xs font-bold text-[#556677]">mins</span>
                                </div>
                            </div>

                            <hr className="border-[#1A2A3A]" />

                            {/* Minimum Working Hours */}
                            <div className="flex items-start justify-between">
                                <div className="flex-1 pr-12">
                                    <h3 className="text-sm font-bold text-white mb-1">Minimum Hours for Full Day</h3>
                                    <p className="text-xs text-[#8899AA] leading-relaxed">Required active working hours (Gross Hrs - Breaks) to earn a full present mark. Less time will flag an anomaly.</p>
                                </div>
                                <div className="flex items-center space-x-2 w-32 border-l border-[#1A2A3A] pl-6">
                                    <input type="number" defaultValue={8} className="w-16 bg-[#060B14] border border-[#2A3A4A] text-center text-white font-bold rounded p-2 outline-none focus:border-[#00E5A0]" />
                                    <span className="text-xs font-bold text-[#556677]">hrs</span>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    
        </Page>
        );
}
