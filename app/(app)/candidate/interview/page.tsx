"use client";
import React, { useState } from 'react';
import { Calendar, ArrowLeft, Clock, Video, Info, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import Page from '@/components/ui/Page';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function CandidateInterviewScreen() {
    const [selectedSlot, setSelectedSlot] = useState<number | null>(null);

    const SLOTS = [
        { id: 1, date: 'Thu, Nov 06', time: '10:00 AM - 11:00 AM IST', type: 'Virtual (Google Meet)' },
        { id: 2, date: 'Thu, Nov 06', time: '02:00 PM - 03:00 PM IST', type: 'Virtual (Google Meet)' },
        { id: 3, date: 'Fri, Nov 07', time: '11:00 AM - 12:00 PM IST', type: 'Virtual (Google Meet)' },
        { id: 4, date: 'Mon, Nov 10', time: '04:00 PM - 05:00 PM IST', type: 'Virtual (Google Meet)' },
    ];

    return (
        <Page
            title="Schedule Your Onsite Loop"
            subtitle="Senior Frontend Engineer (JB001) · 3 Rounds (45 mins each)"
            breadcrumbs={[
                { label: 'Home', href: '/' },
                { label: 'My Applications', href: '/candidate/status' },
                { label: 'Schedule Interview', href: '/candidate/interview' },
            ]}
        >
            <div className="space-y-6">
                <Link href="/candidate/status" className="text-[#556677] hover:text-white text-sm font-bold flex items-center gap-1 inline-flex">
                    <ArrowLeft size={16} aria-hidden="true" /> Back to Application Status
                </Link>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <Card padding="lg">
                            <h2 className="text-white font-bold mb-4 flex items-center gap-2">
                                <Calendar size={18} className="text-indigo-400" aria-hidden="true" /> Available Time Slots
                            </h2>
                            <p className="text-[#8899AA] text-sm mb-6">Please select a time block that works best for you. Our recruiting team will automatically send calendar invites with meeting links.</p>

                            <div className="space-y-3">
                                {SLOTS.map(s => (
                                    <button
                                        key={s.id}
                                        type="button"
                                        onClick={() => setSelectedSlot(s.id)}
                                        aria-pressed={selectedSlot === s.id}
                                        aria-label={`${s.date} ${s.time}`}
                                        className={`w-full text-left p-4 rounded-xl border transition-colors flex items-center justify-between ${selectedSlot === s.id ? 'bg-indigo-500/10 border-indigo-500 shadow-[0_0_15px_rgba(79,70,229,0.2)]' : 'bg-[#131B2B] border-[#2A3A4A] hover:border-indigo-500/50'}`}
                                    >
                                        <div>
                                            <div className="text-white font-bold">{s.date}</div>
                                            <div className="flex items-center gap-4 mt-1 text-sm">
                                                <span className="text-emerald-400 font-semibold flex items-center gap-1"><Clock size={14} aria-hidden="true" /> {s.time}</span>
                                                <span className="text-[#556677] flex items-center gap-1"><Video size={14} aria-hidden="true" /> {s.type}</span>
                                            </div>
                                        </div>
                                        {selectedSlot === s.id && <CheckCircle2 size={24} className="text-indigo-500" aria-hidden="true" />}
                                    </button>
                                ))}
                            </div>

                            {selectedSlot && (
                                <div className="mt-8 pt-6 border-t border-[#1A2A3A] animate-in fade-in slide-in-from-bottom-4">
                                    <Button variant="primary" size="md" className="w-full">
                                        Confirm Schedule
                                    </Button>
                                </div>
                            )}
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card padding="lg" className="bg-indigo-500/5 border-indigo-500/20">
                            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                <Info size={18} className="text-indigo-400" aria-hidden="true" /> What to expect
                            </h3>
                            <ul className="space-y-4 relative">
                                <div className="absolute left-[11px] top-2 bottom-2 w-px bg-indigo-500/20" aria-hidden="true"></div>

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
                        </Card>
                    </div>
                </div>
            </div>
        </Page>
    );
}
