"use client";

import Page from "@/components/ui/Page";

import React, { useState } from 'react';
import { MapPin, Download, ChevronRight,
    Calendar as CalIcon, Edit3, Fingerprint, Lock, AlertCircle, Monitor
} from 'lucide-react';

export default function EmployeeCheckInLog() {
    const [date, setDate] = useState('2024-11-20');

    // Mocks
    const logs = [
        { time: '08:52 AM', type: 'IN', source: 'Biometric (BLR_Main_01)', location: 'Bengaluru, Koramangala', verified: true, method: 'Fingerprint' },
        { time: '12:30 PM', type: 'OUT', source: 'Biometric (BLR_Main_01)', location: 'Bengaluru, Koramangala', verified: true, method: 'Fingerprint' },
        { time: '01:15 PM', type: 'IN', source: 'Mobile App', location: 'Bengaluru, Koramangala (Geofence Verified)', verified: true, method: 'GPS + Face' },
        { time: '06:10 PM', type: 'OUT', source: 'Mobile App', location: 'Outer Ring Road (Out of Geofence)', verified: false, method: 'GPS' },
    ];

    return (
        <Page
            title="Detailed Punch Log"
            breadcrumbs={[{ label: "Attendance", href: "/attendance/dashboard" }, { label: "Log" }]}
            maxWidth="1400px"
        >

        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-5xl mx-auto space-y-6">

                {/* Header & Breadcrumb */}
                <div className="flex flex-col space-y-2 mb-2">
                    <div className="flex items-center space-x-2 text-xs text-[#8899AA]">
                        <span className="hover:text-white cursor-pointer">Attendance</span>
                        <ChevronRight size={14} />
                        <span className="hover:text-white cursor-pointer">Live View</span>
                        <ChevronRight size={14} />
                        <span className="text-[#00E5A0]">Employee Punch Log</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-white mb-1">Detailed Punch Log</h1>
                        <button className="px-4 py-2 border border-[#1A2A3A] bg-[#0D1928] text-sm font-semibold rounded-lg hover:bg-[#1A2A3A] transition-colors flex items-center text-white">
                            <Download size={16} className="mr-2" /> Download Log
                        </button>
                    </div>
                </div>

                {/* Employee Strip */}
                <div className="bg-[#1A2A3A]/40 border border-[#2A3A4A] px-6 py-4 rounded-xl flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full bg-[#0066FF] flex items-center justify-center font-bold text-white text-lg border-2 border-[#1A2A3A]">
                            AM
                        </div>
                        <div>
                            <div className="text-base font-bold text-white">Arjun Mehta <span className="text-xs bg-[#060B14] border border-[#2A3A4A] px-2 py-0.5 rounded ml-2 text-[#8899AA]">EMP042</span></div>
                            <div className="text-sm text-[#8899AA] mt-0.5">Senior Product Designer • Product Team</div>
                        </div>
                    </div>
                    <div className="flex items-center space-x-6 text-sm">
                        <div className="text-right">
                            <div className="text-xs text-[#8899AA] mb-0.5">Current Shift</div>
                            <div className="font-bold text-white bg-[#060B14] px-2 py-1 rounded border border-[#1A2A3A]">09:00 AM - 06:00 PM</div>
                        </div>
                        <div className="text-right">
                            <div className="text-xs text-[#8899AA] mb-0.5">Working Hours</div>
                            <div className="font-bold text-[#00E5A0]">8h 33m</div>
                        </div>
                    </div>
                </div>

                {/* Date Selector & Total Summary */}
                <div className="flex justify-between items-center bg-[#0D1928] border border-[#1A2A3A] p-4 rounded-xl">
                    <div className="flex items-center space-x-3">
                        <label htmlFor="log-date" className="text-sm text-[#8899AA] font-bold">Select Date:</label>
                        <div className="relative">
                            <CalIcon size={16} className="absolute left-3 top-2.5 text-[#0066FF]" aria-hidden="true" />
                            <input
                                id="log-date"
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="bg-[#060B14] border border-[#1A2A3A] text-sm text-white rounded-lg pl-9 pr-3 py-2 outline-none focus:border-[#0066FF]"
                            />
                        </div>
                    </div>
                    <div className="flex space-x-8">
                        <div>
                            <span className="text-xs text-[#8899AA] block">First In</span>
                            <span className="text-lg font-bold text-white">08:52 AM</span>
                        </div>
                        <div>
                            <span className="text-xs text-[#8899AA] block">Last Out</span>
                            <span className="text-lg font-bold text-white">06:10 PM</span>
                        </div>
                        <div>
                            <span className="text-xs text-[#8899AA] block">Status</span>
                            <span className="text-sm px-2 py-0.5 bg-[#00E5A0]/10 text-[#00E5A0] border border-[#00E5A0]/20 rounded font-bold uppercase mt-1 inline-block">Present (On-time)</span>
                        </div>
                    </div>
                </div>

                {/* Timeline punches */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-6">
                    <h3 className="text-sm font-bold text-white mb-8">Raw Punch Records (Timeline)</h3>

                    <div className="relative border-l-2 border-[#1A2A3A] ml-4 space-y-8 pb-4">
                        {logs.map((log, i) => (
                            <div key={i} className="relative pl-8">
                                {/* Dot */}
                                <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-4 border-[#0D1928] ${log.type === 'IN' ? 'bg-[#00E5A0]' : 'bg-[#FF4444]'
                                    }`}></div>

                                <div className="bg-[#0A1420] border border-[#1A2A3A] p-4 rounded-lg">
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex items-center space-x-3">
                                            <span className={`px-2 py-0.5 text-xs font-black rounded ${log.type === 'IN' ? 'bg-[#00E5A0]/20 text-[#00E5A0]' : 'bg-[#FF4444]/20 text-[#f87171]'
                                                }`}>
                                                {log.type} PUNCH
                                            </span>
                                            <span className="text-xl font-black text-white tracking-tight">{log.time}</span>
                                        </div>
                                        {log.verified ? (
                                            <span className="text-xs text-[#8899AA] flex items-center"><Fingerprint size={14} className="mr-1 text-[#00E5A0]" /> Verified via {log.method}</span>
                                        ) : (
                                            <span className="text-xs text-[#FFB800] flex items-center bg-[#FFB800]/10 px-2 py-0.5 rounded border border-[#FFB800]/30"><AlertCircle size={14} className="mr-1" /> Unverified Location</span>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 text-sm mt-3 pt-3 border-t border-[#1A2A3A]">
                                        <div className="flex items-center text-slate-300">
                                            <Monitor size={14} className="text-[#7a8fa6] mr-2" />
                                            <span className="text-[#8899AA] mr-2">Source:</span> {log.source}
                                        </div>
                                        <div className="flex items-center text-slate-300">
                                            <MapPin size={14} className={log.verified ? "text-[#7a8fa6] mr-2" : "text-[#FFB800] mr-2"} />
                                            <span className="text-[#8899AA] mr-2">Location:</span> {log.location}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Overrides */}
                <div className="bg-[#0A1420] border border-[#1A2A3A] border-dashed rounded-xl p-5 flex justify-between items-center">
                    <div>
                        <h4 className="text-sm font-bold text-white flex items-center mb-1"><Lock size={16} className="mr-2 text-[#8899AA]" /> Need to modify these records?</h4>
                        <p className="text-xs text-[#8899AA]">Admins can manually add, delete or ignore punches for this day.</p>
                    </div>
                    <button className="px-4 py-2 bg-[#1A2A3A] border border-[#2A3A4A] text-white text-sm font-semibold rounded-lg hover:bg-[#2A3A4A] transition-colors flex items-center">
                        <Edit3 size={16} className="mr-2" /> Manual Override
                    </button>
                </div>

            </div>
        </div>
    
        </Page>
        );
}
