"use client";

import Page from "@/components/ui/Page";

import React, { useState } from 'react';
import {
    Calendar, ChevronLeft, ChevronRight,
    Save, CheckCircle2, UserCircle2, AlertTriangle
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SingleShiftAssign() {
    const router = useRouter();
    const employee = { name: 'Aditi Sharma', id: 'EMP102', role: 'Support Executive', dept: 'Customer Success' };

    const shifts = [
        { id: 'M', name: 'Morning', time: '06:00-15:00', bg: 'bg-[#FFB800]/10', border: 'border-[#FFB800]/30', text: 'text-[#FFB800]' },
        { id: 'G', name: 'General', time: '09:00-18:00', bg: 'bg-[#00E5A0]/10', border: 'border-[#00E5A0]/30', text: 'text-[#00E5A0]' },
        { id: 'N', name: 'Night', time: '22:00-06:00', bg: 'bg-[#0066FF]/10', border: 'border-[#0066FF]/30', text: 'text-[#0066FF]' },
        { id: 'O', name: 'Weekly Off', time: 'Rest Day', bg: 'bg-[#1A2A3A]', border: 'border-[#2A3A4A]', text: 'text-[#556677]' },
    ];

    const currentWeekDates = ['Mon, 04', 'Tue, 05', 'Wed, 06', 'Thu, 07', 'Fri, 08', 'Sat, 09', 'Sun, 10'];
    const [assignedShifts, setAssignedShifts] = useState(['M', 'M', 'M', 'N', 'N', 'O', 'O']);

    const selectShift = (dayIndex: number, shiftId: string) => {
        const newShifts = [...assignedShifts];
        newShifts[dayIndex] = shiftId;
        setAssignedShifts(newShifts);
    };

    return (
        <Page
            title="Assign Individual Shift"
            subtitle="Custom schedule override for specific week."
            breadcrumbs={[{ label: "Attendance", href: "/attendance/dashboard" }, { label: "Shifts", href: "/attendance/shifts" }, { label: "Assign" }]}
            maxWidth="900px"
        >

        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-4xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => router.push('/attendance/shifts/roster')}
                            className="p-2 bg-[#0D1928] border border-[#1A2A3A] rounded-lg text-[#8899AA] hover:text-white transition-colors"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold text-white mb-1">Assign Individual Shift</h1>
                            <p className="text-sm text-[#8899AA]">Custom schedule override for specific week.</p>
                        </div>
                    </div>
                </div>

                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl overflow-hidden">

                    {/* Employee Block */}
                    <div className="p-6 bg-[#0A1420] border-b border-[#1A2A3A] flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-full bg-[#1A2A3A] border border-[#2A3A4A] flex items-center justify-center text-[#8899AA]">
                                <UserCircle2 size={24} />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-white">{employee.name}</h2>
                                <div className="text-sm text-[#8899AA]">{employee.id} • {employee.role} ({employee.dept})</div>
                            </div>
                        </div>

                        <div className="bg-[#060B14] border border-[#1A2A3A] px-3 py-2 rounded-lg flex items-center space-x-4">
                            <button className="text-[#8899AA] hover:text-white transition-colors"><ChevronLeft size={16} /></button>
                            <div className="text-sm font-bold text-white flex items-center">
                                <Calendar size={14} className="mr-2 text-[#0066FF]" /> 04 Nov - 10 Nov 2024
                            </div>
                            <button className="text-[#8899AA] hover:text-white transition-colors"><ChevronRight size={16} /></button>
                        </div>
                    </div>

                    {/* Schedule Builder */}
                    <div className="p-6">
                        <h3 className="text-sm font-bold text-white mb-4">Weekly Schedule Builder</h3>

                        <div className="grid gap-3">
                            {currentWeekDates.map((dayLabel, index) => {
                                const _currentShift = shifts.find(s => s.id === assignedShifts[index]);
                                const isWeekend = index >= 5;

                                return (
                                    <div key={index} className={`flex items-center border border-[#1A2A3A] rounded-lg p-2 ${isWeekend ? 'bg-[#1A2A3A]/10' : 'bg-[#060B14]'}`}>

                                        <div className="w-24 text-sm font-bold text-[#8899AA] pl-2">
                                            {dayLabel}
                                        </div>

                                        <div className="flex-1 flex space-x-2">
                                            {shifts.map(shiftVal => (
                                                <button
                                                    key={shiftVal.id}
                                                    onClick={() => selectShift(index, shiftVal.id)}
                                                    className={`flex-1 py-3 px-2 rounded-md border text-sm font-bold transition-all relative overflow-hidden ${assignedShifts[index] === shiftVal.id
                                                            ? `${shiftVal.bg} ${shiftVal.border} ${shiftVal.text} shadow-[0_0_10px_rgba(0,0,0,0.5)]`
                                                            : 'bg-transparent border-[#2A3A4A] text-[#556677] hover:border-[#556677] hover:text-[#8899AA]'
                                                        }`}
                                                >
                                                    {assignedShifts[index] === shiftVal.id && (
                                                        <div className="absolute top-1 right-1"><CheckCircle2 size={12} /></div>
                                                    )}
                                                    <div>{shiftVal.name}</div>
                                                    <div className="text-[10px] font-mono mt-1 opacity-80">{shiftVal.time}</div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Warnings block */}
                        <div className="justify-between items-start mt-6 p-4 bg-[#FFB800]/5 border border-[#FFB800]/20 rounded-xl flex hidden">
                            {/* Example validation if Night shift is immediately followed by Morning */}
                            {assignedShifts[4] === 'N' && assignedShifts[5] === 'M' && (
                                <div className="flex items-start text-sm">
                                    <AlertTriangle size={16} className="text-[#FFB800] mr-2 mt-0.5" />
                                    <div>
                                        <span className="font-bold text-[#FFB800]">Scheduling Collision</span>
                                        <p className="text-[#8899AA]">Less than 12 hours gap between Friday Night Shift and Saturday Morning Shift.</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="px-6 py-4 border-t border-[#1A2A3A] bg-[#0A1420] flex justify-between items-center">
                        <div className="text-xs text-[#556677]">Changes instantly applied to employee app upon save.</div>
                        <div className="flex space-x-3">
                            <button className="px-5 py-2.5 text-sm font-bold text-[#8899AA] hover:text-white transition-colors">Cancel</button>
                            <button className="px-5 py-2.5 bg-[#0066FF] text-white font-bold text-sm rounded-lg shadow-lg shadow-[#0066FF]/20 flex items-center hover:bg-[#0052cc] transition-colors">
                                <Save size={16} className="mr-2" /> Save Individual Roster
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    
        </Page>
        );
}
