"use client";
import React, { useState } from 'react';
import {
    Calendar, Clock, Plus, Settings, CheckCircle2, AlertCircle, Trash2, CalendarDays, Zap
} from 'lucide-react';
import Link from 'next/link';

const SCHEDULES = [
    { id: 1, name: "Bi-Annual eNPS", template: "eNPS Baseline Pulse", frequency: "Every 6 Months", nextRun: "Dec 01, 2023", audience: "All Company", status: "Active" },
    { id: 2, title: "New Hire 30-Day Check", template: "30-Day New Hire Check-in", frequency: "Event-Based (Day 30)", nextRun: "Ongoing", audience: "New Hires", status: "Active" },
    { id: 3, title: "Q4 Manager Effectiveness", template: "Manager Effectiveness Pulse", frequency: "One-Time", nextRun: "Nov 15, 2023", audience: "Direct Reports", status: "Draft" },
];

export default function SurveyScheduleScreen() {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="p-6 max-w-[1200px] mx-auto min-h-[calc(100vh-80px)] font-sans">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-white mb-2 flex items-center gap-3">
                        <CalendarDays size={32} className="text-[#FFB020]" /> Survey Automation
                    </h1>
                    <p className="text-[#8899AA]">Schedule recurring surveys and set up event-based pulse triggers.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setShowModal(true)}
                        className="px-5 py-2.5 bg-[#FFB020] text-[#0A1420] font-bold rounded-xl hover:bg-[#eacc41] transition-colors flex items-center gap-2 shadow-[0_5px_15px_rgba(255,176,32,0.2)]"
                    >
                        <Plus size={18} /> New Schedule
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <div className="col-span-1 lg:col-span-2 space-y-6">

                    {SCHEDULES.map(schedule => (
                        <div key={schedule.id} className="bg-[#0F1C2E] border border-[#2A3A4A] rounded-3xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:border-[#FFB020]/30 transition-colors relative overflow-hidden">

                            {/* Status Indicator */}
                            <div className={`absolute left-0 top-0 bottom-0 w-1 ${schedule.status === 'Active' ? 'bg-[#00E5A0]' : 'bg-[#445566]'}`}></div>

                            <div className="flex-1 pl-4">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-xl font-bold text-white group-hover:text-[#FFB020] transition-colors">{schedule.name || schedule.title}</h3>
                                    <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${schedule.status === 'Active' ? 'bg-[#00E5A0]/10 text-[#00E5A0]' : 'bg-[#1A2A3A] text-[#8899AA]'}`}>
                                        {schedule.status}
                                    </span>
                                </div>
                                <p className="text-[#8899AA] text-sm mb-4">Template: <strong className="text-white">{schedule.template}</strong></p>

                                <div className="flex flex-wrap gap-4">
                                    <div className="flex items-center gap-1.5 bg-[#152336] border border-[#2A3A4A] px-3 py-1.5 rounded-lg text-sm font-bold text-[#CCDDEE]">
                                        <Clock size={14} className="text-[#33E6FF]" /> {schedule.frequency}
                                    </div>
                                    <div className="flex items-center gap-1.5 bg-[#152336] border border-[#2A3A4A] px-3 py-1.5 rounded-lg text-sm font-bold text-[#CCDDEE]">
                                        <Calendar size={14} className="text-[#FF4444]" /> Next Run: {schedule.nextRun}
                                    </div>
                                </div>
                            </div>

                            <div className="flex md:flex-col gap-3 justify-end items-end w-full md:w-auto border-t border-[#1A2A3A] md:border-t-0 pt-4 md:pt-0 pl-4">
                                <button className="p-2 border border-[#2A3A4A] bg-[#1A2A3A] text-white rounded-lg hover:bg-[#2A3A4A] transition-colors tooltip" aria-label="Edit Schedule">
                                    <Settings size={18} />
                                </button>
                                <button className="p-2 border border-transparent text-[#8899AA] hover:text-[#FF4444] rounded-lg hover:bg-[#FF4444]/10 transition-colors tooltip" aria-label="Delete">
                                    <Trash2 size={18} />
                                </button>
                            </div>

                        </div>
                    ))}

                </div>

                {/* Sidebar Stats & Suggestions */}
                <div className="col-span-1 space-y-6">

                    <div className="bg-[#0F1C2E] border border-[#2A3A4A] rounded-3xl p-6 shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-5">
                            <Zap size={64} className="text-[#33E6FF]" />
                        </div>
                        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                            <Zap size={18} className="text-[#33E6FF]" /> Automation Triggers
                        </h3>
                        <p className="text-sm text-[#8899AA] mb-4">You can set up surveys to trigger automatically based on employee lifecycle events.</p>

                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 p-3 bg-[#152336] border border-[#2A3A4A] rounded-xl hover:border-[#33E6FF]/30 transition-colors cursor-pointer group">
                                <div className="w-8 h-8 rounded-lg bg-[#33E6FF]/10 flex items-center justify-center text-[#33E6FF] shrink-0 mt-0.5"><Clock size={14} /></div>
                                <div>
                                    <p className="text-sm font-bold text-white group-hover:text-[#33E6FF] transition-colors">Onboarding Milestones</p>
                                    <p className="text-xs text-[#8899AA]">Trigger at 30, 60, 90 days</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3 p-3 bg-[#152336] border border-[#2A3A4A] rounded-xl hover:border-[#FFB020]/30 transition-colors cursor-pointer group">
                                <div className="w-8 h-8 rounded-lg bg-[#FFB020]/10 flex items-center justify-center text-[#FFB020] shrink-0 mt-0.5"><AlertCircle size={14} /></div>
                                <div>
                                    <p className="text-sm font-bold text-white group-hover:text-[#FFB020] transition-colors">Post-Exit Interview</p>
                                    <p className="text-xs text-[#8899AA]">Trigger 3 days after exit date</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3 p-3 bg-[#152336] border border-[#2A3A4A] rounded-xl hover:border-[#00E5A0]/30 transition-colors cursor-pointer group">
                                <div className="w-8 h-8 rounded-lg bg-[#00E5A0]/10 flex items-center justify-center text-[#00E5A0] shrink-0 mt-0.5"><CalendarDays size={14} /></div>
                                <div>
                                    <p className="text-sm font-bold text-white group-hover:text-[#00E5A0] transition-colors">Work Anniversaries</p>
                                    <p className="text-xs text-[#8899AA]">Pulse sentiment yearly</p>
                                </div>
                            </li>
                        </ul>

                        <button className="w-full mt-6 py-2 border border-[#2A3A4A] text-[#8899AA] hover:text-white font-bold rounded-xl hover:bg-[#1A2A3A] transition-colors text-sm">
                            View All Triggers
                        </button>
                    </div>

                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-[#0A1420]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-[#0F1C2E] border border-[#2A3A4A] rounded-3xl p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200">
                        <h2 className="text-2xl font-bold text-white mb-6">New Schedule</h2>

                        <div className="space-y-4 mb-8">
                            <div>
                                <label className="block text-sm font-bold text-[#8899AA] mb-2">Schedule Name</label>
                                <input type="text" placeholder="e.g. Q4 Pulse" className="w-full bg-[#152336] border border-[#2A3A4A] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FFB020]" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-[#8899AA] mb-2">Select Template</label>
                                <select className="w-full bg-[#152336] border border-[#2A3A4A] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FFB020] appearance-none cursor-pointer">
                                    <option>eNPS Baseline Pulse</option>
                                    <option>Manager Effectiveness Pulse</option>
                                    <option>Annual DEI Survey</option>
                                    <option>Remote Work Experience</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-[#8899AA] mb-2">Frequency</label>
                                <select className="w-full bg-[#152336] border border-[#2A3A4A] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FFB020] appearance-none cursor-pointer">
                                    <option>One-Time</option>
                                    <option>Monthly</option>
                                    <option>Quarterly</option>
                                    <option>Bi-Annually</option>
                                    <option>Annually</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3">
                            <button onClick={() => setShowModal(false)} className="px-5 py-2.5 border border-[#2A3A4A] text-[#8899AA] font-bold rounded-xl hover:bg-[#1A2A3A] transition-colors">
                                Cancel
                            </button>
                            <button onClick={() => setShowModal(false)} className="px-5 py-2.5 bg-[#FFB020] text-[#0A1420] font-bold rounded-xl hover:bg-[#eacc41] transition-colors">
                                Save Schedule
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
