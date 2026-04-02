"use client";
import React, { useState } from 'react';
import {
    BarChart2, Search, Filter, Plus, Clock, CheckCircle2, AlertCircle, Users, Send, FileText, ChevronRight
} from 'lucide-react';
import Link from 'next/link';

const ACTIVE_SURVEYS = [
    { id: 1, title: "Q3 Employee Engagement Pulse", type: "Engagement", audience: "All Company", responseRate: 68, endsIn: "2 days", status: "Active" },
    { id: 2, title: "Return to Office Feedback", type: "Feedback", audience: "Engineering Set", responseRate: 85, endsIn: "5 hours", status: "Active" },
];

const RECENT_SURVEYS = [
    { id: 101, title: "Bi-Annual eNPS Score", type: "eNPS", completed: "Sep 01, 2023", responses: 412, rate: 92, score: 45 },
    { id: 102, title: "New Manager Effectiveness", type: "Feedback", completed: "Aug 15, 2023", responses: 120, rate: 78, score: null },
];

export default function SurveyDashboardHRScreen() {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <main className="p-6 max-w-[1200px] mx-auto min-h-[calc(100vh-80px)] font-sans">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-white mb-2 flex items-center gap-3">
                        <BarChart2 size={32} className="text-[#33E6FF]" aria-hidden="true" /> Pulse Surveys
                    </h1>
                    <p className="text-[#8899AA]">Measure engagement, gather feedback, and track company sentiment.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Link href="/engagement/surveys/templates" className="px-5 py-2.5 bg-[#1A2A3A] text-white border border-[#2A3A4A] font-bold rounded-xl hover:bg-[#2A3A4A] transition-colors flex items-center gap-2">
                        <FileText size={18} aria-hidden="true" /> Templates
                    </Link>
                    <Link href="/engagement/surveys/create" className="px-5 py-2.5 bg-[#33E6FF] text-[#0A1420] font-bold rounded-xl hover:bg-[#29b8cc] transition-colors shadow-[0_5px_15px_rgba(51,230,255,0.2)] flex items-center gap-2">
                        <Plus size={18} aria-hidden="true" /> New Survey
                    </Link>
                </div>
            </div>

            {/* KPI Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-[#0F1C2E] border border-[#2A3A4A] rounded-3xl p-6 shadow-xl relative overflow-hidden group hover:border-[#33E6FF]/30 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-[#33E6FF]/10 flex items-center justify-center text-[#33E6FF] mb-4">
                        <Clock size={24} />
                    </div>
                    <p className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-1">Active Surveys</p>
                    <h3 className="text-3xl font-black text-white">2</h3>
                </div>
                <div className="bg-[#0F1C2E] border border-[#2A3A4A] rounded-3xl p-6 shadow-xl relative overflow-hidden group hover:border-[#00E5A0]/30 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-[#00E5A0]/10 flex items-center justify-center text-[#00E5A0] mb-4">
                        <CheckCircle2 size={24} />
                    </div>
                    <p className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-1">Avg Response Rate</p>
                    <div className="flex items-end gap-2">
                        <h3 className="text-3xl font-black text-white">78<span className="text-lg text-[#00E5A0]">%</span></h3>
                    </div>
                </div>
                <div className="bg-[#0F1C2E] border border-[#2A3A4A] rounded-3xl p-6 shadow-xl relative overflow-hidden group hover:border-[#FFB020]/30 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-[#FFB020]/10 flex items-center justify-center text-[#FFB020] mb-4">
                        <AlertCircle size={24} />
                    </div>
                    <p className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-1">Company eNPS</p>
                    <div className="flex items-end gap-2">
                        <h3 className="text-3xl font-black text-white">45</h3>
                        <span className="text-xs font-bold text-[#00E5A0] bg-[#00E5A0]/10 px-2 py-0.5 rounded mb-1">Excellent</span>
                    </div>
                </div>
                <div className="bg-[#0F1C2E] border border-[#2A3A4A] rounded-3xl p-6 shadow-xl relative overflow-hidden group hover:border-[#9D00FF]/30 transition-colors">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#9D00FF]/10 rounded-full blur-[40px] pointer-events-none" aria-hidden="true"></div>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#9D00FF] to-[#6b00b3] flex items-center justify-center text-white mb-4 relative z-10 shadow-lg" aria-hidden="true">
                        <Send size={24} />
                    </div>
                    <p className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-1 relative z-10">Total Responses</p>
                    <h3 className="text-3xl font-black text-white relative z-10">8,420</h3>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                <div className="col-span-1 lg:col-span-2 space-y-8">
                    {/* Active Surveys */}
                    <div className="bg-[#0F1C2E] border border-[#2A3A4A] rounded-3xl shadow-xl overflow-hidden">
                        <div className="p-6 border-b border-[#1A2A3A] flex justify-between items-center bg-[#0A1420]">
                            <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E5A0] opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00E5A0]"></span>
                                </span>
                                Active Surveys
                            </h2>
                        </div>
                        <div className="divide-y divide-[#1A2A3A]">
                            {ACTIVE_SURVEYS.map(survey => (
                                <div key={survey.id} className="p-6 hover:bg-[#152336] transition-colors">
                                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                                        <div>
                                            <div className="flex items-center gap-3 mb-1">
                                                <h3 className="text-lg font-bold text-white">{survey.title}</h3>
                                                <span className="bg-[#1A2A3A] border border-[#2A3A4A] text-[#8899AA] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">{survey.type}</span>
                                            </div>
                                            <p className="text-sm text-[#8899AA] flex items-center gap-1.5"><Users size={14} aria-hidden="true" /> Audience: <strong className="text-white">{survey.audience}</strong></p>
                                        </div>
                                        <Link href={`/engagement/surveys/results?id=${survey.id}`} className="px-4 py-2 bg-[#33E6FF]/10 text-[#33E6FF] font-bold text-sm rounded-xl hover:bg-[#33E6FF] hover:text-[#0F1C2E] transition-colors shrink-0">
                                            View Live Results
                                        </Link>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="bg-[#0A1420] border border-[#1A2A3A] p-4 rounded-xl">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-xs font-bold text-[#8899AA] uppercase tracking-wider">Response Rate</span>
                                                <span className="text-sm font-bold text-white">{survey.responseRate}%</span>
                                            </div>
                                            <div className="h-2 bg-[#1A2A3A] rounded-full overflow-hidden" role="progressbar" aria-valuenow={survey.responseRate} aria-valuemin={0} aria-valuemax={100} aria-label={`${survey.title} response rate: ${survey.responseRate}%`}>
                                                <div className={`h-full rounded-full ${survey.responseRate > 50 ? 'bg-[#00E5A0]' : 'bg-[#FFB020]'}`} style={{ width: `${survey.responseRate}%` }}></div>
                                            </div>
                                        </div>
                                        <div className="bg-[#0A1420] border border-[#1A2A3A] p-4 rounded-xl flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-[#FFB020]/10 flex items-center justify-center text-[#FFB020] shrink-0">
                                                <Clock size={16} />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-[#8899AA] uppercase tracking-wider">Closes In</p>
                                                <p className="text-sm font-bold text-white">{survey.endsIn}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Past Surveys Table */}
                    <div className="bg-[#0F1C2E] border border-[#2A3A4A] rounded-3xl shadow-xl overflow-hidden">
                        <div className="p-6 border-b border-[#1A2A3A] flex justify-between items-center">
                            <h2 className="text-lg font-bold text-white">Recent Surveys</h2>
                            <div className="relative">
                                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#445566]" aria-hidden="true" />
                                <label htmlFor="survey-search" className="sr-only">Search surveys</label>
                                <input id="survey-search" type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search..." className="w-48 bg-[#152336] border border-[#2A3A4A] rounded-lg pl-9 pr-4 py-2 text-white text-sm focus:outline-none focus:border-[#33E6FF]" />
                            </div>
                        </div>
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#0A1420] border-b border-[#1A2A3A]">
                                    <th scope="col" className="p-4 text-xs font-bold text-[#8899AA] uppercase tracking-wider text-left">Survey Title</th>
                                    <th scope="col" className="p-4 text-xs font-bold text-[#8899AA] uppercase tracking-wider text-left">Completed</th>
                                    <th scope="col" className="p-4 text-xs font-bold text-[#8899AA] uppercase tracking-wider text-right">Responses</th>
                                    <th scope="col" className="p-4 text-xs font-bold text-[#8899AA] uppercase tracking-wider text-right">Rate</th>
                                    <th scope="col" className="p-4 text-xs font-bold text-[#8899AA] uppercase tracking-wider text-center">Score</th>
                                    <th scope="col" className="p-4 w-12"><span className="sr-only">Actions</span></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#1A2A3A]">
                                {RECENT_SURVEYS.map(survey => (
                                    <tr key={survey.id} className="hover:bg-[#1A2A3A]/50 transition-colors cursor-pointer group">
                                        <td className="p-4">
                                            <p className="text-sm font-bold text-white">{survey.title}</p>
                                            <p className="text-xs text-[#8899AA]">{survey.type}</p>
                                        </td>
                                        <td className="p-4 text-sm text-[#CCDDEE]">{survey.completed}</td>
                                        <td className="p-4 text-sm text-white font-mono text-right">{survey.responses}</td>
                                        <td className="p-4 text-sm text-white font-mono text-right">{survey.rate}%</td>
                                        <td className="p-4 text-center">
                                            {survey.score ? (
                                                <span className="inline-block px-2 py-1 bg-[#00E5A0]/10 text-[#00E5A0] font-bold text-sm rounded">+{survey.score}</span>
                                            ) : (
                                                <span className="text-[#445566]">-</span>
                                            )}
                                        </td>
                                        <td className="p-4 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                                            <ChevronRight size={18} className="text-[#33E6FF]" aria-hidden="true" />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Sidebar Widgets */}
                <div className="col-span-1 space-y-6">

                    {/* Quick Actions */}
                    <div className="bg-[#0F1C2E] border border-[#2A3A4A] rounded-3xl p-6 shadow-xl">
                        <h3 className="text-white font-bold mb-4">Quick Actions</h3>
                        <div className="space-y-3">
                            <Link href="/engagement/surveys/enps-dashboard" className="w-full flex items-center justify-between p-4 rounded-xl border border-[#1A2A3A] bg-[#152336] hover:border-[#33E6FF]/50 transition-colors group">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-[#33E6FF]/10 flex items-center justify-center text-[#33E6FF]"><BarChart2 size={18} /></div>
                                    <div>
                                        <p className="text-sm font-bold text-white">eNPS Dashboard</p>
                                        <p className="text-xs text-[#8899AA]">View company sentiment</p>
                                    </div>
                                </div>
                                <ChevronRight size={16} className="text-[#445566] group-hover:text-[#33E6FF]" />
                            </Link>
                            <Link href="/engagement/surveys/schedule" className="w-full flex items-center justify-between p-4 rounded-xl border border-[#1A2A3A] bg-[#152336] hover:border-[#FFB020]/50 transition-colors group">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-[#FFB020]/10 flex items-center justify-center text-[#FFB020]"><Clock size={18} /></div>
                                    <div>
                                        <p className="text-sm font-bold text-white">Survey Schedule</p>
                                        <p className="text-xs text-[#8899AA]">Manage automated pulses</p>
                                    </div>
                                </div>
                                <ChevronRight size={16} className="text-[#445566] group-hover:text-[#FFB020]" />
                            </Link>
                        </div>
                    </div>

                    {/* Response Reminders */}
                    <div className="bg-[#0F1C2E] border border-[#2A3A4A] rounded-3xl p-6 shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-[#FFB020]/10 rounded-full blur-[30px] pointer-events-none"></div>
                        <h2 className="text-white font-bold mb-4 flex items-center gap-2">
                            <AlertCircle size={18} className="text-[#FFB020]" aria-hidden="true" /> Pending Responses
                        </h2>
                        <p className="text-sm text-[#CCDDEE] mb-6">45 employees haven&apos;t responded to the active &quot;Q3 Employee Engagement Pulse&quot; survey yet.</p>
                        <button type="button" className="w-full py-3 bg-[#1A2A3A] border border-[#2A3A4A] text-white font-bold rounded-xl hover:bg-[#2A3A4A] transition-colors flex items-center justify-center gap-2">
                            <Send size={16} aria-hidden="true" /> Send Reminders
                        </button>
                    </div>

                </div>

            </div>
        </main>
    );
}
