"use client";
import React, { useState } from "react";
import {
    HeartHandshake, Coffee, MessageCircle, Calendar,
    Trophy, Star, CheckCircle2, ChevronRight
} from "lucide-react";

export default function BuddyPortal() {
    const [progress, setProgress] = useState(60);

    return (
        <div className="p-6 max-w-[1200px] mx-auto min-h-[calc(100vh-80px)]">

            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 pb-6 border-b border-[#1A2A3A]">
                <div>
                    <div className="inline-block px-3 py-1 mb-3 rounded-full bg-[#00E5A0]/10 text-[#00E5A0] text-xs font-bold tracking-wider uppercase border border-[#00E5A0]/20 flex items-center gap-1.5 w-fit">
                        <HeartHandshake size={14} /> Culture Champion
                    </div>
                    <h1 className="text-2xl font-bold text-white">Your Buddy Dashboard</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Help your assigned new joiner navigate their first month successfully.</p>
                </div>
                <div className="flex items-center gap-4 mt-4 md:mt-0 bg-[#0F1C2E] border border-[#1A2A3A] p-3 rounded-2xl">
                    <div className="bg-[#1A2A3A] w-12 h-12 rounded-xl flex items-center justify-center border border-[#2A3A4A]">
                        <Trophy size={20} className="text-[#FFB020]" />
                    </div>
                    <div>
                        <p className="text-xs text-[#8899AA] font-semibold uppercase tracking-wider mb-0.5">Buddy Points</p>
                        <h3 className="text-white font-bold text-xl">450 <span className="text-sm font-normal text-[#8899AA]">lvl 4</span></h3>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Col: The Joiner */}
                <div className="lg:col-span-1 space-y-6">

                    <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl overflow-hidden relative shadow-lg">
                        {/* Banner */}
                        <div className="h-24 bg-gradient-to-r from-[#1A2A3A] to-[#2A3A4A]"></div>

                        {/* Profile Info */}
                        <div className="px-6 pb-6 relative">
                            <div className="absolute -top-10 border-4 border-[#0F1C2E] rounded-full w-20 h-20 bg-[#00E5A0] flex items-center justify-center font-bold text-3xl text-[#0A1420]">
                                SR
                            </div>

                            <div className="mt-12">
                                <h2 className="text-xl font-bold text-white mb-1">Sneha Rao</h2>
                                <p className="text-[#8899AA] text-sm mb-4">Product Designer • Joined Mar 12</p>

                                <div className="flex gap-2 mb-6">
                                    <button className="flex-1 bg-[#1A2A3A] hover:bg-[#2A3A4A] transition-colors py-2 rounded-lg text-white font-medium text-sm flex items-center justify-center gap-2 border border-[#2A3A4A]">
                                        <MessageCircle size={16} /> Chat
                                    </button>
                                    <button className="flex-1 bg-[#1A2A3A] hover:bg-[#2A3A4A] transition-colors py-2 rounded-lg text-white font-medium text-sm flex items-center justify-center gap-2 border border-[#2A3A4A]">
                                        <Calendar size={16} /> Meet
                                    </button>
                                </div>

                                <div className="space-y-4 pt-6 border-t border-[#1A2A3A]">
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-wider text-[#8899AA] mb-2">About Sneha</p>
                                        <p className="text-sm text-white/90 leading-relaxed italic">"Hi! I'm Sneha. I love typography, hiking, and I have a weak spot for bad puns. Excited to join the team!"</p>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="text-[11px] px-2 py-1 bg-[#1A2A3A] rounded border border-[#2A3A4A] text-[#33E6FF]">Design Systems</span>
                                        <span className="text-[11px] px-2 py-1 bg-[#1A2A3A] rounded border border-[#2A3A4A] text-[#FFB020]">User Research</span>
                                        <span className="text-[11px] px-2 py-1 bg-[#1A2A3A] rounded border border-[#2A3A4A] text-[#9D00FF]">Vegetarian</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Tips Box */}
                    <div className="bg-[#1A2A3A] border border-[#2A3A4A] rounded-2xl p-6">
                        <h3 className="font-bold text-white mb-3 flex items-center gap-2">
                            <Star size={18} className="text-[#FFB020]" /> Buddy Best Practices
                        </h3>
                        <ul className="text-sm text-[#8899AA] space-y-2 list-disc pl-4">
                            <li>Reach out proactively, don't wait for them to ask.</li>
                            <li>Check their calendar before scheduling coffee chats.</li>
                            <li>Introduce them to cross-functional peers.</li>
                            <li>Encourage them to ask 'stupid' questions!</li>
                        </ul>
                    </div>
                </div>

                {/* Right Col: Tasks & Progress */}
                <div className="lg:col-span-2 space-y-6">

                    <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-lg font-bold text-white">Your Buddy Checklist</h2>
                                <p className="text-[#8899AA] text-sm mt-1">Actions expected from you during Sneha's first 30 days.</p>
                            </div>
                            <div className="text-right">
                                <span className="text-2xl font-bold text-[#00E5A0]">{progress}%</span>
                                <p className="text-[10px] uppercase font-bold tracking-wider text-[#8899AA]">Completed</p>
                            </div>
                        </div>

                        <div className="w-full h-2 bg-[#1A2A3A] rounded-full overflow-hidden mb-8">
                            <div className="h-full bg-gradient-to-r from-[#33E6FF] to-[#00E5A0] rounded-full transition-all duration-1000" style={{ width: `${progress}%` }}></div>
                        </div>

                        <div className="space-y-4">
                            {/* Completed List */}
                            <div className="flex items-center gap-4 p-4 rounded-xl border border-[#1A2A3A] bg-[#0A1420] opacity-60">
                                <div className="text-[#00E5A0]"><CheckCircle2 size={24} /></div>
                                <div className="flex-1">
                                    <h4 className="text-[15px] font-semibold text-white line-through decoration-[#445566]">Send welcome email before Day 1</h4>
                                    <p className="text-sm text-[#8899AA] mt-1">Completed Mar 10</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 p-4 rounded-xl border border-[#1A2A3A] bg-[#0A1420] opacity-60">
                                <div className="text-[#00E5A0]"><CheckCircle2 size={24} /></div>
                                <div className="flex-1">
                                    <h4 className="text-[15px] font-semibold text-white line-through decoration-[#445566]">Day 1 Office Tour & Lunch</h4>
                                    <p className="text-sm text-[#8899AA] mt-1">Completed Mar 12</p>
                                </div>
                            </div>

                            {/* Active List */}
                            <div className="flex items-center gap-4 p-4 rounded-xl border border-[#00E5A0] bg-[#1A2A3A] shadow-[0_0_15px_rgba(0,229,160,0.05)] cursor-pointer group">
                                <div className="w-6 h-6 rounded-full border-2 border-[#445566] shrink-0 mt-0.5"></div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className="text-[15px] font-semibold text-white group-hover:text-[#00E5A0] transition-colors">Week 1 Check-in Coffee</h4>
                                        <span className="text-[10px] bg-[#FF4444]/10 text-[#FF4444] px-2 py-0.5 rounded uppercase font-bold tracking-wider border border-[#FF4444]/20">Due Tomorrow</span>
                                    </div>
                                    <p className="text-sm text-[#8899AA]">Have a casual 30-min chat to see how they are settling in. <br /><a href="#" className="text-[#33E6FF] hover:underline mt-1 inline-block text-xs">+ Ask HR for Coffee Voucher reimbursement</a></p>
                                </div>
                                <ChevronRight size={20} className="text-[#445566]" />
                            </div>

                            <div className="flex items-center gap-4 p-4 rounded-xl border border-[#1A2A3A] bg-[#0F1C2E] hover:border-[#2A3A4A] cursor-pointer group transition-colors">
                                <div className="w-6 h-6 rounded-full border-2 border-[#445566] group-hover:border-[#8899AA] transition-colors shrink-0 mt-0.5"></div>
                                <div className="flex-1">
                                    <h4 className="text-[15px] font-semibold text-white">Introduce to 3 Cross-functional Peers</h4>
                                    <p className="text-sm text-[#8899AA] mt-1">Help them expand their network outside of their immediate team.</p>
                                </div>
                                <ChevronRight size={20} className="text-[#445566] group-hover:text-white" />
                            </div>

                            <div className="flex items-center gap-4 p-4 rounded-xl border border-[#1A2A3A] bg-[#0F1C2E] hover:border-[#2A3A4A] cursor-pointer group transition-colors">
                                <div className="w-6 h-6 rounded-full border-2 border-[#445566] group-hover:border-[#8899AA] transition-colors shrink-0 mt-0.5"></div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className="text-[15px] font-semibold text-white">Week 4 Wrap-up Lunch</h4>
                                        <span className="text-[10px] bg-[#1A2A3A] text-[#8899AA] px-2 py-0.5 rounded uppercase font-bold tracking-wider border border-[#2A3A4A]">Due Apr 12</span>
                                    </div>
                                    <p className="text-sm text-[#8899AA] mt-1">Final buddy milestone. Reflect on their first month.</p>
                                </div>
                                <ChevronRight size={20} className="text-[#445566] group-hover:text-white" />
                            </div>

                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
