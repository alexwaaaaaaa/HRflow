"use client";
import React, { useState } from 'react';
import {
    Medal, Search, Filter, CalendarCheck, Gift, Award, MoreHorizontal, CheckCircle2, DollarSign
} from 'lucide-react';
import Link from 'next/link';

const UPCOMING = [
    { id: 1, name: "Jessica Kim", role: "Principal Engineer", dept: "Engineering", avatar: "JK", years: 10, date: "Tomorrow, Oct 25", status: "Gift Approved", bonus: 50000, pointsGiven: undefined, value: undefined },
    { id: 2, name: "Alex Patel", role: "Director of Product", dept: "Product", avatar: "AP", years: 15, date: "Oct 28, 2023", status: "Action Required", bonus: 100000, pointsGiven: undefined, value: undefined },
    { id: 3, name: "David Rodriguez", role: "VP of Sales", dept: "Sales", avatar: "DR", years: 20, date: "Nov 02, 2023", status: "Scheduled", bonus: 250000, pointsGiven: undefined, value: undefined },
];

const PAST = [
    { id: 101, name: "Emma Wilson", role: "Head of Marketing", dept: "Marketing", avatar: "EW", years: 5, date: "Oct 12, 2023", pointsGiven: 25000, value: 2500, status: undefined, bonus: undefined },
    { id: 102, name: "Michael Chen", role: "CTO", dept: "Executive", avatar: "MC", years: 10, date: "Sep 28, 2023", pointsGiven: 50000, value: 5000, status: undefined, bonus: undefined },
];

