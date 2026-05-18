"use client";

import Page from "@/components/ui/Page";
import React, { useState } from 'react';
import {
    Briefcase, Search, CalendarCheck, Gift, Award, MoreHorizontal, CheckCircle2
} from 'lucide-react';
import Link from 'next/link';

const UPCOMING = [
    { id: 1, name: "Jessica Kim", role: "Senior Engineer", dept: "Engineering", avatar: "JK", years: 3, date: "Tomorrow, Oct 25", status: "Automated Gift Scheduled", pointsGiven: undefined },
    { id: 2, name: "Alex Patel", role: "Product Manager", dept: "Product", avatar: "AP", years: 5, date: "Oct 28, 2023", status: "Action Required", pointsGiven: undefined },
    { id: 3, name: "David Rodriguez", role: "Designer", dept: "Design", avatar: "DR", years: 1, date: "Nov 02, 2023", status: "Scheduled", pointsGiven: undefined },
];

const PAST = [
    { id: 101, name: "Emma Wilson", role: "Marketing Spec", dept: "Marketing", avatar: "EW", years: 2, date: "Oct 12, 2023", pointsGiven: 2000, status: undefined },
    { id: 102, name: "Michael Chen", role: "DevOps Lead", dept: "Engineering", avatar: "MC", years: 4, date: "Sep 28, 2023", pointsGiven: 4000, status: undefined },
];

export default function WorkAnniversaryScreen() {
    const [activeTab, setActiveTab] = useState('upcoming');

    return (
        <Page
            title="Work Anniversaries"
            subtitle="Track and celebrate employee milestones automatically."
            breadcrumbs={[{ label: "Engagement", href: "/engagement" }, { label: "Rr", href: "/engagement/rr" }, { label: "Anniversary" }]}
            maxWidth="1200px"
        >

        <div className="p-6 max-w-[1200px] mx-auto min-h-[calc(100vh-80px)] font-sans">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-white mb-2 flex items-center gap-3">
                        <Briefcase size={32} className="text-[#33E6FF]" /> Work Anniversaries
                    </h1>
                    <p className="text-[#8899AA]">Track and celebrate employee milestones automatically.</p>
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
                            <button onClick={() => setActiveTab('upcoming')} className={`text-sm font-bold transition-colors ${activeTab === 'upcoming' ? 'text-[#33E6FF]' : 'text-[#8899AA] hover:text-white'}`}>
                                Upcoming (This Month)
                            </button>
                            <button onClick={() => setActiveTab('past')} className={`text-sm font-bold transition-colors ${activeTab === 'past' ? 'text-[#33E6FF]' : 'text-[#8899AA] hover:text-white'}`}>
                                Recent Past
                            </button>
                        </div>
                        <div className="relative">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#445566]" />
                            <input type="text" placeholder="Search employees..." className="w-56 bg-[#152336] border border-[#2A3A4A] rounded-lg pl-9 pr-4 py-2 text-white text-sm focus:outline-none focus:border-[#33E6FF]" />
                        </div>
                    </div>

                    {/* List */}
                    <div className="space-y-4">
                        {(activeTab === 'upcoming' ? UPCOMING : PAST).map(emp => (
                            <div key={emp.id} className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group hover:border-[#33E6FF]/30 transition-colors relative overflow-hidden">

                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#33E6FF]/5 rounded-full blur-[40px] pointer-events-none group-hover:bg-[#33E6FF]/10 transition-all duration-500"></div>

                                <div className="flex items-center gap-4 relative z-10">
                                    <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#33E6FF] to-blue-500 border-2 border-[#152336] flex items-center justify-center text-white font-bold text-lg shadow-lg shrink-0">
                                        {emp.avatar}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-white font-bold text-lg">{emp.name}</h3>
                                            <span className="bg-[#1A2A3A] text-[#8899AA] text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wider">{emp.dept}</span>
                                        </div>
                                        <p className="text-[#8899AA] text-sm">{emp.role}</p>
                                        <p className="text-[#33E6FF] text-sm font-medium mt-1 flex items-center gap-1.5">
                                            <CalendarCheck size={14} /> {emp.date}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:items-end gap-3 w-full sm:w-auto mt-4 sm:mt-0 relative z-10 border-t sm:border-t-0 border-[#1A2A3A] pt-4 sm:pt-0">
                                    <div className="flex items-center gap-2">
                                        <div className="w-10 h-10 rounded-full bg-[#1A2A3A] flex items-center justify-center border-2 border-[#FFB020] shadow-[0_0_15px_rgba(255,176,32,0.3)]">
                                            <span className="text-[#FFB020] font-black">{emp.years}</span>
                                        </div>
                                        <span className="text-sm font-bold text-[#8899AA] uppercase tracking-wider">Years</span>
                                    </div>

                                    {activeTab === 'upcoming' ? (
                                        <div className="flex items-center justify-between gap-4 w-full sm:w-auto">
                                            <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${emp.status === 'Action Required' ? 'bg-[#FF4444]/10 text-[#FF4444]' : 'bg-[#00E5A0]/10 text-[#00E5A0]'}`}>
                                                {emp.status}
                                            </span>
                                            <button className="text-[#8899AA] hover:text-white transition-colors bg-[#1A2A3A] p-2 rounded-lg border border-[#2A3A4A]">
                                                <MoreHorizontal size={16} />
                                            </button>
                                        </div>
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
                        <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Automation Status</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-3 rounded-xl border border-[#00E5A0]/30 bg-[#00E5A0]/10">
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 size={18} className="text-[#00E5A0]" />
                                    <span className="text-sm font-bold text-white">Anniversary Mails</span>
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
                            <h4 className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-3">Default Point Rules</h4>
                            <ul className="text-sm text-white space-y-2 font-mono">
                                <li className="flex justify-between"><span>1 Year</span> <span className="text-[#00E5A0]">1,000 pts</span></li>
                                <li className="flex justify-between"><span>3 Years</span> <span className="text-[#00E5A0]">3,000 pts</span></li>
                                <li className="flex justify-between"><span>5 Years</span> <span className="text-[#00E5A0]">5,000 pts</span></li>
                                <li className="flex justify-between"><span>10+ Years</span> <span className="text-[#00E5A0]">15,000 pts</span></li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    
        </Page>
    );
}
