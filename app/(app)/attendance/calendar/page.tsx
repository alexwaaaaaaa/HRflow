"use client";

import Page from "@/components/ui/Page";

import React, { useState } from 'react';
import {
    ChevronLeft, ChevronRight, Calendar as CalIcon, Download,
    CheckCircle2, Clock, XCircle
} from 'lucide-react';

export default function MonthlyCalendarView() {
    const [month, _setMonth] = useState('November 2024');

    // Calendar Matrix (Mocked 30 days)
    const days = [
        { day: 28, date: 'Oct 28', isPrev: true, status: 'Present', in: '09:00', out: '18:05', hrs: '9h 5m' },
        { day: 29, date: 'Oct 29', isPrev: true, status: 'Present', in: '08:55', out: '18:00', hrs: '9h 5m' },
        { day: 30, date: 'Oct 30', isPrev: true, status: 'Late', in: '09:45', out: '18:30', hrs: '8h 45m' },
        { day: 31, date: 'Oct 31', isPrev: true, status: 'Present', in: '08:58', out: '18:00', hrs: '9h 2m' },
        { day: 1, date: 'Nov 1', isPrev: false, status: 'Present', in: '08:50', out: '18:15', hrs: '9h 25m' },
        { day: 2, date: 'Nov 2', isPrev: false, isWeekend: true, status: 'Weekend', in: '--', out: '--', hrs: '--' },
        { day: 3, date: 'Nov 3', isPrev: false, isWeekend: true, status: 'Weekend', in: '--', out: '--', hrs: '--' },
        { day: 4, date: 'Nov 4', isPrev: false, status: 'Present', in: '09:05', out: '18:10', hrs: '9h 5m' },
        { day: 5, date: 'Nov 5', isPrev: false, status: 'Half Day', in: '09:00', out: '13:00', hrs: '4h 0m' },
        { day: 6, date: 'Nov 6', isPrev: false, status: 'Present', in: '08:55', out: '18:00', hrs: '9h 5m' },
        { day: 7, date: 'Nov 7', isPrev: false, status: 'Absent', in: '--', out: '--', hrs: '--' }, // Auto LOP
        { day: 8, date: 'Nov 8', isPrev: false, status: 'Leave', leaveType: 'Sick Leave', in: '--', out: '--', hrs: '--' },
        { day: 9, date: 'Nov 9', isPrev: false, isWeekend: true, status: 'Weekend', in: '--', out: '--', hrs: '--' },
        { day: 10, date: 'Nov 10', isPrev: false, isWeekend: true, status: 'Weekend', in: '--', out: '--', hrs: '--' },
        { day: 11, date: 'Nov 11', isPrev: false, status: 'Late', in: '10:15', out: '18:30', hrs: '8h 15m' },
        { day: 12, date: 'Nov 12', isPrev: false, status: 'Holiday', leaveType: 'Diwali', in: '--', out: '--', hrs: '--' },
        { day: 13, date: 'Nov 13', isPrev: false, status: 'Present', in: '08:58', out: '18:00', hrs: '9h 2m' },
        { day: 14, date: 'Nov 14', isPrev: false, status: 'Present', in: '08:50', out: '18:15', hrs: '9h 25m' },
        { day: 15, date: 'Nov 15', isPrev: false, status: 'Present', in: '08:50', out: '18:15', hrs: '9h 25m' },
        { day: 16, date: 'Nov 16', isPrev: false, isWeekend: true, status: 'Weekend', in: '--', out: '--', hrs: '--' },
        { day: 17, date: 'Nov 17', isPrev: false, isWeekend: true, status: 'Weekend', in: '--', out: '--', hrs: '--' },
        // ... fill rest with present conceptually
    ];

    return (
        <Page
            title="Monthly Calendar View"
            subtitle="Attendance calendar for Arjun Mehta (EMP042)"
            breadcrumbs={[{ label: "Attendance", href: "/attendance/dashboard" }, { label: "Calendar" }]}
            maxWidth="1200px"
        >

        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-1">Monthly Calendar View</h1>
                        <p className="text-sm text-[#8899AA]">Attendance calendar for Arjun Mehta (EMP042)</p>
                    </div>
                    <div className="flex space-x-3">
                        <div className="bg-[#0A1420] border border-[#1A2A3A] px-2 py-1.5 rounded-lg flex items-center space-x-4">
                            <button className="p-1 hover:bg-[#1A2A3A] rounded text-[#8899AA] hover:text-white transition-colors"><ChevronLeft size={18} /></button>
                            <div className="text-sm font-bold text-white flex items-center w-32 justify-center">
                                <CalIcon size={14} className="mr-2 text-[#0066FF]" /> {month}
                            </div>
                            <button className="p-1 hover:bg-[#1A2A3A] rounded text-[#8899AA] hover:text-white transition-colors"><ChevronRight size={18} /></button>
                        </div>
                        <button className="px-4 py-2 border border-[#1A2A3A] bg-[#0A1420] text-sm font-semibold rounded-lg hover:bg-[#1A2A3A] transition-colors flex items-center text-white">
                            <Download size={16} className="mr-2" /> Export
                        </button>
                    </div>
                </div>

                {/* Summary Strip */}
                <div className="grid grid-cols-6 gap-4">
                    <SummaryBox label="Working Days" value="21" />
                    <SummaryBox label="Present" value="16.5" color="text-[#00E5A0]" />
                    <SummaryBox label="Late Arrivals" value="2" color="text-[#FFB800]" />
                    <SummaryBox label="Absent (LOP)" value="1" color="text-[#FF4444]" />
                    <SummaryBox label="Leaves Taken" value="1.5" color="text-[#0066FF]" />
                    <SummaryBox label="Holidays" value="1" />
                </div>

                {/* Calendar Grid */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl overflow-hidden shadow-xl">
                    {/* Days Header */}
                    <div className="grid grid-cols-7 bg-[#0A1420] border-b border-[#1A2A3A] text-xs font-bold text-[#8899AA] uppercase tracking-wider">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
                            <div key={d} className="p-3 text-center border-r border-[#1A2A3A] last:border-0">{d}</div>
                        ))}
                    </div>

                    {/* Matrix */}
                    <div className="grid grid-cols-7 bg-[#060B14]">
                        {days.map((d, i) => (
                            <div key={i} className={`h-32 border-b border-r border-[#1A2A3A] last:border-r-0 p-2 flex flex-col group transition-colors ${d.isPrev ? 'opacity-40' : ''} ${d.isWeekend ? 'bg-[#1A2A3A]/20' : 'hover:bg-[#1A2A3A]/40'} cursor-pointer`}>
                                <div className="flex justify-between items-start mb-2">
                                    <span className={`text-sm font-black ${d.isWeekend || d.status === 'Holiday' ? 'text-[#556677]' : 'text-white'}`}>{d.day}</span>
                                    <StatusIndicator status={d.status} />
                                </div>

                                {d.status === 'Weekend' ? (
                                    <div className="flex-1 flex items-center justify-center">
                                        <span className="text-[10px] font-bold text-[#556677] uppercase tracking-widest rotate-[-15deg]">Weekend</span>
                                    </div>
                                ) : d.status === 'Holiday' ? (
                                    <div className="flex-1 flex flex-col items-center justify-center">
                                        <span className="text-xs font-bold text-[#0066FF] px-2 py-1 bg-[#0066FF]/10 rounded border border-[#0066FF]/20 text-center">{d.leaveType}</span>
                                    </div>
                                ) : d.status === 'Leave' ? (
                                    <div className="flex-1 flex flex-col items-center justify-center">
                                        <span className="text-xs font-bold text-[#FFB800] px-2 py-1 bg-[#FFB800]/10 rounded border border-[#FFB800]/20 text-center">{d.leaveType}</span>
                                    </div>
                                ) : d.status === 'Absent' ? (
                                    <div className="flex-1 flex flex-col items-center justify-center">
                                        <span className="text-[10px] font-bold text-[#FF4444] px-2 py-0.5 bg-[#FF4444]/10 rounded border border-[#FF4444]/20 uppercase">Action Required</span>
                                        <span className="text-[10px] text-[#8899AA] hover:text-white underline mt-1">Regularize</span>
                                    </div>
                                ) : (
                                    <div className="flex-1 flex flex-col justify-end space-y-1 pb-1">
                                        <div className="flex justify-between text-[10px]">
                                            <span className="text-[#8899AA]">In</span>
                                            <span className={`font-bold ${d.status === 'Late' ? 'text-[#FFB800]' : 'text-[#00E5A0]'}`}>{d.in}</span>
                                        </div>
                                        <div className="flex justify-between text-[10px]">
                                            <span className="text-[#8899AA]">Out</span>
                                            <span className="font-bold text-slate-300">{d.out}</span>
                                        </div>
                                        <div className="mt-1 pt-1 border-t border-[#1A2A3A] flex justify-between text-[10px]">
                                            <span className="text-[#556677]">Hrs</span>
                                            <span className="font-mono text-[#8899AA]">{d.hrs}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Legend */}
                <div className="flex space-x-6 text-xs text-[#8899AA] px-4">
                    <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-[#00E5A0] mr-2"></span> Present</div>
                    <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-[#FFB800] mr-2"></span> Late / Half Day</div>
                    <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-[#FF4444] mr-2"></span> Absent (LOP)</div>
                    <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-[#0066FF] mr-2"></span> Approved Leave / Holiday</div>
                </div>

            </div>
        </div>
    
        </Page>
        );
}

function SummaryBox({ label, value, color = 'text-white' }: any) {
    return (
        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-lg p-4 pb-3 flex flex-col justify-between">
            <span className="text-xs text-[#8899AA] font-bold uppercase tracking-wider mb-2">{label}</span>
            <span className={`text-2xl font-black ${color}`}>{value}</span>
        </div>
    );
}

function StatusIndicator({ status }: any) {
    if (status === 'Present') return <CheckCircle2 size={14} className="text-[#00E5A0]" />;
    if (status === 'Late' || status === 'Half Day') return <Clock size={14} className="text-[#FFB800]" />;
    if (status === 'Absent') return <XCircle size={14} className="text-[#FF4444]" />;
    return null;
}
