"use client";

import Page from "@/components/ui/Page";
import React, { useState } from 'react';
import { Clock, Calendar as CalendarIcon, Play, Square, Plus } from 'lucide-react';

export default function TimeEntryScreen() {
    const [activeTimer, setActiveTimer] = useState(false);

    return (
        <Page
            title="My Timesheet"
            subtitle="Log hours, submit weekly timesheets, and track your utilization."
            breadcrumbs={[{ label: "Projects", href: "/projects" }, { label: "Timesheet" }]}
            maxWidth="1400px"
        >

        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">Time Tracking</div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><Clock size={24} className="text-emerald-400" /> My Timesheet</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Log hours, submit weekly timesheets, and track your utilization.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors">
                        Submit Week for Approval
                    </button>
                </div>
            </div>

            <div className="grid lg:grid-cols-4 gap-6">
                {/* Live Tracker (Floating/Sticky) */}
                <div className="lg:col-span-1 space-y-6">
                    <div className={`border rounded-2xl p-6 transition-all ${activeTimer ? 'bg-emerald-500/10 border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.15)]' : 'bg-[#0A1420] border-[#1A2A3A] shadow-lg'}`}>
                        <div className="text-center mb-6">
                            <div className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-2">Live Timer</div>
                            <div className="text-5xl font-black text-white font-mono tracking-tight">{activeTimer ? '02:14:05' : '00:00:00'}</div>
                        </div>

                        <div className="space-y-4 mb-6">
                            <select className="w-full bg-[#131B2B] border border-[#2A3A4A] text-white rounded-lg px-3 py-2 text-sm outline-none focus:border-emerald-500">
                                <option>Select Project...</option>
                                <option selected>PRJ-809: Cloud Migration</option>
                            </select>
                            <input type="text" placeholder="What are you working on?" className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-lg px-3 py-2 text-white text-sm focus:border-emerald-500 outline-none" />
                        </div>

                        {activeTimer ? (
                            <button onClick={() => setActiveTimer(false)} className="w-full bg-rose-600 hover:bg-rose-500 text-white font-bold py-3 rounded-xl transition-colors shadow-lg flex justify-center items-center gap-2">
                                <Square size={16} fill="currentColor" /> Stop Timer
                            </button>
                        ) : (
                            <button onClick={() => setActiveTimer(true)} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition-colors shadow-lg flex justify-center items-center gap-2">
                                <Play size={16} fill="currentColor" /> Start Timer
                            </button>
                        )}
                    </div>

                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5">
                        <h3 className="text-white font-bold border-b border-[#1A2A3A] pb-2 mb-3 text-sm">Week Insights</h3>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-[#8899AA] text-xs">Total Logged</span>
                            <span className="text-white font-mono font-bold">32.5h / 40h</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-[#131B2B] overflow-hidden mb-4"><div className="bg-sky-500 h-full w-[80%]"></div></div>

                        <div className="flex justify-between items-center text-xs">
                            <span className="text-emerald-400 font-bold">92% Billable</span>
                            <span className="text-[#556677] font-bold">8% Internal</span>
                        </div>
                    </div>
                </div>

                {/* Weekly Grid */}
                <div className="lg:col-span-3 bg-[#0A1420] border border-[#1A2A3A] rounded-2xl flex flex-col h-full shadow-lg overflow-hidden">
                    <div className="p-4 border-b border-[#1A2A3A] bg-[#060D1A] flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <button className="text-[#8899AA] hover:text-white transition-colors">&larr;</button>
                            <h2 className="text-white font-bold flex items-center gap-2"><CalendarIcon size={16} className="text-[#556677]" /> Oct 20 - Oct 26, 2025</h2>
                            <button className="text-[#8899AA] hover:text-white transition-colors">&rarr;</button>
                        </div>
                        <button className="text-emerald-400 font-bold text-xs bg-emerald-500/10 px-3 py-1.5 rounded hover:bg-emerald-500/20 transition-colors">Today is Thu</button>
                    </div>

                    <div className="flex-1 overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#131B2B] text-[#8899AA] text-[10px] uppercase font-bold tracking-wider text-center">
                                    <th className="p-3 border-b border-r border-[#2A3A4A] text-left w-1/4">Project / Task</th>
                                    <th className="p-3 border-b border-r border-[#2A3A4A] w-24">Mon 20</th>
                                    <th className="p-3 border-b border-r border-[#2A3A4A] w-24">Tue 21</th>
                                    <th className="p-3 border-b border-r border-[#2A3A4A] w-24">Wed 22</th>
                                    <th className="p-3 border-b border-r border-[#2A3A4A] w-24 bg-[#1A2A3A]/50 text-white">Thu 23</th>
                                    <th className="p-3 border-b border-r border-[#2A3A4A] w-24">Fri 24</th>
                                    <th className="p-3 border-b border-[#2A3A4A] w-16">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Row 1 */}
                                <tr className="border-b border-[#1A2A3A] group">
                                    <td className="p-3 border-r border-[#1A2A3A] relative">
                                        <div className="font-bold text-white text-sm mb-0.5">PRJ-809: Cloud Migration</div>
                                        <div className="text-[#556677] text-xs">Database schema design</div>
                                    </td>
                                    <td className="p-2 border-r border-[#1A2A3A]"><input type="text" defaultValue="6.5" className="w-full text-center bg-transparent text-white font-mono text-sm focus:bg-[#131B2B] outline-none rounded py-1" /></td>
                                    <td className="p-2 border-r border-[#1A2A3A]"><input type="text" defaultValue="8.0" className="w-full text-center bg-transparent text-white font-mono text-sm focus:bg-[#131B2B] outline-none rounded py-1" /></td>
                                    <td className="p-2 border-r border-[#1A2A3A]"><input type="text" defaultValue="7.0" className="w-full text-center bg-transparent text-white font-mono text-sm focus:bg-[#131B2B] outline-none rounded py-1" /></td>
                                    <td className="p-2 border-r border-[#1A2A3A] bg-[#1A2A3A]/20"><input type="text" defaultValue={activeTimer ? "2.2" : ""} className="w-full text-center bg-transparent text-emerald-400 font-mono text-sm focus:bg-[#131B2B] outline-none rounded py-1" /></td>
                                    <td className="p-2 border-r border-[#1A2A3A]"><input type="text" className="w-full text-center bg-transparent text-white font-mono text-sm focus:bg-[#131B2B] outline-none rounded py-1" /></td>
                                    <td className="p-3 font-mono text-white text-center font-bold">{activeTimer ? "23.7" : "21.5"}</td>
                                </tr>

                                {/* Row 2 */}
                                <tr className="border-b border-[#1A2A3A] group">
                                    <td className="p-3 border-r border-[#1A2A3A]">
                                        <div className="font-bold text-[#AABBCC] text-sm mb-0.5">INT-001: Internal Meetings</div>
                                        <div className="text-[#556677] text-xs">All hands, 1:1s, etc.</div>
                                    </td>
                                    <td className="p-2 border-r border-[#1A2A3A]"><input type="text" defaultValue="1.5" className="w-full text-center bg-transparent text-white font-mono text-sm focus:bg-[#131B2B] outline-none rounded py-1" /></td>
                                    <td className="p-2 border-r border-[#1A2A3A]"><input type="text" className="w-full text-center bg-transparent text-white font-mono text-sm focus:bg-[#131B2B] outline-none rounded py-1" /></td>
                                    <td className="p-2 border-r border-[#1A2A3A]"><input type="text" defaultValue="1.0" className="w-full text-center bg-transparent text-white font-mono text-sm focus:bg-[#131B2B] outline-none rounded py-1" /></td>
                                    <td className="p-2 border-r border-[#1A2A3A] bg-[#1A2A3A]/20"><input type="text" className="w-full text-center bg-transparent text-white font-mono text-sm focus:bg-[#131B2B] outline-none rounded py-1" /></td>
                                    <td className="p-2 border-r border-[#1A2A3A]"><input type="text" defaultValue="1.0" className="w-full text-center bg-transparent text-white font-mono text-sm focus:bg-[#131B2B] outline-none rounded py-1" /></td>
                                    <td className="p-3 font-mono text-[#AABBCC] text-center font-bold">3.5</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr className="bg-[#131B2B]">
                                    <td className="p-3 text-right font-bold text-white text-sm border-r border-[#2A3A4A]">Daily Totals</td>
                                    <td className="p-3 text-center font-mono font-bold text-white border-r border-[#2A3A4A]">8.0</td>
                                    <td className="p-3 text-center font-mono font-bold text-white border-r border-[#2A3A4A]">8.0</td>
                                    <td className="p-3 text-center font-mono font-bold text-white border-r border-[#2A3A4A]">8.0</td>
                                    <td className="p-3 text-center font-mono font-bold text-emerald-400 border-r border-[#2A3A4A] bg-[#1A2A3A]/50">{activeTimer ? "2.2" : "0.0"}</td>
                                    <td className="p-3 text-center font-mono font-bold text-[#556677] border-r border-[#2A3A4A]">~</td>
                                    <td className="p-3 text-center font-mono font-black text-white">{activeTimer ? "26.2" : "24.0"}h</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>

                    <div className="p-4 bg-[#060D1A] flex border-t border-[#1A2A3A]">
                        <button className="text-emerald-400 font-bold text-sm flex items-center gap-2 hover:text-emerald-300 transition-colors">
                            <Plus size={16} /> Add another row
                        </button>
                    </div>
                </div>
            </div>
        </div>
    
        </Page>
    );
}