export default function LongServiceAwardScreen() {
    const [activeTab, setActiveTab] = useState('upcoming');

    return (
        <div className="p-6 max-w-[1200px] mx-auto min-h-[calc(100vh-80px)] font-sans">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-white mb-2 flex items-center gap-3">
                        <Medal size={32} className="text-[#FFB020]" /> Long Service Awards
                    </h1>
                    <p className="text-[#8899AA]">Manage major milestones (5, 10, 15+ years) and high-value rewards.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Link href="/engagement/rr/admin" className="px-5 py-2.5 bg-[#1A2A3A] text-white border border-[#2A3A4A] font-bold rounded-xl hover:bg-[#2A3A4A] transition-colors">
                        Milestone Settings
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                {/* Main Content */}
                <div className="col-span-1 lg:col-span-3 space-y-6">

                    {/* Tabs & Controls */}
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-[#2A3A4A] pb-4">
                        <div className="flex items-center gap-6">
                            <button onClick={() => setActiveTab('upcoming')} className={`text-sm font-bold transition-colors ${activeTab === 'upcoming' ? 'text-[#FFB020]' : 'text-[#8899AA] hover:text-white'}`}>
                                Upcoming (Next 90 Days)
                            </button>
                            <button onClick={() => setActiveTab('past')} className={`text-sm font-bold transition-colors ${activeTab === 'past' ? 'text-[#FFB020]' : 'text-[#8899AA] hover:text-white'}`}>
                                Recent Past
                            </button>
                        </div>
                        <div className="relative">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#445566]" />
                            <input type="text" placeholder="Search employees..." className="w-56 bg-[#152336] border border-[#2A3A4A] rounded-lg pl-9 pr-4 py-2 text-white text-sm focus:outline-none focus:border-[#FFB020]" />
                        </div>
                    </div>

                    {/* List */}
                    <div className="space-y-4">
                        {(activeTab === 'upcoming' ? UPCOMING : PAST).map(emp => (
                            <div key={emp.id} className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group hover:border-[#FFB020]/30 transition-colors relative overflow-hidden">

                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFB020]/5 rounded-full blur-[40px] pointer-events-none group-hover:bg-[#FFB020]/10 transition-all duration-500"></div>

                                <div className="flex items-center gap-4 relative z-10 w-full sm:w-auto">
                                    <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#FFB020] to-[#CD7F32] border-2 border-[#152336] flex items-center justify-center text-[#0A1420] font-black text-lg shadow-lg shrink-0">
                                        {emp.avatar}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-white font-bold text-lg">{emp.name}</h3>
                                            <span className="bg-[#1A2A3A] text-[#8899AA] text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wider">{emp.dept}</span>
                                        </div>
                                        <p className="text-[#8899AA] text-sm">{emp.role}</p>
                                        <p className="text-[#FFB020] text-sm font-medium mt-1 flex items-center gap-1.5">
                                            <CalendarCheck size={14} /> {emp.date}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:items-end gap-3 w-full sm:w-auto mt-4 sm:mt-0 relative z-10 border-t sm:border-t-0 border-[#1A2A3A] pt-4 sm:pt-0">
                                    <div className="flex items-center gap-2">
                                        <div className="px-3 py-1 bg-[#2A3A4A] rounded-lg border border-[#445566]">
                                            <span className="text-white font-black">{emp.years}</span> <span className="text-sm font-bold text-[#8899AA] uppercase tracking-wider">Years</span>
                                        </div>
                                        <div className="px-3 py-1 bg-[#1A2A3A] border border-[#FFB020]/50 rounded-lg flex items-center gap-1">
                                            {activeTab === 'upcoming' ? (
                                                <><Gift size={14} className="text-[#FFB020]" /> <span className="text-[#FFB020] font-mono font-bold">{emp.bonus?.toLocaleString()} pts</span></>
                                            ) : (
                                                <><DollarSign size={14} className="text-[#00E5A0]" /> <span className="text-[#00E5A0] font-mono font-bold">${emp.value?.toLocaleString()}</span></>
                                            )}
                                        </div>
                                    </div>

                                    {activeTab === 'upcoming' ? (
                                        <div className="flex items-center justify-between gap-4 w-full sm:w-auto mt-2">
                                            <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${emp.status === 'Action Required' ? 'bg-[#FF4444]/10 text-[#FF4444] border border-[#FF4444]/20' : 'bg-[#00E5A0]/10 text-[#00E5A0] border border-[#00E5A0]/20'}`}>
                                                {emp.status}
                                            </span>
                                            {emp.status === 'Action Required' && (
                                                <button className="text-[#0A1420] text-xs font-bold bg-[#FFB020] px-3 py-1.5 rounded-lg hover:bg-[#eacc41] transition-colors">
                                                    Approve Gift
                                                </button>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2 text-sm font-bold text-[#00E5A0] bg-[#00E5A0]/10 px-3 py-1.5 rounded-lg border border-[#00E5A0]/20 mt-2">
                                            <CheckCircle2 size={14} /> Gift Redeemed
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
                        <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
                            <Award size={18} className="text-[#FFB020]" /> Long Service Rules
                        </h3>

                        <ul className="text-sm text-white space-y-3 font-mono">
                            <li className="flex justify-between items-center p-2 rounded-lg bg-[#1A2A3A] border border-[#2A3A4A]">
                                <span>5 Years</span> <span className="text-[#FFB020] font-bold">25,000 pts</span>
                            </li>
                            <li className="flex justify-between items-center p-2 rounded-lg bg-[#1A2A3A] border border-[#FFB020]/30">
                                <span>10 Years</span> <span className="text-[#FFB020] font-bold">50,000 pts</span>
                            </li>
                            <li className="flex justify-between items-center p-2 rounded-lg bg-[#1A2A3A] border border-[#FFB020]/50 shadow-[0_0_10px_rgba(255,176,32,0.1)]">
                                <span>15 Years</span> <span className="text-[#FFB020] font-bold">100,000 pts</span>
                            </li>
                            <li className="flex justify-between items-center p-2 rounded-lg bg-[#1A2A3A] border border-[#FFB020] shadow-[0_0_15px_rgba(255,176,32,0.2)]">
                                <span>20+ Years</span> <span className="text-[#FFB020] font-bold">250,000 pts</span>
                            </li>
                        </ul>

                        <div className="mt-6 pt-6 border-t border-[#1A2A3A]">
                            <p className="text-[#8899AA] text-xs leading-relaxed">Long service awards above 50,000 points require manual approval from HR Operations before points are deposited.</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
