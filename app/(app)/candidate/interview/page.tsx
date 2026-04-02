"use client";
import React, { useState } from 'react';
import { Calendar, ArrowLeft, Clock, Video, Info, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function CandidateInterviewScreen() {
    const [selectedSlot, setSelectedSlot] = useState<number | null>(null);

    const SLOTS = [
        { id: 1, date: 'Thu, Nov 06', time: '10:00 AM - 11:00 AM IST', type: 'Virtual (Google Meet)' },
        { id: 2, date: 'Thu, Nov 06', time: '02:00 PM - 03:00 PM IST', type: 'Virtual (Google Meet)' },
        { id: 3, date: 'Fri, Nov 07', time: '11:00 AM - 12:00 PM IST', type: 'Virtual (Google Meet)' },
        { id: 4, date: 'Mon, Nov 10', time: '04:00 PM - 05:00 PM IST', type: 'Virtual (Google Meet)' },
    ];

    return (
        <div className="min-h-screen bg-[#060D1A] py-10 px-6">
            <div className="max-w-4xl mx-auto space-y-6">

                <Link href="/candidate/status" className="text-[#556677] hover:text-white text-sm font-bold flex items-center gap-1 inline-flex"><ArrowLeft size={16} /> Back to Application Status</Link>

                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Schedule Your Onsite Loop</h1>
                        <p className="text-[#8899AA]">Senior Frontend Engineer (JB001) · 3 Rounds (45 mins each)</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6">
                            <h2 className="text-white font-bold mb-4 flex items-center gap-2"><Calendar size={18} className="text-indigo-400" /> Available Time Slots</h2>
                            <p className="text-[#8899AA] text-sm mb-6">Please select a time block that works best for you. Our recruiting team will automatically send calendar invites with meeting links.</p>

                            <div className="space-y-3">
                                {SLOTS.map(s => (
                                    <button key={s.id} onClick={() => setSelectedSlot(s.id)}
                                        className={`w-full text-left p-4 rounded-xl border transition-colors flex items-center justify-between ${selectedSlot === s.id ? 'bg-indigo-500/10 border-indigo-500 shadow-[0_0_15px_rgba(79,70,229,0.2)]' : 'bg-[#131B2B] border-[#2A3A4A] hover:border-indigo-500/50'}`}>
                                        <div>
                                            <div className="text-white font-bold">{s.date}</div>
                                            <div className="flex items-center gap-4 mt-1 text-sm">
                                                <span className="text-emerald-400 font-semibold flex items-center gap-1"><Clock size={14} /> {s.time}</span>
                                                <span className="text-[#556677] flex items-center gap-1"><Video size={14} /> {s.type}</span>
                                            </div>
                                        </div>
                                        {selectedSlot === s.id && <CheckCircle2 size={24} className="text-indigo-500" />}
                                    </button>
                                ))}
                            </div>

                            {selectedSlot && (
                                <div className="mt-8 pt-6 border-t border-[#1A2A3A] animate-in fade-in slide-in-from-bottom-4">
                                    <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition-colors text-center">
                                        Confirm Schedule
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-2xl p-6">
                            <h3 className="text-white font-bold mb-4 flex items-center gap-2"><Info size={18} className="text-indigo-400" /> What to expect</h3>
                            <ul className="space-y-4 relative">
                                <div className="absolute left-[11px] top-2 bottom-2 w-px bg-indigo-500/20"></div>

                                <li className="flex items-start gap-4 relative">
                                    <div className="w-6 h-6 rounded-full bg-[#131B2B] border-2 border-indigo-500 text-indigo-400 flex items-center justify-center text-xs font-bold shrink-0 z-10">1</div>
                                    <div>
                                        <strong className="text-white block text-sm">Frontend Architecture Round</strong>
                                        <span className="text-[#8899AA] text-xs">Deep dive into state management, performance, and component scaling in React.</span>
                                    </div>
                                </li>

                                <li className="flex items-start gap-4 relative">
                                    <div className="w-6 h-6 rounded-full bg-[#131B2B] border-2 border-indigo-500 text-indigo-400 flex items-center justify-center text-xs font-bold shrink-0 z-10">2</div>
                                    <div>
                                        <strong className="text-white block text-sm">Live Coding / Pair Programming</strong>
                                        <span className="text-[#8899AA] text-xs">A practical assessment building a small feature using standard web technologies.</span>
                                    </div>
                                </li>

                                <li className="flex items-start gap-4 relative">
                                    <div className="w-6 h-6 rounded-full bg-[#131B2B] border-2 border-indigo-500 text-indigo-400 flex items-center justify-center text-xs font-bold shrink-0 z-10">3</div>
                                    <div>
                                        <strong className="text-white block text-sm">Hiring Manager Chat</strong>
                                        <span className="text-[#8899AA] text-xs">Discussing team fit, career progression, and your questions about HRFlow.</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
