"use client";

import Page from "@/components/ui/Page";

import React, { useState } from 'react';
import {
    Calendar, ChevronLeft, ChevronRight, UserCircle2,
    MoreHorizontal, Search, Copy
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ShiftRosterView() {
    const router = useRouter();
    const [week, _setWeek] = useState('04 Nov - 10 Nov 2024');

    const shifts = {
        G: { name: 'General', time: '09:00-18:00', bg: 'bg-[#00E5A0]/10', border: 'border-[#00E5A0]/30', text: 'text-[#00E5A0]' },
        M: { name: 'Morning', time: '06:00-15:00', bg: 'bg-[#FFB800]/10', border: 'border-[#FFB800]/30', text: 'text-[#FFB800]' },
        N: { name: 'Night', time: '22:00-06:00', bg: 'bg-[#0066FF]/10', border: 'border-[#0066FF]/30', text: 'text-[#0066FF]' },
        O: { name: 'Weekly Off', time: '--', bg: 'bg-[#1A2A3A]', border: 'border-[#2A3A4A]', text: 'text-[#556677]' },
    };

    const roster = [
        { emp: 'Ramesh Singh', id: 'EMP041', schedule: ['G', 'G', 'G', 'G', 'G', 'O', 'O'] },
        { emp: 'Priya Desai', id: 'EMP082', schedule: ['G', 'G', 'G', 'G', 'G', 'O', 'O'] },
        { emp: 'Ali Khan', id: 'EMP105', schedule: ['M', 'M', 'M', 'M', 'M', 'O', 'O'] },
        { emp: 'Sonia Varma', id: 'EMP156', schedule: ['O', 'M', 'M', 'M', 'M', 'M', 'O'] },
        { emp: 'Kavya Iyer', id: 'EMP201', schedule: ['N', 'N', 'N', 'N', 'N', 'O', 'O'] },
        { emp: 'Vikram Batra', id: 'EMP255', schedule: ['O', 'O', 'N', 'N', 'N', 'N', 'N'] },
    ];

    return (
        <Page
            title="Shift Roster"
            subtitle="Manage and assign weekly shift schedules for employees."
            breadcrumbs={[{ label: "Attendance", href: "/attendance/dashboard" }, { label: "Shifts", href: "/attendance/shifts" }, { label: "Roster" }]}
            maxWidth="1400px"
        >

        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200 flex flex-col h-screen">
            <div className="max-w-[1400px] mx-auto w-full flex flex-col flex-1">

                {/* Header */}
                <div className="flex justify-between items-center mb-6 shrink-0">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-1">Shift Roster</h1>
                        <p className="text-sm text-[#8899AA]">Manage and assign weekly shift schedules for employees.</p>
                    </div>
                    <div className="flex space-x-3">
                        <button className="px-4 py-2 border border-[#1A2A3A] bg-[#0A1420] text-sm font-semibold rounded-lg hover:bg-[#1A2A3A] transition-colors flex items-center text-white shadow-sm">
                            <Copy size={16} className="mr-2" /> Clone Previous Week
                        </button>
                        <button
                            onClick={() => router.push('/attendance/shifts/assign/bulk')}
                            className="px-4 py-2 bg-[#0066FF] text-white font-bold text-sm rounded-lg hover:bg-[#0052cc] transition-colors shadow-[0_0_15px_rgba(0,102,255,0.3)]"
                        >
                            Bulk Assign Shifts
                        </button>
                    </div>
                </div>

                {/* Toolbar */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl flex items-center justify-between p-3 mb-6 shrink-0">
                    <div className="flex items-center space-x-4">
                        <div className="bg-[#060B14] border border-[#1A2A3A] px-2 py-1.5 rounded-lg flex items-center space-x-3">
                            <button className="p-1 hover:bg-[#1A2A3A] rounded text-[#8899AA] hover:text-white transition-colors"><ChevronLeft size={18} /></button>
                            <div className="text-sm font-bold text-white flex items-center w-40 justify-center">
                                <Calendar size={14} className="mr-2 text-[#0066FF]" /> {week}
                            </div>
                            <button className="p-1 hover:bg-[#1A2A3A] rounded text-[#8899AA] hover:text-white transition-colors"><ChevronRight size={18} /></button>
                        </div>
                        <div className="h-6 w-px bg-[#1A2A3A]"></div>
                        <div className="relative">
                            <Search size={16} className="absolute left-3 top-2.5 text-[#556677]" />
                            <input
                                type="text"
                                placeholder="Search employees..."
                                className="bg-[#060B14] border border-[#1A2A3A] text-sm text-white rounded-lg pl-9 pr-3 py-2 outline-none focus:border-[#0066FF] w-64"
                            />
                        </div>
                    </div>

                    <div className="flex items-center space-x-6 text-xs font-bold px-4 border-l border-[#1A2A3A]">
                        <span className="text-[#8899AA] uppercase tracking-wider">Legend:</span>
                        {Object.entries(shifts).map(([key, val]) => (
                            <div key={key} className="flex items-center space-x-1.5">
                                <div className={`w-4 h-4 rounded flex items-center justify-center border ${val.bg} ${val.border} ${val.text}`}>
                                    {key}
                                </div>
                                <span className={val.text}>{val.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Roster Matrix */}
                <div className="flex-1 bg-[#0D1928] border border-[#1A2A3A] rounded-xl overflow-hidden shadow-xl flex flex-col relative">
                    <div className="overflow-x-auto overflow-y-auto flex-1 h-0">
                        <table className="w-full text-left text-sm whitespace-nowrap min-w-[1000px]">
                            <thead className="bg-[#0A1420] sticky top-0 z-10 shadow-sm">
                                <tr>
                                    <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider border-b border-[#1A2A3A] w-64 sticky left-0 bg-[#0A1420] z-20">Employee</th>
                                    <th className="px-4 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider text-center border-b border-[#1A2A3A]">
                                        <div>04 Nov</div><div className="text-white mt-0.5">Mon</div>
                                    </th>
                                    <th className="px-4 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider text-center border-b border-[#1A2A3A]">
                                        <div>05 Nov</div><div className="text-white mt-0.5">Tue</div>
                                    </th>
                                    <th className="px-4 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider text-center border-b border-[#1A2A3A]">
                                        <div>06 Nov</div><div className="text-white mt-0.5">Wed</div>
                                    </th>
                                    <th className="px-4 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider text-center border-b border-[#1A2A3A]">
                                        <div>07 Nov</div><div className="text-white mt-0.5">Thu</div>
                                    </th>
                                    <th className="px-4 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider text-center border-b border-[#1A2A3A]">
                                        <div>08 Nov</div><div className="text-white mt-0.5">Fri</div>
                                    </th>
                                    <th className="px-4 py-4 font-bold text-xs text-[#556677] uppercase tracking-wider text-center border-b border-[#1A2A3A] bg-[#1A2A3A]/20">
                                        <div>09 Nov</div><div className="mt-0.5">Sat</div>
                                    </th>
                                    <th className="px-4 py-4 font-bold text-xs text-[#556677] uppercase tracking-wider text-center border-b border-[#1A2A3A] bg-[#1A2A3A]/20">
                                        <div>10 Nov</div><div className="mt-0.5">Sun</div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#1A2A3A]">
                                {roster.map((row, i) => (
                                    <tr key={i} className="hover:bg-[#1A2A3A]/30 transition-colors">

                                        {/* Sticky Employee Col */}
                                        <td className="px-6 py-3 sticky left-0 bg-[#0D1928] z-10 border-r border-[#1A2A3A]">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-8 h-8 rounded-full bg-[#1A2A3A] flex items-center justify-center text-xs font-bold text-[#8899AA] border border-[#2A3A4A]">
                                                    <UserCircle2 size={16} />
                                                </div>
                                                <div>
                                                    <div className="font-bold text-white">{row.emp}</div>
                                                    <div className="text-xs text-[#8899AA]">{row.id}</div>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Shift cells */}
                                        {row.schedule.map((shiftKey, dayIndex) => {
                                            // @ts-expect-error: dynamic index
                                            const s = shifts[shiftKey];
                                            const isWeekend = dayIndex >= 5;
                                            return (
                                                <td key={dayIndex} className={`px-2 py-3 text-center ${isWeekend ? 'bg-[#1A2A3A]/10' : ''}`}>
                                                    <div className={`mx-auto w-24 rounded-lg border ${s.bg} ${s.border} p-1.5 flex flex-col items-center justify-center cursor-pointer hover:border-[#0066FF] transition-colors group relative`}>
                                                        <span className={`text-base font-black ${s.text}`}>{shiftKey}</span>
                                                        <span className="text-[9px] text-slate-300 font-mono mt-0.5">{s.time}</span>

                                                        {/* Edit Overlay */}
                                                        <div className="absolute inset-0 bg-[#0A1420]/80 backdrop-blur-[2px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center border border-[#0066FF]">
                                                            <MoreHorizontal size={16} className="text-white" />
                                                        </div>
                                                    </div>
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    
        </Page>
        );
}
