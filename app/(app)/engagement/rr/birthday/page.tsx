"use client";

import Page from "@/components/ui/Page";
import React, { useState } from 'react';
import {
    Gift, Search, CalendarHeart, Award, CheckCircle2, Send
} from 'lucide-react';
import Link from 'next/link';

const UPCOMING = [
    { id: 1, name: "Sarah Connor", role: "Product Designer", dept: "Design", avatar: "SC", date: "Tomorrow, Oct 25", status: "Automated Gift Scheduled", pointsGiven: undefined },
    { id: 2, name: "John Smith", role: "Sales Executive", dept: "Sales", avatar: "JS", date: "Oct 28, 2023", status: "Action Required", pointsGiven: undefined },
    { id: 3, name: "Maria Garcia", role: "Frontend Developer", dept: "Engineering", avatar: "MG", date: "Nov 02, 2023", status: "Scheduled", pointsGiven: undefined },
];

const PAST = [
    { id: 101, name: "James Wilson", role: "HR Manager", dept: "HR", avatar: "JW", date: "Oct 12, 2023", pointsGiven: 500, status: undefined },
    { id: 102, name: "Linda Chen", role: "Data Analyst", dept: "Data", avatar: "LC", date: "Sep 28, 2023", pointsGiven: 500, status: undefined },
];

export default function BirthdayScreen() {
    const [activeTab, setActiveTab] = useState('upcoming');

    return (
        <Page
            title="Birthdays"
            subtitle="Track and celebrate employee birthdays automatically."
            breadcrumbs={[{ label: "Engagement", href: "/engagement" }, { label: "Rr", href: "/engagement/rr" }, { label: "Birthday" }]}
            maxWidth="1200px"
        >

        <div className="p-6 max-w-[1200px] mx-auto min-h-[calc(100vh-80px)] font-sans">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-white mb-2 flex items-center gap-3">
                        <Gift size={32} className="text-[#FF4444]" /> Birthdays
                    </h1>
                    <p className="text-[#8899AA]">Track and celebrate employee birthdays automatically.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Link href="/engagement/rr/admin" className="px-5 py-2.5 bg-[#1A2A3A] text-white border border-[#2A3A4A] font-bold rounded-xl hover:bg-[#2A3A4A] transition-colors">
                        Automation Settings
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                {/* Main Content */}
                <div className="col-span-1 lg:col-span-3 space-y-6">

                    {/* Tabs & Controls */}
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-[#2A3A4A] pb-4">
                        <div className="flex items-center gap-6">
                            <button onClick={() => setActiveTab('upcoming')} className={`text-sm font-bold transition-colors ${activeTab === 'upcoming' ? 'text-[#FF4444]' : 'text-[#8899AA] hover:text-white'}`}>
                                Upcoming (This Month)
                            </button>
                            <button onClick={() => setActiveTab('past')} className={`text-sm font-bold transition-colors ${activeTab === 'past' ? 'text-[#FF4444]' : 'text-[#8899AA] hover:text-white'}`}>
                                Recent Past
                            </button>
                        </div>
                        <div className="relative">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#445566]" />
                            <input type="text" placeholder="Search employees..." className="w-56 bg-[#152336] border border-[#2A3A4A] rounded-lg pl-9 pr-4 py-2 text-white text-sm focus:outline-none focus:border-[#FF4444]" />
                        </div>
                    </div>

                    {/* List */}
                    <div className="space-y-4">
                        {(activeTab === 'upcoming' ? UPCOMING : PAST).map(emp => (
                            <div key={emp.id} className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group hover:border-[#FF4444]/30 transition-colors relative overflow-hidden">

                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF4444]/5 rounded-full blur-[40px] pointer-events-none group-hover:bg-[#FF4444]/10 transition-all duration-500"></div>

                                <div className="flex items-center gap-4 relative z-10">
                                    <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#FF4444] to-[#ff8c8c] border-2 border-[#152336] flex items-center justify-center text-white font-bold text-lg shadow-lg shrink-0">
                                        {emp.avatar}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-white font-bold text-lg">{emp.name}</h3>
                                            <span className="bg-[#1A2A3A] text-[#8899AA] text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wider">{emp.dept}</span>
                                        </div>
                                        <p className="text-[#8899AA] text-sm">{emp.role}</p>
                                        <p className="text-[#FF4444] text-sm font-medium mt-1 flex items-center gap-1.5">
                                            <CalendarHeart size={14} /> {emp.date}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:items-end gap-3 w-full sm:w-auto mt-4 sm:mt-0 relative z-10 border-t sm:border-t-0 border-[#1A2A3A] pt-4 sm:pt-0">

                                    {activeTab === 'upcoming' ? (
                                        <>
                                            <button className="flex items-center gap-2 bg-[#1A2A3A] border border-[#2A3A4A] px-4 py-2 rounded-xl text-white font-bold text-sm hover:bg-[#2A3A4A] transition-colors">
                                                <Send size={14} className="text-[#33E6FF]" /> Send Custom Card
                                            </button>
                                            <div className="flex items-center justify-between gap-4 w-full sm:w-auto">
                                                <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${emp.status === 'Action Required' ? 'bg-[#FF4444]/10 text-[#FF4444]' : 'bg-[#00E5A0]/10 text-[#00E5A0]'}`}>
                                                    {emp.status}
                                                </span>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="flex items-center gap-2 text-sm font-bold text-[#00E5A0] bg-[#00E5A0]/10 px-3 py-1.5 rounded-lg border border-[#00E5A0]/20">
                                            <Gift size={14} /> +{emp.pointsGiven} pts awarded
                                        </div>
                                    )}
                                </div>

                            </div>
                        ))}
                    </div>

                </div>

                {/* Sidebar stats */}
                <div className="col-span-1 space-y-6">
                    <div className="bg-[#0F1C2E] border border-[#2A3A4A] rounded-3xl p-6 shadow-xl">
                        <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Birthday Automation</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-3 rounded-xl border border-[#00E5A0]/30 bg-[#00E5A0]/10">
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 size={18} className="text-[#00E5A0]" />
                                    <span className="text-sm font-bold text-white">Birthday Wishes</span>
                                </div>
                                <span className="text-xs font-bold text-[#00E5A0] uppercase tracking-wider">Active</span>
                            </div>
                            <div className="flex justify-between items-center p-3 rounded-xl border border-[#00E5A0]/30 bg-[#00E5A0]/10">
                                <div className="flex items-center gap-2">
                                    <Award size={18} className="text-[#00E5A0]" />
                                    <span className="text-sm font-bold text-white">Point Grants</span>
                                </div>
                                <span className="text-xs font-bold text-[#00E5A0] uppercase tracking-wider">Active</span>
                            </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-[#1A2A3A]">
                            <h4 className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-3">Birthday Bonus</h4>
                            <div className="flex justify-between items-center bg-[#152336] p-3 rounded-xl border border-[#2A3A4A]">
                                <span className="text-sm text-white font-bold">Default Points</span>
                                <span className="text-[#00E5A0] font-mono font-bold">500 pts</span>
                            </div>
                            <p className="text-xs text-[#445566] mt-3 leading-relaxed">Birthday points are automatically distributed at 9:00 AM local time on the employee's birthday.</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    
        </Page>
    );
}
